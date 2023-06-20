import React, { useState, useEffect } from "react";
import InstructorCard from "./InstructorCard/InstructorCard";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("https://skillz-zone-server.vercel.app/users/")
      .then((res) => res.json())
      .then((data) => {
        const filteredUsers = data.filter((user) => user.role === "instructor");
        setInstructors(filteredUsers);
        return filteredUsers;
      });
  }, []);

  return (
    <div>
      <div className="classes-cart-container">
        {instructors &&
          instructors.map((instructorItem, idx) => (
            <InstructorCard
              key={idx}
              instructorItem={instructorItem}
            ></InstructorCard>
          ))}
      </div>
    </div>
  );
};

export default Instructors;
