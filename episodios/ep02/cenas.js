// EP02 — planilha visual. T(c,i,dt) = início do trecho i da cena c; F = fim.
module.exports=({T,F,ini,fim,n})=>{
const {figura}=require('../../biblioteca/personagens');
const C=(c,o)=>({t0:ini(c),t1:fim(c),itens:[],sfx:[],...o});
const fig=(quem,x,s,t0,o={})=>({tipo:'fig',quem,x,y:o.y??910,s,t0,anim:'pop',...o});
const prop=(nome,x,y,s,t0,o={})=>({tipo:'prop',nome,x,y,s,t0,anim:'pop',...o});
const txt=(t,x,y,sz,t0,o={})=>({tipo:'txt',txt:t,x,y,sz,t0,anim:'slam',...o});
const bal=(t,x,y,t0,t1,o={})=>({tipo:'balao',txt:t,x,y,t0,t1,anim:'pop',s:1,...o});
const S=(t,nm,v=.6)=>({t,n:nm,v});
const RED='#E4572E',GREEN='#3FA34D',TEAL='#1E88A8',GOLD='#F6D776',NOITE='#22293D';
const dur=(c,i)=>F(c,i)-T(c,i);
const cenas=[];

// 1 — GANCHO
{const c=1,a=C(c,{trilha:'tensa',fundo:NOITE,chao:null});
 a.itens.push({tipo:'prop',nome:'relogio',x:960,y:170,s:.8,t0:ini(c),t1:T(c,1),anim:'pop',args:{txt:'06:00'}});
 a.itens.push({tipo:'notifs',x:960,y:980,s:1,t0:ini(c),t1:T(c,1),dur:1.6,n:14,txt:'Pix recebido · R$ 19',anim:'none'});
 a.itens.push({tipo:'contador',de:0,ate:300,suf:' PEDIDOS',x:960,y:470,sz:160,cor:GOLD,contorno:NOITE,t0:T(c,0),t1:T(c,1),dur:.8,anim:'slam'},txt('PAGOS.',960,620,90,T(c,0,1.1),{t1:T(c,1),cor:GREEN,contorno:NOITE}));
 for(let k=0;k<5;k++)a.sfx.push(S(ini(c)+k*.3,'vibra',.45));a.sfx.push(S(T(c,0,.8),'impact',.8),S(T(c,0,1.1),'ding',.5));
 const k1=T(c,1);a.fundos=[{t:k1,cor:'#FAF7F0'},{t:T(c,5),cor:NOITE}];
 a.itens.push(prop('fogao',700,910,1,k1,{t1:T(c,2),anim:'none'}),prop('panela',700,680,.8,k1,{t1:T(c,2),anim:'none'}),fig('lucia',1100,1.35,k1,{t1:T(c,2),anim:'none',estados:[{t:0,pose:'mexendo',expr:'cansado'}]}));
 a.itens.push(txt('CAPACIDADE: 60',960,200,110,k1+.5,{t1:T(c,2),cor:RED}));a.sfx.push(S(k1+.5,'slam',.7));
 const sp=T(c,2);a.itens.push({tipo:'svg',t0:sp,t1:T(c,4),anim:'fade',svg:t=>{let s=`<line x1="960" y1="80" x2="960" y2="900" stroke="#1A1A1A" stroke-width="6"/><text x="480" y="140" font-family="DejaVu Sans" font-size="70" font-weight="900" text-anchor="middle">300 PEDIDOS</text><text x="1440" y="140" font-family="DejaVu Sans" font-size="70" font-weight="900" text-anchor="middle" fill="${RED}">60 MARMITAS</text>`;
   for(let i=0;i<300;i++){const x=110+(i%20)*37,y=220+Math.floor(i/20)*42;s+=`<circle cx="${x}" cy="${y}" r="14" fill="#fff" stroke="#1A1A1A" stroke-width="4"/>`}
   for(let i=0;i<60;i++){const x=1110+(i%10)*66,y=230+Math.floor(i/10)*90;s+=`<rect x="${x-24}" y="${y-16}" width="48" height="32" rx="5" fill="#fff" stroke="#1A1A1A" stroke-width="4"/>`}return s}});
 a.itens.push(fig('carlos',960,1.5,T(c,3),{t1:T(c,5),estados:[{t:T(c,3),pose:'comemorando',expr:'rindo'},{t:T(c,4),pose:'desespero',expr:'desesperado'}]}),bal('SIM!',960,330,T(c,3),T(c,4)));
 a.itens.push(txt('A ERRADA.',960,190,120,T(c,4),{t1:T(c,5),cor:RED}));a.sfx.push(S(T(c,4),'impact',.9));a.shake=[{t:T(c,4),amp:22}];
 const cm=T(c,5);a.itens.push(fig('carlos',960,1.5,cm,{anim:'none',estados:[{t:cm,pose:'desespero',expr:'desesperado'}]}));
 ['CHEGOU FRIA','15H???','QUERO MEU DINHEIRO','ARROZ EMPAPADO','golpe?'].forEach((s,k)=>{a.itens.push({tipo:'painel',estilo:'papel',x:330+k*315,y:110+(k%2)*170,s:.8,w:440,h:110,t0:cm+.3+k*.3,anim:'cair',rot:(k%2?6:-6),linhas:[{t:s,c:RED,b:1}]});a.sfx.push(S(cm+.3+k*.3,'erro',.35))});
 cenas.push(a);}

// 2 — CINCO MIL E SETECENTOS
{const c=2,a=C(c,{trilha:'leve',trans:'preto',silencios:[{t0:T(c,7),t1:F(c,7,.3)}]});
 a.itens.push(fig('bia',520,1.35,ini(c),{anim:'none',estados:[{t:0,pose:'celular',expr:'rindo',pular:1},{t:T(c,4),pular:0,expr:'feliz'}]}));
 a.itens.push({tipo:'painel',estilo:'banco',titulo:'BANCO · PIX',x:1250,y:120,s:.85,w:700,h:520,t0:T(c,1),t1:T(c,4),anim:'subir',linhas:['+ R$ 19,00  Pix recebido','+ R$ 19,00  Pix recebido','+ R$ 19,00  Pix recebido','+ R$ 19,00  Pix recebido','...'],linhasT:[T(c,1,.3),T(c,1,.7),T(c,1,1.1),T(c,1,1.5),T(c,1,2)]});
 for(let k=0;k<10;k++)a.sfx.push(S(T(c,1,.3)+k*.25,'ding',.3));
 a.itens.push({tipo:'contador',de:0,ate:5700,fmt:'brl',x:1250,y:820,sz:140,cor:GREEN,t0:T(c,2),t1:T(c,4),dur:dur(c,2),anim:'pop'});
 a.itens.push(txt('MAIS QUE O MÊS INTEIRO',1250,180,60,T(c,3),{t1:T(c,4)}));a.sfx.push(S(T(c,3),'caixa',.6));
 a.itens.push(fig('carlos',1100,1.4,T(c,4),{estados:[{t:T(c,4),pose:'comemorando',expr:'rindo',pular:1},{t:T(c,6),pular:0,pose:'celular',expr:'feliz',mao:'celular'},{t:T(c,8),expr:'rindo'}]}));
 a.itens.push(fig('lucia',1600,1.35,T(c,5),{anim:'fade',estados:[{t:T(c,5),pose:'segurando',expr:'pensativo'}]}));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,5),s:1.6,x:1600,y:560,dur:.6},{t:T(c,6),s:1,x:960,y:540,dur:.5}];
 a.fixos=[{tipo:'svg',t0:T(c,6),t1:fim(c),anim:'subir',svg:`<g transform="translate(1560,40)"><rect x="0" y="0" width="320" height="420" rx="30" fill="#1A1A1A"/><rect x="16" y="16" width="288" height="388" rx="18" fill="#F4F8FB"/>${figura({tipo:'tiago',soCabeca:true,x:160,y:190,s:1.4,expr:'pensativo'})}<text x="160" y="380" font-family="DejaVu Sans" font-size="30" font-weight="800" text-anchor="middle">Tiago</text></g>`}];
 a.sfx.push(S(T(c,6),'telefone',.5));
 a.itens.push(bal('Carlos. Quantas marmitas\na sua cozinha faz?',1300,330,T(c,7),T(c,8)),bal('Relaxa.\nA gente dá um jeito.',1100,400,T(c,8),fim(c)));
 cenas.push(a);}

