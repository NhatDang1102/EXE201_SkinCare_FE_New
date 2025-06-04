import { useContext } from "react";
import "./Intro.css";
import FloatinDiv from "../FloatingDiv/FloatingDiv";
import skincareIntro from "../../assets/image 4.png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
const Intro = () => {
  const navigate = useNavigate();
  // Transition
  const transition = { duration: 2, type: "spring" };

  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const handleDirect = () => {
    navigate("/login");
  };

  return (
    <div className="Intro" id="Intro">
      <div className="i-left">
        <div className="i-background">
          <motion.img 
            initial={{ left: "0%" }}
            whileInView={{ left: "10%" }}
            transition={transition}
            src={skincareIntro} alt="" />
        </div>
      </div>
      <div className="i-right">
        <motion.div
        initial={{ left: "40%" }}
        whileInView={{ top: "0%", left: "30%" }}
        transition={transition}
        className="i-name">
          <span>Your Personal</span>
          <span>AI-Powered</span>
          <span>Skincare</span>
          <span>Journey</span>
          <span>
            Join our community of skincare enthusiasts and get personalized recommendations powered by AI
          </span>
        </motion.div>
        <motion.div
          initial={{ left: "20%" }}
          whileInView={{ left: "5%" }}
          transition={transition} style={{position: 'relative'}}>
          <button className="frontPageButton i-button" onClick={() => handleDirect()}>Start Free Analysis</button>
        </motion.div>
        {/* animation */}
        {/* <motion.img
          initial={{ left: "100%" }}
          whileInView={{ left: "0%" }}
          transition={transition}
          src={}
          alt=""
        /> */}

      </div>
    </div>
  );
};

export default Intro;