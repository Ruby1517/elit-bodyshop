import { Facebook, Instagram, Twitter, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <Phone size={16} /> (559)286-4750
          </p>
          <p>
            <a href="mailto:info@eliteautobody.com" className="hover:text-orange-500 transition-colors">
              info@eliteautobody.com
            </a>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 mt-2">
            <MapPin size={16} /> 2345 W Belmont Ave, Fresno, CA 93728
          </p>
        </div>

        {/* Navigation Menu */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-orange-500 transition-colors">Home</a></li>
            <li><a href="#services" className="hover:text-orange-500 transition-colors">Services</a></li>
            <li><a href="#estimate" className="hover:text-orange-500 transition-colors">Get Estimate</a></li>
            <li><a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="hover:text-orange-500 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
        © 2025 Torres Auto Body Shop Inc. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
