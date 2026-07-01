// Builds the LinkedIn feed portrait for the data-ai-maturity-ladder post.
//   Usage:  node scripts/build-maturity-ladder-portrait.mjs
//   Output: social/linkedin/data-ai-maturity-ladder-feed-portrait.png  (2160x2700 @ 2x)
//
// Shared chrome (background, header, constellation, footer, byline, render)
// lives in scripts/lib/portrait.mjs. This file owns only the bespoke diagram:
// a leaning ladder resting on a "data wall". See references/ladder-geometry.md
// in the linkedin-portrait skill for the geometry rationale.

import { renderPortrait, C, esc } from './lib/portrait.mjs';

// ── Rung data (1 = bottom, 5 = top) ──────────────────────────────────────────
const RUNGS = [
  { num: 5, name: 'Self-improving',   data: 'Outcome feedback loop'      },
  { num: 4, name: 'Embedded AI',      data: 'Aligned pipelines'          },
  { num: 3, name: 'Trusted tool',     data: 'Governed, queryable source' },
  { num: 2, name: 'First automation', data: 'One consistent source'      },
  { num: 1, name: 'One-off tasks',    data: 'Carry it in by hand'        },
];

// ── Geometry ──────────────────────────────────────────────────────────────────
//
// Leaning ladder: the right rail's bottom lands at WALL_LEFT so all lower
// rungs sit in front of the wall. Rail rises up-right, crossing the wall's
// cyan top edge — the visible crossing is the "resting on the wall" moment.
// Rungs 4-5 extend freely above the wall top (no data backing them).
//
const WALL_LEFT  = 420;   // wall left edge; right rail bottom lands here
const WALL_RIGHT = 1062;  // extends to canvas right edge
const WALL_TOP_Y = 625;   // between rung 4 (≈538) and rung 3 (≈715)
const WALL_BOT_Y = 1120;  // stops above footer

const TOP_Y  = 360;   // rung 5 y (shifted down to give header room)
const BOT_Y  = 1070;  // rung 1 y

// Right rail: from (700, 360) down to (WALL_LEFT, 1070)
const TOP_RX   = 700;
const BOT_RX   = WALL_LEFT;
const RAIL_SEP = 115;   // horizontal gap between the two rails

// 2.5D slab: depth goes right+up (viewer is to the left of the wall)
const SLAB_DX = 18;
const SLAB_DY = -32;

function railRX(y) {
  return TOP_RX + (y - TOP_Y) * (BOT_RX - TOP_RX) / (BOT_Y - TOP_Y);
}
function railLX(y) { return railRX(y) - RAIL_SEP; }

function rungCoords(num) {
  const t  = (5 - num) / 4;
  const y  = TOP_Y + t * (BOT_Y - TOP_Y);
  const rx = railRX(y);
  const lx = rx - RAIL_SEP;
  return { t, y, lx, rx };
}

const RAIL_TOP_Y = TOP_Y - 50;   // rails extend 50px above rung 5
const RAIL_BOT_Y = WALL_BOT_Y;   // rails reach wall/floor level

// ── Diagram: wall + ladder + labels ──────────────────────────────────────────
function buildDiagram() {
  const out = [];
  const wl = WALL_LEFT, wr = WALL_RIGHT, wt = WALL_TOP_Y;

  // Wall top face (2.5D slab)
  out.push(`<polygon
    points="${wl+SLAB_DX},${wt+SLAB_DY} ${wr+SLAB_DX},${wt+SLAB_DY} ${wr},${wt} ${wl},${wt}"
    fill="#1A3050" stroke="${C.border2}" stroke-width="1.5"/>`);

  // Wall front face
  out.push(`<rect x="${wl}" y="${wt}" width="${wr-wl}" height="${WALL_BOT_Y-wt}"
    fill="${C.panel2}" stroke="${C.border2}" stroke-width="1.5"/>`);

  // Cyan cap line on back edge of slab
  out.push(`<line x1="${wl+SLAB_DX}" y1="${wt+SLAB_DY}" x2="${wr+SLAB_DX}" y2="${wt+SLAB_DY}"
    stroke="${C.cyan500}" stroke-width="5"/>`);

  // Wall label — just below the cyan cap line, centered on the wall face
  out.push(`<text x="${Math.round((wl+wr)/2)}" y="${wt+52}"
    fill="${C.muted}" font-size="17" font-weight="600" letter-spacing="3"
    text-anchor="middle">YOUR DATA WALL</text>`);

  // Extended rails (50px above rung 5 down to wall/floor level)
  out.push(`<line
    x1="${Math.round(railLX(RAIL_TOP_Y))}" y1="${RAIL_TOP_Y}"
    x2="${Math.round(railLX(RAIL_BOT_Y))}" y2="${RAIL_BOT_Y}"
    stroke="${C.cyan400}" stroke-width="7" stroke-linecap="round"/>`);
  out.push(`<line
    x1="${Math.round(railRX(RAIL_TOP_Y))}" y1="${RAIL_TOP_Y}"
    x2="${Math.round(railRX(RAIL_BOT_Y))}" y2="${RAIL_BOT_Y}"
    stroke="${C.cyan400}" stroke-width="7" stroke-linecap="round"/>`);

  // Rungs
  for (const num of [1,2,3,4,5]) {
    const { y, lx, rx } = rungCoords(num);
    out.push(`<line x1="${Math.round(lx)}" y1="${Math.round(y)}"
               x2="${Math.round(rx)}" y2="${Math.round(y)}"
      stroke="${C.cyan400}" stroke-width="5" stroke-linecap="round"/>`);
  }

  // Badges — cyan for rungs 1-3 (below wall), dim outline for 4-5 (above wall)
  for (const num of [1,2,3,4,5]) {
    const { y, lx, rx } = rungCoords(num);
    const cx = Math.round((lx+rx)/2);
    const cy = Math.round(y);
    const above = y < WALL_TOP_Y;
    out.push(`<circle cx="${cx}" cy="${cy}" r="20"
      fill="${above ? C.panel2 : C.cyan500}"
      stroke="${above ? C.border2 : 'none'}" stroke-width="1.5"/>`);
    out.push(`<text x="${cx}" y="${cy+7}"
      fill="${above ? C.muted : C.bg}"
      font-size="19" font-weight="700" text-anchor="middle">${num}</text>`);
  }

  // Labels — rung name + data requirement, right-aligned to left of left rail
  for (const r of RUNGS) {
    const { y, lx } = rungCoords(r.num);
    const above = y < WALL_TOP_Y;
    const tx = Math.round(lx) - 28;
    const cy = Math.round(y);
    out.push(`<text x="${tx}" y="${cy+2}"
      fill="${above ? C.cream2 : C.cream}"
      font-size="21" font-weight="600" text-anchor="end">${esc(r.name)}</text>`);
    out.push(`<text x="${tx}" y="${cy+21}"
      fill="${C.muted}" font-size="15" text-anchor="end">${esc(r.data)}</text>`);
  }

  return out.join('\n');
}

await renderPortrait({
  slug:    'data-ai-maturity-ladder',
  eyebrow: 'DATA & AI MATURITY',
  heading: ['The AI rung', 'your data can hold'],
  diagram: buildDiagram(),
});
