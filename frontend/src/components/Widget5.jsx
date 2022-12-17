import Card from "@mui/material/Card";
import "../index.css";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // ajouter une tache
  const handleSubmit = (e) => {
    e.preventDefault();
    const addTask = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      completed: false,
    };
    setTasks([...tasks, addTask]);
    setInput("");
  };

  // enlever
  const deleteTask = (id) => {
    let filteredTasks = [...tasks].filter((tasks) => tasks.id !== id);
    setTasks(filteredTasks);
    console.log("task deleted");
  };

  // toggle completed task
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const date = new Date();
  // console.log(date)
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  return (
    <Card sx={{
      height: '100%', borderRadius: "25px", maxHeight: "400px",
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
        width: 7
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "darkgrey",
        borderRadius: 5,
        outline: `1px solid slategrey`,
      }
    }}>

      <div className="app">
        <div className="container">
          <ListItemText
            sx={{ display: 'flex', justifyContent: 'center' }}
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

          <div className="date">
            <p>{days[date.getDay()]}</p>
            <p>{date.getDate()}</p>
            <p>{months[date.getMonth()]}</p>
            <p>{date.getFullYear()}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <AiOutlinePlus className="icon" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add Tasks"
                type="text"
              />
            </div>
          </form>

          <div>
            {tasks.map((task) => (
              <div
                className={`task-row ${task.completed ? "Completed" : ""}`}
                key={task.id}
                onDoubleClick={() => toggleComplete(task.id)}
              >
                <p>{task.text} </p>
                <AiOutlineClose
                  onClick={() => deleteTask(task.id)}
                  className="icon"
                />
              </div>
            ))}
          </div>

          <p className="length">
            {tasks < 1 ? "No Tasks" : `Tasks: ${tasks.length}`}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default App;
