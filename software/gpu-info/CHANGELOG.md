# @platforma-open/milaboratories.gpu-test.gpu-info

## 2.3.0

### Minor Changes

- eac41c3: Detect script with CuPy improved

## 2.2.0

### Minor Changes

- afe8d2e: Switch to RAPIDS runtime for full CUDA/CuPy support in Docker images

## 2.1.4

### Patch Changes

- 3531822: Fix benchmark: use element-wise ops instead of dot product to avoid cuBLAS dependency

## 2.1.3

### Patch Changes

- 777caf1: Fix CuPy: pip install to --target dir, add /usr/lib64 to CUDA search paths

## 2.1.2

### Patch Changes

- 87689f0: Fix CuPy: discover CUDA library paths on GPU nodes before import

## 2.1.1

### Patch Changes

- 2c73d51: Auto-install cupy at runtime when GPU is detected via nvidia-smi

## 2.1.0

### Minor Changes

- ddb20d5: Add .gpu(1) to request GPU resources, update SDK to 5.13.1

## 2.0.0

### Major Changes

- 87d01a6: Block renamed to `GPU Detection`, requirements cleaned up

## 1.0.2

### Patch Changes

- f48f6d7: Add --seed arg for dedup busting, random initial seed, show seed in UI

## 1.0.1

### Patch Changes

- f48f6d7: Add --seed arg for dedup busting, random initial runId, show seed in UI

## 0.9.0

### Minor Changes

- f129183: Initial release of GPU test block — detects GPU via CuPy, nvidia-smi, PyTorch and reports hardware info with benchmark
