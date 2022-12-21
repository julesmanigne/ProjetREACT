import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, List } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import "../App.css";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Collapsible from "../pages/Collapsible";

import { tokens } from "../theme";
import { useTheme } from "@mui/material";


export default function Admin() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [alarms, setAlarms] = useState([]);
  const [value, setValue] = React.useState(dayjs());
  const [name, setName] = useState("");

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
        label: name,
        time: value,
        status: checked,
      };
      console.log(id);
      console.log(value, name);
      await axios.put(`/alarms/alarm/${id}`, payload);
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

  const deleteHandler = async (id) => {
    if (window.confirm("Delete?")) {
      await axios.delete(`/alarms/alarm/${id}`);
    }
    fetchAlarms();
  };

  const createHandler = async (id) => {
    if (window.confirm("Add?")) {
      const payload = {
        label: name,
        time: value,
        status: true,
      };
      await axios.post(`/alarms/alarm`, payload);
    }
    fetchAlarms();
  };

  return (
    <div style={{ height: 400, width: "100%", marginTop:10 }}>
      <Collapsible label="Add">
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            style={{ width: "100%", marginBottom: 30, marginTop: 30 }}
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
      <Typography variant="body2" color={colors.primary[100]}>
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
              <Box sx={{ display: "flex", justifyContent: "center",  color:colors.primary[100] }}>
                <Grid item xs={4} md={6}>
                  <List
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      border: "1px solid rgb(95, 122, 227);",
                      margin: 2,
                      borderRadius: 5,
                      padding: 3,
                    }}
                  >
                    <ListItemText
                      sx={{  color:colors.primary[800]  }}
                      primary={data.label}
                      secondary={d2}
                      primaryTypographyProps={{
                        fontFamily: "Open Sans",
                        fontSize: 30,
                        fontWeight: "bold",
                        letterSpacing: 1,
                      }}
                    >
                      {" "}
                    </ListItemText>
                    <Grid sx={{ margin: 5,  color:colors.primary[300]  }} item xs={2} md={4}>
                      <ListItemText
                        sx={{  color:colors.primary[300] }}
                        primary={data.status ? "ON" : "OFF"}
                        primaryTypographyProps={{
                          fontFamily: "Open Sans",
                          fontSize: 25,
                          fontWeight: 1000,
                          letterSpacing: 0,
                        }}
                      >
                        {" "}
                      </ListItemText>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        onChange={(e) => setName(e.target.value)}
                        id="outlined-basic"
                        label="Edit Name"
                        variant="outlined"
                        size="small"
                        style={{ width: "100%", padding: 30 }}
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          style={{ marginLeft: 1250 }}
                          renderInput={(props) => <TextField {...props} />}
                          label="Time and Date of alarm"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                        />
                      </LocalizationProvider>
                      <Switch
                        checked={checked}
                        onChange={switchHandler}
                      ></Switch>

                      <Button
                        type="submit"
                        style={{ width: "100%", height: 40 }}
                        size="small"
                        onClick={() => updateHandler(data._id)}
                      >
                        <AddCircleIcon />
                      </Button>
                    </form>
                  </List>
                </Grid>
                <button
                  className="AlarmButton2"
                  variant="outlined"
                  size="small"
                  style={{ marginRight: 10, marginBlock: 5 }}
                  onClick={() => deleteHandler(alarms.data[id]._id)}
                >
                  {" "}
                  <DeleteForeverIcon />
                </button>
              </Box>
            </div>
          );
        })}
      </Typography>
    </div>
  );
}
