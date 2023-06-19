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

  const handleUpdate = (id) => {};

  return (
    <div className="cart-container">
      {/* <div style={{ textAlign: "right" }}>{idx + 1}</div> */}
      <div>
        <img src={imageURL} alt="Class Image" />
      </div>
      <div>
        <h2>{className}</h2>
        <p>Instructor: {instructorName}</p>
        <p>Email: {instructorEmail}</p>
        <p>Price: {price}</p>
        <p>Available Seats: {availableSeats}</p>
        <p>Enrolled Students: {enrolledStudents}</p>
        <p>Status: {status}</p>

        {status === "denied" ? <p>Admin Feedback: {adminFeedback}</p> : null}
      </div>
      <div>
        <button onClick={() => handleUpdate(_id)}>Update</button>
      </div>
    </div>
  );
};

export default MySingleClass;
