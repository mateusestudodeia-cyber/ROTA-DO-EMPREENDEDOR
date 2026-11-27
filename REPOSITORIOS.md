# Repositórios do Estúdio — lista final

Verificado em 27/11/2026, lendo o LICENSE e o README de cada repositório.
Restrições do projeto: **sem GPU**, **sem custo** e **uso comercial permitido**.

Legenda: ✅ usar · ⚠️ usar com condição · ❌ fora (motivo na tabela)

---

## 1. Cérebro e roteiro

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `ollama/ollama` | MIT | ✅ | Rodar modelos de linguagem no próprio computador para rascunhos, variações, resumos e as 10 ideias iniciais. Usar o modelo `qwen2.5:7b` (Apache 2.0), que roda em CPU com 16 GB de RAM, devagar. **Evitar** `qwen2.5:3b`, que tem licença própria restrita. |
| `KKenny0/script-weaver` | MIT (declarada no README; não há arquivo LICENSE) | ⚠️ | Transformar premissa em roteiro, storyboard e prompts por cena. Aceita endpoint compatível com OpenAI, então dá para ligar no Ollama, de graça. Sem o Ollama, pede chave de API paga. |
| `UnderleveledBuilder/awesome-story-skills` | Licença conflitante | ❌ | Não usar nem como base de código. |

## 2. Vídeo por código (renderização)

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `heygen-com/hyperframes` | Apache 2.0 | ✅ **principal** | Transformar HTML, CSS, JS e SVG em MP4. Roda em CPU com navegador headless. Os desenhos do Caio já são SVG, então encaixam direto. Tem skill para o Claude Code (`npx skills add heygen-com/hyperframes`). **Não usar** o plano Pro do Studio (US$ 25/mês): só o framework gratuito. |
| `remotion-dev/remotion` | Remotion License (própria) | ⚠️ | Vídeo com React: templates de cena, legendas animadas, gráficos. Gratuito, **inclusive para uso comercial**, para pessoa física e empresas com até 3 funcionários. Se o negócio passar disso, exige licença paga. Não é código aberto no sentido oficial. |
| `redotvideo/revideo` | MIT | ⚠️ reserva | Alternativa ao Hyperframes, em TypeScript. Último commit em jul/2026, pouco ativo. Manter só como plano B. |
| `motion-canvas/motion-canvas` | MIT | ⚠️ reserva | Animações com código. Redundante se usarmos Hyperframes + Remotion. |
| `ManimCommunity/manim` | MIT | ✅ | Gráficos e explicações visuais: margem de lucro, fluxo de caixa, curva de custo. |

## 3. Montagem e exportação

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `FFmpeg/FFmpeg` | LGPL/GPL | ✅ | Juntar vídeo, narração e música, ajustar volume, queimar legenda e exportar o MP4 final. Já instalado aqui. |
| `Zulko/moviepy` | MIT | ✅ | Montagem automatizada em Python quando o FFmpeg puro ficar complicado. |

## 4. Narração

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `hexgrad/kokoro` | Apache 2.0 | ✅ **principal** | Narração com vozes em português brasileiro. Roda em CPU. |
| `rhasspy/piper` | MIT | ⚠️ | Voz leve, de reserva. **Verificar antes de usar:** salvo engano, o projeto foi arquivado e continuou em outro repositório sob GPL. |

## 5. Legendas

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `SYSTRAN/faster-whisper` | MIT | ✅ | Transcrever a narração, gerar legendas com tempo exato e conferir se a voz falou o roteiro certo. Roda em CPU. |

## 6. Revisão de qualidade

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `QwenLM/Qwen2.5-VL` | Apache 2.0 (7B) | ⚠️ | Revisar de 8 a 12 quadros do vídeo pelo Ollama (`qwen2.5vl:7b`). Em CPU leva alguns minutos por análise. **Não usar o 3B**, que tem licença restrita. |
| `Netflix/vmaf` | BSD-2-Clause-Patent | ✅ | Medir a perda de qualidade da compressão, comparando o arquivo final com o master sem compressão. |

## 7. Thumbnail

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| Código próprio (SVG → PNG) | — | ✅ **principal** | Thumbnail no mesmo estilo do personagem, gerada por código e renderizada no Playwright ou no Hyperframes. Custo zero, sem GPU. |
| `alexanderthurn/free-youtube-thumbnail-generator` | MIT (declarada no README) | ✅ | Editor no navegador para ajuste manual de texto e composição. |
| `QwenLM/Qwen-Image` | Apache 2.0 | ❌ | Exige GPU. |
| `Likhithsai2580/yt_thumbnail_creator` | MIT | ❌ | Usa Stable Diffusion 3, que exige GPU ou API paga. |
| `empowerment-ai/thumbforge` | MIT | ❌ | Depende de chave de API externa (OpenRouter ou Gemini). |
| `manuarora700/youtube-thumbnail-generator` | MIT | ❌ | Depende de chave da API do Gemini. |
| `rodrigo-brito/thumbnail` | MIT | ⚠️ | Linha de comando simples, mas sem atualização desde 2020. Só como referência. |

