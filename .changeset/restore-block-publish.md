---
"@platforma-open/milaboratories.gpu-test": patch
---

Restore `prepublishOnly` and `mark-stable` scripts in `block/package.json`.

Both were silently dropped in commit `d60844a` ("PyTorch added, matrix size selection added", Apr 30) — the diff line `block/package.json | 2 --` slipped in unmentioned in the body. Effect: from v0.6.0 onward, `pnpm -r publish` no longer uploaded the block-pack to `s3://milab-euce1-prod-pkgs-s3-block-registry/pub/releases/`, so versions 0.6.0 / 0.7.0 / 0.7.1 never reached `https://blocks.pl-open.science/v2/milaboratories/gpu-test/<version>/manifest.json` and never showed up in the Desktop block picker (still pinned at 0.5.2, the last version published before the regression). npm and the software registry kept working — only the block-registry upload was broken. Sibling repo `platforma-open/titeseq-analysis` still carries both scripts; restoring matches that template.
