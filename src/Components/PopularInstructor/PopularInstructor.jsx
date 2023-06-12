import React, { useEffect, useState } from "react";
import InstructorCard from "../InstructorCard/InstructorCard";

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/instructors", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
      });
  }, []);
  return (
    <div>
      <div className="flex-container">
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

export default PopularInstructor;
