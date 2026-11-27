// Carlos — personagem palito articulado (SVG puro, anima em CPU).
const INK='#1A1A1A', COR='#1E88A8', PELE='#FFFFFF', RED='#E4572E';
const R=62; // raio da cabeça
const J={ombro:[0,-150], quadril:[0,-62], cabeca:[0,-252]};
const SEG={braco:44, antebraco:42, coxa:32, canela:32};
const rad=a=>a*Math.PI/180;
const P=(o,a,l)=>[o[0]+Math.sin(rad(a))*l, o[1]+Math.cos(rad(a))*l];
// ângulos a partir de "para baixo"; positivo = para a direita da tela
const POSES={
  em_pe:      {lb:-14,la:-8,  rb:14,ra:8,   lc:-11,lk:-4, rc:11,rk:4},
  acenando:   {lb:-14,la:-8,  rb:110,ra:150,lc:-11,lk:-4, rc:11,rk:4},
  apontando:  {lb:-14,la:-8,  rb:92,ra:94,  lc:-11,lk:-4, rc:11,rk:4},
  pensando:   {lb:-10,la:70,  rb:90,ra:-135,lc:-11,lk:-4, rc:11,rk:4},
  comemorando:{lb:-125,la:-145,rb:125,ra:145,lc:-18,lk:-8,rc:55,rk:-25},
  desespero:  {lb:-110,la:-150,rb:110,ra:150,lc:-26,lk:12, rc:26,rk:-12},
  bracos_cruzados:{lb:-14,la:75,rb:14,ra:-75,lc:-11,lk:-4, rc:11,rk:4},
  andando_a:  {lb:-28,la:-12, rb:26,ra:40,  lc:-24,lk:-8, rc:22,rk:40},
  andando_b:  {lb:26,la:40,   rb:-28,ra:-12,lc:22,lk:40,  rc:-24,rk:-8},
  triste:     {lb:-18,la:-6,  rb:18,ra:6,    lc:-8,lk:-3,  rc:8,rk:3},
};
const lerp=(a,b,t)=>a+(b-a)*t;
function mix(p1,p2,t){const o={};for(const k in POSES[p1])o[k]=lerp(POSES[p1][k],POSES[p2][k],t);return o;}
const ln=(a,b,w=9)=>`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${INK}" stroke-width="${w}" stroke-linecap="round"/>`;
const arc=(d,w=6,f='none')=>`<path d="${d}" fill="${f}" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
function olhos({dx=0,dy=0,esc=1,piscar=false}={}){
  if(piscar) return arc(`M-34,-2 q10,6 20,0`,5)+arc(`M14,-2 q10,6 20,0`,5);
  return [-24,24].map(x=>`<ellipse cx="${x}" cy="-2" rx="${8*esc}" ry="${11*esc}" fill="${INK}"/><circle cx="${x+dx+3}" cy="${-6+dy}" r="${3*esc}" fill="#fff"/>`).join('');
}
const EXPR={
  neutro:o=>olhos(o)+arc('M-12,30 L12,30',6),
  feliz:o=>olhos(o)+arc('M-20,22 Q0,42 20,22'),
  rindo:()=>arc('M-34,0 q10,-12 20,0',5)+arc('M14,0 q10,-12 20,0',5)+`<path d="M-24,18 Q0,58 24,18 Z" fill="${INK}"/><path d="M-11,38 Q0,50 11,38 Q0,32 -11,38Z" fill="${RED}"/>`,
  triste:o=>olhos(o)+arc('M-36,-26 L-14,-20',5)+arc('M36,-26 L14,-20',5)+arc('M-16,36 Q0,24 16,36'),
  bravo:o=>olhos(o)+arc('M-38,-24 L-12,-14',7)+arc('M38,-24 L12,-14',7)+arc('M-16,34 Q0,26 16,34'),
  surpreso:o=>olhos({...o,esc:1.3})+arc('M-36,-32 Q-24,-40 -12,-32',5)+arc('M12,-32 Q24,-40 36,-32',5)+`<ellipse cx="0" cy="32" rx="9" ry="12" fill="${INK}"/>`,
  pensativo:o=>olhos({...o,dx:3,dy:-3})+arc('M12,-30 Q24,-38 36,-28',5)+arc('M-6,32 L14,28',6),
  envergonhado:o=>olhos({...o,dy:4})+`<ellipse cx="-38" cy="16" rx="11" ry="6" fill="${RED}" opacity=".45"/><ellipse cx="38" cy="16" rx="11" ry="6" fill="${RED}" opacity=".45"/>`+arc('M-14,32 q5,-5 9,0 q5,5 9,0 q5,-5 9,0',5)+`<path d="M50,-30 q8,13 0,18 q-8,-5 0,-18z" fill="#7EC8F0"/>`,
  desesperado:()=>`<ellipse cx="-24" cy="-2" rx="14" ry="17" fill="#fff" stroke="${INK}" stroke-width="5"/><ellipse cx="24" cy="-2" rx="14" ry="17" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="-24" cy="0" r="4" fill="${INK}"/><circle cx="24" cy="0" r="4" fill="${INK}"/>`+arc('M-38,-30 L-14,-36',5)+arc('M38,-30 L14,-36',5)+`<path d="M-18,24 q6,-6 12,0 q6,6 12,0 q6,-6 12,0 L18,40 Q0,46 -18,40Z" fill="${INK}"/><path d="M52,-28 q9,14 0,20 q-9,-6 0,-20z" fill="#7EC8F0"/>`,
  determinado:o=>olhos(o)+arc('M-36,-22 L-12,-17',7)+arc('M36,-22 L12,-17',7)+arc('M-14,30 Q4,36 18,24'),
};
function carlos({soCabeca=false,x=0,y=0,s=1,pose='em_pe',pose2=null,t=0,expr='neutro',piscar=false,espelhar=false,inclinar=0,bob=0}={}){
  const a = pose2?mix(pose,pose2,t):POSES[pose];
  const o=[0,J.ombro[1]+bob], q=[0,J.quadril[1]+bob];
  const le=P(o,a.lb,SEG.braco), lm=P(le,a.la,SEG.antebraco), re=P(o,a.rb,SEG.braco), rm=P(re,a.ra,SEG.antebraco);
  const lj=P(q,a.lc,SEG.coxa), lp=P(lj,a.lk,SEG.canela), rj=P(q,a.rc,SEG.coxa), rp=P(rj,a.rk,SEG.canela);
  const hc=[0,J.cabeca[1]+bob];
  const corpo = ln(lj,lp)+ln(q,lj)+ln(rj,rp)+ln(q,rj)+ln([0,-188+bob],q,10)
    + ln(o,le)+ln(le,lm)+ln(o,re)+ln(re,rm)
    + `<circle cx="${lm[0]}" cy="${lm[1]}" r="7" fill="${INK}"/><circle cx="${rm[0]}" cy="${rm[1]}" r="7" fill="${INK}"/>`;
  // cachecol azul-petróleo (assinatura do Carlos)
  const cachecol=`<path d="M12,${-178+bob} L26,${-136+bob} L11,${-138+bob} L3,${-176+bob} Z" fill="${COR}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M-24,${-194+bob} Q0,${-182+bob} 24,${-194+bob} L22,${-180+bob} Q0,${-168+bob} -22,${-180+bob} Z" fill="${COR}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  const cabeca=`<g transform="translate(${hc[0]},${hc[1]}) rotate(${inclinar})">
    <path d="M-10,${-R+4} Q-18,${-R-26} -2,${-R-30} M2,${-R+2} Q6,${-R-30} 22,${-R-32} M12,${-R+4} Q30,${-R-14} 34,${-R-20}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <circle r="${R}" fill="${PELE}" stroke="${INK}" stroke-width="9"/>${EXPR[expr]({piscar})}</g>`;
  if(soCabeca) return `<g transform="translate(${x},${y}) scale(${s}) translate(0,${-hc[1]})">${cabeca}</g>`;
  return `<g transform="translate(${x},${y}) scale(${espelhar?-s:s},${s})">${corpo}${cachecol}${cabeca}</g>`;
}
module.exports={carlos,POSES,EXPR,INK,COR};
