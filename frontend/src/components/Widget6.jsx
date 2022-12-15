import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import { Chart } from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Widget6() {
  const [chart, setChart] = useState([]);
  const chartRef = useRef(null); // the ref is used to reset zoom, and potentially for adding more buttons (f.e. zoom +10% ...)

  const date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var onemonth = date.getMonth();
  var year = date.getFullYear();

  var currentDate = `${year}-${month}-${day}`;
  var monthAgoDate = `${year}-${onemonth}-${day}`;

  var APIKey = "6397a6a3c141c0.63268239";
  var URL_1 =
    "https://eodhistoricaldata.com/api/eod/AAPL?from=" +
    monthAgoDate +
    "+&to=" +
    currentDate +
    "&period=d&api_token=" +
    APIKey +
    "&fmt=json";
  var URL_2 = `https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/1/day/${monthAgoDate}/${currentDate}?adjusted=true&sort=asc&limit=120&apiKey=yWeN5u4tEPBDGZDGLrsM4mRbHY2CghBa`;

  const getDate = () => {
    console.log(currentDate); // "YYYY-MM-DD"
    console.log(monthAgoDate); // "YYYY-MM-DD"
  };

  var options = {
    type: "line",
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "rgba(247, 164, 99,1)",
        text: "BTC",
        position: "top",
        align: "center",
        font: {
          family: "Ubuntu Condensed",
          size: 25,
          weight: "bold",
        },
      },
      zoom: {
        pan: {
          // pan options and/or events
        },
        limits: {
          // axis limits
        },
        zoom: {
          // zoom options and/or events
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        display: true,
        scaleLabel: true,
        gridLines: {
          drawBorder: false,
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 4,
          maxRotation: 0,
          font: {
            family: "Nunito",
            size: 12,
            weight: "bold",
          },
        },
      },
      y: {
        display: true,
        scaleLabel: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 3,
          maxRotation: 0,
          font: {
            family: "Nunito",
            size: 12,
            weight: "bold",
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  var getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  var TableauDate = getDaysArray(monthAgoDate, currentDate);
  var labels = TableauDate.map((v) => v.toLocaleDateString("fr"));

  const getLabels = () => {
    console.log(labels); // "YYYY-MM-DD"
  };

  var data = {
    labels,
    datasets: [
      {
        fill: true,
        data: chart?.results?.map((x) => x.h),
        borderColor: "rgba(247, 164, 99,1)",
        backgroundColor: (context = "line") => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(247,164,99,0.75)");
          gradient.addColorStop(1, "rgba(247,164,99,0.25)");
          return gradient;
        },
        borderWidth: 2,
        borderCapStyle: "round",
        tension: 0.5,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(URL_2)
      .then((res) => {
        console.log(res);
        setChart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const resetZoom = () => {
    chartRef.current.resetZoom();
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        {/* <ul>
          {prices.map((price) => (
            <li key={price.id}>{price.h}</li>
          ))}
        </ul>*/}
        <div className="canvas-container">
          <Line ref={chartRef} options={options} data={data} />
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={getDate}>
          GET DATE
        </Button>
        <Button size="small" onClick={resetZoom}>
          RESET ZOOM
        </Button>
      </CardActions>
    </Card>
  );
}
