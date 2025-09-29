import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroCarousel from './components/HeroCarousel';
import CategoriesSection from './components/sections/CategoriesSection';
import SectionSeparator from './components/sections/SectionSeparator';
import ProductsSection from './components/sections/ProductsSection';
import TrendsSlider from './components/sections/TrendsSlider';
import Locatie from './pages/Locatie';
import Contact from './pages/Contact';
import './App.css';

// Component to handle conditional footer rendering
const AppContent = () => {
  const location = useLocation();
  const noFooterRoutes = ['/contact', '/locatie'];
  const shouldShowFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div className="App">
      {/* Header Fix Complet */}
      <Header />
      
      <Routes>
        <Route path="/" element={
          <main>
            {/* Hero Carousel - Păstrat EXACT cum este */}
            <HeroCarousel />
            
            {/* Secțiunea Categorii Principale */}
            <CategoriesSection />
            
            {/* Separator cu logo San Marco */}
            <SectionSeparator />
            
            {/* Secțiunea "4 Produse Recomandate" */}
            <ProductsSection />
            
            {/* Secțiunea "Trenduri de Decor" – slider simplu și elegant */}
            <TrendsSlider />
          </main>
        } />
        <Route path="/locatie" element={<Locatie />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
      {/* Footer Complet - doar dacă nu suntem pe rutele modal */}
      {shouldShowFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;