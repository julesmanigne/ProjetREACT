import React from "react";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import AddAlarm from "./pages/AddAlarm";
import DeleteAlarm from "./pages/Collapsible";
import ModifyAlarm from "./pages/ModifyAlarm";
import ResponsiveAppBar from "./components/nav";
import Admin from "./components/Admin";
import Home from "./components/Home";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

export { AddAlarm, DeleteAlarm, ModifyAlarm };


const App = () => {

  
const [theme, colorMode] = useMode();

  return (
    <>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveAppBar></ResponsiveAppBar>
        <Routes>
         <Route path="/" element={<Home></Home>}/>
          <Route path="/admin" element={<Admin></Admin>}/>
        </Routes>
      </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
