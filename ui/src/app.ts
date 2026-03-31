import { model } from '@platforma-open/milaboratories.gpu-test.model';
import { defineApp } from '@platforma-sdk/ui-vue';
import GpuInfoPage from './pages/GpuInfoPage.vue';

export const sdkPlugin = defineApp(model, () => {
  return {
    routes: {
      '/': () => GpuInfoPage,
    },
  };
});

export const useApp = sdkPlugin.useApp;
