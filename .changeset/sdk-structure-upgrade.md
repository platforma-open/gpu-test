---
"@platforma-open/milaboratories.gpu-test": patch
"@platforma-open/milaboratories.gpu-test.model": patch
"@platforma-open/milaboratories.gpu-test.ui": patch
"@platforma-open/milaboratories.gpu-test.workflow": patch
"@platforma-open/milaboratories.gpu-test.gpu-info": patch
---

Upgrade SDK catalog and apply the block-tools structure upgrade. Migrate the
workflow exec resource request to the new `resources({ onCPU, onGPU })` API,
pin `vue` to `3.5.24`, drop the removed `@platforma-sdk/ui-vue/styles` import,
and rename the model export `model` -> `platforma`.
