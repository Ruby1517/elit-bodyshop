import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          <Link to="/" className="hover:text-orange-500 transition-colors">Elite Auto Body Shop</Link>
        </h1>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-lg font-medium hover:text-orange-500 transition-colors">Home</Link>
          <a href="/#before-after" className="text-lg font-medium hover:text-orange-500 transition-colors">Before & After</a>
          <a href="/#services" className="text-lg font-medium hover:text-orange-500 transition-colors">Services</a>
          <a href="/#estimate" className="text-lg font-medium hover:text-orange-500 transition-colors">Get Estimate</a>
          <a href="/#advice" className="text-lg font-medium hover:text-orange-500 transition-colors">Advice</a>
          <Link to="/admin" className="text-lg font-medium bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;