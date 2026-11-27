import numpy as np, soundfile as sf
from scipy.signal import resample_poly
from math import gcd
SR=48000; DUR=16.0
def ld(p):
    a,sr=sf.read(p,always_2d=False)
    if a.ndim>1:a=a.mean(1)
    if sr!=SR:g=gcd(sr,SR);a=resample_poly(a,SR//g,sr//g)
    return a
bus={k:np.zeros(int(DUR*SR)) for k in ('voz','sfx','mus')}
def put(b,a,t,v=1.0):
    i=int(t*SR);
    if i<0:a=a[-i:];i=0
    j=min(len(bus[b]),i+len(a)); bus[b][i:j]+=a[:j-i]*v
for i,t in enumerate([.3,2.5,5.6,8.4,11.0,13.4]): put('voz',ld(f'demo/audio/fala_{i:02d}.wav'),t,1.0)
S={n:ld(f'sfx/{n}.wav') for n in ['slam','pop','whoosh','tick','moeda','caixa','risco','papel','impact','ding']}
put('sfx',S['slam'],.3-.2,.8)
for i in range(8): put('sfx',S['pop'],.35+i*.22,.45)
put('sfx',S['whoosh'],2.42,.8); put('sfx',S['whoosh'],5.42,.7)
for k in range(16): put('sfx',S['tick'],2.6+k*.15,.35)
for k in range(5): put('sfx',S['moeda'],2.9+k*.5,.25)
put('sfx',S['caixa'],4.82-.26,.8)
put('sfx',S['risco'],8.22-.82,.9)
for k in range(3): put('sfx',S['papel'],8.7+k*.55-.37,.6)
put('sfx',S['impact'],11.75-.13,1.0); put('sfx',S['slam'],11.75-.2,.6)
for k in range(13): put('sfx',S['tick'],13.45+k*.1,.3)
put('sfx',S['ding'],15.4,.4)
leve=ld('musica/leve.wav'); tensa=ld('musica/tensa.wav')
m=leve[:int(8.2*SR)].copy(); m[-int(.03*SR):]*=np.linspace(1,0,int(.03*SR)); put('mus',m,0,.28)
tz=tensa[:int(5.0*SR)].copy(); tz[:int(.4*SR)]*=np.linspace(0,1,int(.4*SR)); tz[-int(.8*SR):]*=np.linspace(1,0,int(.8*SR)); put('mus',tz,11.0,.32)
# ducking: música cai para 40% quando há voz
env=np.abs(bus['voz']); w=int(.15*SR); env=np.convolve(env,np.ones(w)/w,'same'); duck=np.where(env>.01,.4,1.0)
duck=np.convolve(duck,np.ones(int(.08*SR))/int(.08*SR),'same')
mix=bus['voz']*1.0+bus['sfx']*.9+bus['mus']*duck
mix/=max(1e-9,np.max(np.abs(mix)))/0.89
sf.write('demo/mix.wav',mix,SR); print('pico ok')
