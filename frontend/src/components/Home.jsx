import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, AppBar, CssBaseline, Grid, Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WidgetCard from "./WidgetCard";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import WidgetAlarm from "./WidgetAlarm";
import WidgetWeather from "./WidgetWeather";
import Widget4 from "./Widget4";
import Widget5 from "./Widget5";
import Widget6 from "./Widget6";
import AddAlarm from "../pages/AddAlarm";
import DeleteAlarm from "../pages/Collapsible";
import ModifyAlarm from "../pages/ModifyAlarm";

export { AddAlarm, DeleteAlarm, ModifyAlarm };

const darkTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#1D3461",
    },
  },
});

const Home = () => {

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      </ThemeProvider>
      <main>
        <Container maxWidth="xxl">
          <Box sx={{ bgcolor: "#1D3461", height: "100%", padding: 2 }}>
            <Box
              sx={{
                flexDirection: "row",
                flexWrap: "wrap",
                display: "flex",
                justifyContent: "space-around",
                p: 5,
                m: "auto",
              }}
            >
              <Grid container spacing={4} columns={16}>
                <Grid item lg={8} md={8}>
                  <WidgetCard></WidgetCard>
                </Grid>
                <Grid item lg={8} md={4}>
                  <WidgetAlarm></WidgetAlarm>
                </Grid>
                <Grid item lg={5} md={4}>
                  <WidgetWeather></WidgetWeather>
                </Grid>
                <Grid item lg={6} md={8}>
                  <Widget4></Widget4>
                </Grid>
                <Grid item lg={5} md={8}>
                  <Widget5></Widget5>
                </Grid>
                <Grid item lg={18} md={4}>
                  <Widget6></Widget6>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Home;
