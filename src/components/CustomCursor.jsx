import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    // Ultra-fast GSAP setters
    const xMoveCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const yMoveCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3.out" });
    
    const xMoveDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.02, ease: "power3.out" });
    const yMoveDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.02, ease: "power3.out" });

    const onMouseMove = (e) => {
      xMoveCursor(e.clientX);
      yMoveCursor(e.clientY);
      xMoveDot(e.clientX);
      yMoveDot(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true }); // passive: true helps scrolling performance

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    // REMOVED mix-blend-difference. It destroys performance over 3D canvases.
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      
      {/* Main Outer Ring */}
      <div
        ref={cursorRef}
        className="absolute left-0 top-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-iron-red/80 flex items-center justify-center"
        // Force GPU rendering
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* Radar Crosshair marks */}
        <div className="absolute top-[-4px] w-[1px] h-2 bg-iron-red" />
        <div className="absolute bottom-[-4px] w-[1px] h-2 bg-iron-red" />
        <div className="absolute left-[-4px] w-2 h-[1px] bg-iron-red" />
        <div className="absolute right-[-4px] w-2 h-[1px] bg-iron-red" />
      </div>

      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="absolute left-0 top-0 w-2 h-2 -ml-1 -mt-1 bg-white rounded-full shadow-[0_0_10px_#FF1F1F]"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      />
      
    </div>
  );
};

export default CustomCursor;