/**
 * Stipple Ripple — Optimized Canvas 2D animation
 * Maintains consistent dot density regardless of element size.
 */

interface Particle {
  angle: number
  r: number
  size: number
  baseAlpha: number
}

// CONFIGURATION
const PARTICLE_DENSITY = 0.5  // Particles per square pixel
const MAX_PARTICLES    = 25000 // Upper limit to protect performance
const WAVE_SPEED       = 240   // px/s
const FADE_DURATION    = 300   // ms
const MAX_ALPHA        = 0.6   // peak per-particle opacity
const WAVE_TRAIL_PX    = 60    // px falloff distance

export function createStippleRipple(
  button: HTMLElement,
  clickX: number,
  clickY: number,
  color = '0,0,0',
  alphaMultiplier = 1,
): void {
  const w = button.offsetWidth
  const h = button.offsetHeight

  // Find the distance to the furthest corner to ensure the wave covers the whole area
  const maxRadius = Math.max(
    Math.hypot(clickX, clickY),
    Math.hypot(w - clickX, clickY),
    Math.hypot(clickX, h - clickY),
    Math.hypot(w - clickX, h - clickY),
  )

  // Calculate dynamic particle count based on the area of the ripple circle (πr²)
  const targetArea = Math.PI * Math.pow(maxRadius, 2)
  const dynamicCount = Math.min(
    Math.floor(targetArea * PARTICLE_DENSITY),
    MAX_PARTICLES
  )

  const waveDuration  = (maxRadius / WAVE_SPEED) * 1000
  const totalDuration = waveDuration + FADE_DURATION

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;'
  button.appendChild(canvas)

  const ctx = canvas.getContext('2d', { alpha: true })!
  const startTime = performance.now()

  // Pre-generate particles
  const particles: Particle[] = Array.from({ length: dynamicCount }, () => ({
    angle:     Math.random() * Math.PI * 2,
    r:         Math.sqrt(Math.random()) * maxRadius, 
    size:      Math.random() * 0.8 + 0.4,            
    baseAlpha: Math.random() * 0.4 + 0.6,            
  }))

  function draw(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / totalDuration, 1)

    // Wave front calculation (with slight deceleration)
    const waveT = Math.min(elapsed / waveDuration, 1)
    const waveFrontPx = maxRadius * (1 - Math.pow(1 - waveT, 2))

    // Global fade-out after wave completes
    const fadeElapsed = elapsed - waveDuration
    const globalFade = fadeElapsed > 0
      ? Math.max(0, 1 - fadeElapsed / FADE_DURATION)
      : 1

    ctx.clearRect(0, 0, w, h)

    // Optimization: Setting fillStyle once outside the loop if using a single color
    // However, since alpha changes per particle, we use the RGBA string inside.
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      
      // Skip if wave hasn't reached this particle yet
      if (waveFrontPx < p.r) continue

      const lagPx = waveFrontPx - p.r
      const waveFalloff = Math.max(0, 1 - lagPx / WAVE_TRAIL_PX)
      
      const alpha = p.baseAlpha * MAX_ALPHA * waveFalloff * globalFade * alphaMultiplier
      
      // Visual threshold skip
      if (alpha < 0.01) continue

      const x = clickX + Math.cos(p.angle) * p.r
      const y = clickY + Math.sin(p.angle) * p.r

      ctx.fillStyle = `rgba(${color},${alpha.toFixed(3)})`
      
      // fillRect is significantly faster than beginPath/arc/fill for thousands of dots
      ctx.fillRect(x, y, p.size, p.size)
    }

    if (progress < 1) {
      requestAnimationFrame(draw)
    } else {
      canvas.remove()
    }
  }

  requestAnimationFrame(draw)
}