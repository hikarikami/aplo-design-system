/**
 * Bubbles — "Motion-aware"
 * Three large filled circles expand from slightly different positions and
 * fade out, staggered 60 frames apart. The expanding circles overlap as they
 * grow, making the intersection noticeably more opaque — "seeing shapes below".
 * White on transparent. 180 frames @ 60 fps = 3 s loop.
 */

const tr = () => ({
  ty: 'tr',
  p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] },
  s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 },
  o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 },
})

/** One expanding-and-fading filled circle. st staggers the start frame. */
const bubble = (ind: number, st: number, size: number, px: number, py: number) => ({
  ddd: 0, ind, ty: 4, nm: `bubble${ind}`, sr: 1,
  ks: {
    o: {
      a: 1,
      k: [
        { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 0,  s: [70] },
        { t: 90, s: [0] },
      ],
    },
    r: { a: 0, k: 0 },
    p: { a: 0, k: [100, 100, 0] },
    a: { a: 0, k: [0, 0, 0] },
    s: {
      a: 1,
      k: [
        { i: { x: [0.2, 0.2, 0.2], y: [1, 1, 1] }, o: { x: [0.8, 0.8, 0.8], y: [0, 0, 0] }, t: 0,  s: [12, 12, 100] },
        { t: 90, s: [162, 162, 100] },
      ],
    },
  },
  ao: 0,
  shapes: [{
    ty: 'gr', nm: 'g',
    it: [
      { ty: 'el', nm: 'el', d: 1, s: { a: 0, k: [size, size] }, p: { a: 0, k: [px, py] } },
      { ty: 'fl', nm: 'fl', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0 },
      tr(),
    ],
  }],
  ip: 0, op: 180, st, bm: 0,
})

export const pulseAnimation = {
  v: '5.9.6', fr: 60, ip: 0, op: 180,
  w: 200, h: 200,
  nm: 'bubbles', ddd: 0, assets: [],
  layers: [
    // Three bubbles offset from each other so overlaps are visible as they expand
    bubble(1, 0,   88,  10, -12),
    bubble(2, 60,  80, -16,  14),
    bubble(3, 120, 76,   6,  16),
    // Static centre dot — anchor point
    {
      ddd: 0, ind: 4, ty: 4, nm: 'centre', sr: 1,
      ks: {
        o: { a: 0, k: 65 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [{
        ty: 'gr', nm: 'g',
        it: [
          { ty: 'el', nm: 'el', d: 1, s: { a: 0, k: [20, 20] }, p: { a: 0, k: [0, 0] } },
          { ty: 'fl', nm: 'fl', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0 },
          tr(),
        ],
      }],
      ip: 0, op: 180, st: 0, bm: 0,
    },
  ],
}
