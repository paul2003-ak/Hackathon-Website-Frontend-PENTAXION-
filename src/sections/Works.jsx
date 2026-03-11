import { useRef, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TRACKS_DATA = [
  {
    id: "01",
    title: "Smart Cities & Sustainable Infrastructure",
    subtitle: "URBAN_PLANNING // AI_ARCHITECT",
    description: "Build the cities of tomorrow: AI-driven urban planning, energy-efficient skyscrapers, autonomous transport, and next-gen waste management. Become the architect of a smarter, sustainable world."
  },
  {
    id: "02",
    title: "Environment, Energy & Climate Action",
    subtitle: "RENEWABLE_GRID // ZERO_CARBON",
    description: "Power the planet with renewable energy grids, carbon-neutral innovations, pollution-busting tech, and eco-monitoring systems. Be a real-life Tony Stark saving the Earth."
  },
  {
    id: "03",
    title: "HealthTech & Well-being",
    subtitle: "AI_DIAGNOSTICS // MED_SYS",
    description: "Engineer AI diagnostics, telemedicine platforms, mental health support tools, and accessibility tech. Turn healthcare into a superhero's toolkit for life and well-being."
  },
  {
    id: "04",
    title: "Quality Education & Digital Learning",
    subtitle: "ED_TECH // FUTURE_SKILLS",
    description: "Forge edtech platforms, inclusive digital classrooms, and skill-up tools that equip the next generation of innovators to conquer the future."
  },
  {
    id: "05",
    title: "Fintech & Economic Empowerment",
    subtitle: "BLOCKCHAIN // DE_FI",
    description: "Design financial inclusion tech, blockchain transparency, microfinance solutions, and job creation platforms. Be the iron-clad engine powering economic growth."
  },
  {
    id: "06",
    title: "Social Impact & Equality",
    subtitle: "JUSTICE_SYS // CITIZEN_GOV",
    description: "Build solutions for women's safety, hunger eradication, rural empowerment, and citizen-driven governance. Be a guardian of equality and justice in the real world."
  },
  {
    id: "07",
    title: "Open Innovation",
    subtitle: "STARK_LAB // UNLIMITED",
    description: "No limits. No boundaries. Got a bold, out-of-the-box idea? If it solves a real problem and creates value, this is your Stark Lab to experiment, innovate, and unleash it."
  }
];

const HIGHLIGHTS_DATA = [
  { title: "36 Hours of Innovation", desc: "Collaborate, code, and create revolutionary prototypes." },
  { title: "Mentorship Rounds", desc: "Learn directly from industry professionals & community experts." },
  { title: "Tech Expo Zone", desc: "Showcase your prototype to developers, judges." },
  { title: "Mini Challenges", desc: "Surprise problem statements testing creativity and technical agility." },
  { title: "Innovation Awards", desc: "Recognition for best project, UI/UX design, sustainability impact & more." },
  { title: "Pitch Arena", desc: "Finalists present to a panel of innovators, entrepreneurs, and leaders." }
];

const Tracks = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  
  // State for Desktop Hover
  const [currentIndex, setCurrentIndex] = useState(null);
  // NEW: State for Mobile Accordion
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    // 1. Floating Card Movement
    moveX.current = gsap.quickTo(previewRef.current, "x", { duration: 0.8, ease: "power3.out" });
    moveY.current = gsap.quickTo(previewRef.current, "y", { duration: 0.8, ease: "power3.out" });

    // 2. Animate Tracks (Left Side List)
    gsap.from(".track-row", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { 
        trigger: "#tracks-list", 
        start: "top 85%" 
      }
    });

    // 3. Animate Highlights (The Grid)
    gsap.fromTo(".highlight-card", 
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)", 
        scrollTrigger: { 
          trigger: "#highlights-grid", 
          start: "top 90%",
        }
      }
    );
  }, []);

  // --- Interaction Handlers ---
  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);
    const el = overlayRefs.current[index];
    if (el) {
      gsap.to(el, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", duration: 0.3, ease: "power2.out" });
    }
    gsap.to(previewRef.current, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    const el = overlayRefs.current[index];
    if (el) {
      gsap.to(el, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", duration: 0.3, ease: "power2.in" });
    }
    gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.8, duration: 0.3 });
    setCurrentIndex(null);
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    moveX.current(e.clientX + 30); 
    moveY.current(e.clientY + 30);
  };

  // --- NEW: Mobile Tap Handler ---
  const handleMobileTap = (index) => {
    if (window.innerWidth >= 768) return; // Ignore on desktop
    // Toggle the clicked item. If it's already open, close it (set to null)
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="tracks" className="relative flex flex-col min-h-screen bg-line-dark pb-20 overflow-hidden" onMouseMove={handleMouseMove}>
      
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      {/* --- SECTION 1: TRACKS --- */}
      <div className="relative z-10">
        <AnimatedHeaderSection
          subTitle={"MISSION PROTOCOLS"}
          title={"TRACKS"}
          text={`// SELECT YOUR TARGET
Identify the problem. Deploy the solution. 
Build the future.`}
          textColor={"text-white"}
          accentColor={"text-iron-red"}
          withScrollTrigger={true}
        />
        
        <div id="tracks-list" className="relative flex flex-col mt-10 border-t border-white/10">
          {TRACKS_DATA.map((track, index) => (
            <div
              key={track.id}
              className="track-row relative flex flex-col gap-2 py-8 cursor-pointer group md:py-10 border-b border-white/10 overflow-hidden"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => handleMobileTap(index)} // Trigger mobile toggle on click
            >
              {/* --- DESKTOP HOVER OVERLAY --- */}
              <div
                ref={(el) => (overlayRefs.current[index] = el)}
                className="absolute inset-0 bg-iron-red/10 pointer-events-none clip-path-tech"
                style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
              />

              {/* --- MOBILE ACTIVE OVERLAY --- */}
              <div className={`absolute inset-0 bg-gradient-to-r from-iron-red/20 to-transparent transition-opacity duration-300 md:hidden pointer-events-none border-l-4 border-iron-red ${expandedIndex === index ? 'opacity-100' : 'opacity-0'}`} />

              <div className="relative px-6 md:px-12 flex flex-col z-10 w-full">
                
                {/* Title Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full pr-8 md:pr-0">
                  <div className="flex flex-col gap-1">
                    {/* Subtitle */}
                    <span className="font-mono text-iron-red text-sm md:text-base opacity-60">
                       // SECTOR_{track.id}
                    </span>
                    
                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase group-hover:text-glow transition-all">
                      {track.title}
                    </h2>
                  </div>
                  
                  {/* Desktop Hover Arrow */}
                  <div className="hidden md:block text-white opacity-20 group-hover:opacity-100 group-hover:text-iron-red group-hover:translate-x-4 transition-all duration-300">
                     <Icon icon="lucide:chevron-right" width="40" />
                  </div>
                </div>

                {/* Mobile Expand Icon (Chevron) */}
                <div className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 text-iron-red transition-transform duration-300 pointer-events-none">
                    <Icon 
                        icon="lucide:chevron-down" 
                        width="24" 
                        className={`transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : 'rotate-0'}`}
                    />
                </div>

                {/* --- NEW: MOBILE DROPDOWN DESCRIPTION --- */}
                {/* Using CSS Grid trick for buttery smooth height animation */}
                <div 
                    className={`grid transition-all duration-300 ease-in-out md:hidden ${
                        expandedIndex === index ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                >
                    <div className="overflow-hidden flex flex-col gap-2 border-t border-iron-red/20 pt-4">
                        <h4 className="font-mono text-iron-red text-xs tracking-widest">
                            {track.subtitle}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed font-light pr-4">
                            {track.description}
                        </p>
                    </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- FLOATING HOLOGRAPHIC CARD (Desktop) --- */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 z-50 pointer-events-none opacity-0 invisible hidden md:block"
      >
        {currentIndex !== null && (
          <div className="w-[450px] bg-black/90 backdrop-blur-xl border border-iron-red p-6 shadow-[0_0_30px_rgba(255,31,31,0.3)] rounded-br-3xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-iron-red" />
            <div className="absolute top-0 left-0 w-1 h-8 bg-iron-red" />
            
            <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
               <h3 className="font-mono text-white text-xl font-bold uppercase">
                 DATA_PACKET_{TRACKS_DATA[currentIndex].id}
               </h3>
               <Icon icon="lucide:cpu" className="text-iron-red animate-pulse" width="24" />
            </div>
            <h4 className="font-mono text-iron-red text-xs mb-2 tracking-widest">
              {TRACKS_DATA[currentIndex].subtitle}
            </h4>
            <p className="text-gray-200 text-lg leading-snug font-light">
              {TRACKS_DATA[currentIndex].description}
            </p>
          </div>
        )}
      </div>

      {/* --- SECTION 2: HIGHLIGHTS --- */}
      {/* ... keeping the highlights section unchanged below ... */}
      <div id="highlights-section" className="relative mt-32 px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-12 h-2 bg-iron-red shadow-[0_0_10px_#FF1F1F]" />
           <h2 className="text-4xl md:text-6xl font-black text-transparent text-stroke-white tracking-tighter uppercase">
             EVENT HIGHLIGHTS
           </h2>
        </div>

        <div id="highlights-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHTS_DATA.map((item, idx) => (
            <div 
              key={idx} 
              className="highlight-card group relative p-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-iron-red/50 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-2 h-2 bg-white/20 group-hover:bg-iron-red transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/20 group-hover:bg-iron-red transition-colors" />
              
              <div className="flex items-start gap-4">
                <div className="mt-1 text-iron-red">
                   <Icon icon="lucide:zap" width="24" /> 
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase mb-2 group-hover:text-iron-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Tracks;