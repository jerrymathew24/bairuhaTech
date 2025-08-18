"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function CompanyCarousel() {
  const logos = [
    {
      src: "https://www.citypng.com/public/uploads/preview/download-round-dhl-express-delivery-logo-icon-png-701751695035671nhorrw95xk.png",
      alt: "DHL",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Patchi-Logo.jpg/330px-Patchi-Logo.jpg",
      alt: "Patchi",
    },
    {
      src: "https://parcel-king.com/static/media/logo.05fc2fb9.png",
      alt: "parcel-king",
    },
    {
      src: "https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/04/Mars-Wrigley-Logo.png?w=300&ssl=1",
      alt: "Mars-wrigley",
    },
    {
      src: "https://img.businessoffashion.com/resizer/v2/https%3A%2F%2Fprod-bof-media.s3.eu-west-1.amazonaws.com%2Fimport%2Ffilestack%2FVi4VWedHRdSquSDDd4tJ_52eb938fba9bb5fe7fecb7005941a438.jpg?auth=223913ef9912d5c2a2c8de149a4981c6a894ceadfe700686d0cb506755c2ad9e&width=480",
      alt: "chalhoub",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/JNC_logo-01.png/500px-JNC_logo-01.png",
      alt: "Jashanmal",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-teal-300 to-blue-800 py-16 text-center relative">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        We are proud to have engineers on our team
        <br />
        with such valuable experience
      </h2>
      <p className="text-white/80 mb-10">
        having worked with the below leading organizations, but our company is
        not affiliated with or endorsed by any of them
      </p>

      {/* Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="px-8"
      >
        {logos.map((logo, i) => (
          <SwiperSlide key={i}>
            <div className="hexagon-mask w-32 h-32 md:w-40 md:h-40 mx-auto flex items-center justify-center bg-white shadow-md">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-[70%] max-h-[70%] object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* GLOBAL SVG defs */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="roundedHex" clipPathUnits="objectBoundingBox">
            <path
              d="
                M0.25,0.04
                H0.75
                Q0.80,0.04,0.83,0.09
                L0.98,0.41
                Q1.00,0.45,0.98,0.50
                L0.83,0.91
                Q0.80,0.96,0.75,0.96
                H0.25
                Q0.20,0.96,0.17,0.91
                L0.02,0.50
                Q0.00,0.45,0.02,0.41
                L0.17,0.09
                Q0.20,0.04,0.25,0.04
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      {/* Global CSS so mask works */}
      <style jsx global>{`
        .hexagon-mask {
          clip-path: url(#roundedHex);
        }
      `}</style>
    </div>
  );
}
