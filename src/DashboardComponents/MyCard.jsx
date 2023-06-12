import React, { useContext } from "react";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

// TODO: CONFIRM DELETE IS SUCCESSFULLY

const token = localStorage.getItem("access-token");

const MyCard = ({ item, idx, classes, setClasses }) => {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://skillz-zone-server.vercel.app/mySelectedClasses/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              const remaining = classes.filter((n) => n._id !== id);
              setClasses(remaining);
            }
          });
      }
    });
  };

  const handlePay = (buttonId) => {
    localStorage.setItem("buttonId", buttonId);
    const selectedClass = classes.find((item) => item._id === buttonId);
    if (selectedClass) {
      localStorage.setItem("selectedClass", JSON.stringify(selectedClass));
    }
  };

  return (
    <>
      <tbody>
        <tr>
          <td>{idx + 1}</td>
          <td>
            <img
              src={item.imageURL}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
          </td>
          <td>
            <p>{item.className}</p>
          </td>
          <td>
            <p>{item.price}</p>
          </td>
          <td style={{ textAlign: "center" }}>
            <FaTrash
              onClick={() => handleDelete(item._id)}
              style={{
                width: "20px",
                height: "30px",
                color: "#ef8d8d",
                marginRight: "20px",
                cursor: "pointer",
              }}
            />
            <button onClick={() => handlePay(item._id)} className="pay-button">
              <Link to="/dashboard/pay" style={{ textDecoration: "none" }}>
                Pay
              </Link>
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default MyCard;
