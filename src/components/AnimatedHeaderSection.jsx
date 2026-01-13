import React, { useRef } from "react";
import { AnimatedTextLines } from "./AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor = "text-white",
  // 1. Updated default accent color to Iron Red
  accentColor = "text-iron-red", 
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "100",
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        x: "-50",
        duration: 1,
        ease: "power2.out",
      },
      "<+0.2"
    );
  }, []);

  return (
    <div ref={contextRef} className="relative">
      <div className="w-full">
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-6 pt-16 sm:gap-8"
        >
          {/* Tech/Mono Subtitle */}
          <div className="flex items-center gap-4 px-10">
            {/* 2. Updated Background and Shadow to Red (#FF1F1F) */}
            <span className="h-[2px] w-8 bg-iron-red inline-block shadow-[0_0_10px_#FF1F1F]"></span>
            <p
              className={`text-sm md:text-base font-mono font-bold tracking-[0.3rem] uppercase ${accentColor}`}
            >
              {subTitle}
            </p>
          </div>

          <div className="px-10">
            <h1
              className={`flex flex-col uppercase banner-text-responsive ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span 
                  key={index} 
                  className={`
                    /* 3. Updated 'text-stroke-green' to 'text-stroke-red' */
                    ${index === 1 ? "text-stroke-red text-glow" : ""} 
                    ${index === 0 ? "relative z-10" : ""}
                    leading-[0.85]
                  `}
                >
                   {part}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      <div className={`relative px-10 mt-12 ${textColor}`}>
        {/* 4. Updated Border Color to Red */}
        <div className="absolute inset-x-0 border-t border-iron-red/50" />
        <div className="py-8 sm:py-12 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-mono leading-relaxed value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;