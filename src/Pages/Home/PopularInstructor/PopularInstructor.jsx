import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import InstructorCard from "../../Instructors/InstructorCard/InstructorCard";

const token = localStorage.getItem("access-token");

const PopularInstructor = () => {
  const [popularInstructor, setPopularInstructor] = useState([]);

  useEffect(() => {
    fetch("https://skillz-zone-server.vercel.app/users/")
      .then((res) => res.json())
      .then((data) => {
        const filteredUsers = data.filter((user) => user.role === "instructor");
        const firstSixInstructors = filteredUsers.slice(0, 8);
        setPopularInstructor(firstSixInstructors);
        return firstSixInstructors;
      });
  }, []);

  return (
    <div>
      <div className="classes-cart-container">
        {popularInstructor &&
          popularInstructor.map((instructorItem, idx) => (
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
