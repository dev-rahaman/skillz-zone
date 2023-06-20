import React from "react";

const MySingleClass = ({ classesItem, idx }) => {
  const {
    _id,
    imageURL,
    className,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    status,
    enrolledStudents,
    adminFeedback,
  } = classesItem;

  return (
    <div className="addedClasses-cart">
      <div>
        <img src={imageURL} alt="Product 1" className="classes-cart__image" />
        <div className="classes-cart__details">
          <h2 className="classes-cart__heading">Class Name: {className}</h2>
          <p className="classes-cart__instructor">
            Instructor: {instructorName}
          </p>
          <p className="classes-cart__seats">
            Available Seats: {availableSeats}
          </p>
          <p className="classes-cart__price">Price: ${price}</p>
          <button className="button">Update Now</button>
        </div>
      </div>
    </div>
  );
};

export default MySingleClass;
