import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { useFetchData } from '../../hooks/useFetchData';

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  featured: boolean;
}

const CategoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // [HOOK:DATA_CATEGORIES_IMPORT] – aici import/adaugă utilitarul de citire JSON
  // [HOOK:DATA_CATEGORIES_FETCH] – aici facem fetch('/data/categories.json')
  const { data: categories, isLoading, error } = useFetchData<Category[]>('/data/categories.json');

  const updateScrollButtons = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  }, [updateScrollButtons]);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  }, [updateScrollButtons]);

  if (error) {
    return (
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-red-600">Eroare la încărcarea categoriilor: {error.message}</p>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-[#F9FAFB]" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#000] mb-6"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Categorii Principale
          </h2>
          <p className="text-xl text-[#000] max-w-3xl mx-auto leading-relaxed">
            Descoperă gama completă de soluții San Marco pentru toate nevoile tale de finisare și decorare
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm animate-pulse">
                <div className="w-full h-64 bg-gray-200 rounded-t-lg" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3" />
                  <div className="h-4 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Categories - Mobile Slider + Desktop Grid */}
        {categories && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Mobile Slider (≤768px) */}
            <div className="md:hidden relative">
              {/* Navigation Arrows */}
              <button
                onClick={scrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full transition-all duration-200 ${canScrollLeft ? 'opacity-100 hover:bg-gray-50' : 'opacity-30 cursor-not-allowed'}`}
                disabled={!canScrollLeft}
                aria-label="Scroll categorii la stânga"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={scrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full transition-all duration-200 ${canScrollRight ? 'opacity-100 hover:bg-gray-50' : 'opacity-30 cursor-not-allowed'}`}
                disabled={!canScrollRight}
                aria-label="Scroll categorii la dreapta"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div
                className="overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollSnapType: 'x mandatory' }}
                ref={scrollContainerRef}
                onScroll={updateScrollButtons}
              >
                <div className="flex gap-4 min-w-max">
                  {categories.filter(cat => cat.featured).map((category) => (
                    <motion.div
                      key={category.id}
                      variants={cardVariants}
                      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer shrink-0 w-[85vw] max-w-[360px]"
                      style={{ scrollSnapAlign: 'start' }}
                      onClick={() => window.location.href = category.link}
                      whileHover={{ y: -5 }}
                    >
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        <motion.img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          loading="lazy"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Hover Content */}
                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <p className="text-sm font-medium">
                            Vezi produsele »
                          </p>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <h3 
                          className="text-xl font-semibold text-[#000] mb-3 group-hover:text-[#8B4513] transition-colors duration-200"
                          style={{ fontFamily: 'Lora, serif' }}
                        >
                          {category.title}
                        </h3>
                        <p className="text-[#000]/70 text-sm leading-relaxed">
                          {category.description}
                        </p>
                        
                        {/* Arrow Indicator */}
                        <div className="mt-4 flex items-center text-[#8B4513] text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                          <span>Explorează</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Grid (≥768px) */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.filter(cat => cat.featured).map((category) => (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => window.location.href = category.link}
                  whileHover={{ y: -5 }}
                >
                  {/* Image Container with Parallax Effect */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Content */}
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-sm font-medium">
                        Vezi produsele »
                      </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 
                      className="text-xl font-semibold text-[#000] mb-3 group-hover:text-[#8B4513] transition-colors duration-200"
                      style={{ fontFamily: 'Lora, serif' }}
                    >
                      {category.title}
                    </h3>
                    <p className="text-[#000]/70 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Arrow Indicator */}
                    <div className="mt-4 flex items-center text-[#8B4513] text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      <span>Explorează</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;