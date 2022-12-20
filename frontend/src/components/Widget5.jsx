import Card from "@mui/material/Card";
import "../index.css";
import ListItemText from "@mui/material/ListItemText";
import React, { useState, useEffect } from "react";

import { tokens } from "../theme";
import { useTheme } from "@mui/material";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  const addTask = (e) => {
    if (input) {
      const newTask = {
        id: new Date().getTime().toString(),
        title: input,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setInput("");
    }
  };

  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  };

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "10px",
        fontFamily: "Poppins",
        display: "flex",
        flexDirection: "column",
        height: 700,
        overflow: "hidden",
        overflowY: "scroll",
        marginLeft: "auto",
        backgroundColor: colors.primary[600],
        boxShadow: 3,
        "&::-webkit-scrollbar": {
          width: 0,
        },
      }}
    >
      <div className="app">
        <div className="container">
          <ListItemText
            sx={{ display: "flex", justifyContent: "center", marginTop:2, color: colors.grey[100],
          }}
            primary="To Do"
            primaryTypographyProps={{
              fontFamily: "Poppins",
              fontSize: 40,
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            {" "}
          </ListItemText>
          <div className="form-input">
            <input
             style={{ padding: 10, marginTop: 42, textAlign: "center", width: "90%",  backgroundColor : colors.indigo[900]}}
            className="todoSearch"
              name="task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a task"
              type="text"
            />
          </div>
          <div className="buttonLine">
            <button className="add-task" onClick={addTask}>
              ADD
            </button>
            {!tasks.length ? null : (
              <button className="clear-task" onClick={() => handleClear()}>
                Clear
              </button>
            )}
          </div>
          <div className="task-container">
          <ListItemText sx={{
                color: colors.grey[200]
              }}>
            {tasks.map((task) => (
              <React.Fragment key={task.id}>
                <div className="col-11">
                  <span
                    className="form-control bg-white btn mt-2"
                    style={{ textAlign: "left", fontWeight: "bold" }}
                  >
                    {task.title}
                  </span>
                </div>

                <div className="col-1">
                  <button
                    className="delete-task"
                    onClick={() => handleDelete(task)}
                  >
                    Delete
                  </button>
                </div>
              </React.Fragment>
            ))}
              </ListItemText>
          </div>
        </div>
      </div>
    </Card>
  );
}
