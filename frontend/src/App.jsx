import { useEffect } from 'react';
import AOS from 'aos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BeforeAfter from './components/BeforeAfter';
import EstimateForm from './components/EstimateForm';
import Advice from './components/Advice';
import Footer from './components/Footer';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import UserRegister from './pages/UserRegister'
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './components/Gallery';
import AdminUploadMedia from './pages/AdminUploadMedia'


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,  // Animation duration (ms)
      once: true,  // inly animate once pre scrool
    });
  }, []);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <BeforeAfter />
                  <Services />
                  <Testimonials />
                  <Advice />
                </>
              }
            />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-beforeAfter" element={<AdminUploadMedia />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/estimate" element={<EstimateForm />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;