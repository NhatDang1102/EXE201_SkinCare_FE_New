import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from "./features/Auth/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ThemeProvider } from "./Context";
import './App.css';
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AboutPage from "./pages/AboutPage/AboutPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import ProtectedRoutes from "./utils/ProtectedRoute";
import VIPPurchasePage from "./pages/VIPPurchasePage/VIPPurchasePage";
import BlogPage from "./pages/BlogPage/BlogPage";
import DashboardPage from "./pages/AdminPages/Dashboard/DashboardPage";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const authen = useAuth();
  const userAuth = authen ? authen.userAuth : null;

  window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  }, false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loader" />;

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <ThemeProvider>
            <Navbar selected={"home"}/>
            <HomePage />
            <Footer />
          </ThemeProvider>} />
          
        <Route path="/about_us" element={
          <ThemeProvider>
            <Navbar selected={"about"}/>
            <AboutPage />
            <Footer />
          </ThemeProvider>
        } />

        <Route path="/login" element={<LoginPage accountAction={false} />} />
        <Route path="/sign-in" element={<LoginPage accountAction={true} />} />
        <Route element={user ? <ProtectedRoutes user={user} /> : <ProtectedRoutes user={userAuth} />}>
          <Route path='/profile' element={ <ThemeProvider> <Navbar selected={"profile"}/> <ProfilePage /><Footer/></ThemeProvider> } />
          <Route path='/editprofile' element={ <ThemeProvider> <Navbar selected={"profile"}/> <EditProfilePage /><Footer/></ThemeProvider> } />

          <Route path='/AdminPage/Dashboard' element={ <ThemeProvider> <Sidebar selected={"Dashboard"}/> <DashboardPage /> </ThemeProvider> } />
          <Route path='/AdminPage/Profile' element={ <ThemeProvider> <Sidebar selected={"Profile"}/> <ProfilePage /> </ThemeProvider> } />
        </Route>
        <Route path="/VIP-purchase" element={<ThemeProvider> <Navbar selected={""}/> <VIPPurchasePage /> <Footer /> </ThemeProvider> } />
        <Route path="/blog" element={<ThemeProvider> <Navbar selected={"blog"}/> <BlogPage /> <Footer /> </ThemeProvider> } />
        
      </Routes>
    </>
  );
}

export default App;