// 3 — O ELO FRACO (plantado)
{const c=3,a=C(c,{trilha:'leve',trans:'whoosh'});
 const t=T(c,1),d=dur(c,1);
 a.itens.push(fig('carlos',300,1.3,ini(c),{anim:'none',t1:T(c,2),estados:[{t:0,pose:'apontando',expr:'determinado'}]}));
 a.itens.push(prop('panela',650,910,.9,t,{t1:T(c,2)}),txt('PANELA EMPRESTADA',650,560,40,t,{t1:T(c,2),anim:'pop'}));
 a.itens.push(prop('panela',1000,910,1.3,t+d*.2,{t1:T(c,2)}),txt('CARTÃO: R$ 1.150',1000,500,48,t+d*.2,{t1:T(c,2),cor:RED}));
 [0,1,2].forEach(k=>a.itens.push(fig('rosa',1300+k*150,1,t+d*.55+k*.15,{t1:T(c,2),estados:[{t:0,expr:'feliz'}]})));
 a.itens.push(txt('3 VIZINHAS · R$ 100 CADA',1450,420,40,t+d*.55,{t1:T(c,2),anim:'pop'}));
 a.itens.push(prop('moto',1750,910,.7,t+d*.85,{t1:T(c,2)}),txt('2 MOTOBOYS',1750,700,40,t+d*.85,{t1:T(c,2),anim:'pop'}));
 [0,.2,.55,.85].forEach(f=>a.sfx.push(S(t+d*f,'pop',.5)));a.sfx.push(S(t+d*.2,'caixa',.4));
 const f0=T(c,2);a.cam=[{t:ini(c),s:1,x:960,y:540},{t:f0,s:1,x:4000,y:540,dur:.35}];a.sfx.push(S(f0,'whoosh',.5));
 a.itens.push(prop('ferragem',4000,910,1,f0,{anim:'none'}),prop('balcao',3800,910,1,f0,{anim:'none'}),fig('jairo',3800,1,f0,{y:870,anim:'none',estados:[{t:0,pose:'bracos_cruzados',expr:'neutro'}]}));
 a.itens.push(fig('operario',4350,1.3,f0,{anim:'none',espelhar:true,estados:[{t:0,pose:'segurando',expr:'bravo'}]}),prop('corrente',4300,700,.5,f0,{anim:'none',args:{n:4,fraco:1,partido:true}}));
 a.cam.push({t:T(c,3),s:2.2,x:4300,y:700,dur:.6},{t:T(c,4),s:1.2,x:4000,y:560,dur:.5});a.sfx.push(S(T(c,3),'corrente',.6));
 a.itens.push(bal('Corrente não arrebenta onde tá mais forte.\nArrebenta no elo mais fraco.',3800,330,T(c,5),F(c,5,.3)));
 a.itens.push(fig('carlos',3350,1.3,f0,{anim:'none',mov:[{t:T(c,7),x:3350},{t:T(c,7,.1),x:2500,dur:2.2}],andar:[T(c,7),T(c,7,2.3)],espelhar:true,estados:[{t:0,pose:'segurando',expr:'feliz',mao:'carrinho'}]}));
 a.itens.push(bal('Tá bom, Seu Jairo.\nDepois eu volto pra filosofia.',3350,420,T(c,6),F(c,6,.3)));
 a.cam.push({t:T(c,8),s:1.5,x:3800,y:560,dur:1});
 cenas.push(a);}

