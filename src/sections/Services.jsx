import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import HackerText from "../components/HackerText";
import { servicesData } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const text = `// SYSTEM ARCHITECTURE
Deploying scalable solutions for 
mission-critical environments.`;
  
  const containerRef = useRef(null);
  const serviceRefs = useRef([]);

  // --- MOUSE TILT EFFECT (Desktop Only Logic in CSS/GSAP) ---
  const handleMouseMove = (e, index) => {
    if (window.innerWidth < 1024) return;
    
    const card = serviceRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    gsap.to(`.holo-container-${index}`, {
      rotationX: ((y - centerY) / centerY) * -5,
      rotationY: ((x - centerX) / centerX) * 5,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(`.holo-container-${index}`, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)"
    });
  };

  // --- GSAP ANIMATIONS (Responsive) ---
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      serviceRefs.current.forEach((el, index) => {
        if (!el) return;
        const nextCard = serviceRefs.current[index + 1];
        if (nextCard) {
          gsap.to(el.querySelector(".service-content"), {
            filter: "blur(15px)", 
            scale: 0.95, 
            ease: "none",
            scrollTrigger: {
              trigger: nextCard, 
              start: "top bottom", 
              end: "top top", 
              scrub: true,
            }
          });
        }
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set(".service-content", { filter: "blur(0px)", scale: 1 });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="services" className="relative bg-line-dark pb-20 md:pb-40 pt-0">
      
      {/* =========================================================
          NEW: INFINITE SCROLLING MARQUEE BANNER
      ========================================================= */}
      <div className="relative z-30 w-full bg-iron-red py-3 overflow-hidden border-y border-iron-red shadow-[0_0_20px_rgba(255,31,31,0.4)] flex">
         
         <div className="flex whitespace-nowrap animate-marquee items-center">
            {/* We repeat the array 20 times to ensure it fills any screen wide enough to scroll infinitely */}
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex items-center">
                 <span className="mx-4 text-black font-black font-mono uppercase tracking-widest text-sm md:text-base">
                    REGISTER NOW
                 </span>
                 <Icon icon="lucide:zap" className="text-black/50" />
                 <span className="mx-4 text-white font-bold font-mono uppercase tracking-widest text-sm md:text-base">
                    SEE YOU ON THE D-DAY !
                 </span>
                 <Icon icon="lucide:zap" className="text-black/50" />
              </div>
            ))}
         </div>

         {/* Raw CSS for the marquee animation so it works perfectly without Tailwind config changes */}
         <style>{`
           @keyframes marquee {
             0% { transform: translateX(0); }
             100% { transform: translateX(-50%); }
           }
           .animate-marquee {
             animation: marquee 20s linear infinite;
             width: max-content;
           }
         `}</style>
      </div>


      {/* Background grids */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-iron-red/30 shadow-[0_0_20px_#FF1F1F] animate-scan-down pointer-events-none z-0" />

      {/* Header section (Added pt-10 to push it down from the new banner) */}
      <div className="pt-10">
        <AnimatedHeaderSection
          subTitle={"SYSTEM CAPABILITIES"}
          title={"PROTOCOL"}
          text={text}
          textColor={"text-white"}
          accentColor={"text-iron-red"}
          withScrollTrigger={true}
        />
      </div>

      {/* Cards Container */}
      <div className="relative mt-10 md:mt-20 px-0 md:px-4 snap-y snap-mandatory">
        {servicesData.map((service, index) => (
          <div
            ref={(el) => (serviceRefs.current[index] = el)}
            key={index}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className="w-full flex flex-col justify-center overflow-hidden border-t border-white/10 shadow-[0_-10px_60px_rgba(0,0,0,1)] relative z-10 bg-[#050505]
                       min-h-screen h-auto py-16 mb-8
                       md:sticky md:top-0 md:h-screen md:snap-start md:py-0 md:mb-0"
            style={{ zIndex: index + 1 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-iron-red to-transparent opacity-50" />

            <div className="service-content w-full bg-[#050505] h-auto md:h-full md:will-change-transform">
                
                <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row gap-8 md:gap-20 items-center h-full md:pt-20">
                    
                    {/* LEFT: INFO */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                       <div className="font-mono text-xs text-iron-red mb-4 tracking-widest flex items-center gap-2">
                          <Icon icon="lucide:cpu" />
                          <span>PROTOCOL_SEQ_{10 + index} // ONLINE</span>
                       </div>

                       <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-6 md:mb-8">
                          <HackerText text={service.title} />
                       </h2>

                       <div className="relative pl-6 border-l-2 border-iron-red/50 py-2 mb-8 md:mb-10 bg-gradient-to-r from-white/5 to-transparent rounded-r-lg">
                          <p className="font-mono text-base md:text-lg text-gray-300 leading-relaxed">
                            {service.description}
                          </p>
                       </div>
                      
                      <div className="flex flex-col gap-2 pb-10 md:pb-0">
                        {service.items.map((item, itemIndex) => (
                          <div 
                            key={`item-${index}-${itemIndex}`} 
                            className="group flex items-center justify-between p-4 border transition-all duration-300 cursor-default rounded-sm
                                       bg-iron-red/5 border-iron-red/40
                                       md:bg-white/5 md:border-white/5 md:hover:bg-iron-red/10 md:hover:border-iron-red/50"
                          >
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-xs text-iron-red md:text-iron-red md:opacity-50 md:group-hover:opacity-100">
                                    0{itemIndex+1}
                                </span>
                                <h3 className="text-base md:text-xl font-bold uppercase tracking-tight transition-colors text-white md:group-hover:text-iron-red">
                                  {item.title}
                                </h3>
                            </div>
                            <Icon 
                                icon="lucide:chevron-right" 
                                className="transition-all text-iron-red md:text-white/20 md:group-hover:text-iron-red md:group-hover:translate-x-1" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT: 3D HOLO */}
                    <div className="hidden md:flex md:w-1/2 items-center justify-center relative perspective-1000 h-full max-h-[600px]">
                        <div className={`holo-container-${index} relative w-full h-full bg-black border border-iron-red/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(255,31,31,0.1)] group`}>
                            <div className="absolute inset-0">
                                <img 
                                    src={service.img || "/assets/ironman.jpg"} 
                                    alt="Schematic"
                                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        filter: "grayscale(100%) contrast(1.2) brightness(0.8)",
                                    }}
                                />
                                <div className="absolute inset-0 bg-iron-red/20 mix-blend-multiply" />
                            </div>

                            <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 pointer-events-none">
                                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                                    <Icon icon="lucide:scan-face" className="text-iron-red text-2xl animate-pulse" />
                                    <div className="text-right">
                                        <p className="text-[10px] text-iron-red font-mono">TARGET_LOCK</p>
                                        <p className="text-xs text-white font-mono">{service.title}</p>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-iron-red/30 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
                                    <div className="w-24 h-24 border border-white/20 rounded-full animate-spin-slow" />
                                </div>
                                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                    <p className="text-[10px] text-gray-400 font-mono">SYS_INTEGRITY: 100%</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,31,31,0.1)_50%,transparent_100%)] h-[20%] w-full animate-scan pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 font-black text-[20vw] leading-none text-white/5 pointer-events-none select-none">
                0{index + 1}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;