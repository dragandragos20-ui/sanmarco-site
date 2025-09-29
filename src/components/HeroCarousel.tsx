import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

/* SCHEMA hero_slides.json:
   [{ "slug": "slide-1",
      "media": { "type":"image|video", "url":"..." },
      "heading_primary": "San Marco",
      "heading_secondary": "Arta culorilor italiene",
      "category_label": "Decorative",
      "target_url": "/san-marco-arta-culorilor.html"
   }, ...]
*/

interface SlideData {
  slug: string;
  media: {
    type: 'image' | 'video';
    url: string;
  };
  heading_primary: string;
  heading_secondary: string;
  category_label: string;
  target_url: string;
}

const HeroCarousel = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // [HOOK:DATA_HERO_IMPORT] – aici import/adaugă utilitarul de citire JSON/JSONL
  const fetchSlides = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // [HOOK:DATA_HERO_FETCH] – aici facem fetch('/data/hero_slides.json') și populăm sliderul
      const response = await fetch('/data/hero_slides.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSlides(data);
    } catch (err) {
      console.error('Error fetching slides:', err);
      setError('Nu s-au putut încărca slide-urile');
    } finally {
      setLoading(false);
    }
  }, []);

  // [HOOK:DATA_HERO_AUTOPLAY] – aici se controlează autoplay standard
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    emblaApi.plugins()?.autoplay?.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    emblaApi.plugins()?.autoplay?.reset();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi || typeof emblaApi.selectedScrollSnap !== 'function') return;
    try {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    } catch (error) {
      console.warn('OnSelect error:', error);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  // Keyboard navigation
  useEffect(() => {
    if (!emblaApi) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        emblaApi.scrollPrev();
        emblaApi.plugins()?.autoplay?.reset();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        emblaApi.scrollNext();
        emblaApi.plugins()?.autoplay?.reset();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const plugin = emblaApi.plugins()?.autoplay;
    if (!plugin) return;
    const root = emblaApi.rootNode();
    const onEnter = () => plugin.stop();
    const onLeave = () => plugin.play();
    root.addEventListener('mouseenter', onEnter);
    root.addEventListener('mouseleave', onLeave);
    return () => {
      root.removeEventListener('mouseenter', onEnter);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [emblaApi]);

  // Handle slide click
  const handleSlideClick = (targetUrl: string) => {
    window.location.href = targetUrl;
  };

  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 font-light"
          >
            Se încarcă experiența...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (error || slides.length === 0) {
    return (
      <div className="min-h-[85vh] md:min-h-[85vh] lg:min-h-[85vh] flex items-center justify-center bg-gray-100">
        <div className="text-lg text-red-600">{error || 'Nu au fost găsite slide-uri'}</div>
      </div>
    );
  }

  return (
    <section 
      className="relative min-h-[70vh] md:min-h-[85vh] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {/* [HOOK:DATA_HERO_MAP] – aici mapăm array-ul de slide-uri la UI simplu */}
          {slides.map((slide, index) => (
            <div key={slide.slug} className="embla__slide flex-[0_0_100%] relative">
              <div 
                className="relative w-full h-[70vh] md:h-[85vh] cursor-pointer group"
                onClick={() => handleSlideClick(slide.target_url)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSlideClick(slide.target_url);
                  }
                }}
                aria-label={`Accesează ${slide.heading_primary} - ${slide.heading_secondary}`}
              >
                {/* Imagini și video-uri simple - fără motion */}
                {slide.media.type === 'image' ? (
                  <img
                    src={slide.media.url}
                    alt={`${slide.heading_primary} - ${slide.heading_secondary}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                ) : (
                  <video
                    src={slide.media.url}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
                
                {/* Overlay static */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                
                {/* Content simplu cu animație minimă */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-20"
                >
                  <div className="max-w-2xl">
                    {/* Category Chip simplu */}
                    <div className="inline-flex items-center px-4 py-2 mb-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                      <span className="text-sm md:text-base font-medium text-white tracking-wide">
                        {slide.category_label}
                      </span>
                    </div>
                    
                    {/* Main Heading simplu */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-4 tracking-tight">
                      {slide.heading_primary}
                    </h1>
                    
                    {/* Subheading simplu */}
                    <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed">
                      {slide.heading_secondary}
                    </p>
                  </div>
                </motion.div>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls simple */}
      <div className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-30">
        <button
          onClick={scrollPrev}
          className="p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 z-30"
          aria-label="Slide anterior"
          type="button"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-30">
        <button
          onClick={scrollNext}
          className="p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 z-30"
          aria-label="Slide următor"
          type="button"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Slide Index simplu */}
      <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 z-30">
        <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <span className="text-white font-medium text-sm md:text-base">
            {String(currentIndex + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
      
      {/* Screen Reader Only - Current Slide Info */}
      <div className="sr-only" aria-live="polite">
        Slide-ul curent: {slides[currentIndex]?.heading_primary} - {slides[currentIndex]?.heading_secondary}
      </div>
    </section>
  );
};

export default HeroCarousel;