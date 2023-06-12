import React, { useEffect, useState } from "react";
import InstructorCard from "../InstructorCard/InstructorCard";

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("https://skillz-zone-server.vercel.app/instructors", {
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
