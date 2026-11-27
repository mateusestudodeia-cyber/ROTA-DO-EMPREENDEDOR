// Gancho do EP01 (16 s) — edição dinâmica: punch-ins, slam de texto, shake, freeze, legendas animadas.
const {carlos}=require('../biblioteca/carlos');const O=require('../biblioteca/objetos');
const {chromium}=require('playwright');const fs=require('fs');
const FPS=30,DUR=16,N=FPS*DUR;
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)), io=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const back=t=>{t=cl(t);const c=1.9;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
const shake=(t,t0,amp,d=.35)=>{const k=cl(1-(t-t0)/d);return t<t0?[0,0]:[Math.sin(t*90)*amp*k,Math.cos(t*77)*amp*k]};
const TXT=(x,y,t,sz,cor='#1A1A1A',extra='')=>`<text x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-weight="900" font-size="${sz}" fill="${cor}" text-anchor="middle" stroke="#FAF7F0" stroke-width="${sz/7}" paint-order="stroke" ${extra}>${t}</text>`;
const slam=(t,t0,x,y,txt,sz,cor)=>{if(t<t0)return'';const k=cl((t-t0)/.18);const s=2.4-1.4*io(k);return `<g transform="translate(${x},${y}) scale(${s})" opacity="${k}">${TXT(0,0,txt,sz,cor)}</g>`};
const LEG=[[.3,2.2,'Duzentas marmitas. Em um mês.','Duzentas marmitas'],[2.5,5.3,'R$ 2.400 entrando no caixa.','R$ 2.400'],[5.6,8.0,'O Carlos achou que tinha ficado rico.','rico'],
 [8.4,10.5,'Até abrir as contas do mês.','contas'],[11.0,12.9,'Sobrou… zero.','zero'],[13.4,15.8,'Então, pra onde foi o dinheiro?','dinheiro']];
function legenda(t){const l=LEG.find(([a,b])=>t>=a&&t<=b);if(!l)return'';const k=cl((t-l[0])/.12);
 const parts=l[2].split(l[3]);return `<g transform="translate(960,1000) scale(${.9+.1*back(k)})" opacity="${k}"><rect x="-${l[2].length*17}" y="-52" width="${l[2].length*34}" height="74" rx="14" fill="#1A1A1A" opacity=".85"/>
 <text y="0" font-family="DejaVu Sans" font-weight="800" font-size="46" text-anchor="middle" fill="#fff">${parts[0]}<tspan fill="#F6D776">${l[3]}</tspan>${parts[1]||''}</text></g>`}
function cena(t){
 let bg='#FAF7F0',cam={s:1,fx:960,fy:540},sh=[0,0],c='',filtro='';
 if(t<2.5){ // S1 marmitas pipocando
  cam.s=1+.06*t; c+=carlos({x:960,y:900,s:1.5,pose:'em_pe',expr:'feliz'});
  const pos=[[560,700],[1360,700],[480,520],[1440,520],[640,360],[1280,360],[420,860],[1500,860]];
  pos.forEach(([x,y],i)=>{const t0=.35+i*.22;if(t>t0)c+=O.marmita(x,y,back((t-t0)/.25)*.9,(i%2?8:-8),t)});
  c+=slam(t,.3,960,170,'200 MARMITAS',120,'#1A1A1A'); sh=shake(t,.35,14);
 } else if(t<5.5){ // S2 caixa subindo
  const u=t-2.5, sl=u<.25?(1-io(u/.25))*1920:0; cam.s=1.1; cam.fx=960+sl*-1;
  const v=Math.round(2400*io(cl(u/2.4))); 
  c+=carlos({x:620,y:920,s:1.5,pose:u>2.3?'comemorando':'em_pe',pose2:null,expr:u>2.3?'rindo':'feliz',bob:u>2.3?-Math.abs(Math.sin(u*14))*14:0});
  for(let i=0;i<9;i++){const t0=.3+i*.25;if(u>t0){const k=cl((u-t0)/.5);c+=O.nota(1300+Math.sin(i*2.1)*230,-120+k*(560+(i%3)*90),.9,(i*37)%50-25)}}
  c+=`<g transform="translate(1300,300) scale(${1+(u>2.4?.15*Math.max(0,1-(u-2.4)/.3):0)})">${TXT(0,0,'R$ '+v.toLocaleString('pt-BR'),150,'#3FA34D')}</g>`;
  c=`<g transform="translate(${sl},0)">${c}</g>`;
 } else if(t<8.2){ // S3 sonho de rico: push-in no rosto
  const u=t-5.5; cam.s=1+.3*io(cl(u/2.7)); cam.fx=1060; cam.fy=600;
  c+=carlos({x:960,y:940,s:1.5,pose:'bracos_cruzados',expr:'determinado'});
  if(u>.5)c+=`<g transform="translate(1330,400) scale(${back((u-.5)/.3)})">${O.balaoPensamento(0,0,.9,'RICO!')}</g>`;
 } else if(t<11){ // S4 freeze + contas caindo
  const u=t-8.2; filtro=u<.25?'url(#pb)':''; 
  c+=carlos({x:960,y:900,s:u<.25?1.5:1.3,pose:u<.25?'bracos_cruzados':'triste',expr:u<.25?'determinado':'surpreso'});
  if(u<.25){cam.s=1.3;cam.fx=1060;cam.fy=600;c+=O.balaoPensamento(1330,400,.9,'RICO!')}
  const contas=[['GÁS','R$ ???'],['EMBALAGEM','R$ ???'],['FIADO','R$ ???']];
  contas.forEach(([n,v],i)=>{const t0=.5+i*.55;if(u>t0){const k=io(cl((u-t0)/.3));c+=O.conta(420+i*540,-300+k*([560,530,560][i]),.8,(i-1)*9,n,v)}});
  sh=shake(t,8.7+1.1,8,.25);
 } else if(t<13.3){ // S5 R$ 0 — impacto vermelho
  const u=t-11; bg=u>.75?'#F6D9D2':'#FAF7F0'; sh=shake(t,11.75,26,.5); cam.s=1+.04*u;
  c+=carlos({x:960,y:920,s:1.6,pose:'desespero',expr:'desesperado'});
  c+=slam(t,11.75,960,330,'R$ 0',260,'#E4572E');
 } else { // S6 pergunta — digitação
  const u=t-13.3; cam.s=1.15+.1*u; cam.fy=560;
  c+=carlos({x:960,y:920,s:1.5,pose:'pensando',expr:'pensativo'});
  const frase='PRA ONDE FOI O DINHEIRO?', n=Math.floor(cl((u-.15)/1.3)*frase.length);
  c+=TXT(960,250,frase.slice(0,n)+(n<frase.length&&Math.floor(u*8)%2?'|':''),76);
  if(u>2.1)c+=`<g opacity="${cl((u-2.1)/.3)}">${TXT(1760,90,'EP. 1',48,'#1E88A8')}</g>`;
 }
 const tr=`translate(${960+sh[0]},${540+sh[1]}) scale(${cam.s}) translate(${-cam.fx},${-cam.fy})`;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><filter id="pb"><feColorMatrix type="saturate" values="0"/></filter></defs>
 <rect width="1920" height="1080" fill="${bg}"/><g filter="${filtro}"><g transform="${tr}"><line x1="-2000" y1="910" x2="4000" y2="910" stroke="#1A1A1A" stroke-width="6"/>${c}</g></g>
 ${t>=8.2&&t<8.45?TXT(960,140,'ESPERA…',90,'#1A1A1A'):''}${legenda(t)}</svg>`;
}
(async()=>{fs.mkdirSync('frames',{recursive:true});const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
 for(let f=0;f<N;f++){await p.setContent(`<body style="margin:0">${cena(f/FPS)}</body>`);await p.screenshot({path:`frames/${String(f).padStart(4,'0')}.png`});}
 await b.close();})();
