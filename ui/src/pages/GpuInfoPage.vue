<script setup lang="ts">
import { PlBlockPage, PlBtnGhost, PlLogView } from '@platforma-sdk/ui-vue';
import { computed } from 'vue';
import { useApp } from '../app';

const app = useApp();

const gpuInfo = computed(() => app.model.outputs.gpuInfo);
const gpuLog = computed(() => app.model.outputs.gpuLog);
const isRunning = computed(() => app.model.outputs.isRunning);
const hasRun = computed(() => gpuInfo.value !== undefined || gpuLog.value !== undefined);

function rerun() {
  app.model.args.runId = (app.model.args.runId ?? 0) + 1;
}
</script>

<template>
  <PlBlockPage>
    <template #title>GPU Detection Report</template>

    <div v-if="hasRun" class="actions">
      <PlBtnGhost @click="rerun" :disabled="isRunning">Re-run detection</PlBtnGhost>
    </div>

    <div v-if="!hasRun && !isRunning" class="status-message">
      Press <b>Run</b> button to start GPU detection
    </div>

    <div v-else-if="isRunning" class="status-message">
      Running GPU detection...
    </div>

    <div v-else-if="gpuInfo">
      <div class="summary-banner" :class="gpuInfo.gpu_available ? 'gpu-available' : 'gpu-unavailable'">
        {{ gpuInfo.gpu_available ? 'GPU AVAILABLE' : 'GPU NOT AVAILABLE' }}
      </div>

      <section v-if="gpuInfo.cupy.available" class="info-section">
        <h3>GPU Devices (CuPy / RAPIDS)</h3>
        <p>CUDA version: {{ gpuInfo.cupy.cuda_version ?? 'N/A' }}</p>
        <table class="info-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>VRAM</th>
              <th>Free</th>
              <th>Compute</th>
              <th>SMs</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dev in gpuInfo.cupy.devices" :key="dev.index">
              <td>{{ dev.index }}</td>
              <td>{{ dev.name }}</td>
              <td>{{ dev.total_memory_mb }} MB</td>
              <td>{{ dev.free_memory_mb }} MB</td>
              <td>{{ dev.major }}.{{ dev.minor }}</td>
              <td>{{ dev.multi_processor_count }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section v-if="!gpuInfo.cupy.available" class="info-section">
        <h3>CuPy (RAPIDS)</h3>
        <p>Not available{{ gpuInfo.cupy.error ? ': ' + gpuInfo.cupy.error : '' }}</p>
      </section>

      <section v-if="gpuInfo.torch_cuda.available" class="info-section">
        <h3>GPU Devices (PyTorch CUDA)</h3>
        <p>CUDA version: {{ gpuInfo.torch_cuda.cuda_version }} | cuDNN: {{ gpuInfo.torch_cuda.cudnn_version ?? 'N/A' }}</p>
        <table class="info-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>VRAM</th>
              <th>Compute</th>
              <th>SMs</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dev in gpuInfo.torch_cuda.devices" :key="dev.index">
              <td>{{ dev.index }}</td>
              <td>{{ dev.name }}</td>
              <td>{{ dev.total_memory_mb }} MB</td>
              <td>{{ dev.major }}.{{ dev.minor }}</td>
              <td>{{ dev.multi_processor_count }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section v-if="gpuInfo.nvidia_smi.available" class="info-section">
        <h3>nvidia-smi</h3>
        <p>Driver: {{ gpuInfo.nvidia_smi.driver_version }}</p>
        <table class="info-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>VRAM Total</th>
              <th>VRAM Free</th>
              <th>VRAM Used</th>
              <th>Temp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dev in gpuInfo.nvidia_smi.devices" :key="dev.index">
              <td>{{ dev.index }}</td>
              <td>{{ dev.name }}</td>
              <td>{{ dev.memory_total_mb }} MB</td>
              <td>{{ dev.memory_free_mb }} MB</td>
              <td>{{ dev.memory_used_mb }} MB</td>
              <td>{{ dev.temperature_c != null ? dev.temperature_c + '°C' : 'N/A' }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="info-section">
        <h3>Environment Variables</h3>
        <table class="info-table">
          <tbody>
            <tr v-for="(val, key) in gpuInfo.environment" :key="key">
              <td class="env-key">{{ key }}</td>
              <td :class="{ 'not-set': val === null }">{{ val ?? '(not set)' }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section v-if="gpuInfo.benchmark.ran" class="info-section">
        <h3>Benchmark ({{ gpuInfo.benchmark.matrix_size }}x{{ gpuInfo.benchmark.matrix_size }} matrix multiply, {{ gpuInfo.benchmark.backend }})</h3>
        <table class="info-table">
          <tbody>
            <tr>
              <td>Backend</td>
              <td>{{ gpuInfo.benchmark.backend }}</td>
            </tr>
            <tr>
              <td>CPU time</td>
              <td>{{ gpuInfo.benchmark.cpu_time_ms }} ms</td>
            </tr>
            <tr>
              <td>GPU time</td>
              <td>{{ gpuInfo.benchmark.gpu_time_ms }} ms</td>
            </tr>
            <tr>
              <td>Speedup</td>
              <td>{{ gpuInfo.benchmark.speedup }}x</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section v-if="gpuInfo.benchmark.skipped" class="info-section">
        <h3>Benchmark</h3>
        <p>{{ gpuInfo.benchmark.skipped }}</p>
      </section>

      <section v-if="!gpuInfo.torch_cuda.available" class="info-section">
        <h3>PyTorch CUDA</h3>
        <p>Not available{{ gpuInfo.torch_cuda.error ? ': ' + gpuInfo.torch_cuda.error : '' }}</p>
      </section>

      <section v-if="!gpuInfo.nvidia_smi.available" class="info-section">
        <h3>nvidia-smi</h3>
        <table class="info-table">
          <tbody>
            <tr>
              <td class="env-key">Command</td>
              <td><code>{{ gpuInfo.nvidia_smi.command ?? 'N/A' }}</code></td>
            </tr>
            <tr>
              <td class="env-key">Exit code</td>
              <td>{{ gpuInfo.nvidia_smi.returncode ?? 'N/A' }}</td>
            </tr>
            <tr v-if="gpuInfo.nvidia_smi.error">
              <td class="env-key">Error</td>
              <td>{{ gpuInfo.nvidia_smi.error }}</td>
            </tr>
            <tr v-if="gpuInfo.nvidia_smi.stdout">
              <td class="env-key">Stdout</td>
              <td><pre class="log-pre">{{ gpuInfo.nvidia_smi.stdout }}</pre></td>
            </tr>
            <tr v-if="gpuInfo.nvidia_smi.stderr">
              <td class="env-key">Stderr</td>
              <td><pre class="log-pre">{{ gpuInfo.nvidia_smi.stderr }}</pre></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

    <div v-if="gpuLog" class="info-section">
      <h3>Raw Log</h3>
      <PlLogView :log-handle="gpuLog" />
    </div>
  </PlBlockPage>
</template>

<style scoped>
.summary-banner {
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 16px;
  text-align: center;
}

.gpu-available {
  background: #d4edda;
  color: #155724;
}

.gpu-unavailable {
  background: #f8d7da;
  color: #721c24;
}

.info-section {
  margin-bottom: 24px;
}

.info-section h3 {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.info-table th,
.info-table td {
  padding: 6px 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.info-table th {
  font-weight: 600;
  background: #f5f5f5;
}

.env-key {
  font-family: monospace;
  font-weight: 600;
}

.not-set {
  color: #999;
  font-style: italic;
}

.log-pre {
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-all;
}

.actions {
  margin-bottom: 16px;
}

.status-message {
  padding: 24px;
  text-align: center;
  color: #666;
}
</style>
