/**
 * Stipple Fade — two modes:
 *
 *  createStippleFade        — time-based, fires once and stops (set-and-forget)
 *  createScrollStippleFade  — scroll-driven, progress is set externally (0–1)
 *
 * Particles are pre-generated once; only drawing work varies per frame.
 * After the time-based animation (or when progress is static) the canvas is
 * completely static — zero ongoing CPU cost.
 */

// ── Shared types & constants ──────────────────────────────────────────────────

interface Particle {
  x: number
  y: number
  size: number
  /** 0–1 final opacity multiplier — lower = sparser / higher up */
  baseAlpha: number
  /** 0–1 progress value at which this particle starts fading in */
  revealTime: number
}

/** Peak alpha of any fully-revealed particle. */
const MAX_ALPHA = 0.58

/**
 * Fraction of the progress range over which each particle individually
 * eases in once its revealTime threshold is crossed.
 */
const FADE_IN_WINDOW = 0.28

// ── Shared options ────────────────────────────────────────────────────────────

export interface StippleFadeOptions {
  /** CSS rgb string, e.g. '255,255,255'. Default: white. */
  color?: string
  /** Number of dot particles to generate. Default: 65000. */
  particleCount?: number
  /** Total animation duration in ms (time-based only). Default: 2800. */
  duration?: number
}

// ── Particle generation ───────────────────────────────────────────────────────
//
// Y distribution: U^(1/3) gives PDF = 3y² — heavily skewed toward y=1 (bottom).
// Alpha: steep positional curve × random jitter → organic stipple texture.
// Reveal timing: dense (bottom) particles reveal first; sparse ones trickle last.
//
function buildParticles(w: number, h: number, count: number): Particle[] {
  const out: Particle[] = []
  for (let i = 0; i < count; i++) {
    const normalizedY = Math.pow(Math.random(), 1 / 3)  // dense near 1 (bottom)
    const posAlpha = Math.pow(Math.max(0, (normalizedY - 0.15) / 0.85), 2.0)
    const baseAlpha = posAlpha * (0.45 + Math.random() * 0.55)
    if (baseAlpha < 0.015) continue

    const densityBias = 1 - baseAlpha   // 0 = dense, 1 = sparse
    const revealTime = Math.min(0.98, densityBias * 0.55 + Math.random() * 0.48)

    out.push({
      x: Math.random() * w,
      y: normalizedY * h,
      size: Math.random() * 0.85 + 0.3,
      baseAlpha,
      revealTime,
    })
  }
  return out
}

// ── Shared draw pass ──────────────────────────────────────────────────────────

function drawParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  particles: Particle[],
  progress: number,
  color: string,
) {
  ctx.clearRect(0, 0, w, h)
  for (const p of particles) {
    if (progress < p.revealTime) continue
    const age = (progress - p.revealTime) / FADE_IN_WINDOW
    const fadeIn = 1 - Math.pow(1 - Math.min(age, 1), 2)   // ease-out-quad
    const alpha = p.baseAlpha * MAX_ALPHA * fadeIn
    if (alpha < 0.008) continue
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${color},${alpha.toFixed(3)})`
    ctx.fill()
  }
}

// ── Canvas setup helper ───────────────────────────────────────────────────────

function initCanvas(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1
  const w = canvas.offsetWidth
  const h = canvas.offsetHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  return { ctx, w, h }
}

// ── Time-based API ────────────────────────────────────────────────────────────

/**
 * Animates the stipple fade over `duration` ms and stops.
 * Returns a cleanup function that cancels an in-progress animation.
 */
export function createStippleFade(
  canvas: HTMLCanvasElement,
  { color = '255,255,255', particleCount = 65000, duration = 2800 }: StippleFadeOptions = {},
): () => void {
  const { ctx, w, h } = initCanvas(canvas)
  const particles = buildParticles(w, h, particleCount)

  let rafId: number
  let finished = false
  const startTime = performance.now()

  function draw(now: number) {
    const progress = Math.min((now - startTime) / duration, 1)
    drawParticles(ctx, w, h, particles, progress, color)
    if (progress < 1) {
      rafId = requestAnimationFrame(draw)
    } else {
      finished = true
    }
  }

  rafId = requestAnimationFrame(draw)
  return () => { if (!finished) cancelAnimationFrame(rafId) }
}

// ── Stipple pipe ──────────────────────────────────────────────────────────────

interface PipeParticle {
  x: number
  y: number
  size: number
  baseAlpha: number
  /** Normalised left-to-right position (0–1); controls reveal order. */
  threshold: number
}

/** Peak alpha for a fully-settled pipe particle. */
const PIPE_MAX_ALPHA = 0.42

/**
 * Width of the soft leading-edge fade, as a fraction of total progress.
 * Particles in this window ease 0 → full alpha as the brush tip passes them.
 */
const PIPE_LEAD_WINDOW = 0.06

export interface StipplePipeOptions {
  /** CSS rgb string. Default: '0,0,0' (black). */
  color?: string
  /** Total particles generated before culling. Default: 80000. */
  particleCount?: number
  /** Half-thickness of the pipe in logical px. Default: 120. */
  pipeRadius?: number
}

/**
 * Renders a thick stipple-dot pipe sweeping left-to-right across the full canvas.
 * The path follows a smooth S-curve from the upper-left to the lower-right.
 * Progress (0–1) is driven externally — call `setProgress` from a scroll handler.
 */
export function createStipplePipe(
  canvas: HTMLCanvasElement,
  { color = '0,0,0', particleCount = 80000, pipeRadius = 120 }: StipplePipeOptions = {},
): ScrollStippleFade {
  // Expect the caller to have pre-set canvas.width/height (Hero pattern — no DPR scaling).
  // initCanvas reads offsetWidth/Height which can return 0 for absolute-inset elements.
  const ctx = canvas.getContext('2d')!
  const w = canvas.width
  const h = canvas.height
  if (w === 0 || h === 0) return { setProgress: () => {}, destroy: () => {} }

  // S-curve path: normalised x (0–1) → y in canvas px.
  // cos(0)=1 → pathY(0)=0.2h  ;  cos(π)=−1 → pathY(1)=0.8h
  function pathY(nx: number): number {
    return h * (0.5 - 0.3 * Math.cos(nx * Math.PI))
  }

  const particles: PipeParticle[] = []
  for (let i = 0; i < particleCount; i++) {
    const nx = Math.random()
    const cx = nx * w
    const cy = pathY(nx)

    // Uniform-area scatter inside circular cross-section via sqrt-sampling
    const r = Math.sqrt(Math.random()) * pipeRadius
    const angle = Math.random() * Math.PI * 2
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r

    if (x < 0 || x > w || y < 0 || y > h) continue

    const normR = r / pipeRadius
    const edgeFade = Math.pow(1 - normR, 0.6)       // soft edge falloff
    const baseAlpha = edgeFade * (0.3 + Math.random() * 0.5)
    if (baseAlpha < 0.02) continue

    particles.push({
      x, y,
      size: Math.random() * 0.85 + 0.4,
      baseAlpha,
      threshold: nx,
    })
  }

  // Sort ascending — lets the render loop break early
  particles.sort((a, b) => a.threshold - b.threshold)

  let pendingRaf: number | null = null
  let currentProgress = 0

  function render() {
    pendingRaf = null
    ctx.clearRect(0, 0, w, h)
    for (const p of particles) {
      if (p.threshold > currentProgress) break   // sorted: all subsequent hidden
      const age = (currentProgress - p.threshold) / PIPE_LEAD_WINDOW
      const fadeIn = 1 - Math.pow(1 - Math.min(age, 1), 2)  // ease-out-quad
      const alpha = p.baseAlpha * PIPE_MAX_ALPHA * fadeIn
      if (alpha < 0.008) continue
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${color},${alpha.toFixed(3)})`
      ctx.fill()
    }
  }

  return {
    setProgress(progress: number) {
      currentProgress = Math.max(0, Math.min(1, progress))
      if (pendingRaf === null) {
        pendingRaf = requestAnimationFrame(render)
      }
    },
    destroy() {
      if (pendingRaf !== null) {
        cancelAnimationFrame(pendingRaf)
        pendingRaf = null
      }
    },
  }
}

// ── Scroll-driven API ─────────────────────────────────────────────────────────

export interface ScrollStippleFade {
  /**
   * Set visible state. 0 = all dots hidden, 1 = all dots fully revealed.
   * Internally throttled to one RAF per call — safe to call on every scroll event.
   */
  setProgress: (progress: number) => void
  /** Cancel any pending draw and free resources. */
  destroy: () => void
}

/**
 * Creates a stipple fade whose visibility is driven by an external progress
 * value (0–1). Call `setProgress` from a scroll handler.
 */
export function createScrollStippleFade(
  canvas: HTMLCanvasElement,
  { color = '255,255,255', particleCount = 65000 }: StippleFadeOptions = {},
): ScrollStippleFade {
  const { ctx, w, h } = initCanvas(canvas)
  const particles = buildParticles(w, h, particleCount)

  let pendingRaf: number | null = null
  let currentProgress = 0

  function render() {
    pendingRaf = null
    drawParticles(ctx, w, h, particles, currentProgress, color)
  }

  return {
    setProgress(progress: number) {
      currentProgress = Math.max(0, Math.min(1, progress))
      if (pendingRaf === null) {
        pendingRaf = requestAnimationFrame(render)
      }
    },
    destroy() {
      if (pendingRaf !== null) {
        cancelAnimationFrame(pendingRaf)
        pendingRaf = null
      }
    },
  }
}
