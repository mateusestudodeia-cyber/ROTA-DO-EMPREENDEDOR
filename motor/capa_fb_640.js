// Capa do Facebook 640x360 (desenhada em 1920x1080 e reduzida).
const {figura}=require('../biblioteca/personagens');const {P}=require('../biblioteca/cenarios');
const W=1920,H=1080,chao=930;
const g=(x,y,s,svg)=>`<g transform="translate(${x},${y}) scale(${s})">${svg}</g>`;
const TX=(x,y,t,sz,c)=>`<text x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-weight="900" font-size="${sz}" fill="${c}" text-anchor="middle" stroke="#1E88A8" stroke-width="${sz/8}" paint-order="stroke">${t}</text>`;
let s=`<rect width="${W}" height="${H}" fill="#1E88A8"/><rect y="${chao}" width="${W}" height="${H-chao}" fill="#FAF7F0"/><line x1="0" y1="${chao}" x2="${W}" y2="${chao}" stroke="#1A1A1A" stroke-width="9"/>`;
s+=TX(960,200,'EMPREENDEDORISMO',130,'#FFFFFF')+TX(960,320,'CONTADO EM HISTÓRIAS',92,'#F6D776');
s+=`<g transform="translate(960,420)"><rect x="-470" y="-55" width="940" height="100" rx="50" fill="#1A1A1A"/><text y="18" font-family="DejaVu Sans" font-weight="800" font-size="52" fill="#FFFFFF" text-anchor="middle">TERÇA E QUINTA · YOUTUBE</text></g>`;
s+=g(1560,chao,.75,P.fabrica({nome:'AUTOPEÇAS'}))+g(640,chao,.75,P.isopor())+g(820,chao,.7,P.cartaz({t:'MARMITA R$ 19'}));
s+=figura({tipo:'carlos',x:380,y:chao,s:1.05,pose:'acenando',expr:'rindo'});
[['marcao',1080],['operario',1210],['operario',1340]].forEach(([q,x],k)=>s+=figura({tipo:q,x,y:chao,s:.9,espelhar:true,expr:k%2?'feliz':'neutro'}));
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 await p.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${s}</svg></body>`);await p.screenshot({path:'canal/tmp_fb.png'});await b.close();
 const {execSync}=require('child_process');
 execSync('ffmpeg -loglevel error -y -i canal/tmp_fb.png -vf scale=640:360:flags=lanczos canal/capa_facebook_640x360.png');
 execSync('ffmpeg -loglevel error -y -i canal/tmp_fb.png -vf scale=1280:720:flags=lanczos canal/capa_facebook_1280x720.png');
 execSync('rm canal/tmp_fb.png');console.log('ok');})();
