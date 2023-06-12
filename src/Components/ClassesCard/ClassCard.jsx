import React from "react";
import Swal from "sweetalert2";

const ClassCard = ({ classItem }) => {
  const {
    className,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    imageURL,
  } = classItem;

  const handlePopularCardButton = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to added bye the classes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Added!", "Your file has been added.", "success");
        fetch("https://skillz-zone-server.vercel.app/mySelectedClasses", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(classItem),
        })
          .then((res) => res.json())
          .then((data) => {});
      }
    });
  };

  return (
    <div className="card">
      <div className="card__image">
        <img src={imageURL} alt="Course" />
      </div>
      <div className="card__details">
        <h2 className="card__name">Class Name:{className}</h2>
        <p className="card__instructor">Instructor:{instructorName}</p>
        <p className="card__email">Email: {instructorEmail}</p>
        <p className="card__seats">Available Seats: {availableSeats}</p>
        <p className="card__price">Price: ${price}</p>
        <button className="card__button" onClick={handlePopularCardButton}>
          Select
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
