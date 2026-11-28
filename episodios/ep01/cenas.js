// EP01 — planilha visual. T(c,i,dt) = início do trecho i da cena c (+dt s); F = fim do trecho.
module.exports=({T,F,ini,fim})=>{
const C=(c,o)=>({t0:ini(c),t1:fim(c),itens:[],sfx:[],...o});
const fig=(quem,x,s,t0,o={})=>({tipo:'fig',quem,x,y:o.y??910,s,t0,anim:'pop',...o});
const prop=(nome,x,y,s,t0,o={})=>({tipo:'prop',nome,x,y,s,t0,anim:'pop',...o});
const txt=(t,x,y,sz,t0,o={})=>({tipo:'txt',txt:t,x,y,sz,t0,anim:'slam',...o});
const bal=(t,x,y,t0,t1,o={})=>({tipo:'balao',txt:t,x,y,t0,t1,anim:'pop',s:1,...o});
const S=(t,n,v=.6)=>({t,n,v});
const RED='#E4572E',GREEN='#3FA34D',TEAL='#1E88A8';
const cenas=[];

// 1 — QUEM É O CARLOS
{const c=1,a=C(c,{trilha:[{t:ini(c),f:'leve'},{t:T(c,4),f:'tensa'}],chao:910});
 const d=i=>F(c,i)-T(c,i);
 a.itens.push(fig('carlos',700,1.45,ini(c),{anim:'none',mov:[{t:ini(c),x:-200},{t:ini(c)+.05,x:700,dur:1.6}],andar:[ini(c),ini(c)+1.65],
   estados:[{t:ini(c)+1.7,pose:'acenando',expr:'feliz'},{t:T(c,1),pose:'em_pe',expr:'surpreso'},{t:T(c,1,d(1)*.6),expr:'determinado'},{t:T(c,2),pose:'apontando',expr:'feliz'},{t:T(c,3),pose:'comemorando',expr:'rindo'},{t:T(c,4),pose:'desespero',expr:'desesperado'},{t:T(c,5),pose:'pensando',expr:'pensativo'},{t:T(c,6),pose:'triste',expr:'triste'}]}));
 a.itens.push(txt('CARLOS, 26 ANOS',700,230,64,T(c,0,.8),{t1:T(c,1),anim:'pop',cor:TEAL}));a.sfx.push(S(T(c,0,.8),'pop',.5));
 a.itens.push({tipo:'svg',t0:T(c,1),t1:T(c,2),anim:'pop',x:1300,y:480,svg:`<rect x="-120" y="-150" width="240" height="300" rx="18" fill="#fff" stroke="#1A1A1A" stroke-width="8"/><circle cx="0" cy="-50" r="45" fill="#ddd" stroke="#1A1A1A" stroke-width="6"/><text y="80" font-family="DejaVu Sans" font-weight="800" font-size="40" text-anchor="middle">CRACHÁ</text><line x1="-150" y1="-180" x2="150" y2="180" stroke="${RED}" stroke-width="22"/><line x1="150" y1="-180" x2="-150" y2="180" stroke="${RED}" stroke-width="22"/>`});
 a.itens.push(txt('DEMITIDO',1300,230,90,T(c,1,.6),{t1:T(c,2),cor:RED}));a.sfx.push(S(T(c,1,.6),'carimbo',.7));
 a.itens.push(prop('isopor',1180,910,1,T(c,2),{t1:T(c,4)}),fig('lucia',1550,1.3,T(c,2,.4),{t1:T(c,4),estados:[{t:0,pose:'mexendo',expr:'feliz'}]}),txt('AS MARMITAS DA MÃE',1350,230,64,T(c,2,.2),{t1:T(c,3),anim:'pop'}));
 a.sfx.push(S(T(c,2),'pop',.5),S(T(c,2,.4),'pop',.5));
 a.itens.push({tipo:'contador',de:0,ate:200,suf:' MARMITAS',x:1300,y:230,sz:100,cor:GREEN,t0:T(c,3),t1:T(c,4),dur:d(3),anim:'pop'});
 for(let k=0;k<8;k++)a.sfx.push(S(T(c,3)+k*d(3)/8,'tick',.35));
 a.fundos=[{t:ini(c),cor:'#FAF7F0'},{t:T(c,4),cor:'#F6D9D2'},{t:T(c,5),cor:'#FAF7F0'}];
 a.itens.push(txt('SOBROU: R$ 0',1300,300,120,T(c,4,.6),{t1:T(c,5),cor:RED}));a.sfx.push(S(T(c,4,.6),'impact',.9));a.shake=[{t:T(c,4,.6),amp:20}];
 a.itens.push(txt('PRA ONDE FOI O DINHEIRO?',960,190,84,T(c,5)));a.sfx.push(S(T(c,5),'slam',.6));
 a.itens.push(fig('lucia',1250,1.2,T(c,6),{anim:'fade',estados:[{t:0,pose:'triste',expr:'cansado'}]}),fig('bia',1500,1.2,T(c,6),{anim:'fade',estados:[{t:0,pose:'triste',expr:'triste'}]}));
 cenas.push(a);}

// 2 — A DEMISSÃO
{const c=2,a=C(c,{trilha:'pad',trans:'preto'});
 a.itens.push(txt('SEGUNDA-FEIRA',960,150,70,T(c,0),{t1:T(c,1),anim:'pop',cor:TEAL}));
 a.itens.push(prop('predio',1500,910,1,ini(c),{anim:'fade'}));
 a.itens.push(fig('carlos',700,1.4,ini(c),{anim:'fade',mov:[{t:T(c,2),x:700},{t:T(c,2,.1),x:950,dur:1.2}],andar:[T(c,2),T(c,2,1.3)],
   estados:[{t:0,pose:'em_pe',expr:'feliz'},{t:T(c,2,1.4),expr:'surpreso'},{t:T(c,3),expr:'triste'},{t:T(c,4),pose:'segurando',expr:'triste',mao:'caixa'},{t:T(c,5),pose:'em_pe',expr:'determinado',mao:''}]}));
 a.itens.push(txt('CALL CENTER · 4 ANOS',960,150,62,T(c,1),{t1:T(c,1,2),anim:'pop'}),txt('UM DOS MELHORES VENDEDORES',960,150,56,T(c,1,2),{t1:T(c,2),anim:'pop',cor:TEAL}));
 a.itens.push(prop('catraca',1150,910,1.2,T(c,2),{args:{negado:true}}),txt('ACESSO NEGADO',900,280,70,T(c,2,1.4),{t1:T(c,3),cor:RED}));a.sfx.push(S(T(c,2,1.4),'erro',.6));
 a.itens.push(txt('CORTE DE CUSTOS',960,200,84,T(c,3),{t1:T(c,4),cor:RED,rot:-4}));a.sfx.push(S(T(c,3),'carimbo',.8));a.shake=[{t:T(c,3),amp:12}];
 a.itens.push({tipo:'contador',de:0,ate:3100,fmt:'brl',pre:'ACERTO: ',x:960,y:200,sz:90,cor:GREEN,t0:T(c,4),t1:T(c,5),dur:1.5,anim:'pop'});
 a.fixos=[txt('VOU ABRIR MEU PRÓPRIO NEGÓCIO',960,170,72,T(c,5,1))];a.sfx.push(S(T(c,5,1),'slam',.6));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,5,.9),s:1.4,x:900,y:540,dur:.3}];
 cenas.push(a);}

