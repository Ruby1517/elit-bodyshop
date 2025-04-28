import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleEstimateClick = () => {
    navigate('/estimate');
  }
  return (
    <div>
      <section id="home" data-aos="fade-up" className="relative min-h-screen flex items-center justify-center">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/paint.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for Text Readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto text-center px-6 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Welcome to Torres Auto Body Shop
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Expert auto body repair and painting services to restore your vehicle to its former glory.
          </p>
          <button
            onClick={handleEstimateClick}
            className="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Get a Free Estimate
          </button>
          {/* <a 
            href="https://search.google.com/local/writereview?placeid=g/11cm04z7wr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Leave Us a Review on Google
          </a> */}
        </div>
      </section>

      <section id="about-us" data-aos="fade-up" className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Torres Auto Body Shop has proudly served our community for over 20 years, delivering top-quality repairs with excellent customer service. 
            Our certified technicians use the latest technology to restore your vehicle to its original condition. 
            We treat every car like it's our own!
          </p>
        </div>
      </section>

      {/* Trust Badges SEction */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="w-60 bg-white shadow-lg rounded-lg p-6">
              <img src="/images/certified.png" alt="Certified Technicians" className="h-20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Technicians</h3>
              <p className="text-gray-600">Fully licensed and factory-trained professionals.</p>
            </div>
            <div className="w-60 bg-white shadow-lg rounded-lg p-6">
              <img src="/images/warranty.png" alt="Lifetime Warranty" className="h-20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lifetime Warranty</h3>
              <p className="text-gray-600">We stand behind our work for the life of your vehicle.</p>
            </div>
            <div className="w-60 bg-white shadow-lg rounded-lg p-6">
              <img src="/images/fast-service.png" alt="Fast Service" className="h-20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">Get back on the road quickly and safely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section id="location" className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
          <div className="w-full h-96">
            <iframe
              title="Torres Auto Body Shop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.859996371013!2d-119.84173622484774!3d36.74993147053272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809467296c55c675%3A0x354bccfe4ef200be!2sTorres%20Auto%20Body%2C%20Inc.!5e0!3m2!1sen!2sus!4v1745873127854!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

  </div>
  );
}

export default Home;