// 4 — QUARTA, 4H DA MANHÃ
{const c=4,a=C(c,{trilha:'tensa',trans:'preto'});
 const rel=[ini(c),T(c,2),T(c,3),T(c,5)],hs=['04:00','06:00','08:00','10:00'];
 a.itens.push({tipo:'prop',nome:'relogio',x:300,y:150,s:.6,t0:ini(c),anim:'pop',args:t=>({txt:hs[rel.filter(x=>t>=x).length-1]||'04:00'})});
 a.itens.push(prop('fogao',300,910,1,ini(c),{anim:'none'}),prop('panela',300,680,.8,ini(c),{anim:'none'}),prop('fogao',620,910,.8,ini(c),{anim:'none'}),prop('panela',620,700,.65,ini(c),{anim:'none'}));
 [[480,'mexendo'],[760,'segurando'],[860,'mexendo']].forEach(([x,p],k)=>a.itens.push(fig('rosa',x,1.15,T(c,1,k*.2),{estados:[{t:0,pose:p,expr:'cansado'}]})));
 a.itens.push({tipo:'svg',t0:T(c,3),anim:'fade',svg:`<ellipse cx="1260" cy="760" rx="320" ry="200" fill="#FFE7A8" opacity=".45"/>`});
 a.itens.push(fig('lucia',1260,1.3,ini(c),{y:910,anim:'none',estados:[{t:0,pose:'segurando',expr:'cansado'}]}),prop('mesa',1260,780,1,ini(c),{anim:'none'}));
 [0,1,2,3].forEach(k=>a.itens.push(prop('panela',1000-k*20,600-k*60,.45,T(c,3,.3+k*.2))));
 a.itens.push(fig('carlos',1700,1.3,T(c,1),{estados:[{t:T(c,1),pose:'apontando',expr:'determinado'},{t:T(c,6),pose:'desespero',expr:'surpreso'}]}));
 a.itens.push({tipo:'contador',de:0,ate:70,suf:' / 300 PRONTAS',x:1100,y:230,sz:90,cor:'#1A1A1A',t0:T(c,5),dur:1.2,anim:'pop'});a.sfx.push(S(T(c,5,1.2),'slam',.6));
 a.itens.push(txt('ENTREGA: 11H30',1100,360,72,T(c,7),{cor:RED}));a.sfx.push(S(T(c,7),'impact',.7));a.shake=[{t:T(c,7),amp:14}];
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,3),s:1.5,x:1200,y:620,dur:2.5},{t:T(c,5),s:1,x:960,y:540,dur:.5}];
 for(let k=0;k<14;k++)a.sfx.push(S(ini(c)+k*.9,'tick',.3));a.sfx.push(S(T(c,2),'panela',.4));
 cenas.push(a);}

// 5 — O "SIM"
{const c=5,a=C(c,{trilha:'tensa',trans:'whoosh'});
 a.itens.push(fig('carlos',380,1.35,ini(c),{anim:'none',estados:[{t:0,pose:'celular',expr:'determinado',mao:'celular'},{t:T(c,5),expr:'envergonhado'}]}));
 a.itens.push(txt('ELE PROMETEU.',1150,220,96,T(c,1),{t1:T(c,2),cor:RED}));a.sfx.push(S(T(c,1),'slam',.7));
 const p=T(c,2),d=dur(c,2);
 a.itens.push(prop('marmita',900,700,1.4,p,{t1:T(c,3),args:t=>({vapor:t*2})}),txt('FECHA QUENTE MESMO',900,420,46,p,{t1:T(c,3),anim:'pop'}));
 a.itens.push(txt('SALADA',1350,480,70,p+d*.35,{t1:T(c,3),anim:'pop'}),{tipo:'svg',t0:p+d*.45,t1:T(c,3),anim:'none',svg:`<line x1="1220" y1="455" x2="1480" y2="455" stroke="${RED}" stroke-width="12"/>`});a.sfx.push(S(p+d*.45,'caneta',.6));
 [0,1,2,3,4].forEach(k=>a.itens.push(prop('marmita',1650,880-k*70,.7,p+d*.7+k*.12,{t1:T(c,3),rot:(k%2?4:-4)})));
 a.itens.push({tipo:'painel',estilo:'celular',titulo:'Para: 300 contatos',x:1250,y:150,s:.9,w:640,h:420,t0:T(c,3),t1:T(c,5),anim:'subir',linhas:['','"Tudo saindo!','Chega até 12h30 :)"','',{t:'[ ENVIAR PARA TODOS ]',c:TEAL,b:1}],linhasT:[T(c,3),T(c,4),T(c,4),T(c,4),T(c,4,1)]});
 for(let k=0;k<12;k++)a.sfx.push(S(F(c,4)+k*.07,'tick',.35));
 a.itens.push(bal('Paga na sexta, campeão.',900,420,T(c,5),T(c,6),{anim:'fade'}));
 a.filtros=[{t0:T(c,5),t1:T(c,6),tipo:'sepia'}];
 a.itens.push(txt('300 TESTEMUNHAS',1150,250,96,T(c,6),{cor:RED}));a.sfx.push(S(T(c,6),'impact',.7));
 cenas.push(a);}

