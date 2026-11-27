# OPERAÇÃO DO CANAL "ROTA DO EMPREENDEDOR" — arquivo único

> Para quem executa (sessão nova, sem histórico): **leia só este arquivo e siga-o.** Não é preciso ler conversas antigas.
> Tudo o que você precisa está aqui e neste repositório (`mateusestudodeia-cyber/rota-do-empreendedor`).
> Economize tokens: leia arquivos grandes por partes, use `rtk`/`tl-symbols` (ver `CLAUDE.md`) e responda com relatório curto.

## 0. O que fazer HOJE (decida pela data, fuso America/Sao_Paulo)
1. **Todo dia:** execute a **Seção 3 — Postagem do dia**.
2. **Se hoje for domingo:** depois da postagem, execute a **Seção 4C** (números) e a **Seção 4 — Produção da semana seguinte**, aplicando a **Seção 4B** (retenção) e a **Seção 4D** (fala) em tudo.
3. Termine com o **relatório curto** (Seção 6).

## 1. O canal (contexto mínimo)
- Canal de empreendedorismo contado em histórias. Protagonista fixo: **Carlos Reis**, bonequinho de palito (topete de 3 fios,
  cachecol azul-petróleo). Elenco, arco e episódios já feitos: `canal/personagem.json`.
- Tudo gratuito e com licença comercial. Narração: **Kokoro (voz `pm_alex`)** — decisão do usuário, não trocar.
- Episódios ficam em `episodios/epNN/` (roteiro.md, cenas.js, epNN.mp4, thumb.png, publicacao.json, partes/).

## 2. Cronograma fixo de postagem (toda semana, terça a segunda)
| Dia | YouTube (vídeo completo) | TikTok + Facebook (mesmo vídeo vertical, textos diferentes) |
|---|---|---|
| Terça | 1º episódio da semana, **18:00** | 1º ep — partes 1 (12:00) e 2 (18:00) |
| Quarta | — | 1º ep — partes 3 e 4 (12:00 / 18:00) |
| Quinta | 2º episódio da semana, **18:00** | 1º ep — partes 5 e 6 |
| Sexta | — | 1º ep — partes 7 e 8 |
| Sábado | — | 2º ep — partes 1 e 2 |
| Domingo | — | 2º ep — partes 3 e 4 |
| Segunda | — | 2º ep — partes 5 e 6 |

- 1º episódio da semana = 8 partes; 2º episódio = 6 partes. Horários sempre com fuso `-03:00`.
- Tudo o que será postado está em `agenda.json` (cada item tem `quando`, `rede`, `video`, `titulo`, `texto`).
- **Semana 1 (já pronta na agenda):** EP01 (ter 01/12 a sex 04/12) e EP02 (YouTube qui 03/12; partes sáb 05/12 a seg 07/12).
- **A partir de domingo 06/12:** todo domingo produz os 2 episódios da semana seguinte (EP03+EP04 → 08/12 a 14/12, etc.).

## 3. Postagem do dia (Buffer)
Agende no Buffer **somente** os posts de HOJE. Nunca agende dias futuros (o plano gratuito permite só 10 agendados).
1. `get_account` → `currentTime` = data de hoje. Organização e canais estão em `agenda.json` (`organizacao`, `canais`).
2. **Não leia `agenda.json` inteiro.** Rode `python3 motor/agenda_hoje.py` (mostra só os posts de hoje, com organização
   e canais) e use os itens cujo `quando` ainda está no futuro.
   Se não houver nenhum, registre "nada para hoje".
3. Evite duplicidade: `list_posts` da organização; pule itens que já tenham post no mesmo canal e no mesmo horário.
4. Para cada item, `create_post` com `mode: customScheduled`, `dueAt: quando`, `schedulingType: automatic`,
   `channelId: canais[rede]`, `assets: [{video:{url: video}}]`, `text: texto` e:
   - youtube: `metadata.youtube = {type:'regularVideo', title: titulo, categoryId:'27', privacy:'public', madeForKids:false}`
   - facebook: `metadata.facebook = {type: facebook_tipo}` ('reel' até 90 s; 'post' acima disso)
   - tiktok: `metadata.tiktok = {title: titulo, isAiGenerated: true}` (o usuário pediu a marcação de IA)
