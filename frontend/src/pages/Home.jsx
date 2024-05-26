import React, { useEffect, useState } from "react";
import Todo from "../components/Todo";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/tasks", {
          withCredentials: true,
        });
        setTodos(response.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos(); // fetch todos on render
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-32 bg-gray-100">
      {!todos.length == 0 ? (
        todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              dueDate={todo.dueDate}
              status={todo.status}
            />
          );
        })
      ) : (
        <div className="text-gray-400">
          No Tasks To Display, Please add todos for tracking your progress
        </div>
      )}
    </div>
  );
}

export default App;
