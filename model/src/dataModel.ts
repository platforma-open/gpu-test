import { kind } from "@platforma-open/milaboratories.gpu-test.kind";
import { DataModelBuilder } from "@platforma-sdk/model";
import type { BlockData, LegacyBlockArgs, LegacyBlockUiState } from "./types";

const randomSeed = (): number => Math.floor(Math.random() * 2147483647);

const defaults = (): BlockData => ({
  seed: randomSeed(),
  matrixSize: "4000",
  gpuMemory: "1GiB",
  cpu: "1",
  mem: "1GiB",
});

export const blockDataModel = new DataModelBuilder({ kind })
  .from<BlockData>("V20261030")
  // Projects saved under the V1 model keep their settings: the V1 args map 1:1 onto
  // BlockData; the V1 UI state was empty. Missing fields fall back to the defaults.
  .upgradeLegacy<Partial<LegacyBlockArgs> | undefined, LegacyBlockUiState>(({ args }) => {
    const d = defaults();
    return {
      seed: args?.seed ?? d.seed,
      matrixSize: args?.matrixSize ?? d.matrixSize,
      gpuMemory: args?.gpuMemory ?? d.gpuMemory,
      cpu: args?.cpu ?? d.cpu,
      mem: args?.mem ?? d.mem,
    };
  })
  // The kind's init-params contract is empty, so a new block always starts from defaults.
  .init(() => defaults());
