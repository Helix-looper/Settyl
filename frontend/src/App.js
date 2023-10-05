import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Ticket from "./Pages/Ticket";

const App = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/ticket/:id" element={<Ticket/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
