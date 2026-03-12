import { useRef } from "react";
import HackerText from "../components/HackerText";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DUMMY DATA: Replace with your actual team ---
const TEAM_DATA = [
    {
        id: "OP-01",
        name: "AYAN K. PAUL",
        role: "LEAD SYSTEM ARCHITECT",
        clearance: "LEVEL_10",
        img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop",
        socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
        id: "OP-02",
        name: "SARAH CONNOR",
        role: "AI INITIATIVES HEAD",
        clearance: "LEVEL_08",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
        socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
        id: "OP-03",
        name: "DAVID REED",
        role: "CYBERSECURITY CHIEF",
        clearance: "LEVEL_09",
        img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
        id: "OP-04",
        name: "ELENA ROSTOV",
        role: "UX/UI COMMANDER",
        clearance: "LEVEL_07",
        img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
        socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
        id: "OP-05",
        name: "MARCUS VANCE",
        role: "BACKEND OPERATIVE",
        clearance: "LEVEL_06",
        img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
        socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
        id: "OP-06",
        name: "JULIA WONG",
        role: "FRONTEND SPECIALIST",
        clearance: "LEVEL_06",
        img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
        socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
        id: "OP-07",
        name: "ALEX MERCER",
        role: "DATA SCIENTIST",
        clearance: "LEVEL_07",
        img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
        socials: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
        id: "OP-08",
        name: "CHLOE PRICE",
        role: "COMMUNITY MANAGER",
        clearance: "LEVEL_05",
        img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
        socials: { github: "#", linkedin: "#", twitter: "#" }
    }
];

const CoreTeam = () => {
    const containerRef = useRef(null);
    const cardRefs = useRef([]);

    // --- STARK TECH 3D HOVER LOGIC ---
    const handleMouseMove = (e, index) => {
        if (window.innerWidth < 768) return; // Disable crazy 3D on mobile for better performance

        const card = cardRefs.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (-15 to +15 degrees)
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            ease: "power2.out",
            duration: 0.4
        });
    };

    const handleMouseLeave = (index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            ease: "elastic.out(1, 0.5)",
            duration: 0.8
        });
    };

    // --- ENTRY ANIMATION ---
    useGSAP(() => {
        gsap.fromTo(".team-card-wrapper",
            { y: 100, opacity: 0, rotationX: 45 },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="team" className="relative bg-[#050505] py-20 md:py-32 overflow-hidden flex flex-col items-center">

            {/* Background FX */}
            <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
            <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-iron-red/50 to-transparent shadow-[0_0_15px_#FF1F1F]" />

            {/* Header */}
            <div className="relative z-10 text-center mb-16 md:mb-24 w-full px-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-iron-red"></span>
                    <p className="text-xs md:text-sm font-mono font-bold tracking-[0.3rem] uppercase text-iron-red">
                        PERSONNEL LOGS
                    </p>
                    <span className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-iron-red"></span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white">
                    <HackerText text="CORE COMMAND" />
                </h2>
            </div>

            {/* 3D Grid Container */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 perspective-1000">

                    {TEAM_DATA.map((member, index) => (
                        <div
                            key={index}
                            // FIX: h-[320px] on mobile, h-[450px] on desktop
                            className="team-card-wrapper h-[320px] md:h-[450px] w-full"
                            style={{ perspective: "1000px" }}
                        >
                            <div
                                ref={(el) => (cardRefs.current[index] = el)}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                // preserve-3d is the magic class that makes layers pop out!
                                className="relative w-full h-full transform-style-3d group cursor-crosshair border border-white/10 bg-[#0a0a0a] hover:border-iron-red/50 transition-colors duration-500 rounded-lg"
                            >
                                {/* LAYER 1: The Image (Pushed BACK in 3D space) */}
                                <div className="absolute inset-0 overflow-hidden rounded-lg" style={{ transform: "translateZ(-20px)" }}>
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover opacity-50 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-80"
                                    />
                                    {/* Red Tech Overlay */}
                                    <div className="absolute inset-0 bg-iron-red/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                                </div>

                                {/* LAYER 2: Scanning Line Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,31,31,0.2)_50%,transparent_100%)] h-[15%] w-full animate-scan opacity-0 group-hover:opacity-100 pointer-events-none rounded-lg" />

                                {/* LAYER 3: HUD Elements (Floats FORWARD in 3D space) */}
                                <div
                                    // FIX: Reduced padding on mobile (p-4) so text fits nicely in the smaller box
                                    className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between pointer-events-none"
                                    style={{ transform: "translateZ(40px)" }} // Pushes text out toward the user
                                >
                                    {/* Top HUD */}
                                    <div className="flex justify-between items-start font-mono text-[10px] tracking-widest uppercase">
                                        <span className="text-iron-red">SYS_ID: {member.id}</span>
                                        <span className="text-green-500 animate-pulse">[ ONLINE ]</span>
                                    </div>

                                    {/* Bottom Info */}
                                    <div className="flex flex-col gap-1">
                                        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1 border-b border-white/10 pb-1 md:pb-2 inline-block w-max">
                                            CLR: {member.clearance}
                                        </span>
                                        <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-iron-red transition-colors duration-300 group-hover:text-glow">
                                            {member.name}
                                        </h3>
                                        <p className="font-mono text-xs md:text-sm text-gray-300 mt-1">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>

                                {/* LAYER 4: Hover Social Links (Floats VERY FORWARD in 3D space) */}
                                <div
                                    className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-col gap-2 md:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto"
                                    style={{ transform: "translateZ(60px)" }} // Pushes icons furthest out
                                >
                                    <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded border border-white/20 bg-black/50 flex items-center justify-center text-white hover:border-iron-red hover:text-iron-red transition-all">
                                        <Icon icon="mdi:linkedin" className="text-base md:text-lg" />
                                    </a>
                                    <a href={member.socials.github} target="_blank" rel="noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded border border-white/20 bg-black/50 flex items-center justify-center text-white hover:border-iron-red hover:text-iron-red transition-all">
                                        <Icon icon="mdi:github" className="text-base md:text-lg" />
                                    </a>
                                    <a href={member.socials.twitter} target="_blank" rel="noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded border border-white/20 bg-black/50 flex items-center justify-center text-white hover:border-iron-red hover:text-iron-red transition-all">
                                        <Icon icon="mdi:twitter" className="text-base md:text-lg" />
                                    </a>
                                </div>

                                {/* Targeting Corners */}
                                <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-transparent group-hover:border-iron-red transition-colors duration-300" style={{ transform: "translateZ(30px)" }} />
                                <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-transparent group-hover:border-iron-red transition-colors duration-300" style={{ transform: "translateZ(30px)" }} />
                                <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-transparent group-hover:border-iron-red transition-colors duration-300" style={{ transform: "translateZ(30px)" }} />
                                <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-transparent group-hover:border-iron-red transition-colors duration-300" style={{ transform: "translateZ(30px)" }} />
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default CoreTeam;