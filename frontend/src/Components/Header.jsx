import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <Link to={"/"} className="home-heading ms-3 link-default-off">
          <h1>EasyTicket</h1>
        </Link>
        <div className="right-buttons">
        <Link to={"/ticket/" + userData?._id} className="link-default-off mx-3">
          <button className="bg-btn">My Tickets</button>
        </Link>
        <button onClick={logout} className="bg-btn me-4">Logout</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
