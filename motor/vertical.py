"""Gera as partes verticais 1080x1920 (TikTok/Reels) a partir de cortes.json. Uso: python motor/vertical.py ep01 1"""
import json,sys,subprocess,os
ep,num=sys.argv[1],sys.argv[2]; B=f'/home/user/estudio/episodios/{ep}'; os.makedirs(f'{B}/partes',exist_ok=True)
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'; partes=json.load(open(f'{B}/cortes.json')); N=len(partes)
def dt(t,y,sz,cor='white'): return f"drawtext=fontfile={F}:text='{t}':x=(w-text_w)/2:y={y}:fontsize={sz}:fontcolor={cor}"
for p in partes:
    k=p['parte']; out=f'{B}/partes/{ep}_parte{k}.mp4'
    vf=(f"[0:v]scale=1080:608,setsar=1[v];color=c=0x1E88A8:s=1080x1920:d={p['dur']}[bg];"
        f"[bg]drawbox=x=0:y=1230:w=1080:h=690:color=0xFAF7F0:t=fill[bg2];[bg2][v]overlay=0:620,"
        +",".join([dt('ROTA DO EMPREENDEDOR',250,52,'0xF6D776'),dt(f'EPISÓDIO {num}',340,84),dt(f'PARTE {k} DE {N}',450,64),
                   dt('Episódio completo no YouTube',1400,44,'0x1A1A1A'),dt('Rota do Empreendedor',1470,50,'0x1E88A8'),
                   dt('Continua na próxima parte ▸' if k<N else 'Novo episódio toda terça e quinta',1620,40,'0x555555')]))
    subprocess.run(['ffmpeg','-loglevel','error','-y','-ss',str(p['ini']),'-to',str(p['fim']),'-i',f'{B}/{ep}.mp4','-filter_complex',vf,
        '-c:v','libx264','-preset','veryfast','-crf','21','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-movflags','+faststart','-shortest',out],check=True)
    print('ok',out)
