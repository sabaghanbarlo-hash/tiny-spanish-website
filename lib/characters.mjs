// Emma and Mateo as reusable inline SVG. To use official artwork later, drop PNG/WebP files in
// public/assets/characters/ and change `character()` to return an <img>. Everything else stays the same.
const EYES = {
  emma: { iris: '#2E9B73', lash: '#5A3A1E' },
  mateo: { iris: '#4A2A18', lash: '#2A160C' },
};

function eyes(who, mood) {
  const { iris } = EYES[who];
  const eye = (x, wink) => wink
    ? `<path d="M${x - 10} 101 Q${x} 92 ${x + 10} 101" fill="none" stroke="#3A2320" stroke-width="3.5" stroke-linecap="round"/>`
    : `<ellipse cx="${x}" cy="100" rx="10.5" ry="13" fill="#2B1B16"/><ellipse cx="${x}" cy="102" rx="8.5" ry="10.5" fill="${iris}"/>
       <ellipse cx="${x}" cy="104" rx="5" ry="6.5" fill="#1B100C"/><circle cx="${x - 3.5}" cy="95" r="4" fill="#fff"/><circle cx="${x + 4}" cy="106" r="2" fill="#fff"/>`;
  return eye(78, false) + eye(122, mood === 'wink');
}

function mouth(mood) {
  if (mood === 'open') return `<path d="M88 120 Q100 138 112 120 Z" fill="#B3262E" stroke="#3A2320" stroke-width="2.5" stroke-linejoin="round"/><path d="M93 128 Q100 134 107 128 Q100 125 93 128Z" fill="#FF8A8A"/>`;
  return `<path d="M90 121 Q100 131 110 121" fill="none" stroke="#3A2320" stroke-width="3" stroke-linecap="round"/>`;
}

function emma(mood, pose) {
  const hair = '#F3C97A', hairD = '#E3A94E', hoodie = '#3DBBAA', hoodieD = '#2A9585';
  const hand = pose === 'peace'
    ? `<path d="M136 176 C160 172 176 186 172 214 L142 214Z" fill="${hoodie}"/><g transform="translate(166 190) rotate(14)"><rect x="-9" y="-30" width="8" height="26" rx="4" fill="#FFE3CF" stroke="#E7B99B" stroke-width="1.5"/><rect x="2" y="-30" width="8" height="26" rx="4" fill="#FFE3CF" stroke="#E7B99B" stroke-width="1.5"/><circle cx="0" cy="2" r="14" fill="#FFE3CF" stroke="#E7B99B" stroke-width="1.5"/></g>`
    : '';
  return `
  <path d="M146 62 C196 58 214 128 178 196 C166 170 170 130 140 106Z" fill="${hairD}"/>
  <path d="M146 62 C190 62 204 120 176 182 C170 150 168 122 140 100Z" fill="${hair}"/>
  <ellipse cx="100" cy="86" rx="64" ry="62" fill="${hairD}"/>
  <path d="M52 205 C50 172 68 160 100 160 C132 160 150 172 148 205 L152 240 L48 240Z" fill="${hoodie}"/>
  <path d="M60 168 C74 196 126 196 140 168 C128 158 72 158 60 168Z" fill="${hoodieD}"/>
  <path d="M90 176 L88 206 M110 176 L112 206" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
  <rect x="88" y="140" width="24" height="26" rx="10" fill="#FBD9C0"/>
  <ellipse cx="100" cy="96" rx="54" ry="50" fill="#FFE3CF"/>
  <path d="M42 100 C36 6 164 6 158 100 C148 74 126 62 106 78 C96 60 60 66 42 100Z" fill="${hair}"/>
  <path d="M44 96 C40 120 42 142 36 160 C52 150 58 128 58 104Z" fill="${hair}"/>
  <path d="M156 96 C160 120 158 142 164 160 C148 150 142 128 142 104Z" fill="${hair}"/>
  <path d="M66 48 C86 34 120 34 138 50" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>
  <circle cx="146" cy="62" r="11" fill="#2FA89A"/><circle cx="146" cy="62" r="5" fill="#3DBBAA"/>
  ${eyes('emma', mood)}
  <ellipse cx="62" cy="116" rx="11" ry="7" fill="#FF9AA2" fill-opacity=".55"/><ellipse cx="138" cy="116" rx="11" ry="7" fill="#FF9AA2" fill-opacity=".55"/>
  ${mouth(mood)}
  ${hand}`;
}

