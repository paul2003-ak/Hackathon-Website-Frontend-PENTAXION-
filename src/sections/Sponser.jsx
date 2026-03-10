import { useRef } from "react";
import HackerText from "../components/HackerText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// THIS IS THE MISSING IMPORT THAT BROKE YOUR PAGE:
import { Icon } from "@iconify/react"; 

gsap.registerPlugin(ScrollTrigger);

const SPONSORS_DATA = [
  { name: "GitHub", logo: "/assets/sponsors/github.png" },
  { name: "CORE", logo: "/assets/sponsors/core.png" },
  { name: "ChainIDE", logo: "/assets/sponsors/chainide.png" },
  { name: "Civic", logo: "/assets/sponsors/civic.png" },
  { name: "Devfolio", logo: "/assets/sponsors/devfolio.png" },
  { name: "ETHIndia", logo: "/assets/sponsors/ethindia.png" },
  { name: "Starknet", logo: "/assets/sponsors/starknet.png" },
  { name: "Pharos", logo: "/assets/sponsors/pharos.png" },
  { name: "Aptos", logo: "/assets/sponsors/aptos.png" },
  { name: "Rise in", logo: "/assets/sponsors/risein.png" },
  { name: "edugraph", logo: "/assets/sponsors/edugraph.png" },
  { name: "Filecoin", logo: "/assets/sponsors/filecoin.png" },
  { name: "FIL-Builders", logo: "/assets/sponsors/filbuilders.png" },
  { name: "Aethir India", logo: "/assets/sponsors/aethir.png" },
  { name: "akomi", logo: "/assets/sponsors/akomi.png" },
  { name: ".xyz", logo: "/assets/sponsors/xyz.png" },
  { name: "Merchanzi", logo: "/assets/sponsors/merchanzi.png" },
  { name: "SNU", logo: "/assets/sponsors/snu.png" },
  { name: "MLH", logo: "/assets/sponsors/mlh.png" },
];

const Sponsors = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    /* --- COMMENTED OUT: Sponsor Animation ---
    gsap.fromTo(".sponsor-node", 
      { scale: 0.8, opacity: 0, z: -50 },
      {
        scale: 1, opacity: 1, z: 0, duration: 0.8, ease: "back.out(1.5)",
        stagger: { each: 0.05, from: "center", grid: "auto" },
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    );
    */
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="sponsors" className="relative min-h-screen bg-black py-24 overflow-hidden flex flex-col items-center">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none z-0" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(255,31,31,0.1)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* --- HEADER --- */}
      <div className="relative z-10 w-full flex flex-col items-center text-center mb-16 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/5 uppercase pointer-events-none whitespace-nowrap select-none tracking-tighter">
            ALLIES
        </div>

        <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-iron-red"></span>
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.3rem] uppercase text-iron-red animate-pulse">
                NETWORK PROTOCOL
            </p>
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-iron-red"></span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            <span className="text-transparent text-stroke-white mr-4">SPONSORS &</span> 
            <span className="text-glow"><HackerText text="PARTNERS" /></span>
        </h2>
      </div>

      {/* --- GOLDEN "TO BE ANNOUNCED" BAND --- */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center mt-10 px-4">
        <div className="relative w-full max-w-5xl border-y border-yellow-500/80 bg-yellow-500/10 py-8 shadow-[0_0_40px_rgba(234,179,8,0.15)] flex justify-center overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70" />
          
          <div className="flex items-center gap-4 md:gap-8">
            <Icon icon="lucide:lock" className="text-yellow-500 text-2xl md:text-4xl animate-pulse" />
            <h3 className="text-2xl md:text-5xl font-black text-yellow-500 uppercase tracking-[0.2em] md:tracking-[0.4em] drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] text-center">
              TO BE ANNOUNCED
            </h3>
            <Icon icon="lucide:lock" className="text-yellow-500 text-2xl md:text-4xl animate-pulse" />
          </div>
          
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(234,179,8,0.05)_10px,rgba(234,179,8,0.05)_20px)] pointer-events-none" />
        </div>
        
        <p className="font-mono text-xs md:text-sm text-gray-500 mt-6 tracking-widest uppercase">
          // SECURING_PARTNERSHIPS... STAND_BY
        </p>
      </div>

      {/* --- COMMENTED OUT: SPONSORS GRID --- */}
      {/* <div className="relative z-10 container mx-auto px-4 md:px-10 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {SPONSORS_DATA.map((sponsor, index) => (
            <div 
              key={index}
              className="sponsor-node group relative flex flex-col items-center justify-center h-[100px] md:h-[130px] bg-[#050505] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-iron-red hover:bg-iron-red/5 hover:shadow-[0_0_30px_rgba(255,31,31,0.15)] hover:-translate-y-1"
            >
              <div className="absolute top-2 left-3 right-3 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="font-mono text-[8px] md:text-[10px] text-white tracking-widest">
                    NODE_{index < 9 ? `0${index + 1}` : index + 1}
                 </span>
                 <div className="w-1.5 h-1.5 rounded-full bg-iron-red group-hover:animate-pulse group-hover:shadow-[0_0_8px_#FF1F1F]" />
              </div>

              <img 
                src={sponsor.logo} 
                alt={sponsor.name}
                className="max-w-[70%] max-h-[50%] object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-10"
                style={{ color: "white", fontFamily: "monospace", fontSize: "10px", textAlign: "center" }}
              />

              <div className="absolute bottom-2 left-3 w-3 h-3 border-b border-l border-white/20 group-hover:border-iron-red transition-colors duration-300" />
              <div className="absolute bottom-2 right-3 w-3 h-3 border-b border-r border-white/20 group-hover:border-iron-red transition-colors duration-300" />

              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-iron-red to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan-down_1.5s_ease-in-out_infinite]" />
            </div>
          ))}
        </div>
      </div> 
      */}

      <style>{`
        @keyframes scan-down {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

    </section>
  );
};

export default Sponsors;