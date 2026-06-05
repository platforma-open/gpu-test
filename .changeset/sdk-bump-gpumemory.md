---
"@platforma-open/milaboratories.gpu-test.workflow": patch
"@platforma-open/milaboratories.gpu-test.gpu-info": patch
"@platforma-open/milaboratories.gpu-test": patch
---

Bump SDK infrastructure to current versions.

- `@platforma-sdk/workflow-tengo`: 5.13.1 → 5.24.0 — adds the `.gpuMemory()` exec-builder method. The April rename commit (`daf19df`, "Rename .gpu() to .gpuMemory()") updated the workflow source but left the catalog pin on 5.13.1, where the builder only exposes `.gpu()`. Every block run failed with `cannot get element from strictMap: key "gpuMemory" not found` on the `b.gpuMemory(...)` call.
- `@platforma-sdk/tengo-builder`: 2.4.18 → 4.0.5 — required by CI's "old infrastructure package" check.
- `@platforma-sdk/block-tools`: 2.7.2 → 2.10.6 — same.
