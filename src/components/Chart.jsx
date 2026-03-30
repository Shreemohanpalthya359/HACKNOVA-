import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [120, 200, 150, 250, 300],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        Sales Overview
      </h2>
      <Bar data={data} />
    </div>
  );
};

export default Chart;