"""Avalia títulos do YouTube pelas regras do canal (inspirado no score do yt-metadata-studio + pesquisa).
Uso: python3 motor/titulos.py episodios/epNN/titulos.txt   (um título por linha) -> ranking com nota 0-100 e dicas."""
import re,sys
DINHEIRO=r'R\$|reais|dinheiro|lucro|preju[ií]zo|fatur|d[ií]vida|quebr|perdeu|ganhou|mil\b|milh'
RISCO=r'demitid|CLT|largou|arriscou|apostou|tudo|emprego|sozinh'
NEG=r'perdeu|preju[ií]zo|quebr|no vermelho|fal[ií]u|d[ií]vida|errou|erro|golpe|nada|zero'
def nota(t):
    s,d=0,[]
    n=len(t); caps=[w for w in re.findall(r'\b[A-ZÀ-Ú]{3,}\b',t) if w not in('CLT',)]
    if n<=60: s+=20
    else: d.append(f'passa de 60 caracteres ({n})')
    if 35<=n<=60: s+=10
    else: d.append('ideal entre 35 e 60 caracteres')
    if re.search(DINHEIRO,t,re.I): s+=20
    else: d.append('falar de dinheiro (valor, lucro, prejuízo…)')
    if re.search(RISCO,t,re.I): s+=10
    else: d.append('mostrar o risco (demissão, CLT, apostou…)')
    if re.search(NEG,t,re.I): s+=15
    else: d.append('virada negativa (perdeu, prejuízo, quebrou…)')
    if 1<=len(caps)<=3: s+=10
    else: d.append('1 a 3 palavras em MAIÚSCULAS na virada')
    if '…' in t or '...' in t or '—' in t: s+=5
    else: d.append('reticências antes da virada')
    if re.search(r'\d',t): s+=10
    else: d.append('um número (valor, quantidade)')
    if re.search(r'como (resolver|ganhar|fazer)|segredo revelado|passo a passo',t,re.I): s-=10; d.append('não entregue a solução no título')
    return s,d
ts=[l.strip() for l in open(sys.argv[1],encoding='utf-8') if l.strip()]
for s,t,d in sorted(((nota(t)[0],t,nota(t)[1]) for t in ts),reverse=True):
    print(f'{s:3d}  {t}  ({len(t)} car.)'+('' if not d else '\n      dicas: '+'; '.join(d)))
