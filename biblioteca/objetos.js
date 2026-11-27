// Objetos no mesmo estilo do Carlos: preenchimento branco, contorno preto grosso, 1 cor de destaque.
const INK='#1A1A1A', TEAL='#1E88A8', RED='#E4572E', GREEN='#3FA34D', PAPER='#FFFFFF';
const g=(x,y,s,r,body)=>`<g transform="translate(${x},${y}) rotate(${r||0}) scale(${s})">${body}</g>`;
const marmita=(x,y,s=1,r=0,vapor=0)=>g(x,y,s,r,
 `<path d="M-62,-20 L62,-20 L54,40 Q54,48 46,48 L-46,48 Q-54,48 -54,40 Z" fill="${PAPER}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <rect x="-70" y="-38" width="140" height="20" rx="6" fill="#E9E4D8" stroke="${INK}" stroke-width="7"/>
  ${[-25,0,25].map((dx,i)=>`<path d="M${dx},-48 q-9,-12 0,-24 q9,-12 0,-24" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" opacity="${.35+.4*Math.abs(Math.sin(vapor*3+i))}"/>`).join('')}`);
const nota=(x,y,s=1,r=0)=>g(x,y,s,r,
 `<rect x="-80" y="-42" width="160" height="84" rx="8" fill="#D8F0DA" stroke="${INK}" stroke-width="6"/>
  <circle r="26" fill="${PAPER}" stroke="${INK}" stroke-width="5"/><text y="10" font-family="DejaVu Sans" font-weight="800" font-size="26" text-anchor="middle" fill="${GREEN}">R$</text>`);
const moeda=(x,y,s=1)=>g(x,y,s,0,`<circle r="28" fill="#F6D776" stroke="${INK}" stroke-width="6"/><text y="9" font-family="DejaVu Sans" font-weight="800" font-size="24" text-anchor="middle" fill="${INK}">$</text>`);
const conta=(x,y,s=1,r=0,titulo='CONTA',valor='',carimbo=true)=>g(x,y,s,r,
 `<path d="M-90,-120 L90,-120 L90,120 L-90,120 Z" fill="${PAPER}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <text y="-78" font-family="DejaVu Sans" font-weight="800" font-size="30" text-anchor="middle" fill="${INK}">${titulo}</text>
  ${[0,1,2].map(i=>`<line x1="-62" y1="${-40+i*28}" x2="${40-i*18}" y2="${-40+i*28}" stroke="#AAA" stroke-width="7" stroke-linecap="round"/>`).join('')}
  <text y="70" font-family="DejaVu Sans" font-weight="800" font-size="34" text-anchor="middle" fill="${INK}">${valor}</text>
  ${carimbo?`<g transform="translate(20,20) rotate(-18)"><rect x="-78" y="-24" width="156" height="48" rx="6" fill="none" stroke="${RED}" stroke-width="6"/><text y="11" font-family="DejaVu Sans" font-weight="900" font-size="30" text-anchor="middle" fill="${RED}">VENCIDA</text></g>`:''}`);
const balaoPensamento=(x,y,s=1,txt='')=>g(x,y,s,0,
 `<circle cx="-150" cy="150" r="12" fill="${PAPER}" stroke="${INK}" stroke-width="5"/><circle cx="-115" cy="105" r="20" fill="${PAPER}" stroke="${INK}" stroke-width="6"/>
  <ellipse rx="190" ry="95" fill="${PAPER}" stroke="${INK}" stroke-width="7"/>
  <text y="22" font-family="DejaVu Sans" font-weight="900" font-size="64" text-anchor="middle" fill="${INK}">${txt}</text>`);
const mesa=(x,y,s=1)=>g(x,y,s,0,`<rect x="-260" y="-14" width="520" height="28" rx="6" fill="${PAPER}" stroke="${INK}" stroke-width="7"/><line x1="-220" y1="14" x2="-220" y2="150" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><line x1="220" y1="14" x2="220" y2="150" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`);
module.exports={marmita,nota,moeda,conta,balaoPensamento,mesa,INK,TEAL,RED,GREEN};
