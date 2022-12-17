import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Widget4() {
  const Savings = faker.commerce.price(2000, 3000, 0);
  const Transportation = faker.commerce.price(1000, 1200, 0);
  const Debt = faker.commerce.price(3500, 3700, 0);
  const Life = faker.commerce.price(2500, 3000, 0);
  const Housing = faker.commerce.price(5000, 7000, 0);

  const income_1 = faker.commerce.price(25000, 45000, 0);
  const income = Number(income_1);
  const spendings =
    Number(Savings) +
    Number(Transportation) +
    Number(Debt) +
    Number(Life) +
    Number(Housing);

  const options = {
    type: "doughnut",
    responsive: true,
    cutout: 92,
    radius: 95,
    borderRadius: 5,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const data = {
    labels: ["", "", "", "", ""],
    datasets: [
      {
        data: [
          Number(Savings),
          Number(Transportation),
          Number(Debt),
          Number(Life),
          Number(Housing),
        ],
        backgroundColor: [
          "rgb(0, 77, 228)",
          "rgb(111, 104, 206)",
          "rgb(249, 219, 108)",
          "rgb(132, 220, 198)",
          "rgb(172, 215, 236)",
        ],
        hoverOffset: 5,
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        const { ctx } = chart;

        ctx.font = "18px Ubuntu";
        const text = "£" + spendings.toLocaleString();
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";

        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;

        ctx.fillText(text, x, y);
        //ctx.fillRect(x, y, 6, 6);
      },
    },
  ];
  return (
    <Card sx={{ height: "100%", borderRadius: "20px" }}>
      <CardMedia />
      <CardContent>
        <Typography variant="h5" component="div" fontFamily="Ubuntu">
          Spending plan
        </Typography>
        <div>
          <Typography
            variant="h7"
            component="div"
            fontFamily="Ubuntu"
            color="grey"
          >
            Income : {"£ " + income.toLocaleString()}
          </Typography>
          <Typography
            variant="h7"
            component="div"
            fontFamily="Ubuntu"
            color="grey"
          >
            Spending : {"£ " + spendings.toLocaleString()}
          </Typography>
        </div>
        <div className="donut">
          <Doughnut data={data} options={options} plugins={plugins} />
        </div>
        <div className="data"></div>
      </CardContent>
    </Card>
  );
}
