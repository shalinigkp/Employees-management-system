import React, { useState,useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setInterval(function () {
      const user = localStorage.getItem("user");
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, 500);
  }, []);
  const clearLocalStorage = () => {
    localStorage.removeItem("user");
  };

  return (
    <>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              EMPLOYEE MANAGEMENT SYSTEM
            </a>
          </div>
          {isLoggedIn ? (
            <ul className="nav navbar-nav">
              <li>
                <Link to="/" onClick={clearLocalStorage}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/register">Register(If not a user)</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;