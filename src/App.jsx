import React, { useState, useRef } from "react";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

// --- SECTIONS ---
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Pricing from "./sections/Pricing"; 
import About from "./sections/About";
import Works from "./sections/Works";
import Contact from "./sections/Contact";

// --- COMPONENTS ---
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor"; 
import Sponsors from "./sections/Sponser";
import ChatBot from "./components/ChatBot";

gsap.registerPlugin(ScrollTrigger);

// Prevent GSAP from causing lag spikes
gsap.ticker.lagSmoothing(0);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);
  
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  // Sync GSAP with Lenis for smooth scrolling
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
      autoRaf={false} /* This keeps scrolling perfectly smooth without lagging your CPU */
      options={{
        lerp: 0.08,         
        duration: 1.2,     
        smoothTouch: false, 
        wheelMultiplier: 1,
        infinite: false,
      }}
      className="relative w-screen min-h-screen overflow-x-hidden bg-line-dark"
    >
      {/* I REMOVED the "will-change-transform" div here! 
          Now your black upper layer (Navbar) will stay perfectly fixed at the top. 
      */}
      
      {isDesktop && <CustomCursor />}
      
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div className={`transition-opacity duration-700 ${isLoading ? "h-screen overflow-hidden" : "opacity-100"}`}>
        <Navbar />
        <Hero />
        
        {/* If you wanted to KEEP ServiceSummary, just add it back here: <ServiceSummary /> */}
        <Services /> 
        <Pricing />
        <Sponsors /> 
        <About />
        <Works />
        <Contact />

        <ChatBot/>
      </div>
      
    </ReactLenis>
  );
};

export default App;