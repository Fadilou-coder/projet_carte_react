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

  console.log(props.donneesabsences);

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
        data: {
          Janvier: props.donneesabsences ? props.donneesabsences[0] : 10,
          Fevrier: props.donneesabsences ? props.donneesabsences[1] : 20,
          Mars: props.donneesabsences ? props.donneesabsences[2] : 60,
          Avril: props.donneesabsences ? props.donneesabsences[3] : 45,
          Mai: props.donneesabsences ? props.donneesabsences[4] : 21,
          Juin: props.donneesabsences ? props.donneesabsences[5] : 34,
          Juillet: props.donneesabsences ? props.donneesabsences[6] : 40,
          Aout: props.donneesabsences ? props.donneesabsences[7] : 20,
          Septembre: props.donneesabsences ? props.donneesabsences[8] : 73,
          Octobre: props.donneesabsences ? props.donneesabsences[9] : 12,
          Novembre:props.donneesabsences ? props.donneesabsences[10] : 56,
          Decembre: 10
        },
        backgroundColor: props.color,
      },

    ],
  };

  // console.log(<Bar options={options} data={data} />);

  return <Bar options={options} data={data} />;
}
