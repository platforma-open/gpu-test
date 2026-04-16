---
"@platforma-open/milaboratories.gpu-test": minor
"@platforma-open/milaboratories.gpu-test.model": minor
"@platforma-open/milaboratories.gpu-test.ui": minor
"@platforma-open/milaboratories.gpu-test.workflow": minor
"@platforma-open/milaboratories.gpu-test.gpu-info": minor
---

Add configurable GPU count and settings panel

- Added `gpuCount` block argument (default: 1) to control GPU resource requests
- Workflow conditionally calls `.gpu(N)` only when gpuCount > 0
- UI redesigned with settings panel (PlSlideModal) matching platform conventions
- Settings panel opens by default on fresh blocks
- Added nvidia-cuda-nvrtc-cu12 and nvidia-cublas-cu12 to requirements for CuPy JIT/BLAS support
