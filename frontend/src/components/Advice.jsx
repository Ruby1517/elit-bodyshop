function Advice() {
  return (
    <section id="advice" data-aos="flip-up" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Auto Body Care Advice
        </h2>
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
          <ul className="space-y-6 text-gray-700 text-lg">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>
                <strong>Act Quickly:</strong> Address scratches or dents immediately to prevent rust and further damage.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>
                <strong>Regular Cleaning:</strong> Wash your car regularly to remove dirt and contaminants that can harm the paint.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>
                <strong>Professional Repairs:</strong> Always choose certified professionals for collision repairs to ensure quality.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>
                <strong>Protect Your Paint:</strong> Apply wax or a sealant to protect your car's finish from UV rays and weather.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>
                <strong>Insurance Claims:</strong> Document damage thoroughly with photos before repairs for smooth insurance processing.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Advice;