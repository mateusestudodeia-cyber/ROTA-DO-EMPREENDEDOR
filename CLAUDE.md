# Estúdio — regras de economia de tokens

Sempre usar estas ferramentas no lugar dos comandos crus. Elas mandam ao Claude só o essencial.

## Ferramentas instaladas (chamadas diretamente, sem gancho)

| Em vez de… | Use | Economia medida aqui |
|---|---|---|
| `cat arquivo.js` para entender um código | `tl-symbols arquivo.js` (só assinaturas) | 5.361 → 540 bytes (~90%) |
| `ls -R`, `find`, `tree` | `tl-structure .` ou `rtk ls` / `rtk tree` | árvore com tamanho em tokens por arquivo |
| `grep -rn` | `rtk grep` / `rtk rg` (agrupado e truncado) | — |
| busca por estrutura de código | `sg` / `rtk ast-grep` | — |
| logs longos (ffmpeg, npm, pip) | `rtk log <arquivo>` / `rtk err <comando>` | só erros e avisos |
| `git diff`, `git log` | `rtk diff`, `rtk git log` | só linhas alteradas |
| JSON grande | `rtk json arquivo --keys-only` | só a estrutura |
| testes | `rtk test <comando>` | só falhas |
| Quanto gastei? | `ccusage session --compact` | relatório de uso |
| Quanto o RTK poupou? | `rtk gain` | histórico |

## Regras de trabalho

1. Nunca abrir um vídeo inteiro: só contact sheet de até 8–12 quadros (`ffmpeg ... tile=4x2`, 640x360).
2. Nunca ler log inteiro de render: `ffmpeg -loglevel error`, ou `rtk err`.
3. Rascunhos, variações e as 10 ideias: Ollama local. O Claude só faz a versão final e a revisão.
4. Skills de roteiro (`jtydhr88/screenwriting-skills`, `nonomnonom/storytelling`) só na revisão final de cada roteiro.
5. Tudo vai para arquivo (roteiro, storyboard, relatórios); na conversa vai só um resumo curto.
6. Correção pontual com Edit, nunca reescrever um arquivo inteiro.
7. Ler arquivo grande só com `offset`/`limit` ou depois de um `tl-symbols`.

## Não usar aqui

- Ganchos e plugins que reescrevem comandos dentro do Claude Code (gancho do RTK, Context Mode, tokless, CTK, OpenToken): a trava de segurança desta sessão bloqueia ("Self-Modification").
- Headroom e outros intermediários de API: o ambiente de nuvem não permite redirecionar o tráfego.
