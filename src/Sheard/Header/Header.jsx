/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { user, logOut } = useContext(AuthContext);
  const [hover, setHover] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleHoverOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setHover("");
      }
    };

    window.addEventListener("mouseover", handleHoverOutside);

    return () => {
      window.removeEventListener("mouseover", handleHoverOutside);
    };
  }, [containerRef]);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .then(() => {});
  };

  return (
    <>
      <nav className="menu">
        <div className="menu__logo">
          <Link to="/" className="navbar-logo">
            SKILLZ ZONE
          </Link>
        </div>
        <button className="menu__toggle" onClick={toggleMenu}>
          {isOpen ? (
            "X"
          ) : (
            <>
              <FaBars />
            </>
          )}
        </button>
        <ul className={`menu__list ${isOpen ? "menu__list--open" : ""}`}>
          <li className="menu__item">
            <Link to="/">Home</Link>
          </li>
          <li className="menu__item">
            <Link to="/instructors">Instructors</Link>
          </li>
          <li className="menu__item">
            <Link to="/classes">Classes</Link>
          </li>

          {user ? (
            <>
              <li className="menu__item">
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li className="navbar-item positionTwo">
                <img
                  src={user?.photoURL}
                  alt=""
                  onMouseOver={() => setHover(user?.displayName)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    margin: "0 20px",
                  }}
                />
                {hover && (
                  <div ref={containerRef} className="navbar-item positionONe">
                    <h2 style={{ marginBottom: "20px" }}>
                      <b>Your Name:</b> <small>{hover}</small>
                    </h2>
                  </div>
                )}
              </li>

              <span
                onClick={handleLogOut}
                className="navbar-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  to="/login"
                  className="navbar-item ascending"
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Log Out
                </button>
              </span>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/registration" className="navbar-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
