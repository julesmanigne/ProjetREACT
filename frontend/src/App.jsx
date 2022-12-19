import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, AppBar, CssBaseline, Grid, Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WidgetCard from "./components/WidgetCard";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import WidgetAlarm from "./components/WidgetAlarm";
import WidgetWeather from "./components/WidgetWeather";
import Widget4 from "./components/Widget4";
import Widget5 from "./components/Widget5";
import Widget6 from "./components/Widget6";
import AddAlarm from "./pages/AddAlarm";
import DeleteAlarm from "./pages/Collapsible";
import ModifyAlarm from "./pages/ModifyAlarm";
import ResponsiveAppBar from "./components/nav";
import Admin from "./components/Admin";
import Home from "./components/Home";


export { AddAlarm, DeleteAlarm, ModifyAlarm };

const darkTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#1D3461",
    },
  },
});

const App = () => {

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ResponsiveAppBar></ResponsiveAppBar>
        <Routes>
         <Route path="/" element={<Home></Home>}/>
          <Route path="/admin" element={<Admin></Admin>}/>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
