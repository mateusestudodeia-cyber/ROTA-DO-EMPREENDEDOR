// Capa do Facebook no formato 400x150 (desenhada em 1600x600 e reduzida, para ficar nítida).
const {figura}=require('../biblioteca/personagens');const {P}=require('../biblioteca/cenarios');
const W=1600,H=600,chao=520;
const g=(x,y,s,svg)=>`<g transform="translate(${x},${y}) scale(${s})">${svg}</g>`;
const TX=(x,y,t,sz,c)=>`<text x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-weight="900" font-size="${sz}" fill="${c}" stroke="#1E88A8" stroke-width="${sz/8}" paint-order="stroke">${t}</text>`;
let s=`<rect width="${W}" height="${H}" fill="#1E88A8"/><rect y="${chao}" width="${W}" height="${H-chao}" fill="#FAF7F0"/><line x1="0" y1="${chao}" x2="${W}" y2="${chao}" stroke="#1A1A1A" stroke-width="8"/>`;
s+=g(420,chao,.6,P.isopor())+g(480,chao-75,.5,P.marmita({vapor:1}));
s+=figura({tipo:'carlos',x:220,y:chao,s:1.25,pose:'acenando',expr:'rindo'});
s+=TX(560,200,'EMPREENDEDORISMO',76,'#FFFFFF')+TX(560,292,'CONTADO EM HISTÓRIAS',62,'#F6D776');
s+=`<g transform="translate(560,345)"><rect x="0" y="0" width="760" height="90" rx="45" fill="#1A1A1A"/><text x="380" y="60" font-family="DejaVu Sans" font-weight="800" font-size="46" fill="#FFFFFF" text-anchor="middle">TERÇA E QUINTA · YOUTUBE</text></g>`;
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 await p.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${s}</svg></body>`);await p.screenshot({path:'canal/capa_fb_1600.png'});await b.close();
 const {execSync}=require('child_process');
 execSync('ffmpeg -loglevel error -y -i canal/capa_fb_1600.png -vf scale=400:150:flags=lanczos canal/capa_facebook_400x150.png');
 execSync('ffmpeg -loglevel error -y -i canal/capa_fb_1600.png -vf scale=800:300:flags=lanczos canal/capa_facebook_800x300.png');
 execSync('rm canal/capa_fb_1600.png');console.log('ok');})();
