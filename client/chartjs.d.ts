import "chart.js";

declare module "chart.js" {
  interface PluginOptionsByType<T = keyof ChartTypeRegistry> {
    annotation?: {
      annotations: {
        type: string;
        mode: string;
        scaleID: string;
        value: number;
        borderColor: string;
        borderWidth: number;
        label: {
          content: string;
          enabled: true;
          position: string;
        };
      }[];
    };
  }
}
