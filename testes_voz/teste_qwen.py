import time,torch,soundfile as sf,numpy as np
from qwen_tts import Qwen3TTSModel
t=time.time()
m=Qwen3TTSModel.from_pretrained("Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",device_map="cpu",dtype=torch.float32)
print('modelo carregado em',round(time.time()-t),'s',flush=True)
falas=[("Esse é o Carlos. Vinte e seis anos.","Narrador brasileiro contando uma história, tom acolhedor e curioso, ritmo natural."),
("Numa segunda-feira, ele foi demitido… e decidiu abrir o próprio negócio.","Narrador brasileiro, tom sério e um pouco dramático."),
("No primeiro mês, ele vendeu duzentas marmitas. E mesmo assim, no fim do mês, não sobrou dinheiro nenhum.","Narrador brasileiro, tom de suspense, pausado, com ênfase em 'não sobrou dinheiro nenhum'.")]
partes=[];sr=None;t=time.time()
for txt,ins in falas:
    w,sr=m.generate_custom_voice(text=txt,language="Portuguese",speaker="Ryan",instruct=ins)
    partes+= [w[0],np.zeros(int(sr*.5),dtype=np.float32)]
a=np.concatenate(partes);sf.write('testes_voz/qwen_ryan.wav',a,sr)
print(f'gerou {len(a)/sr:.1f}s de áudio em {time.time()-t:.0f}s',flush=True)
