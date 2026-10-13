// Removes the flat light background that image generators paint behind sprites (spec 3.5: sprites are
// transparent PNGs). Works on raw RGBA pixels: flood-fills from the border through pixels close to the
// background colour, with a soft alpha ramp at the edge, then also clears large enclosed areas of that
// colour (the hole of a washer, the gap under a shelf).

export interface Pixels {
  data: Uint8Array; // RGBA
  width: number;
  height: number;
}

type Colour = [number, number, number];

const HARD = 14; // closer than this to the background: fully transparent
const SOFT = 44; // farther than this: fully opaque; in between: partial (anti-aliased edge, soft shadow)
const HOLE_MIN_SHARE = 0.002; // enclosed background areas smaller than this share of the image stay
// Soft grey cast shadows next to the background: light and colourless. They become a semi-transparent
// warm dark shadow instead of a white-grey blotch that would show on the dark room.
const SHADOW_MIN_LIGHT = 155;
const SHADOW_MAX_CHROMA = 30;
const SHADOW_MAX_ALPHA = 0.45;
const SHADOW_COLOUR: Colour = [40, 28, 18];

const at = (a: ArrayLike<number>, i: number) => a[i] ?? 0;

function distance(d: Uint8Array, i: number, bg: Colour): number {
  const r = at(d, i) - bg[0], g = at(d, i + 1) - bg[1], b = at(d, i + 2) - bg[2];
  return Math.sqrt(r * r + g * g + b * b);
}

