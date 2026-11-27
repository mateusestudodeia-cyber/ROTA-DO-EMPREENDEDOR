import torch,soundfile as sf,numpy as np
from qwen_tts import Qwen3TTSModel
m=Qwen3TTSModel.from_pretrained("Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",device_map="cpu",dtype=torch.float32)
BASE="Voz masculina grave e madura, narrador brasileiro amigável, caloroso e próximo, como quem conta uma história para um amigo, sorridente, confiante e envolvente. "
falas=[("Esse é o Carlos. Vinte e seis anos.","Tom simpático e acolhedor, apresentando um amigo."),
("Numa segunda-feira, ele foi demitido… e decidiu abrir o próprio negócio.","Tom amigável e animado com a decisão dele."),
("No primeiro mês, ele vendeu duzentas marmitas. E mesmo assim, no fim do mês, não sobrou dinheiro nenhum.","Tom amigável com um toque de surpresa e curiosidade em 'não sobrou dinheiro nenhum'.")]
p=[]
for txt,ins in falas:
    w,sr=m.generate_custom_voice(text=txt,language="Portuguese",speaker="Uncle_Fu",instruct=BASE+ins); p+=[w[0],np.zeros(int(sr*.25),dtype=np.float32)]
sf.write('testes_voz/bruto_Uncle_Fu_amigavel.wav',np.concatenate(p),sr); print('ok',flush=True)
