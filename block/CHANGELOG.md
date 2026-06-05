# @platforma-open/milaboratories.gpu-test

## 0.7.2

### Patch Changes

- c9c0fee: Restore `prepublishOnly` and `mark-stable` scripts in `block/package.json`.

  Both were silently dropped in commit `d60844a` ("PyTorch added, matrix size selection added", Apr 30) — the diff line `block/package.json | 2 --` slipped in unmentioned in the body. Effect: from v0.6.0 onward, `pnpm -r publish` no longer uploaded the block-pack to `s3://milab-euce1-prod-pkgs-s3-block-registry/pub/releases/`, so versions 0.6.0 / 0.7.0 / 0.7.1 never reached `https://blocks.pl-open.science/v2/milaboratories/gpu-test/<version>/manifest.json` and never showed up in the Desktop block picker (still pinned at 0.5.2, the last version published before the regression). npm and the software registry kept working — only the block-registry upload was broken. Sibling repo `platforma-open/titeseq-analysis` still carries both scripts; restoring matches that template.

## 0.7.1

### Patch Changes

- ed9febf: Bump SDK infrastructure to current versions.

  - `@platforma-sdk/workflow-tengo`: 5.13.1 → 5.24.0 — adds the `.gpuMemory()` exec-builder method. The April rename commit (`daf19df`, "Rename .gpu() to .gpuMemory()") updated the workflow source but left the catalog pin on 5.13.1, where the builder only exposes `.gpu()`. Every block run failed with `cannot get element from strictMap: key "gpuMemory" not found` on the `b.gpuMemory(...)` call.
  - `@platforma-sdk/tengo-builder`: 2.4.18 → 4.0.5 — required by CI's "old infrastructure package" check.
  - `@platforma-sdk/block-tools`: 2.7.2 → 2.10.6 — same.

- Updated dependencies [ed9febf]
  - @platforma-open/milaboratories.gpu-test.workflow@0.6.2

## 0.7.0

### Minor Changes

- 5787785: Run limited to Linux OS only

## 0.6.0

### Minor Changes

- d60844a: PyTorch added, matrix size selection added

## 0.5.2

### Patch Changes

- @platforma-open/milaboratories.gpu-test.workflow@0.6.1

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
