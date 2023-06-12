import React, { useState, useEffect } from "react";
import ClassesCart from "./ClassesCart";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("https://skillz-zone-server.vercel.app/all-classes")
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
