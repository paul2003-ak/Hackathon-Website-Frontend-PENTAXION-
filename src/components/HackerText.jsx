import {  useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

const HackerText = ({ text, className = "", triggerScroll = true }) => {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const startScramble = () => {
    let iteration = 0;
    
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3; // Controls speed (higher denominator = slower)
    }, 30);
  };

  useGSAP(() => {
    if (triggerScroll) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: startScramble,
      });
    } else {
      startScramble();
    }
  }, []);

  return (
    <span
      ref={containerRef}
      onMouseEnter={startScramble} // Also scramble on hover!
      className={`font-mono cursor-default inline-block ${className}`}
    >
      {displayText}
    </span>
  );
};

export default HackerText;