// 6 — QUINZE HORAS
{const c=6,a=C(c,{trilha:'tensa',trans:'whoosh'});
 [['12:00','110 ENTREGUES',0],['14:00','180 ENTREGUES',1],['15:00','O RESTO: CANCELAR',2]].forEach(([h,s,i])=>{a.itens.push({tipo:'prop',nome:'relogio',x:960,y:300,s:1,t0:T(c,i),t1:T(c,i+1),anim:'pop',args:{txt:h}},txt(s,960,560,90,T(c,i,.4),{t1:T(c,i+1),cor:i===2?RED:'#1A1A1A'}));a.sfx.push(S(T(c,i,.4),'slam',.5))});
 const cm=T(c,3);a.itens.push(fig('carlos',960,1.4,cm,{t1:T(c,6),anim:'none',estados:[{t:cm,pose:'triste',expr:'triste'},{t:T(c,4),pose:'desespero',expr:'desesperado'}]}));
 ['chegou fria','arroz empapado','chegou às 15h, já tinha almoçado','cadê meu pedido?','nunca mais'].forEach((s,k)=>{a.itens.push({tipo:'painel',estilo:'papel',x:k%2?1450:470,y:120+k*110,s:.6,w:Math.max(380,s.length*22+120),h:100,t0:cm+.3+k*.45,t1:T(c,5),anim:'esq',linhas:[{t:s,c:RED,b:1}]});a.sfx.push(S(cm+.3+k*.45,'erro',.3))});
 a.itens.push(txt('"golpe?"',960,230,150,T(c,4,.9),{t1:T(c,5),cor:RED}));a.sfx.push(S(T(c,4,.9),'impact',.8));a.shake=[{t:T(c,4,.9),amp:20}];
 const e=T(c,5);
 a.itens.push({tipo:'painel',estilo:'banco',titulo:'ESTORNOS',x:960,y:120,s:.9,w:900,h:430,t0:e,t1:T(c,6),anim:'subir',linhas:['− R$ 19,00  estorno','− R$ 19,00  estorno','− R$ 19,00  estorno','...'],linhasT:[e+.2,e+.5,e+.8,e+1.2]});
 a.itens.push({tipo:'contador',de:5700,ate:3420,fmt:'brl',x:960,y:760,sz:130,cor:RED,t0:e,t1:T(c,6),dur:dur(c,5),anim:'pop'},txt('120 CANCELADOS',960,890,60,e+1,{t1:T(c,6),anim:'pop'}));
 for(let k=0;k<8;k++)a.sfx.push(S(e+.2+k*.3,'moeda_rev',.35));
 const b=T(c,6);
 a.itens.push(fig('carlos',600,1.4,b,{t1:T(c,10),anim:'none',estados:[{t:b,pose:'apontando',expr:'bravo'},{t:T(c,9),pose:'triste',expr:'envergonhado'}]}),fig('bia',1320,1.4,b,{t1:T(c,10),anim:'none',espelhar:true,estados:[{t:b,pose:'em_pe',expr:'triste'},{t:T(c,8),pose:'apontando',expr:'bravo'}]}));
 a.itens.push(bal('Você postou sem\nme perguntar!',600,410,T(c,7),F(c,7,.3)),bal('Eu postei, Carlos.',1320,410,T(c,8),T(c,9)),bal('Quem prometeu foi você.',1320,410,T(c,9),T(c,10)));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,7),s:1.5,x:650,y:560,dur:.01},{t:T(c,8),s:1.5,x:1270,y:560,dur:.01},{t:T(c,10),s:1,x:960,y:-1460,dur:.35}];
 const g=T(c,10),lt=[g+.8,g+3,F(c,10,-.3),T(c,11),T(c,11,2.2)];
 a.itens.push({tipo:'painel',estilo:'guardanapo',titulo:'A CONTA DE QUARTA',x:960,y:-1950,s:1.05,w:1100,t0:g,anim:'pop',linhas:[{t:'Recebido de verdade ...... R$ 3.420',c:GREEN,b:1},'Comida e embalagem (300) . R$ 2.370','Vizinhas R$ 300 · Motoboys R$ 200','Sobra ....................... R$ 550',{t:'Panela no cartão ......... − R$ 1.150',c:RED,b:1}],linhasT:lt});
 lt.forEach(t=>a.sfx.push(S(t,'tick',.45)));
 a.itens.push(txt('−R$ 600',960,-1050,200,T(c,12,1.2),{cor:RED}));a.sfx.push(S(T(c,12,1.2),'impact',1));a.shake.push({t:T(c,12,1.2),amp:26,dur:.5});
 cenas.push(a);}

