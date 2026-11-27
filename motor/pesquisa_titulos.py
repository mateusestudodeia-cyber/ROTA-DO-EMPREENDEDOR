"""Pesquisa de títulos que 'explodiram' no nicho (lógica do HookLab: outlier = views ÷ mediana do canal).
Usa só os feeds públicos e gratuitos do YouTube (RSS). Uso: python3 motor/pesquisa_titulos.py
Saída: canal/titulos_referencia.md"""
import json,re,time,statistics,urllib.request,html,unicodedata
N=lambda s:unicodedata.normalize('NFC',s).lower()
R='/home/user/estudio'; UA={'User-Agent':'Mozilla/5.0 (pesquisa de titulos; uso educacional)'}
def get(u):
    time.sleep(1.0)  # educado com o servidor
    return urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=20).read().decode('utf-8','ignore')
ref=json.load(open(f'{R}/canal/referencias.json')); linhas=[]
for h in ref['handles']:
    try:
        pg=get(f'https://www.youtube.com/{h}'); m=re.search(r'"(?:externalId|channelId)":"(UC[\w-]{22})"',pg)
        if not m: print('sem id',h); continue
        cid=m.group(1); xml=get(f'https://www.youtube.com/feeds/videos.xml?playlist_id=UULF{cid[2:]}')
        vids=[(html.unescape(t),int(v)) for t,v in re.findall(r'<entry>.*?<title>(.*?)</title>.*?views="(\d+)"',xml,re.S)]
        if len(vids)<5: print('poucos vídeos',h); continue
        med=statistics.median(v for _,v in vids) or 1
        for t,v in vids:
            if not any(N(x) in N(t) for x in ref.get('excluir',[])): linhas.append((v/med,v,h,t))
        print('ok',h,len(vids),'vídeos, mediana',int(med))
    except Exception as e: print('erro',h,str(e)[:60])
linhas.sort(reverse=True)
out=['# Títulos que explodiram no nicho (outlier = views ÷ mediana do canal)','',f'Atualizado automaticamente. {len(linhas)} vídeos analisados.','',
     '| Outlier | Views | Canal | Título |','|---|---|---|---|']
out+=[f'| {o:.1f}× | {v:,} | {h} | {t.replace("|","/")} |'.replace(f'{v:,}',f'{v:,}'.replace(',','.')) for o,v,h,t in linhas[:40] if o>=1.5]
open(f'{R}/canal/titulos_referencia.md','w').write('\n'.join(out)+'\n'); print('salvo',min(40,sum(1 for x in linhas if x[0]>=1.5)),'títulos')
