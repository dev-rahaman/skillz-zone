/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useRef, useState } from "react";
import "./AlertBox.css";
import { FaRegWindowClose } from "react-icons/fa";

const AlertBox = () => {
  const [showAlert, setShowAlert] = useState(
    localStorage.getItem("showAlert") !== "false"
  );
  const modalRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
      localStorage.setItem("showAlert", "true");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAlert(false);
        localStorage.setItem("showAlert", "false");
      }
    };

    if (showAlert) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => window.removeEventListener("click", handleOutsideClick);
  }, [showAlert]);

  const closeAlertBox = () => {
    setShowAlert(false);
    localStorage.setItem("showAlert", "false");
  };
  return (
    showAlert && (
      <div className="modal">
        <div className="modal-content" ref={modalRef}>
          <span className="closeButton" onClick={closeAlertBox}>
            <FaRegWindowClose />
          </span>
          <div
            style={{
              marginTop: "80px",
            }}
          >
            <h2>This site is broken? Don't worry I'm Updating the site now.</h2>
          </div>
        </div>
      </div>
    )
  );
};

export default AlertBox;
