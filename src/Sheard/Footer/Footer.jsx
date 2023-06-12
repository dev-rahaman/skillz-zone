/* eslint-disable no-unused-vars */
import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaPhone,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-container">
          <div className="footer-column">
            <Link to="/">
              <h4>BABY ALIVE</h4>
            </Link>
            <p style={{ fontSize: "20px", marginBottom: "20px" }}>
              Explore a world of fun and learning with our delightful baby
              toys...
            </p>
            <div className="social">
              <Link
                to="https://www.linkedin.com/in/rsabdurrahamansultany/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </Link>
              <Link
                to="https://twitter.com/rs_rahaman_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter style={{ width: "30px", height: "30px" }} />
              </Link>
              <Link
                to="https://www.facebook.com/rsabdurrahamansultany"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook style={{ width: "30px", height: "30px" }} />
              </Link>
              <Link
                to="https://www.instagram.com/rsabdurrahamansultany/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram style={{ width: "30px", height: "30px" }} />
              </Link>
            </div>
          </div>
          <div className="footer-column">
            <h4>Useful Links</h4>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="#">About</Link>
                </li>
                <li>
                  <Link to="#">Services</Link>
                </li>
                <li>
                  <Link to="/contactus">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-column">
            <h4>Our Services</h4>
            <ul>
              <li>
                <Link to="/programmable">Programmable Toys</Link>
              </li>
              <li>
                <Link to="/transformable">Transformable Toys</Link>
              </li>
              <li>
                <Link to="/educational">Educational Toys</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Information</h4>
            <ul>
              <li>
                <Link to="tel:01601313258">
                  <FaPhone style={{ marginRight: "5px" }} />
                  01601313258
                </Link>
              </li>
              <li>
                <Link to="mailto:rsabdurrahamansultany2@gamil.com">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "5px" }}
                  >
                    <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z" />
                  </svg>
                  rsrahaman@gamil.com
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.google.com/maps/place/Kanesh+Tala+High+School/@23.4136204,91.2595696,17.25z/data=!4m6!3m5!1s0x375381a52f096163:0x473c4efd418d3da7!8m2!3d23.4136335!4d91.2621906!16s%2Fg%2F11c2kgx6g7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaMapMarkerAlt style={{ marginRight: "5px" }} />
                  Comilla Bangladesh
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p
          style={{
            fontSize: "20px",
            textAlign: "center",
            color: "#fff",
            paddingBottom: "20px",
          }}
        >
          © 2023 [ALIVE BABY]
        </p>
      </footer>
    </>
  );
};

export default Footer;
