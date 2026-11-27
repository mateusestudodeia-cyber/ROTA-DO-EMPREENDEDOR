import time,torch,soundfile as sf,numpy as np
from qwen_tts import Qwen3TTSModel
m=Qwen3TTSModel.from_pretrained("Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",device_map="cpu",dtype=torch.float32)
BASE="Voz masculina grave, imponente e muito confiante, narrador brasileiro de vídeos de histórias no YouTube, fala rápida, enérgica e dinâmica. "
falas=[("Esse é o Carlos. Vinte e seis anos.","Tom firme e envolvente, como quem apresenta o protagonista."),
("Numa segunda-feira, ele foi demitido… e decidiu abrir o próprio negócio.","Tom sério e decidido, ênfase em 'abrir o próprio negócio'."),
("No primeiro mês, ele vendeu duzentas marmitas. E mesmo assim, no fim do mês, não sobrou dinheiro nenhum.","Tom de impacto e suspense, forte ênfase em 'não sobrou dinheiro nenhum'.")]
partes=[];t=time.time()
for txt,ins in falas:
    w,sr=m.generate_custom_voice(text=txt,language="Portuguese",speaker="Ryan",instruct=BASE+ins)
    partes+=[w[0],np.zeros(int(sr*.25),dtype=np.float32)]
sf.write('testes_voz/qwen_ryan_v2_bruto.wav',np.concatenate(partes),sr)
print(f'ok em {time.time()-t:.0f}s',flush=True)
