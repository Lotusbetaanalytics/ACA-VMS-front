import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["Total Visitors", "Visitors Checked In", "Visitors Pre Booked"];

export default function VerticalChart({
  visitors,
  checkedIn,
  preBooked,
  title,
}) {
  const data = {
    labels,
    datasets: [
      {
        label: [`Visitors ${title}`],
        data: [visitors, checkedIn, preBooked],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };
  return <Bar options={options} data={data} height="1190px" width="1350px" />;
}
