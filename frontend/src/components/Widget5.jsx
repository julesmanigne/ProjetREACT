import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../index2.css";

import React, { useState } from "react";
import { GiHornedHelm } from "react-icons/gi";
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
    <Card sx={{ height: "100%" }}>
      <div className="app">
        <div className="container">
          <h1> To do List</h1>

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
                placeholder="Ajouter une tâche"
                type="text"
              />
            </div>
          </form>

          <div>
            {tasks.map((task) => (
              <div
                className={`task-row ${task.completed ? "completed" : ""}`}
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
            {tasks < 1 ? "Aucune tâche" : `Tâche: ${tasks.length}`}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default App;