// 7 — "APAGA"
{const c=7,a=C(c,{trilha:'pad',vol:.8,trans:'preto',fundo:NOITE,chao:null});
 a.itens.push(fig('lucia',420,1.3,ini(c),{anim:'fade',y:980,estados:[{t:0,pose:'sentado',expr:'cansado',inclinar:-14}]}));
 a.itens.push(fig('carlos',1100,1.4,ini(c),{anim:'none',y:1000,estados:[{t:0,pose:'celular',expr:'triste',mao:'celular'},{t:T(c,4),pose:'triste',mao:''}]}));
 a.itens.push({tipo:'svg',t0:T(c,1),anim:'fade',svg:`<ellipse cx="1150" cy="420" rx="200" ry="160" fill="#7EC8F0" opacity=".15"/>`});
 a.itens.push({tipo:'painel',estilo:'celular',titulo:'Excluir perfil?',x:1550,y:200,s:.8,w:520,h:360,t0:T(c,2),t1:T(c,4),anim:'subir',linhas:['','Esta ação não pode','ser desfeita.','',{t:'CANCELAR      EXCLUIR',c:RED,b:1}]});
 a.itens.push(fig('pai',1700,1.2,T(c,3),{t1:T(c,4),anim:'fade',espelhar:true,mov:[{t:T(c,3),x:1700},{t:T(c,3,.1),x:2200,dur:2}],andar:[T(c,3),T(c,3,2.1)]}));
 a.itens.push(fig('bia',1500,1.4,T(c,4),{anim:'esq',y:1000,estados:[{t:T(c,4),pose:'celular',expr:'triste'}]}));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,2),s:1.4,x:1300,y:500,dur:2},{t:T(c,5),s:1.6,x:1300,y:560,dur:2.5}];
 a.sfx.push(S(T(c,2),'toc',.3),S(T(c,4),'whoosh',.3));
 cenas.push(a);}

// 8 — O ELO MAIS FRACO
{const c=8,a=C(c,{trilha:'leve_lenta',vol:.8,trans:'whoosh'});
 a.itens.push(prop('ferragem',1250,910,1,ini(c),{anim:'none',t1:T(c,2)}),prop('balcao',1050,910,1,ini(c),{anim:'none',t1:T(c,2)}),fig('jairo',1050,1,ini(c),{y:870,anim:'none',t1:T(c,2),estados:[{t:0,pose:'bracos_cruzados',expr:'pensativo'}]}));
 a.itens.push(fig('carlos',420,1.3,ini(c),{anim:'none',t1:T(c,2),mov:[{t:ini(c),x:200},{t:ini(c)+.1,x:520,dur:1.6}],andar:[ini(c),ini(c)+1.7],estados:[{t:0,pose:'em_pe',expr:'envergonhado'}]}));
 const d=T(c,2);a.sfx.push(S(d,'papel',.5));
 const tx=t=>[null,t>=T(c,5)?'~30/h':null,t>=T(c,8)?'15/h':null,null];
 a.itens.push({tipo:'svg',t0:d,anim:'fade',svg:`<rect x="60" y="300" width="1800" height="360" rx="10" fill="#E8D3AE" stroke="#1A1A1A" stroke-width="6"/>`});
 a.itens.push({tipo:'prop',nome:'diagrama',x:960,y:480,s:1,t0:d,anim:'pop',args:t=>({n:Math.min(4,1+Math.floor((t-d)/.4)),taxas:tx(t),fraco:t>=T(c,9)?2:-1,partido:t>=T(c,11)})});
 a.itens.push(bal('Quantas marmitas o seu\nfogão faz por hora?',480,280,T(c,4),T(c,5)),bal('Sei lá... umas trinta.',960,280,T(c,5),T(c,6)),bal('E quantas a sua mãe monta?\nDo jeito dela, com capricho?',480,280,T(c,6),T(c,7)));
 a.itens.push(txt('15 × 4 HORAS = 60',960,820,90,T(c,8,1.5),{t1:T(c,9)}));a.sfx.push(S(T(c,8,1.5),'slam',.6));
 a.sfx.push(S(T(c,9),'erro',.4),S(T(c,11),'corrente',.8));a.shake=[{t:T(c,11),amp:16}];
 a.itens.push(txt('O PROBLEMA ERA A MESA',960,820,96,T(c,11),{cor:RED}));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,9),s:1.9,x:1050,y:500,dur:2.5},{t:T(c,11),s:1,x:960,y:540,dur:.3}];
 a.itens.push(bal('Corrente arrebenta no elo mais fraco.\nEu te falei.',960,260,T(c,12),fim(c)));
 cenas.push(a);}

// 9 — O SIM QUE ERA MEDO
{const c=9,a=C(c,{trilha:[{t:ini(c),f:'pad'},{t:T(c,5),f:'leve_lenta'}],trans:'preto'});
 a.itens.push(fig('carlos',600,1.4,ini(c),{anim:'none',estados:[{t:0,pose:'pensando',expr:'pensativo'},{t:T(c,2),pose:'triste',expr:'triste'},{t:T(c,5),pose:'em_pe',expr:'determinado'}]}));
 const s3=T(c,3),d3=dur(c,3);
 [['Paga na sexta.',0],['A gente dá um jeito.',.33],['Chega até 12h30.',.66]].forEach(([s,f],k)=>a.itens.push(bal(s,1250+k*60,330+k*180,s3+d3*f,T(c,4,.8))));
 a.itens.push(prop('corrente',1300,560,.9,T(c,4,.8),{t1:T(c,5),args:{n:5,fraco:2,partido:true}}));a.sfx.push(S(T(c,4,.8),'corrente',.7));
 a.itens.push(txt('CRESCER ALÉM DO QUE VOCÊ AGUENTA',1150,330,60,T(c,5)),txt('= PROMESSA QUEBRADA EM ESCALA',1150,450,66,T(c,6),{cor:RED}));
 a.sfx.push(S(T(c,5),'slam',.5),S(T(c,6),'impact',.7));
 cenas.push(a);}

