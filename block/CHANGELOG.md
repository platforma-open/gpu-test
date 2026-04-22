# @platforma-open/milaboratories.gpu-test

## 0.5.1

### Patch Changes

- Updated dependencies [a4f96a4]
  - @platforma-open/milaboratories.gpu-test.workflow@0.6.0

## 0.5.0

### Minor Changes

- 3959c25: Replace GPU count with VRAM-based GPU memory selection

  - Model: `gpuCount` (number) replaced with `gpuMemory` (string, e.g. "16GiB")
  - Workflow: `.gpu(count)` replaced with `.gpu(memoryString)` for VRAM-based routing
  - UI: number input replaced with dropdown presets (No GPU, Any, 16 GiB, 24 GiB)
  - Software: added nvidia-cuda-nvrtc-cu12 and nvidia-cublas-cu12 for CuPy JIT/BLAS support

### Patch Changes

- Updated dependencies [3959c25]
  - @platforma-open/milaboratories.gpu-test.model@0.4.0
  - @platforma-open/milaboratories.gpu-test.ui@0.5.0
  - @platforma-open/milaboratories.gpu-test.workflow@0.5.0

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
  - @platforma-open/milaboratories.gpu-test.model@0.3.0
  - @platforma-open/milaboratories.gpu-test.ui@0.4.0
  - @platforma-open/milaboratories.gpu-test.workflow@0.4.0

## 0.3.7

### Patch Changes

- @platforma-open/milaboratories.gpu-test.workflow@0.3.6

## 0.3.6

### Patch Changes

- @platforma-open/milaboratories.gpu-test.workflow@0.3.5

## 0.3.5

### Patch Changes

- @platforma-open/milaboratories.gpu-test.workflow@0.3.4

## 0.3.4

### Patch Changes

- @platforma-open/milaboratories.gpu-test.workflow@0.3.3

## 0.3.3

### Patch Changes

- @platforma-open/milaboratories.gpu-test.workflow@0.3.2

## 0.3.2

### Patch Changes

- 69f58a3: Update block model API version to 2 for MCP set_block_data compatibility
- Updated dependencies [69f58a3]
  - @platforma-open/milaboratories.gpu-test.model@0.2.3
  - @platforma-open/milaboratories.gpu-test.ui@0.3.1

## 0.3.1

### Patch Changes

- @platforma-open/milaboratories.gpu-test.workflow@0.3.1

## 0.3.0

### Minor Changes

- ddb20d5: Add .gpu(1) to request GPU resources, update SDK to 5.13.1

### Patch Changes

- Updated dependencies [ddb20d5]
  - @platforma-open/milaboratories.gpu-test.workflow@0.3.0

## 0.2.3

### Patch Changes

- Updated dependencies [87d01a6]
  - @platforma-open/milaboratories.gpu-test.ui@0.3.0
  - @platforma-open/milaboratories.gpu-test.workflow@0.2.3

## 0.2.2

### Patch Changes

- f48f6d7: Add --seed arg for dedup busting, random initial seed, show seed in UI
- Updated dependencies [f48f6d7]
  - @platforma-open/milaboratories.gpu-test.model@0.2.2
  - @platforma-open/milaboratories.gpu-test.workflow@0.2.2
  - @platforma-open/milaboratories.gpu-test.ui@0.2.2

## 0.2.1

### Patch Changes

- f48f6d7: Add --seed arg for dedup busting, random initial runId, show seed in UI
- Updated dependencies [f48f6d7]
  - @platforma-open/milaboratories.gpu-test.model@0.2.1
  - @platforma-open/milaboratories.gpu-test.workflow@0.2.1
  - @platforma-open/milaboratories.gpu-test.ui@0.2.1

## 0.2.0

### Minor Changes

- f129183: Initial release of GPU test block — detects GPU via CuPy, nvidia-smi, PyTorch and reports hardware info with benchmark

### Patch Changes

- Updated dependencies [f129183]
  - @platforma-open/milaboratories.gpu-test.workflow@0.2.0
  - @platforma-open/milaboratories.gpu-test.model@0.2.0
  - @platforma-open/milaboratories.gpu-test.ui@0.2.0
