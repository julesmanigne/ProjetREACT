import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Grid, Link } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import AddAlarm from '../pages/AddAlarm';
import DeleteAlarm from '../pages/DeleteAlarm';
import ModifyAlarm from '../pages/ModifyAlarm';

export { AddAlarm, DeleteAlarm, ModifyAlarm }

const label = { inputProps: { 'aria-label': 'Switch demo' } };


export default function WidgetAlarm() {

  const [alarms, setAlarms] = useState([])

  const fetchAlarms = async () => {
    const { data } = await axios.get("/alarms");

    setAlarms(data);

  };

  console.log(alarms);

  useEffect(() => {
    fetchAlarms();
  }, []);


  return (
    <>
   
        <Card sx={{ height: "100%" }}>
          <CardMedia />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Alarms
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {alarms.data?.map((data, id) => {
                let options = {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
                  hour12: false,
                };

                const d1 = new Date(data.time);
                const d2 = new Intl.DateTimeFormat('default', options).format(d1);

                return <div key={id}>
                  <br />
                  <Grid container spacing={2}>

                    <ListItemText primary={data.label} />
                    <Grid item xs={6} md={4}>
                    </Grid>
                    <Grid item xs={6} md={12}>
                      <h4>{d2}</h4>

                    </Grid>
                    <Grid item xs={6} md={4}>
                      {data.state ? "ON" : "OFF"}
                    </Grid>
                    <Link to='delete'>
                      <Button variant="outlined" size="small" style={{ marginRight: 10 }}>  <DeleteForeverIcon /></Button>
                    </Link>
                    <Button variant="outlined" size="small"><EditIcon /></Button>

                  </Grid>
                </div>

              })}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container spacing={1}>
              <Grid item xs={12} md={16}>
                <Button style={{ width: '100%', height: 40 }} size="small"><AddCircleIcon /></Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
  
    </>
  );
}