## 8. Título e metadados

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `Florian-Peters/yt-metadata-studio` | MIT | ✅ | Gerar título, descrição, hashtags e texto de thumbnail. Roda no navegador, sem login e sem API paga. |
| `Samin12/hooklab` | MIT | ⚠️ | Títulos baseados em vídeos que performaram acima da média no nicho. Usa o Claude Code (gasta o seu plano) e chave da YouTube Data API, que é gratuita dentro da cota. |
| `dtcrout/yt-title-generator` | MIT | ❌ | Abandonado desde 2019. |

## 9. Publicação

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `googleapis/google-api-python-client` | Apache 2.0 | ✅ | Upload, agendamento, thumbnail e metadados pela YouTube Data API. Precisa de OAuth da sua conta. |
| `social-media-skills/youtube-skill` | MIT | ✅ | Skill para o Claude Code: monta o pacote (título, descrição, tags, capítulos) e faz o upload. |

## Fora da lista por decisão anterior

| Ferramenta | Motivo |
|---|---|
| F5-TTS | Pesos com licença não comercial (CC-BY-NC). |
| Fish Speech | Limite de receita na licença comercial. |
| Wan 2.2, AnimateDiff, StoryDiffusion | Exigem GPU. |

## Lacuna: música

Nenhum repositório da lista resolve a trilha sonora. É preciso escolher uma fonte de músicas com licença CC0 ou royalty-free com uso comercial e guardar o comprovante da licença de cada faixa.

---

## Pipeline final (tudo em CPU)

```text
Ollama (qwen2.5:7b)          → 10 ideias, rascunhos, variações
script-weaver + Ollama       → roteiro e storyboard
Claude                       → versão final do roteiro e revisão (só resumos)
Kokoro                       → narração pt-BR
faster-whisper               → legendas com tempo
Hyperframes                  → render das cenas (SVG/HTML do Caio)
Remotion                     → templates React e legendas animadas (opcional)
Manim                        → gráficos de conceito
FFmpeg / MoviePy             → montagem e MP4 final
Qwen2.5-VL 7B (Ollama)       → revisão de 8–12 quadros
VMAF                         → qualidade técnica
SVG próprio → PNG            → thumbnail
yt-metadata-studio / hooklab → títulos e metadados
google-api-python-client     → publicação agendada
```

---

# Adendo (27/11/2026): edição dinâmica, som e roteirização

Verificados um a um (licença + README). Os já instalados e testados aqui estão marcados com 🔧.

## 10. Narração — instalação que funciona aqui

| Item | Licença | Status | Observação |
|---|---|---|---|
| `thewh1teagle/kokoro-onnx` + modelo Kokoro-82M | MIT / Apache 2.0 | ✅ 🔧 | Mesma voz do Kokoro, em versão ONNX baixada do GitHub (o Hugging Face é bloqueado neste ambiente). Voz `pm_alex` em pt-BR. Gera 12 s de fala em cerca de 5 s, só no processador. |
| faster-whisper | MIT | ⚠️ | Os modelos ficam no Hugging Face, bloqueado aqui. Por enquanto as legendas saem do texto do roteiro com tempos conhecidos. |

## 11. Motion graphics e ritmo

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `GovinduSasanka/opus-motion-library` | MIT | ✅ | 616 animações e 97 transições para Remotion/React. Referência de transições, títulos e gráficos. Usar redesenhando no traço do Carlos. |
| `Yuan-ManX/open-motion` | MIT | ⚠️ referência | Motor de motion graphics na web. Redundante com Hyperframes e Remotion. |
| `beast-ofcourse/awesome-motion-graphics` | MIT | ⚠️ referência | Lista de recursos gratuitos. Conferir a licença de cada item antes de usar. |
| `B-EtterDigital/C0effectcraft` | Apache 2.0 | ⚠️ | Programa de desktop parecido com o After Effects. Bom para ajuste manual, não entra no pipeline automático. |
| `2boysfromtown/hyperframes-motion` | — | ❌ | **Não existe** ou não é público: o clone falhou. |

