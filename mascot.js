// Dibuja la mascota (mancha oscura con borde blanco, dos ojitos y una boquita) como SVG.
// mood: "idle" | "ready" (boquita abierta) | "thinking" (ojos que miran de lado a lado)
function blobPath(x, y, w, h) {
  const p = (px, py) => `${(x + px * w).toFixed(2)} ${(y + py * h).toFixed(2)}`;
  return `M ${p(0.47, 0)} C ${p(0.8, 0)} ${p(1, 0.2)} ${p(1, 0.5)} C ${p(1, 0.8)} ${p(0.82, 1)} ${p(0.56, 1)} ` +
         `C ${p(0.25, 1)} ${p(0, 0.8)} ${p(0, 0.47)} C ${p(0, 0.18)} ${p(0.2, 0)} ${p(0.47, 0)} Z`;
}

function mascotSVG(w, h, mood, text) {
  const b = Math.max(2.5, h * 0.085);
  const iw = w - 2 * b, ih = h - 2 * b;
  let face = "";
  if (text) {
    const size = h * (text.length <= 2 ? 0.46 : 0.32);
    face = `<text x="${w / 2}" y="${h / 2}" dominant-baseline="central" text-anchor="middle"
      font-family="ui-rounded, -apple-system, 'Segoe UI', system-ui, sans-serif" font-weight="700"
      font-size="${size}" fill="#fff">${text.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>`;
  } else {
    const eye = (cx, cy, ew, eh) => {
      const W = iw * ew, H = ih * eh;
      return `<rect x="${b + iw * cx - W / 2}" y="${b + ih * cy - H / 2}" width="${W}" height="${H}" rx="${W / 2}" fill="#fff"/>`;
    };
    const cx = b + iw * 0.665, cy = b + ih * 0.7;
    let mouth;
    if (mood === "ready") {
      mouth = `<ellipse cx="${cx}" cy="${cy}" rx="${iw * 0.0375}" ry="${ih * 0.045}" fill="#fff"/>`;
    } else {
      const mw = iw * 0.08, mh = ih * 0.035, y0 = cy - mh / 2;
      mouth = `<path d="M ${cx - mw / 2} ${y0} Q ${cx} ${y0 + mh * 1.6} ${cx + mw / 2} ${y0}" stroke="#fff"
        stroke-width="${Math.max(1.3, iw * 0.028)}" stroke-linecap="round" fill="none"/>`;
    }
    const origin = `${b + iw * 0.66}px ${b + ih * 0.5}px`;
    face = `<g class="face ${mood}" style="transform-origin:${origin}">
      ${eye(0.57, 0.43, 0.115, 0.3)}${eye(0.75, 0.42, 0.085, 0.25)}${mouth}</g>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <path d="${blobPath(0.5, 0.5, w - 1, h - 1)}" fill="#fff" stroke="rgba(0,0,0,.12)" stroke-width="0.6"/>
    <path d="${blobPath(b, b, iw, ih)}" fill="#241f21"/>
    ${face}</svg>`;
}

function mascotWidth(text, h) {
  if (!text || text.length <= 2) return 62;
  const c = document.createElement("canvas").getContext("2d");
  c.font = `700 ${h * 0.32}px -apple-system, 'Segoe UI', system-ui, sans-serif`;
  return Math.max(62, Math.ceil(c.measureText(text).width) + 34);
}
