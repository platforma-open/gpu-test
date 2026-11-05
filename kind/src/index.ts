import { assertParamsObject, defineBlockKind } from "@platforma-sdk/block-kind";
import { name, version } from "../package.json" with { type: "json" };

/**
 * This block's init-params contract — the shape a block of this kind receives
 * at creation, and exactly what a project template serializes for it.
 *
 * The resources and the benchmark size a run asks for. The seed is left out: it
 * only makes a run unique, so a template never carries one.
 */
export type BlockParams = {
  matrixSize: string;
  gpuMemory: string;
  cpu: string;
  mem: string;
};

/**
 * The same contract at runtime, for params that arrive from a template file rather than
 * from typed code. Each field is a string as the settings form holds it; an empty string
 * means the default.
 */
function parseInitializationParams(value: unknown): BlockParams {
  assertParamsObject(value);

  const { matrixSize, gpuMemory, cpu, mem } = value;
  if (typeof matrixSize !== "string")
    throw new Error("'matrixSize' is required, and must be a string.");
  if (typeof gpuMemory !== "string")
    throw new Error("'gpuMemory' is required, and must be a string.");
  if (typeof cpu !== "string") throw new Error("'cpu' is required, and must be a string.");
  if (typeof mem !== "string") throw new Error("'mem' is required, and must be a string.");

  return { matrixSize, gpuMemory, cpu, mem };
}

// Identity (`name`/`version`) comes from this package's own `package.json`, so
// the on-wire `{name}@{version}` reference can never drift from what npm
// publishes; the bundler inlines the JSON import.
export const kind = defineBlockKind<BlockParams>({
  name,
  version,
  parseInitializationParams,
});
