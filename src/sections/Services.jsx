import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import HackerText from "../components/HackerText";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const text = `// SYSTEM ARCHITECTURE
Deploying scalable solutions for 
mission-critical environments.`;
  
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "64rem" }); // 1024px
  
  // --- 3D TILT STATE ---
  const handleMouseMove = (e, index) => {
    if (!isDesktop) return;
    const card = serviceRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(`.holo-container-${index}`, {
      rotationX: rotateX,
      rotationY: rotateY,
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

  useGSAP(() => {
    serviceRefs.current.forEach((el, index) => {
      if (!el) return;
      
      const nextCard = serviceRefs.current[index + 1];

      // 1. "Push Back" Animation
      // If there is a next card, animate THIS card to shrink when the next one overlaps it
      if (nextCard) {
        gsap.to(el, {
          scale: 0.9,
          filter: "brightness(0.4)", // Darken it nicely
          opacity: 0, // Fade out slightly at the very end
          transformOrigin: "center top",
          ease: "none", // Linear ease is best for scrub
          scrollTrigger: {
            trigger: nextCard, // Watch the NEXT card
            start: "top bottom", // When next card enters bottom of screen
            end: "top top", // When next card hits top of screen
            scrub: true,
          }
        });
      }

      // 2. Internal Parallax (Content moves slightly inside the card)
      // This makes the text feel like it's floating separately from the background
      const content = el.querySelector(".service-content");
      if (content) {
        gsap.fromTo(content, 
          { y: 0 },
          { 
            y: -50, // Move content up slightly as we scroll
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }
    });
  }, [isDesktop]);

  return (
    <section id="services" className="relative bg-line-dark pb-40">
      
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-iron-red/30 shadow-[0_0_20px_#FF1F1F] animate-scan-down pointer-events-none z-0" />

      <AnimatedHeaderSection
        subTitle={"SYSTEM CAPABILITIES"}
        title={"PROTOCOL"}
        text={text}
        textColor={"text-white"}
        accentColor={"text-iron-red"}
        withScrollTrigger={true}
      />

      {/* Container with top padding to let header breathe */}
      <div className="relative mt-20 px-0 md:px-4">
        {servicesData.map((service, index) => (
          <div
            ref={(el) => (serviceRefs.current[index] = el)}
            key={index}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            // STICKY CARD
            className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden border-t border-white/10"
            style={{
              zIndex: index + 1, 
              backgroundColor: '#050505', 
              // Very subtle margin top for the stack effect visual
              marginTop: index === 0 ? 0 : '-5vh'
            }}
          >
            {/* Top Red Status Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-iron-red to-transparent opacity-50" />

            {/* Content Container - Flex row for layout */}
            <div className="service-content container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row gap-12 md:gap-20 items-center h-full pt-20">
                
                {/* --- LEFT COLUMN: INFO --- */}
                <div className="md:w-1/2 flex flex-col justify-center">
                   <div className="font-mono text-xs text-iron-red mb-4 tracking-widest flex items-center gap-2">
                      <Icon icon="lucide:cpu" />
                      <span>PROTOCOL_SEQ_{10 + index} // ONLINE</span>
                   </div>

                   <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-8">
                      <HackerText text={service.title} />
                   </h2>

                   <div className="relative pl-6 border-l-2 border-iron-red/50 py-2 mb-10 bg-gradient-to-r from-white/5 to-transparent rounded-r-lg">
                      <p className="font-mono text-lg text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                   </div>
                  
                  <div className="flex flex-col gap-2">
                    {service.items.map((item, itemIndex) => (
                      <div 
                        key={`item-${index}-${itemIndex}`} 
                        className="group flex items-center justify-between p-4 border border-white/5 bg-white/5 hover:bg-iron-red/10 hover:border-iron-red/50 transition-all duration-300 cursor-default rounded-sm"
                      >
                        <div className="flex items-center gap-4">
                            <span className="text-iron-red opacity-50 group-hover:opacity-100 font-mono text-xs">0{itemIndex+1}</span>
                            <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-iron-red transition-colors">
                              {item.title}
                            </h3>
                        </div>
                        <Icon icon="lucide:chevron-right" className="text-white/20 group-hover:text-iron-red group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* --- RIGHT COLUMN: 3D HOLOGRAPHIC DISPLAY --- */}
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

                        {/* HUD Elements */}
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
                                <div className="w-1 h-1 bg-iron-red rounded-full absolute" />
                            </div>

                            <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                <div className="flex gap-1">
                                    <div className="w-1 h-4 bg-iron-red" />
                                    <div className="w-1 h-6 bg-iron-red/50" />
                                    <div className="w-1 h-3 bg-iron-red/30" />
                                </div>
                                <p className="text-[10px] text-gray-400 font-mono">SYS_INTEGRITY: 100%</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,31,31,0.1)_50%,transparent_100%)] h-[20%] w-full animate-scan pointer-events-none" />
                    </div>
                    <div className="absolute -z-10 w-[80%] h-[80%] bg-iron-red/10 blur-[80px] rounded-full" />
                </div>
            </div>

            {/* Big Background Number */}
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