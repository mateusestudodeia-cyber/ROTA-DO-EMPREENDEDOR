#!/bin/bash
# Produz um episódio completo: ./motor/produzir.sh ep01
set -e
EP=$1; R=/home/user/estudio; B=$R/episodios/$EP/build; cd $R; . .venv/bin/activate
[ -f $B/timeline.json ] || python motor/narrar_ep.py $EP
node motor/render.js $EP --cues
N=$(node -e "console.log(Math.ceil(require('$B/timeline.json').duracao*30))"); P=3; S=$(( (N+P-1)/P ))
for k in $(seq 0 $((P-1))); do node motor/render.js $EP $((k*S)) $(( (k+1)*S<N ? (k+1)*S : N )) $B/parte$k.mp4 & done; wait
printf "file '%s'\n" $B/parte0.mp4 $B/parte1.mp4 $B/parte2.mp4 > $B/partes.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $B/partes.txt -c copy $B/video.mp4
python motor/mixar_ep.py $EP
M=$(ffmpeg -hide_banner -i $B/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | python3 -c "import sys,json;t=sys.stdin.read();d=json.loads(t[t.rindex('{'):]);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -loglevel error -y -i $B/video.mp4 -i $B/mix.wav -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11:$M:linear=true -ar 48000 -c:a aac -b:a 192k -shortest $R/episodios/$EP/$EP.mp4
rm -f $B/parte*.mp4 $B/partes.txt
echo "PRONTO: $R/episodios/$EP/$EP.mp4"
