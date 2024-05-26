import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // If you're using React Router for navigation
import DatePicker from "react-datepicker"; // For the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles
import axios from "axios";

const TodoForm = () => {
  const { id } = useParams(); // Assuming you're using React Router for navigation
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();
  console.log(id);
  // Fetch existing todo data if ID is provided (for update functionality)
  useEffect(() => {
    console.log("no ram");
    if (id !== "create") {
      console.log("ram");
      axios
        .get(`http://localhost:3000/api/v1/tasks/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setTitle(response.data.data.title);
          setDescription(response.data.data.description);
          setDueDate(new Date(response.data.data.dueDate));
          setStatus(response.data.data.status);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would handle the form submission based on whether it's an update or create operation
    if (id !== "create") {
      await axios.put(
        `http://localhost:3000/api/v1/tasks/${id}`,
        {
          title,
          description,
          dueDate,
          status,
        },
        {
          withCredentials: true,
        }
      );
    } else {
      await axios.post(
        `http://localhost:3000/api/v1/tasks/`,
        {
          title,
          description,
          dueDate,
          status,
        },
        {
          withCredentials: true,
        }
      );
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        {id !== "create" ? "Update Todo" : "Create Todo"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={5}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date:
          </label>
          <DatePicker
            id="dueDate"
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {id !== "create" ? "Update Todo" : "Create Todo"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
