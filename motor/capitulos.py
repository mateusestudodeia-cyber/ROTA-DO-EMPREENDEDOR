"""Atualiza os tempos dos capítulos na descrição (publicacao.json) a partir da timeline real.
Uso: python motor/capitulos.py ep01 1,2,4,5,7,10,12,13,15   (cenas que abrem cada capítulo, na ordem)"""
import json,re,sys
ep=sys.argv[1]; cenas=[int(x) for x in sys.argv[2].split(',')]; B=f'/home/user/estudio/episodios/{ep}'
tl=json.load(open(f'{B}/build/timeline.json'))['falas']; ini={}
for f in tl: ini.setdefault(f['cena'],f['ini'])
p=f'{B}/publicacao.json'; d=json.load(open(p)); linhas=d['descricao'].split('\n'); k=0
for i,l in enumerate(linhas):
    m=re.match(r'^\d+:\d\d (.*)$',l)
    if m and k<len(cenas):
        t=0 if k==0 else max(0,ini[cenas[k]]-.3); linhas[i]=f'{int(t//60)}:{int(t%60):02d} {m.group(1)}'; k+=1
d['descricao']='\n'.join(linhas); d.pop('obs',None); json.dump(d,open(p,'w'),ensure_ascii=False,indent=1)
print('\n'.join(l for l in linhas if re.match(r'^\d+:\d\d ',l)))
