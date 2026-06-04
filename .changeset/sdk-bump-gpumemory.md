---
"@platforma-open/milaboratories.gpu-test.workflow": patch
---

Bump `@platforma-sdk/workflow-tengo` from 5.13.1 to 5.24.0 so the `.gpuMemory()` method actually exists at runtime. The April rename commit (`daf19df`, "Rename .gpu() to .gpuMemory()") updated the workflow source but left the catalog pin on 5.13.1, where the builder only exposes `.gpu()` — every block run failed with `cannot get element from strictMap: key "gpuMemory" not found` on the `b.gpuMemory(...)` call.
