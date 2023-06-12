import React, { useState, useEffect, useContext } from "react";
import UserTable from "../../DashboardComponents/UserTable/UserTable";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const DashboardManageUsers = () => {
  const [users1, setUsers1] = useState([]);
  const { user, loading } = useContext(AuthContext);

  const token = localStorage.getItem("access-token");

  const { data: users = [] } = useQuery(
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
    if (users.length > 0) {
      setUsers1(users);
    }
  }, [users]);

  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: "40px" }}>Manage Users</h2>
      <table className="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        {users1 &&
          users1.map((user, idx) => (
            <UserTable
              key={idx}
              user={user}
              idx={idx}
              users1={users1}
              setUsers1={setUsers1}
            ></UserTable>
          ))}

        <tfoot>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DashboardManageUsers;
