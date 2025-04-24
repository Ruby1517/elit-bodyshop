function Home() {
    return (
      <section id="home" className="bg-gray-100 py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Welcome to Elite Auto Body Shop
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
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