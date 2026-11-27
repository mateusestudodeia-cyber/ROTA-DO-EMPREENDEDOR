#!/bin/bash
# Prepara uma máquina nova para produzir episódios. Idempotente.
set -e
REPO=$(cd "$(dirname "$0")/.." && pwd)
[ -e /home/user/estudio ] || ln -s "$REPO" /home/user/estudio      # scripts usam /home/user/estudio
cd /home/user/estudio
[ -d .venv ] || python3 -m venv .venv
. .venv/bin/activate
pip install -q kokoro-onnx soundfile numpy scipy "git+https://github.com/Leonxlnx/earshot" 2>&1 | grep -v notice || true
mkdir -p modelos
for f in kokoro-v1.0.onnx voices-v1.0.bin; do [ -s modelos/$f ] || curl -sL -o modelos/$f https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/$f; done
python -c "import kokoro_onnx, earshot; print('ambiente ok')"
