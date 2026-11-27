import soundfile as sf,numpy as np
from kokoro_onnx import Kokoro
k=Kokoro('modelos/kokoro-v1.0.onnx','modelos/voices-v1.0.bin')
falas=[("Esse é o Carlos. Vinte e seis anos.",.95),
("Numa segunda-feira… ele foi demitido. E sabe o que ele fez? Decidiu abrir o próprio negócio!",1.0),
("No primeiro mês, ele vendeu duzentas marmitas. Duzentas! E mesmo assim… no fim do mês, não sobrou dinheiro nenhum.",.95)]
vozes={'santa':k.get_voice_style('pm_santa'),'alex_santa':.5*k.get_voice_style('pm_alex')+.5*k.get_voice_style('pm_santa')}
for nome,v in vozes.items():
    p=[]
    for txt,vel in falas:
        a,sr=k.create(txt,voice=v,speed=vel,lang='pt-br'); p+=[a,np.zeros(int(sr*.35))]
    sf.write(f'testes_voz/bruto_kokoro_{nome}.wav',np.concatenate(p),sr); print('ok',nome)
