import { Wrench, SprayCan, Car, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: 'Collision Repair',
    icon: <Car className="w-8 h-8 text-blue-600" />,
    description: 'Complete collision repair from minor dents to major structural damage.'
  },
  {
    title: 'Auto Painting',
    icon: <SprayCan className="w-8 h-8 text-blue-600" />,
    description: 'Professional color matching and high-quality paint jobs to restore your vehicle’s look.'
  },
  {
    title: 'Dent Removal',
    icon: <Wrench className="w-8 h-8 text-blue-600" />,
    description: 'Paintless dent repair and smoothing to make your car look brand new.'
  },
  {
    title: 'Insurance Assistance',
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    description: 'We help you handle insurance claims for a stress-free repair experience.'
  }
];

export default function Services() {
  return (
    <section id="services" data-aos="fade-right" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-md transition-all"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
