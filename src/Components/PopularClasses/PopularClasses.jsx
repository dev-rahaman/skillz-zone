import React, { useEffect, useState } from "react";
import ClassCard from "../ClassesCard/ClassCard";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("https://skillz-zone-server.vercel.app/all-classes")
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