function mateo(mood, pose) {
  const hair = '#3B2318', hairL = '#5A3A28', jacket = '#F58A33', jacketD = '#D96E1B';
  const hand = pose === 'thumbs'
    ? `<path d="M136 176 C160 172 176 186 172 214 L142 214Z" fill="${jacket}"/><g transform="translate(166 192)"><rect x="-6" y="-24" width="12" height="22" rx="6" fill="#EDBE95" stroke="#C9976E" stroke-width="1.5"/><rect x="-16" y="-8" width="32" height="24" rx="11" fill="#EDBE95" stroke="#C9976E" stroke-width="1.5"/></g>`
    : '';
  return `
  <path d="M52 205 C50 172 68 160 100 160 C132 160 150 172 148 205 L152 240 L48 240Z" fill="${jacket}"/>
  <path d="M82 160 L100 196 L118 160Z" fill="#FFF8EE"/>
  <path d="M64 166 L88 160 L100 196 L74 190Z" fill="${jacketD}"/><path d="M136 166 L112 160 L100 196 L126 190Z" fill="${jacketD}"/>
  <path d="M100 196 L100 240" stroke="${jacketD}" stroke-width="3"/>
  <rect x="88" y="140" width="24" height="26" rx="10" fill="#E3B089"/>
  <ellipse cx="100" cy="96" rx="54" ry="50" fill="#EDBE95"/>
  <path d="M40 102 C28 4 172 4 160 102 C158 92 154 86 148 82 C128 72 72 72 52 82 C46 86 42 92 40 102Z" fill="${hair}"/>
  <path d="M94 30 C90 14 104 8 114 12 C106 16 108 26 106 34Z" fill="${hair}"/>
  <path d="M64 44 C84 30 118 30 136 44" fill="none" stroke="${hairL}" stroke-width="5" stroke-linecap="round"/>
  ${eyes('mateo', mood)}
  <ellipse cx="62" cy="117" rx="11" ry="7" fill="#FF8A80" fill-opacity=".5"/><ellipse cx="138" cy="117" rx="11" ry="7" fill="#FF8A80" fill-opacity=".5"/>
  <g fill="#C9774A" fill-opacity=".7"><circle cx="64" cy="108" r="1.6"/><circle cx="72" cy="112" r="1.6"/><circle cx="60" cy="114" r="1.6"/><circle cx="136" cy="108" r="1.6"/><circle cx="128" cy="112" r="1.6"/><circle cx="140" cy="114" r="1.6"/></g>
  ${mouth(mood)}
  ${hand}`;
}

/** Full-body-ish bust (default) or head-only avatar. */
export function character(who, { mood = 'smile', pose = '', head = false, label = '', cls = '' } = {}) {
  const art = who === 'emma' ? emma(mood, pose) : mateo(mood, pose);
  const view = head ? '28 2 144 152' : '0 0 220 240';
  const name = who === 'emma' ? 'Emma' : 'Mateo';
  const aria = label || `${name}, a cartoon character`;
  return `<svg class="char char-${who} ${head ? 'char-head' : ''} ${cls}" viewBox="${view}" role="img" aria-label="${aria}" xmlns="http://www.w3.org/2000/svg">${art}</svg>`;
}

let gid = 0;

/** Sagrada-Familia-style spires (tapered towers, pointed caps, red finials). */
export function skyline() {
  const id = `st${gid++}`;
  const tower = (x, h, w = 22, cap = 46) => {
    const top = 200 - h, off = w * 0.14, rows = Math.max(1, Math.floor(h / 30));
    const wins = Array.from({ length: rows }, (_, i) => `<rect x="${w / 2 - 2.5}" y="${top + 16 + i * 28}" width="5" height="14" rx="2.5" fill="#B9763A" opacity=".55"/>`).join('');
    return `<g transform="translate(${x} 0)"><path d="M0 200 L${off * 0.4} ${top + 24} L${off} ${top} H${w - off} L${w - off * 0.4} ${top + 24} L${w} 200Z" fill="url(#${id})"/>${wins}
    <path d="M${off - 2} ${top} L${w / 2} ${top - cap} L${w - off + 2} ${top}Z" fill="#E5A85F"/><path d="M${w / 2} ${top - cap} L${w - off + 2} ${top} H${w / 2}Z" fill="#CF8A44"/>
    <circle cx="${w / 2}" cy="${top - cap - 4}" r="3.6" fill="#C8202F"/></g>`;
  };
  return `<svg class="skyline" viewBox="0 0 300 220" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F6CE8A"/><stop offset=".6" stop-color="#EDB56C"/><stop offset="1" stop-color="#D99A52"/></linearGradient></defs><g transform="translate(0 20)"><rect x="8" y="180" width="284" height="20" rx="6" fill="#D99A52"/>${tower(16, 100)}${tower(54, 140)}${tower(96, 160, 28)}${tower(142, 120)}${tower(180, 150)}${tower(222, 110)}${tower(258, 130)}</g></svg>`;
}

