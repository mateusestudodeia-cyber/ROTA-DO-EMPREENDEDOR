// Motor de render: planilha de cenas (episodios/epXX/cenas.js) + timeline da voz -> MP4 (CPU, Playwright + FFmpeg).
// Uso: node motor/render.js ep01 [inicioFrame fimFrame saida.mp4] | node motor/render.js ep01 --cues | --quadros t1,t2,...
const fs=require('fs'), path=require('path'), {spawn}=require('child_process');
const {figura}=require('../biblioteca/personagens');
const {P,painel,balaoFala,T}=require('../biblioteca/cenarios');
const EP=process.argv[2], BASE=`/home/user/estudio/episodios/${EP}`, BUILD=`${BASE}/build`;
const TL=JSON.parse(fs.readFileSync(`${BUILD}/timeline.json`));
const FPS=30, W=1920, H=1080, CREAM='#FAF7F0';
// ---------- API de tempo para a planilha ----------
const porCena={}; TL.falas.forEach(f=>(porCena[f.cena]=porCena[f.cena]||[]).push(f));
const cenasIds=Object.keys(porCena).map(Number).sort((a,b)=>a-b);
const ini=c=>porCena[c][0].ini-(c===cenasIds[0]?porCena[c][0].ini:0.25);
const fim=c=>{const k=cenasIds.indexOf(c);return k<cenasIds.length-1?ini(cenasIds[k+1]):TL.duracao;};
const api={T:(c,i,dt=0)=>porCena[c][Math.min(i,porCena[c].length-1)].ini+dt, F:(c,i,dt=0)=>porCena[c][Math.min(i,porCena[c].length-1)].fim+dt, ini, fim, n:c=>porCena[c].length};
const CENAS=require(`${BASE}/cenas.js`)(api);
// ---------- utilidades ----------
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)), io=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const back=t=>{t=cl(t);const c=1.7;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
const hash=s=>{let h=0;for(const ch of String(s))h=(h*31+ch.charCodeAt(0))|0;return Math.abs(h)};
function tween(kf,t,def){ // keyframes [{t,...valores,dur?}] -> valores interpolados
  if(!kf||!kf.length) return def; let cur={...def,...kf[0]};
  for(let k=1;k<kf.length;k++){const a=kf[k];if(t<a.t)break;const d=a.dur??.6;const u=io(cl((t-a.t)/d));
    const nx={...cur};for(const key in a){if(['t','dur'].includes(key))continue;if(typeof a[key]==='number')nx[key]=cur[key]+(a[key]-cur[key])*u;else nx[key]=u>=.5?a[key]:cur[key];}
    if(u>=1)Object.assign(cur,a);else return nx;}
  return cur;
}
function entrada(el,t){ // retorna {s,dx,dy,op}
  const u=t-el.t0, a=el.anim||'pop';
  if(a==='pop'){return {s:back(u/.3),dx:0,dy:0,op:cl(u/.1)}}
  if(a==='slam'){const k=cl(u/.18);return {s:2.4-1.4*io(k),dx:0,dy:0,op:k}}
  if(a==='fade'){return {s:1,dx:0,dy:0,op:cl(u/.35)}}
  if(a==='cair'){const k=io(cl(u/.4));return {s:1,dx:0,dy:-900*(1-k),op:1}}
  if(a==='esq'||a==='dir'){const k=io(cl(u/.35));return {s:1,dx:(a==='esq'?-1:1)*1400*(1-k),dy:0,op:1}}
  if(a==='subir'){const k=io(cl(u/.4));return {s:1,dx:0,dy:300*(1-k),op:cl(u/.2)}}
  return {s:1,dx:0,dy:0,op:1};
}
function saida(el,t){if(el.t1==null||el.sai==null)return 1;const u=(el.t1-t);return el.sai==='fade'?cl(u/.3):1;}
// ---------- desenho de elementos ----------
function desenha(el,t){
  if(t<el.t0||(el.t1!=null&&t>=el.t1)) return '';
  const e=entrada(el,t), mv=tween(el.mov,t,{x:el.x||0,y:el.y||0,s:el.s||1,rot:el.rot||0});
  let body='';
  if(el.tipo==='fig'){
    let st={pose:el.pose||'em_pe',expr:el.expr||'neutro'},prev=null,tc=-9;
    (el.estados||[]).forEach(s=>{if(t>=s.t){prev=st;st={...st,...s};tc=s.t}});
    const k=prev&&prev.pose!==st.pose?io(cl((t-tc)/.3)):1;
    let pose=prev&&k<1?prev.pose:st.pose, pose2=prev&&k<1?st.pose:null, bob=0;
    if(el.andar&&t>=el.andar[0]&&t<el.andar[1]){const c=(t*2.2)%1;pose='andando_a';pose2='andando_b';const ph=c<.5?c*2:2-c*2;bob=-Math.abs(Math.sin(t*Math.PI*2.2))*6;
      return wrap(figura({tipo:el.quem,pose,pose2,t:io(ph),expr:st.expr,bob,espelhar:el.espelhar,tempo:t}));}
    if(st.pular){bob=-Math.abs(Math.sin(t*12))*14}
    const pisc=((t+hash(el.quem)%7)%3.7)<.12;
    if(st.treme) bob+=Math.sin(t*60)*1.5;
    body=figura({tipo:el.quem,pose,pose2,t:k,expr:st.expr,bob,espelhar:el.espelhar,piscar:pisc&&!['rindo','desesperado','cansado'].includes(st.expr),inclinar:st.inclinar||0,tempo:t,objetoMao:st.mao?(P[st.mao]?`<g transform="scale(.35)">${P[st.mao]({})}</g>`:st.mao):''});
  } else if(el.tipo==='prop'){ body=(P[el.nome]||(()=>''))(typeof el.args==='function'?el.args(t):(el.args||{})); }
  else if(el.tipo==='txt'){
    let txt=el.txt; if(el.anim==='digitar'){const n=Math.floor(cl((t-el.t0)/(el.dur||1.2))*txt.length);txt=txt.slice(0,n)+(n<el.txt.length&&Math.floor(t*8)%2?'|':'');}
    const sz=el.sz||90; body=`<text x="0" y="0" font-family="DejaVu Sans,sans-serif" font-weight="900" font-size="${sz}" fill="${el.cor||'#1A1A1A'}" text-anchor="middle" stroke="${el.contorno||CREAM}" stroke-width="${sz/7}" paint-order="stroke">${txt}</text>`;
  } else if(el.tipo==='balao'){ body=balaoFala({txt:el.txt,cauda:el.cauda||'esq'}); }
  else if(el.tipo==='painel'){ const n=el.linhasT?el.linhasT.filter(x=>t>=x).length:99; body=painel({...el,n}); }
  else if(el.tipo==='contador'){ const u=io(cl((t-(el.ti??el.t0))/(el.dur||2))); const v=el.de+(el.ate-el.de)*u;
    const s=el.fmt==='brl'?'R$ '+v.toLocaleString('pt-BR',{minimumFractionDigits:el.dec??0,maximumFractionDigits:el.dec??0}):Math.round(v).toLocaleString('pt-BR');
    const sz=el.sz||140; body=`<text x="0" y="0" font-family="DejaVu Sans,sans-serif" font-weight="900" font-size="${sz}" fill="${el.cor||'#1A1A1A'}" text-anchor="middle" stroke="${el.contorno||CREAM}" stroke-width="${sz/7}" paint-order="stroke">${(el.pre||'')+s+(el.suf||'')}</text>`; }
  else if(el.tipo==='notifs'){ const n=Math.floor(cl((t-el.t0)/(el.dur||2))*(el.n||12)); body=[...Array(n)].map((_,i)=>`<g transform="translate(${(hash(i)%60)-30},${-i*34})"><rect x="-260" y="-40" width="520" height="70" rx="14" fill="#fff" stroke="#1A1A1A" stroke-width="5"/><circle cx="-215" cy="-5" r="18" fill="${el.cor||'#3FA34D'}"/><text x="-180" y="6" font-family="DejaVu Sans" font-size="26" font-weight="700">${(el.txt||'Novo pedido')}${el.num?` #${i+1}`:''}</text></g>`).join(''); }
  else if(el.tipo==='svg'){ body=typeof el.svg==='function'?el.svg(t):el.svg; }
  function wrap(b){return `<g transform="translate(${(mv.x+e.dx).toFixed(1)},${(mv.y+e.dy).toFixed(1)}) rotate(${mv.rot}) scale(${(mv.s*e.s).toFixed(3)})" opacity="${(e.op*saida(el,t)).toFixed(2)}">${b}</g>`}
  if(el.tipo==='fig') return wrap(body);
  return wrap(body);
}
// ---------- quadro ----------
function legenda(t){
  const f=TL.falas.find(x=>t>=x.ini-.05&&t<=x.fim+.15); if(!f) return '';
  let txt=f.texto.replace(/^—\s*/,'— '); const MAX=46;
  if(txt.length>MAX){const pcs=[];let acc='';for(const w of txt.split(' ')){if((acc+' '+w).trim().length>MAX&&acc){pcs.push(acc.trim());acc=w}else acc+=' '+w}pcs.push(acc.trim());
    const fr=cl((t-f.ini)/(f.fim-f.ini));let soma=0,tot=pcs.reduce((a,b)=>a+b.length,0);txt=pcs[pcs.length-1];for(const pc of pcs){soma+=pc.length;if(fr<=soma/tot){txt=pc;break}}}
  const k=cl((t-f.ini)/.1), cor=f.enfase?'#F6D776':'#FFFFFF', w=Math.min(1840,txt.length*25+80);
  return `<g transform="translate(960,1010)" opacity="${k}"><rect x="${-w/2}" y="-50" width="${w}" height="70" rx="14" fill="#1A1A1A" opacity=".82"/><text y="-2" font-family="DejaVu Sans" font-weight="800" font-size="42" text-anchor="middle" fill="${cor}">${txt.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</text></g>`;
}
function quadro(t){
  const c=CENAS.find(s=>t>=s.t0&&t<s.t1)||CENAS[CENAS.length-1];
  const cam=tween(c.cam,t,{s:1,x:960,y:540}); const drift=1+.015*(t-c.t0)/Math.max(1,c.t1-c.t0);
  let sx=0,sy=0;(c.shake||[]).forEach(s=>{const k=cl(1-(t-s.t)/(s.dur||.4));if(t>=s.t&&k>0){sx+=Math.sin(t*90)*s.amp*k;sy+=Math.cos(t*77)*s.amp*k}});
  let fundo=c.fundo||CREAM;(c.fundos||[]).forEach(f=>{if(t>=f.t)fundo=f.cor});
  const filtro=(c.filtros||[]).find(f=>t>=f.t0&&t<f.t1); const ftag=filtro?`filter="url(#${filtro.tipo})"`:'';
  let tr=''; const u=t-c.t0;
  if(c.trans==='whoosh'&&u<.3) tr=`translate(${(1-io(u/.3))*W},0)`;
  const itens=c.itens.map(el=>desenha(el,t)).join('');
  const fixos=(c.fixos||[]).map(el=>desenha(el,t)).join('');
  const chao=c.chao===null?'':`<line x1="-3000" y1="${c.chao||910}" x2="5000" y2="${c.chao||910}" stroke="#1A1A1A" stroke-width="6"/>`;
  let flash=0;(c.flash||[]).forEach(ft=>{if(t>=ft&&t<ft+.1)flash=1-(t-ft)/.1});
  const preto=c.trans==='preto'&&u<.35?1-u/.35:0;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>
<filter id="pb"><feColorMatrix type="saturate" values="0"/></filter>
<filter id="sepia"><feColorMatrix type="matrix" values=".39 .77 .19 0 0 .35 .69 .17 0 0 .27 .53 .13 0 0 0 0 0 1 0"/></filter></defs>
<rect width="${W}" height="${H}" fill="${fundo}"/>
<g ${ftag}><g transform="${tr}"><g transform="translate(${960+sx},${540+sy}) scale(${(cam.s*drift).toFixed(4)}) translate(${-cam.x},${-cam.y})">${chao}${itens}</g>${fixos}</g></g>
${flash?`<rect width="${W}" height="${H}" fill="#fff" opacity="${flash.toFixed(2)}"/>`:''}${preto?`<rect width="${W}" height="${H}" fill="#000" opacity="${preto.toFixed(2)}"/>`:''}
${legenda(t)}</svg>`;
}
// ---------- saídas ----------
const modo=process.argv[3];
if(modo==='--cues'){ // efeitos sonoros e trilha por cena, para o mixer
  const sfx=[],trilha=[];CENAS.forEach(c=>{(c.sfx||[]).forEach(s=>sfx.push(s));trilha.push({t0:c.t0,t1:c.t1,faixa:c.trilha??null,vol:c.vol??1,silencios:c.silencios||[]})});
  fs.writeFileSync(`${BUILD}/cues.json`,JSON.stringify({duracao:TL.duracao,sfx,trilha},null,1));console.log('cues ok',sfx.length,'sfx');process.exit(0);
}
(async()=>{
  const {chromium}=require('playwright'); const b=await chromium.launch(); const p=await b.newPage({viewport:{width:W,height:H}});
  await p.setContent(`<body style="margin:0;background:#000"><div id="r"></div></body>`);
  const shot=async t=>{await p.evaluate(s=>{document.getElementById('r').innerHTML=s},quadro(t));return p.screenshot({type:'jpeg',quality:92});};
  if(modo==='--quadros'){ // contact sheet de QA
    const ts=process.argv[4].split(',').map(Number); for(const [i,t] of ts.entries()) fs.writeFileSync(`${BUILD}/qa_${String(i).padStart(2,'0')}.jpg`,await shot(t)); await b.close(); return; }
  const N=Math.ceil(TL.duracao*FPS), f0=+(process.argv[3]||0), f1=+(process.argv[4]||N), out=process.argv[5]||`${BUILD}/video.mp4`;
  const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p',out]);
  for(let f=f0;f<f1;f++){const buf=await shot(f/FPS); if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));}
  ff.stdin.end(); await new Promise(r=>ff.on('close',r)); await b.close(); console.log('ok',out,f1-f0,'quadros');
})();
