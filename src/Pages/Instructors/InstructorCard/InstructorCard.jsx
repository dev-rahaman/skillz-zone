import React, { useState } from "react";
import "./Instructor.css";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiMailLine } from "react-icons/ri";

const InstructorCard = ({ instructorItem }) => {
  const { image, name, email, phoneNumber } = instructorItem;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="instructor-cart"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image} alt="Product" className="cart-image" />
      {isHovered && (
        <>
          <div className="social-icons">
            <Link to="#">
              <FaFacebook />
            </Link>
            <Link to="#">
              <FaLinkedinIn />
            </Link>
            <Link to="#">
              <RiMailLine />
            </Link>
            <div>
              <button>View Details</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InstructorCard;
