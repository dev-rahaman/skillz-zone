import React, { useEffect, useState, useContext } from "react";
import MyCard from "../../DashboardComponents/MyCard";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const MySelectedClasses = () => {
  const [classes, setClasses] = useState([]);
  const { user, loading } = useContext(AuthContext);

  const token = localStorage.getItem("access-token");

  const { data: mySelectedClasses = [] } = useQuery(
    ["mySelectedClasses", user?.email],
    async () => {
      const res = await fetch(
        `https://skillz-zone-server.vercel.app/mySelectedClasses/${user?.email}`,
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
    if (mySelectedClasses.length > 0) {
      setClasses(mySelectedClasses);
    }
  }, [mySelectedClasses]);

  const totalPrice = classes.reduce(
    (acc, curr) => acc + parseFloat(curr.price),
    0
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{ textAlign: "center", fontSize: "40px", marginRight: "10px" }}
        >
          My Selected Classes
        </h2>
        <strong>Total Amount:</strong> {totalPrice}
      </div>
      <table className="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        {classes &&
          classes.map((item, idx) => (
            <MyCard
              key={idx}
              item={item}
              idx={idx}
              classes={classes}
              setClasses={setClasses}
            ></MyCard>
          ))}

        <tfoot>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MySelectedClasses;
