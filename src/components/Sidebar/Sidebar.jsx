import { motion, useScroll, useMotionValueEvent, useTransform, useInView } from "framer-motion";
import Logo from "/logo skincare 2.svg";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";

import LogoutButton from '../../features/AccountActions/LogoutButton'
import { AccountBox, InsertChart, Leaderboard } from "@mui/icons-material";

const Sidebar = ({ selected }) => {
    const [showBlogDropdown, setShowBlogDropdown] = useState(false);
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const updateEmail = () => {
            const savedEmail = sessionStorage.getItem("email") || localStorage.getItem("email");
            setEmail(savedEmail ? { email: savedEmail } : null);
        };

        updateEmail();

        window.addEventListener("storage", updateEmail);

        return () => window.removeEventListener("storage", updateEmail);
    }, []);


    useMotionValueEvent(scrollYProgress, "change",
    );

    const position = useTransform(
        scrollYProgress,
        [0, 0.02],
        ["0%", "-5%"]
    )
    const borderColor = useTransform(
        scrollYProgress,
        [0.02, 1],
        ["none", "1px solid gray"]
    )
    const showShadow = useTransform(
        scrollYProgress,
        [0.02, 1],
        ["none", "0 1px 20px gray"]
    )
    const bgColor = useTransform(
        scrollYProgress,
        [0.02, 1],
        ["", "rgba(211, 211, 211, 0.8)"]
    )
    const blurFilter = useTransform(
        scrollYProgress,
        [0.02, 1],
        ["none", "blur(10px)"]
    )

    return (
        <motion.div className="s-wrapper" id="Sidebar"
            style={{
                position: "fixed",
                x: position,
                boxShadow: showShadow,
                backgroundColor: bgColor,
            }}
        >
            {/* top */}
            <div className="s-top">
                <img className="skincareLogo" src={Logo} />
                <div className="s-name">Skincare</div>
            </div>
            {/* bottom */}
            <div className="s-bottom">
                <div className="s-list">
                    <ul>
                        <li>
                            <Link to="top" spy={true} smooth={true} className={selected === "Dashboard" ? 'selected' : ''}
                                onClick={() => navigate('/AdminPage/Dashboard')} style={{ cursor: 'pointer' }} >
                                <InsertChart className={selected === "Dashboard" ? 'morbinTime' : ''} /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="top" spy={true} smooth={true} className={selected === "Profile" ? 'selected' : ''}
                                onClick={() => navigate('/AdminPage/Profile')} style={{ cursor: 'pointer' }} >
                                <AccountBox className={selected === "Profile" ? 'morbinTime' : ''} /> Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="top" spy={true} smooth={true} className={selected === "Leaderboard" ? 'selected' : ''} 
                               onClick={() => navigate('/AdminPage/Dashboard')} style={{ cursor: 'pointer' }} >
                                <Leaderboard className={selected === "Leaderboard" ? 'morbinTime' : ''} /> Leaderboard
                            </Link>
                        </li>
                        <li
                            className="sidebar-menu-item"
                            tabIndex={0}
                            onClick={() => setShowBlogDropdown(v => !v)}
                            style={{ cursor: "pointer" }}
                        >
                            <span className="sidebar-dot" />
                            <span className={`sidebar-text ${showBlogDropdown ? "active" : ""}`}>
                                Blog Management
                                <span style={{ fontSize: "1rem", marginLeft: 5, transition: "transform 0.16s", display: "inline-block", transform: showBlogDropdown ? "rotate(180deg)" : "none" }}>
                                    ▼
                                </span>
                            </span>
                        </li>
                        {showBlogDropdown && (
                            <ul className="sidebar-dropdown">
                                <li onClick={() => navigate("/AdminPage/CreateBlogPage")} className="sidebar-dropdown-item">Create Blog</li>
                                <li onClick={() => navigate("/AdminPage/ListBlogPage")} className="sidebar-dropdown-item">List Blog</li>
                            </ul>
                        )}

                        <li>
                            <Link to="top" spy={true} smooth={true} className={selected === "about" ? 'selected' : ''}
                                onClick={() => navigate('/about_us')} style={{ cursor: 'pointer' }} >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                {email ? (<LogoutButton onClick={() => setEmail(null)} />) :
                    (<>
                        <a>
                            <button className="homePageLoginButton" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Log in</button>
                        </a>
                        <a>
                            <button className="homePageSigninButton" onClick={() => navigate('/sign-in')} style={{ cursor: 'pointer' }}>Sign in</button>
                        </a>
                    </>)
                }
            </div>
        </motion.div>
    );
};

export default Sidebar;