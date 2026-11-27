# Rotina diária de postagem (executada por tarefa agendada)

Objetivo: todo dia, agendar no Buffer **somente** os posts daquele dia que estão em `agenda.json`.

1. Data de hoje no fuso `America/Sao_Paulo` (use `get_account` → `currentTime`).
2. Em `agenda.json`, selecione os itens cujo `quando` começa com a data de hoje e ainda está no futuro.
   Se não houver nenhum, termine dizendo "nada para hoje".
3. Para evitar duplicidade: `list_posts` da organização `agenda.organizacao`; pule itens que já tenham post agendado
   no mesmo canal e no mesmo horário.
4. Para cada item, `create_post` com `mode: customScheduled`, `dueAt: quando`, `schedulingType: automatic`,
   `channelId: agenda.canais[rede]`, `assets: [{video:{url: video}}]`, `text: texto` e:
   - youtube: `metadata.youtube = {type:'regularVideo', title: titulo, categoryId:'27', privacy:'public', madeForKids:false}`
   - facebook: `metadata.facebook = {type:'reel'}`
   - tiktok: `metadata.tiktok = {title: titulo}`
5. Relatório final curto: o que foi agendado (rede, horário, id) e qualquer erro (ex.: vídeo inacessível).
   Não edite nem apague posts que já existiam. Não poste nada fora da agenda.
