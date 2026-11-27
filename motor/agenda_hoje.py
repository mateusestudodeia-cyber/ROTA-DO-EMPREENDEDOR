"""Mostra só os posts de uma data (padrão: hoje em São Paulo), para não ler agenda.json inteiro.
Uso: python3 motor/agenda_hoje.py [AAAA-MM-DD]"""
import json,sys,datetime,zoneinfo
d=sys.argv[1] if len(sys.argv)>1 else datetime.datetime.now(zoneinfo.ZoneInfo('America/Sao_Paulo')).date().isoformat()
ag=json.load(open('/home/user/rota-do-empreendedor/agenda.json'))
itens=[p for p in ag['posts'] if p['quando'].startswith(d)]
print(json.dumps({'data':d,'organizacao':ag['organizacao'],'canais':ag['canais'],'posts':itens},ensure_ascii=False,indent=1))
