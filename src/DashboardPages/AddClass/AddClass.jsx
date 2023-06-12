import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const token = localStorage.getItem("access-token");

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const newData = {
      className: data.className,
      instructorName: data.instructorName,
      instructorEmail: data.instructorEmail,
      availableSeats: data.availableSeats,
      price: data.price,
      classDetails: data.classDetails,
      imageURL: data.imageURL,
      status: "Pending",
      enrolledStudents: "0",
      adminFeedback: "",
      selected: "false",
    };
    fetch("https://skillz-zone-server.vercel.app/add-classes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "User created successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label className="label">
            <span className="">Class Name*</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("className", { required: false, maxLength: 120 })}
          />
          {errors.className && (
            <p style={{ color: "red" }}>Class Name is required.</p>
          )}
        </div>
        <div className="">
          <label className="label">
            <span className="">Instructor name*</span>
          </label>
          <input
            type="text"
            placeholder="Instructor name"
            {...register("instructorName", { required: false, maxLength: 120 })}
            defaultValue={user?.displayName}
            readOnly
          />
          {errors.instructorName && (
            <p style={{ color: "red" }}>Instructor Name is required.</p>
          )}
        </div>
        <div className="">
          <label className="label">
            <span className="">Instructor email*</span>
          </label>
          <input
            type="email"
            defaultValue={user?.email}
            readOnly
            placeholder="instructorEmail"
            {...register("instructorEmail", {
              required: false,
              maxLength: 120,
            })}
            className=""
          />
          {errors.instructorName && (
            <p style={{ color: "red" }}>Instructor Email is required.</p>
          )}
        </div>
        <div className="">
          <label className="label">
            <span className="">Available seats*</span>
          </label>
          <input
            type="number"
            placeholder="Available seats"
            {...register("availableSeats", { required: true, maxLength: 120 })}
            className=""
          />
          {errors.availableSeats && (
            <p style={{ color: "red" }}>Instructor Email is required.</p>
          )}
        </div>

        <div className="">
          <div className="">
            <label className="label">
              <span className="">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Type here"
            />
            {errors.price && <p style={{ color: "red" }}>Price is required.</p>}
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="">Class Details</span>
          </label>
          <textarea
            {...register("classDetails", { required: true })}
            className=""
            placeholder="Class Details"
          ></textarea>
        </div>
        <div className="">
          <div className="">
            <label className="label">
              <span className="">imageURL*</span>
            </label>
            <input
              type="text"
              {...register("imageURL", { required: true })}
              placeholder="Type here"
            />
          </div>
          {errors.imageURL && (
            <p style={{ color: "red" }}>image URL is required.</p>
          )}
        </div>
        <input className="btn" type="submit" value="Add Class" />
      </form>
    </div>
  );
};

export default AddClass;
