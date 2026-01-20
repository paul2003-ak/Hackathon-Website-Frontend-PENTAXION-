import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import HackerText from "../components/HackerText"; 
import { useState, useEffect } from "react";

const Hero = () => {
  // Mobile check for logic
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
    <section id="home" className="relative flex flex-col justify-end min-h-screen bg-line-dark overflow-hidden">
      
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


      {/* Content Layers */}
      <div className="z-10 relative pb-32 md:pb-0">
        <div className="w-full">
           <div className="flex flex-col justify-center gap-6 pt-16 sm:gap-8 px-10">
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

        <div className="relative px-10 mt-12 text-white">
            <div className="absolute inset-x-0 border-t border-iron-red/50" />
            <div className="py-8 sm:py-12 text-end">
                <p className="font-mono leading-relaxed value-text-responsive text-white whitespace-pre-line">
                    {text}
                </p>
            </div>
        </div>
      </div>

      {/* Timer Section */}
      <div className="absolute bottom-10 left-6 md:left-12 z-20">
        <p className="font-mono text-[10px] md:text-xs text-iron-red tracking-widest mb-2 animate-pulse">
           REGISTRATION_OPENS_IN:
        </p>
        <div className="flex items-end gap-2 md:gap-4 font-mono text-white">
           <div className="flex flex-col items-center">
             <span className="text-3xl md:text-5xl font-bold leading-none">{format(timeLeft.d)}</span>
             <span className="text-[10px] text-gray-500 uppercase mt-1">Days</span>
           </div>
           <span className="text-2xl md:text-4xl text-iron-red/50 pb-2">:</span>
           <div className="flex flex-col items-center">
             <span className="text-3xl md:text-5xl font-bold leading-none">{format(timeLeft.h)}</span>
             <span className="text-[10px] text-gray-500 uppercase mt-1">Hrs</span>
           </div>
           <span className="text-2xl md:text-4xl text-iron-red/50 pb-2">:</span>
           <div className="flex flex-col items-center">
             <span className="text-3xl md:text-5xl font-bold leading-none">{format(timeLeft.m)}</span>
             <span className="text-[10px] text-gray-500 uppercase mt-1">Mins</span>
           </div>
           <span className="text-2xl md:text-4xl text-iron-red/50 pb-2">:</span>
           <div className="flex flex-col items-center">
             <span className="text-3xl md:text-5xl font-bold leading-none text-iron-red">{format(timeLeft.s)}</span>
             <span className="text-[10px] text-gray-500 uppercase mt-1">Secs</span>
           </div>
        </div>
      </div>


      {/* --- 3D SCENE OPTIMIZED --- */}
      <figure
        className="absolute inset-0 z-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows={!isMobile} // Disable shadows on mobile
          // OPTIMIZATION: Cap pixel ratio. Desktop gets max 2, Mobile gets max 1.5
          dpr={isMobile ? [1, 1.5] : [1, 2]} 
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          gl={{ antialias: !isMobile }} // Disable antialias on mobile for speed
        >
          <ambientLight intensity={0.2} />
          
          {/* Slower float speed on mobile to save calculations */}
          <Float speed={isMobile ? 0.5 : 0.8} rotationIntensity={1.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>

          {/* Lower resolution Environment for mobile */}
          <Environment resolution={isMobile ? 64 : 256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form={"ring"} color="#FF1F1F" intensity={4} position={[0, 5, -9]} scale={10} />
              <Lightformer form={"rect"} color="#ffffff" intensity={1} position={[0, 3, 1]} scale={5} />
              {/* Hide extra lights on mobile to reduce lag */}
              {!isMobile && (
                <>
                  <Lightformer form={"circle"} color="#FF1F1F" intensity={2} position={[-5, -1, -1]} scale={10} />
                  <Lightformer form={"circle"} color="#111111" intensity={1} position={[10, 1, 0]} scale={16} />
                </>
              )}
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;