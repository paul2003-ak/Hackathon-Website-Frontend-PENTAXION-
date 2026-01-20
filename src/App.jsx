import React, { useState, useRef } from "react";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

// --- SECTIONS ---
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import Pricing from "./sections/Pricing"; 
import About from "./sections/About";
import Works from "./sections/Works";
import Contact from "./sections/Contact";

// --- COMPONENTS ---
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor"; 

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef();
  
  // Optimization: Don't render CustomCursor on mobile
  const isDesktop = useMediaQuery({ minWidth: "64rem" });

  useGSAP(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  });

  return (
    <ReactLenis 
      ref={lenisRef}
      root 
      options={{
        lerp: 0.05,       
        duration: 1.5,    
        smoothTouch: false, // Ensures native scrolling on mobile (Performance Saver)
        smoothWheel: true,
      }}
      className="relative w-screen min-h-screen overflow-x-auto bg-line-dark"
    >
      {/* Optimization: Only show Custom Cursor on Desktop */}
      {isDesktop && <CustomCursor />}
      
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div className={`transition-opacity duration-700 ${isLoading ? "h-screen overflow-hidden" : "opacity-100"}`}>
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <Pricing />
        <About />
        <Works />
        <Contact />
      </div>

    </ReactLenis>
  );
};

export default App;