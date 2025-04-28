import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-colors"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;