// 3 — A FAMÍLIA E O MEDO
{const c=3,a=C(c,{trilha:[{t:ini(c),f:'leve_lenta'},{t:T(c,3),f:'pad'}],trans:'whoosh'});
 const d0=F(c,0)-T(c,0),fb=T(c,4),volta=T(c,6);
 a.itens.push(prop('fogao',220,910,1,ini(c),{anim:'none',t1:fb}),prop('panela',220,680,.8,ini(c),{anim:'none',t1:fb}));
 a.itens.push(fig('lucia',600,1.3,ini(c),{anim:'none',t1:fb,estados:[{t:0,pose:'mexendo',expr:'feliz'}]}),txt('DONA LÚCIA · MÃE',600,330,46,T(c,0,.3),{t1:T(c,1),anim:'pop',cor:TEAL}));
 a.itens.push(fig('bia',1350,1.3,T(c,0,d0*.6),{t1:fb,estados:[{t:0,pose:'celular',expr:'neutro'},{t:T(c,2),expr:'rindo'}]}),txt('BIA · IRMÃ, 17',1350,330,46,T(c,0,d0*.6),{t1:T(c,1),anim:'pop',cor:TEAL}));
 a.itens.push(fig('carlos',980,1.35,ini(c),{anim:'none',t1:fb,estados:[{t:0,pose:'em_pe',expr:'feliz'},{t:T(c,1),expr:'envergonhado'},{t:T(c,3),pose:'triste',expr:'triste'}]}));
 a.itens.push(bal('Bem-vindo ao clube\ndos desempregados.',1350,430,T(c,2),F(c,2,.4)));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,3),s:1.6,x:980,y:560,dur:1.5},{t:fb,s:1,x:4000,y:540,dur:.01},{t:volta,s:1,x:960,y:540,dur:.01}];
 a.filtros=[{t0:fb,t1:volta,tipo:'sepia'}];
 a.itens.push(txt('12 ANOS ANTES',4000,140,72,fb,{t1:volta,anim:'pop',cor:'#1A1A1A'}));
 a.itens.push(prop('portaAco',3700,910,1.3,fb,{t1:volta,anim:'none',args:t=>({fechado:t<T(c,5)?0.15:Math.min(1,.15+(t-T(c,5))/1.2)})}),prop('placa',3700,420,.75,fb,{t1:volta,anim:'none'}));
 [0,1,2].forEach(k=>a.itens.push(fig('operario',4250+k*150,1.1,fb+.3,{t1:T(c,5),espelhar:true,estados:[{t:0,expr:'feliz'}]})));
 a.itens.push(fig('pai',4150,1.3,fb,{t1:volta,anim:'none',espelhar:true,mov:[{t:T(c,5,1.4),x:4150},{t:T(c,5,1.5),x:4900,dur:2.2}],andar:[T(c,5,1.4),T(c,5,3.7)]}));
 a.sfx.push(S(T(c,5),'porta',.7));
 a.itens.push(prop('guardaRoupa',1500,910,1,volta,{anim:'none'}),prop('placa',1500,385,.5,volta,{anim:'none'}),fig('carlos',900,1.4,volta,{anim:'none',estados:[{t:0,pose:'pensando',expr:'determinado'}]}));
 cenas.push(a);}

// 4 — A IDEIA
{const c=4,a=C(c,{trilha:'leve',trans:'preto'});
 const m=T(c,2),pl=T(c,3),g=T(c,4);
 a.itens.push(prop('mesa',960,760,1.1,ini(c),{anim:'none',t1:m}),prop('panela',820,744,.6,ini(c),{anim:'none',t1:m}));
 a.itens.push(fig('lucia',640,1.4,ini(c),{anim:'none',t1:m,estados:[{t:0,pose:'mexendo',expr:'feliz'}]}));
 a.itens.push(fig('carlos',1260,1.4,ini(c),{anim:'none',t1:m,estados:[{t:0,pose:'segurando',expr:'neutro'},{t:T(c,0,1.2),expr:'surpreso'},{t:T(c,1),pose:'apontando',expr:'feliz'}]}));
 a.itens.push(prop('lampada',1260,330,1,T(c,0,1.3),{t1:T(c,1)}));a.sfx.push(S(T(c,0,1.3),'ding',.6));
 a.itens.push(bal('Mãe... a fábrica tem 300 funcionários.\nE o refeitório tá em reforma.',1150,420,T(c,1),m));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:m,s:1,x:4000,y:540,dur:.35},{t:pl,s:1,x:960,y:540,dur:.01}];a.sfx.push(S(m,'whoosh',.6));
 a.itens.push(prop('casa',3300,910,.9,m,{t1:pl}),prop('fabrica',4650,910,.7,m+.3,{t1:pl}));
 a.itens.push({tipo:'svg',t0:m+.4,t1:pl,anim:'none',svg:t=>{const k=Math.min(1,(t-m-.4)/1.2);return `<line x1="3480" y1="860" x2="${3480+k*820}" y2="860" stroke="#1A1A1A" stroke-width="8" stroke-dasharray="20 18"/>`}});
 a.itens.push(txt('400 m',3900,800,70,m+1.6,{t1:pl,cor:TEAL}),txt('REFEITÓRIO EM REFORMA',4650,430,40,m+.6,{t1:pl,anim:'pop',cor:RED}));
 // o plano em 3 passos, na ordem
 a.itens.push(fig('lucia',420,1.2,pl,{t1:g,estados:[{t:0,pose:'mexendo',expr:'feliz'}]}),txt('MÃE COZINHA',420,300,48,pl,{t1:g,anim:'pop'}));
 a.itens.push(txt('→',760,600,120,pl+.8,{t1:g,anim:'pop'}),fig('carlos',1000,1.2,pl+.8,{t1:g,estados:[{t:0,pose:'acenando',expr:'feliz'}]}),txt('CARLOS VENDE',1000,300,48,pl+.8,{t1:g,anim:'pop'}));
 a.itens.push(txt('→',1300,600,120,pl+1.6,{t1:g,anim:'pop'}),prop('fabrica',1640,910,.45,pl+1.6,{t1:g}),txt('NA FÁBRICA',1640,300,48,pl+1.6,{t1:g,anim:'pop'}));
 [pl,pl+.8,pl+1.6].forEach(t=>a.sfx.push(S(t,'pop',.5)));
 a.itens.push(prop('isopor',600,910,1.1,g),prop('cartaz',1350,910,1,g+.5,{args:{t:'MARMITA R$ ?'}}),fig('carlos',960,1.4,g,{estados:[{t:0,pose:'comemorando',expr:'rindo'}]}));
 a.sfx.push(S(g,'pop',.5),S(g+.5,'pop',.5));
 cenas.push(a);}

