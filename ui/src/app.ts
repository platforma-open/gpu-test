import { platforma } from "@platforma-open/milaboratories.gpu-test.model";
import { defineAppV3 } from "@platforma-sdk/ui-vue";
import GpuInfoPage from "./pages/GpuInfoPage.vue";

export const sdkPlugin = defineAppV3(platforma, () => {
  return {
    routes: {
      "/": () => GpuInfoPage,
    },
  };
});

export const useApp = sdkPlugin.useApp;
