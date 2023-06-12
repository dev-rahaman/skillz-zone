import React, { useEffect, useState } from "react";
import ClassCard from "../ClassesCard/ClassCard";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-classes")
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      });
  }, []);

  return (
    <div className="flex-container">
      {classes &&
        classes.map((classItem, idx) => (
          <ClassCard key={idx} classItem={classItem}></ClassCard>
        ))}
    </div>
  );
};

export default PopularClasses;
