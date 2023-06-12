import React, { useContext, useEffect, useState } from "react";
import InstructorCard from "../InstructorCard/InstructorCard";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const PopularInstructor = () => {
  const [users1, setUsers1] = useState([]);
  const { loading } = useContext(AuthContext);
  console.log(users1);

  const token = localStorage.getItem("access-token");

  const { data: users = [] } = useQuery(
    ["users"],
    async () => {
      const res = await fetch(`http://localhost:5000/users/`, {
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
    setUsers1(users);
  }, [users]);

  return (
    <div>
      <div className="flex-container">
        {users1 &&
          users1.map((instructorItem, idx) => (
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
