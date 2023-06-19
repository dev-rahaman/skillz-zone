import React from "react";
import Slider from "../../Components/Slider/Slider";
import Headings from "../../Components/Headings/Headings";
import PopularClasses from "../../Components/PopularClasses/PopularClasses";
import PopularInstructor from "../../Components/PopularInstructor/PopularInstructor";
import AlertBox from "../../Components/AlertBox/AlertBox";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <Headings
        heading={"-------------Popular Classes---------------"}
      ></Headings>
      <PopularClasses></PopularClasses>
      <AlertBox></AlertBox>
      <Headings
        heading={"-------------Popular Instructors---------------"}
      ></Headings>
      <PopularInstructor></PopularInstructor>
    </div>
  );
};

export default Home;
