import Card from "@mui/material/Card";
import "../index.css";
import ListItemText from "@mui/material/ListItemText";
import React, { useState, useEffect } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

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
        borderRadius: "25px",
        maxHeight: "400px",
        maxWidth: "400px",
        
        fontFamily: "Ubuntu",
        display: "flex",
        flexDirection: "column",
        height: 700,
        overflow: "hidden",
        overflowY: "scroll",
        marginLeft: "auto",
        backgroundColor: "#EDF6F9",
        "&::-webkit-scrollbar": {
          width: 0,
        },
      }}
    >
      <div className="app">
        <div className="container">
          <ListItemText
            sx={{ display: "flex", justifyContent: "center" }}
            primary="To Do List"
            primaryTypographyProps={{
              fontFamily: "Ubuntu",
              fontSize: 40,
              fontWeight: 400,
              letterSpacing: 4,
            }}
          >
            {" "}
          </ListItemText>
          <div className="form-input">
            <input
              name="task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder=""
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
                    delete
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
