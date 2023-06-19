import React, { useContext } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../Hooks/useInstructor";
import { AuthContext } from "../Provider/AuthProvider";

const InstructorRouters = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();

  if (user && isInstructor) {
    return children;
  }

  if (loading || isInstructorLoading) {
    return (
      <div className="spinner-container-dashboard">
        <div className="spinner-dashboard"></div>
      </div>
    );
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRouters;
