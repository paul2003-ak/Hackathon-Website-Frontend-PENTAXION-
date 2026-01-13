import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  useGSAP(() => {
    // Increased movement distances slightly for more dramatic effect against the background
    gsap.to("#title-service-1", {
      xPercent: 25,
      scrollTrigger: { target: "#title-service-1", scrub: true },
    });
    gsap.to("#title-service-2", {
      xPercent: -35,
      scrollTrigger: { target: "#title-service-2", scrub: true },
    });
    gsap.to("#title-service-3", {
      xPercent: 40,
      scrollTrigger: { target: "#title-service-3", scrub: true },
    });
    gsap.to("#title-service-4", {
      xPercent: -40,
      scrollTrigger: { target: "#title-service-4", scrub: true },
    });
  });

  // Reusable component for the glowing green divider
  const GreenDivider = () => (
    <div className="w-12 h-[3px] md:w-32 bg-line-green shadow-[0_0_15px_#06C755]" />
  );

  return (
    <section className="relative mt-20 overflow-hidden min-h-[60vh] flex items-center justify-center mb-42">
      
      {/* --- BACKGROUND IMAGE & OVERLAY --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover grayscale"
          style={{ 
            // Replace with your actual "iron/mech" image path
            backgroundImage: `url("/assets/ironman.jpg")` 
          }}
        />
        {/* Dark overlay + green tint to make text pop and fit theme */}
        <div className="absolute inset-0 bg-line-dark/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-line-green/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-cyber-grid opacity-30" /> 
      </div>


      {/* --- CONTENT --- */}
      {/* Changed fonts to be bolder, uppercase, and white for hackathon feel */}
      <div className="relative z-10 w-full py-20 text-center text-white uppercase contact-text-responsive font-black tracking-tighter leading-none">
        
        <div id="title-service-1">
          {/* Using stroke effect for the first item */}
          <p className="text-stroke-white opacity-80">Architecture</p>
        </div>

        <div
          id="title-service-2"
          className="flex items-center justify-center gap-6 my-4 translate-x-16 md:gap-10"
        >
          <p>Development</p>
          <GreenDivider />
          <p className="text-line-green text-glow">Deployment</p>
        </div>

        <div
          id="title-service-3"
          className="flex items-center justify-center gap-6 my-4 -translate-x-48 md:gap-10"
        >
          <p>APIs</p>
          <GreenDivider />
          {/* Changed italic to monospace for tech feel */}
          <p className="font-mono text-4xl md:text-6xl pt-2">Frontends</p>
          <GreenDivider />
          <p>Scalability</p>
        </div>

        <div id="title-service-4" className="translate-x-48">
          <p className="text-stroke-white opacity-80">Databases</p>
        </div>

      </div>
    </section>
  );
};

export default ServiceSummary;