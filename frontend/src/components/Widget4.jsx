import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircleIcon from "@mui/icons-material/Circle";

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
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const data = {
    labels: ["Savings", "Transportation", "Debt", "Life", "Housing"],
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
          "rgba(0, 77, 228, 0.6)",
          "rgba(111, 104, 206, 0.6)",
          "rgba(249, 219, 108, 0.6)",
          "rgba(132, 220, 198, 0.6)",
          "rgba(172, 215, 236, 0.6)",
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
        const text_2 = "Spending";
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";

        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;

        ctx.fillText(text, x, y);
        ctx.fillText(text_2, x, y + 17);
      },
    },
  ];
  return (
    <Card sx={{
      height: "100%", borderRadius: "20px",
      marginLeft: "auto",
      backgroundColor: "#EDF6F9"
    }}>
      <CardMedia />
      <ListItemText
        sx={{ display: 'flex', justifyContent: 'center' }}
        primary="Spending Plan"
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
        <div class="center2">
          <Typography
            variant="h7"
            component="div"
            fontFamily="Ubuntu"
            color="grey"
          >
            Income : {"£ " + income.toLocaleString()}
          </Typography>
        </div>
        <div class="center2">
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
        <div className="data">
          <Box
            sx={{
              display: "flex", justifyContent: "flex-end"
            }}
          >
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon
                        fontSize="small"
                        style={{ color: "rgb(0, 77, 228)" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Savings" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon
                        fontSize="small"
                        style={{ color: "rgb(111, 104, 206)" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Transportation" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon
                        fontSize="small"
                        style={{ color: "rgb(249, 219, 108)" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Debt" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon
                        fontSize="small"
                        style={{ color: "rgb(132, 220, 198)" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Life" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon
                        fontSize="small"
                        style={{ color: "rgb(172, 215, 236)" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Housing" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </div>
      </CardContent>
    </Card >
  );
}
