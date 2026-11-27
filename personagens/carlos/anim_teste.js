// Teste de animação: Carlos entra andando, para, pisca, acena e se apresenta.
const {carlos}=require('./carlos');const {chromium}=require('playwright');const fs=require('fs');
const W=1280,H=720,FPS=30,N=FPS*6;
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
function frame(f){
  const t=f/FPS; let x,pose='em_pe',pose2=null,k=0,expr='neutro',bob=0,piscar=false;
  if(t<2.2){ // andando
    x=-150+(1110)*(t/2.2); const c=(t*2.4)%1; const ph=c<.5?c*2:2-c*2;
    pose='andando_a';pose2='andando_b';k=ease(ph); bob=-Math.abs(Math.sin(t*Math.PI*2.4))*6; expr='feliz';
  } else {
    x=960; const u=t-2.2;
    if(u<0.35){pose='andando_b';pose2='em_pe';k=ease(u/.35);expr='feliz';}
    else if(u<0.9){expr='neutro'; piscar = u>0.55&&u<0.65;}
    else if(u<3.8){expr='feliz'; const w=Math.min((u-.9)/.3,1); const osc=Math.sin((u-.9)*Math.PI*4)*.5+.5;
      pose='em_pe';pose2='acenando';k=ease(w); if(w>=1){pose='acenando';pose2=null;}
      if(w>=1){ // aceno: oscila o antebraço
        const {POSES}=require('./carlos'); POSES.aceno_tmp={...POSES.acenando,ra:POSES.acenando.ra+osc*35-17}; pose='aceno_tmp';}
      piscar = u>2.6&&u<2.7; }
  }
  const txtOp = Math.max(0,Math.min(1,(t-3.4)/0.4));
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 1920 1080">
  <rect width="1920" height="1080" fill="#FAF7F0"/>
  <line x1="0" y1="870" x2="1920" y2="870" stroke="#1A1A1A" stroke-width="6"/>
  ${carlos({x,y:860,s:1.6,pose,pose2,t:k,expr,bob,piscar})}
  <text x="960" y="180" font-family="DejaVu Sans" font-weight="800" font-size="84" fill="#1A1A1A" text-anchor="middle" opacity="${txtOp}" transform="translate(0,${(1-txtOp)*20})">Este é o Carlos.</text></svg>`;
  return `<html><body style="margin:0">${svg}</body></html>`;
}
(async()=>{fs.mkdirSync('frames',{recursive:true});const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
for(let f=0;f<N;f++){await p.setContent(frame(f));await p.screenshot({path:`frames/${String(f).padStart(4,'0')}.png`});}
await b.close();})();
