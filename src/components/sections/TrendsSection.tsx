import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useFetchData } from '../../hooks/useFetchData';

interface Trend {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  cta: {
    text: string;
    link: string;
  };
}

const TrendsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // [HOOK:DATA_TRENDS_IMPORT] – aici import/adaugă utilitarul de citire JSON
  // [HOOK:DATA_TRENDS_FETCH] – aici facem fetch('/data/trends.json')
  const { data: trend, isLoading, error } = useFetchData<Trend>('/data/trends.json');

  if (error) {
    return (
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-red-600">Eroare la încărcarea trendurilor: {error.message}</p>
        </div>
      </section>
    );
  }

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
            Trenduri de Decor
          </h2>
          <p className="text-xl text-[#000] max-w-3xl mx-auto leading-relaxed">
            Inspiră-te din cele mai recente tendințe în domeniul designului interior și al finisajelor decorative
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm animate-pulse">
              <div className="relative h-96 bg-gray-200 rounded-t-2xl" />
              <div className="p-8">
                <div className="h-8 bg-gray-200 rounded mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-6" />
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trend Card */}
        {trend && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            {/* [HOOK:DATA_TRENDS_MAP] – aici mapăm trendul principal */}
            <div 
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl"
              style={{
                background: 'rgba(47, 79, 79, 0.15)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)'
                }}
                whileHover={{ scale: 1.02 }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Image Section */}
                <div className="lg:col-span-2 relative h-96 lg:h-auto overflow-hidden">
                  <img
                    src={trend.image}
                    alt={trend.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/20 via-transparent to-[#2F4F4F]/20" />
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-[#D4AF37] text-[#2F4F4F] rounded-full text-sm font-semibold">
                      2025 Trends
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <h3 
                      className="text-3xl lg:text-4xl font-bold text-[#8B4513] mb-3"
                      style={{ fontFamily: 'Lora, serif' }}
                    >
                      {trend.title}
                    </h3>
                    
                    <h4 className="text-xl text-[#000] mb-6 font-medium">
                      {trend.subtitle}
                    </h4>
                    
                    <p className="text-[#000]/80 leading-relaxed mb-8">
                      {trend.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-3 mb-8">
                      {trend.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-[#c51421] rounded-full flex-shrink-0" />
                          <span className="text-[#000] text-sm font-medium">
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button - Vertical Alignment */}
                  <div className="flex flex-col items-start">
                    <motion.a
                      href={trend.cta.link}
                      className="group/cta inline-flex items-center space-x-3 bg-[#c51421] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#c51421]/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c51421]/50 focus:ring-offset-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{trend.cta.text}</span>
                      <ArrowRightIcon className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform duration-200" />
                    </motion.a>
                    
                    <motion.div
                      className="mt-6 text-center"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed'
                      }}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <span className="text-[#1F2937]/60 text-sm font-medium tracking-wide">
                        INSPIRAȚIE 2025
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TrendsSection;