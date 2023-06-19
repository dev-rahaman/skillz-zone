import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
// import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const AdminRouters = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();

  if (user && isAdmin) {
    return children;
  }

  if (loading || isAdminLoading) {
    return (
      <div className="spinner-container-dashboard">
        <div className="spinner-dashboard"></div>
      </div>
    );
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRouters;
