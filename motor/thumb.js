// Thumbnail 1280x720 no traço palito. Uso: node motor/thumb.js ep01
const fs=require('fs');const {figura}=require('../biblioteca/personagens');const {P}=require('../biblioteca/cenarios');
const EP=process.argv[2];
const TX=(x,y,t,sz,cor,stroke='#1A1A1A',rot=0)=>`<text x="${x}" y="${y}" transform="rotate(${rot} ${x} ${y})" font-family="DejaVu Sans,sans-serif" font-weight="900" font-size="${sz}" fill="${cor}" text-anchor="middle" stroke="${stroke}" stroke-width="${sz/9}" paint-order="stroke">${t}</text>`;
const CARTEIRA=(x,y,s,rot)=>`<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-150" y="-200" width="300" height="400" rx="16" fill="#2E5FA8" stroke="#1A1A1A" stroke-width="10"/><text x="0" y="-90" font-family="DejaVu Sans" font-weight="900" font-size="40" fill="#FFFFFF" text-anchor="middle">CARTEIRA</text><text x="0" y="-45" font-family="DejaVu Sans" font-weight="900" font-size="40" fill="#FFFFFF" text-anchor="middle">DE TRABALHO</text><path d="M-150,40 L-60,10 L0,60 L70,0 L150,50" fill="none" stroke="#FAF7F0" stroke-width="16"/><line x1="-180" y1="-230" x2="180" y2="230" stroke="#E4572E" stroke-width="30" stroke-linecap="round"/><line x1="180" y1="-230" x2="-180" y2="230" stroke="#E4572E" stroke-width="30" stroke-linecap="round"/></g>`;
const THUMBS={
 ep01:()=>`<rect width="1920" height="1080" fill="#FAF7F0"/><rect x="1010" y="0" width="910" height="1080" fill="#F6D9D2"/>
  ${CARTEIRA(250,330,.9,-12)}
  ${[0,1,2].map(k=>`<g transform="translate(${220+(k%2)*50},${1000-k*95}) rotate(${k%2?5:-5}) scale(1.2)">${P.marmita({vapor:k})}</g>`).join('')}
  ${figura({tipo:'carlos',x:720,y:1180,s:2.6,pose:'desespero',expr:'desesperado'})}
  ${TX(1465,300,'SEM CLT',170,'#1A1A1A','#FAF7F0')}${TX(1465,440,'200 VENDAS',110,'#1A1A1A','#FAF7F0')}${TX(1465,780,'−R$ 303',195,'#E4572E','#FAF7F0',-4)}`,
 ep02:()=>`<rect width="1920" height="1080" fill="#22293D"/><circle cx="520" cy="660" r="500" fill="#FAF7F0"/>
  ${figura({tipo:'carlos',x:520,y:1180,s:2.6,pose:'desespero',expr:'desesperado'})}
  <g transform="translate(820,200) rotate(8)"><rect x="-150" y="-55" width="300" height="100" rx="18" fill="#FFFFFF" stroke="#E4572E" stroke-width="8"/><text x="0" y="18" font-family="DejaVu Sans" font-weight="900" font-size="54" fill="#E4572E" text-anchor="middle">"golpe?"</text></g>
  ${TX(1420,320,'+R$ 5.700',150,'#3FA34D','#22293D')}
  <path d="M1420,390 L1420,560" stroke="#FFFFFF" stroke-width="22"/><path d="M1360,540 L1420,620 L1480,540 Z" fill="#FFFFFF"/>
  ${TX(1420,800,'−R$ 600',200,'#E4572E','#22293D',-3)}`,
};
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
 await p.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">${THUMBS[EP]()}</svg></body>`);
 const out=`/home/user/estudio/episodios/${EP}/thumb_1920.png`;await p.screenshot({path:out});await b.close();
 require('child_process').execSync(`ffmpeg -loglevel error -y -i ${out} -vf scale=1280:720 /home/user/estudio/episodios/${EP}/thumb.png && ffmpeg -loglevel error -y -i ${out} -vf scale=320:180 /home/user/estudio/episodios/${EP}/thumb_mini.jpg && rm ${out}`);console.log('thumb ok',EP);})();
