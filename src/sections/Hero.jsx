import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import HackerText from "../components/HackerText"; 
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  
  const text = `// CODE THE FUTURE
Building the next generation of 
connected experiences.`;

  // --- TIMER LOGIC ---
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-02-12T00:00:00") - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { d: 0, h: 0, m: 0, s: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num) => (num < 10 ? `0${num}` : num);

  return (
    <section id="home" className="relative flex flex-col justify-center min-h-screen bg-line-dark overflow-hidden pt-20 pb-10">
      
      {/* Background Layers */}
      <div 
        className="absolute inset-0 z-0 opacity-100 mix-blend-overlay"
        style={{
          backgroundImage: `url("/assets/ironman.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) contrast(1.2)", 
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-line-dark via-line-dark/80 to-transparent" />
      <div className="absolute inset-0 z-0 bg-cyber-grid opacity-100 pointer-events-none" />
      <div className="absolute top-14 right-0 w-[500px] h-[500px] bg-iron-red/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      {/* --- MAIN TITLE (Center/Left Flow) --- */}
      <div className="z-10 relative w-full h-full flex flex-col justify-center pointer-events-none">
        <div className="w-full px-6 md:px-10">
           <div className="flex flex-col justify-center gap-6 sm:gap-8">
              <div className="flex items-center gap-4">
                  <span className="h-[2px] w-8 bg-iron-red inline-block shadow-[0_0_10px_#FF1F1F]"></span>
                  <p className="text-sm md:text-base font-mono font-bold tracking-[0.3rem] uppercase text-iron-red">
                      PENTAVERSE INDIA PRESENTS
                  </p>
              </div>

              <div>
                <h1 className="flex flex-col uppercase banner-text-responsive text-white">
                  <span className="leading-[0.85] relative z-10">
                     <HackerText text="PENTA" />
                  </span>
                  <span className="leading-[0.85] text-stroke-red text-glow">
                     <HackerText text="XION" />
                  </span>
                </h1>
              </div>
           </div>
        </div>
      </div>

      {/* --- DESCRIPTION & BUTTONS (Positioned as requested) --- */}
      <div className="absolute z-20 flex flex-col items-end text-right
        /* Mobile: Bottom-right, beside timer, smaller text */
        bottom-24 right-6 w-[50%] 
        /* Desktop: Bottom-right corner, standard size */
        md:bottom-12 md:right-12 md:w-auto md:max-w-xl"
      >
          <div className="py-2 md:py-4 md:border-r-2 md:pr-6 md:border-iron-red/50 bg-gradient-to-l from-black/60 to-transparent rounded-l-lg backdrop-blur-sm">
              <p className="font-mono leading-relaxed text-white whitespace-pre-line mb-4 md:mb-6
                text-[10px] md:text-base" /* Smaller text on mobile */
              >
                  {text}
              </p>
              
              {/* BUTTONS */}
              <div className="flex flex-col gap-3 items-end">
                  <a 
                    href="/assets/brochure.pdf"
                    download="Pentaverse_Brochure.pdf"
                    target="_blank" 
                    className="flex items-center justify-center gap-2 bg-iron-red text-black font-bold font-mono uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_#FF1F1F] transition-all skew-x-[-10deg]
                      px-4 py-2 text-[10px] /* Mobile button size */
                      md:px-6 md:py-3 md:text-sm" /* Desktop button size */
                  >
                      <Icon icon="lucide:download" className="skew-x-[10deg]" />
                      <span className="skew-x-[10deg]">Download Brochure</span>
                  </a>

                  <button className="border border-white/20 text-white font-mono uppercase tracking-wider hover:border-iron-red hover:text-iron-red transition-all skew-x-[-10deg]
                      px-4 py-2 text-[10px] /* Mobile button size */
                      md:px-6 md:py-3 md:text-sm" /* Desktop button size */
                  >
                      <span className="skew-x-[10deg]">Register Now</span>
                  </button>
              </div>
          </div>
      </div>

      {/* --- TIMER SECTION (Fixed Left) --- */}
      <div className="absolute bottom-10 left-6 md:left-12 z-20">
        <p className="font-mono text-[10px] md:text-xs text-iron-red tracking-widest mb-2 animate-pulse">
           REGISTRATION_OPENS_IN:
        </p>
        <div className="flex items-end gap-2 md:gap-4 font-mono text-white">
           <div className="flex flex-col items-center">
             <span className="text-2xl md:text-5xl font-bold leading-none">{format(timeLeft.d)}</span>
             <span className="text-[8px] md:text-[10px] text-gray-500 uppercase mt-1">Days</span>
           </div>
           <span className="text-xl md:text-4xl text-iron-red/50 pb-2">:</span>
           <div className="flex flex-col items-center">
             <span className="text-2xl md:text-5xl font-bold leading-none">{format(timeLeft.h)}</span>
             <span className="text-[8px] md:text-[10px] text-gray-500 uppercase mt-1">Hrs</span>
           </div>
           <span className="text-xl md:text-4xl text-iron-red/50 pb-2">:</span>
           <div className="flex flex-col items-center">
             <span className="text-2xl md:text-5xl font-bold leading-none">{format(timeLeft.m)}</span>
             <span className="text-[8px] md:text-[10px] text-gray-500 uppercase mt-1">Mins</span>
           </div>
           <span className="text-xl md:text-4xl text-iron-red/50 pb-2">:</span>
           <div className="flex flex-col items-center">
             <span className="text-2xl md:text-5xl font-bold leading-none text-iron-red">{format(timeLeft.s)}</span>
             <span className="text-[8px] md:text-[10px] text-gray-500 uppercase mt-1">Secs</span>
           </div>
        </div>
      </div>

      {/* --- 3D SCENE --- */}
      <figure className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          shadows={!isMobile} 
          dpr={isMobile ? [1, 1.5] : [1, 2]} 
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          gl={{ antialias: !isMobile }} 
        >
          <ambientLight intensity={0.2} />
          
          <Float speed={isMobile ? 0.5 : 0.8} rotationIntensity={1.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>

          <Environment resolution={isMobile ? 64 : 256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form={"ring"} color="#FF1F1F" intensity={4} position={[0, 5, -9]} scale={10} />
              {!isMobile && (
                  <Lightformer form={"circle"} color="#FF1F1F" intensity={2} position={[-5, -1, -1]} scale={10} />
              )}
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;