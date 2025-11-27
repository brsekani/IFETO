import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AuthSliderMobile = () => {
  const slides = [
    {
      title: "Naturally African. Globally Delivered",
      subtitle: "Seamless worldwide shipping, straight from the source",
    },
    {
      title: "Ethical Goods, Direct from the Source",
      subtitle: "Bringing you natural goods with honest origins",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative lg:hidden mt-3">
      {/* <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        pagination={{
          clickable: true,
        }}
        speed={1000}
        loop={true}
        slidesPerView={1}
        initialSlide={1}
        autoHeight
        className="w-full max-w-xl swiper-main"
        modules={[Pagination, Autoplay]}
      >
        <SwiperSlide className="relative">
          <div className="w-full text-center">
            <h2 className="font-bold text-lg ">
              Naturally African. Globally Delivered
            </h2>
            <p className="mt-1 text-sm">
              Seamless worldwide shipping, straight from the source{" "}
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="w-full text-center">
            <h2 className="font-bold text-lg ">
              Ethical Goods, Direct from the Source
            </h2>
            <p className="mt-1 text-sm">
              Bringing you natural goods with honest origins
            </p>
          </div>
        </SwiperSlide>
      </Swiper> */}

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.7 }}
          className="w-full text-center relative"
        >
          <h2 className="font-bold text-lg">{slides[index].title}</h2>
          <p className="mt-1 text-sm">{slides[index].subtitle}</p>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots (Bottom Center) */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              idx === index ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthSliderMobile;
