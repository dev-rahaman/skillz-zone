import React, { useState, useEffect, useContext } from "react";
import InstructorCard from "../../Components/InstructorCard/InstructorCard";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
// import InstructorCard from "../../Components/InstructorCard/InstructorCard";

const Instructors = () => {
  const [users1, setUsers1] = useState([]);
  const { loading } = useContext(AuthContext);
  // console.log(users1);

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
      return filteredUsers;
    },
    {
      enabled: !loading,
    }
  );
  useEffect(() => {
    if (users.length > 0) {
      setUsers1(users);
    }
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

export default Instructors;
