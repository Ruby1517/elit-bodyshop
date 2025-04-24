function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="container mx-auto text-center">
        <p className="text-base mb-2">© 2025 Elite Auto Body Shop. All rights reserved.</p>
        <p className="text-base">
          Contact: <a href="tel:(123)456-7890" className="hover:text-orange-500 transition-colors">(123) 456-7890</a> |{' '}
          <a href="mailto:info@eliteautobody.com" className="hover:text-orange-500 transition-colors">info@eliteautobody.com</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;