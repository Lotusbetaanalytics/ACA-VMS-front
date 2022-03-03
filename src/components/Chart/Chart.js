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

export default function VerticalChart(props) {
  const data = {
    labels: [
      "Visitors Today",
      "Pending",
      "Checked In",
      "Checked Out",
      "All Visitors",
    ],
    datasets: [
      {
        label: "Visitors Today",

        data: [
          props.visitors,
          props.pending,
          props.checkedin,
          props.checkedout,
          props.allVisitors,
        ],
        backgroundColor: ["teal", "purple", "orange", "pink", "green"],
        border: 1,
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
  return <Bar options={options} data={data} />;
}
