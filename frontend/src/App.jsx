import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar";
import Home from "./pages/Home";
import TodoForm from "./pages/TodoForm";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/todo/:id" element={<TodoForm></TodoForm>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
