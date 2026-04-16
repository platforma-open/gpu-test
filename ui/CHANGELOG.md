# @platforma-open/milaboratories.gpu-test.ui

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

## 0.3.1

### Patch Changes

- Updated dependencies [69f58a3]
  - @platforma-open/milaboratories.gpu-test.model@0.2.3

## 0.3.0

### Minor Changes

- 87d01a6: Block renamed to `GPU Detection`, requirements cleaned up

## 0.2.2

### Patch Changes

- f48f6d7: Add --seed arg for dedup busting, random initial seed, show seed in UI
- Updated dependencies [f48f6d7]
  - @platforma-open/milaboratories.gpu-test.model@0.2.2

## 0.2.1

### Patch Changes

- f48f6d7: Add --seed arg for dedup busting, random initial runId, show seed in UI
- Updated dependencies [f48f6d7]
  - @platforma-open/milaboratories.gpu-test.model@0.2.1

## 0.2.0

### Minor Changes

- f129183: Initial release of GPU test block — detects GPU via CuPy, nvidia-smi, PyTorch and reports hardware info with benchmark

### Patch Changes

- Updated dependencies [f129183]
  - @platforma-open/milaboratories.gpu-test.model@0.2.0
