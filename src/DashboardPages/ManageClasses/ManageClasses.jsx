import React, { useEffect, useState } from "react";
import "./ManageClasses.css";
import ManageClassesCard from "../../DashboardComponents/ManageClassesCard/ManageClassesCard";

const Cart = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("https://skillz-zone-server.vercel.app/all-classes", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      });
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: "40px" }}>Manage Classes</h2>
      <div className="flex-container">
        {classes &&
          classes.map((classItem, idx) => (
            <ManageClassesCard
              key={idx}
              classItem={classItem}
              idx={idx}
            ></ManageClassesCard>
          ))}
      </div>
    </div>
  );
};

export default Cart;
