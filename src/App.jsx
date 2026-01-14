import React, { useState, useRef } from "react";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
import CustomCursor from "./components/CustomCursor"; // Import Custom Cursor

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef();

  // --- THE SMOOTH SCROLL MAGIC ---
  useGSAP(() => {
    // 1. Force ScrollTrigger to update every time Lenis scrolls
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
        smoothTouch: false, 
        smoothWheel: true,
      }}
      className="relative w-screen min-h-screen overflow-x-auto bg-line-dark"
    >
      {/* 1. Custom Cursor (Visible on Desktop) */}
      <CustomCursor />
      
      {/* 2. Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* 3. Main Content */}
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