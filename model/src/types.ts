/**
 * Persisted block state. Every field is a user-committed run setting and goes to the
 * workflow as-is, so `BlockData` and the workflow args share one shape.
 */
export type BlockData = {
  seed: number;
  matrixSize: string;
  gpuMemory: string;
  cpu: string;
  mem: string;
};

/** Workflow args — what `workflow/src/main.tpl.tengo` reads. */
export type BlockArgs = {
  seed: number;
  matrixSize: string;
  gpuMemory: string;
  cpu: string;
  mem: string;
};

/** V1 (`BlockModel`) args as persisted by projects created before the V3 migration. */
export type LegacyBlockArgs = BlockArgs;

/** V1 UI state: always empty. */
export type LegacyBlockUiState = Record<string, never>;
