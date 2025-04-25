function Home() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
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
          Welcome to Elite Auto Body Shop
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Expert auto body repair and painting services to restore your vehicle to its former glory.
        </p>
        <a
          href="/#estimate"
          className="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Get a Free Estimate
        </a>
      </div>
    </section>
  );
}

export default Home;