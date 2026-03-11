import * as React from 'react'
import { cn } from '@/lib/utils'
import { useMotion } from '@/lib/motion'

// ─── Constants ────────────────────────────────────────────────────────────────

const RADIUS = 640;
const PARTICLE_COUNT = 60000;
const DOT_COLOR = '0,107,105'; // #006B69 — primary teal

/** Radius (px) of the cursor's sway zone — keep this large for a broad effect */
const SWAY_INFLUENCE_R = 480;
/** Peak displacement (px) at the cursor centre — noticeable but not dramatic */
const SWAY_AMPLITUDE = 90;
/** Base oscillation speed (rad/ms). Full cycle ≈ 2π / SWAY_SPEED ms */
const SWAY_SPEED = 0.0002;
/** Proximity falloff exponent. Lower = wider soft zone; higher = tighter focus */
const SWAY_FALLOFF = 1;
/** Duration (ms) over which the sway fades out after the cursor leaves */
const SWAY_FADEOUT_MS = 300
/** Ambient idle oscillation amplitude (px) — always-on, cursor amplifies on top */
const AMBIENT_AMPLITUDE = 11
/** Default directional gradient strength (0 = uniform, 1 = full fade-to-black on shadow side) */
const DEFAULT_SHADOW_STRENGTH = 0.75

interface StippleParticle {
  normR: number     // 0–1 from globe centre
  angle: number
  size: number
  baseAlpha: number
  phaseX: number    // unique random phase offset for x-axis oscillation
  phaseY: number    // unique random phase offset for y-axis oscillation
  freqScale: number // per-particle speed multiplier (0.6–1.4×) for organic variation
}

// ─── Particles ────────────────────────────────────────────────────────────────

function buildParticles(): StippleParticle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => {


    let normR: number

  
 
         normR = Math.sqrt(Math.random()) * 0.6
 

    return {
      normR,
      angle: Math.random() * Math.PI * 2,
      size: Math.random() * 0.4 + 1.4,
      baseAlpha: Math.random() * 0.45 + 0.22,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      freqScale: 4.6 + Math.random() * 6.4,
    }
  })
}

// ─── Canvas setup ─────────────────────────────────────────────────────────────

