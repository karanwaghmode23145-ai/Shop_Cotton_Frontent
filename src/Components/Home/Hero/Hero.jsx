import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  const slides = [
    {
      title: "Men's Collection",
      subtitle: "Trendy styles for every occasion",
      image:
        "https://res.cloudinary.com/dawcnlfhs/image/upload/v1762515776/banner_p0co7t.avif",
     category: "Men", // ✅ Added category slug
    },
    {
      title: "Women's Fashion",
      subtitle: "Fresh arrivals & timeless classics",
      image:
        "https://res.cloudinary.com/dawcnlfhs/image/upload/v1762515948/banner2_qrczxd.avif",
      category: "Women",
    },
  ];

  return (
    <div className="category-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                
                <Link className="shop-btn" to={`/shop/${slide.category}`}>
                Shop Now →               
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
