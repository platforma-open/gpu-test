import { kind } from "@platforma-open/milaboratories.gpu-test.kind";
import { BlockModelV3 } from "@platforma-sdk/model";
import { blockDataModel } from "./dataModel";
import type { BlockArgs } from "./types";

export type { BlockArgs, BlockData } from "./types";

export const platforma = BlockModelV3.create({ dataModel: blockDataModel, kind })
  // Empty init-params contract (see the kind): nothing crosses the template boundary.
  .templateParams(() => ({}))

  // All settings are user-committed run parameters; the workflow consumes them unchanged.
  .args<BlockArgs>((data) => ({
    seed: data.seed,
    matrixSize: data.matrixSize,
    gpuMemory: data.gpuMemory,
    cpu: data.cpu,
    mem: data.mem,
  }))

  .output("gpuLog", (ctx) => ctx.outputs?.resolve("gpuLog")?.getLogHandle())
  .output("gpuInfo", (ctx) => ctx.outputs?.resolve("gpuInfo")?.getDataAsJson<GpuReport>())
  .output("isRunning", (ctx) => ctx.outputs?.getIsReadyOrError() === false)
  .output("seed", (ctx) => ctx.outputs?.resolve("seed")?.getDataAsString())

  .title(() => "GPU Detection")
  .sections(() => [{ type: "link" as const, href: "/" as const, label: "GPU Info" }])
  .done();

export interface GpuReport {
  seed: number;
  gpu_available: boolean;
  cupy: {
    available: boolean;
    device_count: number;
    cuda_version: string | null;
    devices: Array<{
      index: number;
      name: string;
      total_memory_mb: number;
      free_memory_mb?: number;
      major: number;
      minor: number;
      multi_processor_count: number;
    }>;
    error?: string;
  };
  nvidia_smi: {
    available: boolean;
    driver_version: string | null;
    command?: string;
    returncode?: number | null;
    stdout?: string;
    stderr?: string;
    devices: Array<{
      index: number;
      name: string;
      memory_total_mb: number;
      memory_free_mb: number;
      memory_used_mb: number;
      temperature_c: number | null;
    }>;
    error?: string;
  };
  environment: Record<string, string | null>;
  benchmark: {
    ran: boolean;
    backend?: string;
    matrix_size?: number;
    cpu_time_ms?: number;
    gpu_time_ms?: number;
    speedup?: number;
    skipped?: string;
    error?: string;
  };
}
