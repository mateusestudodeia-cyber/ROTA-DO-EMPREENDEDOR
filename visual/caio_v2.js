// Caio v2 — estilo "cabeção cartoon + cenário cinematográfico desfocado". 100% vetorial/CPU.
let seed=11; const R=()=>(seed=(seed*16807)%2147483647)/2147483647;
const INK='#15161C', W=1920,H=1080, cx=960;
let s=`<defs>
<linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1220"/><stop offset="1" stop-color="#1E2A40"/></linearGradient>
<radialGradient id="pele" cx=".42" cy=".38" r=".75"><stop offset="0" stop-color="#F6E2C8"/><stop offset=".7" stop-color="#E6C6A2"/><stop offset="1" stop-color="#B98F6C"/></radialGradient>
<radialGradient id="mao" cx=".45" cy=".35" r=".8"><stop offset="0" stop-color="#F3DCC0"/><stop offset="1" stop-color="#C9A07D"/></radialGradient>
<linearGradient id="moletom" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9A23B"/><stop offset="1" stop-color="#A86A1E"/></linearGradient>
<linearGradient id="mesa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9AA3B2"/><stop offset="1" stop-color="#4A5162"/></linearGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFD89A" stop-opacity=".55"/><stop offset="1" stop-color="#FFD89A" stop-opacity="0"/></radialGradient>
<radialGradient id="vinh" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".65"/></radialGradient>
<filter id="b6"><feGaussianBlur stdDeviation="6"/></filter><filter id="b3"><feGaussianBlur stdDeviation="2.5"/></filter>
<filter id="sombra"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-opacity=".45"/></filter>
</defs><rect width="${W}" height="${H}" fill="#121722"/>`;
// janela panorâmica com cidade desfocada
s+=`<g filter="url(#b6)"><rect x="0" y="0" width="${W}" height="900" fill="url(#ceu)"/>`;
for(let x=-20;x<W;){const w=70+R()*150,h=200+R()*420;s+=`<rect x="${x}" y="${880-h}" width="${w}" height="${h}" fill="#162035"/>`;
 for(let wy=880-h+20;wy<860;wy+=30)for(let wx=x+10;wx<x+w-14;wx+=24)if(R()<.33)s+=`<rect x="${wx}" y="${wy}" width="12" height="16" fill="${R()<.75?'#F3C47A':'#8FB5E0'}" opacity="${.35+R()*.55}"/>`;
 x+=w+6;}
