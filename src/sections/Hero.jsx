import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useState, useEffect } from "react";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  
  const text = `// CODE THE FUTURE
Building the next generation of 
connected experiences.`;

  // --- TIMER LOGIC START ---
  const calculateTimeLeft = () => {
    // Target Date: Feb 12, 2026
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

  // Helper to add leading zero (e.g., 9 -> 09)
  const format = (num) => (num < 10 ? `0${num}` : num);
  // --- TIMER LOGIC END ---


  return (
    <section id="home" className="relative flex flex-col justify-end min-h-screen bg-line-dark overflow-hidden">
      
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Iron Man Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-100 mix-blend-overlay"
        style={{
          backgroundImage: `url("/assets/ironman.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) contrast(1.2)", 
        }}
      />
      
      {/* 2. Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-line-dark via-line-dark/80 to-transparent" />

      {/* 3. Cyber Grid */}
      <div className="absolute inset-0 z-0 bg-cyber-grid opacity-100 pointer-events-none" />

      {/* 4. Decorative Glow Spot (UPDATED TO RED) */}
      <div className="absolute top-14 right-0 w-[500px] h-[500px] bg-iron-red/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />


      {/* --- CONTENT LAYERS --- */}
      <div className="z-10 relative">
        <AnimatedHeaderSection
          subTitle={"PENTAVERSE INDIA PRESENTS"}
          title={"PENTA XION"} 
          text={text}
          textColor={"text-white"} 
          accentColor={"text-iron-red"} 
        />
      </div>

      {/* --- 2D TIMER SECTION (Bottom Left) --- */}
      <div className="absolute bottom-10 left-6 md:left-12 z-20">
        <p className="font-mono text-[10px] md:text-xs text-iron-red tracking-widest mb-2 animate-pulse">
           REGISTRATION_OPENS_IN:
        </p>
        <div className="flex items-end gap-2 md:gap-4 font-mono text-white">
           {/* Days */}
           <div className="flex flex-col items-center">
             <span className="text-3xl md:text-5xl font-bold leading-none">{format(timeLeft.d)}</span>
             <span className="text-[10px] text-gray-500 uppercase mt-1">Days</span>
           </div>
           <span className="text-2xl md:text-4xl text-iron-red/50 pb-2">:</span>
           
           {/* Hours */}
           <div className="flex flex-col items-center">
             <span className="text-3xl md:text-5xl font-bold leading-none">{format(timeLeft.h)}</span>
             <span className="text-[10px] text-gray-500 uppercase mt-1">Hrs</span>
           </div>
           <span className="text-2xl md:text-4xl text-iron-red/50 pb-2">:</span>

           {/* Minutes */}
           <div className="flex flex-col items-center">
             <span className="text-3xl md:text-5xl font-bold leading-none">{format(timeLeft.m)}</span>
             <span className="text-[10px] text-gray-500 uppercase mt-1">Mins</span>
           </div>
           <span className="text-2xl md:text-4xl text-iron-red/50 pb-2">:</span>

           {/* Seconds */}
           <div className="flex flex-col items-center">
             <span className="text-3xl md:text-5xl font-bold leading-none text-iron-red">{format(timeLeft.s)}</span>
             <span className="text-[10px] text-gray-500 uppercase mt-1">Secs</span>
           </div>
        </div>
      </div>


      {/* --- 3D SCENE --- */}
      <figure
        className="absolute inset-0 z-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.2} />
          <Float speed={0.8} rotationIntensity={1.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>

          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              {/* UPDATED LIGHTING TO IRON RED (#FF1F1F) */}
              <Lightformer form={"ring"} color="#FF1F1F" intensity={4} position={[0, 5, -9]} scale={10} />
              <Lightformer form={"rect"} color="#ffffff" intensity={1} position={[0, 3, 1]} scale={5} />
              <Lightformer form={"circle"} color="#FF1F1F" intensity={2} position={[-5, -1, -1]} scale={10} />
              <Lightformer form={"circle"} color="#111111" intensity={1} position={[10, 1, 0]} scale={16} />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;