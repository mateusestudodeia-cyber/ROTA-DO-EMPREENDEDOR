// Personagens palito articulados — mesmo traço do Carlos para todo o elenco.
const INK='#1A1A1A', TEAL='#1E88A8', RED='#E4572E', SKIN='#FFFFFF';
const R=62;
const J={ombro:-150, quadril:-62, cabeca:-252};
const SEG={braco:44, antebraco:42, coxa:32, canela:32};
const rad=a=>a*Math.PI/180;
const P=(o,a,l)=>[o[0]+Math.sin(rad(a))*l, o[1]+Math.cos(rad(a))*l];
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
  triste:     {lb:-18,la:-6,  rb:18,ra:6,   lc:-8,lk:-3,  rc:8,rk:3},
  segurando:  {lb:-40,la:80,  rb:40,ra:-80, lc:-11,lk:-4, rc:11,rk:4},   // segura algo à frente (caixa, celular)
  celular:    {lb:-14,la:-8,  rb:40,ra:-150,lc:-11,lk:-4, rc:11,rk:4},   // celular perto do rosto
  sentado:    {lb:-30,la:70,  rb:30,ra:-70, lc:-80,lk:0,  rc:80,rk:0},
  mexendo:    {lb:-14,la:-8,  rb:70,ra:110, lc:-11,lk:-4, rc:11,rk:4},   // mexendo panela
};
const lerp=(a,b,t)=>a+(b-a)*t;
const mixPose=(p1,p2,t)=>{const A=POSES[p1]||POSES.em_pe,B=POSES[p2]||A,o={};for(const k in A)o[k]=lerp(A[k],B[k],t);return o;};
const f=n=>n.toFixed(1);
const ln=(a,b,w=9,c=INK)=>`<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const arc=(d,w=6,fill='none')=>`<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
function olhos({dx=0,dy=0,esc=1,piscar=false}={}){
  if(piscar) return arc(`M-34,-2 q10,6 20,0`,5)+arc(`M14,-2 q10,6 20,0`,5);
  return [-24,24].map(x=>`<ellipse cx="${x+dx*.5}" cy="${-2+dy*.5}" rx="${8*esc}" ry="${11*esc}" fill="${INK}"/><circle cx="${x+dx+3}" cy="${-6+dy}" r="${3*esc}" fill="#fff"/>`).join('');
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
  cansado:o=>arc('M-34,0 L-14,0',5)+arc('M14,0 L34,0',5)+arc('M-34,8 q10,5 20,0',3)+arc('M14,8 q10,5 20,0',3)+arc('M-10,32 Q0,28 10,32'),
  falando:o=>olhos(o)+`<ellipse cx="0" cy="30" rx="12" ry="${7+5*Math.abs(Math.sin((o.t||0)*18))}" fill="${INK}"/>`,
};
// Acessórios por personagem: cabeça (dentro do grupo da cabeça) e corpo.
const CAB={
  carlos:`<path d="M-10,${-R+4} Q-18,${-R-26} -2,${-R-30} M2,${-R+2} Q6,${-R-30} 22,${-R-32} M12,${-R+4} Q30,${-R-14} 34,${-R-20}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`,
  lucia:`<circle cx="0" cy="${-R-16}" r="22" fill="${INK}"/>`,
  bia:`<path d="M${R-8},-34 q46,6 34,74" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round"/><circle cx="${R-6}" cy="-34" r="8" fill="${RED}"/>`,
  tiago:`<circle cx="-24" cy="-2" r="17" fill="none" stroke="${INK}" stroke-width="5"/><circle cx="24" cy="-2" r="17" fill="none" stroke="${INK}" stroke-width="5"/><line x1="-7" y1="-2" x2="7" y2="-2" stroke="${INK}" stroke-width="5"/>`,
  marcao:`<path d="M-58,-30 Q0,-96 58,-30 Z" fill="#F2A541" stroke="${INK}" stroke-width="6"/><path d="M40,-32 L92,-26 L46,-20 Z" fill="#F2A541" stroke="${INK}" stroke-width="5"/><path d="M-16,18 q8,-5 16,0 q8,-5 16,0" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`,
  bigode:`<path d="M-44,-46 L44,-46 L36,-96 Q0,-118 -36,-96 Z" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M-40,16 q20,-14 40,0 q20,-14 40,0 q-20,22 -40,6 q-20,16 -40,-6z" fill="${INK}"/>`,
  jairo:`<path d="M-66,-44 L66,-44 L50,-74 L-50,-74 Z" fill="#7A7F8C" stroke="${INK}" stroke-width="6"/><path d="M-22,18 q11,-8 22,0 q11,-8 22,0" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`,
  rosa:`<path d="M-60,-24 Q0,-110 60,-24 Q0,-50 -60,-24 Z" fill="#B57EDC" stroke="${INK}" stroke-width="6"/>`,
  henrique:`<path d="M-56,-30 Q-30,-74 20,-66 Q54,-60 58,-30 Q20,-50 -56,-30 Z" fill="${INK}"/>`,
  pai:``, operario:`<path d="M-60,-28 Q0,-104 60,-28 Z" fill="#F6D776" stroke="${INK}" stroke-width="6"/>`,
  motoboy:`<path d="M-66,-10 Q-66,-80 0,-80 Q66,-80 66,-10 L40,-10 L40,-30 L-40,-30 L-40,-10 Z" fill="#E4572E" stroke="${INK}" stroke-width="6"/>`,
};
const CORPO=(tipo,bob)=>({
  carlos:`<path d="M12,${-178+bob} L26,${-136+bob} L11,${-138+bob} L3,${-176+bob} Z" fill="${TEAL}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M-24,${-194+bob} Q0,${-182+bob} 24,${-194+bob} L22,${-180+bob} Q0,${-168+bob} -22,${-180+bob} Z" fill="${TEAL}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`,
  lucia:`<path d="M-26,${-160+bob} L26,${-160+bob} L36,${-70+bob} L-36,${-70+bob} Z" fill="${RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`,
  henrique:`<path d="M0,${-186+bob} L-9,${-176+bob} L0,${-120+bob} L9,${-176+bob} Z" fill="#2E4A7D" stroke="${INK}" stroke-width="4"/>`,
  tiago:`<rect x="-34" y="${-168+bob}" width="22" height="58" rx="8" fill="#7A9E7E" stroke="${INK}" stroke-width="4"/>`,
  rosa:`<path d="M-24,${-150+bob} L24,${-150+bob} L30,${-80+bob} L-30,${-80+bob} Z" fill="#fff" stroke="${INK}" stroke-width="5"/>`,
}[tipo]||'');
/**
 * figura: desenha um personagem.
 * tipo: carlos|lucia|bia|tiago|marcao|bigode|jairo|rosa|henrique|pai|operario|motoboy
 */
