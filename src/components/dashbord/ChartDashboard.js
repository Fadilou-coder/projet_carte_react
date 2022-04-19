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
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function ChartDashboard(props) {

  const options = {

    tooltips: {
      titleAlign: "center",
      titleMarginBottom: 8,
      bodyFontFamily: "'Nunito', sans-serif",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            fontFamily: "'Nunito', sans-serif",
            fontSize: 14,
            beginAtZero: true,

            max: 100,
            stepSize: 5
          }
        }
      ]
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props.titre.toUpperCase(),
      },
      hover: {
        mode: 'label'
      }

    },

  };

  const labels = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

  const data = {
    labels,
    datasets: [
      {
        label: "Donnees " + props.titre,
        data: {
          Janvier: 10,
          Fevrier: 20,
          Mars: 60,
          Avril: 45,
          Mai: 21,
          Juin: 34,
          Juillet: 40,
          Aout: 20,
          Septembre: 73,
          Octobre: 12,
          Novembre: 56,
          Decembre: 10
        },
        backgroundColor: props.color,
      },

    ],
  };

  console.log(<Bar options={options} data={data} />);

  return <Bar options={options} data={data} />;
}
