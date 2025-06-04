import Intro from "../../components/Intro/Intro";
import SwipeList from "../../components/SwipeList/SwipeList";
import Reviews from "../../components/Reviews/Reviews";
import Services from "../../components/Services/Services";
import "./HomePage.css"

import { useContext } from "react";
import { themeContext } from "../../Context";

export default function HomePage() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
        <div className= { darkMode ? "homePageApp" : "homePageApp Dark"}
        style={{
            background: darkMode ? "white" : "#333",
            color: darkMode ? "" : "white",
        }}
        >
            
            <Intro />
            <SwipeList/>
            <Reviews />
            <Services />
            
        
        </div>
  )
}