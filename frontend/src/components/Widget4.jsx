import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Widget4() {
  const Savings = faker.commerce.price(100, 350, 0);
  const Transportation = faker.commerce.price(100, 300, 0);
  const Debt = faker.commerce.price(175, 400, 0);
  const Life = faker.commerce.price(300, 600, 0);
  const Housing = faker.commerce.price(300, 800, 0);

  const income = faker.commerce.price(2050, 3500, 0);
  const spendings =
    Number(Savings) +
    Number(Transportation) +
    Number(Debt) +
    Number(Life) +
    Number(Housing);

  const getData = () => {
    console.log(Savings);
    console.log(Transportation);
    console.log(Debt);
    console.log(Life);
    console.log(Housing);

    console.log(income);
  };
  const options = {
    type: "doughnut",
    responsive: true,
    cutout: 55,
    // borderRadius: 12,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value) => {
          return value + "%";
        },
      },
    },
  };
  const data = {
    labels: ["Savings", "Transportation", "Debt", "Life", "Housing"],
    datasets: [
      {
        data: [Savings, Transportation, Debt, Life, Housing],
        backgroundColor: [
          "rgb(0, 77, 228)",
          "rgb(111, 104, 206)",
          "rgb(215, 219, 229)",
          "rgb(132, 220, 198)",
          "rgb(172, 215, 236)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        ctx.font = "18px Ubuntu";
        ctx.textBaseline = "top";
        var text = "$ " + spendings,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
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
        <div></div>
        <div className="donut">
          <Doughnut data={data} options={options} plugins={plugins} />
        </div>
      </CardContent>
    </Card>
  );
}
