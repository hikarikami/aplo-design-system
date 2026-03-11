/**
 * Geometric — "Theme-ready"
 * A rounded square oscillates while a large circle sweeps around it.
 * A small centre circle pulses. The overlapping fills create visible depth
 * through layered transparency — the intersection zone reads as more opaque.
 * White on transparent. 180 frames @ 60 fps = 3 s loop.
 */

const tr = () => ({
  ty: 'tr',
  p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] },
  s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 },
  o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 },
})

export const arcAnimation = {
  v: '5.9.6', fr: 60, ip: 0, op: 180,
  w: 200, h: 200,
  nm: 'geometric', ddd: 0, assets: [],
  layers: [
    // Large rounded square — oscillates 0°→45°→0°
    {
      ddd: 0, ind: 1, ty: 4, nm: 'square', sr: 1,
      ks: {
        o: { a: 0, k: 25 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] }, t: 0,   s: [0] },
            { i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] }, t: 90,  s: [45] },
            { t: 180, s: [0] },
          ],
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [{
        ty: 'gr', nm: 'g',
        it: [
          { ty: 'rc', nm: 'rc', d: 1, s: { a: 0, k: [104, 104] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 18 } },
          { ty: 'fl', nm: 'fl', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0 },
          tr(),
        ],
      }],
      ip: 0, op: 180, st: 0, bm: 0,
    },
    // Large circle — sweeps around the square (full rotation)
    {
      ddd: 0, ind: 2, ty: 4, nm: 'circle', sr: 1,
      ks: {
        o: { a: 0, k: 36 },
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
      shapes: [{
        ty: 'gr', nm: 'g',
        it: [
          { ty: 'el', nm: 'el', d: 1, s: { a: 0, k: [92, 92] }, p: { a: 0, k: [24, 0] } },
          { ty: 'fl', nm: 'fl', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0 },
          tr(),
        ],
      }],
      ip: 0, op: 180, st: 0, bm: 0,
    },
    // Small centre circle — breathes in counter-phase
    {
      ddd: 0, ind: 3, ty: 4, nm: 'dot', sr: 1,
      ks: {
        o: { a: 0, k: 58 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] }, o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] }, t: 0,   s: [115, 115, 100] },
            { i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] }, o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] }, t: 90,  s: [78, 78, 100] },
            { t: 180, s: [115, 115, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [{
        ty: 'gr', nm: 'g',
        it: [
          { ty: 'el', nm: 'el', d: 1, s: { a: 0, k: [44, 44] }, p: { a: 0, k: [0, 0] } },
          { ty: 'fl', nm: 'fl', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0 },
          tr(),
        ],
      }],
      ip: 0, op: 180, st: 0, bm: 0,
    },
  ],
}
