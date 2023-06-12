import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const token = localStorage.getItem("access-token");

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  const { data: fetchedUsers = [] } = useQuery(
    ["payments"],
    async () => {
      const res = await fetch(
        `https://skillz-zone-server.vercel.app/payments/${user?.email}`,
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
    if (fetchedUsers.length > 0) {
      setPayments(fetchedUsers);
    }
  }, [fetchedUsers]);

  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: "40px" }}>Payment History</h2>
      <>
        <div>
          <table className="my-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Date</th>
                <th>Price</th>
                <th>Transaction Id</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((singleHistory, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{singleHistory.email}</td>
                  <td>
                    <p>
                      {moment(singleHistory.date).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </p>
                  </td>
                  <td>
                    <p>{singleHistory.price}</p>
                  </td>
                  <td>
                    <p>{singleHistory.transactionId}</p>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Date</th>
                <th>Price</th>
                <th>Transaction Id</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </>
    </div>
  );
};

export default PaymentHistory;
