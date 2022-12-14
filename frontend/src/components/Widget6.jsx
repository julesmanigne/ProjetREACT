import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
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

import { tokens } from "../theme";
import { useTheme } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  zoomPlugin
);

export default function Widget6() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chart, setChart] = useState([]);
  const [chartEth, setChartEth] = useState([]);

  const chartRefBtc = useRef(null);
  const chartRefEth = useRef(null);

  const date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var onemonth = date.getMonth();
  var year = date.getFullYear();

  var currentDate = `${year}-${month}-${day}`;
  var monthAgoDate = `${year}-${onemonth}-${day}`;

  const fechtData = () => {
    const BTC_URL = `https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/1/day/${monthAgoDate}/${currentDate}?adjusted=true&sort=asc&limit=120&apiKey=yWeN5u4tEPBDGZDGLrsM4mRbHY2CghBa`;
    const ETH_URL = `https://api.polygon.io/v2/aggs/ticker/X:ETHUSD/range/1/day/${monthAgoDate}/${currentDate}?adjusted=true&sort=asc&limit=120&apiKey=yWeN5u4tEPBDGZDGLrsM4mRbHY2CghBa`;

    const getBTC = axios.get(BTC_URL);
    const getETH = axios.get(ETH_URL);
    axios.all([getBTC, getETH]).then(
      axios.spread((...allData) => {
        const allDataBTC = allData[0].data;
        const allDataETH = allData[1].data;

        setChart(allDataBTC);
        setChartEth(allDataETH);
      })
    );
  };

  useEffect(() => {
    fechtData();// eslint-disable-next-line
  }, []);

  const resetZoomBtc = () => {
    chartRefBtc.current.resetZoom();
  };

  const resetZoomEth = () => {
    chartRefEth.current.resetZoom();
  };

  const options_btc = {
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
        align: "start",
        font: {
          family: "Poppins",
          size: 25,
          weight: "bold",
        },
      },
      zoom: {// eslint-disable-next-line
        pan: {
          // pan options and/or events
        },
        limits: {
          // axis limits
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },// eslint-disable-next-line
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
            family: "Poppins",
            size: 12,
            weight: "bold",
          },
        },
      },
      y: {
        display: true,
        scaleLabel: false,
        grid: {
          display: false,
        },// eslint-disable-next-line
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 3,
          maxRotation: 0,
          font: {
            family: "Poppins",
            size: 12,
            weight: "bold",
          },
        },
      },
    },
  };

  const options_eth = {
    type: "line",
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "rgba(95, 122, 227,1)",
        text: "ETH",
        position: "top",
        align: "start",
        font: {
          family: "Poppins",
          size: 25,
          weight: "bold",
        },
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },// eslint-disable-next-line
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
            family: "Poppins",
            size: 12,
            weight: "bold",
          },
        },
      },
      y: {
        display: true,
        scaleLabel: false,
        grid: {
          display: false,
        },// eslint-disable-next-line
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 3,
          maxRotation: 0,
          font: {
            family: "Poppins",
            size: 12,
            weight: "bold",
          },
        },
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

  var data_btc = {
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
        tension: 0.5,
        pointRadius: 1,
        pointHoverRadius: 0,
      },
    ],
  };

  var data_eth = {
    labels,
    datasets: [
      {
        fill: true,
        data: chartEth?.results?.map((x) => x.h),
        borderColor: "rgba(95, 122, 227,1)",
        backgroundColor: (context = "line") => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(95,122,227,0.75)");
          gradient.addColorStop(1, "rgba(95,122,227,0.25)");
          return gradient;
        },
        borderWidth: 2,
        tension: 0.5,
        pointRadius: 1,
        pointHoverRadius: 0,
      },
    ],
  };

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        boxShadow: 3,
        borderRadius: "10px",
        backgroundColor: colors.primary[600],
      }}
    >
      <ListItemText
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
        primary="Crypto Currencies"
        primaryTypographyProps={{
          color: colors.grey[100],
          fontFamily: "Poppins",
          fontSize: 40,
          fontWeight: 400,
          letterSpacing: 0,
        }}
      >
        {" "}
      </ListItemText>
      <CardContent>
        <div className="crytpo-container">
          <div className="crytpo-btc">
            <button className="resetZoomBtc" onClick={resetZoomBtc}>
              Reset zoom
            </button>
            <Line ref={chartRefBtc} options={options_btc} data={data_btc} />
          </div>
          <div className="crytpo-eth">
            <button className="resetZoomEth" onClick={resetZoomEth}>
              Reset zoom
            </button>
            <Line ref={chartRefEth} options={options_eth} data={data_eth} />
          </div>
        </div>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
