import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Feedback = () => {
  const [feedback1, setFeedback1] = useState([]);
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("access-token");

  const url = `https://skillz-zone-server.vercel.app/instructor/${user?.email}`;
  useEffect(() => {
    fetch(url, {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedback1(data);
      });
  }, [url]);

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "30px" }}>
        Feedback from instructor about you classes
      </h2>
      {feedback1 &&
        feedback1.map((item, idx) => (
          <div key={idx}>
            <p style={{ margin: "20px" }}>
              {idx + 1} {}
              <strong> {item.className}</strong>
              {item.feedback}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Feedback;
