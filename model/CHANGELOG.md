# @platforma-open/milaboratories.gpu-test.model

## 0.4.0

### Minor Changes

- 3959c25: Replace GPU count with VRAM-based GPU memory selection

  - Model: `gpuCount` (number) replaced with `gpuMemory` (string, e.g. "16GiB")
  - Workflow: `.gpu(count)` replaced with `.gpu(memoryString)` for VRAM-based routing
  - UI: number input replaced with dropdown presets (No GPU, Any, 16 GiB, 24 GiB)
  - Software: added nvidia-cuda-nvrtc-cu12 and nvidia-cublas-cu12 for CuPy JIT/BLAS support

## 0.3.0

### Minor Changes

- 7a9356c: Add configurable GPU count and settings panel

  - Added `gpuCount` block argument (default: 1) to control GPU resource requests
  - Workflow conditionally calls `.gpu(N)` only when gpuCount > 0
  - UI redesigned with settings panel (PlSlideModal) matching platform conventions
  - Settings panel opens by default on fresh blocks
  - Added nvidia-cuda-nvrtc-cu12 and nvidia-cublas-cu12 to requirements for CuPy JIT/BLAS support

## 0.2.3

### Patch Changes

- 69f58a3: Update block model API version to 2 for MCP set_block_data compatibility

## 0.2.2

### Patch Changes

- f48f6d7: Add --seed arg for dedup busting, random initial seed, show seed in UI

## 0.2.1

### Patch Changes

- f48f6d7: Add --seed arg for dedup busting, random initial runId, show seed in UI

## 0.2.0

### Minor Changes

- f129183: Initial release of GPU test block — detects GPU via CuPy, nvidia-smi, PyTorch and reports hardware info with benchmark
