---
"@platforma-open/milaboratories.gpu-test": patch
"@platforma-open/milaboratories.gpu-test.model": patch
"@platforma-open/milaboratories.gpu-test.ui": patch
"@platforma-open/milaboratories.gpu-test.workflow": patch
"@platforma-open/milaboratories.gpu-test.gpu-info": patch
---

Refresh the SDK catalog to the current published versions and cut a new block
release, so a published block version references a docker image that is actually
in the registry.

Block 0.7.3 points at `platforma-open.milaboratories.gpu-test.gpu-info.main.c79fc91ff0c4`,
which was never pushed: the software package carried `private: true`, and `pl-pkg`
gates docker auto-push on `!isPrivate`. The flag is gone since MILAB-6714, but
that fix never reached a release, so 0.7.3 is still the latest and still fails at
runtime with a 404 on image pull.

Catalog bumps: `@platforma-sdk/package-builder` 3.14.2 -> 3.15.0,
`@platforma-sdk/block-tools` 2.12.9 -> 2.14.3, `@platforma-sdk/tengo-builder`
4.0.20 -> 4.0.23, `@platforma-sdk/model` and `@platforma-sdk/ui-vue` 1.80.10 ->
1.82.x, `@platforma-sdk/test` 1.80.11 -> 1.82.4, `@milaboratories/ts-builder`
1.6.1 -> 1.7.0, `@milaboratories/ts-configs` 1.3.1 -> 1.4.0,
`@milaboratories/helpers` 1.14.2 -> 1.14.5.
