import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";
import "./Details.css";

const Details = () => {
  const loadData = useLoaderData();
  const {
    name,
    email,
    image,
    bio,
    phoneNumber,
    linkedin,
    facebook,
    instagram,
    twitter,
    pinterest,
  } = loadData;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="Details">
        <img
          src={image}
          style={{ width: "250px", borderRadius: "50%" }}
          alt="image"
        />

        <h2 className="cart-heading"> {name}</h2>
        <h3 className="cart-title">Full Stack Developer</h3>
        <p className="cart-bio">{bio}</p>

        <p>
          Phone:
          <Link to={"tel:" + phoneNumber}> {phoneNumber}</Link>
        </p>

        <p className="cart-email">
          Email:
          <Link to={"mailto:" + email}> {email}</Link>
        </p>
        <div className="cart-social-links">
          <Link to={linkedin} target="_blank">
            <span className="social">
              <FaLinkedin />
            </span>
          </Link>
          <Link to={facebook} target="_blank">
            <span className="social">
              <FaFacebook />
            </span>
          </Link>
          <Link to={instagram} target="_blank">
            <span className="social">
              <FaInstagram />
            </span>
          </Link>
          <Link to={twitter} target="_blank">
            <span className="social">
              <FaTwitter />
            </span>
          </Link>
          <Link to={pinterest} target="_blank">
            <span className="social">
              <FaPinterest />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