// 5 — O PREÇO NO CHUTE
{const c=5,a=C(c,{trilha:'leve',trans:'whoosh'});
 a.itens.push(fig('carlos',420,1.4,ini(c),{anim:'none',estados:[{t:ini(c),pose:'pensando',expr:'pensativo'},{t:T(c,3),pose:'apontando',expr:'feliz'},{t:T(c,5),pose:'comemorando',expr:'rindo'},{t:T(c,6),pose:'em_pe',expr:'neutro'}]}));
 a.itens.push(prop('lanchonete',1350,910,.95,T(c,1)),fig('bigode',1720,1.15,T(c,2),{estados:[{t:T(c,2),pose:'bracos_cruzados',expr:'feliz'}]}));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,2),s:1.35,x:1300,y:560,dur:.8},{t:T(c,3),s:1,x:960,y:540,dur:.5}];
 a.itens.push(prop('cartaz',720,910,.9,T(c,3,.8),{args:{t:'MARMITA R$ 12'}}));a.itens.push(bal('Se eu cobrar 12,\neu ganho no preço.',460,440,T(c,3),F(c,3,.6)));a.sfx.push(S(T(c,3,.8),'pop',.5));
 const p0=T(c,4);a.cam.push({t:p0,s:1,x:960,y:-1460,dur:.35});a.sfx.push(S(p0,'whoosh',.5));
 a.itens.push({tipo:'painel',estilo:'papel',titulo:'CADERNO DO CARLOS',x:960,y:-1980,s:1.25,t0:p0,anim:'none',w:900,linhas:['Arroz, feijão, carne, salada','≈ R$ 6 por marmita',{t:'R$ 12 − R$ 6 = R$ 6 ✓',c:GREEN,b:1},{t:'× 200 = R$ 1.200 "limpos" ✓',c:GREEN,b:1}],linhasT:[p0+.6,F(c,4,-.6),T(c,5),T(c,5,2.2)]});
 [p0+.6,F(c,4,-.6),T(c,5),T(c,5,2.2)].forEach(t=>a.sfx.push(S(t,'caneta',.5)));
 a.itens.push(txt('?',1400,-1300,200,T(c,7),{cor:RED}));a.sfx.push(S(T(c,7),'erro',.4));a.shake=[{t:T(c,7),amp:8}];
 cenas.push(a);}

// 6 — O SUCESSO
{const c=6,a=C(c,{trilha:'leve',trans:'whoosh'});
 const noite=T(c,5);
 a.itens.push(prop('fabrica',1550,910,.75,ini(c),{anim:'none',t1:noite}),prop('isopor',620,910,1,ini(c),{anim:'none',t1:noite}));
 a.itens.push(fig('carlos',430,1.35,ini(c),{anim:'none',t1:noite,estados:[{t:ini(c),pose:'acenando',expr:'rindo'},{t:T(c,2),pose:'em_pe',expr:'falando'},{t:T(c,4),pose:'apontando',expr:'feliz'}]}));
 [0,1,2,3].forEach(k=>a.itens.push(fig('operario',1000+k*190,1.15,T(c,0,k*.25),{espelhar:true,t1:noite,estados:[{t:0,expr:k%2?'feliz':'neutro'}]})));
 a.itens.push(txt('DIA 1 · 20 MARMITAS · 15 MIN',960,170,64,T(c,0),{t1:T(c,1)}),txt('DIA 2 · 25',960,170,72,T(c,1),{t1:T(c,1,1.6)}),txt('DIA 3 · ENCOMENDAS',960,170,72,T(c,1,1.6),{t1:T(c,3)}));
 a.sfx.push(S(T(c,0),'slam',.5),S(T(c,1),'pop',.5),S(T(c,1,1.6),'pop',.5));
 a.itens.push(fig('marcao',820,1.2,T(c,3),{espelhar:true,t1:noite,estados:[{t:0,expr:'envergonhado'}]}));
 a.itens.push(bal('Esqueci a carteira...',860,440,T(c,3,1),T(c,4)),bal('Paga na sexta, campeão.',470,420,T(c,4),noite));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,3),s:1.3,x:650,y:600,dur:.4}];
 a.fundos=[{t:noite,cor:'#22293D'}];a.cam.push({t:noite,s:1,x:960,y:540,dur:.01});a.sfx.push(S(noite,'whoosh',.4));
 a.itens.push({tipo:'painel',estilo:'celular',x:1180,y:180,s:.8,t0:noite,w:520,h:600,anim:'subir',titulo:'@carlos.marmitas',linhas:['[foto: isopor vazio]','','Esgotou de novo!']});
 a.itens.push({tipo:'contador',de:0,ate:30,pre:'♥ ',x:1180,y:820,sz:90,cor:RED,t0:noite+.5,dur:F(c,5)-noite,anim:'pop'});
 a.itens.push(fig('carlos',560,1.4,noite,{anim:'fade',y:1000,estados:[{t:noite,pose:'celular',expr:'feliz',mao:'celular'},{t:T(c,6),expr:'rindo'}]}));
 a.chao=null;
 cenas.push(a);}

