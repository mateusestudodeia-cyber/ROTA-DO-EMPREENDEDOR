# Trilha original gerada por código (100% nossa, sem licença de terceiros).
import numpy as np, soundfile as sf, sys
SR=44100
def nota(m): return 440*2**((m-69)/12)
def env(n,a=.01,r=.3):
    t=np.arange(n)/SR; e=np.minimum(1,t/a)*np.exp(-t/r); return e
def tom(f,d,tipo='saw',a=.01,r=.3,vol=.2):
    n=int(d*SR); t=np.arange(n)/SR
    if tipo=='saw': w=sum(np.sin(2*np.pi*f*k*t)/k for k in range(1,8))*.6
    elif tipo=='pluck': w=np.sin(2*np.pi*f*t)+.4*np.sin(2*np.pi*2*f*t)
    else: w=np.sin(2*np.pi*f*t)
    return w*env(n,a,r)*vol
def kick():
    n=int(.25*SR); t=np.arange(n)/SR; f=55+90*np.exp(-t*30); return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*9)*.7
def hat():
    n=int(.05*SR); return np.random.default_rng(1).normal(0,1,n)*np.exp(-np.arange(n)/SR*90)*.08
def mix(buf,s,t):
    i=int(t*SR)
    if i>=len(buf): return
    j=min(len(buf),i+len(s)); buf[i:j]+=s[:j-i]
def faixa(bpm,acordes,dur,humor):
    buf=np.zeros(int(dur*SR)); bt=60/bpm; t=0; ci=0
    while t<dur:
        ac=acordes[ci%len(acordes)]
        for k in range(4):           # 1 compasso por acorde
            tb=t+k*bt
            if tb>=dur: break
            if humor!='pad':
                if humor!='lenta' or k%2==0: mix(buf,kick() if humor in('leve','lenta') or k%2==0 else kick()*.6,tb)
                if humor=='leve' or (humor=='tensa' and ci%4>1): mix(buf,hat(),tb+bt/2)
            if humor in('leve','lenta'):
                ordem=ac if (ci//4)%2==0 else ac[::-1]
                for s,m in enumerate(ordem): mix(buf,tom(nota(m+12),bt*.45,'pluck',r=.15 if humor=='leve' else .3,vol=.07 if humor=='leve' else .05),tb+s*bt/4)
            if humor!='pad': mix(buf,tom(nota(ac[0]-12),bt*.9,'sine',r=.4,vol=.25 if humor!='lenta' else .15),tb)
        for m in ac: mix(buf,tom(nota(m),bt*4,'saw',a=.4,r=2.5,vol=.035),t)  # pad
        t+=4*bt; ci+=1
    buf/=np.max(np.abs(buf))*1.1; return buf
D=64
sf.write('musica/leve.wav',faixa(112,[[60,64,67,71],[57,60,64,67],[65,69,72,76],[67,71,74,77]],D,'leve'),SR)
sf.write('musica/leve_lenta.wav',faixa(88,[[65,69,72,76],[60,64,67,71],[57,60,64,67],[67,71,74,77]],D,'lenta'),SR)
sf.write('musica/tensa.wav',faixa(84,[[57,60,64],[56,60,63],[53,57,60],[52,56,59]],D,'tensa'),SR)
sf.write('musica/pad.wav',faixa(70,[[57,60,64],[53,57,60],[55,59,62],[52,55,59]],D,'pad'),SR)
print('ok')
