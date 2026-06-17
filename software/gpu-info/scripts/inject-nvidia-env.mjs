#!/usr/bin/env node
// Post-build patch: inject NVIDIA env vars into the auto-generated Dockerfile.
//
// The Dockerfile produced by `pl-pkg build` uses python:3.12-slim as base and
// does not set LD_LIBRARY_PATH / PATH / NVIDIA_* envs. The NVIDIA container
// runtime mounts /usr/local/nvidia/{bin,lib64} into the container, but
// without these envs the dynamic linker can't find libcuda.so and CuPy /
// PyTorch fail with cudaErrorInsufficientDriver even on hosts with a
// perfectly fine driver.
//
// Long-term fix: add the same envVars to the upstream
// @platforma-open/milaboratories.runenv-python-3.12.10-rapids package and
// remove this hook.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const DOCKERFILE = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
  'dist',
  'docker',
  'Dockerfile-main',
);

const NVIDIA_BLOCK = `
# >>> NVIDIA driver exposure (injected by scripts/inject-nvidia-env.mjs) >>>
# The NVIDIA container runtime mounts the host driver at /usr/local/nvidia,
# but python:3.12-slim doesn't set LD_LIBRARY_PATH / PATH to point at it.
# Without these envs CuPy / PyTorch can't find libcuda.so and report
# cudaErrorInsufficientDriver despite a perfectly capable host driver.
ENV NVIDIA_VISIBLE_DEVICES=all
ENV NVIDIA_DRIVER_CAPABILITIES=compute,utility
ENV LD_LIBRARY_PATH=/usr/local/nvidia/lib64:/usr/local/nvidia/lib
ENV PATH=/usr/local/nvidia/bin:\${PATH}
# <<<
`;

if (!existsSync(DOCKERFILE)) {
  console.error(`[inject-nvidia-env] Dockerfile not found at ${DOCKERFILE} — did pl-pkg build run?`);
  process.exit(1);
}

const original = readFileSync(DOCKERFILE, 'utf8');

if (original.includes('injected by scripts/inject-nvidia-env.mjs')) {
  console.log('[inject-nvidia-env] Already patched, skipping.');
  process.exit(0);
}

// Insert after the first `ENV RPY2_CFFI_MODE=ABI` line (or after WORKDIR
// if that line is absent). Place before the pip install steps so the new
// envs are visible during the build too.
const marker = /^ENV RPY2_CFFI_MODE=.*$/m;
const fallback = /^WORKDIR .*$/m;

let patched;
if (marker.test(original)) {
  patched = original.replace(marker, (m) => `${m}${NVIDIA_BLOCK}`);
} else if (fallback.test(original)) {
  patched = original.replace(fallback, (m) => `${m}${NVIDIA_BLOCK}`);
} else {
  console.error('[inject-nvidia-env] Could not find anchor (ENV RPY2_CFFI_MODE or WORKDIR) in Dockerfile.');
  process.exit(1);
}

writeFileSync(DOCKERFILE, patched);
console.log('[inject-nvidia-env] Patched ' + DOCKERFILE);