// 7 — OS VAZAMENTOS
{const c=7,a=C(c,{trilha:'pad',trans:'preto'});
 const furosT=[T(c,2),T(c,3),T(c,3,1.5),T(c,3,3),T(c,4)];
 a.itens.push(prop('cofrinho',960,800,1.5,ini(c),{t1:T(c,6),args:t=>({furos:furosT.filter(x=>t>=x).length})}));
 a.itens.push({tipo:'svg',t0:T(c,2),t1:T(c,6),anim:'none',svg:t=>furosT.filter(x=>t>=x).map((x,k)=>{const u=((t-x)%1.1)/1.1;return `<g transform="translate(${840+k*60},${760+u*160})" opacity="${1-u}"><circle r="22" fill="#F6D776" stroke="#1A1A1A" stroke-width="5"/></g>`}).join('')});
 a.itens.push(txt('O DINHEIRO ENTRAVA…',960,170,72,T(c,1),{t1:T(c,2),anim:'pop'}));
 a.itens.push(prop('botijao',300,910,1.1,T(c,2)),txt('ACABOU NO DIA 12',300,520,40,T(c,2,1),{cor:RED,anim:'pop'}));
 a.itens.push({tipo:'prop',nome:'conta',x:1620,y:420,s:.7,t0:T(c,3),anim:'cair',args:{titulo:'LUZ',valor:'↑',carimbo:false}});
 a.itens.push(prop('marmita',1620,860,.7,T(c,3,1.5)),prop('moto',300,300,.6,T(c,3,3)));
 a.itens.push({tipo:'painel',estilo:'papel',titulo:'FIADO',x:1450,y:470,s:.6,t0:T(c,4),w:520,anim:'pop',linhas:['Marcão ...... R$ 12','João ......... R$ 24','Zé ............ R$ 36','"semana que vem"','...'],linhasT:[T(c,4),T(c,4,.4),T(c,4,.8),T(c,4,1.4),T(c,5)]});
 furosT.forEach(t=>a.sfx.push(S(t,'moeda',.45)));
 const m=T(c,6);a.cam=[{t:ini(c),s:1,x:960,y:540},{t:m,s:1,x:4000,y:540,dur:.01}];a.fundos=[{t:m,cor:'#2A2F45'}];a.chao=null;
 a.itens.push({tipo:'prop',nome:'relogio',x:4000,y:260,s:1,t0:m,anim:'fade',args:t=>({txt:t<T(c,7)?'05:00':'04:30'})});
 a.itens.push(fig('lucia',4000,1.3,m+.4,{y:960,anim:'fade',estados:[{t:m,pose:'mexendo',expr:'cansado'}]}));
 a.itens.push({tipo:'svg',t0:m+.3,anim:'fade',svg:`<path d="M4000,380 L3640,980 L4360,980 Z" fill="#FFE7A8" opacity=".18"/>`});
 a.sfx.push(S(m,'interruptor',.6),S(T(c,7),'tick',.5));
 cenas.push(a);}

// 8 — O ERRO
{const c=8,a=C(c,{trilha:'pad',trans:'whoosh',silencios:[{t0:T(c,6),t1:fim(c)}]});
 a.itens.push(fig('carlos',430,1.4,ini(c),{anim:'none',t1:T(c,2),estados:[{t:ini(c),pose:'pensando',expr:'pensativo'},{t:T(c,1),pose:'apontando',expr:'determinado'}]}));
 a.itens.push({tipo:'painel',estilo:'quadro',titulo:'PROBLEMA:',x:1200,y:220,s:1,w:700,t0:T(c,1),t1:T(c,2),anim:'pop',linhas:[{t:'VENDO POUCO',c:'#E4572E',b:1}],linhasT:[T(c,1,.6)]});
 a.sfx.push(S(T(c,1,.6),'caneta',.6));
 const p=T(c,2);a.sfx.push(S(p,'whoosh',.5));
 a.itens.push(txt('30 POR DIA',960,170,90,p+.6,{t1:T(c,4)}));a.sfx.push(S(p+.6,'slam',.6));
 [[260,910],[520,910],[1400,910],[1660,910]].forEach(([x,y],k)=>a.itens.push(prop('panela',x,y,.9,p+.3+k*.2,{t1:T(c,4)})));
 a.itens.push(fig('lucia',960,1.35,p,{t1:T(c,4),estados:[{t:p,pose:'mexendo',expr:'cansado'}]}));
 a.itens.push(txt('SOBRAS · QUA: 12',960,200,78,T(c,4),{t1:T(c,4,1.5),cor:'#E4572E'}),txt('SOBRAS · QUI: 9',960,200,78,T(c,4,1.5),{t1:T(c,6),cor:'#E4572E'}));
 [0,1,2,3,4,5].forEach(k=>a.itens.push(prop('marmita',500+k*180,860,.6,T(c,4,.2+k*.15),{t1:T(c,6),mov:[{t:T(c,5),x:500+k*180,y:860},{t:T(c,5,.3+k*.2),x:1750,y:1400,dur:.8}]})));
 a.sfx.push(S(T(c,5,.5),'lixo',.5));
 const r=T(c,6);a.fundos=[{t:r,cor:'#2A2F45'}];
 a.itens.push({tipo:'prop',nome:'relogio',x:960,y:300,s:1,t0:r,anim:'fade',args:{txt:'05:10'}},prop('fogao',960,910,1.2,r,{anim:'fade'}),prop('panelaPressao',960,630,1,r,{anim:'fade'}));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:r,s:1.6,x:960,y:600,dur:F(c,6)-r}];
 for(let k=0;k<6;k++)a.sfx.push(S(r+k*.5,'tick',.45));
 cenas.push(a);}

