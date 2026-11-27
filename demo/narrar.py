import soundfile as sf, sys, json
from kokoro_onnx import Kokoro
k=Kokoro("modelos/kokoro-v1.0.onnx","modelos/voices-v1.0.bin")
falas=json.load(open(sys.argv[1]))
out={}
for i,(voz,vel,txt) in enumerate(falas):
    a,sr=k.create(txt,voice=voz,speed=vel,lang="pt-br")
    p=f"demo/audio/fala_{i:02d}.wav"; sf.write(p,a,sr); out[p]=round(len(a)/sr,2)
print(json.dumps(out,indent=0))
