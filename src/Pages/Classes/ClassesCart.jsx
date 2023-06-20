import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";

const token = localStorage.getItem("access-token");

const ClassesCart = ({ classItem }) => {
  const [isSelectButtonDisabled, setIsSelectButtonDisabled] = useState(false);

  const { user, loading } = useContext(AuthContext);
  const email = user?.email;

  const [users, setUsers] = useState([]);

  const { data: fetchedUsers = [] } = useQuery(
    ["users"],
    async () => {
      const res = await fetch(`https://skillz-zone-server.vercel.app/users/`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      return res.json();
    },
    {
      enabled: !loading,
    }
  );

  useEffect(() => {
    if (fetchedUsers.length > 0) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);
  const currentUser = users.find((item) => item?.email === email);

  // console.log(currentUser?.role);
  const instructor = currentUser?.role === "instructor";
  const admin = currentUser?.role === "admin";

  const {
    className,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    imageURL,
    status,
    classDetails,
    enrolledStudents,
    adminFeedback,
  } = classItem;

  const newData = {
    className: className,
    instructorName: instructorName,
    instructorEmail: instructorEmail,
    availableSeats: availableSeats,
    price: price,
    classDetails: classDetails,
    imageURL: imageURL,
    status: status,
    adminFeedback: adminFeedback,
    enrolledStudents: enrolledStudents,
    email: user?.email,
  };

  const handleSelectButton = (id) => {
    if (user) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to be added to the class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add me!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Added!", "You have been added to the class.", "success");
          fetch("https://skillz-zone-server.vercel.app/mySelectedClasses", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newData),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              setIsSelectButtonDisabled(true);
            });
        }
      });
    } else {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Please Login Now!",
        footer: '<a href="/login">Do you have an account?</a>',
      });
    }
  };

  return (
    <>
      <div
        className={`classes-cart ${
          admin || instructor || availableSeats === "0" ? "bg-red" : ""
        }`}
      >
        <div>
          <img
            src={imageURL}
            alt="class image"
            className="classes-cart__image"
          />
          <div className="classes-cart__details">
            <h2 className="classes-cart__heading">Class Name: {className}</h2>
            <p className="classes-cart__instructor">
              Instructor: {instructorName}
            </p>
            <p className="classes-cart__seats">
              Available Seats: {availableSeats}
            </p>
            <p className="classes-cart__price">Price: ${price}</p>
            <button
              onClick={handleSelectButton}
              disabled={
                availableSeats == 0 ||
                instructor ||
                admin ||
                isSelectButtonDisabled
              }
            >
              Add to card
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassesCart;
