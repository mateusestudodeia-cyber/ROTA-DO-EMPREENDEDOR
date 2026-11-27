// Gerador SVG dos personagens palito (base para o componente Revideo).
const INK='#1B1F3B', CALOR='#F2A541', ALERTA='#E4572E', VERDE='#4CB963', PAPEL='#F5F1E8';
const L=(a,b,c,d,w=8,col=INK)=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
const POSES={
  neutro:[[-45,-95],[45,-95]],
  feliz:[[-70,-260],[70,-260]],
  tenso:[[-30,-255],[30,-255]],
  vergonha:[[-15,-110],[15,-110]],
  apontando:[[-45,-95],[95,-190]],
};
const FACES={
  neutro:`<circle cx="-13" cy="-235" r="4" fill="${INK}"/><circle cx="13" cy="-235" r="4" fill="${INK}"/>${L(-10,-215,10,-215,5)}`,
  feliz:`<circle cx="-13" cy="-237" r="4" fill="${INK}"/><circle cx="13" cy="-237" r="4" fill="${INK}"/><path d="M-16,-220 Q0,-202 16,-220" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`,
  tenso:`${L(-20,-248,-6,-243,4)}${L(20,-248,6,-243,4)}<circle cx="-13" cy="-234" r="4" fill="${INK}"/><circle cx="13" cy="-234" r="4" fill="${INK}"/><path d="M-14,-214 q5,-6 10,0 q5,6 10,0 q4,-5 8,0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M30,-250 q6,10 0,14 q-6,-4 0,-14z" fill="#6FB7E8"/>`,
  vergonha:`${L(-20,-232,-7,-232,4)}${L(7,-232,20,-232,4)}<ellipse cx="-22" cy="-220" rx="7" ry="4" fill="${ALERTA}" opacity=".5"/><ellipse cx="22" cy="-220" rx="7" ry="4" fill="${ALERTA}" opacity=".5"/><path d="M-9,-210 Q0,-218 9,-210" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`,
};
const ACC={
  caio:`<path d="M-37,-240 A38,38 0 0 1 37,-240 Z" fill="${CALOR}" stroke="${INK}" stroke-width="6"/><path d="M-37,-242 L-68,-236 L-38,-232" fill="${CALOR}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`,
  lucia:`<circle cx="0" cy="-278" r="14" fill="${INK}"/><path d="M-22,-150 L22,-150 L32,-80 L-32,-80 Z" fill="${ALERTA}" stroke="${INK}" stroke-width="5"/>`,
  bia:`<path d="M30,-250 q40,10 30,60" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`,
  tiago:`<circle cx="-14" cy="-235" r="11" fill="none" stroke="${INK}" stroke-width="4"/><circle cx="14" cy="-235" r="11" fill="none" stroke="${INK}" stroke-width="4"/>${L(-3,-235,3,-235,4)}`,
  jairo:`<path d="M-40,-252 L40,-252 L30,-272 L-30,-272 Z" fill="#7A7F8C" stroke="${INK}" stroke-width="5"/><path d="M-14,-222 q7,-6 14,0 q7,-6 14,0" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`,
};
function palito({x,y,s=1,quem='caio',pose='neutro',rosto=null}){
  const [la,ra]=POSES[pose]; const f=rosto||pose;
  const tilt = pose==='vergonha' ? 'rotate(12 0 -192)' : '';
  let extra='';
  if(quem==='bia') extra+=`<rect x="${ra[0]-8}" y="${ra[1]-28}" width="18" height="30" rx="4" fill="${INK}"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">
    ${L(0,-192,0,-90,9)}${L(0,-90,-40,0,9)}${L(0,-90,40,0,9)}
    ${quem==='lucia'?ACC.lucia:''}
    ${L(0,-170,la[0],la[1],8)}${L(0,-170,ra[0],ra[1],8)}${extra}
    <g transform="${tilt}"><circle cx="0" cy="-230" r="38" fill="#fff" stroke="${INK}" stroke-width="8"/>
    ${FACES[f]||FACES.neutro}${quem!=='lucia'&&ACC[quem]?ACC[quem]:''}</g></g>`;
}
module.exports={palito,INK,CALOR,ALERTA,VERDE,PAPEL};
if(require.main===module){
  const T=(x,y,t,sz=34,c=INK,w=700)=>`<text x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-size="${sz}" font-weight="${w}" fill="${c}" text-anchor="middle">${t}</text>`;
  let b=`<rect width="1920" height="1080" fill="${PAPEL}"/>`+T(960,80,'FOLHA DE MODELO — PERSONAGENS PALITO',44);
  b+=T(960,130,'Caio Reis · expressões',28,'#555',400);
  ['neutro','feliz','tenso','vergonha','apontando'].forEach((p,i)=>{const x=360+i*300;b+=palito({x,y:500,quem:'caio',pose:p,rosto:p==='apontando'?'feliz':null})+T(x,550,p,26);});
  b+=`<line x1="120" y1="610" x2="1800" y2="610" stroke="#ccc" stroke-width="3"/>`+T(960,660,'Elenco de apoio',28,'#555',400);
  [['lucia','Dona Lúcia'],['bia','Bia'],['tiago','Tiago'],['jairo','Seu Jairo']].forEach(([q,n],i)=>{const x=480+i*320;b+=palito({x,y:990,s:.9,quem:q})+T(x,1040,n,26);});
  require('fs').writeFileSync(process.argv[2],`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">${b}</svg>`);
}