// 9 — A MÃO
{const c=9,a=C(c,{trilha:[{t:T(c,2),f:'tensa'}],vol:.55,fundo:'#2A2F45',chao:null});
 const t0=ini(c);
 a.itens.push(prop('fogao',960,910,1.2,t0,{anim:'none',t1:T(c,1)}),prop('panelaPressao',960,630,1,t0,{anim:'none',t1:T(c,1),mov:[{t:t0,x:960,y:630,rot:0},{t:T(c,0,.3),x:1260,y:930,rot:70,dur:.35}]}));
 a.flash=[T(c,0,.5)];a.shake=[{t:T(c,0,.5),amp:20}];a.sfx.push(S(T(c,0,.5),'panela',.8));
 a.fundos=[{t:t0,cor:'#2A2F45'},{t:T(c,1),cor:'#FAF7F0'},{t:T(c,5),cor:'#2A2F45'}];
 a.itens.push(fig('lucia',960,2.3,T(c,1),{y:1240,t1:T(c,5),anim:'fade',estados:[{t:T(c,1),pose:'segurando',expr:'feliz'},{t:T(c,2),expr:'cansado',treme:1}]}));
 a.itens.push(bal('Não foi nada, filho.',1100,380,T(c,1,1.6),T(c,2)));
 a.cam=[{t:t0,s:1,x:960,y:540},{t:T(c,2),s:1.25,x:960,y:620,dur:3}];
 const n=T(c,5);a.cam.push({t:n,s:1,x:960,y:540,dur:.01});
 a.itens.push(prop('mesa',960,780,1.2,n,{anim:'fade'}),prop('luminaria',560,766,1,n,{anim:'fade'}));
 a.itens.push(fig('carlos',960,1.3,n,{y:820,anim:'fade',estados:[{t:n,pose:'segurando',expr:'triste'}]}));
 a.itens.push({tipo:'painel',estilo:'papel',titulo:'CONTAS DO MÊS',x:1450,y:230,s:.7,w:560,t0:T(c,6)-.8,anim:'pop',linhas:[{t:'SOBROU: R$ 0',c:'#E4572E',b:1}],linhasT:[T(c,6)]});
 a.sfx.push(S(T(c,6),'slam',.5));
 const r=T(c,7);a.itens.push(prop('placa',960,200,.55,r,{anim:'fade'}));
 a.itens.push({tipo:'svg',t0:T(c,8),anim:'fade',svg:`<g opacity=".85"><circle cx="960" cy="560" r="300" fill="#1A1A1A" opacity=".6"/></g>`});
 const {figura}=require('../../biblioteca/personagens');
 a.itens.push({tipo:'svg',t0:T(c,8),anim:'fade',svg:t=>{const k=Math.min(1,(t-T(c,8))/2);return figura({tipo:'carlos',soCabeca:true,x:960-60*k,y:560,s:3.2,expr:'triste'})+`<g opacity="${.55*k}">${figura({tipo:'pai',soCabeca:true,x:960+60*k,y:560,s:3.2})}</g>`}});
 a.cam.push({t:r,s:1.2,x:960,y:420,dur:2});
 cenas.push(a);}

// 10 — O GUARDANAPO
{const c=10,a=C(c,{trilha:'tensa',vol:.5,trans:'preto'});
 a.itens.push(fig('carlos',600,1.35,ini(c),{anim:'none',estados:[{t:ini(c),pose:'triste',expr:'triste'},{t:T(c,8),expr:'surpreso'}],t1:T(c,2)}));
 a.itens.push(fig('tiago',1300,1.35,ini(c),{anim:'none',mov:[{t:ini(c),x:2100},{t:ini(c)+.1,x:1300,dur:1.8}],andar:[ini(c),ini(c)+1.9],espelhar:true,t1:T(c,2),estados:[{t:T(c,1),expr:'neutro'}]}));
 const g=T(c,2);a.cam=[{t:ini(c),s:1,x:960,y:540},{t:g,s:1,x:960,y:-1460,dur:.35}];a.sfx.push(S(g,'whoosh',.5),S(g,'papel',.4));
 const lt=[T(c,4),T(c,4,1.7),T(c,4,3.4),T(c,4,4.7),T(c,4,6),T(c,5),T(c,7),T(c,8)];
 a.itens.push({tipo:'painel',estilo:'guardanapo',titulo:'O QUE SAIU',x:960,y:-1950,s:1.05,w:1100,t0:g,anim:'pop',linhas:['Ingredientes ............ R$ 1.702','Embalagem/talher ...... R$ 299','Gás .......................... R$ 250','Luz/água extra .......... R$ 60','Mototáxi ................... R$ 176',{t:'GASTO ............ R$ 2.487',b:1},{t:'RECEBIDO ....... R$ 2.184',c:'#3FA34D',b:1},{t:'RESULTADO ..... −R$ 303',c:'#E4572E',b:1}],linhasT:lt});
 lt.forEach((t,k)=>a.sfx.push(S(t,k===7?'impact':'tick',k===7?.9:.45)));a.shake=[{t:T(c,8),amp:16}];
 a.itens.push(bal('Me fala tudo que saiu de dinheiro. Tudo.',960,-1980,T(c,3),F(c,3,.3)));
 const b=T(c,9);a.cam.push({t:b,s:1,x:4000,y:540,dur:.35});a.sfx.push(S(b,'whoosh',.5));
 a.itens.push(prop('balanca',4000,860,1.3,b,{args:t=>({tomba:t<T(c,10,1.5)?0:Math.min(14,(t-T(c,10,1.5))*20)})}));a.sfx.push(S(T(c,10,1.5),'toc',.7));
 a.itens.push(txt('R$ 0,44 POR CLIENTE',4000,230,84,T(c,11),{cor:'#E4572E'}));a.sfx.push(S(T(c,11),'slam',.6));
 const h=T(c,12);a.cam.push({t:h,s:1,x:7000,y:540,dur:.01});
 a.itens.push(fig('lucia',7350,1.4,h,{anim:'fade',estados:[{t:h,pose:'triste',expr:'cansado'}]}),fig('tiago',6500,1.3,h,{anim:'none',estados:[{t:h,pose:'apontando',expr:'neutro'}]}));
 a.itens.push(txt('HORAS DA MÃE: 110',7000,190,80,T(c,12,1.5)),txt('PAGO: R$ 0',7000,290,80,T(c,12,3.2),{cor:'#E4572E'}));a.sfx.push(S(T(c,12,1.5),'slam',.5),S(T(c,12,3.2),'slam',.6));
 a.cam.push({t:T(c,13),s:1.4,x:7300,y:560,dur:3});
 cenas.push(a);}

