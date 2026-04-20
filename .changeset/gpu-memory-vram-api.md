---
"@platforma-open/milaboratories.gpu-test": minor
"@platforma-open/milaboratories.gpu-test.model": minor
"@platforma-open/milaboratories.gpu-test.ui": minor
"@platforma-open/milaboratories.gpu-test.workflow": minor
"@platforma-open/milaboratories.gpu-test.gpu-info": minor
---

Replace GPU count with VRAM-based GPU memory selection

- Model: `gpuCount` (number) replaced with `gpuMemory` (string, e.g. "16GiB")
- Workflow: `.gpu(count)` replaced with `.gpu(memoryString)` for VRAM-based routing
- UI: number input replaced with dropdown presets (No GPU, Any, 16 GiB, 24 GiB)
- Software: added nvidia-cuda-nvrtc-cu12 and nvidia-cublas-cu12 for CuPy JIT/BLAS support
