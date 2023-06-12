import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const token = localStorage.getItem("access-token");

const LoginForm = () => {
  const { loginUser, GoogleSignIn } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    // console.log(data);
    loginUser(data.email, data.password).then((result) => {
      const user = result.user;
      // console.log(user);
      Swal.fire({
        title: "Your Account is Login Successfully.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { replace: true });
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = () => {
    GoogleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser?.displayName);
        const saveUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          image: loggedUser.photoURL,
          phoneNumber: loggedUser?.phoneNumber,
          password: loggedUser?.password,
          role: "student",
        };
        fetch("https://skillz-zone-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify(saveUser),
        }).then((res) => res.json());

        navigate(from, { replace: true });
      })
      .catch((error) => {
        // setError(error.message);
      });
  };

  return (
    <div className="login-container">
      <h1>Login Now</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <label>Password</label>
        <div className="password-filed">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
          />
          <div className="showPass">
            <span type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>
        {errors.password && (
          <span style={{ color: red }}>This field is required</span>
        )}
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleSignIn}>
        <p style={{ marginLeft: "5px" }}>
          <FaGoogle /> Sign-in with Google
        </p>
      </button>
      <p>
        Don't have an account? <Link to="/registration">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
