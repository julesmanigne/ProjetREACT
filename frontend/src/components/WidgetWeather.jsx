import React, { useState } from "react";
import axios from "axios";
import "../index.css";
import ListItemText from "@mui/material/ListItemText";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

export default function WidgetWeather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=874ca5f59012a84fda38e98bb41e047a&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "25px",
        maxHeight: "500px",
        maxWidth: "400px",
        backgroundColor: "#EDF6F9",
      }}
    >
      <CardContent>
        <ListItemText
          sx={{ display: "flex", justifyContent: "center" }}
          primary="Weather"
          primaryTypographyProps={{
            fontFamily: "Ubuntu",
            fontSize: 40,
            fontWeight: 400,
            letterSpacing: 4,
          }}
        >
          {" "}
        </ListItemText>

        <div className="app">
          <div className="search">
            <input
              style={{ padding: 10, marginTop: 40, textAlign: "center" }}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Location"
              type="text"
            />
          </div>
          <div className="container">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                <h1>
                  {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                </h1>
              </div>
              <div className="descriptions">
                <p>{data.weather ? <p>{data.weather[0].main}</p> : null} </p>
              </div>
            </div>

            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main ? (
                    <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                  ) : null}
                  <p>Ressentie</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidité</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                  ) : null}
                  <p> Vent</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
