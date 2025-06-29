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
    navigate("/schedule");
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
          <span>Hành trình</span>
          <span>chăm sóc da</span>
          <span>cá nhân hóa</span>
          <span>bằng trí tuệ nhân tạo</span>
          <span>
            Tham gia cộng đồng yêu thích chăm sóc da và nhận gợi ý riêng dành cho bạn, được hỗ trợ bởi AI.
          </span>
        </motion.div>
        <motion.div
          initial={{ left: "20%" }}
          whileInView={{ left: "5%" }}
          transition={transition} style={{ position: 'relative' }}>
          <button className="frontPageButton i-button" onClick={() => handleDirect()}>Bắt đầu phân tích miễn phí</button>
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