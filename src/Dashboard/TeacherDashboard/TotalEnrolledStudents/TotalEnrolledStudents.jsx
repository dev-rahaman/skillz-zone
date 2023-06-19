import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TotalEnrolledStudentsTable from "./TotalEnrolledStudentsTable/TotalEnrolledStudentsTable";
import { AuthContext } from "../../../Provider/AuthProvider";

const token = localStorage.getItem("access-token");

const TotalEnrolledStudents = () => {
  const [enrolledStudent, setEnrolledStudent] = useState([]);
  const { user, loading } = useContext(AuthContext);

  const { data: enrolledStudents = [] } = useQuery(
    ["enrolledStudents", user?.email],
    async () => {
      const res = await fetch(
        `https://skillz-zone-server.vercel.app/enrolledStudents/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      return res.json();
    },
    {
      enabled: !loading,
    }
  );
  useEffect(() => {
    if (enrolledStudents.length > 0) {
      setEnrolledStudent(enrolledStudents);
    }
  }, [enrolledStudents]);

  console.log(enrolledStudents);

  return (
    <div>
      <h2
        style={{ textAlign: "center", fontSize: "40px", marginRight: "10px" }}
      >
        Total Enrolled students
      </h2>
      <div>
        <table className="my-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Student ID</th>
            </tr>
          </thead>

          {enrolledStudent &&
            enrolledStudent.map((item, idx) => (
              <TotalEnrolledStudentsTable
                key={idx}
                item={item}
                idx={idx}
              ></TotalEnrolledStudentsTable>
            ))}

          <tfoot>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Student ID</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TotalEnrolledStudents;