// 10 — A LINHA DE MONTAGEM
{const c=10,a=C(c,{trilha:'leve',trans:'whoosh'});
 const t0=ini(c),l=T(c,1),lf=T(c,4);
 [[480,'rosa','mexendo','ARROZ + FEIJÃO'],[960,'lucia','mexendo','CARNE + TEMPERO'],[1440,'bia','segurando','FECHA + ETIQUETA']].forEach(([x,q,p,r],k)=>{
   a.itens.push(fig(q,x,1.25,l+k*.3,{t1:lf,estados:[{t:0,pose:p,expr:'feliz'}]}),txt(r,x,300,40,l+k*.3,{t1:lf,anim:'pop',cor:TEAL}));});
 a.itens.push({tipo:'svg',t0:l+1,t1:lf,anim:'none',svg:t=>[0,1,2,3].map(k=>{const u=((t*.35+k/4)%1);return `<g transform="translate(${300+u*1450},880) scale(.5)">${require('../../biblioteca/objetos').marmita(0,0,1,0,0)}</g>`}).join('')});
 a.itens.push(fig('carlos',200,1.2,t0,{t1:l,anim:'none',estados:[{t:0,pose:'apontando',expr:'determinado'}]}));
 a.itens.push(txt('MONTAGEM: 15/h → 40/h',960,170,80,T(c,3),{t1:lf,cor:GREEN}));a.sfx.push(S(T(c,3),'slam',.6),S(t0,'whoosh',.4));
 for(let k=0;k<10;k++)a.sfx.push(S(l+1+k*.7,'tick',.3));
 const e=T(c,4);a.itens.push({tipo:'prop',nome:'diagrama',x:960,y:400,s:1,t0:e,t1:T(c,7),anim:'pop',args:t=>({taxas:[null,'~30/h','40/h',t>=T(c,6)?'80/dia':null],fraco:t>=T(c,5)?3:-1})});
 a.itens.push(txt('NOVO ELO MAIS FRACO: ENTREGA',960,180,64,T(c,5),{t1:T(c,7),cor:RED}),prop('moto',700,910,.7,T(c,6),{t1:T(c,7)}),prop('portao',1250,910,.7,T(c,6),{t1:T(c,7)}));
 a.sfx.push(S(T(c,5),'corrente',.5));
 const r=T(c,7);a.itens.push({tipo:'painel',estilo:'quadro',titulo:'AGORA É ASSIM',x:960,y:110,s:1,w:1200,t0:r,t1:T(c,9),anim:'pop',linhas:['Prato único do dia',{t:'80 vagas · abre às 18h',b:1},'Acabou, acabou',{t:'O resto → lista de espera',c:TEAL,b:1},'Rosa R$ 100 · Bia R$ 60 · moto R$ 80 por dia'],linhasT:[r+.3,r+1.3,r+2.6,T(c,8),T(c,8,1.5)]});
 [r+.3,r+1.3,r+2.6,T(c,8),T(c,8,1.5)].forEach(t=>a.sfx.push(S(t,'tick',.45)));
 const v=T(c,9);a.itens.push(fig('carlos',700,1.4,v,{anim:'fade',estados:[{t:v,pose:'em_pe',expr:'triste'},{t:T(c,10),expr:'falando'}]}));
 a.itens.push({tipo:'painel',estilo:'celular',titulo:'● GRAVANDO',x:1350,y:150,s:.85,w:560,h:460,t0:v,anim:'subir',linhas:['','"A gente errou.','Todo mundo já foi','reembolsado.','Agora é assim:"'],linhasT:[T(c,10),T(c,10),T(c,10,.8),T(c,10,1.5),T(c,10,2.2)]});
 cenas.push(a);}