// 11 — O PAI
{const c=11,a=C(c,{trilha:[{t:ini(c),f:'pad'},{t:T(c,5),f:'leve_lenta'}],trans:'whoosh'});
 a.itens.push(fig('lucia',1350,1.4,ini(c),{anim:'none',estados:[{t:ini(c),pose:'triste',expr:'triste'}]}),fig('carlos',600,1.4,ini(c),{anim:'none',estados:[{t:ini(c),pose:'triste',expr:'triste'},{t:T(c,5),pose:'em_pe',expr:'determinado'}]}));
 a.itens.push(bal('Teu pai era igualzinho.',1350,430,T(c,1),T(c,1,2.2)));
 const fb=T(c,1,2.2);a.cam=[{t:ini(c),s:1,x:960,y:540},{t:fb,s:1,x:4000,y:540,dur:.01},{t:T(c,3),s:1,x:960,y:540,dur:.01}];
 a.filtros=[{t0:fb,t1:T(c,3),tipo:'sepia'}];
 a.itens.push(prop('portaAco',4000,910,1.6,fb,{anim:'none',args:{fechado:.15}}),prop('placa',4000,370,.8,fb,{anim:'none'}),fig('pai',3750,1.4,fb,{anim:'none',espelhar:true}),fig('operario',4300,1.3,fb,{anim:'none',espelhar:true,estados:[{t:0,expr:'feliz'}]}));
 a.itens.push(bal('Aumentar? Aí eu perco o cliente!',3750,420,fb+.2,T(c,2)));
 a.itens.push(bal('Perdeu tudo. Menos o cliente.',1350,430,T(c,2),F(c,2,.6)));
 const w=T(c,4);[['MOVIMENTO ≠ LUCRO',0],['FILA ≠ NEGÓCIO',1.6],['APLAUSO ≠ RESULTADO',2.9]].forEach(([s,d],k)=>{a.itens.push(txt(s,960,180+k*100,72,w+d,{t1:T(c,5),cor:k===2?'#E4572E':'#1A1A1A'}));a.sfx.push(S(w+d,'slam',.5))});
 a.itens.push(prop('placa',960,270,.8,T(c,6),{args:{verso:'A CONTA PRIMEIRO'}}));a.sfx.push(S(T(c,6),'caneta',.6));
 cenas.push(a);}

// 12 — A CONTA CERTA
{const c=12,a=C(c,{trilha:'leve',trans:'preto'});
 a.itens.push(prop('mesa',960,780,1.2,ini(c),{anim:'none',t1:T(c,1)}),fig('lucia',560,1.3,ini(c),{anim:'none',t1:T(c,1),estados:[{t:0,pose:'segurando',expr:'neutro'}]}),fig('carlos',960,1.3,ini(c),{anim:'none',t1:T(c,1),estados:[{t:0,pose:'pensando',expr:'determinado'}]}),fig('tiago',1360,1.3,ini(c),{anim:'none',t1:T(c,1),espelhar:true,estados:[{t:0,pose:'apontando',expr:'neutro'}]}));
 const r=[T(c,1),T(c,2),T(c,3),T(c,4),T(c,5)];
 a.itens.push({tipo:'painel',estilo:'quadro',titulo:'A CONTA CERTA',x:960,y:90,s:1,w:1300,t0:T(c,1),t1:T(c,6),anim:'pop',linhas:['1. Custo por marmita (atacado): R$ 7,90','2. Fixos/mês: gás + luz + transporte',{t:'    + SALÁRIO DA MÃE: R$ 800 → total R$ 1.286',c:'#1E88A8',b:1},'3. Pedido até 10h → zero sobra','4. Pix antes → zero fiado'],linhasT:r});
 r.forEach(t=>a.sfx.push(S(t,'tick',.5)));a.sfx.push(S(T(c,1),'whoosh',.4));
 a.itens.push(txt('R$ 19',960,560,300,T(c,7),{t1:T(c,9),cor:'#1E88A8'}));a.sfx.push(S(T(c,7),'impact',.8));a.shake=[{t:T(c,7),amp:18}];
 a.itens.push(txt('+7 que antes · +4 que o Bigode',960,760,56,T(c,8),{t1:T(c,9),anim:'pop'}));
 const g=T(c,9);
 a.itens.push({tipo:'svg',t0:g,anim:'fade',svg:t=>{const k=Math.min(1,(t-g)/3.5),X=v=>360+v*9,Y=v=>560-v*.25;
   let s=`<line x1="360" y1="560" x2="1700" y2="560" stroke="#1A1A1A" stroke-width="6"/><line x1="360" y1="200" x2="360" y2="900" stroke="#1A1A1A" stroke-width="6"/>`;
   s+=`<text x="1700" y="610" font-family="DejaVu Sans" font-size="34" font-weight="700" text-anchor="end">marmitas no mês →</text><text x="380" y="190" font-family="DejaVu Sans" font-size="34" font-weight="700">lucro (R$)</text>`;
   const n=Math.round(150*k), v=n*11.10-1286; s+=`<line x1="${X(0)}" y1="${Y(-1286)}" x2="${X(n)}" y2="${Y(v)}" stroke="${v<0?'#E4572E':'#3FA34D'}" stroke-width="12" stroke-linecap="round"/>`;
   if(n>=116) s+=`<circle cx="${X(116)}" cy="${Y(0)}" r="20" fill="#F6D776" stroke="#1A1A1A" stroke-width="5"/><text x="${X(116)}" y="${Y(0)-40}" font-family="DejaVu Sans" font-size="64" font-weight="900" text-anchor="middle">116</text>`;
   return s;}});
 a.sfx.push(S(g+3.2,'ding',.6));
 cenas.push(a);}

