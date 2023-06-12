import React from "react";

const InstructorCard = ({ instructorItem }) => {
  const { image, name } = instructorItem;
  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt="Course" style={{ height: "150px" }} />
      </div>
      <div className="card__details">
        <h2 className="card__name">Class Name:{name}</h2>
        <button className="card__button">View Details</button>
      </div>
    </div>
  );
};

export default InstructorCard;
