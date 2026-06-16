---
"@platforma-open/milaboratories.gpu-test.workflow": minor
"@platforma-open/milaboratories.gpu-test.gpu-info": minor
"@platforma-open/milaboratories.gpu-test.model": minor
"@platforma-open/milaboratories.gpu-test.ui": minor
---

MILAB-6382: dual-mode operation via `exec.hasGpu` gate

- Workflow gates `.gpuMemory()` on `exec.hasGpu` and passes `--mode gpu` /
  `--mode cpu` to the software. Calling `.gpuMemory()` on a backend without
  GPU is a permanent runner error; the gate keeps the block runnable on
  both GPU and CPU-only clusters.
- Software accepts the new `--mode {gpu,cpu}` flag. In `gpu` mode the
  existing detection + benchmark runs; in `cpu` mode the GPU probes are
  skipped and the report emits "GPU not available" fast (the block returns
  successfully — it never errors when GPU is absent).
- Model: `GpuReport.mode` field added so the UI can render the active
  branch.
- UI: summary banner shows "CPU branch (exec.hasGpu = false)" when running
  in CPU mode.
