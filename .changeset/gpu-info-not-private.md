---
"@platforma-open/milaboratories.gpu-test.gpu-info": patch
---

Drop `private` from the software package so CI pushes its docker image again. `pl-pkg` gates auto-push on `!isPrivate`, so the image was built and referenced in the entrypoint descriptor but never uploaded.
