// Cenários e objetos no traço palito. Todos desenhados com base no chão em y=0 (ou centro, se flutuante).
const O=require('./objetos');
const INK='#1A1A1A', W='#FFFFFF', RED='#E4572E', TEAL='#1E88A8', GREEN='#3FA34D', GOLD='#F6D776', CREAM='#FAF7F0';
const st=(w=7)=>`stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const T=(x,y,t,sz=30,c=INK,w=800,a='middle')=>`<text x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-size="${sz}" font-weight="${w}" fill="${c}" text-anchor="${a}">${t}</text>`;
const P={
 predio:()=>`<rect x="-260" y="-620" width="520" height="620" fill="#EAF3F8" ${st(8)}/>`+[...Array(5)].map((_,r)=>[...Array(4)].map((_,c)=>`<rect x="${-220+c*115}" y="${-580+r*100}" width="80" height="60" fill="#BFDDEB" ${st(5)}/>`).join('')).join('')+`<rect x="-60" y="-110" width="120" height="110" fill="#BFDDEB" ${st(6)}/>`,
 catraca:({negado=true}={})=>`<rect x="-30" y="-150" width="60" height="150" fill="#ccc" ${st(6)}/><line x1="30" y1="-100" x2="110" y2="-100" ${st(9)}/><circle cx="0" cy="-125" r="12" fill="${negado?RED:GREEN}" ${st(4)}/>`,
 caixa:()=>`<path d="M-70,-90 L70,-90 L60,0 L-60,0 Z" fill="#E8C99A" ${st(6)}/><path d="M-20,-90 q-10,-50 10,-70 q5,30 -5,70" fill="${GREEN}" ${st(4)}/><rect x="15" y="-125" width="30" height="35" rx="4" fill="#fff" ${st(4)}/>`,
 fabrica:({nome='AUTOPEÇAS'}={})=>`<path d="M-420,0 L-420,-260 L-300,-340 L-300,-260 L-180,-340 L-180,-260 L-60,-340 L-60,-260 L60,-340 L60,-260 L420,-260 L420,0 Z" fill="#E9E4D8" ${st(8)}/><rect x="250" y="-470" width="50" height="210" fill="#ccc" ${st(6)}/>`+[0,1,2].map(i=>`<circle cx="${275+i*18}" cy="${-500-i*40}" r="${18+i*8}" fill="#ddd" opacity=".8"/>`).join('')+`<rect x="-200" y="-230" width="400" height="60" fill="${W}" ${st(5)}/>${T(0,-188,nome,40)}`+[-330,-130,130,330].map(x=>`<rect x="${x-40}" y="-150" width="80" height="60" fill="#BFDDEB" ${st(5)}/>`).join(''),
 portao:()=>`<rect x="-200" y="-200" width="400" height="200" fill="none" ${st(7)}/>`+[...Array(9)].map((_,i)=>`<line x1="${-200+i*50}" y1="-200" x2="${-200+i*50}" y2="0" ${st(5)}/>`).join(''),
 lanchonete:({preco='PF R$ 15'}={})=>`<rect x="-260" y="-360" width="520" height="360" fill="${W}" ${st(8)}/>`+[...Array(8)].map((_,i)=>`<path d="M${-260+i*65},-360 l65,0 l0,60 q-32,20 -65,0 Z" fill="${i%2?W:RED}" ${st(4)}/>`).join('')+`${T(0,-390,'LANCHONETE DO BIGODE',38)}<rect x="-200" y="-260" width="200" height="140" fill="#BFDDEB" ${st(5)}/><rect x="60" y="-240" width="150" height="90" fill="${GOLD}" ${st(5)}/>${T(135,-185,preco,34)}<rect x="40" y="-120" width="100" height="120" fill="#E8C99A" ${st(5)}/>`,
 fogao:({fogo=true}={})=>`<rect x="-150" y="-200" width="300" height="200" fill="${W}" ${st(7)}/><rect x="-150" y="-230" width="300" height="30" fill="#ddd" ${st(6)}/>`+[-80,80].map(x=>`<ellipse cx="${x}" cy="-232" rx="45" ry="10" fill="none" ${st(5)}/>${fogo?`<path d="M${x-20},-238 q8,-22 0,-34 q16,10 10,34 q12,-14 8,-28 q14,18 2,28z" fill="${RED}" opacity=".85"/>`:''}`).join('')+`<rect x="-110" y="-160" width="220" height="110" rx="8" fill="none" ${st(5)}/>`,
 panela:({vapor=1}={})=>`<path d="M-80,-100 L80,-100 L70,0 L-70,0 Z" fill="#C9CED6" ${st(7)}/><rect x="-92" y="-118" width="184" height="20" rx="6" fill="#B0B6C0" ${st(6)}/><line x1="-110" y1="-80" x2="-80" y2="-80" ${st(9)}/><line x1="80" y1="-80" x2="110" y2="-80" ${st(9)}/>`+(vapor?[-30,0,30].map(x=>`<path d="M${x},-130 q-10,-15 0,-30 q10,-15 0,-30" fill="none" ${st(5)} opacity=".5"/>`).join(''):''),
 panelaPressao:()=>`<path d="M-80,-110 L80,-110 L70,0 L-70,0 Z" fill="#C9CED6" ${st(7)}/><path d="M-90,-110 Q0,-170 90,-110 Z" fill="#B0B6C0" ${st(6)}/><rect x="-8" y="-180" width="16" height="30" fill="${INK}"/><line x1="90" y1="-115" x2="170" y2="-130" ${st(10)}/>`,
 maquinaCostura:()=>`<rect x="-130" y="-30" width="260" height="30" fill="#ddd" ${st(6)}/><path d="M-100,-30 L-100,-150 L90,-150 L90,-110 L-40,-110 L-40,-30 Z" fill="${W}" ${st(7)}/><line x1="60" y1="-110" x2="60" y2="-60" ${st(5)}/><circle cx="-100" cy="-120" r="22" fill="#ddd" ${st(5)}/>`,
 guardaRoupa:()=>`<rect x="-150" y="-500" width="300" height="500" fill="#E8C99A" ${st(8)}/><line x1="0" y1="-500" x2="0" y2="0" ${st(6)}/><circle cx="-18" cy="-250" r="7" fill="${INK}"/><circle cx="18" cy="-250" r="7" fill="${INK}"/>`,
 placa:({t1='OFICINA REIS',t2='O PREÇO MAIS BAIXO DO BAIRRO',verso=''}={})=>verso?`<rect x="-260" y="-80" width="520" height="160" rx="10" fill="#C9B69A" ${st(7)}/>${T(0,22,verso,64,INK,900)}`:`<rect x="-260" y="-80" width="520" height="160" rx="10" fill="${GOLD}" ${st(7)}/>${T(0,-10,t1,54,INK,900)}${T(0,46,t2,26,INK,700)}`,
 isopor:()=>`<rect x="-110" y="-120" width="220" height="120" rx="12" fill="${W}" ${st(7)}/><rect x="-120" y="-140" width="240" height="30" rx="10" fill="#7EC8F0" ${st(6)}/>${T(0,-45,'MARMITA',30)}`,
 cartaz:({t='MARMITA R$ 12'}={})=>{const w=Math.max(340,t.length*31+60);return `<line x1="0" y1="0" x2="0" y2="-180" ${st(9)}/><rect x="${-w/2}" y="-330" width="${w}" height="160" rx="8" fill="${W}" ${st(7)}/>${T(0,-235,t,46,INK,900)}`},
 cofrinho:({furos=0}={})=>`<ellipse cx="0" cy="-90" rx="130" ry="90" fill="#F7B6C2" ${st(7)}/><circle cx="110" cy="-110" r="30" fill="#F7B6C2" ${st(6)}/><circle cx="118" cy="-112" r="5" fill="${INK}"/><circle cx="104" cy="-112" r="5" fill="${INK}"/><rect x="-30" y="-182" width="60" height="10" rx="4" fill="${INK}"/><line x1="-70" y1="-10" x2="-70" y2="0" ${st(14)}/><line x1="70" y1="-10" x2="70" y2="0" ${st(14)}/>`+[...Array(furos)].map((_,i)=>`<circle cx="${-80+i*40}" cy="${-40-(i%2)*30}" r="9" fill="${INK}"/>`).join(''),
 botijao:()=>`<rect x="-60" y="-170" width="120" height="170" rx="40" fill="#5E8FCF" ${st(7)}/><rect x="-25" y="-200" width="50" height="35" fill="#ccc" ${st(6)}/>`,
 balanca:({tomba=0}={})=>`<line x1="0" y1="0" x2="0" y2="-260" ${st(10)}/><path d="M-60,0 L60,0" ${st(10)}/><g transform="translate(0,-260) rotate(${tomba})"><line x1="-220" y1="0" x2="220" y2="0" ${st(9)}/><path d="M-280,80 L-160,80 L-220,0 Z" fill="none" ${st(5)}/><path d="M160,80 L280,80 L220,0 Z" fill="none" ${st(5)}/><rect x="-290" y="80" width="140" height="60" rx="8" fill="#D8F0DA" ${st(6)}/>${T(-220,122,'R$ 12,00',28)}<rect x="150" y="80" width="140" height="60" rx="8" fill="#F6D9D2" ${st(6)}/>${T(220,122,'R$ 12,44',28,RED)}</g>`,
 corrente:({n=6,fraco=-1,partido=false}={})=>[...Array(n)].map((_,i)=>{const x=(i-(n-1)/2)*110,c=i===fraco?'#B5651D':INK;return i===fraco&&partido?`<path d="M${x-50},-18 a50,30 0 0 1 40,-12" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round"/><path d="M${x+10},30 a50,30 0 0 0 40,-12" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round"/>`:`<ellipse cx="${x}" cy="0" rx="62" ry="32" fill="none" stroke="${c}" stroke-width="12"/>`}).join(''),
 carrinho:()=>`<path d="M-20,-260 L-20,0 L90,0" fill="none" ${st(10)}/><circle cx="-20" cy="0" r="26" fill="${W}" ${st(7)}/><line x1="-20" y1="-260" x2="-70" y2="-280" ${st(9)}/>`,
 casa:()=>`<rect x="-150" y="-200" width="300" height="200" fill="${W}" ${st(8)}/><path d="M-180,-200 L0,-340 L180,-200 Z" fill="${RED}" ${st(8)}/><rect x="-35" y="-110" width="70" height="110" fill="#E8C99A" ${st(6)}/><rect x="60" y="-150" width="60" height="50" fill="#BFDDEB" ${st(5)}/>`,
 portaAco:({fechado=1}={})=>`<rect x="-200" y="-300" width="400" height="300" fill="#555" ${st(7)}/><rect x="-200" y="-300" width="400" height="${300*fechado}" fill="#9AA3B2" ${st(6)}/>`+[...Array(Math.floor(12*fechado))].map((_,i)=>`<line x1="-200" y1="${-300+i*25}" x2="200" y2="${-300+i*25}" ${st(3)}/>`).join(''),
 lampada:()=>`<circle cx="0" cy="-60" r="45" fill="${GOLD}" ${st(6)}/><rect x="-22" y="-18" width="44" height="26" fill="#ccc" ${st(5)}/>`+[0,45,90,135,180].map(a=>`<line x1="${Math.cos((a+180)*Math.PI/180)*65}" y1="${-60+Math.sin((a+180)*Math.PI/180)*65}" x2="${Math.cos((a+180)*Math.PI/180)*85}" y2="${-60+Math.sin((a+180)*Math.PI/180)*85}" ${st(5)}/>`).join(''),
 relogio:({txt='06:00'}={})=>`<rect x="-150" y="-80" width="300" height="160" rx="18" fill="${INK}" ${st(6)}/>${T(0,30,txt,90,'#FF5A4E',900)}`,
 moto:()=>`<circle cx="-90" cy="-40" r="40" fill="${W}" ${st(8)}/><circle cx="90" cy="-40" r="40" fill="${W}" ${st(8)}/><path d="M-90,-40 L-20,-110 L60,-110 L90,-40" fill="none" ${st(9)}/><rect x="-60" y="-200" width="90" height="70" fill="${RED}" ${st(6)}/>`,
 mesa:O.mesa? (o={})=>O.mesa(0,0,1):()=>'',
 ferragem:()=>`<rect x="-320" y="-420" width="640" height="420" fill="${W}" ${st(8)}/><rect x="-320" y="-500" width="640" height="80" fill="#7A7F8C" ${st(7)}/>${T(0,-445,'FERRAGEM DO JAIRO',44,W)}`+[0,1,2].map(r=>`<line x1="-290" y1="${-330+r*90}" x2="290" y2="${-330+r*90}" ${st(6)}/>`+[...Array(6)].map((_,c)=>`<rect x="${-270+c*95}" y="${-370+r*90}" width="${30+(c*13+r*7)%40}" height="38" fill="${['#F2A541','#7EC8F0','#E4572E','#9AA3B2'][(c+r)%4]}" ${st(4)}/>`).join('')).join(''),
 balcao:()=>`<rect x="-260" y="-150" width="520" height="150" fill="#E8C99A" ${st(8)}/><rect x="-280" y="-170" width="560" height="26" fill="#C9A27A" ${st(7)}/>`,
 salada:()=>`<path d="M-40,0 q-10,-40 20,-50 q10,30 -20,50z M0,0 q0,-50 30,-55 q0,35 -30,55z M20,0 q20,-35 50,-30 q-15,30 -50,30z" fill="${GREEN}" ${st(4)}/>`,
 diagrama:({n=4,taxas=[],fraco=-1,partido=false}={})=>{const nomes=['COMPRAR','COZINHAR','MONTAR','ENTREGAR'];let s='';nomes.slice(0,n).forEach((nm,i)=>{const x=-630+i*420,f=i===fraco;
   if(i>0) s+=`<g transform="translate(${x-210},0) scale(.55)">${P.corrente({n:2,fraco:f||i-1===fraco?0:-1,partido:partido&&(i===fraco)})}</g>`;
   s+=`<rect x="${x-150}" y="-80" width="300" height="160" rx="16" fill="${f?'#F6D9D2':W}" stroke="${f?RED:INK}" stroke-width="8"/>${T(x,-12,nm,40,f?RED:INK,900)}${taxas[i]?T(x,48,taxas[i],38,f?RED:'#555',800):''}`;});return s;},
 luminaria:()=>`<path d="M0,0 L60,0 M30,0 L30,-200 L110,-280" fill="none" ${st(10)}/><path d="M90,-310 L170,-260 L130,-220 Z" fill="${INK}"/><path d="M150,-240 L60,0 L330,0 Z" fill="${GOLD}" opacity=".25"/>`,
 marmita:({vapor=0}={})=>O.marmita(0,0,1,0,vapor), nota:()=>O.nota(0,0,1), moeda:()=>O.moeda(0,0,1),
 conta:({titulo='CONTA',valor='',carimbo=true}={})=>O.conta(0,0,1,0,titulo,valor,carimbo),
 pensamento:({txt=''}={})=>O.balaoPensamento(0,0,1,txt),
};
// Painéis com linhas (guardanapo, cortiça, celular, papel de pão, quadro): linhas aparecem até "n".
function painel({estilo='papel',titulo='',linhas=[],n=99,w=760,h=null,destaque=[]}={}){
  const lh=58, H=h||(110+linhas.length*lh);
  const bg={papel:W,guardanapo:'#FFFDF5',cortica:'#C9A27A',celular:INK,quadro:'#F4F4F4',pao:'#E8D3AE',banco:W}[estilo]||W;
  const tc=estilo==='celular'?'#fff':INK;
  let s=estilo==='celular'?`<rect x="${-w/2-20}" y="-40" width="${w+40}" height="${H+80}" rx="40" fill="${INK}"/><rect x="${-w/2}" y="0" width="${w}" height="${H}" rx="14" fill="#F4F8FB"/>`
    :`<rect x="${-w/2}" y="0" width="${w}" height="${H}" rx="${estilo==='guardanapo'?2:14}" fill="${bg}" ${st(7)}/>`;
  if(estilo==='cortica') s+=`<rect x="${-w/2+24}" y="24" width="${w-48}" height="${H-48}" fill="#FFFDF5" ${st(4)}/>`;
  if(titulo) s+=T(0,62,titulo,40,estilo==='celular'?INK:INK,900);
  linhas.slice(0,n).forEach((l,i)=>{const d=destaque.includes(i);const cor=typeof l==='object'?l.c:(d?RED:INK);const txt=typeof l==='object'?l.t:l;
    s+=T(-w/2+48,(titulo?120:70)+i*lh,txt,34,cor||INK,d||(typeof l==='object'&&l.b)?900:600,'start');});
  return s;
}
function balaoFala({txt='',w=null,cauda='esq'}={}){
  const lines=String(txt).split('\n'); const ww=w||Math.max(...lines.map(l=>l.length))*21+70, hh=lines.length*44+40;
  const cx=cauda==='esq'?-ww/2+60:ww/2-60;
  return `<g transform="translate(0,${-hh-30})"><rect x="${-ww/2}" y="0" width="${ww}" height="${hh}" rx="26" fill="${W}" ${st(6)}/><path d="M${cx-18},${hh-3} L${cx},${hh+34} L${cx+20},${hh-3}" fill="${W}" ${st(6)}/><rect x="${cx-16}" y="${hh-8}" width="34" height="10" fill="${W}"/>`+lines.map((l,i)=>T(0,48+i*44,l,34,INK,700)).join('')+`</g>`;
}
module.exports={P,painel,balaoFala,T,INK,RED,TEAL,GREEN,GOLD,CREAM};
