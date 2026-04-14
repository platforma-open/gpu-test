# @platforma-open/milaboratories.gpu-test.gpu-info

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
