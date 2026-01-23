import React, { useState, useRef } from "react";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

// --- SECTIONS ---
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary"; // Make sure this exists or remove if not used
import Services from "./sections/Services";
import Pricing from "./sections/Pricing"; 
import About from "./sections/About";
import Works from "./sections/Works";
import Contact from "./sections/Contact";

// --- COMPONENTS ---
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor"; 

gsap.registerPlugin(ScrollTrigger);

// OPTIMIZATION: Prevent GSAP from causing jank on heavy loads
gsap.ticker.lagSmoothing(0);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef();
  
  // OPTIMIZATION: Only show Custom Cursor on Desktop
  const isDesktop = useMediaQuery({ minWidth: 1024 });

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
        lerp: 0.07,         // SMOOTHER: Adjusted for a nice weighted feel (0.1 is snappy, 0.05 is heavy)
        duration: 1.2,     
        smoothTouch: false, // Keep native touch for best mobile performance
        wheelMultiplier: 1,
        infinite: false,
      }}
      className="relative w-screen min-h-screen overflow-x-hidden bg-line-dark"
    >
      {/* Performance: Cursor only on Desktop */}
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