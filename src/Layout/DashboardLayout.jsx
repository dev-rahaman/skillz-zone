import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardHeader></DashboardHeader>
      <div style={{ display: "flex" }}>
        <DashboardSidebar></DashboardSidebar>
        <div>
          <div className="dashboard-container">
            <div>
              <div className="dashboard-cart-container">
                <div className="dashboard-cart">
                  <h2>Students</h2>
                </div>
                <div className="dashboard-cart">
                  <h2>Students</h2>
                </div>
                <div className="dashboard-cart">
                  <h2>Students</h2>
                </div>
                <div className="dashboard-cart">
                  <h2>Students</h2>
                </div>
              </div>
            </div>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
