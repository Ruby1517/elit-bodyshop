import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BeforeAfter from './components/BeforeAfter';
import EstimateForm from './components/EstimateForm';
import Advice from './components/Advice';
import Footer from './components/Footer';
import Admin from './components/Admin';

// Debug imports
console.log({ Navbar, Home, BeforeAfter, EstimateForm, Advice, Footer, Admin });

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <BeforeAfter />
                  <EstimateForm />
                  <Advice />
                </>
              }
            />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;