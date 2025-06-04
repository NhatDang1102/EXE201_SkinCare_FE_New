import React from "react";
import "./Footer.css";
import Logo from "/logo skincare 2.svg";
import { Facebook, LinkedIn, Instagram, YouTube } from "@mui/icons-material";


const Footer = () => {
  return (
    <div className="footer">
      <div className="f-content-left">
        <img src={Logo} alt=""/> 
        <div>
            <span>Team 202</span>
            <span>Your AI-powered skincare companion</span>
        </div>
      </div>
      <div className="f-content-right">
            <div> <span>Features</span> <span>Community</span> <span>AI Consultation</span> <span>Product Hub</span> </div>
            <div> <span>Company</span> <span>About Us</span> <span>Blog</span> <span>Contact</span> </div>
            <div> <span>Follow Us</span>  
                <span className="f-icons"> <Facebook style={{color: "gray", size: "3rem"}} /> <LinkedIn style={{color: "gray", size: "3rem"}} />
                       <YouTube style={{color: "gray", size: "3rem"}} /> <Instagram style={{color: "gray", size: "3rem"}} />
                </span>
            </div>
      </div>
    </div>
  );
};

export default Footer;