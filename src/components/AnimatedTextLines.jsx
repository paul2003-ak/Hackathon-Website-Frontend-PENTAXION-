import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedTextLines = ({ text, className = "" }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  
  // Split text into lines
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        yPercent: 100, // Moves text down 100% of its own height (hidden by wrapper)
        opacity: 0,
        skewY: 5, // Adds a slight 'velocity' skew for a tech feel
        duration: 0.8,
        stagger: 0.05, // Faster stagger for rapid data display
        ease: "power3.out", // Snappy mechanical ease
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Triggers slightly earlier
        },
      });
    }
  }, { scope: containerRef }); // Scope ensures clean animation cleanup

  return (
    <div ref={containerRef} className={`flex flex-col gap-0.5 ${className}`}>
      {lines.map((line, index) => (
        // The Wrapper: acts as the "Mask"
        <div key={index} className="overflow-hidden relative block">
          <span
            ref={(el) => (lineRefs.current[index] = el)}
            className="block leading-snug tracking-wide text-pretty will-change-transform"
          >
            {line}
          </span>
        </div>
      ))}
    </div>
  );
};