import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { AnalyticsView } from "../AnalyticsView";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type DataSet = {
  label: string;
  data: number[];
  backgroundColor: string;
};

export type ChartDataState = {
  labels: string[];
  datasets: DataSet[];
};

/**
 * Displays analytics data in a bar chart using data stored in local storage.
 */
export const DataAnalytics = () => {
  // Initialize state for chart data
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    /**
     * Fetches data from local storage and sets up the chart data.
     */
    const loadData = () => {
      const savedData = localStorage.getItem("excel_sheetwise_excelData");
      if (savedData) {
        const { columns, rows } = JSON.parse(savedData);
        const labels = rows.map((row: any) => row.field0 as string); // Assuming field0 contains labels
        const data = rows.map((row: any) => Number(row.field1)); // Assuming field1 contains data and is convertible to Number

        setChartData({
          labels,
          datasets: [
            {
              label: "Data Set 1",
              data,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      }
    };

    loadData();
  }, []);

  // Chart options
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <h2>Dynamic Data Analytics</h2>

      {chartData?.datasets.length > 1 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <AnalyticsView />
      )}
    </div>
  );
};
