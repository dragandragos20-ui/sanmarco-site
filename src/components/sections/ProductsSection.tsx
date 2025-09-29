import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useFetchData } from '../../hooks/useFetchData';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  featured: boolean;
  rating: number;
  inStock: boolean;
  link: string;
}

const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  }, [updateScrollButtons]);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  }, [updateScrollButtons]);
  
  const { data: products, isLoading, error } = useFetchData<Product[]>('/data/products_featured.json');
  const featuredProducts = products?.filter(product => product.featured) || [];

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-red-600">Eroare la încărcarea produselor: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white" ref={ref}>
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
            Produse Recomandate
          </h2>
          <p className="text-xl text-[#000] max-w-3xl mx-auto leading-relaxed">
            Cele mai apreciate produse San Marco, selectate pentru calitatea și performanța excepțională
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex gap-6 overflow-x-auto pb-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex-none w-80 bg-gray-100 rounded-lg shadow-sm animate-pulse">
                <div className="w-full h-64 bg-gray-200 rounded-t-lg" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Arrows și Products Horizontal Slider */}
        {featuredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full transition-all duration-200 ${canScrollLeft ? 'opacity-100 hover:bg-gray-50' : 'opacity-30 cursor-not-allowed'}`}
              disabled={!canScrollLeft}
              aria-label="Scroll produse la stânga"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full transition-all duration-200 ${canScrollRight ? 'opacity-100 hover:bg-gray-50' : 'opacity-30 cursor-not-allowed'}`}
              disabled={!canScrollRight}
              aria-label="Scroll produse la dreapta"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-800" />
            </button>

            <div
              className="overflow-x-auto pb-4"
              style={{ scrollSnapType: 'x mandatory' }}
              ref={scrollContainerRef}
              onScroll={updateScrollButtons}
            >
              <div className="flex gap-6 min-w-max">
                {featuredProducts.map((product) => (
                <a
                  key={product.id}
                  href={product.link}
                  className="flex-none w-80 group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden group">
                    <img
                      src={product.image}
                      alt={
                        product.id === 'cadoro-gold' ? 'Cadoro Gold efect metalic auriu finisaje interioare București' :
                        product.id === 'marmorino-classico' ? 'Marmorino Classico tencuială venețiană autentică Sector 5' :
                        product.id === 'marcopolo-luxury' ? 'Marcopolo Luxury vopsea decorativă cu efect textură București' :
                        product.id === 'glittery' ? 'Glittery cristale argint gel finisaj premium San Marco' :
                        product.id === 'cadoro-velvet' ? 'Cadoro Velvet efect catifelat finisaje decorative Sector 5' :
                        `${product.name} finisaj decorativ San Marco Sector 5 București`
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Overlay cu "EXPLOREAZĂ" la hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-xl tracking-wide">
                        EXPLOREAZĂ
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#8B4513] text-white rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="p-6">
                    <h3 
                      className="text-xl font-semibold text-[#000] mb-2 group-hover:text-[#8B4513] transition-colors duration-200"
                      style={{ fontFamily: 'Lora, serif' }}
                    >
                      {product.name}
                    </h3>
                    
                    <p className="text-[#000]/70 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;