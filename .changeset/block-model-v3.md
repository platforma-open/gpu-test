---
"@platforma-open/milaboratories.gpu-test": minor
"@platforma-open/milaboratories.gpu-test.model": minor
"@platforma-open/milaboratories.gpu-test.ui": minor
"@platforma-open/milaboratories.gpu-test.kind": minor
---

Migrate block to BlockModelV3 with a block kind. Settings (cpu, mem, gpuMemory, seed, matrixSize) move into block data; existing projects keep them via the legacy upgrader. The kind takes no init params. UI bindings move to `app.model.data`.