// Median colour of the outer frame of pixels.
function borderColour(px: Pixels): Colour {
  const { data, width, height } = px;
  const rs: number[] = [], gs: number[] = [], bs: number[] = [];
  const take = (x: number, y: number) => {
    const i = (y * width + x) * 4;
    rs.push(at(data, i));
    gs.push(at(data, i + 1));
    bs.push(at(data, i + 2));
  };
  for (let x = 0; x < width; x++) {
    take(x, 0);
    take(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    take(0, y);
    take(width - 1, y);
  }
  const median = (a: number[]) => at(a.sort((p, q) => p - q), a.length >> 1);
  return [median(rs), median(gs), median(bs)];
}

// True when the border is a flat light colour, i.e. the image was generated "on a white background".
export function hasFlatLightBorder(px: Pixels): boolean {
  const bg = borderColour(px);
  if (Math.min(...bg) < 200) return false;
  const { data, width, height } = px;
  // The whole frame counts: a wide object may touch one edge (a cabinet standing on the bottom edge).
  let near = 0, total = 0;
  const check = (x: number, y: number) => {
    total++;
    if (distance(data, (y * width + x) * 4, bg) < SOFT) near++;
  };
  for (let x = 0; x < width; x += 2) {
    check(x, 0);
    check(x, height - 1);
  }
  for (let y = 0; y < height; y += 2) {
    check(0, y);
    check(width - 1, y);
  }
  return near / total > 0.75;
}

function isShadow(d: Uint8Array, i: number): boolean {
  const r = at(d, i), g = at(d, i + 1), b = at(d, i + 2);
  return Math.max(r, g, b) - Math.min(r, g, b) <= SHADOW_MAX_CHROMA && (r + g + b) / 3 >= SHADOW_MIN_LIGHT;
}

// Pass shadows: false for sprites with light glass (jars, windows): glass looks like shadow to this test.
export function removeBackground(px: Pixels, { shadows = true } = {}): Pixels {
  const { data, width, height } = px;
  const bg = borderColour(px);
  const bgLight = (bg[0] + bg[1] + bg[2]) / 3;
  const n = width * height;
  const alpha = new Float32Array(n).fill(1);
  const shadow = new Uint8Array(n);
  const seen = new Uint8Array(n);
  const ramp = (dist: number) => (dist <= HARD ? 0 : dist >= SOFT ? 1 : (dist - HARD) / (SOFT - HARD));

  const fill = (seeds: number[]): number[] => {
    const region: number[] = [];
    const stack = seeds.filter((p) => !seen[p] && distance(data, p * 4, bg) < SOFT);
    for (const p of stack) seen[p] = 1;
    for (let p = stack.pop(); p !== undefined; p = stack.pop()) {
      region.push(p);
      const x = p % width, y = (p - x) / width;
      const near: [number, number][] = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
      for (const [nx, ny] of near) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const q = ny * width + nx;
        if (seen[q] || distance(data, q * 4, bg) >= SOFT) continue;
        seen[q] = 1;
        stack.push(q);
      }
    }
    return region;
  };

  const border: number[] = [];
  for (let x = 0; x < width; x++) border.push(x, (height - 1) * width + x);
  for (let y = 0; y < height; y++) border.push(y * width, y * width + width - 1);
  const outside = fill(border);
  for (const p of outside) alpha[p] = ramp(distance(data, p * 4, bg));
  // Grow the outside region into connected shadow pixels and turn them into a translucent shadow.
  const queue = shadows ? [...outside] : [];
  for (let p = queue.pop(); p !== undefined; p = queue.pop()) {
    const x = p % width, y = (p - x) / width;
    const near: [number, number][] = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
    for (const [nx, ny] of near) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const q = ny * width + nx;
      if (seen[q] || !isShadow(data, q * 4)) continue;
      seen[q] = 1;
      shadow[q] = 1;
      queue.push(q);
    }
  }
  for (let p = 0; p < n; p++) {
    if (!shadow[p]) continue;
    const i = p * 4;
    const light = (at(data, i) + at(data, i + 1) + at(data, i + 2)) / 3;
    alpha[p] = Math.min(SHADOW_MAX_ALPHA, Math.max(0, ((bgLight - light) / bgLight) * 2.2));
  }

  // Enclosed areas: only the clearly background-coloured core counts, and only if it is large.
  for (let p = 0; p < n; p++) {
    if (seen[p] || distance(data, p * 4, bg) > HARD) continue;
    const region = fill([p]);
    if (region.length >= n * HOLE_MIN_SHARE) for (const q of region) alpha[q] = ramp(distance(data, q * 4, bg));
  }

  // Un-mix the background from semi-transparent edge pixels so no white halo shows on dark scenes.
  const out = new Uint8Array(n * 4);
  for (let p = 0; p < n; p++) {
    const a = at(alpha, p);
    const i = p * 4;
    if (shadow[p]) {
      out.set([...SHADOW_COLOUR, Math.round(a * 255)], i);
      continue;
    }
    for (let c = 0; c < 3; c++) {
      const v = a > 0.02 ? (at(data, i + c) - bg[c as 0 | 1 | 2] * (1 - a)) / a : at(data, i + c);
      out[i + c] = Math.max(0, Math.min(255, Math.round(v)));
    }
    out[i + 3] = Math.round(a * 255);
  }
  dropSpecks(out, width, height);
  return { data: out, width, height };
}

// Small pieces cut off from the object (bits of a floor line at the edge of the picture) are removed.
const SPECK_MAX_SHARE = 0.004;

function dropSpecks(rgba: Uint8Array, width: number, height: number): void {
  const n = width * height;
  const label = new Int32Array(n).fill(-1);
  const sizes: number[] = [];
  for (let p = 0; p < n; p++) {
    if (label[p] !== -1 || at(rgba, p * 4 + 3) < 24) continue;
    const id = sizes.length;
    let size = 0;
    const stack = [p];
    label[p] = id;
    for (let q = stack.pop(); q !== undefined; q = stack.pop()) {
      size++;
      const x = q % width, y = (q - x) / width;
      const near: [number, number][] = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
      for (const [nx, ny] of near) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const r = ny * width + nx;
        if (label[r] === -1 && at(rgba, r * 4 + 3) >= 24) {
          label[r] = id;
          stack.push(r);
        }
      }
    }
    sizes.push(size);
  }
  const keep = sizes.map((s) => s >= n * SPECK_MAX_SHARE || s === Math.max(...sizes));
  for (let p = 0; p < n; p++) {
    const id = at(label, p);
    if (id >= 0 && !keep[id]) rgba[p * 4 + 3] = 0;
  }
}
