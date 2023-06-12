import React, { useState } from "react";
import Swal from "sweetalert2";

// TODO: SEND FEEDBACK DATA ON INSTRUCTOR
// TODO: BY DEFAULT STATUS WILL BE PENDING

const ManageClassesCard = ({ classItem, idx }) => {
  const [handleApproveDisabled, setHandleApproveDisabled] = useState(
    classItem.status !== "Pending"
  );
  const [handleDenyDisabled, setHandleDenyDisabled] = useState(
    classItem.status !== "Pending"
  );

  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const {
    image,
    className,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    status,
    _id,
  } = classItem;

  const handleApprove = (id) => {
    fetch(`https://skillz-zone-server.vercel.app/classes/approved/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${className} is an Approved Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setHandleApproveDisabled(true);
        setHandleDenyDisabled(true);
      });
  };

  const handleDeny = (id) => {
    fetch(`https://skillz-zone-server.vercel.app/classes/deny/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: `${className} is denied!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setHandleDenyDisabled(true);
        setHandleApproveDisabled(true);
      });
  };

  const handleSendFeedback = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFeedback("");
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleConfirmSendFeedback = () => {
    setShowModal(false);
    fetch("https://skillz-zone-server.vercel.app/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback, instructorEmail, className }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Feedback is sended to ${instructorName}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="cart-container">
      <div>
        <img src={image} alt="Class Image" />
      </div>
      <div>
        <h2>{className}</h2>
        <p>Instructor: {instructorName}</p>
        <p>Email: {instructorEmail}</p>
        <p>Available Seats: {availableSeats}</p>
        <p>Price: {price}</p>
        <p>Status: {status}</p>
      </div>
      <div>
        <button
          disabled={handleApproveDisabled}
          onClick={() => handleApprove(_id)}
        >
          Approve
        </button>
        <button disabled={handleDenyDisabled} onClick={() => handleDeny(_id)}>
          Deny
        </button>
        <button onClick={handleSendFeedback}>Send Feedback</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Send Feedback</h3>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Enter your feedback..."
            />
            <div>
              <button onClick={handleCloseModal}>Cancel</button>
              <button onClick={handleConfirmSendFeedback}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClassesCard;
