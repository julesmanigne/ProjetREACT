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
  const [chart, setChart] = useState([]);
  const [chartEth, setChartEth] = useState([]);

  const chartRefBtc = useRef(null);
  const chartRefEth = useRef(null); // the ref is used to reset zoom, and potentially for adding more buttons (f.e. zoom +10% ...)

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

        // console.log(allDataBTC);
        // console.log(allDataETH);

        setChart(allDataBTC);
        setChartEth(allDataETH);
      })
    );
  };

  useEffect(() => {
    fechtData();
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
        pointRadius: 0,
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
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
       
        borderRadius: "20px",
        backgroundColor: "#EDF6F9",
      }}
    >
      <ListItemText
        sx={{ display: "flex", justifyContent: "center" }}
        primary="Crypto"
        primaryTypographyProps={{
          fontFamily: "Ubuntu",
          fontSize: 40,
          fontWeight: 400,
          letterSpacing: 4,
        }}
      >
        {" "}
      </ListItemText>
      <CardContent>
        <div className="crytpo-container">
          <div className="crytpo-btc">
            <button className="resetZoomBtc" onClick={resetZoomBtc}>
              reset zoom
            </button>
            <Line ref={chartRefBtc} options={options_btc} data={data_btc} />
          </div>
          <div className="crytpo-eth">
            <button className="resetZoomEth" onClick={resetZoomEth}>
              reset zoom
            </button>
            <Line ref={chartRefEth} options={options_eth} data={data_eth} />
          </div>
        </div>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
