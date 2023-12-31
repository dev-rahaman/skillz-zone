import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import MySingleClass from "../../../DashboardComponents/MySingleClass/MySingleClass";

const token = localStorage.getItem("access-token");

const MyAddedClasses = () => {
  const [myClasses, setMyClasses] = useState([]);
  const { user } = useContext(AuthContext);

  const url = `https://skillz-zone-server.vercel.app/add-classes/${user?.email}`;
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyClasses(data);
      });
  }, [url]);

  return (
    <div>
      <h2
        style={{ textAlign: "center", fontSize: "40px", marginRight: "10px" }}
      >
        My Classes
      </h2>
      <div className="classes-cart-container">
        {myClasses &&
          myClasses.map((classesItem, idx) => (
            <MySingleClass
              key={idx}
              classesItem={classesItem}
              idx={idx}
            ></MySingleClass>
          ))}
      </div>
    </div>
  );
};

export default MyAddedClasses;
