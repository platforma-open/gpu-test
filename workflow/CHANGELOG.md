# @platforma-open/milaboratories.gpu-test.workflow

## 0.5.0

### Minor Changes

- 3959c25: Replace GPU count with VRAM-based GPU memory selection

  - Model: `gpuCount` (number) replaced with `gpuMemory` (string, e.g. "16GiB")
  - Workflow: `.gpu(count)` replaced with `.gpu(memoryString)` for VRAM-based routing
  - UI: number input replaced with dropdown presets (No GPU, Any, 16 GiB, 24 GiB)
  - Software: added nvidia-cuda-nvrtc-cu12 and nvidia-cublas-cu12 for CuPy JIT/BLAS support

### Patch Changes

- Updated dependencies [3959c25]
  - @platforma-open/milaboratories.gpu-test.gpu-info@2.5.0

## 0.4.0

### Minor Changes

- 7a9356c: Add configurable GPU count and settings panel

  - Added `gpuCount` block argument (default: 1) to control GPU resource requests
  - Workflow conditionally calls `.gpu(N)` only when gpuCount > 0
  - UI redesigned with settings panel (PlSlideModal) matching platform conventions
  - Settings panel opens by default on fresh blocks
  - Added nvidia-cuda-nvrtc-cu12 and nvidia-cublas-cu12 to requirements for CuPy JIT/BLAS support

### Patch Changes

- Updated dependencies [7a9356c]
  - @platforma-open/milaboratories.gpu-test.gpu-info@2.4.0

## 0.3.6

### Patch Changes

- Updated dependencies [eac41c3]
  - @platforma-open/milaboratories.gpu-test.gpu-info@2.3.0

## 0.3.5

### Patch Changes

- Updated dependencies [afe8d2e]
  - @platforma-open/milaboratories.gpu-test.gpu-info@2.2.0

## 0.3.4

### Patch Changes

- Updated dependencies [3531822]
  - @platforma-open/milaboratories.gpu-test.gpu-info@2.1.4

## 0.3.3

### Patch Changes

- Updated dependencies [777caf1]
  - @platforma-open/milaboratories.gpu-test.gpu-info@2.1.3

## 0.3.2

### Patch Changes

- Updated dependencies [87689f0]
  - @platforma-open/milaboratories.gpu-test.gpu-info@2.1.2

## 0.3.1

### Patch Changes

- Updated dependencies [2c73d51]
  - @platforma-open/milaboratories.gpu-test.gpu-info@2.1.1

## 0.3.0

### Minor Changes

- ddb20d5: Add .gpu(1) to request GPU resources, update SDK to 5.13.1

### Patch Changes

- Updated dependencies [ddb20d5]
  - @platforma-open/milaboratories.gpu-test.gpu-info@2.1.0

## 0.2.3

### Patch Changes

- Updated dependencies [87d01a6]
  - @platforma-open/milaboratories.gpu-test.gpu-info@2.0.0

## 0.2.2

### Patch Changes

- f48f6d7: Add --seed arg for dedup busting, random initial seed, show seed in UI
- Updated dependencies [f48f6d7]
  - @platforma-open/milaboratories.gpu-test.gpu-info@1.0.2

## 0.2.1

### Patch Changes

- f48f6d7: Add --seed arg for dedup busting, random initial runId, show seed in UI
- Updated dependencies [f48f6d7]
  - @platforma-open/milaboratories.gpu-test.gpu-info@1.0.1

## 0.2.0

### Minor Changes

- f129183: Initial release of GPU test block — detects GPU via CuPy, nvidia-smi, PyTorch and reports hardware info with benchmark

### Patch Changes

- Updated dependencies [f129183]
  - @platforma-open/milaboratories.gpu-test.gpu-info@0.9.0