/** Pastel Barcelona-style buildings with shutters and balconies (hero, left side). */
export function buildings() {
  const bld = (x, w, h, wall) => {
    const top = 360 - h, cols = w > 74 ? 2 : 1, rows = Math.floor((h - 40) / 64);
    let s = `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/><rect x="${x}" y="${top}" width="${w}" height="10" fill="#3A2320" opacity=".12"/>`;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const cw = w / cols, wx = x + c * cw + cw / 2 - 9, wy = top + 26 + r * 64;
      s += `<rect x="${wx}" y="${wy}" width="18" height="34" rx="9" fill="#5B7FA6"/><rect x="${wx - 6}" y="${wy + 2}" width="5" height="30" rx="1" fill="#3E8E7E"/><rect x="${wx + 19}" y="${wy + 2}" width="5" height="30" rx="1" fill="#3E8E7E"/><rect x="${wx - 8}" y="${wy + 38}" width="34" height="5" rx="2" fill="#3A2320" opacity=".7"/>`;
    }
    return s;
  };
  return `<svg class="hero-buildings" viewBox="0 0 240 360" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${bld(0, 84, 300, '#F4B7A4')}${bld(84, 70, 240, '#F7D49A')}${bld(154, 80, 330, '#F2A98F')}<circle cx="64" cy="318" r="30" fill="#5DAA6A"/><circle cx="86" cy="326" r="24" fill="#4C9A5C"/><rect x="0" y="340" width="240" height="20" fill="#E8B98F"/></svg>`;
}

/** Spanish flag on a pole. */
export function flag() {
  return `<svg class="flag" viewBox="0 0 90 150" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="5" height="140" rx="2.5" fill="#6B4A3A"/><circle cx="10.5" cy="7" r="5" fill="#FFC93C"/><path d="M13 14 C34 6 52 24 84 14 V62 C52 72 34 54 13 62Z" fill="#C8202F"/><path d="M13 30 C34 22 52 40 84 30 V46 C52 56 34 38 13 46Z" fill="#FFC93C"/><circle cx="34" cy="38" r="3.6" fill="#B5802A"/></svg>`;
}

/** Friendly kawaii bull mascot (bust) with a red neckerchief. */
export function bull({ cls = '' } = {}) {
  return `<svg class="char char-bull ${cls}" viewBox="0 0 220 200" role="img" aria-label="A friendly cartoon bull" xmlns="http://www.w3.org/2000/svg">
  <path d="M54 60 C20 62 4 32 18 6 C24 30 44 40 68 46Z" fill="#F3E3C5"/><path d="M166 60 C200 62 216 32 202 6 C196 30 176 40 152 46Z" fill="#F3E3C5"/>
  <ellipse cx="36" cy="90" rx="22" ry="13" transform="rotate(-28 36 90)" fill="#2E2628"/><ellipse cx="36" cy="90" rx="12" ry="6.5" transform="rotate(-28 36 90)" fill="#F2A7B0"/>
  <ellipse cx="184" cy="90" rx="22" ry="13" transform="rotate(28 184 90)" fill="#2E2628"/><ellipse cx="184" cy="90" rx="12" ry="6.5" transform="rotate(28 184 90)" fill="#F2A7B0"/>
  <ellipse cx="110" cy="100" rx="72" ry="66" fill="#3A3032"/>
  <path d="M86 40 C92 24 112 22 118 38 C108 32 96 34 86 40Z" fill="#2E2628"/>
  <ellipse cx="110" cy="130" rx="42" ry="29" fill="#5A484A"/><ellipse cx="96" cy="128" rx="4.5" ry="6" fill="#241A1C"/><ellipse cx="124" cy="128" rx="4.5" ry="6" fill="#241A1C"/>
  <ellipse cx="80" cy="96" rx="9.5" ry="12.5" fill="#150D0F"/><ellipse cx="140" cy="96" rx="9.5" ry="12.5" fill="#150D0F"/>
  <circle cx="77" cy="91" r="3.8" fill="#fff"/><circle cx="137" cy="91" r="3.8" fill="#fff"/><circle cx="83" cy="101" r="1.8" fill="#fff"/><circle cx="143" cy="101" r="1.8" fill="#fff"/>
  <ellipse cx="60" cy="116" rx="11" ry="7" fill="#FF8A98" fill-opacity=".6"/><ellipse cx="160" cy="116" rx="11" ry="7" fill="#FF8A98" fill-opacity=".6"/>
  <path d="M96 141 Q110 152 124 141" fill="none" stroke="#F3E3C5" stroke-width="3" stroke-linecap="round"/>
  <path d="M56 158 C84 180 136 180 164 158 L174 180 C136 202 84 202 46 180Z" fill="#C8202F"/><path d="M96 172 L110 196 L124 172Z" fill="#9E1522"/>
</svg>`;
}

/** Night skyline with lit windows (CTA banner). */
export function cityLights() {
  const blds = [[0, 38, 70], [34, 30, 104], [60, 44, 82], [100, 34, 112], [130, 46, 76], [172, 32, 98], [200, 44, 66], [240, 30, 90]];
  const out = blds.map(([x, w, h], i) => {
    const top = 120 - h; let win = '';
    for (let r = 0; r < Math.floor((h - 10) / 16); r++) for (let c = 0; c < Math.floor(w / 12); c++) if ((i * 7 + r * 3 + c * 5) % 4 !== 0) win += `<rect x="${x + 5 + c * 11}" y="${top + 8 + r * 16}" width="5" height="8" rx="1" fill="#FFC93C"/>`;
    return `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#2B2260"/>${win}`;
  }).join('');
  return `<svg class="city-svg" viewBox="0 0 280 120" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${out}</svg>`;
}