5. Não edite nem apague posts existentes. Não poste nada fora da agenda. (Thumbnail do YouTube o usuário coloca à mão.)

## 4. Produção da semana seguinte (somente aos domingos)
### 4.0 Precisa produzir?
Próxima terça = T. Se `agenda.json` já tem itens com data ≥ T, registre "semana de T já produzida" e pule a Seção 4.

### 4.1 Ambiente
`git pull` e `./motor/preparar_ambiente.sh` (cria o link `/home/user/estudio` → repositório, o `.venv`, baixa o Kokoro do GitHub).
Trabalhe sempre em `/home/user/estudio`. Playwright e FFmpeg já vêm instalados.

### 4.2 Roteiros (EP n e EP n+1; n = maior `episodios/epXX` + 1)
- Leia `canal/personagem.json` e só o **final** do último `roteiro.md` (o gancho de continuação).
- Pense em 10 ideias rápidas (cenários/conflitos novos) e escolha 2 que continuem o gancho e o arco do Carlos.
- Escreva `episodios/epNN/roteiro.md` no **mesmo formato** de `episodios/ep02/roteiro.md` (cenas com Visual, Texto na tela,
  Emoção/Transição/Edição e o bloco **Narração** com [PAUSA CURTA]/[PAUSA LONGA]/[PAUSA DRAMÁTICA]/[ÊNFASE]/[TONALIDADE: …]/[RITMO: ACELERADO|NORMAL|LENTO]), seguindo a Seção 4D.
- Estrutura obrigatória (14 etapas): gancho, situação inicial, problema, primeira tentativa, obstáculo, erro, consequência,
  descoberta, virada, nova tentativa, clímax, resolução, lição prática, gancho para o próximo episódio.
- 1 conceito real de empreendedorismo ensinado pela história; o erro nasce das falhas do Carlos; clímax com decisão difícil
  e custo real; final honesto. Toda conta de dinheiro com a conferência escrita. Valores fictícios e ilustrativos.
- **CLAREZA (obrigatório):**
  1. Primeiros 20 s, nesta ordem: "Esse é o Carlos…", o que ele quer, o que está em jogo, a pergunta do episódio.
  2. Ordem cronológica; flashback só se essencial, curto e anunciado ("Doze anos antes…").
  3. Uma ideia por cena; cada cena diz onde/quando estamos e o que o Carlos quer.
  4. Cenas ligadas em voz alta: "por isso…", "então…", "mas…".
  5. Nada solto: personagem, objeto ou número explicado na hora em que aparece; no máximo 1 número por frase.
  6. A cada ~2 min o narrador relembra onde estamos ("Lembra: …").
  7. Teste: cada cena cabe em "o Carlos quer X, mas Y, então Z".
- Meta: ~1.600 palavras de narração (≈ 9–10 min no modo dinâmico).
- Atualize `canal/personagem.json` (seção `episodios`) com o resumo dos 2 novos.

