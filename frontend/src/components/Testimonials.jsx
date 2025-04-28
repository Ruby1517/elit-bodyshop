import { Star } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      name: 'John D.',
      feedback: 'Elite Auto Body Shop repaired my car perfectly after an accident. The service was quick, professional, and affordable!',
      rating: 5
    },
    {
      name: 'Sarah M.',
      feedback: 'Amazing work! My car looks brand new. Highly recommend Elite Auto Body Shop to anyone needing repairs.',
      rating: 5
    },
    {
      name: 'Mike B.',
      feedback: 'Very friendly staff and outstanding craftsmanship. They kept me updated throughout the whole process.',
      rating: 4
    }
  ];

  return (
    <section id="testimonials" data-aos="zoom-in" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          What Our Customers Say
        </h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.feedback}"</p>
              <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
