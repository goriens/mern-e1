import React from "react";
import { useState } from "react";
import BtnSlider from "./BtnSlider";
import { dataSlider } from "./dataSlider";
import "./Slider.css";

export const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <>
      <div className="container-slider">
        {dataSlider.map((item, index) => (
          <div
            key={item.id}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <img src={item.img} alt="img" width="100%" />
          </div>
        ))}
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />
        <div className="container-dots">
          {Array.from({ length: 4 }).map((item, index) => (
            <div
              key={index}
              onClick={() => moveDot(index + 1)}
              className={slideIndex === index + 1 ? "dot active" : "dot"}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};
