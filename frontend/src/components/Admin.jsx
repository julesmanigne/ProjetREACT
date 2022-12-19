import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, List } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import "../App.css";
import Box from '@mui/material/Box';
import "../App.css";

const columns = [
    { field: 'label', headerName: 'Label', width: 300 },
    { field: 'status', headerName: 'Status', width: 600 },
    { field: 'time', headerName: 'Date and Time', width: 300 },
    { field: '_id', headerName: 'ID' },
  ]
 
  const rows = [
    { id: 1, label: 'Snow', status: 'Jon', time: 35 },
    { id: 2, label: 'Lannister', status: 'Cersei', time: 42 },
    { id: 3, label: 'Lannister', status: 'Jaime', time: 45 },
  
  ];
 

export default function Admin(){

    const [alarms, setAlarms] = useState([]);   

    const fetchAlarms = async () => {
        const { data } = await axios.get("/alarms");
    
        setAlarms(data);
      };
    
      console.log(alarms);
    
      useEffect(() => {
        fetchAlarms();
      }, []);

   return(

        <div style={{ height: 400, width: '100%', backgroundColor:"#fff"}}>
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
                      <List sx={{ display: "flex", justifyContent: "center", border: "1px solid rgb(95, 122, 227);", marginBottom: 2, borderRadius: 5, paddingLeft: 5 }}>
                        <ListItemText
                          sx={{}}
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
                        <Grid sx={{ textAlign: 'center', display: "flex" }} item xs={2} md={12}>
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
                      </List>
                    </Grid>
                  </Box>
                </div>
              );
            })}
          </Typography>
       </div>
        )
  }