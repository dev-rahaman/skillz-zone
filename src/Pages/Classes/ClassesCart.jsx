import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const token = localStorage.getItem("access-token");

const ClassesCart = ({ classItem }) => {
  const [isSelectButtonDisabled, setIsSelectButtonDisabled] = useState(false);

  const { user, loading } = useContext(AuthContext);
  const email = user?.email;

  const [users, setUsers] = useState([]);

  const { data: fetchedUsers = [] } = useQuery(
    ["users"],
    async () => {
      const res = await fetch(`http://localhost:5000/users/`, {
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
  const student = currentUser?.role === "student";
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
          fetch("http://localhost:5000/mySelectedClasses", {
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
    <div
      className={
        admin || instructor || availableSeats == 0 ? "card-bg-red" : ""
      }
    >
      <div className="card">
        <div className="card__image">
          <img src={imageURL} alt="Course" style={{ height: "150px" }} />
        </div>
        <div className="card__details">
          <h2 className="card__name">Class Name:{className}</h2>
          <p className="card__instructor">Instructor:{instructorName}</p>
          <p className="card__email">Email: {instructorEmail}</p>
          <p className="card__seats">Available Seats: {availableSeats}</p>
          <p className="card__seats">Enrolled Students: {enrolledStudents}</p>
          <p className="card__price">Price: ${price}</p>
          <p className="card__price">status: {status}</p>

          <button
            onClick={handleSelectButton}
            disabled={
              availableSeats == 0 ||
              instructor ||
              admin ||
              isSelectButtonDisabled
            }
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassesCart;
