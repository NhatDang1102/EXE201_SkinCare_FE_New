import React, { useContext } from "react";
import "./SwipeList.css";
import { Swiper, SwiperSlide } from "swiper/react"
import { delay, motion } from "framer-motion";
import "swiper/css";
import ImageList1 from "../../assets/ImageList1.png";
import ImageList2 from "../../assets/ImageList2.png";
import ImageList3 from "../../assets/ImageList3.png";
import ImageList4 from "../../assets/ImageList4.png";
import { themeContext } from "../../Context";
const SwipeList = () => {
  const transition = { delay: 0, duration: 1, type: "slide" };
  const transition2 = { delay: 0.2, duration: 1, type: "slide" };
  const transition3 = { delay: 0.4, duration: 1, type: "slide" };
  const transition4 = { delay: 0.6, duration: 1, type: "slide" };
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="swipeList" id="swipeList">

      {/* slider */}
      <Swiper
        spaceBetween={60}
        slidesPerView={4}
        grabCursor={true}
        className="swipeList-slider"
      >
        <SwiperSlide>
          <motion.img 
            initial={{ top: "10%" }}
            whileInView={{ top: "0%" }}
            transition={transition} src={ImageList1} alt="" />
          <span>Community</span>
          <span>Share experience and connect with skincare enthusiasts</span>
        </SwiperSlide>
        <SwiperSlide>
          <motion.img 
            initial={{ top: "10%" }}
            whileInView={{ top: "0%" }}
            transition={transition2} src={ImageList2} alt="" />
          <span>AI Consultation</span>
          <span>Get personalized skincare recommendations</span>
        </SwiperSlide>
        <SwiperSlide>
          <motion.img 
            initial={{ top: "10%" }}
            whileInView={{ top: "0%" }}
            transition={transition3} src={ImageList3} alt="" />
          <span>Product Hub</span>
          <span>Explore verified product reviews and information</span>
        </SwiperSlide>
        <SwiperSlide>
          <motion.img 
            initial={{ top: "10%" }}
            whileInView={{ top: "0%" }}
            transition={transition4} src={ImageList4} alt="" />
          <span>Personalization</span>
          <span>Track your progress and skin health journey</span>
        </SwiperSlide>
        <SwiperSlide>
          <motion.img 
            initial={{ top: "10%" }}
            whileInView={{ top: "0%" }}
            transition={transition} src={ImageList1} alt="" />
          <span>Community</span>
          <span>Share experience and connect with skincare enthusiasts</span>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwipeList;