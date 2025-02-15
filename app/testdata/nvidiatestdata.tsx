import { ChartData } from "chart.js";

export let NvidiaTestData: ChartData<'line'> = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mai"],
  datasets: [
    {
      label: "Salg",
      data: [30, 50, 40, 70, 90],
      borderColor: "green",
      backgroundColor: "rgba(0, 0, 255, 0.3)",
    },
  ],
};