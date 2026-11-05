/** The settings form, as the UI edits it. Strings as typed; an empty one means the default. */
export type BlockData = {
  /** Changes on every "Run again" so the run is not served from cache. */
  seed: number;
  matrixSize: string;
  gpuMemory: string;
  cpu: string;
  mem: string;
};

/** What the workflow reads. */
export type BlockArgs = {
  seed: number;
  matrixSize: string;
  gpuMemory: string;
  cpu: string;
  mem: string;
};

/** Pre-V3 args shape, frozen snapshot for `upgradeLegacy`. */
export type LegacyBlockArgs = {
  seed: number;
  matrixSize: string;
  gpuMemory: string;
  cpu: string;
  mem: string;
};
