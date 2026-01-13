import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  // Extracted Text from your Image
  const missionText = `PENTAXION envisions a future where technology empowers every citizen, bridges systemic gaps, and drives meaningful impact across India.`;
  
  const detailedText = `This hackathon is a call to action for innovators, students, developers, and changemakers to collaborate, code, and create solutions that address the real-world challenges faced by communities across our diverse nation.

We believe in technology as a tool not just for progress, but for purpose.`;

  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Scroll Animation for the Container
    gsap.to(containerRef.current, {
      scale: 0.98,
      borderRadius: "2rem",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom 90%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    // Tech Reveal Animation for Image
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", // Starts hidden at top
      filter: "grayscale(100%) contrast(1.2)",
    });
    
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Reveals down
      duration: 1.5,
      ease: "power4.inOut",
      scrollTrigger: { 
        trigger: imgRef.current,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative min-h-screen bg-line-dark overflow-hidden py-20"
    >
      {/* Background Tech Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      
      {/* Glowing Line on Left */}
      <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-line-green to-transparent opacity-30" />

      <AnimatedHeaderSection
        subTitle={"MISSION BRIEFING"}
        title={"ABOUT US"}
        text={missionText}
        textColor={"text-white"}
        accentColor={"text-line-green"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 px-10 mt-16 pb-16">
        
        {/* --- LEFT: HOLOGRAPHIC IMAGE --- */}
        <div className="relative w-full lg:w-1/2 group">
          {/* Decorative Corners */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-line-green" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-line-green" />
          
          <div className="relative overflow-hidden rounded-sm border border-white/10 bg-black/50">
            {/* Green Overlay that vanishes on hover */}
            <div className="absolute inset-0 bg-line-green/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
            
            <img
              ref={imgRef}
              src="/assets/ironman.jpg" // Using the Ironman image to match theme
              alt="Mission Target"
              className="w-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
          </div>
          
          <div className="mt-4 flex justify-between font-mono text-xs text-line-green">
            <span>// TARGET: INNOVATION</span>
            <span>STATUS: ACTIVE</span>
          </div>
        </div>


        {/* --- RIGHT: DATA READOUT --- */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
           <div className="p-6 border-l-2 border-line-green bg-white/5 backdrop-blur-sm">
              <h3 className="text-line-green font-mono font-bold text-sm mb-4 tracking-widest">
                [ SYSTEM DIRECTIVE ]
              </h3>
              <div className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-gray-300">
                <AnimatedTextLines 
                  text={detailedText} 
                  className="font-sans" // Keep standard font for readability, or use font-mono for style
                />
              </div>
           </div>

           {/* Stats / Badges Area */}
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-line-gray/50 border border-white/10">
                <p className="text-4xl font-black text-white">24<span className="text-line-green">H</span></p>
                <p className="font-mono text-xs text-gray-400 mt-1">DURATION</p>
              </div>
              <div className="p-4 bg-line-gray/50 border border-white/10">
                <p className="text-4xl font-black text-white">50<span className="text-line-green">+</span></p>
                <p className="font-mono text-xs text-gray-400 mt-1">TEAMS</p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default About;