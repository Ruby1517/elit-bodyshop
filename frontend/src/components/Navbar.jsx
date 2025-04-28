import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  const handleScrollLinkClick = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(section);
      }, 100);
    } else {
      scrollToSection(section);
    }
  };

  const handleEstimateClick = () => {
    navigate('/estimate');
    setActiveSection("estimate")
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {

    if (location.pathname !== "/") {
      // When on other pages (gallery, estimate, etc.)
      setActiveSection(location.pathname.replace("/", ""));
      return;
    }
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id !== activeSection) {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [location.pathname]);

  const linkClass = (section) =>
    `text-lg font-medium transition-colors ${
      activeSection === section ? "text-orange-500" : "hover:text-orange-500"
    }`;

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Torres Auto Body Shop Inc.
          </Link>
        </h1>
        <div className="space-x-6 flex items-center">
          <button onClick={() => handleScrollLinkClick("home")} className={linkClass("home")}>
            Home
          </button>
          <button onClick={() => handleScrollLinkClick("before-after")} className={linkClass("before-after")}>
            Before & After
          </button>
          <button onClick={() => handleScrollLinkClick("services")} className={linkClass("services")}>
            Services
          </button>
          <button onClick={() => handleScrollLinkClick("testimonials")} className={linkClass("testimonials")}>
            Testimonials
          </button>
          
          <button onClick={() => handleScrollLinkClick("advice")} className={linkClass("advice")}>
            Advice
          </button>
          <button onClick={() => handleScrollLinkClick("about-us")} className={linkClass("about-us")}>
            About Us
          </button>

          <button 
            onClick={handleEstimateClick}
            className={linkClass("estimate")}
            >
            Get Estimate
          </button>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
