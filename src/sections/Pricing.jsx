import { useRef } from "react";
import HackerText from "../components/HackerText"; 
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRIZE_DATA = [
  {
    id: "2nd-place",
    rank: "2ND PLACE",
    title: "WAR MACHINE", 
    prize: "₹10,000",
    perks: [
      "Silver Certificate",
      "Runner-Up Trophy",
      "Event Swag Kit",
      "Internship Opportunity"
    ],
    highlight: false,
  },
  {
    id: "1st-place",
    rank: "WINNER",
    title: "MARK LXXXV", 
    prize: "₹15,000",
    perks: [
      "Gold Certificate of Excellence",
      "Championship Trophy",
      "Premium Swag Box",
      "Investor Pitch Access",
      "Incubation Support"
    ],
    highlight: true, 
  },
  {
    id: "3rd-place",
    rank: "3RD PLACE",
    title: "MARK I", 
    prize: "₹7,000",
    perks: [
      "Bronze Certificate",
      "Excellence Trophy",
      "Event Swag Kit",
      "Mentorship Session"
    ],
    highlight: false,
  },
];

const Pricing = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Animate the Cards
    gsap.fromTo(".prize-card", 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse" 
        },
      }
    );

    // 2. Animate the HUD Rings (Spinning effect)
    gsap.to(".reactor-ring", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear"
    });
    
    gsap.to(".reactor-ring-reverse", {
      rotation: -360,
      duration: 15,
      repeat: -1,
      ease: "linear"
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="prizes" className="relative min-h-screen bg-line-dark py-20 overflow-hidden flex flex-col items-center">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
      
      {/* --- ANIMATED HEADER SECTION --- */}
      <div className="relative w-full flex flex-col items-center justify-center text-center mb-16 pt-10 z-10">
        
        {/* 1. Arc Reactor Background Glow (Fixed Z-Index) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-iron-red/10 blur-[80px] rounded-full pointer-events-none -z-10" />

        {/* 2. Spinning HUD Rings */}
        <div className="reactor-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[350px] h-[280px] md:h-[350px] border border-dashed border-white/10 rounded-full pointer-events-none -z-10" />
        <div className="reactor-ring-reverse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[280px] h-[220px] md:h-[280px] border-2 border-dotted border-iron-red/20 rounded-full pointer-events-none -z-10" />

        {/* 3. Subtitle with Line */}
        <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-iron-red"></span>
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.3rem] uppercase text-iron-red animate-pulse">
                MISSION BOUNTIES
            </p>
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-iron-red"></span>
        </div>

        {/* 4. Main Title */}
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 justify-center items-center">
                <span className="text-stroke-white text-transparent">
                    <HackerText text="PRIZE" />
                </span>
                <span className="text-white text-glow">
                    <HackerText text="POOL" />
                </span>
            </div>
        </h2>

        {/* 5. Description */}
        <p className="font-mono text-gray-400 max-w-sm md:max-w-lg mx-auto leading-relaxed text-sm md:text-base px-4">
            {`// CLAIM YOUR GLORY`}
            <br />
            <span className="text-white/60">Top innovators will be rewarded with funding and resources.</span>
        </p>
      </div>


      {/* --- CARDS CONTAINER --- */}
      <div className="container mx-auto px-6 md:px-10 z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {PRIZE_DATA.map((item) => (
            <div
              key={item.id}
              // FIX: Mobile scaling (scale-100) vs Desktop scaling (scale-110)
              className={`prize-card relative flex flex-col p-8 rounded-2xl border transition-all duration-500 group
                ${item.highlight 
                  ? "bg-iron-red/10 border-iron-red scale-100 md:scale-110 shadow-[0_0_60px_rgba(255,31,31,0.25)] z-20 order-first md:order-none" 
                  : "bg-white/5 border-white/10 hover:border-iron-red/50 hover:bg-black/40 z-10"
                }
              `}
            >
              {/* Rank Badge */}
              <div className={`absolute -top-5 left-1/2 -translate-x-1/2 py-2 px-6 font-black font-mono text-sm tracking-widest uppercase rounded-sm shadow-lg whitespace-nowrap
                ${item.highlight 
                  ? "bg-iron-red text-black shadow-[0_0_20px_#FF1F1F]" 
                  : "bg-gray-800 text-gray-400 border border-white/20"
                }
              `}>
                {item.rank}
              </div>

              {/* Header */}
              <div className="mt-6 mb-8 border-b border-white/10 pb-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-tighter mb-2">{item.title}</h3>
                <div className={`text-4xl md:text-6xl font-black ${item.highlight ? 'text-iron-red text-glow' : 'text-white'}`}>
                  {item.prize}
                </div>
              </div>

              {/* Perks List */}
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {item.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Icon 
                      icon="lucide:trophy" 
                      className={`text-lg min-w-[18px] ${item.highlight ? 'text-iron-red' : 'text-gray-500 group-hover:text-iron-red transition-colors'}`} 
                    />
                    <span className="font-mono uppercase tracking-tight text-xs md:text-sm">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Action / Status */}
              <div className={`w-full py-4 text-center font-mono font-bold text-[10px] md:text-xs tracking-widest uppercase border-t 
                ${item.highlight ? 'border-iron-red text-iron-red' : 'border-white/10 text-gray-500'}
              `}>
                STATUS: WAITING_FOR_CHAMPION
              </div>

              {/* Decorative Corners */}
              <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${item.highlight ? 'border-iron-red' : 'border-white/20 group-hover:border-iron-red'}`} />
              <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${item.highlight ? 'border-iron-red' : 'border-white/20 group-hover:border-iron-red'}`} />

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Pricing;