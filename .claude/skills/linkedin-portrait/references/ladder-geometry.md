# Leaning Ladder Geometry

Reference for `scripts/build-maturity-ladder-portrait.mjs`. Copy these
constants and helpers rather than re-deriving the geometry.

---

## Core insight

Anchor `BOT_RX = WALL_LEFT`. The right rail's bottom lands exactly on the
wall's left face, so the ladder visibly rests against the wall. The rail then
rises diagonally up and to the right, crossing the wall's cyan top edge — that
crossing is the "resting" moment. Rungs above the wall top float free in open
space, visually unsupported.

---

## Constants

```js
const WALL_LEFT  = 420;   // wall left edge; right rail bottom lands here
const WALL_RIGHT = 1062;  // extends to near-canvas-right; wall is dominant
const WALL_TOP_Y = 625;   // set between two specific rungs to make the cut clear
const WALL_BOT_Y = 1120;  // stops above footer

const TOP_Y  = 360;       // top rung y — shifted down to clear the heading
const BOT_Y  = 1070;      // bottom rung y
const TOP_RX = 700;       // right rail x at the top rung
const BOT_RX = WALL_LEFT; // right rail x at the bottom rung (= wall face)
const RAIL_SEP = 115;     // horizontal gap between the two rails

const SLAB_DX = +18;      // 2.5D slab: depth goes right (viewer is to the left)
const SLAB_DY = -32;      // slab goes up

const RAIL_TOP_Y = TOP_Y - 50;  // rails stick 50px above the top rung
const RAIL_BOT_Y = WALL_BOT_Y;  // rails reach wall/floor level
```

With TOP_Y=360 and BOT_Y=1070, the 5-rung positions are:
- Rung 5: y=360
- Rung 4: y=538
- Rung 3: y=715  ← WALL_TOP_Y=625 sits between rungs 4 and 3
- Rung 2: y=893
- Rung 1: y=1070

---

## Helper functions

```js
// Right rail x at any y (extrapolates beyond the rung span in both directions)
function railRX(y) {
  return TOP_RX + (y - TOP_Y) * (BOT_RX - TOP_RX) / (BOT_Y - TOP_Y);
}
function railLX(y) { return railRX(y) - RAIL_SEP; }

// Rung y + rail x positions from rung number (1=bottom, N=top)
// TOTAL_RUNGS = 5 for the maturity ladder
function rungCoords(num) {
  const t  = (TOTAL_RUNGS - num) / (TOTAL_RUNGS - 1);
  const y  = TOP_Y + t * (BOT_Y - TOP_Y);
  const rx = railRX(y);
  const lx = rx - RAIL_SEP;
  return { y, lx, rx };
}
```

---

## Wall (draw first — ladder renders on top)

```js
const wl = WALL_LEFT, wr = WALL_RIGHT, wt = WALL_TOP_Y;

// Top face: parallelogram — depth goes right+up (SLAB_DX=+18, SLAB_DY=-32)
`<polygon
  points="${wl+SLAB_DX},${wt+SLAB_DY} ${wr+SLAB_DX},${wt+SLAB_DY} ${wr},${wt} ${wl},${wt}"
  fill="#1A3050" stroke="${C.border2}" stroke-width="1.5"/>`

// Front face
`<rect x="${wl}" y="${wt}" width="${wr-wl}" height="${WALL_BOT_Y-wt}"
  fill="${C.panel2}" stroke="${C.border2}" stroke-width="1.5"/>`

// Cyan cap line on back edge of slab — the visual "data limit" line
`<line x1="${wl+SLAB_DX}" y1="${wt+SLAB_DY}" x2="${wr+SLAB_DX}" y2="${wt+SLAB_DY}"
  stroke="${C.cyan500}" stroke-width="5"/>`

// Wall label — use muted, not dim (dim is near-invisible on panel2 background)
`<text x="${Math.round((wl+wr)/2)}" y="${wt+52}"
  fill="${C.muted}" font-size="17" font-weight="600" letter-spacing="3"
  text-anchor="middle">YOUR DATA WALL</text>`
```

---

## Rails (draw before rungs and badges)

```js
// Left rail
`<line x1="${Math.round(railLX(RAIL_TOP_Y))}" y1="${RAIL_TOP_Y}"
       x2="${Math.round(railLX(RAIL_BOT_Y))}" y2="${RAIL_BOT_Y}"
  stroke="${C.cyan400}" stroke-width="7" stroke-linecap="round"/>`

// Right rail
`<line x1="${Math.round(railRX(RAIL_TOP_Y))}" y1="${RAIL_TOP_Y}"
       x2="${Math.round(railRX(RAIL_BOT_Y))}" y2="${RAIL_BOT_Y}"
  stroke="${C.cyan400}" stroke-width="7" stroke-linecap="round"/>`
```

---

## Rungs

```js
for (const num of [1,2,3,4,5]) {
  const { y, lx, rx } = rungCoords(num);
  `<line x1="${Math.round(lx)}" y1="${Math.round(y)}"
         x2="${Math.round(rx)}" y2="${Math.round(y)}"
    stroke="${C.cyan400}" stroke-width="5" stroke-linecap="round"/>`
}
```

---

## Badges (numbered circles)

Rungs **below** `WALL_TOP_Y` (data-supported): filled cyan, dark number.
Rungs **above** `WALL_TOP_Y` (beyond the data wall): dim outline, muted number.

```js
for (const num of [1,2,3,4,5]) {
  const { y, lx, rx } = rungCoords(num);
  const cx = Math.round((lx + rx) / 2);
  const cy = Math.round(y);
  const above = y < WALL_TOP_Y;
  `<circle cx="${cx}" cy="${cy}" r="20"
    fill="${above ? C.panel2 : C.cyan500}"
    stroke="${above ? C.border2 : 'none'}" stroke-width="1.5"/>`
  `<text x="${cx}" y="${cy+7}"
    fill="${above ? C.muted : C.bg}"
    font-size="19" font-weight="700" text-anchor="middle">${num}</text>`
}
```

---

## Labels

Right-align at `Math.round(lx) - 28` per rung so labels stagger naturally
with the diagonal. No leader lines needed.

```js
// RUNGS array: [{ num, name, data }, ...]  (5=top → 1=bottom)
for (const r of RUNGS) {
  const { y, lx } = rungCoords(r.num);
  const above = y < WALL_TOP_Y;
  const tx = Math.round(lx) - 28;
  const cy = Math.round(y);
  // Rung name: slightly dimmer above wall (cream2), brighter below (cream)
  `<text x="${tx}" y="${cy+2}"
    fill="${above ? C.cream2 : C.cream}"
    font-size="21" font-weight="600" text-anchor="end">${esc(r.name)}</text>`
  // Sub-label: always muted
  `<text x="${tx}" y="${cy+21}"
    fill="${C.muted}" font-size="15" text-anchor="end">${esc(r.data)}</text>`
}
```

---

## Negative space

The open area above the wall and between the rungs of 4–5 is intentionally
empty. That emptiness signals "unsupported." Do not add annotation labels
there — they destroy the visual signal. If the topic needs naming, put it in
the headline (heading line 1, cream, 78px), not in the diagram.