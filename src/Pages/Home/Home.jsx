import React from "react";
import Headings from "../../Components/Headings/Headings";
import AlertBox from "../../Components/AlertBox/AlertBox";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularInstructor from "./PopularInstructor/PopularInstructor";
import Slider from "./Slider/Slider";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <Headings
        title={"see our"}
        heading={"Popular Classes"}
        brows={"Brows More"}
      ></Headings>
      <PopularClasses></PopularClasses>
      <AlertBox></AlertBox>
      <Headings
        title={"see our"}
        heading={"Popular Instructor"}
        brows={"Brows More"}
      ></Headings>
      <PopularInstructor></PopularInstructor>
    </div>
  );
};

export default Home;
