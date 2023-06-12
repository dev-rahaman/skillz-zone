// TODO: need fetch data from server
// TODO: Available seats
// TODO: Select Button. If the user is not logged in, then tell the user to log in before selecting the course. This button will be disabled if:
// TODO: Available seats are 0
// TODO: Logged in as admin/instructor
// TODO: The class card background will be red if the available seats are 0.

import React, { useState, useEffect } from "react";
import ClassesCart from "./ClassesCart";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-classes")
      .then((res) => res.json())
      .then((data) => {
        const approvedClasses = data.filter(
          (classItem) => classItem.status === "approved"
        );
        setClasses(approvedClasses);
      });
  }, []);

  return (
    <div className="flex-container">
      {classes &&
        classes.map((classItem, idx) => {
          return <ClassesCart key={idx} classItem={classItem}></ClassesCart>;
        })}
    </div>
  );
};

export default Classes;
