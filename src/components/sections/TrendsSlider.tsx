import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useFetchData } from '../../hooks/useFetchData';

interface Trend {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  cta: { text: string; link: string };
}

type Slide = {
  id: string;
  image: string;
  label: string;
  titleOverlay?: string;
  rightTitle?: string;
  rightText?: string;
  cta?: { text: string; link: string };
};

const TrendsSlider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: trend } = useFetchData<Trend>('/data/trends.json');

  const slides: Slide[] = useMemo(() => {
    const strategicSlides: Slide[] = [
      {
        id: 'sector5-tradition',
        image: trend?.image || '/images/trends-2025.jpg',
        label: '01',
        titleOverlay: 'Tradiție Italiană, Calitate Locală',
        rightTitle: 'De ce Sector 5 alege San Marco',
        rightText: '80+ ani de experiență din Veneția, adaptat pentru exigențele bucureștenilor din Sector 5. Finisaje premium cu consultanță gratuită inclusă.',
        cta: { text: 'Descoperă showroom-ul din zona ta', link: '/locatie' },
      },
      {
        id: 'architect-consultation',
        image: '/images/trends-2025.jpg',
        label: '02',
        titleOverlay: 'Transformă viziunea în realitate',
        rightTitle: 'Consultanță Gratuită cu Arhitectul',
        rightText: 'Arhitect San Marco disponibil pentru vizite la domiciliu în Sector 5. Design personalizat și aplicare profesională garantată.',
        cta: { text: 'Programează consultația gratuită', link: '/contact' },
      },
      {
        id: 'premium-effects',
        image: '/images/trends-2025.jpg',
        label: '03',
        titleOverlay: 'Efecte Premium pentru Casa Ta',
        rightTitle: 'MarcoPolo Luxury & Stucco Veneziano',
        rightText: 'Finisaje distinctive italiene: MarcoPolo Luxury cu efect metalic și Stucco Veneziano autentic. Vezi diferența calității.',
        cta: { text: 'Vezi efectele live în showroom', link: '/locatie' },
      },
      {
        id: '80-years-experience',
        image: '/images/trends-2025.jpg',
        label: '04',
        titleOverlay: 'De la Veneția la Sectorul 5',
        rightTitle: '80+ Ani Experiență',
        rightText: 'Importator direct oficial San Marco Italia. Tradițe autentice, tehnologii moderne, rezultate de excepție.',
        cta: { text: 'Citește povestea calității San Marco', link: '/contact' },
      },
      {
        id: '10-year-warranty',
        image: '/images/trends-2025.jpg',
        label: '05',
        titleOverlay: 'Investiția ta, protejată',
        rightTitle: 'Garanție 10 Ani',
        rightText: 'Garanție extinsă 10 ani + aplicare doar cu meșteri certificați San Marco. Investiție sigură pe termen lung.',
        cta: { text: 'Solicită devis pentru proiectul tău', link: '/contact' },
      },
    ];

    return strategicSlides;
  }, [trend]);

  const [index, setIndex] = useState(0);
  const total = slides.length;
  const timerRef = useRef<number | null>(null);
  const isHoverRef = useRef(false);

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (total === 0) return;
    const start = () => {
      stop();
      timerRef.current = window.setInterval(() => {
        if (!isHoverRef.current) next();
      }, 4500);
    };
    const stop = () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
    start();
    return stop;
  }, [total]);

  return (
    <section className="min-h-[clamp(560px,58vh,640px)] py-12 md:py-16 bg-white" ref={ref}>
      <div className="w-[min(1400px,calc(100vw-4rem))] mx-auto px-6 md:px-8">
        {/* Main Content - header removed; layout centered and left-aligned elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => (isHoverRef.current = true)}
          onMouseLeave={() => (isHoverRef.current = false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Unified Slide Container - all elements change together */}
            {slides.map((slide, slideIndex) => (
              <motion.div
                key={slide.id}
                className={`col-span-1 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${
                  slideIndex === index ? 'block' : 'hidden'
                }`}
                initial={{ opacity: 0, x: slideIndex > index ? 50 : -50 }}
                animate={{ 
                  opacity: slideIndex === index ? 1 : 0,
                  x: slideIndex === index ? 0 : slideIndex > index ? 50 : -50
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Left Image - large card */}
                <div className="col-span-1 lg:col-span-9 justify-self-center lg:justify-self-end w-full max-w-[min(1280px,calc(100vw-2rem))] lg:max-w-[min(1280px,calc(100vw-6rem))]">
                  <div id="trend-card" className="relative overflow-hidden rounded-2xl shadow-xl mx-auto w-full h-[400px] sm:h-[450px] lg:h-[500px] min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
                    <img
                      src={slide.image}
                      alt={
                        slideIndex === 0 ? 'Finisaje decorative premium San Marco showroom Sector 5 București' :
                        slideIndex === 1 ? 'Arhitect consultanță gratuită domiciliu Sector 5 București' :
                        slideIndex === 2 ? 'Marcopolo Luxury vopsea decorativă showroom București' :
                        slideIndex === 3 ? 'Cadoro Gold efect metalic San Marco Calea Ferentari' :
                        slideIndex === 4 ? 'Garanție 10 ani aplicare finisaje decorative Sector 5' :
                        'Finisaje decorative San Marco Sector 5 București'
                      }
                      className="w-full h-full object-cover object-center"
                      style={{ objectPosition: '55% 50%' }}
                    />
                    
                    {/* Sophisticated overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10" />
                    
                    {/* Title overlay - positioned like reference */}
                    <div className="absolute inset-x-0 bottom-4 md:bottom-6 z-10 px-4 md:px-6">
                      <div 
                        className="text-white font-bold leading-tight"
                        style={{ 
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          whiteSpace: 'normal',
                          wordBreak: 'keep-all'
                        }}
                      >
                        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                          {slideIndex === 0 ? 'San Marco Sector 5 - Finisaje Decorative Premium București' : slide.titleOverlay}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel - left-aligned content */}
                <div className="col-span-1 lg:col-span-3 self-center h-full mt-6 lg:mt-0">
                  {/* Centered content group aligned to card midpoint */}
                  <div className="h-full flex flex-col justify-center items-start gap-6">
                    {/* Navigation - left aligned */}
                    <div className="flex items-center gap-8">
                      <motion.button
                        aria-label="Anterior"
                        onClick={prev}
                        className="text-[#0F172A] hover:text-[#0F172A]/70 transition-all duration-200 p-2 hover:bg-gray-100 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </motion.button>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-[#0F172A]">{String(slideIndex + 1).padStart(2, '0')}</span>
                        <span className="text-[#0F172A]/60 text-lg">/{String(total).padStart(2, '0')}</span>
                      </div>
                      
                      <motion.button
                        aria-label="Următor"
                        onClick={next}
                        className="text-[#0F172A] hover:text-[#0F172A]/70 transition-all duration-200 p-2 hover:bg-gray-100 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Content - left aligned */}
                    <p className="text-[#0F172A] leading-relaxed text-sm sm:text-base max-w-[700px]">
                      {slide.rightText}
                    </p>

                    {/* CTA - left aligned */}
                    <div>
                      {slide.cta && (
                        <a
                          href={slide.cta.link}
                          className="btn-primary same-width"
                        >
                          <span>{slide.cta.text}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendsSlider;


