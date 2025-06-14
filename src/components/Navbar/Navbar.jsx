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
import { useEffect, useState } from "react";

import LogoutButton from "../../features/AccountActions/LogoutButton";

const navbar = ({ selected }) => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [email, setEmail] = useState(null);

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

  const position = useTransform(scrollYProgress, [0, 0.02], ["20%", "0%"]);
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
        y: position,
        boxShadow: showShadow,
        backgroundColor: bgColor,
        backdropFilter: blurFilter,
      }}
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
            <li>
              <Link
                to="top"
                spy={true}
                smooth={true}
                className={selected === "home" ? "selected" : ""}
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                Home
              </Link>
            </li>
            <li>
              <a>AI Consultation1111</a>
            </li>
            <li>
              <Link
                to="top"
                spy={true}
                smooth={true}
                className={selected === "blog" ? "selected" : ""}
                onClick={() => navigate("/blog")}
                style={{ cursor: "pointer" }}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="top"
                spy={true}
                smooth={true}
                className={selected === "profile" ? "selected" : ""}
                onClick={() => navigate("/profile")}
                style={{ cursor: "pointer" }}
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="top"
                spy={true}
                smooth={true}
                className={selected === "about" ? "selected" : ""}
                onClick={() => navigate("/about_us")}
                style={{ cursor: "pointer" }}
              >
                About
              </Link>
            </li>
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
                Log in
              </button>
            </a>
            <a>
              <button
                className="homePageSigninButton"
                onClick={() => navigate("/sign-in")}
                style={{ cursor: "pointer" }}
              >
                Sign in
              </button>
            </a>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default navbar;