### 4.3 Vídeos (para cada episódio)
1. `python motor/narrar_ep.py epNN` (Kokoro). Liste os trechos por cena a partir de `build/timeline.json`.
2. Escreva `episodios/epNN/cenas.js` (veja `episodios/ep02/cenas.js` como modelo; use `T(c,i)` para sincronizar com a fala).
   Use só `biblioteca/` (personagens.js, cenarios.js, objetos.js, **efeitos.js**). Novos objetos → `biblioteca/cenarios.js`.
   Novo efeito sonoro: `earshot make "descrição" -o sfx/nome.wav`.
   **DINAMISMO (obrigatório, público com atenção curta):**
   - Algo novo na tela a cada 1,5–2,5 s (corte, zoom, objeto, troca de expressão/pose). Nada parado.
   - Câmera viva (punch-in nas frases fortes, pans, zoom-out para revelar). O motor já faz um punch-in automático por frase.
   - Personagens sempre reagindo: expressão e gesto mudam a cada frase; andam, pulam, apontam.
   - Palavra-chave de cada frase na tela (slam, digitação, `textoVivo`).
   - Inserts rápidos (0,5–1 s) do que é dito. Quebra de padrão a cada 20–30 s (freeze P&B, flash, glitch, cor).
   - Transições curtas e efeito sonoro em TODA ação.
   - **Mínimo 2 efeitos de `biblioteca/efeitos.js` por cena**, ligados à fala: dinheiro entrando → `chuvaDinheiro`;
     perda/choque → `impacto`+`onda`+`glitch`; conquista → `confete`+`brilho`; descoberta → `reacao('!')`/`reacao('ideia')`;
     dúvida → `reacao('?')`; nervoso → `reacao('suor')`; carinho → `reacao('coracao')`; briga → `reacao('raiva')`;
     número/detalhe → `circulo`/`seta`; pressa/tempo → `velocidade`.
   - O dinamismo mostra o que a narração diz — nunca coisas soltas.
   **ESTILO E EDIÇÃO — checklist completo (tudo já combinado com o usuário):**
   - Tudo no traço palito: Carlos, elenco, personagens novos, objetos e cenários (contorno preto grosso, fundo creme,
     1 cor de destaque). Nada de foto, nada de outro estilo.
   - Personagem que aparece pela primeira vez entra com **plaquinha do nome** ("DONA LÚCIA · MÃE").
   - Um elemento novo por frase, entrando na hora em que a frase fala dele (nada aparece antes da hora nem tudo junto).
   - Números importantes em texto grande com slam + tremida de tela; perdas em vermelho, ganhos em verde.
   - Virada da história: freeze em preto e branco + arranhão de disco (`risco`) ou glitch.
   - Flashback: filtro sépia + cartão "X ANOS ANTES" (curto e anunciado).
   - Trilha por emoção da cena (`leve`, `leve_lenta`, `tensa`, `pad`) e **silêncio** no momento de maior tensão do clímax
     (`silencios` na cena). A música abaixa sozinha sob a voz (mixer).
   - Legendas automáticas embaixo; trechos marcados com [ÊNFASE] saem em amarelo.
   - Textos e balões nunca cortados na borda nem cobrindo rostos (confira na contact sheet).
   - Final de todo episódio: cartão "PRÓXIMO EP." no canto, com o dia (terça/quinta).
3. QA antes do render: `node motor/render.js epNN --quadros t1,t2,…` (2 quadros por cena) → contact sheet 4x4 a 480x270
   (`ffmpeg … tile=4x4`). Olhe só a contact sheet; corrija sobreposições e textos cortados.
4. `./motor/produzir.sh epNN` → `episodios/epNN/epNN.mp4`. Confira duração e volume (−14 LUFS ±1).
5. Thumbnail: nova entrada em `motor/thumb.js`; `node motor/thumb.js epNN`. Regras (pesquisa: emoção forte na thumb
   ↑ views — J. Business Research 2024; rostos e destaque do fundo são comuns nos vídeos que mais explodem — vidIQ 2026):
   - O momento MAIS CHOCANTE e verdadeiro do episódio, o mesmo da virada do título (título e thumb se completam, não repetem).
   - **Carlos grande, com expressão extrema** (desespero, choque, raiva, euforia), ocupando ~40% da imagem.
   - **Um número em reais** grande (perda em vermelho, ganho em verde) e **no máximo 3 palavras**.
   - **Contraste:** fundo simples e de cor oposta ao sujeito; o Carlos e o número precisam "saltar" mesmo em miniatura.
     O `thumb.js` gera também `thumb_mini.jpg` (320x180, tamanho real no celular): olhe só ela; se não der para
     entender em 1 segundo, simplifique.
   - **Lacuna:** mostre o problema (o "o quê"), nunca a solução (o "porquê").
   - 1 elemento de contexto no máximo (marmita, celular, conta), nada de poluição visual.
