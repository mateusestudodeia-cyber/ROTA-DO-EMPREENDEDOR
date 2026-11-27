# OPERAÇÃO DO CANAL "ROTA DO EMPREENDEDOR" — arquivo único

> Para quem executa (sessão nova, sem histórico): **leia só este arquivo e siga-o.** Não é preciso ler conversas antigas.
> Tudo o que você precisa está aqui e neste repositório (`mateusestudodeia-cyber/rota-do-empreendedor`).
> Economize tokens: leia arquivos grandes por partes, use `rtk`/`tl-symbols` (ver `CLAUDE.md`) e responda com relatório curto.

## 0. O que fazer HOJE (decida pela data, fuso America/Sao_Paulo)
1. **Todo dia:** execute a **Seção 3 — Postagem do dia**.
2. **Se hoje for domingo:** depois da postagem, execute a **Seção 4 — Produção da semana seguinte**.
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
2. Em `agenda.json`, pegue os itens cujo `quando` começa com a data de hoje e ainda está no futuro.
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
  Emoção/Transição/Edição e o bloco **Narração** com [PAUSA CURTA]/[PAUSA LONGA]/[ÊNFASE]/[TONALIDADE: …]/[RITMO: …]).
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
5. Thumbnail: nova entrada em `motor/thumb.js` com o momento MAIS CHOCANTE e verdadeiro do episódio (≤ 3 palavras grandes,
   número forte, Carlos com expressão forte); `node motor/thumb.js epNN`.
6. `episodios/epNN/publicacao.json` no formato do ep02: título, descrição com capítulos e tags.
   Depois `python motor/capitulos.py epNN <cenas que abrem capítulos>`.
   **TÍTULO DO YOUTUBE (regra do usuário):** no máximo **60 caracteres** (confira com `python3 -c "print(len('título'))"`).
   O título precisa: dar um **choque**, criar **curiosidade**, mostrar que aquilo é de **extrema importância**,
   **chamar a atenção** e ser **interessante de ver**. Escreva 10 opções, dê nota de 0 a 10 em cada um desses 5 critérios
   e escolha a de maior soma. Use o fato mais forte e verdadeiro do episódio (número, perda, virada); nada de promessa
   falsa. Tom **emocionante**: virada, contraste ou perda que faz a pessoa sentir algo.
   **MAIÚSCULAS ESTRATÉGICAS:** 1 a 3 palavras em CAIXA ALTA, sempre na parte que dá o choque ou a virada
   (nunca o título inteiro). Use reticências "…" para criar suspense antes da virada.
   Exemplos aprovados: "Demitido, vendeu 200 marmitas e PAGOU PRA TRABALHAR" (51) ·
   "Ganhou R$ 5.700 numa MANHÃ… e terminou NO VERMELHO" (50).

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

## 5. Regras gerais
- Nada pago. Nada inventado como fato real (histórias e valores são fictícios e ilustrativos).
- Não alterar episódios já publicados. Não mexer em posts já agendados.
- Se algo falhar, não improvise outra solução arriscada: registre no relatório o que falhou e onde.

## 6. Relatório curto (no fim de toda execução)
- Postagem: o que foi agendado hoje (rede, horário) ou "nada para hoje"; erros.
- Domingo: títulos dos 2 episódios, durações, nº de itens adicionados à agenda; problemas.
