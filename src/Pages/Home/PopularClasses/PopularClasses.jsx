import React, { useEffect, useState } from "react";
import ClassCard from "../../Classes/ClassesCard/ClassCard";

const token = localStorage.getItem("access-token");

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("https://skillz-zone-server.vercel.app/all-classes", {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      });
  }, []);

  const sorting = classes.slice(0, 9);
  return (
    <div className="classes-cart-container">
      {sorting &&
        sorting.map((classItem, idx) => (
          <ClassCard key={idx} classItem={classItem}></ClassCard>
        ))}
    </div>
  );
};

export default PopularClasses;
