import React, { useContext } from "react";
import { FaEnvelope, FaCog } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="dashboard-cart-containerTwo">
      <div>
        <h2>Welcome to Dashboard</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/dashboard/feedback">
          <p style={{ margin: " 10px" }}>
            <FaEnvelope
              style={{
                width: "25px",
                height: "25px",
                cursor: "pointer",
                color: "#fff",
              }}
            />
          </p>
        </Link>
        <p style={{ margin: " 10px" }}>
          <FaCog style={{ width: "25px", height: "25px", cursor: "pointer" }} />
        </p>
        <img
          src={user?.photoURL}
          alt=""
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50px",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