// 11 — DOIS MIL E QUINHENTOS
{const c=11,a=C(c,{trilha:'tensa',trans:'preto',silencios:[{t0:T(c,7),t1:T(c,12)}]});
 a.itens.push({tipo:'prop',nome:'relogio',x:400,y:180,s:.7,t0:ini(c),t1:T(c,2),anim:'pop',args:{txt:'18:00'}});
 a.itens.push({tipo:'contador',de:80,ate:0,suf:' VAGAS',x:1100,y:420,sz:150,cor:'#1A1A1A',t0:T(c,0),t1:T(c,2),dur:F(c,1)-T(c,0),anim:'pop'});
 a.itens.push(txt('ESGOTOU EM 12 MIN',1100,580,70,T(c,1),{t1:T(c,2),cor:GREEN}),txt('LISTA DE ESPERA: 140',1100,700,64,T(c,1,1.5),{t1:T(c,2),cor:TEAL,anim:'pop'}));
 for(let k=0;k<12;k++)a.sfx.push(S(T(c,0)+k*.25,'tick',.35));a.sfx.push(S(T(c,1),'slam',.6),S(T(c,2),'telefone',.6),S(T(c,2,1.4),'telefone',.6));
 const ch=T(c,2);
 a.itens.push({tipo:'svg',t0:ch,anim:'fade',t1:T(c,13),svg:`<line x1="960" y1="60" x2="960" y2="910" stroke="#1A1A1A" stroke-width="6" stroke-dasharray="20 14"/>`});
 a.itens.push(fig('carlos',480,1.35,ch,{anim:'esq',estados:[{t:ch,pose:'celular',expr:'surpreso',mao:'celular'},{t:T(c,5),expr:'feliz'},{t:T(c,7),expr:'pensativo'},{t:T(c,8),expr:'determinado'}]}));
 a.itens.push(fig('henrique',1440,1.35,T(c,3),{anim:'dir',t1:T(c,12),espelhar:true,estados:[{t:0,pose:'celular',expr:'neutro',mao:'celular'},{t:T(c,10),expr:'bravo'}]}));
 a.itens.push(bal('Vi o seu vídeo. Evento amanhã.\n100 marmitas. Pago R$ 25 cada.',1440,380,T(c,4),T(c,5)));
 a.itens.push(txt('R$ 2.500',960,300,220,T(c,5),{t1:T(c,7),cor:GOLD,contorno:'#1A1A1A'}),txt('= 4 × o prejuízo de quarta',960,440,56,T(c,6),{t1:T(c,7),anim:'pop'}));a.sfx.push(S(T(c,5),'caixa',.7));
 a.fixos=[{tipo:'painel',estilo:'pao',titulo:'PAPEL DE PÃO',x:960,y:260,s:1,w:900,h:300,t0:T(c,7),t1:T(c,8),anim:'pop',linhas:[{t:'ENTREGA: 80 POR DIA',c:RED,b:1},'(a corrente aguenta 80)']}];a.sfx.push(S(T(c,7),'whoosh',.5));
 a.itens.push(bal('Amanhã eu não consigo.\nSe eu disser sim, te entrego comida fria.',560,380,T(c,8),T(c,9)),bal('Terça eu consigo. Metade adiantada.\nE eu entrego quente.',560,380,T(c,9),T(c,10)));
 a.itens.push(bal('Então eu procuro outro.',1440,380,T(c,10),T(c,11)),bal('Pode procurar.',480,380,T(c,11),T(c,12)));
 a.sfx.push(S(T(c,12),'bip',.6));
 const b=T(c,13);a.itens.push(fig('bia',1440,1.35,b,{anim:'dir',estados:[{t:b,pose:'celular',expr:'surpreso'}]}));
 a.itens.push(bal('Você acabou de recusar\ndois mil e quinhentos reais.',1300,380,T(c,14),T(c,15)),bal('Não, Bia. Eu recusei prometer\no que eu não consigo cumprir.',520,380,T(c,15),fim(c)));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,13),s:1.25,x:960,y:560,dur:1},{t:T(c,16),s:1.6,x:560,y:560,dur:1.2}];
 cenas.push(a);}

// 12 — QUENTE
{const c=12,a=C(c,{trilha:'leve_lenta',trans:'whoosh'});
 a.itens.push({tipo:'prop',nome:'relogio',x:400,y:180,s:.7,t0:ini(c),t1:T(c,2),anim:'pop',args:{txt:'12:20'}});
 a.itens.push(prop('marmita',960,700,2.2,ini(c),{t1:T(c,2),args:t=>({vapor:t*2})}),prop('salada',960,560,1.3,T(c,1,.5),{t1:T(c,2)}),txt('80/80 ENTREGUES ✓',1300,300,80,T(c,1),{t1:T(c,2),cor:GREEN}));
 a.sfx.push(S(T(c,1),'ding',.6));
 a.itens.push({tipo:'painel',estilo:'celular',titulo:'Comentários',x:1350,y:170,s:.85,w:620,h:480,t0:T(c,2),t1:T(c,4),anim:'subir',linhas:['','"chegou quente!"','"voltei a confiar"','"salada voltou :)"'],linhasT:[T(c,2),T(c,2,.8),T(c,2,1.6),T(c,2,2.4)]});
 a.itens.push(fig('marcao',560,1.4,T(c,3),{t1:T(c,4),estados:[{t:T(c,3),pose:'acenando',expr:'rindo'}]}));
 const lt=[T(c,4),T(c,4,1.8),T(c,4,3.6),T(c,5)];
 a.itens.push({tipo:'painel',estilo:'cortica',titulo:'SEXTA · 80 PEDIDOS',x:960,y:90,s:1,w:1200,t0:T(c,4),t1:T(c,6),anim:'pop',linhas:['80 × R$ 19 = R$ 1.520','− comida e embalagem: R$ 632','− Rosa, Bia e moto: R$ 240',{t:'= R$ 648 no dia',c:GREEN,b:1}],linhasT:lt});
 lt.forEach(t=>a.sfx.push(S(t,'tick',.45)));a.sfx.push(S(T(c,5),'caixa',.5));
 a.itens.push(txt('QUARTA · 300 pedidos → −R$ 600',960,350,64,T(c,6),{t1:T(c,7),cor:RED}),txt('SEXTA · 80 pedidos → +R$ 648',960,500,72,T(c,6,1.6),{t1:T(c,7),cor:GREEN}));
 a.sfx.push(S(T(c,6),'slam',.5),S(T(c,6,1.6),'slam',.6));
 const z=T(c,7);a.itens.push(fig('lucia',800,1.35,z,{y:980,anim:'fade',estados:[{t:z,pose:'sentado',expr:'cansado',inclinar:-12}]}),txt('Zzz',960,420,80,z+.5,{anim:'pop',cor:TEAL}),{tipo:'prop',nome:'relogio',x:1450,y:300,s:.7,t0:z,anim:'pop',args:{txt:'04:00'}},{tipo:'svg',t0:z+.8,anim:'pop',svg:`<g transform="translate(1450,300)"><line x1="-170" y1="-90" x2="170" y2="90" stroke="${GREEN}" stroke-width="16"/><line x1="170" y1="-90" x2="-170" y2="90" stroke="${GREEN}" stroke-width="16"/></g>`});
 cenas.push(a);}