6. `episodios/epNN/publicacao.json` no formato do ep02: título, descrição com capítulos e tags.
   Depois `python motor/capitulos.py epNN <cenas que abrem capítulos>`.
   **TÍTULO DO YOUTUBE (regra do usuário):** no máximo **60 caracteres** (confira com `python3 -c "print(len('título'))"`).
   O título precisa: dar um **choque**, criar **curiosidade**, mostrar que aquilo é de **extrema importância**,
   **chamar a atenção** e ser **interessante de ver**. Escreva 10 opções, dê nota de 0 a 10 em cada um desses 5 critérios
   e escolha a de maior soma. **Ferramenta:** escreva as 10 opções em `episodios/epNN/titulos.txt` (uma por linha) e rode
   `python3 motor/titulos.py episodios/epNN/titulos.txt` (nota 0–100 pelas regras do canal, inspirada no score do
   yt-metadata-studio). Escolha uma opção com nota ≥ 85 que seja fiel ao episódio e use os padrões de `titulos_referencia.md`. Use o fato mais forte e verdadeiro do episódio (número, perda, virada); nada de promessa
   falsa. Tom **emocionante**: virada, contraste ou perda que faz a pessoa sentir algo.
   **MAIÚSCULAS ESTRATÉGICAS:** 1 a 3 palavras em CAIXA ALTA, sempre na parte que dá o choque ou a virada
   (nunca o título inteiro). Use reticências "…" para criar suspense antes da virada.
   **DINHEIRO E RISCO NO TÍTULO (regra do usuário):** o título fala de dinheiro (valor em reais, lucro, prejuízo,
   faturamento, dívida) e/ou do risco que o Carlos correu (foi demitido, largou a CLT, arriscou o acerto, apostou tudo).
   Use o fato do episódio a nosso favor: "quem arriscou" + "o que aconteceu com o dinheiro".
   **FÓRMULA BASEADA EM PESQUISA (positivo + virada negativa):** o que mais atrai é intensidade emocional, contraste e
   informação incompleta. Estrutura: [desejo/ganho/risco positivo] + "…" + [virada negativa: perda, erro, problema],
   sem revelar o porquê (o porquê é o vídeo). Palavras de perda/tristeza ("perdeu", "prejuízo", "quebrou", "no vermelho")
   puxam mais clique que palavras de raiva ou medo. Valor em reais sempre que possível. Nunca entregue a solução no título.
   Fontes: Robertson et al., Nature Human Behaviour 2023 (Upworthy, 105 mil manchetes: palavra negativa ↑ cliques);
   Journal of Business Research 2024 e Internet Research 2020 (YouTube: emoção intensa ↑ views; título informativo demais ↓).
   Exemplos aprovados: "DEMITIDO, arriscou R$ 3.100 num negócio… e PERDEU DINHEIRO" (57) ·
   "Faturou R$ 5.700 numa MANHÃ… e PERDEU DINHEIRO no mesmo dia" (59).

### 4.4 Partes verticais (TikTok/Facebook)
- 1º ep da semana: `python motor/cortes.py epNN 8` e `python motor/vertical.py epNN <número do ep>`.
- 2º ep da semana: `python motor/cortes.py epNN 6 96` e `python motor/vertical.py epNN <número do ep>`.

