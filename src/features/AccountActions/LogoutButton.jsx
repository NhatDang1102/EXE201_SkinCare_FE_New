import { useEffect, useState } from 'react'
import { auth } from "../../firebase";
import { useAuth } from "../../features/Auth/useAuth"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "./LogoutButton.css"

export default function LogoutButton() {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {
      const loginForm = sessionStorage.getItem("LoggedInAs");
  
      if (loginForm) {
        setUserType(loginForm);
      }
    }, []);
  
  const handleLogout = async () => {
    try {
      if (userType === 'AccountIndex'){
        await logout();

        window.dispatchEvent(new Event("storage"));
        navigate("/");
      }
      else {
        await logout();
        await signOut(auth);

        window.dispatchEvent(new Event("storage"));

        navigate("/");
      }
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  return (
    <button type="primary" onClick={handleLogout} className='logout-Btn'>Logout</button>
  )
}