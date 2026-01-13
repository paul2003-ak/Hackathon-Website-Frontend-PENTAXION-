import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Services = () => {
  const text = `// SYSTEM ARCHITECTURE
Deploying scalable solutions for 
mission-critical environments.`;
  
  const serviceRefs = useRef([]);
  const contentRefs = useRef([]);
  const holoRefs = useRef([]); // New refs for the hologram images
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); // 768px

  useGSAP(() => {
    serviceRefs.current.forEach((el, index) => {
      if (!el) return;

      // 1. Main Card Entrance (Slide Up)
      gsap.from(el, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        duration: 0.8,
        ease: "power2.out",
      });

      // 2. Content Blur exit animation
      if (contentRefs.current[index]) {
        gsap.to(contentRefs.current[index], {
          opacity: 0,
          filter: "blur(10px)",
          scale: 0.95,
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 3. NEW: Hologram Parallax Effect
      // The image moves slightly slower than the card to create depth
      if (holoRefs.current[index] && isDesktop) {
        gsap.fromTo(holoRefs.current[index], 
          { y: "-10%" }, // Start slightly higher
          {
            y: "10%", // End slightly lower
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom", // Start when card enters viewport
              end: "bottom top", // End when card leaves
              scrub: 1, // Smooth scrubbing
            }
          }
        );
      }
    });
  }, [isDesktop]);

  return (
    <section id="services" className="relative min-h-screen bg-line-dark clip-path-tech pb-40">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      <AnimatedHeaderSection
        subTitle={"SYSTEM CAPABILITIES"}
        title={"PROTOCOL"}
        text={text}
        textColor={"text-white"}
        accentColor={"text-iron-red"}
        withScrollTrigger={true}
      />

      <div className="relative mt-20 px-0 md:px-4">
        {servicesData.map((service, index) => (
          <div
            ref={(el) => (serviceRefs.current[index] = el)}
            key={index}
            // Solid background, full height, sticky positioning
            className="sticky top-0 w-full min-h-screen flex flex-col pt-12 md:pt-24 border-t-2 border-iron-red/50 shadow-[0_-10px_50px_rgba(0,0,0,1)] bg-[#0A0A0A] overflow-hidden"
            style={{
              zIndex: index + 1, 
              // Subtle alternating offset for visual interest
              marginLeft: isDesktop ? `${index % 2 * 2}rem` : 0,
              marginRight: isDesktop ? `${(index + 1) % 2 * 2}rem` : 0,
            }}
          >
            {/* Inner Container for Content (Gets Blurred on exit) */}
            <div 
              ref={el => contentRefs.current[index] = el}
              className="container mx-auto h-full px-6 md:px-0 relative z-10"
            >
              <div className="flex flex-col md:flex-row gap-10 md:gap-20 h-full">
                
                {/* --- LEFT COLUMN: TEXT CONTENT --- */}
                <div className="md:w-3/5 flex flex-col gap-10 pb-20">
                   {/* Title */}
                  <div>
                    <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter text-transparent text-stroke-white leading-none">
                      {service.title}
                    </h2>
                    <div className="mt-6 w-32 h-2 bg-iron-red shadow-[0_0_30px_#FF1F1F] animate-pulse" />
                  </div>

                  {/* Description */}
                  <p className="font-mono text-xl text-gray-300 leading-relaxed border-l-4 border-iron-red pl-6 py-4 bg-white/5 backdrop-blur-sm">
                    {`> ${service.description}`}
                  </p>
                  
                  {/* List Items */}
                  <div className="flex flex-col gap-4 mt-4">
                    {service.items.map((item, itemIndex) => (
                      <div key={`item-${index}-${itemIndex}`} className="group border-b border-white/10 pb-4 flex items-center">
                         <div className="w-2 h-2 bg-iron-red mr-4 rounded-full group-hover:shadow-[0_0_10px_#FF1F1F] transition-all"/>
                        <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-iron-red transition-colors duration-300">
                          {item.title}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* --- RIGHT COLUMN: HOLOGRAPHIC VISUAL (Desktop Only) --- */}
                <div className="hidden md:block md:w-2/5 relative h-[60vh] overflow-hidden rounded-xl border border-iron-red/20 bg-black/50">
                    {/* Hologram Container with Parallax Ref */}
                    <div ref={el => holoRefs.current[index] = el} className="absolute inset-0 h-[120%] -top-[10%]">
                        {/* NOTE: Update your constants.js to include an 'img' property for specific images.
                           Fallback to generic ironman.jpg if not found.
                        */}
                        <img 
                            src={service.img || "/assets/ironman.jpg"} 
                            alt={service.title}
                            className="w-full h-full object-cover opacity-50"
                            style={{
                                // CSS Magic to turn a regular image into a Red Hologram
                                filter: "grayscale(100%) contrast(1.5) sepia(100%) hue-rotate(320deg) saturate(500%) brightness(0.8)",
                                mixBlendMode: "screen"
                            }}
                        />
                    </div>
                    
                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,31,31,0.2)_50%)] bg-[length:100%_4px] pointer-events-none" />
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-radial-gradient(circle, transparent 60%, rgba(0,0,0,0.8) 100%) pointer-events-none" />
                    
                    {/* Tech readout overlay */}
                    <div className="absolute bottom-4 right-4 font-mono text-xs text-iron-red">
                        SCHEMATIC_VIEW // {service.title.toUpperCase()}
                    </div>
                </div>

              </div>
            </div>

            {/* Corner ID Badge */}
            <div className="absolute top-6 right-6 font-mono text-xs text-iron-red opacity-60 border border-iron-red/50 px-3 py-1 rounded-sm bg-black z-20">
              SYS_ID: {100 + index} // ACTIVE
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;