// 13 — O PORTÃO
{const c=13,a=C(c,{trilha:'tensa',vol:.6,trans:'whoosh',silencios:[{t0:T(c,4),t1:F(c,7,1.5)}]});
 a.itens.push(prop('fabrica',1650,910,.6,ini(c),{anim:'none'}),prop('cartaz',760,910,.9,ini(c),{anim:'none',args:{t:'MARMITA R$ 19'}}),prop('isopor',560,910,.9,ini(c),{anim:'none'}));
 a.itens.push(fig('carlos',380,1.35,ini(c),{anim:'none',estados:[{t:0,pose:'em_pe',expr:'neutro'},{t:T(c,4),expr:'envergonhado',pose:'apontando'},{t:T(c,6),pose:'em_pe',expr:'determinado'}]}));
 const sai=T(c,9),sai2=T(c,10);
 a.itens.push(fig('marcao',1000,1.2,T(c,1),{espelhar:true,estados:[{t:T(c,1),expr:'neutro'},{t:T(c,2),expr:'surpreso'},{t:T(c,3),expr:'bravo',pose:'bracos_cruzados'},{t:T(c,8),expr:'pensativo'}],mov:[{t:sai,x:1000},{t:sai+.2,x:2300,dur:3}],andar:[sai,sai+3.4]}));
 [0,1,2].forEach(k=>a.itens.push(fig('operario',1240+k*190,1.15,ini(c),{anim:'none',espelhar:true,mov:[{t:sai2,x:1240+k*190},{t:sai2+.3+k*.3,x:2500+k*190,dur:2.5}],andar:[sai2+k*.3,sai2+3+k*.3]})));
 a.itens.push(bal('Dezenove? Tá doido, Carlos?\nO Bigode cobra quinze.',1000,420,T(c,3),F(c,3,.5)));
 a.cam=[{t:ini(c),s:1,x:960,y:540},{t:T(c,2),s:1.4,x:900,y:560,dur:.5},{t:T(c,4),s:2,x:560,y:640,dur:2.5},{t:T(c,6),s:1.2,x:700,y:560,dur:.4},{t:sai,s:1,x:960,y:540,dur:1}];
 const ins=T(c,5);
 a.fixos=[{tipo:'painel',estilo:'guardanapo',x:960,y:260,s:.8,w:900,t0:ins,t1:ins+.7,anim:'none',linhas:[{t:'RESULTADO ..... −R$ 303',c:'#E4572E',b:1}]},
   {tipo:'svg',t0:ins+.8,t1:ins+1.5,anim:'none',svg:require('../../biblioteca/personagens').figura({tipo:'lucia',soCabeca:true,x:960,y:540,s:3,expr:'cansado'})},
   {tipo:'prop',nome:'placa',x:960,y:540,s:1.4,t0:ins+1.6,t1:ins+2.4,anim:'none'}];
 a.flash=[ins,ins+.8,ins+1.6];[ins,ins+.8,ins+1.6].forEach(t=>a.sfx.push(S(t,'whoosh',.5)));
 a.itens.push(bal('Marcão... por 12, eu pagava\npra você almoçar.',420,420,T(c,6),T(c,7)),bal('E quem pagava essa conta\nera a minha mãe.',420,420,T(c,7),F(c,7,.8)));
 for(let k=0;k<8;k++)a.sfx.push(S(T(c,4)+k*.6,'tick',.35));
 cenas.push(a);}

// 14 — O PRIMEIRO LUCRO
{const c=14,a=C(c,{trilha:'leve_lenta',trans:'preto'});
 const lt=[T(c,0),T(c,1),T(c,1,2.6),T(c,1,5.5),T(c,2)];
 a.itens.push({tipo:'painel',estilo:'cortica',titulo:'SEMANA 1 · PREÇO NOVO',x:960,y:80,s:1,w:1300,t0:ini(c),t1:T(c,5),anim:'pop',linhas:['31 marmitas × R$ 19 = R$ 589','− ingrediente e embalagem: R$ 244,90','− parte da semana dos fixos: R$ 321,50','  (com o salário da mãe dentro)',{t:'= LUCRO: R$ 22,60',c:'#3FA34D',b:1}],linhasT:lt});
 lt.forEach(t=>a.sfx.push(S(t,'tick',.4)));a.sfx.push(S(T(c,2),'caixa',.4));
 a.itens.push(txt('R$ 22,60',960,760,200,T(c,3),{t1:T(c,5),cor:'#3FA34D'}));
 const d=T(c,5);
 a.itens.push({tipo:'prop',nome:'relogio',x:1500,y:250,s:.8,t0:d,t1:T(c,6),anim:'pop',args:{txt:'09:00'}},prop('maquinaCostura',600,910,.9,d,{t1:T(c,6)}),fig('lucia',1000,1.4,d,{t1:T(c,6),y:960,estados:[{t:d,pose:'sentado',expr:'cansado',inclinar:-12}]}),txt('Zzz',1150,420,80,d+.6,{t1:T(c,6),anim:'pop',cor:'#1E88A8'}));
 const v=T(c,6);a.sfx.push(S(v,'whoosh',.4));
 a.itens.push(prop('fabrica',1650,910,.6,v,{anim:'none'}),prop('cartaz',760,910,.9,v,{anim:'none',args:{t:'MARMITA R$ 19'}}),fig('carlos',400,1.35,v,{anim:'none',estados:[{t:v,expr:'surpreso'},{t:T(c,8),expr:'rindo',pose:'acenando'}]}));
 a.itens.push(fig('marcao',1000,1.2,v,{anim:'none',espelhar:true,mov:[{t:v,x:1900},{t:v+.1,x:1000,dur:1.8}],andar:[v,v+1.9],estados:[{t:v,expr:'envergonhado'},{t:T(c,8),expr:'feliz'}]}));
 a.itens.push(bal('Me vê uma.',1000,420,T(c,7),T(c,8)),bal('Mas capricha no feijão.',1000,420,T(c,8),fim(c)));
 cenas.push(a);}

// 15 — A LIÇÃO
{const c=15,a=C(c,{trilha:[{t:ini(c),f:'leve_lenta'},{t:T(c,4),f:null}],trans:'whoosh'});
 a.itens.push(fig('carlos',300,1.35,ini(c),{anim:'none',estados:[{t:0,pose:'apontando',expr:'determinado'}]}));
 const r=[T(c,1),T(c,2),T(c,3)];
 a.itens.push({tipo:'painel',estilo:'quadro',titulo:'ANTES DE ESCOLHER O PREÇO',x:1100,y:120,s:1,w:1300,t0:ini(c),t1:T(c,4),anim:'pop',linhas:['1. Tudo que cada venda gasta','   (inclusive o que parece "de graça")','2. O que sai todo mês + o SEU salário',{t:'3. Só então: o preço',c:'#1E88A8',b:1}],linhasT:[r[0],r[0]+.8,r[1],r[2]]});
 r.forEach(t=>a.sfx.push(S(t,'tick',.5)));
 a.itens.push(txt('VENDER MUITO COM PREJUÍZO',960,300,84,T(c,4)),txt('= QUEBRAR MAIS RÁPIDO',960,430,96,T(c,5),{cor:'#E4572E'}));
 a.sfx.push(S(T(c,4),'slam',.6),S(T(c,5),'impact',.7));a.shake=[{t:T(c,5),amp:14}];
 cenas.push(a);}

