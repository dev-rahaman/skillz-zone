import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import EnrolledClassesCart from "./EnrolledClassesCart";

const EnrolledClasses = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/myEnrolledClasses/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setEnrolledClasses(data);
      });
  }, []);

  return (
    <div>
      <h2
        style={{ textAlign: "center", fontSize: "40px", marginRight: "10px" }}
      >
        My Enrolled Classes
      </h2>

      <table className="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>

        {enrolledClasses &&
          enrolledClasses.map((item, idx) => (
            <EnrolledClassesCart
              key={idx}
              item={item}
              idx={idx}
            ></EnrolledClassesCart>
          ))}

        <tfoot>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EnrolledClasses;
