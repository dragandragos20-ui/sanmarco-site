import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [logoError, setLogoError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { name: 'Acasă', href: '/' },
    { name: 'Produse', href: 'https://ro.san-marco.com/produse', external: true },
    { name: 'Culoare', href: 'https://ro.san-marco.com/paletare-de-culori-1270-culori-pentru-interior', external: true },
    { name: 'Spații', href: 'https://ro.san-marco.com/spatii', external: true },
    { name: 'Decorative', href: 'https://ro.san-marco.com/decorative', external: true },
    { name: 'Contact', href: '/contact' }
  ];

  const handleLinkClick = (href: string) => {
    if (href === '/#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-white border-b border-gray-200 shadow-sm' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Location */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link to="/" className="flex items-center">
              {!logoError ? (
                <img 
                  src="/assets/images/sanmarco-logo.png" 
                  alt="San Marco - Vopsele și finisaje decorative premium"
                  className="h-10 md:h-14 w-auto object-contain hover:opacity-90 transition-opacity duration-200 logo-transparent"
                  loading="eager"
                  style={{ background: 'transparent' }}
                  onError={() => {
                    console.warn('Primary logo failed, trying fallback');
                    setLogoError(true);
                  }}
                />
              ) : (
                <img 
                  src="/assets/images/sanmarco-logo-footer.png" 
                  alt="San Marco - Vopsele și finisaje decorative premium"
                  className="h-10 md:h-14 w-auto object-contain hover:opacity-90 transition-opacity duration-200 logo-transparent"
                  style={{ background: 'transparent' }}
                  onError={() => console.error('All logo files failed to load')}
                />
              )}
            </Link>
            
            {/* Location Pin + Text */}
            <Link 
              to="/locatie"
              className="flex items-center gap-2 text-[#c51421] hover:text-[#c51421]/80 transition-colors duration-200 font-medium text-sm md:text-base"
              aria-label="Locația noastră - Sector 5, București"
            >
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:block">Sector 5, București</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {menuItems.map((item, index) => (
              <div key={item.name} className="relative">
                {item.external ? (
                  <a
                    href={item.href}
                    className="text-[#1F2937] hover:text-[#8B4513] transition-colors duration-200 font-medium text-base"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="text-[#1F2937] hover:text-[#8B4513] transition-colors duration-200 font-medium text-base"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1F2937] hover:text-[#8B4513] hover:bg-white/10 transition-all duration-200"
            aria-label="Deschide meniul"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#D4AF37]/20 mt-2"
          >
            <nav className="py-4 space-y-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-[#1F2937] hover:text-[#8B4513] hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-[#1F2937] hover:text-[#8B4513] hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Location Button */}
              <Link 
                to="/locatie"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 w-full px-3 py-2 text-[#c51421] hover:text-[#c51421]/80 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                aria-label="Locația noastră - Sector 5, București"
              >
                <MapPin className="w-5 h-5" />
                <span>Sector 5, București</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;