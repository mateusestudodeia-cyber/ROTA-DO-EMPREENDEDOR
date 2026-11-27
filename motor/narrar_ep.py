"""Lê episodios/epXX/roteiro.md, quebra a narração de cada cena nas pausas e gera a voz (Kokoro, CPU).
Saída: episodios/epXX/build/audio/cNN_II.wav + timeline.json (tempos absolutos)."""
import re, sys, json, os, soundfile as sf, numpy as np
from kokoro_onnx import Kokoro
ep=sys.argv[1]; base=f'/home/user/estudio/episodios/{ep}'; out=f'{base}/build'; os.makedirs(f'{out}/audio',exist_ok=True)
md=open(f'{base}/roteiro.md',encoding='utf-8').read()
cenas=re.split(r'\n## CENA ',md)[1:]
PAUSA={'CURTA':.5,'LONGA':1.1}; GAP_CENA=.7
k=Kokoro('/home/user/estudio/modelos/kokoro-v1.0.onnx','/home/user/estudio/modelos/voices-v1.0.bin')
tl=[]; t=0.0; SR=24000
for ci,bloco in enumerate(cenas,1):
    m=re.search(r'\*\*Narração\*\*\n((?:> .*\n?)+)',bloco)
    if not m: continue
    txt=' '.join(l[2:] for l in m.group(1).strip().split('\n'))
    partes=re.split(r'\[PAUSA (CURTA|LONGA)\]',txt)   # [texto, tipo, texto, tipo, ...]
    vel_base=.92; i=0
    for j in range(0,len(partes),2):
        seg=partes[j]; pausa=PAUSA.get(partes[j+1],0) if j+1<len(partes) else 0
        if 'RITMO: ACELERADO' in seg: vel_base=1.02
        if 'RITMO: LENTO' in seg: vel_base=.85
        vel=vel_base*(.92 if 'ÊNFASE' in seg else 1)*(.96 if 'ÍNTIMA' in seg else 1)
        limpo=re.sub(r'\[[^\]]*\]','',seg).strip()
        if limpo:
            fala=limpo.startswith('—'); falado=limpo.lstrip('— ').replace('…','...')
            a,sr=k.create(falado,voice='pm_alex',speed=max(.8,min(1.2,vel*(1.03 if fala else 1))),lang='pt-br')
            nz=np.where(np.abs(a)>.01)[0]; a=a[max(0,nz[0]-240):nz[-1]+2400] if len(nz) else a  # apara silêncio das pontas
            p=f'{out}/audio/c{ci:02d}_{i:02d}.wav'; sf.write(p,a,sr); d=len(a)/sr
            tl.append(dict(cena=ci,i=i,texto=limpo.replace('—','').strip() if not fala else limpo,ini=round(t,3),fim=round(t+d,3),enfase='ÊNFASE' in seg,arquivo=p))
            t+=d; i+=1
        t+=pausa
    t+=GAP_CENA
json.dump(dict(duracao=round(t,2),falas=tl),open(f'{out}/timeline.json','w'),ensure_ascii=False,indent=1)
print(f'{ep}: {len(tl)} trechos, {int(t//60)} min {int(t%60)} s')
