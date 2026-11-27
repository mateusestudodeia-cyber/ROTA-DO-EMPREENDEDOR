// Banner do canal 2560x1440. Área segura (aparece em todos os aparelhos): 1546x423 no centro.
const {figura}=require('../biblioteca/personagens');const {P}=require('../biblioteca/cenarios');
const W=2560,H=1440,SX=(W-1546)/2,SY=(H-423)/2; // 507,508.5
const g=(x,y,s,svg)=>`<g transform="translate(${x},${y}) scale(${s})">${svg}</g>`;
const chao=905;
let s=`<rect width="${W}" height="${H}" fill="#FAF7F0"/><rect y="0" width="${W}" height="${chao}" fill="#EAF3F8"/>
<line x1="0" y1="${chao}" x2="${W}" y2="${chao}" stroke="#1A1A1A" stroke-width="8"/>`;
s+=g(230,chao,.9,P.fabrica({nome:'AUTOPEÇAS'}))+g(2330,chao,.8,P.lanchonete({preco:'PF R$ 15'}));
const TX=(x,y,t,sz,c)=>`<text x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-weight="900" font-size="${sz}" fill="${c}" stroke="#EAF3F8" stroke-width="${sz/8}" paint-order="stroke">${t}</text>`;
s+=TX(560,650,'EMPREENDEDORISMO',92,'#1A1A1A')+TX(560,745,'CONTADO EM HISTÓRIAS',68,'#1E88A8');
s+=`<g transform="translate(560,790)"><rect x="0" y="0" width="720" height="66" rx="33" fill="#1A1A1A"/><text x="360" y="45" font-family="DejaVu Sans" font-weight="800" font-size="34" fill="#F6D776" text-anchor="middle">NOVO EPISÓDIO · TERÇA E QUINTA</text></g>`;
[["lucia",1600,'feliz','mexendo'],["bia",1730,'rindo','celular'],["tiago",2000,'feliz','bracos_cruzados']].forEach(([q,x,e,p])=>s+=figura({tipo:q,x,y:chao,s:.62,pose:p,expr:e,espelhar:x>1860}));
s+=figura({tipo:'carlos',x:1865,y:chao,s:.78,pose:'acenando',expr:'rindo'});
s+=g(1450,chao,.5,P.marmita({vapor:1}))+g(1490,chao-48,.45,P.marmita({vapor:2}));
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 await p.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${s}</svg></body>`);
 await p.screenshot({path:'canal/banner.png'});
 await p.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${s}<rect x="${SX}" y="${SY}" width="1546" height="423" fill="none" stroke="#E4572E" stroke-width="8" stroke-dasharray="30 20"/><text x="${SX+10}" y="${SY-16}" font-family="DejaVu Sans" font-size="36" fill="#E4572E">área visível no celular</text></svg></body>`);
 await p.screenshot({path:'canal/banner_guia.png'});await b.close();console.log('ok');})();
