import React, { useState } from "react";
import ReactLenis from "lenis/react";

// --- SECTIONS (Your existing imports) ---
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import About from "./sections/About";
import Works from "./sections/Works";
import Contact from "./sections/Contact";

// --- COMPONENTS ---
import Preloader from "./components/Preloader"; // Ensure this path is correct!
import Pricing from "./sections/Pricing";

const App = () => {
  // We use this state to keep the Preloader visible until it tells us it's done
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto bg-line-dark">
      
      {/* 1. PRELOADER
        This sits on top of everything (z-index 9999).
        It handles the "Iron Man Initializing" animation.
        When it finishes, it calls 'onComplete', which sets isLoading to false.
      */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* 2. MAIN SITE CONTENT
        We render this immediately so it loads in the background (behind the preloader).
        'h-screen overflow-hidden' prevents scrolling while loading.
      */}
      <div className={`transition-opacity duration-700 ${isLoading ? "h-screen overflow-hidden" : "opacity-100"}`}>
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <Pricing/>
        <About />
        <Works />
        <Contact />
      </div>

    </ReactLenis>
  );
};

export default App;