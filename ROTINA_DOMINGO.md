# Rotina de domingo: produzir a semana seguinte (executada por tarefa agendada)

## 0. Precisa produzir?
Calcule a próxima terça (T) a partir de hoje (fuso America/Sao_Paulo). Se `agenda.json` já tem posts com data ≥ T,
a semana já está pronta: termine dizendo "semana de T já produzida". Senão, continue.

## 1. Ambiente
`git pull` no repositório e depois `./motor/preparar_ambiente.sh`. Ele cria o link /home/user/estudio → repositório,
o .venv e baixa o modelo de voz. Sempre trabalhe em /home/user/estudio.

## 2. Roteiros (2 episódios: EP n e EP n+1)
- `n` = maior número de `episodios/epXX` + 1.
- Leia `canal/personagem.json` (bíblia, arco e elenco) e o final do último roteiro (o gancho de continuação).
- Gere 10 ideias rápidas (cenários e conflitos diferentes dos já usados) e escolha 2 que continuem o gancho e o arco.
- Escreva `episodios/epNN/roteiro.md` no MESMO formato dos roteiros existentes (cenas com Visual, Texto na tela,
  Emoção/Transição/Edição e o bloco **Narração** com marcações [PAUSA CURTA]/[PAUSA LONGA]/[ÊNFASE]/[TONALIDADE]/[RITMO]).
  - Estrutura obrigatória de 14 etapas, gancho em 5 s, 1 conceito real de empreendedorismo, erro que nasce das falhas do Carlos,
    clímax com decisão difícil e custo real, final honesto, gancho para o próximo episódio.
  - Toda conta de dinheiro com a conferência escrita no roteiro. Valores fictícios e ilustrativos.
  - Meta de duração: 10 min → cerca de 1.550 palavras de narração.
  - Revise com os princípios de `jtydhr88/screenwriting-skills` (cena vira algo, entrar tarde/sair cedo, ação > explicação)
    e `nonomnonom/storytelling` (viradas plantadas antes, emoção nascida da ação).
- Atualize `canal/personagem.json` (seção episodios) com o resumo dos 2 novos.

## 3. Vídeos
Para cada episódio:
1. `python motor/narrar_ep.py epNN` e liste os trechos por cena (texto de `build/timeline.json`).
2. Escreva `episodios/epNN/cenas.js` usando só `biblioteca/` (mesmo estilo de ep01/ep02: personagens palito, objetos no mesmo
   traço, punch-ins, slams, shake, efeitos sonoros e trilha por cena). Novos objetos vão para `biblioteca/cenarios.js`.
   Novos efeitos sonoros: `earshot make "descrição" -o sfx/nome.wav`.
3. QA antes do render: `node motor/render.js epNN --quadros t1,t2,...` (2 quadros por cena), contact sheet 4x4 a 480x270,
   corrija sobreposições e textos cortados.
4. `./motor/produzir.sh epNN` → `episodios/epNN/epNN.mp4`. Confira a duração e o volume (−14 LUFS ±1).
5. Thumbnail: adicione uma entrada em `motor/thumb.js` com o momento MAIS CHOCANTE do episódio (≤ 3 palavras grandes,
   número forte, Carlos com expressão forte) e rode `node motor/thumb.js epNN`.
6. `episodios/epNN/publicacao.json` (mesmo formato): título chocante e verdadeiro (≤ 60 caracteres), descrição com capítulos,
   tags. Depois `python motor/capitulos.py epNN <cenas que abrem capítulos>`.

## 4. Partes para TikTok/Facebook
- 1º episódio da semana: `python motor/cortes.py epNN 8` e `python motor/vertical.py epNN <número>`.
- 2º episódio da semana: `python motor/cortes.py epNN 6` e `python motor/vertical.py epNN <número>`.

## 5. Agenda (acrescente em `agenda.json`, sem mexer nos posts antigos)
- YouTube: 1º episódio na terça T às 18:00; 2º episódio na quinta (T+2) às 18:00 (rede youtube, video, titulo, texto=descrição).
- 1º episódio: partes 1–8 de terça a sexta, 12:00 e 18:00. 2º episódio: partes 1–6 de sábado a segunda, 12:00 e 18:00.
- Cada parte gera 2 itens (tiktok e facebook) com o MESMO vídeo e textos DIFERENTES:
  - tiktok: `titulo` curto e chocante (≤ 70 caracteres) + `texto` com "Parte X/N" e hashtags.
  - facebook: `texto` mais longo, com pergunta para comentários, "Parte X de N" e quando sai a próxima.
- URLs: `https://raw.githubusercontent.com/mateusestudodeia-cyber/rota-do-empreendedor/main/<caminho>`.
- Horários com fuso -03:00. Ids no formato `epNN-pX-rede` / `epNN-youtube`.

## 6. Publicar no repositório
`git add -A`, commit e `git push` na main. Confirme que um vídeo novo abre pela URL raw (HTTP 200/206).

## 7. Relatório curto
Títulos dos 2 episódios, durações, número de posts adicionados à agenda e qualquer problema.