### 4.5 Agenda (acrescente em `agenda.json`, sem mexer nos itens antigos)
- YouTube: 1º ep na terça T 18:00; 2º ep na quinta T+2 18:00 (`texto` = descrição; `titulo` do publicacao.json).
- Partes conforme a Seção 2. Cada parte gera 2 itens com o MESMO vídeo e textos DIFERENTES, escritos a partir do que
  acontece naquela parte (ver `cortes.json`):
  - tiktok: `titulo` curto e chocante (≤ 70 caracteres) + `texto` com "Parte X/N" e hashtags.
  - facebook: `texto` mais longo, com pergunta para comentários, "Parte X de N" e quando sai a próxima;
    `facebook_tipo` = 'reel' se a parte tiver até 90 s, senão 'post'.
- URL dos vídeos: `https://raw.githubusercontent.com/mateusestudodeia-cyber/rota-do-empreendedor/main/<caminho>`.
- Ids: `epNN-youtube`, `epNN-pX-tiktok`, `epNN-pX-facebook`.

### 4.6 Publicar
`git add -A`, commit e `git push` na `main`. Confirme que um vídeo novo responde pela URL raw (HTTP 200/206).

## 4B. Retenção e viralização (psicologia da atenção — aplicar em TODO roteiro, edição, título, thumb e parte)
Base: lacuna de curiosidade (Loewenstein: a mente quer fechar uma pergunta aberta), ciclos abertos (efeito Zeigarnik),
novidade/surpresa prendem a atenção, emoção aumenta memória e compartilhamento, e os primeiros 15–30 s decidem quem fica.
Nada disso garante viralizar — aumenta a probabilidade. A prova real são as métricas (ver 4C).
1. **Gancho em 3 camadas nos primeiros 5 s:** fala (choque ou pergunta), imagem (algo se movendo/expressão forte) e
   texto na tela (a frase-choque). Sem logo, sem "olá, pessoal", sem introdução.
2. **Pergunta central do episódio dita até 20 s** ("pra onde foi o dinheiro?") e respondida só no final.
3. **Ciclos abertos em cadeia:** antes de fechar uma pergunta, abra a próxima. A cada 60–90 s um **re-gancho** falado
   ("mas o pior ainda estava por vir…", "e foi aí que tudo mudou").
4. **Ciclos de gancho → entrega:** toda promessa feita é cumprida dentro do vídeo (promessa sem entrega derruba a retenção).
5. **Emoção alta e variada:** alterne tensão e alívio (montanha-russa). Pelo menos 1 momento de vergonha/medo,
   1 de raiva justa ou injustiça, 1 de alívio/vitória por episódio. Rostos com expressão forte nos picos.
6. **Stakes concretos e pessoais:** dinheiro com número, a família do Carlos, o medo de virar o pai. Nunca abstrato.
7. **Identificação:** situações que o público vive (CLT, demissão, fiado, preço, dívida, família). O espectador deve pensar
   "isso é comigo".
8. **Surpresa a cada cena:** algo que o público não previu (erro de previsão). Evite o óbvio; plante pistas antes.
9. **Ritmo:** frases curtas na narração; corte ou mudança visual a cada 1,5–2,5 s; nenhuma pausa sem imagem nova.
10. **Final que puxa o próximo:** cliffhanger forte nos últimos 15 s + cartão do próximo episódio.
11. **Título + thumbnail coerentes** com o primeiro minuto (o que o título promete aparece logo no começo).
12. **Partes de TikTok/Facebook:** escolha os pontos de corte num **momento de suspense** (pergunta aberta ou virada),
    ajustando `cortes.json` em até ±15 s do corte automático e rodando `vertical.py` de novo. A parte deve começar com
    uma frase que funcione sozinha. Legenda das partes: abra com o choque daquela parte, termine com uma pergunta.
13. **Comentários:** cada episódio termina com uma pergunta concreta para o público responder (gera engajamento).