for(let i=0;i<40;i++)s+=`<circle cx="${R()*W}" cy="${450+R()*420}" r="${8+R()*22}" fill="${R()<.6?'#FFCF7A':'#FF6B5A'}" opacity="${.15+R()*.3}"/>`;
s+=`</g>`;
// gotas no vidro + escorridos
s+=`<g opacity=".55">`;for(let i=0;i<260;i++){const x=R()*W,y=R()*880,r=1.5+R()*4;s+=`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*1.3}" fill="#BFD3EE" opacity="${.3+R()*.5}"/>`;if(R()<.12)s+=`<line x1="${x}" y1="${y}" x2="${x+1}" y2="${y+40+R()*90}" stroke="#BFD3EE" stroke-width="${r*.7}" opacity=".35"/>`}s+=`</g>`;
s+=`<g filter="url(#b3)" opacity=".35">`;for(let i=0;i<140;i++){const x=R()*W,y=R()*880;s+=`<line x1="${x}" y1="${y}" x2="${x-10}" y2="${y+55}" stroke="#C9D8EE" stroke-width="2"/>`}s+=`</g>`;
// caixilhos
s+=`<rect x="300" y="0" width="26" height="900" fill="#0A0D14"/><rect x="1594" y="0" width="26" height="900" fill="#0A0D14"/>`;
// quadro de metas na parede (cortiça) — elemento-assinatura do Caio
s+=`<g filter="url(#sombra)"><rect x="1260" y="60" width="300" height="400" rx="6" fill="#B98B5E" stroke="#5E4128" stroke-width="8"/>
<rect x="1290" y="90" width="240" height="340" fill="#F4EFE4"/>
<text x="1410" y="130" font-family="DejaVu Sans" font-weight="700" font-size="26" fill="#333" text-anchor="middle">MARMITAS</text>
${['Vendidas: 200 ✓','Faturou: R$ 2.400 ✓','Custo real: ???','Lucro: ???'].map((t,i)=>`<text x="1305" y="${185+i*58}" font-family="DejaVu Sans" font-size="22" fill="${i>1?'#C0392B':'#333'}">${t}</text>`).join('')}
<circle cx="1410" cy="78" r="10" fill="#D33"/></g>`;
// luminária de mesa (esquerda) + brilho
s+=`<ellipse cx="420" cy="560" rx="520" ry="420" fill="url(#glow)"/>
<path d="M240,880 L290,880 L270,620 L430,470" fill="none" stroke="#1C2230" stroke-width="18" stroke-linecap="round"/>
<path d="M360,400 C430,360 540,400 560,470 L470,540 C430,480 390,450 360,400 Z" fill="#1F2738" stroke="#0C0F16" stroke-width="5"/>
<ellipse cx="515" cy="505" rx="44" ry="18" transform="rotate(-38 515 505)" fill="#FFEFC4"/>`;
// cadeira
s+=`<rect x="${cx-330}" y="470" width="660" height="460" rx="70" fill="#20242E" stroke="#0C0F16" stroke-width="6"/>`;
// corpo: moletom mostarda com capuz
s+=`<g filter="url(#sombra)"><path d="M${cx-380},900 C${cx-380},700 ${cx-300},610 ${cx-150},590 L${cx+150},590 C${cx+300},610 ${cx+380},700 ${cx+380},900 Z" fill="url(#moletom)" stroke="${INK}" stroke-width="7"/>
<path d="M${cx-190},600 C${cx-150},680 ${cx+150},680 ${cx+190},600" fill="#C98729" stroke="${INK}" stroke-width="6"/>
<path d="M${cx-60},655 L${cx-70},770" stroke="#F4EFE4" stroke-width="8" stroke-linecap="round"/><path d="M${cx+60},655 L${cx+70},770" stroke="#F4EFE4" stroke-width="8" stroke-linecap="round"/>
<path d="M${cx-200},840 Q${cx},800 ${cx+200},840" fill="none" stroke="#9A621C" stroke-width="6"/></g>`;
// cabeça grande
s+=`<rect x="${cx-55}" y="470" width="110" height="140" fill="url(#pele)" stroke="${INK}" stroke-width="7"/><g filter="url(#sombra)">
<ellipse cx="${cx-225}" cy="370" rx="34" ry="46" fill="url(#pele)" stroke="${INK}" stroke-width="7"/><ellipse cx="${cx+225}" cy="370" rx="34" ry="46" fill="url(#pele)" stroke="${INK}" stroke-width="7"/>
<path d="M${cx-232},360 C${cx-240},120 ${cx+240},120 ${cx+232},360 C${cx+228},560 ${cx-228},560 ${cx-232},360 Z" fill="url(#pele)" stroke="${INK}" stroke-width="8"/>
<path d="M${cx-215},250 C${cx-200},120 ${cx+200},120 ${cx+215},250 C${cx+140},200 ${cx-140},200 ${cx-215},250 Z" fill="#2A1C14" opacity=".92"/>
${Array.from({length:14},(_,i)=>{const a=Math.PI*(1.08+i*0.06);return `<circle cx="${cx+205*Math.cos(a)}" cy="${300+150*Math.sin(a)}" r="20" fill="#2A1C14"/>`}).join('')}
</g>`;
// rosto (sobrancelhas em cunha, olhos com brilho, boca pequena)
s+=`<path d="M${cx-140},300 L${cx-40},345 L${cx-48},362 L${cx-145},322 Z" fill="${INK}"/><path d="M${cx+140},300 L${cx+40},345 L${cx+48},362 L${cx+145},322 Z" fill="${INK}"/>
<ellipse cx="${cx-80}" cy="400" rx="22" ry="27" fill="${INK}"/><ellipse cx="${cx+80}" cy="400" rx="22" ry="27" fill="${INK}"/>
<circle cx="${cx-72}" cy="390" r="7" fill="#fff"/><circle cx="${cx+88}" cy="390" r="7" fill="#fff"/>
<path d="M${cx-48},480 Q${cx},450 ${cx+48},480" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
<ellipse cx="${cx-150}" cy="450" rx="26" ry="14" fill="#E08A6A" opacity=".25"/><ellipse cx="${cx+150}" cy="450" rx="26" ry="14" fill="#E08A6A" opacity=".25"/>`;
// mesa + mãos entrelaçadas + papéis
s+=`<path d="M0,880 L${W},880 L${W},${H} L0,${H} Z" fill="url(#mesa)"/><rect x="0" y="872" width="${W}" height="12" fill="#C4CBD6"/>
<g filter="url(#sombra)"><ellipse cx="${cx-75}" cy="880" rx="95" ry="44" fill="url(#mao)" stroke="${INK}" stroke-width="7"/><ellipse cx="${cx+75}" cy="880" rx="95" ry="44" fill="url(#mao)" stroke="${INK}" stroke-width="7"/>
${[-45,-15,15,45].map(d=>`<path d="M${cx+d},850 q8,25 0,55" fill="none" stroke="${INK}" stroke-width="4" opacity=".6"/>`).join('')}</g>
<g filter="url(#sombra)"><g transform="rotate(-10 1400 960)"><rect x="1290" y="905" width="250" height="150" fill="#F7F5EF"/><text x="1415" y="950" font-family="DejaVu Sans" font-weight="700" font-size="26" fill="#C0392B" text-anchor="middle">CONTA DE GÁS</text><text x="1415" y="990" font-family="DejaVu Sans" font-size="22" fill="#333" text-anchor="middle">VENCIDA</text></g>
<g transform="rotate(7 1600 970)"><rect x="1520" y="920" width="220" height="140" fill="#EFEBE2"/>${[0,1,2,3].map(i=>`<rect x="1540" y="${945+i*26}" width="${120+R()*60}" height="8" fill="#999"/>`).join('')}</g></g>`;
s+=`<rect width="${W}" height="${H}" fill="url(#vinh)"/>`;
require('fs').writeFileSync(process.argv[2],`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${s}</svg>`);
