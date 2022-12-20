import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Grid } from "@mui/material";
import WidgetCard from "./WidgetCard";
import Box from "@mui/material/Box";
import WidgetAlarm from "./WidgetAlarm";
import WidgetWeather from "./WidgetWeather";
import Widget4 from "./Widget4";
import Widget5 from "./Widget5";
import Widget6 from "./Widget6";
import AddAlarm from "../pages/AddAlarm";
import DeleteAlarm from "../pages/Collapsible";
import ModifyAlarm from "../pages/ModifyAlarm";

export { AddAlarm, DeleteAlarm, ModifyAlarm };

const lightheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F8FAFB",
    },
  },
});

const Home = () => {
  return (
    <>
      <ThemeProvider theme={lightheme}>
        <CssBaseline />
      </ThemeProvider>
      <main>
        <Box sx={{ bgcolor: "#F8FAFB", height: "100%", padding: 2 }}>
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
            <Grid container spacing={2} columns={12}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <WidgetCard></WidgetCard>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <WidgetAlarm></WidgetAlarm>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <WidgetWeather></WidgetWeather>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Widget4></Widget4>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Widget5></Widget5>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Widget6></Widget6>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Home;
