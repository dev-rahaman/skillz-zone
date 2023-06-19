import React from "react";

const EnrolledClassesCart = ({ idx, item }) => {
  return (
    <tbody>
      <tr>
        <td>{idx + 1}</td>
        <td>
          <img
            src={item.imageURL}
            alt=""
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />
        </td>
        <td>
          <p>{item.className}</p>
        </td>
        <td>
          <p>{item._id}</p>
        </td>
      </tr>
    </tbody>
  );
};

export default EnrolledClassesCart;
