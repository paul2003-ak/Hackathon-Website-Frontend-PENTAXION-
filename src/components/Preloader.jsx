import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Randomize speed to look like real data loading
        const jump = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + jump, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    if (progress === 100) {
      // Exit Animation: Slide up like a blast door
      const tl = gsap.timeline({
        onComplete: onComplete, // Tell App.jsx we are done
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
      })
      .to(containerRef.current, {
        yPercent: -100, // Slide up
        duration: 1,
        ease: "power4.inOut",
      });
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] text-white overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      <div ref={textRef} className="flex flex-col items-center gap-4 relative z-10">
        {/* Iron Man Reactor / Loader Circle */}
        <div className="w-16 h-16 rounded-full border-2 border-iron-red/30 flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(255,31,31,0.2)]">
            <div className="w-10 h-10 rounded-full bg-iron-red/20 shadow-[0_0_20px_#FF1F1F]" />
        </div>

        <h1 className="font-black text-4xl md:text-6xl tracking-tighter uppercase">
          PENTAXION
        </h1>
        
        <div className="flex items-center gap-4 font-mono text-sm md:text-base text-iron-red">
          <span>SYSTEM_INITIALIZING</span>
          <span className="inline-block w-12 text-right">{progress}%</span>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-iron-red shadow-[0_0_15px_#FF1F1F] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
      
      {/* Bottom Tech Text */}
      <div className="absolute bottom-10 font-mono text-xs text-white/20">
        ESTABLISHING_SECURE_CONNECTION...
      </div>
    </div>
  );
};

export default Preloader;