import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Sheard/Header/Header";
import Footer from "../Sheard/Footer/Footer";

const Main = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Main;