## 12. Efeitos sonoros

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `Leonxlnx/earshot` | MIT | ✅ 🔧 **principal** | Gera efeitos a partir de uma descrição em palavras, com 922 sons sintetizados no processador, sem GPU e sem internet. Já gerou: whoosh, impacto, pop, caixa registradora, tique, arranhão de disco, papel, moeda, slam de título e ding. |
| `maximilianfeix/plinkfx` | MIT (código) / CC0 (sons) | ✅ | 274 efeitos de jogo (moedas, cliques, hits) em código, para sons de interface e cartoon. |
| `KilledByAPixel/ZzFX` | MIT | ✅ | Gerador minúsculo de efeitos em JS, que roda dentro da própria cena. |
| `pepperonas/sound-effects` | MIT | ✅ | Efeitos e samples sintetizados em Python puro. |
| `ISHAAN10082/SoundScape` | **sem arquivo LICENSE** | ❌ | Sem licença não pode ser usado, e ainda exige GPU. |
| `HamSanders/soundbox` | MIT | ❌ | Exige GPU. |

## 13. Música de fundo

| Item | Licença | Status | Para que usar |
|---|---|---|---|
| Trilha própria gerada por código (`musica/compor.py`) | nossa | ✅ 🔧 | Duas faixas originais, uma leve e uma tensa, sem risco de direito autoral. |
| `fiehrfly/muses` | CC0 | ✅ | Índice de bibliotecas de música livre, com notas de licença. Guardar o comprovante de cada faixa usada. |
| `sanghyoLe/cc0-library` | MIT | ✅ | Busca só material CC0 em 17 fontes, incluindo música e áudio, mostrando como o CC0 foi verificado. |

## 14. Roteiro e storytelling

| Repositório | Licença | Status | Para que usar |
|---|---|---|---|
| `jtydhr88/screenwriting-skills` | MIT | ✅ | 27 skills de roteiro (Save the Cat, McKee, beats, arcos) para estruturar cada episódio. |
| `dungnotnull/plot-screenplay-structure-analyzer-agent-skill` | MIT | ✅ | Revisão do roteiro: nota de estrutura, ritmo e arco do Carlos antes de produzir. |
| `nonomnonom/storytelling` | MIT | ✅ | Diagnosticar e reescrever cenas fracas. |
| `e06084/claude-screenwriting` | MIT | ✅ | Base de dramaturgia (Vogler, McKee, Save the Cat). O Obsidian é opcional. |
| `danjdewhurst/story-skills` | MIT | ⚠️ | Pensado para livros. Útil para a ficha de personagens e para o mundo da série. |
| `KKenny0/script-weaver` | MIT (README) | ✅ | Premissa → roteiro → storyboard, ligado ao Ollama. |
| `method-production-suite/method-storyteller` | Apache 2.0 | ⚠️ | Aplicativo de roteiro para você editar à mão, se quiser. |
| `FuturizeRush/awesome-ai-story-video-skills` | MIT | ⚠️ referência | Lista de ferramentas. |
| `ronisarkarexe/story-spark-ai` | MIT | ❌ | Depende da API do Gemini. |
| `Tonyhrule/StoryGPT` | MIT | ❌ | Depende da API da OpenAI (paga). |
| `IndieAISmith/ai-story-pipeline` | **sem arquivo LICENSE** | ❌ | Sem licença; depende de Groq e GPT-4o. |
| `t0ffe/storygen-interactive` | **sem arquivo LICENSE** | ❌ | Sem licença; usa Stable Diffusion. |
| `Incharajayaram/StoryWeaver`, `PiyushRaj714/story-generator-application` | MIT | ❌ | Geradores genéricos, redundantes com o script-weaver. |

**Atenção:** as skills de roteiro rodam no Claude e gastam o seu plano. Use só na revisão final de cada roteiro, não para rascunho. Rascunho fica no Ollama.

## Regras de edição dinâmica (aplicadas no gancho do EP01)

1. **Corte ou mudança visual a cada 2–3 s.** Nada fica parado mais que isso.
2. **Punch-in:** a câmera se aproxima do rosto do Carlos nos momentos de emoção.
3. **Slam de texto:** os números-chave entram grandes, com impacto e tremida de tela.
4. **Freeze-frame em preto e branco + arranhão de disco** na virada da história.
5. **Troca de trilha** na virada: leve → silêncio → tensa.
6. **Legenda animada** com a palavra-chave em amarelo.
7. **Efeito sonoro em toda ação visual:** pop, whoosh, tique, caixa, papel, impacto.
8. **Ducking:** a música cai para 40% quando a voz entra.
9. **Áudio normalizado** para cerca de -14 LUFS, o padrão do YouTube.