// 13 — A LIÇÃO
{const c=13,a=C(c,{trilha:[{t:ini(c),f:'leve_lenta'},{t:T(c,4),f:null}],trans:'whoosh'});
 a.itens.push(fig('carlos',260,1.3,ini(c),{anim:'none',estados:[{t:0,pose:'apontando',expr:'determinado'}]}));
 const r=[T(c,1),T(c,2),T(c,2,2),T(c,3)];
 a.itens.push({tipo:'painel',estilo:'pao',titulo:'O QUE O SEU JAIRO FARIA',x:1080,y:110,s:1,w:1360,t0:ini(c),t1:T(c,4),anim:'pop',linhas:['1. Desenhe as etapas até o cliente','2. Quanto a etapa mais lenta faz por hora?',{t:'   → essa é a sua capacidade de verdade',c:TEAL,b:1},'3. Venda até esse limite. O resto: lista de espera'],linhasT:r});
 r.forEach(t=>a.sfx.push(S(t,'tick',.5)));
 a.itens.push(txt('LISTA DE ESPERA = CLIENTE ESPERANDO',960,360,66,T(c,4)),txt('PROMESSA QUEBRADA = CLIENTE INDO EMBORA',960,500,66,T(c,5),{cor:RED}));
 a.sfx.push(S(T(c,4),'slam',.6),S(T(c,5),'impact',.7));a.shake=[{t:T(c,5),amp:12}];
 cenas.push(a);}

// 14 — A NOTA FISCAL
{const c=14,a=C(c,{trilha:[{t:ini(c),f:'leve_lenta'},{t:T(c,5),f:'tensa'}],trans:'preto'});
 a.sfx.push(S(ini(c)+.1,'telefone',.6));
 a.itens.push({tipo:'svg',t0:ini(c),t1:T(c,6),anim:'fade',svg:`<line x1="960" y1="60" x2="960" y2="910" stroke="#1A1A1A" stroke-width="6" stroke-dasharray="20 14"/>`});
 a.itens.push(fig('carlos',480,1.35,ini(c),{t1:T(c,6),anim:'none',estados:[{t:0,pose:'celular',expr:'surpreso',mao:'celular'},{t:T(c,4),pose:'comemorando',expr:'rindo',pular:1},{t:T(c,5),pose:'celular',pular:0,expr:'surpreso',mao:'celular'}]}));
 a.itens.push(fig('henrique',1440,1.35,T(c,1),{t1:T(c,6),anim:'dir',espelhar:true,estados:[{t:0,pose:'celular',expr:'feliz',mao:'celular'}]}));
 a.itens.push(bal('Eu procurei outro. Ninguém me disse\n"não" do jeito que você disse.',1440,380,T(c,2),T(c,3)));
 a.itens.push(txt('400 MARMITAS / SEMANA',960,200,84,T(c,3),{t1:T(c,5),cor:GOLD,contorno:'#1A1A1A'}),txt('CONTRATO DE 6 MESES',960,310,56,T(c,3,1.2),{t1:T(c,5),anim:'pop'}));a.sfx.push(S(T(c,3),'caixa',.6));
 a.itens.push(bal('Só preciso de uma coisa:\nnota fiscal.',1440,380,T(c,5),T(c,6)),txt('NOTA FISCAL?',960,200,130,F(c,5,.2),{t1:T(c,6),cor:RED}));a.sfx.push(S(F(c,5,.2),'impact',.9));a.shake=[{t:F(c,5,.2),amp:18}];
 const k=T(c,6);
 a.itens.push(prop('fogao',600,910,1,k,{anim:'fade'}),prop('panela',600,680,.8,k,{anim:'fade'}),fig('lucia',1000,1.35,k,{anim:'fade',estados:[{t:0,pose:'mexendo',expr:'feliz'}]}),fig('carlos',1450,1.35,k,{anim:'none',estados:[{t:0,pose:'em_pe',expr:'pensativo'}]}));
 a.itens.push(txt('FOGÃO DE CASA',600,330,44,T(c,7),{anim:'pop'}),txt('PANELA EMPRESTADA',600,400,40,T(c,7,1),{anim:'pop'}));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:k,s:1.5,x:1300,y:560,dur:.01},{t:T(c,7),s:1,x:960,y:540,dur:3}];
 a.itens.push(txt('Ele não tinha empresa.',960,180,70,T(c,8),{anim:'fade'}),txt('Tinha uma família.',960,280,80,T(c,9),{anim:'fade',cor:TEAL}));
 a.itens.push(txt('TERÇA · EP. 3',1650,90,48,F(c,9,.5),{cor:TEAL,anim:'fade'}));
 cenas.push(a);}

return cenas;};