// 16 — O VÍDEO DA BIA
{const c=16,a=C(c,{trilha:[{t:ini(c),f:'leve_lenta'},{t:T(c,2),f:'tensa'}],trans:'preto'});
 a.itens.push(prop('fogao',1250,910,1,ini(c),{anim:'none',t1:T(c,2)}),prop('panela',1250,680,.8,ini(c),{anim:'none',t1:T(c,2)}),fig('lucia',1000,1.35,ini(c),{anim:'none',t1:T(c,2),estados:[{t:0,pose:'mexendo',expr:'feliz'}]}),fig('bia',520,1.35,ini(c),{anim:'none',t1:T(c,2),estados:[{t:0,pose:'celular',expr:'feliz'}]}));
 a.itens.push({tipo:'painel',estilo:'celular',x:1500,y:120,s:.75,w:560,h:560,t0:T(c,1),t1:T(c,2),anim:'subir',titulo:'@bia.reis',linhas:['[vídeo: mãe mexendo','o feijão]','','"minha mãe cozinha,','meu irmão aprendeu','matemática"']});
 const s=T(c,2);a.fundos=[{t:s,cor:'#22293D'}];a.chao=null;
 a.itens.push({tipo:'prop',nome:'relogio',x:960,y:180,s:.9,t0:s,anim:'pop',args:{txt:'06:00'},t1:T(c,3)});
 a.itens.push({tipo:'notifs',x:960,y:940,s:1,t0:s+.5,t1:T(c,3),dur:F(c,2)-s,n:18,txt:'Novo pedido',num:1,anim:'none'});
 for(let k=0;k<6;k++)a.sfx.push(S(s+.4+k*.55,'vibra',.5));
 a.itens.push({tipo:'contador',de:0,ate:300,suf:' PEDIDOS',x:960,y:500,sz:170,cor:'#F6D776',contorno:'#22293D',t0:T(c,3),dur:.9,anim:'slam'});a.sfx.push(S(T(c,3)+.9,'impact',.9));a.shake=[{t:T(c,3)+.9,amp:22}];
 a.itens.push(txt('CAPACIDADE: 60',960,760,120,T(c,4,1.4),{cor:'#E4572E',contorno:'#22293D'}));a.sfx.push(S(T(c,4,1.4),'slam',.8));
 a.itens.push(txt('QUINTA · EP. 2',1650,90,48,F(c,4,.6),{cor:'#1E88A8',contorno:'#22293D',anim:'fade'}));
 cenas.push(a);}

// ---- DINAMISMO (refeito no modo dinâmico): efeitos ligados à fala, ≥2 por cena ----
require('../../biblioteca/efeitos').dinamizar(cenas,T,{1:[700,1.45],2:[950,1.4],3:[980,1.35],4:[1260,1.4],5:[420,1.4],6:[430,1.35],8:[430,1.4],9:[960,1.3],10:[600,1.35],11:[600,1.4],12:[960,1.3],13:[380,1.35],14:[400,1.35],15:[300,1.35]},[
 [1,1,.3,'!'],[1,3,.3,'confete',1300,260],[1,4,.6,'impacto',1300,300,{r:300}],[1,4,.6,'onda',1300,300],[1,4,.5,'glitch'],[1,5,0,'?'],[1,6,0,'suor'],
 [2,2,1.4,'!'],[2,3,0,'impacto',960,200,{r:320}],[2,3,0,'glitch'],[2,4,1,'brilho',960,200,{r:330}],[2,5,0,'velocidade'],
 [3,2,0,'suor'],[3,3,0,'suor'],[3,5,0,'onda',960,500],[3,5,.2,'glitch'],[3,6,0,'!'],
 [4,0,.4,'ideia'],[4,1,.3,'!'],[4,3,0,'velocidade'],[4,4,0,'brilho',960,560,{r:260}],
 [5,1,0,'?'],[5,3,0,'ideia'],[5,5,0,'brilho',960,300,{r:300}],[5,7,0,'glitch'],[5,7,.2,'suor'],
 [6,0,0,'chuvaDinheiro',0,0,{moeda:true,n:14}],[6,1,0,'velocidade'],[6,4,0,'!'],[6,6,0,'confete',960,300],[6,6,.3,'coracao'],
 [7,1,.8,'onda',960,170],[7,1,.7,'glitch'],[7,2,.3,'circulo',300,505,{rx:210,ry:55}],[7,3,0,'velocidade'],
 [8,1,0,'!'],[8,2,0,'velocidade'],[8,4,0,'circulo',960,180,{rx:380,ry:75}],[8,6,0,'glitch'],[8,6,.2,'suor'],
 [9,0,0,'onda',960,600],[9,2,0,'suor'],[9,6,0,'onda',960,420],[9,6,0,'glitch'],[9,7,0,'?'],
 [10,1,0,'?'],[10,5,0,'circulo',1400,560,{rx:330,ry:90}],[10,8,0,'glitch'],[10,8,.1,'onda',960,540],[10,8,.4,'!'],[10,11,0,'suor'],
 [11,1,0,'suor'],[11,2,0,'glitch'],[11,4,0,'velocidade'],[11,6,0,'ideia'],
 [12,1,0,'velocidade'],[12,3,0,'ideia'],[12,7,0,'impacto',960,560,{r:430}],[12,7,0,'onda',960,560],[12,8,0,'brilho',960,560,{r:340}],
 [13,3,0,'raiva',null,null],[13,4,0,'suor'],[13,6,0,'!'],[13,9,0,'glitch'],[13,10,0,'suor'],
 [14,1,0,'chuvaDinheiro',0,0,{moeda:true,n:12}],[14,4,0,'confete',960,300],[14,5,0,'coracao'],[14,7,0,'!'],
 [15,0,0,'ideia'],[15,1,0,'velocidade'],[15,5,0,'onda',960,430],[15,5,0,'glitch'],
 [16,2,0,'velocidade'],[16,3,.9,'impacto',960,500,{r:420}],[16,4,1.4,'circulo',960,745,{rx:470,ry:95}],[16,4,1.3,'glitch'],
]);

return cenas;};