## 4D. Fala que prende (ritmo, pausas e clareza da narração)
A narração é um instrumento de atenção. Escreva o texto para o OUVIDO, não para leitura.
**Clareza**
1. Frases curtas: ideal ≤ 18 palavras por trecho entre pausas (o `narrar_ep.py` avisa acima de 22). Uma ideia por frase.
2. Ordem direta (quem faz o quê). Evite frases intercaladas, "o qual", "cujo", voz passiva.
3. Palavras do dia a dia, como se fala no Brasil ("pra", "tá", "a gente"). Nada de jargão sem explicar na hora.
4. Números sempre por extenso e arredondados quando der ("quase dois mil e quinhentos"); nunca "R$" ou siglas no texto falado.
5. A palavra mais importante vai no **fim da frase** (é onde o ouvido presta atenção): "…e no fim do mês, sobrou: **nada**."
6. Evite palavras estrangeiras e trava-línguas (o Kokoro pronuncia mal); troque por equivalentes em português.
**Ritmo (variação = atenção; voz uniforme = sono)**
7. Alterne: trechos de ação com `[RITMO: ACELERADO]` (fala mais rápida), explicações com `[RITMO: NORMAL]`,
   emoção e revelação com `[RITMO: LENTO]`. Nunca mais de ~40 s no mesmo ritmo.
8. `[TONALIDADE: TENSA]` deixa a fala um pouco mais contida; `[TONALIDADE: ÍNTIMA]` mais devagar e próxima;
   `[TONALIDADE: INSPIRADORA]` um pouco mais viva. `[ÊNFASE]` desacelera a frase que precisa pesar.
9. Sequências em três batidas ("Gás. Embalagem. Fiado.") criam ritmo e são fáceis de lembrar.
**Pausas (a pausa cria a expectativa; a revelação vem logo depois)**
10. `[PAUSA CURTA]` (0,3 s) entre frases ligadas; `[PAUSA LONGA]` (0,7 s) quando muda o assunto ou para deixar algo pesar.
11. `[PAUSA DRAMÁTICA]` (1 s) **imediatamente antes** de uma revelação, número chocante ou virada — e no máximo
    3 por episódio (se usar demais, perde o efeito).
12. Pergunta ao público + pausa antes da resposta ("Sabe quanto sobrou? [PAUSA DRAMÁTICA] Nada.") — puxa a atenção de volta.
13. Nunca uma pausa "vazia": durante toda pausa a imagem muda ou algo se mexe (ver 4.3).
**Pontuação que o Kokoro entende**
14. Ponto final = fim firme; vírgula = respiração curta; "…" = suspense; "?" = entonação de pergunta; "!" = energia.
    Use isso de propósito: a pontuação é a direção de voz do Kokoro.

## 4C. Aprender com os números (todo domingo, antes de escrever os roteiros)
- Rode `python3 motor/pesquisa_titulos.py` (lógica do HookLab: vídeos que explodiram em canais BR de negócios/dinheiro,
  outlier = views ÷ mediana do canal, só feeds públicos e gratuitos do YouTube). Leia a tabela de `canal/titulos_referencia.md`
  e anote 3 padrões de título/tema que estão funcionando (nunca copie títulos de outros canais).
- Se o Buffer permitir, consulte as métricas da semana anterior (`get_aggregated_post_metrics` e posts com mais alcance).
- Registre em `canal/aprendizados.md` (curto): o que teve mais alcance/engajamento e por quê (tema, título, gancho).
- Use isso para escolher os temas, títulos e ganchos da nova semana. Se não houver métricas, registre "sem dados".

## 5. Regras gerais
- Nada pago. Nada inventado como fato real (histórias e valores são fictícios e ilustrativos).
- Não alterar episódios já publicados. Não mexer em posts já agendados.
- Se algo falhar, não improvise outra solução arriscada: registre no relatório o que falhou e onde.

## 6. Relatório curto (no fim de toda execução)
- Postagem: o que foi agendado hoje (rede, horário) ou "nada para hoje"; erros.
- Domingo: títulos dos 2 episódios, durações, nº de itens adicionados à agenda; problemas.
