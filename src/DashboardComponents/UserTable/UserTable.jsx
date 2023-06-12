import React, { useState } from "react";
import Swal from "sweetalert2";

const UserTable = ({ user, idx }) => {
  const [makeAdminDisabled, setMakeAdminDisabled] = useState(
    user.role === "admin"
  );
  const [makeInstructorDisabled, setMakeInstructorDisabled] = useState(
    user.role === "instructor"
  );

  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setMakeAdminDisabled(true);
      });
  };

  const handleMakeInstructor = (id) => {
    fetch(`http://localhost:5000/users/instructor/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${user.name} is an Instructor Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setMakeInstructorDisabled(true);
      });
  };

  return (
    <tbody>
      <tr>
        <td>{idx + 1}</td>
        <td>
          <img
            src={user.image}
            alt=""
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />
        </td>
        <td>
          <p>{user.name}</p>
        </td>
        <td>
          {user.role === "admin"
            ? "admin"
            : user.role === "instructor"
            ? "Instructor"
            : "Student"}
        </td>
        <td>
          <button
            className="update-button"
            onClick={() => handleMakeAdmin(user._id)}
            disabled={makeAdminDisabled}
          >
            Make Admin
          </button>
          <button
            className="delete-button"
            onClick={() => handleMakeInstructor(user._id)}
            disabled={makeInstructorDisabled}
          >
            Make Instructor
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default UserTable;
