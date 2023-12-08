import React, { useEffect } from "react";
import { Chart, ChartType } from "chart.js/auto";

interface DataItem {
  age: string;
  expenses: number;
  earning: number;
}

interface Props {
  data: DataItem[];
  v_type: ChartType;
  v_fill: boolean;
  chartId: string;
}

const StandardDeviationChart: React.FC<Props> = ({
  data,
  v_type,
  v_fill,
  chartId,
}) => {
  useEffect(() => {
    const expensesArray = data.map((item) => item.expenses);
    const earningsArray = data.map((item) => item.earning);

    const expensesStandardDeviation = Math.sqrt(
      expensesArray.reduce(
        (acc, value) =>
          acc +
          Math.pow(
            value -
              expensesArray.reduce((a, b) => a + b) / expensesArray.length,
            2
          ),
        0
      ) / expensesArray.length
    );
    const earningsStandardDeviation = Math.sqrt(
      earningsArray.reduce(
        (acc, value) =>
          acc +
          Math.pow(
            value -
              earningsArray.reduce((a, b) => a + b) / earningsArray.length,
            2
          ),
        0
      ) / earningsArray.length
    );

    const expensesVariance = expensesStandardDeviation ** 2;
    const earningsVariance = earningsStandardDeviation ** 2;

    const ctx = document.getElementById(chartId) as HTMLCanvasElement | null;

    if (ctx) {
      const existingChart = Chart.getChart(ctx);

      if (existingChart) {
        existingChart.destroy();
      }

      const myChart = new Chart(ctx, {
        type: v_type,
        data: {
          labels: data.map((item) => item.age),
          datasets: [
            {
              label: "Expenses",
              data: expensesArray,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: v_fill,
            },
            {
              label: "Earnings",
              data: earningsArray,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              fill: v_fill,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            annotation: {
              annotations: [
                {
                  type: "line",
                  mode: "horizontal",
                  scaleID: "y",
                  value: expensesStandardDeviation,
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 2,
                  label: {
                    content: "Expenses SD",
                    enabled: true,
                    position: "right",
                  },
                },
                {
                  type: "line",
                  mode: "horizontal",
                  scaleID: "y",
                  value: earningsStandardDeviation,
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 2,
                  label: {
                    content: "Earnings SD",
                    enabled: true,
                    position: "right",
                  },
                },
                {
                  type: "line",
                  mode: "horizontal",
                  scaleID: "y",
                  value: expensesVariance,
                  borderColor: "rgba(255, 99, 132, 0.5)",
                  borderWidth: 2,
                  label: {
                    content: "Expenses Variance",
                    enabled: true,
                    position: "left",
                  },
                },
                {
                  type: "line",
                  mode: "horizontal",
                  scaleID: "y",
                  value: earningsVariance,
                  borderColor: "rgba(54, 162, 235, 0.5)",
                  borderWidth: 2,
                  label: {
                    content: "Earnings Variance",
                    enabled: true,
                    position: "left",
                  },
                },
              ],
            },
          },
        },
      });
    }

    return () => {
      const existingChart = Chart.getChart(ctx as HTMLCanvasElement | string);
      if (existingChart) {
        existingChart.destroy();
      }
    };
  }, [data, v_type, chartId, v_fill]);

  return <canvas id={chartId} width="400" height="200"></canvas>;
};

export default StandardDeviationChart;
