import React, { useState, useEffect } from "react";
import "./Carousel.css"; // Create this file for simple styling

// import image1 from '../../../../image/image1.jpg';
// import image2 from '../../../../image/image2.jpg';
// import image3 from '../../../../image/image3.jpg';
import image1 from '../../../../assets/CarosoulImages/image1.jpg'
import image2 from '../../../../assets/CarosoulImages/image2.jpg'
import image3 from '../../../../assets/CarosoulImages/image3.jpg'

const Carousel = () => {
  const images = [image1, image2, image3];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 3 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, [currentIndex]); // Depend on currentIndex so it updates correctly

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="prev">
        &#10094;
      </button>
      <div className="carousel-image">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>
      <button onClick={nextSlide} className="next">
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
