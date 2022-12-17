import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Grid, List } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Collapsible from "../pages/Collapsible";
import TextField from "@mui/material/TextField";
import "../App.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function WidgetAlarm() {
  const [value, setValue] = React.useState(dayjs());
  const [name, setName] = useState("");
  const [alarms, setAlarms] = useState([]);

  const deleteHandler = async (id) => {
    if (window.confirm("Delete?")) {
      const { data } = await axios.delete(`/alarms/alarm/${id}`);
    }
  };

  const createHandler = async (id) => {
    if (window.confirm("Add?")) {
      const payload = {
        "label": name,
        "time": value,
        "state": true,
      };
      const { data } = await axios.post(`/alarms/alarm`, payload);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && value) {
      console.log("value is:", name, value);
    }
  };

  const updateHandler = async (id) => {
    if (window.confirm("Update?")) {
      const payload = {
        "label": name,
        "time": value,
        "status": true,
      };
      console.log(id);
      console.log(value, name);
      const { data } = await axios.put(`/alarms/alarm/${id}`, payload);
    }
  };

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
      <Card sx={{
        height: "100%", borderRadius: "25px", maxHeight: "400px",
        display: "flex",
        flexDirection: "column",
        height: 700,
        overflow: "hidden",
        overflowY: "scroll",
      }}>
        <CardMedia />
        <CardContent>
          <Typography variant="h5" component="div">
            Alarms
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {alarms.data?.map((data, id) => {
              let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
              };

              const d1 = new Date(data.time);
              const d2 = new Intl.DateTimeFormat("default", options).format(d1);

              return (
                <div key={id}>
                  <br />
                  <Grid container spacing={2}>
                    <List sx={{ width: "100%" }}>
                      <ListItemText
                        sx={{ marginLeft: 2 }}
                        primary={data.label}
                        primaryTypographyProps={{
                          fontSize: 25,
                          fontWeight: "bold",
                          letterSpacing: 0,
                        }}
                      >
                        {" "}
                      </ListItemText>
                    </List>
                    <Grid item xs={2} md={4}>
                      <h4>{d2}</h4>
                    </Grid>
                    <Grid item xs={2} md={4}>
                      {data.state ? "ON" : "OFF"}
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ marginRight: 10 }}
                        onClick={() => deleteHandler(alarms.data[id]._id)}
                      >
                        {" "}
                        <DeleteForeverIcon />
                      </Button>
                      <Button
                        href={`/alarm/${alarms.data[id]._id}`}
                        variant="outlined"
                        size="small"
                      >
                        <EditIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={2} md={12}>
              <Collapsible label="Add">
                <form onSubmit={handleSubmit}>
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%", marginBottom: 30 }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      style={{ width: "100%", height: 40 }}
                      renderInput={(props) => <TextField {...props} />}
                      label="Time and Date of alarm"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </LocalizationProvider>
                  <Button
                    type="submit"
                    style={{ width: "100%", height: 40 }}
                    size="small"
                    onClick={() => createHandler()}
                  >
                    <AddCircleIcon />
                  </Button>
                </form>
              </Collapsible>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}
