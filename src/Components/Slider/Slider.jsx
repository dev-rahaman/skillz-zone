/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./slider.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    {
      image: "https://i.postimg.cc/YCGDRHL8/toy12.jpg",
    },
    {
      image: "https://i.postimg.cc/vZJqSNWy/toy9.jpg",
    },
    {
      image: "https://i.postimg.cc/sgKpMHMx/toy8.webp",
    },
    {
      image: "https://i.postimg.cc/8C0MHFBV/toy9.jpg",
    },
    {
      image: "https://i.postimg.cc/9MwTNWJw/toy2.jpg",
    },
    {
      image: "https://i.postimg.cc/y8V7fvvF/toy11.webp",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const rightSlide = () => {
    setCurrentSlide(
      currentSlide === sliderImages.length - 1 ? 0 : currentSlide + 1
    );
  };

  const leftSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? sliderImages.length - 1 : currentSlide - 1
    );
  };

  const handleDot = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="slider">
        <div className="slider-image-container">
          {sliderImages &&
            sliderImages.map((img, index) => (
              <div
                key={index}
                className={`slider-image ${
                  index === currentSlide ? "active" : ""
                }`}
              >
                <img src={img.image} alt="" className="images" />
                <div className="slider-caption">{img.caption}</div>
              </div>
            ))}
        </div>
        <div className="slider-controls">
          <button className="slider-control" onClick={leftSlide}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
              height="50px"
              width="50px"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                color: "#fff",
                backgroundColor: "#073453",
                padding: "10px",
                borderRadius: "50px",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button className="slider-control" onClick={rightSlide}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
              height="50px"
              width="50px"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                color: "#fff",
                backgroundColor: "#073453",
                padding: "10px",
                borderRadius: "50px",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="dot-container">
          {sliderImages.map((n, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => handleDot(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
