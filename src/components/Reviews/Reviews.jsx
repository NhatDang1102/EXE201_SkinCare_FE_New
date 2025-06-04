import React, { useContext } from "react";
import "./Reviews.css";
import Comment from "../Comment/Comment";
import pfp1 from "../../assets/Avatar.png";
import pfp2 from "../../assets/Avatar (2).png";
import pfp3 from "../../assets/Avatar (3).png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";

const Reviews = () => {
  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  // transition
  const transition = {
    duration: 1,
    type: "spring",
  };

  return (
    <div className="reviewsBox" id="reviews">
      <div className="awesome">
        <div className="reviewsBoxTitle">Reviews</div>
        <div className="reviews">
          {/* first review */}
          <motion.div
            initial={{ left: "10%" }}
            whileInView={{ left: "0%" }}
            transition={transition}
            className="reviewContainer"
          >
            <Comment
              review={"The AI recommendations completely transformed my skincare routine"}
              profile={pfp1}
              name={"Mike R."}
              title={"KOL / Reviewer"}
            />
          </motion.div>
          {/* second review */}
          <motion.div
            initial={{ left: "20%" }}
            whileInView={{ left: "0%"}}
            transition={transition}
            className="reviewContainer"
          >
            <Comment
              review={"Love the community support and product recommendations."}
              profile={pfp2}
              name={"Sarah K."}
              title={"Skincare Enthusiast"}
            />
          </motion.div>
          {/* 3rd review */}
          <motion.div
            initial={{ left: "40%" }}
            whileInView={{ left: "0%" }}
            transition={transition}
            className="reviewContainer"
          >
            <Comment
              review={"The tracking feature helps me stay consistent with my routine. Amazing results!"}
              profile={pfp3}
              name={"Lisa M."}
              title={"Skincare Blogger"}
            />
          </motion.div>
          {/* <div 
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}>

          </div>
          <div
            className="blur s-blur2"
            style={{ background: "var(--purple)" }}
          ></div> */}
        </div>
      </div>
    </div>
  );
};

export default Reviews;