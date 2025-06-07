import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, ArrowForward, Mail, Lock, Person } from '@mui/icons-material';
import { useAuth } from '../../features/Auth/useAuth';
import { signUp } from '../../features/Auth/signUp';

import "../LoginPage/LoginPage.css";
import "./SigninPage.css";
import OtpModal from '../../components/OtpModal/OtpModal';

export default function SigninPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState(null);
  
  const [showOtpModal, setShowOtpModal] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const togglePasswordConfirmVisibility = () => setShowPasswordConfirm((prev) => !prev);

  const handleSignin = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");
      const result = await signUp({
        email,
        password,
        name: userName
      });

      if (result.message == "Network Error") {
        setError("Network Error. Please try again later.");
      }
      else if (result.message == "Email đã tồn tại hoặc chưa xác thực OTP.") {
        setError(result.message);
      }

      // Show OTP popup
    setShowOtpModal(true);

    console.log("Sign up success:", result);
    //   navigate("/login"); // Or auto-login or go to dashboard

    } catch (error) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <>
      <div className='signinLable'>
        Account
        <span>Create your account credentials</span>
      </div>
      <form onSubmit={handleSignin} className='signInFrom1'>
        <div className="input-field">
          <label><Person /> Username</label>
          <input type="text" className="input" placeholder="Enter your username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div className="input-field">
          <label><Mail /> Email address</label>
          <input type="email" className="input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-field">
          <label><Lock /> Password</label>
          <div className="passInput">
            <input type={showPassword ? "text" : "password"} className="input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className={`passToggle ${showPassword ? 'hide' : 'show'}`} onClick={togglePasswordVisibility}>
              <Visibility className={showPassword ? 'show' : ''} />
              <VisibilityOff className={showPassword ? '' : 'hide'} />
            </div>
          </div>
        </div>
        <div className="input-field">
          <label><Lock /> Confirm Password</label>
          <div className="passInput">
            <input type={showPasswordConfirm ? "text" : "password"} className="input" placeholder="Confirm your password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
            <div className={`passToggle ${showPasswordConfirm ? 'hide' : 'show'}`} onClick={togglePasswordConfirmVisibility}>
              <Visibility className={showPasswordConfirm ? 'show' : ''} />
              <VisibilityOff className={showPasswordConfirm ? '' : 'hide'} />
            </div>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className='loginButton' type="submit">
          Continue <ArrowForward />
        </button>
      </form>

      {showOtpModal && (
        <OtpModal
            email={email}
            forgotPass={false}
            onClose={() => setShowOtpModal(false)}
            onSuccess={() => {
            setShowOtpModal(false);
            navigate("/login");
            }}
        />
      )}
    </>
  );
}