"""Mixa voz (timeline.json) + efeitos e trilha (cues.json) -> build/mix.wav. Uso: python motor/mixar_ep.py ep01"""
import json, sys, numpy as np, soundfile as sf
from scipy.signal import resample_poly
from math import gcd
ep=sys.argv[1]; B=f'/home/user/estudio/episodios/{ep}/build'; R='/home/user/estudio'
SR=48000
TL=json.load(open(f'{B}/timeline.json')); CU=json.load(open(f'{B}/cues.json'))
N=int((TL['duracao']+1)*SR)
def ld(p):
    a,sr=sf.read(p,always_2d=False)
    if a.ndim>1: a=a.mean(1)
    if sr!=SR: g=gcd(sr,SR); a=resample_poly(a,SR//g,sr//g)
    return a.astype(np.float32)
def put(buf,a,t,v=1.):
    i=int(t*SR)
    if i<0: a=a[-i:]; i=0
    if i>=len(buf): return
    j=min(len(buf),i+len(a)); buf[i:j]+=a[:j-i]*v
voz=np.zeros(N,np.float32); sfx=np.zeros(N,np.float32); mus=np.zeros(N,np.float32)
for f in TL['falas']: put(voz,ld(f['arquivo']),f['ini'])
PICO={'slam':.2,'impact':.13,'caixa':.26,'risco':.82,'papel':.37,'porta':6.0,'panela':.23,'vibra':.38,'interruptor':.21,'lixo':.39,'erro':.06,'corrente':1.57,'moeda_rev':.9}
MAXD={'porta':2.6,'caixa':1.4,'vibra':1.2}
cache={}
for s in CU['sfx']:
    n=s['n']
    if n not in cache:
        a=ld(f'{R}/sfx/{n.replace("_rev","")}.wav')
        if n.endswith('_rev'): a=ld(f'{R}/sfx/{n[:-4]}.wav')[::-1].copy()
        if n=='porta': a=a[int(5.0*SR):]
        if n in MAXD: a=a[:int(MAXD[n]*SR)]; a[-int(.1*SR):]*=np.linspace(1,0,int(.1*SR))
        cache[n]=a
    put(sfx,cache[n],s['t']-(0 if n=='porta' else PICO.get(n,0)),s.get('v',.6))
# trilha: monta segmentos (t0,t1,faixa,vol)
segs=[]
for c in CU['trilha']:
    tr=c['faixa']; vol=c.get('vol',1)
    if isinstance(tr,list):
        pts=sorted(tr,key=lambda x:x['t'])
        for k,p in enumerate(pts):
            t1=pts[k+1]['t'] if k+1<len(pts) else c['t1']
            segs.append([max(p['t'],c['t0']),t1,p['f'],vol])
        if pts and pts[0]['t']>c['t0'] and segs: pass
    else: segs.append([c['t0'],c['t1'],tr,vol])
# junta segmentos vizinhos da mesma faixa para a música não reiniciar a cada cena
merged=[]
for s in segs:
    if merged and merged[-1][2]==s[2] and abs(merged[-1][1]-s[0])<.05 and merged[-1][3]==s[3]: merged[-1][1]=s[1]
    else: merged.append(s)
VOLF={'leve':.30,'leve_lenta':.30,'tensa':.34,'pad':.38}
FADE=int(.35*SR)
for t0,t1,f,vol in merged:
    if not f: continue
    loop=ld(f'{R}/musica/{f}.wav'); n=int((t1-t0)*SR)+FADE
    reps=np.tile(loop,n//len(loop)+2)[:n].copy()
    reps[:FADE]*=np.linspace(0,1,FADE); reps[-FADE:]*=np.linspace(1,0,FADE)
    put(mus,reps,t0,VOLF.get(f,.3)*vol)
for c in CU['trilha']:
    for si in c.get('silencios',[]):
        i,j=int(si['t0']*SR),int(si['t1']*SR); k=min(FADE,j-i)
        mus[i:i+k]*=np.linspace(1,0,k); mus[i+k:j]=0
        if j+FADE<len(mus): mus[j:j+FADE]*=np.linspace(0,1,FADE)
# ducking: música cai para 45% sob a voz
env=np.abs(voz); w=int(.12*SR); env=np.convolve(env,np.ones(w,np.float32)/w,'same')
duck=np.where(env>.008,.45,1.).astype(np.float32); w2=int(.15*SR); duck=np.convolve(duck,np.ones(w2,np.float32)/w2,'same')
mix=voz+sfx*.85+mus*duck
mix/=max(1e-9,np.abs(mix).max())/0.89
sf.write(f'{B}/mix.wav',mix,SR); print('mix ok', round(len(mix)/SR,1),'s')
