import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import ListItemText from "@mui/material/ListItemText";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from '@mui/material/Box';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";


export default function WidgetWeather() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("Paris");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=874ca5f59012a84fda38e98bb41e047a&units=metric`;

  const searchLocation = () => {
    // eslint-disable-next-line
    {
      axios.get(url).then((res) => {
        setData(res.data);
      });
      setLocation("");
    }
  };

  const search = (e) => {
    if (e.key === "Enter") {
      searchLocation();
    }
  };

  useEffect(() => {
    
    searchLocation();// eslint-disable-next-line
  }, []); 

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "10px",
        backgroundColor: colors.primary[600],
        boxShadow: 3,
      }}
    >
      <CardContent>
        <ListItemText
          sx={{ display: "flex", justifyContent: "center" }}
          primary="Weather"
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

        <div className="app">
          <div className="search">
            <input
              style={{ padding: 10, marginTop: 40, textAlign: "center", width: "90%",  backgroundColor : colors.indigo[900], color:"#fff"}}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={search}
              placeholder="Enter location"
              type="text"
            />
          </div>
          <div className="container">
            <div className="top">
              <div className="location">
              <ListItemText sx={{
                color: colors.grey[200]
              }}>
                <h1>{data.name}</h1>
                </ListItemText>
              </div>
              <div className="temp">
              <ListItemText sx={{
                color: colors.grey[200]
              }}>
                  {data.main ? <h2>{data.main.temp.toFixed()}°C</h2> : null}
                </ListItemText>
              </div>
              
              <div className="descriptions">
              <ListItemText sx={{
                color: colors.grey[200]
              }}>
                <p>{data.weather ? <p>{data.weather[0].main}</p> : null} </p>
                </ListItemText>
              </div>
            </div>

            {data.name !== undefined && (
              <div className="bottom">
                <Box  sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  textAlign: 'center',
                  width: '100%',
                  margin: '2rem auto',
                  padding:'1rem',
                  borderRadius: '10px',
                  color: colors.grey[200],
                  backgroundColor : colors.indigo[900],
                 }}>
                <div className="feels">
                  {data.main ? (
                    <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                  ) : null}
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">{data.wind.speed.toFixed()} KPH</p>
                  ) : null}
                  <p> Wind</p>
                </div>
                </Box>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
