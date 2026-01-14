import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRIZE_DATA = [
  {
    id: "2nd-place",
    rank: "2ND PLACE",
    title: "WAR MACHINE", // Heavy Hitter
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
    title: "MARK LXXXV", // The Ultimate Suit
    prize: "₹15,000",
    perks: [
      "Gold Certificate of Excellence",
      "Championship Trophy",
      "Premium Swag Box",
      "Investor Pitch Access",
      "Incubation Support"
    ],
    highlight: true, // Pops out as the main winner
  },
  {
    id: "3rd-place",
    rank: "3RD PLACE",
    title: "MARK I", // The Beginning
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
    gsap.fromTo(".prize-card", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", 
          toggleActions: "play none none reverse" 
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="prizes" className="relative min-h-screen bg-line-dark py-20 overflow-hidden">
      
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />

      <AnimatedHeaderSection
        subTitle={"MISSION BOUNTIES"}
        title={"PRIZE POOL"}
        text={`// CLAIM YOUR GLORY
Top innovators will be rewarded with funding and resources.`}
        textColor={"text-white"}
        accentColor={"text-iron-red"}
        withScrollTrigger={true}
      />

      <div className="container mx-auto px-6 md:px-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {PRIZE_DATA.map((item) => (
            <div
              key={item.id}
              className={`prize-card relative flex flex-col p-8 rounded-2xl border transition-all duration-500 group
                ${item.highlight 
                  ? "bg-iron-red/10 border-iron-red scale-105 shadow-[0_0_60px_rgba(255,31,31,0.25)] z-10 order-first md:order-none" 
                  : "bg-white/5 border-white/10 hover:border-iron-red/50 hover:bg-black/40"
                }
              `}
            >
              {/* Rank Badge */}
              <div className={`absolute -top-5 left-1/2 -translate-x-1/2 py-2 px-6 font-black font-mono text-sm tracking-widest uppercase rounded-sm shadow-lg
                ${item.highlight 
                  ? "bg-iron-red text-black shadow-[0_0_20px_#FF1F1F]" 
                  : "bg-gray-800 text-gray-400 border border-white/20"
                }
              `}>
                {item.rank}
              </div>

              {/* Header */}
              <div className="mt-6 mb-8 border-b border-white/10 pb-6 text-center">
                <h3 className="text-2xl font-bold text-gray-400 uppercase tracking-tighter mb-2">{item.title}</h3>
                <div className={`text-5xl md:text-6xl font-black ${item.highlight ? 'text-iron-red text-glow' : 'text-white'}`}>
                  {item.prize}
                </div>
              </div>

              {/* Perks List */}
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {item.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Icon 
                      icon="lucide:trophy" 
                      className={`text-lg ${item.highlight ? 'text-iron-red' : 'text-gray-500 group-hover:text-iron-red transition-colors'}`} 
                    />
                    <span className="font-mono uppercase tracking-tight">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Action / Status */}
              <div className={`w-full py-4 text-center font-mono font-bold text-xs tracking-widest uppercase border-t 
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