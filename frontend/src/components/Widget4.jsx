import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import "../index.css";
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
    cutout: 90,
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
          "rgba(111,106,248, 1)",
          "rgba(111,106,248, 0.8)",
          "rgba(111,106,248, 0.6)",
          "rgba(111,106,248, 0.4)",
          "rgba(111,106,248, 0.2)",
        ],
        hoverOffset: 5,
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        const { ctx } = chart;
        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;

        const text = "£" + spendings.toLocaleString();
        ctx.fillStyle = "black"; //<======= here
        ctx.font = "16px Poppins";
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";

        ctx.fillText(text, x, y);

        const text_2 = "Spending";
        ctx.fillStyle = "grey"; //<======= here
        ctx.font = "16px Poppins";
        ctx.textAlign = "center";
        ctx.textBaseLine = "middle";
        ctx.fillText(text_2, x, y + 22);
      },
    },
  ];

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "20px",
        marginLeft: "auto",
        backgroundColor: "#fff",
        boxShadow: 3,
      }}
    >
      <CardMedia />
      <ListItemText
        sx={{ display: "flex", justifyContent: "center", marginTop:2 }}
        primary="Spending Plan"
        primaryTypographyProps={{
          fontFamily: "Poppins",
          fontSize: 40,
          fontWeight: 400,
          letterSpacing: 0,
        }}
      >
        {" "}
      </ListItemText>
      <CardContent>
        <div className="infoline">
          <div>
            <Typography
              variant="h7"
              component="div"
              fontFamily="Poppins"
              color="grey"
            >
              Income
            </Typography>
            <Typography
              variant="h6"
              component="div"
              fontFamily="Poppins"
              color="black"
            >
              {" £ " + income.toLocaleString()}
            </Typography>
          </div>
          <div>
            <Typography
              variant="h7"
              component="div"
              fontFamily="Poppins"
              color="grey"
            >
              Spending
            </Typography>
            <Typography
              variant="h6"
              component="div"
              fontFamily="Poppins"
              color="black"
            >
              {"£ " + spendings.toLocaleString()}
            </Typography>
          </div>
        </div>
        <div className="donut">
          <Doughnut data={data} options={options} plugins={plugins} />
        </div>
        <div className="data">
          <Box
            sx={{
              display: "flex",
              flexWrap: 'wrap',
              justifyContent: "flex-end",
              flexDirection: 'column',
            }}
          >
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon
                        fontSize="small"
                        style={{ color: "rgba(111,106,248, 1)" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Savings" fontFamily="Poppins" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon
                        fontSize="small"
                        style={{ color: "rgba(111,106,248, 0.8)" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Transportation"
                      fontFamily="Poppins"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon
                        fontSize="small"
                        style={{ color: "rgba(111,106,248, 0.6)" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Debt" fontFamily="Poppins" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon
                        fontSize="small"
                        style={{ color: "rgba(111,106,248, 0.4)" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Life" fontFamily="Poppins" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon
                        fontSize="small"
                        style={{ color: "rgba(111,106,248, 0.2)" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Housing" fontFamily="Poppins" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}
