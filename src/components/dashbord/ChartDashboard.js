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

  console.log(props.donneesretards);

  let donneescharts = [
    100,
    20,
    60,
    45,
   21,
    34,
    40,
    20,
    73,
     12,
     56,
   10
  ];

  if (props.donneesabsences) {
    donneescharts = props.donneesabsences;
  }


  if (props.donneesretards) {
    donneescharts = props.donneesretards;
  }
  const options = {

    tooltips: {
      titleAlign: "center",
      titleMarginBottom: 8,
      bodyFontFamily: "'Nunito', sans-serif",
    },
    responsive: true,
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
        data: donneescharts,
        backgroundColor: props.color,
      },

    ],
  };

  // console.log(<Bar options={options} data={data} />);

  return <Bar options={options} data={data} />;
}
