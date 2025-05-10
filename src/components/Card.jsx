import React, { useState } from "react";
import AnimatedWrapper from "./AnimatedWrapper";

const Card = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Track image loading state
  return (
    <AnimatedWrapper className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        {!isImageLoaded && (
          <div className="w-full h-48 bg-gray-300 animate-pulse rounded-xl"></div>
        )}
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-xl"
          loading="lazy"
          onLoad={() => {
            console.log("Image loaded");
            setIsImageLoaded(true);
          }} // Set image loaded state to true
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default Card;
