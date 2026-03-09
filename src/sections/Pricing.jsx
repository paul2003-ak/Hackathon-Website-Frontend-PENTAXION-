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
    title: "MARK L", 
    prize: "₹20,000",
    perks: [
      { text: "Silver Certificate", icon: "lucide:award" },
      { text: "Runner-Up Trophy", icon: "lucide:trophy" },
      { text: "Event Swag Kit", icon: "lucide:gift" },
      { text: "Internship Opportunity", icon: "lucide:briefcase" }
    ],
    highlight: false,
  },
  {
    id: "1st-place",
    rank: "WINNER",
    title: "MARK LXXXV", 
    prize: "₹30,000",
    perks: [
      { text: "Gold Certificate of Excellence", icon: "lucide:award" },
      { text: "Championship Trophy", icon: "lucide:trophy" },
      { text: "Premium Swags", icon: "lucide:package-open" },
      { text: "Investor Pitch Access", icon: "lucide:presentation" },
      { text: "Incubation Support", icon: "lucide:rocket" }
    ],
    highlight: true, 
  },
  {
    id: "3rd-place",
    rank: "3RD PLACE",
    title: "MARK XLIV", 
    prize: "₹10,000",
    perks: [
      { text: "Bronze Certificate", icon: "lucide:award" },
      { text: "Excellence Trophy", icon: "lucide:trophy" },
      { text: "Event Swag Kit", icon: "lucide:gift" },
      { text: "Mentorship Session", icon: "lucide:users" }
    ],
    highlight: false,
  },
];

const Pricing = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="prizes" className="relative min-h-screen bg-line-dark py-20 overflow-hidden flex flex-col items-center">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
      
      {/* --- ANIMATED HEADER SECTION --- */}
      <div className="relative w-full flex flex-col items-center justify-center text-center mb-20 pt-10 z-10">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,31,31,0.15)_0%,transparent_70%)] rounded-full pointer-events-none -z-10" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[350px] h-[280px] md:h-[350px] border border-dashed border-white/10 rounded-full pointer-events-none -z-10 animate-[spin_20s_linear_infinite] will-change-transform" style={{ transform: "translate(-50%, -50%) translateZ(0)" }} />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[280px] h-[220px] md:h-[280px] border-2 border-dotted border-iron-red/20 rounded-full pointer-events-none -z-10 animate-[spin_15s_linear_infinite_reverse] will-change-transform" style={{ transform: "translate(-50%, -50%) translateZ(0)" }} />

        {/* Subtitle with Line */}
        <div className="flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-iron-red"></span>
            <p className="text-xs md:text-sm font-mono font-bold tracking-[0.3rem] uppercase text-iron-red animate-pulse">
                MISSION BOUNTIES
            </p>
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-iron-red"></span>
        </div>

        {/* Main Title */}
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

        {/* Total Prize Pool */}
        <div className="inline-flex items-center gap-4 border border-iron-red bg-[#1a0505] px-6 py-3 shadow-[0_0_20px_rgba(255,31,31,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-iron-red/20 to-transparent -translate-x-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
            <Icon icon="lucide:banknote" className="text-iron-red text-2xl md:text-3xl animate-pulse" />
            <div className="flex flex-col text-left relative z-10">
                <span className="text-[10px] font-mono text-iron-red tracking-[0.2em] leading-none mb-1">TOTAL_BOUNTY_POOL</span>
                <span className="text-2xl md:text-3xl font-black text-white leading-none">₹60,000</span>
            </div>
        </div>

      </div>

      {/* --- CARDS CONTAINER --- */}
      <div className="container mx-auto px-6 md:px-10 z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {PRIZE_DATA.map((item) => (
            <div
              key={item.id}
              className={`prize-card relative flex flex-col p-8 rounded-2xl border transition-all duration-500 group
                ${item.highlight 
                  ? "bg-iron-red/10 border-iron-red scale-100 md:scale-110 shadow-[0_0_30px_rgba(255,31,31,0.25)] z-20 order-first md:order-none" 
                  // UPGRADE: Added full hover glow and scale effect for 2nd and 3rd place
                  : "bg-[#0a0a0a] border-white/10 hover:border-iron-red hover:bg-iron-red/10 hover:shadow-[0_0_30px_rgba(255,31,31,0.25)] hover:scale-[1.02] hover:z-30 z-10"
                }
              `}
            >
              {/* Rank Badge */}
              <div className={`absolute -top-5 left-1/2 -translate-x-1/2 py-2 px-6 font-black font-mono text-sm tracking-widest uppercase rounded-sm shadow-lg whitespace-nowrap transition-all duration-300
                ${item.highlight 
                  ? "bg-iron-red text-black shadow-[0_0_20px_#FF1F1F]" 
                  // UPGRADE: Badge turns red and glows on hover
                  : "bg-gray-800 text-gray-400 border border-white/20 group-hover:bg-iron-red group-hover:text-black group-hover:shadow-[0_0_20px_#FF1F1F] group-hover:border-iron-red"
                }
              `}>
                {item.rank}
              </div>

              {/* Header */}
              <div className="mt-6 mb-8 border-b border-white/10 pb-6 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-300 uppercase tracking-tighter mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                
                {/* UPGRADE: Prize Text turns glowing red on hover */}
                <div className={`text-4xl md:text-6xl font-black mt-4 transition-all duration-300 
                  ${item.highlight ? 'text-iron-red text-glow' : 'text-white group-hover:text-iron-red group-hover:text-glow'}
                `}>
                  {item.prize}
                </div>
              </div>

              {/* Perks List */}
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {item.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Icon 
                      icon={perk.icon} 
                      className={`text-lg min-w-[18px] transition-colors duration-300 ${item.highlight ? 'text-iron-red' : 'text-gray-500 group-hover:text-iron-red'}`} 
                    />
                    <span className="font-mono uppercase tracking-tight text-xs md:text-sm group-hover:text-white transition-colors">{perk.text}</span>
                  </li>
                ))}
              </ul>

              {/* Action / Status */}
              <div className={`w-full py-4 text-center font-mono font-bold text-[10px] md:text-xs tracking-widest uppercase border-t transition-colors duration-300 
                ${item.highlight 
                  ? 'border-iron-red text-iron-red' 
                  // UPGRADE: Status text and border turn red on hover
                  : 'border-white/10 text-gray-500 group-hover:border-iron-red group-hover:text-iron-red'
                }
              `}>
                STATUS: WAITING_FOR_CHAMPION
              </div>

              {/* Decorative Corners */}
              <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-300 ${item.highlight ? 'border-iron-red' : 'border-white/20 group-hover:border-iron-red'}`} />
              <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-300 ${item.highlight ? 'border-iron-red' : 'border-white/20 group-hover:border-iron-red'}`} />

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Pricing;