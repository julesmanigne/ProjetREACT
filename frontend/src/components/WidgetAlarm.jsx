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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Collapsible from "../pages/Collapsible";
import Collapsible2 from "../pages/Collapsible2";
import TextField from "@mui/material/TextField";
import "../App.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';


const label = { inputProps: { "aria-label": "Switch demo" } };

export default function WidgetAlarm() {
  const [value, setValue] = React.useState(dayjs());
  const [name, setName] = useState("");
  const [alarms, setAlarms] = useState([]);

  const deleteHandler = async (id) => {
    if (window.confirm("Delete?")) {
      const { data } = await axios.delete(`/alarms/alarm/${id}`);
    }
    fetchAlarms();
  };

  const createHandler = async (id) => {
    if (window.confirm("Add?")) {
      const payload = {
        "label": name,
        "time": value,
        "status": true,
      };
      const { data } = await axios.post(`/alarms/alarm`, payload);
    }
    fetchAlarms();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && value) {
      console.log("value is:", name, value, checked);
    }
  };

  const [checked, setChecked] = useState(false);
  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const updateHandler = async (id) => {
    if (window.confirm("Update?")) {
      const payload = {
        "label": name,
        "time": value,
        "status": checked,
      };
      console.log(id);
      console.log(value, name);
      const { data } = await axios.put(`/alarms/alarm/${id}`, payload);
      
    }
    fetchAlarms();
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
        justifyContent: "space-between",
        alignItems: "stretch",
        height: 700,
        overflow: "hidden",
        overflowY: "scroll",
        backgroundColor: "#EDF6F9",
        "&::-webkit-scrollbar": {
          width: 0
        }
      }}>
        <CardMedia />
        <CardContent>
          <ListItemText
            sx={{ display: 'flex', justifyContent: 'center' }}
            primary="Alarms"
            primaryTypographyProps={{
              fontFamily: "Ubuntu",
              fontSize: 40,
              fontWeight: 400,
              letterSpacing: 4,
            }}
          >
            {" "}
          </ListItemText>
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
                  <Box sx={{}}>
                    <Grid item xs={18}>
                      
                      <List sx={{  display: "flex", border: "1px solid rgb(95, 122, 227);", marginBottom: 2, borderRadius: 5, paddingLeft: 0,  }}>
                       
                      <Grid item xs={2} sm={4} md={5} sx={{  display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <button
                              className="AlarmButton2"
                              variant="outlined"
                              size="small"
                              style={{ marginRight: 10}}
                              onClick={() => deleteHandler(alarms.data[id]._id)}
                            >
                              {" "}
                              <DeleteForeverIcon />
                            </button>
                         </Grid>
                        <ListItemText
                          sx={{  margin: 'auto' }}
                          primary={data.label}
                          secondary={d2}
                          primaryTypographyProps={{
                            fontFamily: "Ubuntu",
                            fontSize: 30,
                            fontWeight: "bold",
                            letterSpacing: 1,
                          }}
                        >
                          {" "}
                        </ListItemText>
                        <Grid sx={{ textAlign: 'center', display: "flex" }} item xs={2} md={2}>
                          <ListItemText
                            sx={{ margin: 'auto' }}
                            primary={data.status ? "ON" : "OFF"}
                            primaryTypographyProps={{
                              fontFamily: "Ubuntu",
                              fontSize: 30,
                              fontStyle: 'italic',
                              fontWeight: 1000,
                              letterSpacing: 0,
                            }}
                          >
                            {" "}
                          </ListItemText>
                        </Grid>
                        <Grid item xs={2} sm={4} md={5} sx={{  display: "flex", justifyContent: "center", alignItems: "center", margin:'auto'}}></Grid>
                          <Collapsible2 label="Edit" >
                            <form onSubmit={handleSubmit}>
                              <TextField onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" size="small" style={{ width: '100%', marginBottom: 30 }} />
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                  style={{ width: '100%', height: 40}}
                                  renderInput={(props) => <TextField {...props} />}
                                  label="Time and Date of alarm"
                                  value={value}
                                  onChange={(newValue) => {
                                    setValue(newValue);
                                  }}
                                />
                              </LocalizationProvider>
                              <Switch checked={checked} onChange={switchHandler}></Switch>
                              <h3>ON?</h3>
                              <Button type="submit" style={{ width: '100%', height: 40}} size="small" onClick={() => updateHandler(data._id)}><AddCircleIcon /></Button>
                            </form>
                          </Collapsible2>
                      </List>    
                    </Grid>
                  </Box>  
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
                    style={{ width: "100%", marginBottom: 30 , marginTop: 30 }}
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
                    style={{ width: "95%", height: 40 }}
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
      </Card >
    </>
  );
}