function setupStippleGlobe(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  shadowAngle: number,
  shadowStrength: number,
): () => void {
  const ctx = canvas.getContext('2d')!
  const particles = buildParticles()

  // Globe anchored to bottom-right, bleeding off both edges for that Aplo look
  const globeX = canvas.width  - RADIUS * 0.2
  const globeY = canvas.height * .8

  // Shadow origin — a point near the globe edge in the shadow direction.
  // Radial distance from this point drives the per-particle alpha falloff,
  // producing a circular gradient rather than a directional cosine sweep.
  const sOX = globeX + Math.cos(shadowAngle) * RADIUS * 0.9
  const sOY = globeY + Math.sin(shadowAngle) * RADIUS * 0.9

  // Mouse position tracked 1:1 — no smoothing, instant response
  let mouseX = -9999
  let mouseY = -9999
  let lastNow = 0         // most recent RAF timestamp, used by event handlers
  let mouseLeftAt = -1   // performance.now() when cursor left; -1 = cursor is present
  let swayFreezeTime = -1  // animation `now` frozen at leave so particles return straight to base

  function onMouseMove(e: MouseEvent) {
    const rect = container.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    // If the cursor is further than SWAY_INFLUENCE_R beyond the globe's edge,
    // no particle can be within range — trigger fade-out just like mouseleave.
    const dx = mx - globeX
    const dy = my - globeY
    const distToGlobe = Math.sqrt(dx * dx + dy * dy)

    if (distToGlobe >= SWAY_INFLUENCE_R + RADIUS) {
      if (mouseLeftAt < 0) {
        mouseLeftAt = performance.now()
        swayFreezeTime = lastNow
      }
    } else {
      mouseX = mx
      mouseY = my
      mouseLeftAt = -1
      swayFreezeTime = -1
    }
  }

  function onMouseLeave() {
    mouseLeftAt = performance.now()  // start the fade-out timer
    swayFreezeTime = lastNow  // freeze phase so particles return without oscillating
  }

  container.addEventListener('mousemove', onMouseMove)
  container.addEventListener('mouseleave', onMouseLeave)

  let rafId: number

  function draw(now: number) {
    lastNow = now

    // Compute fade-out multiplier — linearly from 1→0 over SWAY_FADEOUT_MS after cursor leaves
    let swayFade = 1
    if (mouseLeftAt >= 0) {
      const elapsed = now - mouseLeftAt
      if (elapsed >= SWAY_FADEOUT_MS) {
        swayFade = 1
        mouseX = -9999
        mouseY = -9999
        mouseLeftAt = -1
        swayFreezeTime = -1
      } else {
        swayFade = 1 - elapsed / SWAY_FADEOUT_MS
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = `rgb(${DOT_COLOR})`

    for (const p of particles) {
      // Smooth opacity gradient: full at centre, fades to ~30% at the rim,
      // then a soft clip dissolves the outermost 15% to nothing
      const centerGradient = 1 - p.normR * 0.15
      const edgeFade = p.normR > 0.85 ? 1 - (p.normR - 0.85) / 0.15 : 1

      // Cull purely on radial factors before doing any 2D position math
      if (p.baseAlpha * centerGradient * edgeFade < 0.01) continue

      const r = p.normR * RADIUS
      let x = globeX + Math.cos(p.angle) * r
      let y = globeY + Math.sin(p.angle) * r

      // Sway — applied BEFORE shadow so alpha is computed from the final visual position,
      // preventing dense-side particles from appearing bright inside the shadow region.

      // Ambient idle drift — always running, gives life without cursor interaction
      const ambT = now * SWAY_SPEED * p.freqScale
      let swayX = Math.sin(ambT + p.phaseX) * AMBIENT_AMPLITUDE
      let swayY = Math.sin(ambT * 1.27 + p.phaseY) * AMBIENT_AMPLITUDE

      // Cursor amplification — adds on top of ambient when cursor is nearby
      const dx = x - mouseX
      const dy = y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < SWAY_INFLUENCE_R && swayFade > 0) {
        const proximity = Math.pow(1 - dist / SWAY_INFLUENCE_R, SWAY_FALLOFF) * swayFade
        // Use frozen time during fade-out so cursor contribution glides smoothly back
        const curT = (swayFreezeTime >= 0 ? swayFreezeTime : now) * SWAY_SPEED * p.freqScale
        let cX = Math.sin(curT + p.phaseX) * proximity * SWAY_AMPLITUDE
        let cY = Math.sin(curT * 1.27 + p.phaseY) * proximity * SWAY_AMPLITUDE
        // Clamp cursor contribution to its own radius
        const cLen = Math.sqrt(cX * cX + cY * cY)
        const cMax = proximity * SWAY_AMPLITUDE
        if (cLen > cMax) { cX = cX / cLen * cMax; cY = cY / cLen * cMax }
        swayX += cX
        swayY += cY
      }

      x += swayX
      y += swayY

      // Circular radial shadow from the SWAYED position — keeps the density gradient
      // consistent with where the particle actually appears on screen.
      const dxS = x - sOX
      const dyS = y - sOY
      const t = Math.min(1, Math.sqrt(dxS * dxS + dyS * dyS) / (RADIUS * 1.9))
      const directional = 1 - shadowStrength * Math.pow(1 - t, 1.5)
      const alpha = p.baseAlpha * centerGradient * edgeFade * directional
      if (alpha < 0.01) continue

      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.arc(x, y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = 1
    rafId = requestAnimationFrame(draw)
  }

  rafId = requestAnimationFrame(draw)

  return () => {
    cancelAnimationFrame(rafId)
    container.removeEventListener('mousemove', onMouseMove)
    container.removeEventListener('mouseleave', onMouseLeave)
  }
}

// ─── Static fallback ──────────────────────────────────────────────────────────

function drawStaticStippleGlobe(
  canvas: HTMLCanvasElement,
  shadowAngle: number,
  shadowStrength: number,
): void {
  const ctx = canvas.getContext('2d')!
  const particles = buildParticles()

  const globeX = canvas.width  - RADIUS * 0.2
  const globeY = canvas.height * 0.8

  const sOX = globeX + Math.cos(shadowAngle) * RADIUS * 0.9
  const sOY = globeY + Math.sin(shadowAngle) * RADIUS * 0.9

  ctx.fillStyle = `rgb(${DOT_COLOR})`

  for (const p of particles) {
    const centerGradient = 1 - p.normR * 0.70
    const edgeFade = p.normR > 0.85 ? 1 - (p.normR - 0.85) / 0.15 : 1

    const r = p.normR * RADIUS
    const x = globeX + Math.cos(p.angle) * r
    const y = globeY + Math.sin(p.angle) * r

    const dxS = x - sOX
    const dyS = y - sOY
    const t = Math.min(1, Math.sqrt(dxS * dxS + dyS * dyS) / (RADIUS * 1.9))
    const directional = 1 - shadowStrength * Math.pow(1 - t, 1.5)
    const alpha = p.baseAlpha * centerGradient * edgeFade * directional
    if (alpha < 0.01) continue

    ctx.globalAlpha = alpha
    ctx.beginPath()
    ctx.arc(x, y, p.size, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalAlpha = 1
}

// ─── Component ────────────────────────────────────────────────────────────────

export type HeroBackgroundEffect = 'none' | 'stipple-follow'
export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  /** Controls the interactive background treatment */
  backgroundEffect?: HeroBackgroundEffect
  /** Angle (degrees) of the sparse/shadow side of the globe. Default: −135 (top-left) */
  globeShadowAngle?: number
  /** Strength of the directional density gradient (0 = uniform, 1 = maximum). Default: 0.7 */
  globeShadowStrength?: number
}

export function Hero({
  backgroundEffect = 'none',
  globeShadowAngle = -135,
  globeShadowStrength = DEFAULT_SHADOW_STRENGTH,
  className,
  children,
  ...props
}: HeroProps) {
  const sectionRef = React.useRef<HTMLElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const { motionEnabled } = useMotion()

  // const cursorRef = React.useRef<HTMLDivElement>(null)
  // const targetPos = React.useRef({ x: -100, y: -100 })
  // const currentPos = React.useRef({ x: -100, y: -100 })
  // const [cursorActive, setCursorActive] = React.useState(false)
  // const cursorActiveRef = React.useRef(false)
  const isStipple = backgroundEffect === 'stipple-follow'

  // Keep ref in sync with state so the RAF loop can read it without stale closures
  // React.useEffect(() => { cursorActiveRef.current = cursorActive }, [cursorActive])

  // RAF-based cursor lerp — runs at 60fps, writes directly to DOM (no React re-renders)
  // React.useEffect(() => {
  //   if (!isStipple) return
  //   const LERP = 0.18
  //   let rafId: number
  //
  //   function tick() {
  //     const cur = currentPos.current
  //     const tgt = targetPos.current
  //     cur.x += (tgt.x - cur.x) * LERP
  //     cur.y += (tgt.y - cur.y) * LERP
  //
  //     const el = cursorRef.current
  //     if (el) {
  //       const active = cursorActiveRef.current
  //       el.style.left = `${cur.x}px`
  //       el.style.top  = `${cur.y}px`
  //       el.style.transform = `translate(-50%, -50%) scale(${active ? 1 : 0})`
  //       el.style.opacity   = active ? '1' : '0'
  //     }
  //
  //     rafId = requestAnimationFrame(tick)
  //   }
  //
  //   rafId = requestAnimationFrame(tick)
  //   return () => cancelAnimationFrame(rafId)
  // }, [isStipple])

  React.useEffect(() => {
    if (backgroundEffect !== 'stipple-follow') return
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const shadowAngle = (globeShadowAngle * Math.PI) / 180
    let cleanup: (() => void) | undefined

    function setup() {
      cleanup?.()
      canvas!.width  = section!.offsetWidth
      canvas!.height = section!.offsetHeight
      if (motionEnabled) {
        cleanup = setupStippleGlobe(canvas!, section!, shadowAngle, globeShadowStrength)
      } else {
        drawStaticStippleGlobe(canvas!, shadowAngle, globeShadowStrength)
        cleanup = undefined
      }
    }

    setup()

    const ro = new ResizeObserver(setup)
    ro.observe(section)

    return () => {
      cleanup?.()
      ro.disconnect()
    }
  }, [backgroundEffect, motionEnabled, globeShadowAngle, globeShadowStrength])

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden bg-background', className)}
      {...props}
    >
      {isStipple && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
      )}
      {/* Custom cursor — commented out, restore when ready
      {isStipple && (
        <div
          ref={cursorRef}
          className="fixed pointer-events-none z-50 rounded-full bg-white"
          style={{
            width: 28,
            height: 28,
            left: -100,
            top: -100,
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: 0,
            transition: 'transform 0.2s ease, opacity 0.2s ease',
            willChange: 'transform, left, top',
          }}
        />
      )}
      */}
      <div className="relative w-full z-10">{children}</div>
    </section>
  )
}
