import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SectionSeparator = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-center">
          {/* Left line */}
          <div className="flex-1 h-px bg-gray-200"></div>
          
          {/* Center content */}
          <div className="flex flex-col items-center gap-3 px-8">
            <Link 
              to="/contact"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/assets/images/sanmarco-logo.png" 
                alt="San Marco - Vopsele și finisaje decorative premium"
                className="h-8 md:h-10 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            
            <Link 
              to="/locatie"
              className="text-[#c51421] hover:text-[#b1121d] transition-colors duration-200 text-sm md:text-base font-medium"
            >
              Sector 5, București
            </Link>
          </div>
          
          {/* Right line */}
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
      </div>
    </section>
  );
};

export default SectionSeparator;