function figura({tipo='carlos',x=0,y=0,s=1,pose='em_pe',pose2=null,t=0,expr='neutro',piscar=false,espelhar=false,inclinar=0,bob=0,tempo=0,soCabeca=false,objetoMao=''}={}){
  const a=pose2?mixPose(pose,pose2,t):mixPose(pose,pose,0);
  const sil=tipo==='pai'; const ink=sil?'#3A3A3A':INK;
  const o=[0,J.ombro+bob], q=[0,J.quadril+bob];
  const le=P(o,a.lb,SEG.braco), lm=P(le,a.la,SEG.antebraco), re=P(o,a.rb,SEG.braco), rm=P(re,a.ra,SEG.antebraco);
  const lj=P(q,a.lc,SEG.coxa), lp=P(lj,a.lk,SEG.canela), rj=P(q,a.rc,SEG.coxa), rp=P(rj,a.rk,SEG.canela);
  const hc=[0,J.cabeca+bob];
  const L=(p1,p2,w)=>ln(p1,p2,w,ink);
  let corpo=L(lj,lp)+L(q,lj)+L(rj,rp)+L(q,rj)+L([0,-188+bob],q,10)+CORPO(tipo,bob)
    +L(o,le)+L(le,lm)+L(o,re)+L(re,rm)
    +`<circle cx="${f(lm[0])}" cy="${f(lm[1])}" r="7" fill="${ink}"/><circle cx="${f(rm[0])}" cy="${f(rm[1])}" r="7" fill="${ink}"/>`;
  if(tipo==='bia'||objetoMao==='celular') corpo+=`<rect x="${f(rm[0]-10)}" y="${f(rm[1]-34)}" width="20" height="34" rx="4" fill="${INK}"/><rect x="${f(rm[0]-6)}" y="${f(rm[1]-30)}" width="12" height="24" rx="2" fill="#7EC8F0"/>`;
  if(objetoMao) corpo+=objetoMao==='celular'?'':`<g transform="translate(${f((lm[0]+rm[0])/2)},${f((lm[1]+rm[1])/2)})">${objetoMao}</g>`;
  const rosto=sil?'':(EXPR[expr]||EXPR.neutro)({piscar,t:tempo});
  const cab=`<g transform="translate(${hc[0]},${f(hc[1])}) rotate(${inclinar})">${tipo==='henrique'||tipo==='rosa'||tipo==='marcao'||tipo==='operario'||tipo==='motoboy'?'':CAB[tipo]||''}
    <circle r="${R}" fill="${sil?'#3A3A3A':SKIN}" stroke="${ink}" stroke-width="9"/>${rosto}${['henrique','rosa','marcao','operario','motoboy'].includes(tipo)?CAB[tipo]:''}</g>`;
  if(soCabeca) return `<g transform="translate(${x},${y}) scale(${s}) translate(0,${-hc[1]})">${cab}</g>`;
  return `<g transform="translate(${f(x)},${f(y)}) scale(${espelhar?-s:s},${s})">${corpo}${cab}</g>`;
}
const carlos=o=>figura({...o,tipo:'carlos'});
module.exports={figura,carlos,POSES,EXPR,INK,TEAL,RED};
