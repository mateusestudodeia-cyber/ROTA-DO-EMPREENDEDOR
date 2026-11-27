// Foto de perfil 800x800 (o YouTube recorta em círculo). Uso: node motor/perfil.js
const {figura}=require('../biblioteca/personagens');const {P}=require('../biblioteca/cenarios');
const V={
 a_teal:`<rect width="800" height="800" fill="#1E88A8"/><circle cx="400" cy="400" r="330" fill="#FAF7F0"/>${figura({tipo:'carlos',soCabeca:true,x:400,y:430,s:3.6,expr:'feliz'})}`,
 b_dourado:`<rect width="800" height="800" fill="#F6D776"/>${figura({tipo:'carlos',soCabeca:true,x:400,y:440,s:4.2,expr:'determinado'})}`,
 c_marmita:`<rect width="800" height="800" fill="#FAF7F0"/><circle cx="400" cy="400" r="400" fill="#1E88A8"/>${figura({tipo:'carlos',x:400,y:900,s:2.2,pose:'acenando',expr:'rindo'})}<g transform="translate(560,640) scale(1.1)">${P.marmita({vapor:1})}</g>`,
};
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:800,height:800}});
 for(const [n,s] of Object.entries(V)){await p.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">${s}</svg></body>`);await p.screenshot({path:`canal/perfil/perfil_${n}.png`});}
 // prévia: como aparece no YouTube (círculo grande e pequeno)
 const imgs=Object.keys(V).map(n=>require('fs').readFileSync(`canal/perfil/perfil_${n}.png`).toString('base64'));
 await p.setViewportSize({width:1200,height:520});
 await p.setContent(`<body style="margin:0;background:#fff;font-family:sans-serif;display:flex;gap:60px;padding:40px">${imgs.map((b64,i)=>`<div style="text-align:center"><img src="data:image/png;base64,${b64}" style="width:300px;height:300px;border-radius:50%"><br><img src="data:image/png;base64,${b64}" style="width:48px;height:48px;border-radius:50%;margin-top:30px"><div style="font-size:28px;margin-top:10px">${'ABC'[i]}</div></div>`).join('')}</body>`);
 await p.screenshot({path:'canal/perfil/previa.png'});await b.close();console.log('ok');})();
