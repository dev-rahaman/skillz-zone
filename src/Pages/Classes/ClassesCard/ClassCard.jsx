import React from "react";
import Swal from "sweetalert2";

const token = localStorage.getItem("access-token");

const ClassCart = ({ classItem }) => {
  const {
    className,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    imageURL,
  } = classItem;

  const handlePopularCartButton = () => {
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
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify(classItem),
        })
          .then((res) => res.json())
          .then((data) => {});
      }
    });
  };

  return (
    <div className="classes-cart">
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
          <button className="button" onClick={handlePopularCartButton}>
            Enroll Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCart;
