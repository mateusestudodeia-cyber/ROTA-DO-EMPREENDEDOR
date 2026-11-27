"""Divide um episódio em N partes cortando sempre numa pausa entre falas (nunca no meio de frase).
Uso: python motor/cortes.py ep01 8 [max_segundos]  -> episodios/ep01/cortes.json"""
import json,sys
ep,N=sys.argv[1],int(sys.argv[2]); MAX=float(sys.argv[3]) if len(sys.argv)>3 else 89
B=f'/home/user/estudio/episodios/{ep}'; tl=json.load(open(f'{B}/build/timeline.json')); f=tl['falas']; D=tl['duracao']
pausas=[(f[i]['fim']+f[i+1]['ini'])/2 for i in range(len(f)-1)]  # meio de cada silêncio entre falas
cortes=[0.0]
for k in range(1,N):
    alvo=D*k/N; ok=[p for p in pausas if p>cortes[-1]+20 and p-cortes[-1]<=MAX]
    cortes.append(min(ok,key=lambda p:abs(p-alvo)))
cortes.append(D)
partes=[]
for k in range(N):
    a,b=cortes[k],cortes[k+1]; txt=[x['texto'] for x in f if x['ini']>=a and x['fim']<=b]
    partes.append(dict(parte=k+1,ini=round(a,2),fim=round(b,2),dur=round(b-a,1),abre=txt[0][:70],fecha=txt[-1][:70]))
json.dump(partes,open(f'{B}/cortes.json','w'),ensure_ascii=False,indent=1)
for p in partes: print(f"P{p['parte']} {p['dur']}s | {p['abre']} ... {p['fecha']}")
