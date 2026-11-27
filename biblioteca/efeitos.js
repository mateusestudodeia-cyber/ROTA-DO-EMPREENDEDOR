// Efeitos animados no traço do canal. Cada função devolve um item {tipo:'svg'} para colocar em a.itens (ou a.fixos).
// Uso: const E=require('../../biblioteca/efeitos'); a.itens.push(E.impacto(960,500,T(c,2)));
const INK='#1A1A1A', RED='#E4572E', GOLD='#F6D776', GREEN='#3FA34D', TEAL='#1E88A8';
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)), io=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const rnd=s=>{let x=Math.sin(s*999.7)*43758.5453;return x-Math.floor(x)};
const svg=(t0,dur,fn)=>({tipo:'svg',t0,t1:t0+dur,anim:'none',svg:t=>fn(cl((t-t0)/dur),t)});

// Explosão estilo gibi (raios + estrela) atrás de algo importante
const impacto=(x,y,t0,{r=260,cor=GOLD,dur=.6}={})=>svg(t0,dur,u=>{const k=io(cl(u*3)),op=1-cl((u-.6)/.4);let s='';
  for(let i=0;i<16;i++){const a=i*Math.PI/8,r1=r*.45*k,r2=r*(i%2?.8:1.1)*k;s+=`<line x1="${x+Math.cos(a)*r1}" y1="${y+Math.sin(a)*r1}" x2="${x+Math.cos(a)*r2}" y2="${y+Math.sin(a)*r2}" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`}
  const pts=[...Array(20)].map((_,i)=>{const a=i*Math.PI/10,rr=(i%2?.38:.6)*r*k;return `${x+Math.cos(a)*rr},${y+Math.sin(a)*rr}`}).join(' ');
  return `<g opacity="${op}"><polygon points="${pts}" fill="${cor}" stroke="${INK}" stroke-width="7"/>${s}</g>`});

// Chuva de notas (dinheiro entrando) ou moedas
const chuvaDinheiro=(t0,{dur=2.5,n=18,x0=0,x1=1920,moeda=false}={})=>svg(t0,dur,(u,t)=>{let s='';for(let i=0;i<n;i++){const d=rnd(i),st=d*.4,k=cl((u-st)/(.6));if(k<=0)continue;
  const x=x0+(x1-x0)*rnd(i+7),y=-120+k*1250,rot=(rnd(i+3)-.5)*720*k;
  s+=moeda?`<g transform="translate(${x},${y}) rotate(${rot})"><circle r="26" fill="${GOLD}" stroke="${INK}" stroke-width="5"/><text y="9" font-family="DejaVu Sans" font-weight="900" font-size="26" text-anchor="middle">$</text></g>`
          :`<g transform="translate(${x},${y}) rotate(${rot})"><rect x="-60" y="-30" width="120" height="60" rx="6" fill="#D8F0DA" stroke="${INK}" stroke-width="5"/><circle r="17" fill="#fff" stroke="${INK}" stroke-width="4"/></g>`}return s});

// Confete de conquista
const confete=(x,y,t0,{dur=1.8,n=40}={})=>svg(t0,dur,u=>{let s='';const cores=[RED,GOLD,GREEN,TEAL,'#B57EDC'];for(let i=0;i<n;i++){const a=rnd(i)*Math.PI*2,v=300+rnd(i+1)*500;
  const px=x+Math.cos(a)*v*u,py=y+Math.sin(a)*v*u*.7+900*u*u,op=1-cl((u-.6)/.4);
  s+=`<rect x="${px}" y="${py}" width="18" height="10" fill="${cores[i%5]}" transform="rotate(${rnd(i+9)*360+u*600} ${px} ${py})" opacity="${op}"/>`}return s});

// Linhas de velocidade (sensação de pressa, virada)
const velocidade=(t0,{dur=.8,cor=INK}={})=>svg(t0,dur,u=>{let s='';for(let i=0;i<26;i++){const y=rnd(i)*1080,l=200+rnd(i+2)*600,x=((rnd(i+4)*1920+u*3000)%2600)-400;
  s+=`<line x1="${x}" y1="${y}" x2="${x+l}" y2="${y}" stroke="${cor}" stroke-width="${3+rnd(i)*5}" opacity="${.25+rnd(i+5)*.35}" stroke-linecap="round"/>`}return s});

