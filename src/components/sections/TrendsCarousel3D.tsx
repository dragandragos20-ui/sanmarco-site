import { useEffect, useMemo, useRef, useState } from 'react';
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

type CarouselItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta?: { text: string; link: string };
  isPlaceholder?: boolean;
};

const CARD_WIDTH = 600;
const CARD_HEIGHT = 400;

const TrendsCarousel3D = () => {
  const { data: trend } = useFetchData<Trend>('/data/trends.json');

  const items: CarouselItem[] = useMemo(() => {
    const first: CarouselItem | null = trend
      ? {
          id: trend.id,
          title: trend.title,
          subtitle: trend.subtitle,
          description: trend.description,
          image: trend.image,
          cta: trend.cta,
        }
      : null;

    const placeholders: CarouselItem[] = Array.from({ length: 4 }).map((_, i) => ({
      id: `coming-soon-${i + 1}`,
      title: 'Coming Soon',
      subtitle: 'În curând',
      description: 'Pregătim noi trenduri spectaculoase pentru 2025.',
      image: '/images/trends-2025.jpg',
      isPlaceholder: true,
    }));

    return first ? [first, ...placeholders] : placeholders;
  }, [trend]);

  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);

  const total = items.length;

  const next = () => setActiveIndex((idx) => (idx + 1) % total);
  const prev = () => setActiveIndex((idx) => (idx - 1 + total) % total);

  // Auto-rotate with pause on hover
  useEffect(() => {
    if (total === 0) return;
    const start = () => {
      stop();
      intervalRef.current = window.setInterval(() => {
        if (!isHoveringRef.current) {
          setActiveIndex((idx) => (idx + 1) % total);
        }
      }, 3500);
    };
    const stop = () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    start();
    return stop;
  }, [total]);

  // Click behavior: clicking front card sends it to back (next comes front)
  const handleFrontCardClick = () => {
    next();
  };

  // Positioning helpers
  const getRelativePosition = (index: number) => {
    // position of each card relative to activeIndex in range [-2, -1, 0, 1, 2] for 5 cards
    const diff = (index - activeIndex + total) % total;
    // Map to symmetrical range where 0 is front
    // For 5 items: 0, 1, 2, 3, 4 -> 0, 1, 2, -2, -1
    return diff <= Math.floor(total / 2) ? diff : diff - total;
  };

  const computeStyleForPosition = (pos: number): React.CSSProperties => {
    // pos 0 is front. Negative to left/back, positive to right/back
    const translateX = pos * 120; // px
    const translateZ = -Math.abs(pos) * 120; // depth
    const rotateY = pos * -8; // degrees
    const scale = 1 - Math.abs(pos) * 0.06;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: 10 - Math.abs(pos),
      opacity: 1 - Math.abs(pos) * 0.08,
    };
  };

  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#000]" style={{ fontFamily: 'Lora, serif' }}>
            Trenduri de Decor 2025
          </h2>
          <p className="text-[#000]/80 mt-4">Culorile calde și texturile naturale</p>
        </div>

        <div
          className="relative mx-auto"
          style={{
            perspective: 1600,
            width: CARD_WIDTH,
            maxWidth: '100%',
          }}
          onMouseEnter={() => (isHoveringRef.current = true)}
          onMouseLeave={() => (isHoveringRef.current = false)}
        >
          {/* Arrow Left */}
          <button
            aria-label="Anterior"
            onClick={prev}
            className="absolute -left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/70 hover:bg-white shadow-md border border-[#D4AF37]/40"
          >
            {/* SVG chevron left */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2F4F4F" strokeWidth="2" className="w-5 h-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Arrow Right */}
          <button
            aria-label="Următor"
            onClick={next}
            className="absolute -right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/70 hover:bg-white shadow-md border border-[#D4AF37]/40"
          >
            {/* SVG chevron right */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2F4F4F" strokeWidth="2" className="w-5 h-5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <div
            className="relative mx-auto"
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              transformStyle: 'preserve-3d',
            }}
          >
            {items.map((item, index) => {
              const pos = getRelativePosition(index);
              const isFront = pos === 0;

              return (
                <div
                  key={item.id}
                  className="absolute top-0 left-1/2 -translate-x-1/2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={computeStyleForPosition(pos)}
                >
                  <article
                    onClick={isFront ? handleFrontCardClick : undefined}
                    className="group relative overflow-hidden rounded-xl border shadow-xl cursor-pointer"
                    style={{
                      width: CARD_WIDTH,
                      maxWidth: '90vw',
                      height: CARD_HEIGHT,
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(47,79,79,0.08))',
                      borderColor: 'rgba(212,175,55,0.35)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2F4F4F]/30 via-transparent to-[#8B4513]/25" />
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#D4AF37] text-[#2F4F4F] shadow-sm">
                          {item.isPlaceholder ? '2025' : '2025 Trends'}
                        </span>
                      </div>
                      <h3 className="text-white text-2xl font-bold drop-shadow" style={{ fontFamily: 'Lora, serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-sm">{item.subtitle}</p>
                      {!item.isPlaceholder ? (
                        <div className="mt-3 flex items-center gap-3">
                          {item.cta && (
                            <a
                              href={item.cta.link}
                              className="inline-flex items-center gap-2 bg-[#c51421] hover:bg-[#c51421]/90 text-white text-sm font-semibold px-4 py-2 rounded-md"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.cta.text}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                              </svg>
                            </a>
                          )}
                          <button
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFrontCardClick();
                            }}
                          >
                            Următorul
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                              <path d="M9 6l6 6-6 6" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="mt-3">
                          <span className="text-white/90 text-sm">Rămâi aproape pentru noutăți.</span>
                        </div>
                      )}
                    </div>

                    {/* subtle monitor bevel */}
                    <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.25), inset 0 0 40px rgba(0,0,0,0.35)' }} />
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendsCarousel3D;





