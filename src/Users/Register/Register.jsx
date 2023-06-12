// TODO: Note: Keep at least one social login
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import "../Login/Login.css";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

import { useLocation, useNavigate } from "react-router-dom";
const Register = () => {
  const { createUser, logout, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    createUser(email, password).then((result) => {
      const loggedUser = result.user;
      // console.log(loggedUser);

      updateUser(data.name, data.photoURL)
        .then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            image: data.photoURL,
            phoneNumber: data.phoneNumber,
            password: data.password,
            role: "student",
          };
          fetch("https://skillz-zone-server.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                // reset();
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setValue("showPassword", !watch("showPassword"));
  };

  return (
    <>
      <div className="login-container">
        <h1>Registration Now</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Name:</label>
            <input {...register("name", { required: true })} />
            {errors.name && <p style={{ color: "red" }}>Name is required.</p>}
          </div>
          <div>
            <label>Email:</label>
            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>
                Email is required and must be a valid email address.
              </p>
            )}
          </div>
          <div>
            <label>Password:</label>
            <div className="password-filed">
              <input
                type={watch("showPassword") ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{6,}$/,
                })}
              />
              <div className="showPass">
                <span type="button" onClick={togglePasswordVisibility}>
                  {watch("showPassword") ? <RiEyeOffFill /> : <RiEyeFill />}
                </span>
              </div>
            </div>
            {errors.password?.type === "required" && (
              <p style={{ color: "red" }}>Password is required.</p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={{ color: "red" }}>
                Password must be at least 6 characters long.
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p style={{ color: "red" }}>
                Password must contain at least one uppercase letter, one
                lowercase letter, one digit, and one special character.
              </p>
            )}
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
            )}
          </div>
          <div>
            <label>Photo URL:</label>
            <input {...register("photoURL")} />
          </div>
          <div className="my-5">
            <label>Gender:</label>
            <select {...register("gender", { required: true })}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p style={{ color: "red" }}>Please select a gender.</p>
            )}
          </div>
          <div>
            <label>Phone Number:</label>
            <input {...register("phoneNumber")} />
          </div>
          <div>
            <label>Address:</label>
            <input {...register("address")} />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </>
  );
};

export default Register;
