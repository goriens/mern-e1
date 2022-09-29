import React from "react";
import "./Slider.css";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img
        src={
          direction !== "next"
            ? "https://cdn-icons-png.flaticon.com/512/271/271220.png"
            : "https://cdn-icons-png.flaticon.com/512/32/32213.png"
        }
        alt="icon"
      />
    </button>
  );
}
