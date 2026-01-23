import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PHASES = [
  "SYSTEM_CHECK...",
  "CALIBRATING_CORE...",
  "ESTABLISHING_SECURE_UPLINK...",
  "LOADING_ASSETS...",
  "PROTOCOL_PENTAXION_ENGAGED"
];

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const ringsRef = useRef(null);
  const titleRef = useRef(null);

  // --- 1. OPTIMIZED PROGRESS LOGIC ---
  useEffect(() => {
    // Safety Fallback: Force finish after 2.5 seconds max if page lags
    const safetyTimer = setTimeout(() => {
        setProgress(100);
    }, 2500);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        
        // FASTER: Random jump between 3% and 10%
        const jump = Math.floor(Math.random() * 8) + 3; 
        const next = Math.min(prev + jump, 100);

        // Update Text Phase
        if (next < 30) setPhaseIndex(0);
        else if (next < 50) setPhaseIndex(1);
        else if (next < 70) setPhaseIndex(2);
        else if (next < 90) setPhaseIndex(3);
        else setPhaseIndex(4);

        return next;
      });
    }, 30); // FASTER: Updates every 30ms

    return () => {
        clearInterval(timer);
        clearTimeout(safetyTimer);
    };
  }, []);

  // --- 2. ANIMATIONS ---
  useGSAP(() => {
    // A. Constant Idle Animations
    gsap.to(".ring-outer", { 
      rotation: 360, 
      duration: 8, 
      repeat: -1, 
      ease: "linear" 
    });
    gsap.to(".ring-inner", { 
      rotation: -360, 
      duration: 4, 
      repeat: -1, 
      ease: "linear" 
    });

    // B. Glitch Text Intro
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";
    const originalText = "PENTAXION";
    let iterations = 0;
    
    const interval = setInterval(() => {
        if (!titleRef.current) return;
        titleRef.current.innerText = originalText
        .split("")
        .map((letter, index) => {
            if (index < iterations) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
        
        if (iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 2; // Faster text decode
    }, 40);


    // C. Exit Sequence
    if (progress === 100) {
      clearInterval(interval); // Clean up text glitch
      
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      tl.to(contentRef.current, {
        scale: 1.1,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power2.in"
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut",
      });
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020202] text-white overflow-hidden"
    >
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-iron-red/5 to-transparent opacity-50" />

      {/* Main Content Wrapper */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center gap-8">
        
        {/* --- ARC REACTOR LOADER --- */}
        <div ref={ringsRef} className="relative w-32 h-32 flex items-center justify-center">
            <div className="ring-outer absolute inset-0 border border-dashed border-iron-red/40 rounded-full w-full h-full shadow-[0_0_30px_rgba(255,31,31,0.1)]" />
            <div className="ring-inner absolute inset-2 border-2 border-l-transparent border-r-transparent border-t-iron-red border-b-iron-red rounded-full w-[85%] h-[85%] m-auto" />
            
            <div className="absolute w-12 h-12 bg-iron-red rounded-full animate-pulse shadow-[0_0_40px_#FF1F1F] flex items-center justify-center">
                <div className="w-8 h-8 bg-white/80 rounded-full blur-[2px]" />
            </div>
        </div>

        {/* --- TEXT INFO --- */}
        <div className="text-center space-y-2">
            <h1 ref={titleRef} className="text-5xl md:text-7xl font-black tracking-tighter text-white font-mono">
                PENTAXION
            </h1>
            
            <div className="flex flex-col items-center gap-2 font-mono text-xs md:text-sm text-iron-red tracking-widest">
                <span className="opacity-80">
                    [{PHASES[phaseIndex]}]
                </span>
                <span className="text-xl font-bold text-white">
                    {progress < 10 ? `0${progress}` : progress}%
                </span>
            </div>
        </div>

        {/* --- PROGRESS BAR --- */}
        <div className="w-64 md:w-96 h-2 bg-white/5 rounded-none border border-white/10 relative overflow-hidden mt-4">
            <div 
                className="h-full bg-iron-red shadow-[0_0_20px_#FF1F1F] transition-all duration-100 ease-linear relative"
                style={{ width: `${progress}%` }}
            >
                <div className="absolute right-0 top-0 h-full w-2 bg-white blur-[2px]" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:4px_100%] opacity-30 pointer-events-none" />
        </div>

      </div>

      <div className="absolute bottom-12 font-mono text-[10px] text-white/30 tracking-[0.2em]">
         ID: STARK_IND_V.2.0.4 // SECURE_BOOT
      </div>
    </div>
  );
};

export default Preloader;