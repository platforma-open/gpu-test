import { kind } from "@platforma-open/milaboratories.gpu-test.kind";
import { DataModelBuilder } from "@platforma-sdk/model";
import type { BlockData, LegacyBlockArgs } from "./types";

const randomSeed = () => Math.floor(Math.random() * 2147483647);

export const blockDataModel = new DataModelBuilder({ kind })
  .from<BlockData>("V20261105")
  // The V1 block kept everything in args and had no UI state.
  .upgradeLegacy<LegacyBlockArgs, Record<string, never>>(({ args }) => ({
    seed: args?.seed ?? randomSeed(),
    matrixSize: args?.matrixSize ?? "4000",
    gpuMemory: args?.gpuMemory ?? "1GiB",
    cpu: args?.cpu ?? "1",
    mem: args?.mem ?? "1GiB",
  }))
  // `params` is absent when a block is created by hand rather than from a
  // template, so every field the contract carries keeps its own default.
  .init(({ params }) => ({
    seed: randomSeed(),
    matrixSize: params?.matrixSize ?? "4000",
    gpuMemory: params?.gpuMemory ?? "1GiB",
    cpu: params?.cpu ?? "1",
    mem: params?.mem ?? "1GiB",
  }));
