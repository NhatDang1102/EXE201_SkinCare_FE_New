import { useContext } from "react";
import "./Services.css";
import BannerImg from "../../assets/image 24.png"

import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  // transition
  const transitionImg = {
    duration: 1,
    type: "slide",
  };

  const handleRegisterDirect = () => {
    navigate("/");
  };

  return (
    <div className="services" id="services">
      <motion.img
        initial={{ top: "0" }}
        whileInView={{ top: "-230px" }}
        transition={transitionImg}
        src={BannerImg} alt="" 
        className="bannerImg"/>
      <div className="s-title">Join Our Thriving Community</div>
      <button className="getStartedButton">Get Started For Free</button>
    </div>
  );
};

export default Services;