const {carlos,COR}=require('./carlos');const fs=require('fs');
const T=(x,y,t,sz=26,w=700,c='#1A1A1A')=>`<text x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-size="${sz}" font-weight="${w}" fill="${c}" text-anchor="middle">${t}</text>`;
let b=`<rect width="1920" height="1080" fill="#FAF7F0"/>`+T(960,70,'CARLOS — folha de modelo',46,800)+T(960,108,'Assinaturas: topete de 3 fios · cachecol azul-petróleo · cabeça grande e redonda',24,400,'#555');
const ex=['neutro','feliz','rindo','triste','bravo','surpreso','pensativo','envergonhado','desesperado','determinado'];
ex.forEach((e,i)=>{const x=150+i*180;b+=carlos({soCabeca:true,x,y:240,s:.95,expr:e});});
// recorta só a cabeça: usa clipPath simples
b=b; 

ex.forEach((e,i)=>b+=T(150+i*180,360,e,20,600));
b+=`<line x1="80" y1="390" x2="1840" y2="390" stroke="#ddd" stroke-width="3"/>`+T(960,430,'Poses',28,700,'#555');
const ps=[['em_pe','neutro'],['acenando','feliz'],['apontando','determinado'],['pensando','pensativo'],['bracos_cruzados','bravo'],['comemorando','rindo'],['desespero','desesperado'],['andando_a','feliz'],['triste','triste']];
ps.forEach(([p,e],i)=>{const x=150+i*203;b+=carlos({x,y:960,s:.95,pose:p,expr:e})+T(x,1020,p.replace('_',' '),20,600);});
fs.writeFileSync('folha_carlos.svg',`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">${b}</svg>`);
