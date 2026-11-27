// Cena teste estilo "cinematográfico 2D" — 100% vetorial, CPU.
let seed=7; const R=()=>(seed=(seed*16807)%2147483647)/2147483647;
const INK='#1B1F3B', CALOR='#F2A541';
let s=`<defs>
<linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1424"/><stop offset="1" stop-color="#26304A"/></linearGradient>
<radialGradient id="luz" cx="0.5" cy="0" r="1"><stop offset="0" stop-color="#FFD98A" stop-opacity=".55"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient>
<radialGradient id="pele" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#F3D6B5"/><stop offset="1" stop-color="#C99B76"/></radialGradient>
<linearGradient id="mesa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6B4A34"/><stop offset="1" stop-color="#3B271B"/></linearGradient>
<filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs>
<rect width="1920" height="1080" fill="#2A2320"/>`;
// janela com cidade à noite (Contagem vista do 3º andar: prédios baixos)
s+=`<rect x="160" y="80" width="1600" height="640" fill="url(#ceu)"/>`;
for(let x=160;x<1760;){const w=60+R()*120,h=120+R()*260;s+=`<rect x="${x}" y="${720-h}" width="${w}" height="${h}" fill="#141B2E"/>`;
 for(let wy=720-h+15;wy<700;wy+=28)for(let wx=x+10;wx<x+w-14;wx+=22)if(R()<.35)s+=`<rect x="${wx}" y="${wy}" width="10" height="14" fill="${R()<.7?'#F7C873':'#9FC3E8'}" opacity="${.4+R()*.5}"/>`;
 x+=w+4;}
s+=`<g filter="url(#blur)" opacity=".5">`;for(let i=0;i<180;i++){const x=160+R()*1600,y=80+R()*600;s+=`<line x1="${x}" y1="${y}" x2="${x-8}" y2="${y+40}" stroke="#AFC4E0" stroke-width="2"/>`}s+=`</g>`;
s+=`<rect x="150" y="70" width="1620" height="660" fill="none" stroke="#3A302A" stroke-width="22"/><line x1="960" y1="70" x2="960" y2="730" stroke="#3A302A" stroke-width="16"/>`;
// luz da luminária
s+=`<path d="M540,505 L180,1080 L1000,1080 Z" fill="url(#luz)" opacity=".8"/>`;
// Caio
const cx=960;
s+=`<path d="M${cx-250},900 Q${cx-240},640 ${cx},620 Q${cx+240},640 ${cx+250},900 Z" fill="${CALOR}" stroke="${INK}" stroke-width="8"/>
<path d="M${cx-60},630 Q${cx},700 ${cx+60},630" fill="none" stroke="${INK}" stroke-width="6"/>
<line x1="${cx-25}" y1="660" x2="${cx-30}" y2="740" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="${cx+25}" y1="660" x2="${cx+30}" y2="740" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
<rect x="${cx-28}" y="560" width="56" height="70" fill="url(#pele)" stroke="${INK}" stroke-width="6"/>
<circle cx="${cx-165}" cy="430" r="32" fill="url(#pele)" stroke="${INK}" stroke-width="7"/><circle cx="${cx+165}" cy="430" r="32" fill="url(#pele)" stroke="${INK}" stroke-width="7"/>
<circle cx="${cx}" cy="420" r="175" fill="url(#pele)" stroke="${INK}" stroke-width="9"/>`;
// cachos + boné de lado
for(let i=0;i<9;i++){const a=Math.PI*(1.05+i*0.1);s+=`<circle cx="${cx+150*Math.cos(a)}" cy="${400+150*Math.sin(a)}" r="26" fill="#2B1D14"/>`}
s+=`<path d="M${cx-150},330 Q${cx},150 ${cx+150},330 Z" fill="${CALOR}" stroke="${INK}" stroke-width="9"/>
<path d="M${cx+140},320 Q${cx+250},300 ${cx+260},345 Q${cx+200},350 ${cx+145},340 Z" fill="${CALOR}" stroke="${INK}" stroke-width="8"/>`;
// rosto preocupado
s+=`<path d="M${cx-95},395 L${cx-35},415" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M${cx+95},395 L${cx+35},415" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
<ellipse cx="${cx-62}" cy="450" rx="15" ry="20" fill="${INK}"/><ellipse cx="${cx+62}" cy="450" rx="15" ry="20" fill="${INK}"/>
<path d="M${cx-40},525 Q${cx},500 ${cx+40},525" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`;
// mesa da cozinha + objetos
s+=`<path d="M0,830 L1920,830 L1920,1080 L0,1080 Z" fill="url(#mesa)"/><line x1="0" y1="830" x2="1920" y2="830" stroke="#8A6448" stroke-width="6"/>
<ellipse cx="${cx-120}" cy="860" rx="70" ry="34" fill="url(#pele)" stroke="${INK}" stroke-width="7"/><ellipse cx="${cx+120}" cy="860" rx="70" ry="34" fill="url(#pele)" stroke="${INK}" stroke-width="7"/>
<g transform="rotate(-8 1350 930)"><rect x="1250" y="870" width="230" height="130" rx="6" fill="#F5F1E8" stroke="${INK}" stroke-width="4"/><text x="1365" y="910" font-family="DejaVu Sans" font-weight="700" font-size="24" text-anchor="middle" fill="#E4572E">CONTA DE GÁS</text><text x="1365" y="950" font-family="DejaVu Sans" font-size="22" text-anchor="middle" fill="${INK}">VENCIDA</text></g>
<g transform="rotate(6 450 920)"><rect x="360" y="860" width="200" height="120" rx="4" fill="#fff" stroke="${INK}" stroke-width="4"/>${[0,1,2,3].map(i=>`<line x1="380" y1="${890+i*22}" x2="${500+R()*40}" y2="${890+i*22}" stroke="#888" stroke-width="4"/>`).join('')}</g>
<rect x="1560" y="760" width="110" height="80" rx="6" fill="#ddd" stroke="${INK}" stroke-width="5"/><path d="M1560,760 L1615,730 L1670,760" fill="#bbb" stroke="${INK}" stroke-width="5"/>`;
// luminária
s+=`<path d="M300,830 L340,830 L330,560 L460,470" fill="none" stroke="#1a1a1a" stroke-width="14" stroke-linecap="round"/><path d="M420,430 L560,470 L520,540 Z" fill="#1a1a1a"/><ellipse cx="540" cy="505" rx="26" ry="14" fill="#FFE7A8"/>`;
// texto estilo miniatura
s+=`<text x="60" y="1040" font-family="DejaVu Sans" font-weight="900" font-size="96" fill="#fff" stroke="#000" stroke-width="5" paint-order="stroke">200 VENDAS. R$ 0.</text>`;
require('fs').writeFileSync(process.argv[2],`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">${s}</svg>`);
