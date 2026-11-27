// Capa do Facebook 1640x924 (16:9). Computador mostra a faixa central (~1640x607); celular mostra tudo.
const {figura}=require('../biblioteca/personagens');const {P}=require('../biblioteca/cenarios');
const W=1640,H=924,BY=(H-607)/2; const chao=735;
const g=(x,y,s,svg)=>`<g transform="translate(${x},${y}) scale(${s})">${svg}</g>`;
let s=`<rect width="${W}" height="${H}" fill="#1E88A8"/><rect y="${chao}" width="${W}" height="${H-chao}" fill="#FAF7F0"/>
<line x1="0" y1="${chao}" x2="${W}" y2="${chao}" stroke="#1A1A1A" stroke-width="7"/>`;
// cena: portão da fábrica com fila (EP01)
s+=g(1340,chao,.62,P.fabrica({nome:'AUTOPEÇAS'}))+g(720,chao,.5,P.cartaz({t:'MARMITA R$ 19'}))+g(560,chao,.55,P.isopor());
s+=figura({tipo:'carlos',x:420,y:chao,s:.7,pose:'acenando',expr:'rindo'});
[['marcao',940],['operario',1040],['operario',1140],['operario',1240]].forEach(([q,x],k)=>s+=figura({tipo:q,x,y:chao,s:.58,espelhar:true,expr:k%2?'feliz':'neutro'}));
const TX=(x,y,t,sz,c,st='#1E88A8')=>`<text x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-weight="900" font-size="${sz}" fill="${c}" text-anchor="middle" stroke="${st}" stroke-width="${sz/8}" paint-order="stroke">${t}</text>`;
s+=TX(820,BY+95,'EMPREENDEDORISMO CONTADO EM HISTÓRIAS',56,'#FFFFFF');
s+=TX(820,BY+160,'Um personagem. Decisões reais. Erros que ensinam.',34,'#F6D776');
s+=`<g transform="translate(820,${BY+225})"><rect x="-470" y="-36" width="940" height="64" rx="32" fill="#1A1A1A"/><text y="8" font-family="DejaVu Sans" font-weight="800" font-size="30" fill="#FFFFFF" text-anchor="middle">EPISÓDIOS NOVOS TODA TERÇA E QUINTA · YOUTUBE</text></g>`;
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 await p.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${s}</svg></body>`);await p.screenshot({path:'canal/capa_facebook.png'});
 await p.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${s}<rect x="0" y="${BY}" width="${W}" height="607" fill="none" stroke="#E4572E" stroke-width="6" stroke-dasharray="24 16"/><text x="10" y="${BY-12}" font-family="DejaVu Sans" font-size="28" fill="#E4572E">faixa visível no computador</text></svg></body>`);await p.screenshot({path:'canal/capa_facebook_guia.png'});
 await b.close();console.log('ok');})();
