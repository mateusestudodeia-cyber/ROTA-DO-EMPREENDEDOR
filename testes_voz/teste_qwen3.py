import torch,soundfile as sf,numpy as np
from qwen_tts import Qwen3TTSModel
m=Qwen3TTSModel.from_pretrained("Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",device_map="cpu",dtype=torch.float32)
BASE="Voz masculina grave e madura, homem de 40 anos, narrador brasileiro marcante e confiante, fala firme e dinâmica. "
falas=[("Esse é o Carlos. Vinte e seis anos.","Tom firme, apresentando o protagonista."),
("Numa segunda-feira, ele foi demitido… e decidiu abrir o próprio negócio.","Tom sério e decidido."),
("No primeiro mês, ele vendeu duzentas marmitas. E mesmo assim, no fim do mês, não sobrou dinheiro nenhum.","Tom de impacto, ênfase em 'não sobrou dinheiro nenhum'.")]
for spk in ["Uncle_Fu","Aiden","Ryan"]:
    p=[]
    for txt,ins in falas:
        w,sr=m.generate_custom_voice(text=txt,language="Portuguese",speaker=spk,instruct=BASE+ins); p+=[w[0],np.zeros(int(sr*.25),dtype=np.float32)]
    sf.write(f'testes_voz/bruto_{spk}.wav',np.concatenate(p),sr); print('ok',spk,flush=True)
