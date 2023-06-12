import React from "react";

const TotalEnrolledStudentsTable = ({ idx, item }) => {
  return (
    <tbody>
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>
          <img src={item.studentPhoto} alt="" />
        </td>
        <td>
          <p>{item.studentName}</p>
        </td>
        <td>
          <p>{item.studentEmail}</p>
        </td>
        <td>
          <p>{item.transactionId}</p>
        </td>
      </tr>
    </tbody>
  );
};

export default TotalEnrolledStudentsTable;
