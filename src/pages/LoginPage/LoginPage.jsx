import { useState } from 'react';
import { auth, provider } from "../../firebase";
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../../features/Auth/useAuth';

import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack, ArrowForward, Mail, Lock } from '@mui/icons-material';

import "./LoginPage.css";
import GoogleIcon from '../../assets/24px.svg';
import FaceIcon from '../../assets/F-32px.svg';
import { useNavigate } from 'react-router-dom';
import SigninPage from '../SigninPage/SigninPage';
import OtpModal from '../../components/OtpModal/OtpModal';

const LoginPage = ({accountAction}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  const [switched, setSwitched] = useState(accountAction);
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotOtpModal, setShowForgotOtpModal] = useState(false);

  const handleClick = () => {
    setSwitched(!switched);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      if (result) { 
        const response = await googleLogin(result.user.email, result.user.accessToken, rememberMe); 
      
        if(response.role) {
          setTimeout(() => {
            navigate(response.role === "Admin" ? "/AdminPage/Dashboard" : "/profile");
          }, 100);
        }

      }
    } catch (error) {
      console.error("Google Login Failed:", error);
      setError("Failed to login. Please try again.");
    }
  };

  const handleNormalLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await login(email, password, rememberMe);
      if (response.role) {
        setTimeout(() => {
          navigate(response.role === "Admin" ? "/AdminPage/Dashboard" : "/profile");
        }, 100);
      }

      else if(response.code === "ERR_BAD_REQUEST") {
        console.log("Bad Login:", response)
        setError(response.response.data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <>
    <div className='loginContainer'>
      <Box className={switched ? "signinBox" : "signinBox away"}>
        <SigninPage />
      </Box> 
        
      <Box className={switched ? "usernamePassLoginBox away" : "usernamePassLoginBox"}>
        <div className='loginLable'>
          Log in to your account
        </div>
        <form onSubmit={handleNormalLogin}>
          <div className="input-field">
            <label><Mail/> Email address</label>
            <input
              className="input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label><Lock /> Password</label>
            <div className="passInput">
              <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className={`passToggle ${showPassword ? 'hide' : 'show'}`} onClick={togglePasswordVisibility}>  
                  <Visibility className={showPassword ? 'show' : ''}/> <VisibilityOff className={showPassword ? '' : 'hide'}/>
                </div>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <Box width="100%" height="20px" padding="0" display="flex" flexDirection="row" justifyContent="center" gap="220px" alignItems="center">
            <FormControlLabel
              control={<Checkbox size="small" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Remember me"
            />
            <span className="forgot-password" onClick={() => setShowForgotOtpModal(true)}>
              Forgot password?
            </span>
          </Box>
          <button className='loginButton' type="submit">
            Continue <ArrowForward />
          </button>
        </form>
      </Box>
      <div className="account-seperation" style={{userSelect: 'none' }} >
        <div className='line' />Or continue with<div className='line' />
      </div>
      <div className='loginMethods' >
        <button onClick={handleGoogleLogin} className='GoogleLoginButton'>
          <img src={GoogleIcon} alt='Google Icon' className='GGIcon' /> Google
        </button>
        <button className='FaceLoginButton'>
          <img src={FaceIcon} alt='Face Icon' className='GGIcon' /> Facebook
        </button>
      </div>
      

      <div className="account-toggle" style={{userSelect: 'none' }} >
        {switched ?
          (<><div className='line' />Already have an account? <span onClick={handleClick} style={{cursor: 'pointer'}}>Login here</span><div className='line' /> </> )
            :
          (<><div className='line' />Don't have an account? <span onClick={handleClick} style={{cursor: 'pointer'}}>Sign in</span><div className='line' /> </> )
        }
      </div>

      <button className="back-btn" onClick={() => {navigate("/"); setEmail(null);}}>
        <ArrowBack />
      </button>
    </div>

    {showForgotOtpModal && (
      <OtpModal
        email={""}
        forgotPass={true}
        onClose={() => setShowForgotOtpModal(false)}
        onSuccess={() => {
          setShowForgotOtpModal(false);
          navigate("/login");
        }}
      />
    )}
    </>
  );
}

export default LoginPage;