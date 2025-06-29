import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useInView,
} from "framer-motion";
import Logo from "/logo skincare 2.svg";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useEffect, useRef, useState } from "react";

import LogoutButton from "../../features/AccountActions/LogoutButton";
import { Home, Info, LibraryBooks, Portrait, SensorOccupied } from "@mui/icons-material";

const navItems = [
  { icon: <Home />, label: "Trang chủ", route: "/", key: "home" },
  { icon: <SensorOccupied />, label: "Tư vấn bằng AI", route: "/schedule", key: "consultation" },
  { icon: <LibraryBooks />, label: "Blog", route: "/blog", key: "blog" },
  { icon: <Portrait />, label: "Trang cá nhân", route: "/profile", key: "profile" },
  { icon: <Info />, label: "Giới thiệu", route: "/about_us", key: "about" },
];

const navbar = ({ selected, index }) => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [email, setEmail] = useState(null);
  console.log("Index", index)
  const [activeIndex, setActiveIndex] = useState(index);
  const markerRef = useRef(null);
  const liRefs = useRef([]);

  const transitionSmooth = {
    duration: 2,
    type: "slide",
  };

  useEffect(() => {
    const activeLi = liRefs.current[activeIndex];
    if (activeLi && markerRef.current) {
      markerRef.current.style.left = `${activeLi.offsetLeft}px`;
      markerRef.current.style.width = `${activeLi.offsetWidth}px`;
    }
  }, [activeIndex]);

  useEffect(() => {
    const updateEmail = () => {
      const savedEmail =
        sessionStorage.getItem("email") || localStorage.getItem("email");
      setEmail(savedEmail ? { email: savedEmail } : null);
    };

    updateEmail();

    window.addEventListener("storage", updateEmail);

    return () => window.removeEventListener("storage", updateEmail);
  }, []);

  useMotionValueEvent(scrollYProgress, "change");

  const position = useTransform(scrollYProgress, [0, 0.02], ["20px", "0px"]);
  const borderColor = useTransform(
    scrollYProgress,
    [0.02, 1],
    ["none", "1px solid gray"]
  );
  const showShadow = useTransform(
    scrollYProgress,
    [0.02, 1],
    ["none", "0 1px 20px gray"]
  );
  const bgColor = useTransform(
    scrollYProgress,
    [0.02, 1],
    ["", "rgba(211, 211, 211, 0.8)"]
  );
  const blurFilter = useTransform(
    scrollYProgress,
    [0.02, 1],
    ["none", "blur(10px)"]
  );

  return (
    <motion.div
      className="n-wrapper"
      id="Navbar"
      style={{
        position: "fixed",
        paddingTop: position,
        boxShadow: showShadow,
        backgroundColor: bgColor,
        backdropFilter: blurFilter,
      }}
      transition={transitionSmooth}
    >
      {/* left */}
      <div className="n-left">
        <img className="skincareLogo" src={Logo} />
        <div className="n-name">Skincare</div>
      </div>
      {/* right */}
      <div className="n-right">
        <div className="n-list">
          <ul style={{ listStyleType: "none" }}>
            {navItems.map((item, index) => (
              <li key={item.key} ref={(el) => (liRefs.current[index] = el)}>
                <Link
                  to="top"
                  spy={true}
                  smooth={true}
                  className={selected === item.key ? "selected" : ""}
                  onClick={() => {
                    navigate(item.route);
                    setActiveIndex(index);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
            {selected && <div id="marker" ref={markerRef}></div>}
          </ul>
        </div>
        {email ? (
          <LogoutButton onClick={() => setEmail(null)} />
        ) : (
          <>
            <a>
              <button
                className="homePageLoginButton"
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Đăng nhập
              </button>
            </a>
            <a>
              <button
                className="homePageSigninButton"
                onClick={() => navigate("/sign-in")}
                style={{ cursor: "pointer" }}
              >
                Đăng kí
              </button>
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default navbar;