// Ícones de reação perto da cabeça de um personagem: '!', '?', 'suor', 'coracao', 'raiva', 'ideia'
const reacao=(tipo,x,y,t0,{dur=1.2}={})=>svg(t0,dur,u=>{const k=u<.15?1+.6*Math.sin(u/.15*Math.PI):1,op=1-cl((u-.8)/.2),b=Math.sin(u*14)*6;
  const g={'!':`<text font-family="DejaVu Sans" font-weight="900" font-size="130" fill="${RED}" stroke="${INK}" stroke-width="6" paint-order="stroke" text-anchor="middle">!</text>`,
   '?':`<text font-family="DejaVu Sans" font-weight="900" font-size="130" fill="${TEAL}" stroke="${INK}" stroke-width="6" paint-order="stroke" text-anchor="middle">?</text>`,
   suor:`<path d="M0,-60 q30,50 0,70 q-30,-20 0,-70z" fill="#7EC8F0" stroke="${INK}" stroke-width="5"/>`,
   coracao:`<path d="M0,20 C-60,-20 -40,-80 0,-50 C40,-80 60,-20 0,20z" fill="${RED}" stroke="${INK}" stroke-width="6"/>`,
   raiva:`<g stroke="${RED}" stroke-width="12" stroke-linecap="round"><path d="M-40,-40 q20,20 0,40"/><path d="M40,-40 q-20,20 0,40"/><path d="M-40,-40 q20,20 40,0"/><path d="M-40,0 q20,-20 40,0"/></g>`,
   ideia:`<circle cy="-40" r="40" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><rect x="-18" y="0" width="36" height="22" fill="#ccc" stroke="${INK}" stroke-width="5"/>`}[tipo]||'';
  return `<g transform="translate(${x},${y+b}) scale(${k})" opacity="${op}">${g}</g>`});

// Círculo desenhado à mão em volta de algo (destaque)
const circulo=(x,y,t0,{rx=220,ry=110,dur=2,cor=RED}={})=>svg(t0,dur,u=>{const L=2*Math.PI*Math.sqrt((rx*rx+ry*ry)/2)*1.15,k=io(cl(u/.35));
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(-6 ${x} ${y})" fill="none" stroke="${cor}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${L}" stroke-dashoffset="${L*(1-k)}"/>`});

// Seta desenhada apontando para (x,y)
const seta=(x,y,t0,{de=[-300,-200],dur=2,cor=RED}={})=>svg(t0,dur,u=>{const k=io(cl(u/.3)),sx=x+de[0],sy=y+de[1],ex=sx+(x-sx)*k,ey=sy+(y-sy)*k,a=Math.atan2(y-sy,x-sx);
  return `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${cor}" stroke-width="14" stroke-linecap="round"/>`+(k>.95?`<path d="M${x},${y} l${-40*Math.cos(a-.5)},${-40*Math.sin(a-.5)} M${x},${y} l${-40*Math.cos(a+.5)},${-40*Math.sin(a+.5)}" stroke="${cor}" stroke-width="14" stroke-linecap="round"/>`:'')});

// Brilho (estrelinhas) em volta de algo valioso
const brilho=(x,y,t0,{dur=1.5,r=180}={})=>svg(t0,dur,(u,t)=>{let s='';for(let i=0;i<7;i++){const a=i*Math.PI*2/7+u*2,k=Math.abs(Math.sin(t*8+i));const px=x+Math.cos(a)*r,py=y+Math.sin(a)*r*.7;
  s+=`<path d="M${px},${py-26*k} L${px+7*k},${py-7*k} L${px+26*k},${py} L${px+7*k},${py+7*k} L${px},${py+26*k} L${px-7*k},${py+7*k} L${px-26*k},${py} L${px-7*k},${py-7*k}Z" fill="${GOLD}" stroke="${INK}" stroke-width="3"/>`}return s});

// Onda de choque (anel que se expande) — impacto de notícia
const onda=(x,y,t0,{dur=.7,cor=INK}={})=>svg(t0,dur,u=>`<circle cx="${x}" cy="${y}" r="${40+u*700}" fill="none" stroke="${cor}" stroke-width="${16*(1-u)}" opacity="${1-u}"/>`);

// Falha/glitch de tela (faixas deslocadas) — use em a.fixos para cobrir a tela toda
const glitch=(t0,{dur=.35}={})=>svg(t0,dur,(u,t)=>{let s='';for(let i=0;i<7;i++){const y=rnd(i+Math.floor(t*30))*1080,h=10+rnd(i+3)*60,dx=(rnd(i+Math.floor(t*30)+1)-.5)*120;
  s+=`<rect x="${dx}" y="${y}" width="1920" height="${h}" fill="${i%2?RED:TEAL}" opacity=".35"/>`}return s});

// Texto que quica/balança (para palavras-chave). anim: 'quica' | 'balanca'
const textoVivo=(txt,x,y,t0,{dur=2,sz=90,cor=INK,anim='quica'}={})=>svg(t0,dur,(u,t)=>{const e=u<.12?1.4-.4*(u/.12):1,
  dy=anim==='quica'?-Math.abs(Math.sin(t*9))*14:0,rot=anim==='balanca'?Math.sin(t*10)*5:0;
  return `<g transform="translate(${x},${y+dy}) rotate(${rot}) scale(${e})"><text font-family="DejaVu Sans" font-weight="900" font-size="${sz}" fill="${cor}" text-anchor="middle" stroke="#FAF7F0" stroke-width="${sz/7}" paint-order="stroke">${txt}</text></g>`});

module.exports={impacto,chuvaDinheiro,confete,velocidade,reacao,circulo,seta,brilho,onda,glitch,textoVivo};
