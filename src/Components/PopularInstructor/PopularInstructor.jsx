import React, { useContext, useEffect, useState } from "react";
import InstructorCard from "../InstructorCard/InstructorCard";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const PopularInstructor = () => {
  const [popularInstructor, setPopularInstructor] = useState([]);
  const { loading } = useContext(AuthContext);

  const token = localStorage.getItem("access-token");

  const { data: users = [] } = useQuery(
    ["users"],
    async () => {
      const res = await fetch(`https://skillz-zone-server.vercel.app/users/`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      const data = await res.json();
      const filteredUsers = data.filter((user) => user.role === "instructor");
      const firstSixInstructors = filteredUsers.slice(0, 6);
      return firstSixInstructors;
    },
    {
      enabled: !loading,
    }
  );

  useEffect(() => {
    if (users.length > 0) {
      setPopularInstructor(users);
    }
  }, [users]);

  return (
    <div>
      <div className="flex-container">
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
