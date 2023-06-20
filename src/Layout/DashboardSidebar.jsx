// TODO: dynamic NavLink:
import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import {
  FaFileArchive,
  FaHistory,
  FaCalendarPlus,
  FaMenorah,
  FaStudiovinari,
  FaPenAlt,
  FaEdit,
  FaHome,
} from "react-icons/fa";

const token = localStorage.getItem("access-token");

const DashboardSidebar = () => {
  const { user, loading } = useContext(AuthContext);
  const email = user?.email;

  const [users, setUsers] = useState([]);

  const { data: fetchedUsers = [] } = useQuery(
    ["users"],
    async () => {
      const res = await fetch(`https://skillz-zone-server.vercel.app/users/`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      return res.json();
    },
    {
      enabled: !loading,
    }
  );

  useEffect(() => {
    if (fetchedUsers.length > 0) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);
  const currentUser = users.find((item) => item?.email === email);

  const student = currentUser?.role === "student";
  const instructor = currentUser?.role === "instructor";
  const admin = currentUser?.role === "admin";

  return (
    <div className="sidebar">
      <NavLink to="/" activeclassname="active">
        <FaHome /> Home
      </NavLink>
      {student ? (
        <>
          <NavLink to="/dashboard/my-selected-classes" activeclassname="active">
            <FaFileArchive /> My Selected Classes
          </NavLink>
          <NavLink to="/dashboard/payment-history" activeclassname="active">
            <FaHistory /> Payment History
          </NavLink>
          <NavLink to="/dashboard/enrolled-classes" activeclassname="active">
            <FaHistory /> Enrolled Classes
          </NavLink>
          <NavLink to="/dashboard/editprofile" activeclassname="active">
            <FaMenorah /> Edit Profile
          </NavLink>
        </>
      ) : instructor ? (
        <>
          {/* Instructors */}
          <NavLink to="/dashboard/add-class" activeclassname="active">
            <FaCalendarPlus /> Add Class
          </NavLink>
          <NavLink to="/dashboard/my-classes" activeclassname="active">
            <FaMenorah /> My Added Classes
          </NavLink>
          <NavLink
            to="/dashboard/total-enrolled-students"
            activeclassname="active"
          >
            <FaStudiovinari /> Total Enrolled Students
          </NavLink>
          <NavLink to="/dashboard/editprofile" activeclassname="active">
            <FaMenorah /> Edit Profile
          </NavLink>
        </>
      ) : admin ? (
        <>
          {/* Admin */}
          <NavLink to="/dashboard/manage-classes" activeclassname="active">
            <FaPenAlt /> Manage Classes
          </NavLink>
          <NavLink to="/dashboard/manage-users" activeclassname="active">
            <FaEdit /> Manage Users
          </NavLink>
          <NavLink to="/dashboard/editprofile" activeclassname="active">
            <FaMenorah /> Edit Profile
          </NavLink>
        </>
      ) : null}
    </div>
  );
};

export default DashboardSidebar;
