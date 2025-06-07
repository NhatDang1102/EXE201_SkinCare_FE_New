import { useEffect, useState } from "react";
import { User, Mail, Shield, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import BGImage from "../../components/BGImage/BGImage";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    role: "",
  });
const navigate = useNavigate();
   const loadUserProfile = () => {
    const storedName = sessionStorage.getItem("username") || localStorage.getItem("username");
    const storedEmail = sessionStorage.getItem("email") || localStorage.getItem("email");
    const storedRole = sessionStorage.getItem("role") || localStorage.getItem("role");
    setUserProfile({
      username: storedName || "Unknown",
      email: storedEmail || "Not Found",
      role: storedRole || "Undeserving",
    });
  };

  useEffect(() => {
    loadUserProfile();

    // Khi tab chuyển focus hoặc có sự kiện storage
    window.addEventListener("focus", loadUserProfile);
    window.addEventListener("storage", loadUserProfile);
    return () => {
      window.removeEventListener("focus", loadUserProfile);
      window.removeEventListener("storage", loadUserProfile);
    };
  }, []);

  return (
    <div className="profilePage">
      <BGImage />

      <div className="profileContainer">
        <div className="profileCard">
          <div className="profileHeader">
            <div className="avatarContainer">
              <div className="avatar">
                <User />
              </div>
              <div className="statusBadge"></div>
            </div>
            <div className="userName">
              {userProfile.username || "Loading..."}
            </div>
            <div className="userRole">{userProfile.role}</div>
          </div>

          <div className="profileDetails">
            <div className="detailItem">
              <UserCheck className="detailIcon" />
              <div className="detailContent">
                <div className="detailLabel">Username</div>
                <div className="detailValue">{userProfile.username}</div>
              </div>
            </div>

            <div className="detailItem">
              <Mail className="detailIcon" />
              <div className="detailContent">
                <div className="detailLabel">Email Address</div>
                <div className="detailValue">{userProfile.email}</div>
              </div>
            </div>

            <div className="detailItem">
              <Shield className="detailIcon" />
              <div className="detailContent">
                <div className="detailLabel">Role</div>
                <div className="detailValue">{userProfile.role}</div>
              </div>
            </div>
          </div>

          <div className="actionButtons">
            <button className="actionButton primaryButton" onClick={() => navigate("/editprofile")}>
              Edit Profile
            </button>
            <button className="actionButton secondaryButton">Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
