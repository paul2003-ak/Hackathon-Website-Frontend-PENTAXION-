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
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); // 768px

  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <section id="services" className="relative min-h-screen bg-line-dark clip-path-tech pb-20">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      <AnimatedHeaderSection
        subTitle={"SYSTEM CAPABILITIES"}
        title={"PROTOCOL"}
        text={text}
        textColor={"text-white"}
        accentColor={"text-line-green"}
        withScrollTrigger={true}
      />

      <div className="relative mt-20">
        {servicesData.map((service, index) => (
          <div
            ref={(el) => (serviceRefs.current[index] = el)}
            key={index}
            // Changed: Added backdrop-blur, border-line-green, and slightly transparent bg
            className="sticky top-0 px-6 py-12 md:px-10 md:py-16 text-white bg-line-dark/95 backdrop-blur-md border-t border-line-green/50 shadow-[0_-5px_20px_rgba(6,199,85,0.1)]"
            style={
              isDesktop
                ? {
                    top: `calc(10vh + ${index * 4}rem)`,
                    marginBottom: `${(servicesData.length - index - 1) * 4}rem`,
                    // Create a stacking card effect
                    scale: 1 - (servicesData.length - index) * 0.02, 
                  }
                : { top: 0 }
            }
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
              
              {/* Title Section */}
              <div className="md:w-1/3">
                <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-transparent text-stroke-white">
                  {service.title}
                </h2>
                <div className="mt-4 w-16 h-1 bg-line-green shadow-[0_0_10px_#06C755]" />
              </div>

              {/* Content Section */}
              <div className="md:w-2/3 flex flex-col gap-8">
                <p className="font-mono text-lg text-gray-400 leading-relaxed">
                  {`> ${service.description}`}
                </p>
                
                <div className="flex flex-col gap-6">
                  {service.items.map((item, itemIndex) => (
                    <div key={`item-${index}-${itemIndex}`} className="group">
                      <h3 className="flex items-center text-xl lg:text-2xl font-bold uppercase tracking-tight group-hover:text-line-green transition-colors duration-300">
                        <span className="mr-6 font-mono text-sm text-line-green opacity-60">
                          {`0${itemIndex + 1} //`}
                        </span>
                        {item.title}
                      </h3>
                      {itemIndex < service.items.length - 1 && (
                        <div className="w-full h-[1px] my-4 bg-gray-800 group-hover:bg-line-green/50 transition-colors" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Tech Decoration */}
            <div className="absolute top-4 right-4 font-mono text-xs text-line-green opacity-40">
              SYS_ID: {100 + index}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;