import React from "react";

const InstructorCard = ({ instructorItem }) => {
  const { image, name, email, phoneNumber } = instructorItem;
  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt="Course" style={{ height: "150px" }} />
      </div>
      <div className="card__details">
        <h2 className="card__name">Instructor Name:{name}</h2>
        <p className="card__name">
          <strong>Email:</strong>
          {email}
        </p>
        <p className="card__name">Phone Number:{phoneNumber}</p>
        <button className="card__button">View Details</button>
      </div>
    </div>
  );
};

export default InstructorCard;