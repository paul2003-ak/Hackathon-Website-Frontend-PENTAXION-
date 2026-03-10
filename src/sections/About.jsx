import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
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
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", 
      filter: "grayscale(100%) contrast(1.2)",
    });
    
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
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
      
      {/* Glowing RED Line on Left */}
      <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-iron-red to-transparent opacity-30" />

      <AnimatedHeaderSection
        subTitle={"MISSION BRIEFING"}
        title={"ABOUT US"}
        text={missionText}
        textColor={"text-white"}
        accentColor={"text-iron-red"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 px-6 md:px-10 mt-16 pb-16 relative z-10">
        
        {/* --- LEFT: HOLOGRAPHIC IMAGE --- */}
        <div className="relative w-full lg:w-1/2 group">
          {/* Decorative Corners */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-iron-red" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-iron-red" />
          
          <div className="relative overflow-hidden rounded-sm border border-white/10 bg-black/50">
            {/* Red Overlay that vanishes on hover */}
            <div className="absolute inset-0 bg-iron-red/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
            
            <img
              ref={imgRef}
              src="/assets/ironman.jpg" 
              alt="Mission Target"
              className="w-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
          </div>
          
          {/* Status Text */}
          <div className="mt-4 flex justify-between font-mono text-[10px] md:text-xs text-iron-red">
            <span>// TARGET: INNOVATION</span>
            <span>STATUS: ACTIVE</span>
          </div>
        </div>


        {/* --- RIGHT: DATA READOUT & STATS --- */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
           
           {/* 1. Info Box */}
           <div className="p-6 border-l-2 border-iron-red bg-white/5 backdrop-blur-sm">
              <h3 className="text-iron-red font-mono font-bold text-xs md:text-sm mb-4 tracking-widest">
                [ SYSTEM DIRECTIVE ]
              </h3>
              <div className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-gray-300">
                <AnimatedTextLines 
                  text={detailedText} 
                  className="font-sans" 
                />
              </div>
           </div>

           {/* 2. Upgraded Event Highlights (Stats) Area */}
           <div className="grid grid-cols-2 gap-4">
              
              {/* Stat 1 */}
              <div className="p-4 bg-black/40 border border-white/10 hover:border-iron-red/50 transition-colors">
                <p className="text-3xl md:text-4xl font-black text-white">100<span className="text-iron-red">+</span></p>
                <p className="font-mono text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-widest">Participants</p>
              </div>
              
              {/* Stat 2 */}
              <div className="p-4 bg-black/40 border border-white/10 hover:border-iron-red/50 transition-colors">
                <p className="text-3xl md:text-4xl font-black text-white">20<span className="text-iron-red">+</span></p>
                <p className="font-mono text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-widest">Teams</p>
              </div>

              {/* Stat 3 */}
              <div className="p-4 bg-black/40 border border-white/10 hover:border-iron-red/50 transition-colors">
                <p className="text-3xl md:text-4xl font-black text-white">10<span className="text-iron-red">+</span></p>
                <p className="font-mono text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-widest">Mentors</p>
              </div>

              {/* Stat 4 */}
              <div className="p-4 bg-black/40 border border-white/10 hover:border-iron-red/50 transition-colors">
                <p className="text-3xl md:text-4xl font-black text-white">36<span className="text-iron-red">H</span></p>
                <p className="font-mono text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-widest">Hackathon</p>
              </div>

              {/* Stat 5: Prize Pool (Spans full width for emphasis) */}
              <div className="col-span-2 p-5 border border-iron-red bg-iron-red/10 shadow-[0_0_15px_rgba(255,31,31,0.2)] flex items-center justify-between group overflow-hidden relative">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-iron-red/20 to-transparent -translate-x-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
                
                <div className="relative z-10">
                  <p className="text-3xl md:text-5xl font-black text-iron-red text-glow">₹60K</p>
                  <p className="font-mono text-[10px] md:text-xs text-white mt-1 uppercase tracking-widest">Total Prize Pool</p>
                </div>

                {/* Subtext Badge for 30-20-10 split */}
                
              </div>

           </div>
        </div>

      </div>
    </section>
  );
};

export default About;