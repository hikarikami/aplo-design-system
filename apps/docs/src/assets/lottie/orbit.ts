/**
 * Blobs — "Component-driven"
 * Three large filled circles at different opacities.
 * A background circle breathes while two smaller circles orbit in opposite
 * directions. Where circles overlap the white becomes more opaque, creating
 * visible depth through layered transparency.
 * White on transparent. 180 frames @ 60 fps = 3 s loop.
 */

const tr = () => ({
  ty: 'tr',
  p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] },
  s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 },
  o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 },
})

const filled = (size: number, px = 0, py = 0) => ({
  ty: 'gr', nm: 'g',
  it: [
    { ty: 'el', nm: 'el', d: 1, s: { a: 0, k: [size, size] }, p: { a: 0, k: [px, py] } },
    { ty: 'fl', nm: 'fl', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0 },
    tr(),
  ],
})

export const orbitAnimation = {
  v: '5.9.6', fr: 60, ip: 0, op: 180,
  w: 200, h: 200,
  nm: 'blobs', ddd: 0, assets: [],
  layers: [
    // Large background blob — breathes slowly
    {
      ddd: 0, ind: 1, ty: 4, nm: 'bg', sr: 1,
      ks: {
        o: { a: 0, k: 28 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] }, o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] }, t: 0,   s: [88, 88, 100] },
            { i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] }, o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] }, t: 90,  s: [108, 108, 100] },
            { t: 180, s: [88, 88, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [filled(118)],
      ip: 0, op: 180, st: 0, bm: 0,
    },
    // Medium blob — orbits clockwise, offset so it overlaps the bg circle
    {
      ddd: 0, ind: 2, ty: 4, nm: 'orbit-a', sr: 1,
      ks: {
        o: { a: 0, k: 38 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] }, t: 0, s: [0] },
            { t: 180, s: [360] },
          ],
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [filled(82, 34, 0)],
      ip: 0, op: 180, st: 0, bm: 0,
    },
    // Smaller blob — counter-orbits, offset vertically
    {
      ddd: 0, ind: 3, ty: 4, nm: 'orbit-b', sr: 1,
      ks: {
        o: { a: 0, k: 48 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] }, t: 0, s: [0] },
            { t: 180, s: [-360] },
          ],
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [filled(58, 0, 30)],
      ip: 0, op: 180, st: 0, bm: 0,
    },
  ],
}
