import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 1. Move the cursor
    const onMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0, // Instant follow
      });
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15, // Smooth lag
        ease: "power2.out",
      });
    };

    // 2. Detect Hover on Clickable Elements
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    // Add listeners to all buttons and links
    const clickables = document.querySelectorAll("a, button, .cursor-pointer");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []); // Run once on mount

  // 3. Animation for Hover State
  useGSAP(() => {
    if (isHovering) {
      gsap.to(followerRef.current, {
        scale: 3,
        borderColor: "#FF1F1F", // Iron Red
        backgroundColor: "rgba(255, 31, 31, 0.1)",
        duration: 0.3,
      });
    } else {
      gsap.to(followerRef.current, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.5)",
        backgroundColor: "transparent",
        duration: 0.3,
      });
    }
  }, [isHovering]);

  return (
    <>
      {/* Small Center Dot (Always Red) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-iron-red rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      
      {/* Large Follower Ring (Expands on Hover) */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
      />
    </>
  );
};

export default CustomCursor;