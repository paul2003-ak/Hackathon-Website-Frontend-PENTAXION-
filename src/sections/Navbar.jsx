import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  // --- ANIMATION LOGIC ---
  useGSAP(() => {
    // Initial States
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set(linksRef.current, { x: 50, opacity: 0 });
    gsap.set(contactRef.current, { y: 20, opacity: 0 });

    // Menu Reveal Timeline
    tl.current = gsap.timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 0.6,
        ease: "power4.inOut",
      })
      .to(linksRef.current, {
        x: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "back.out(1.7)",
      }, "-=0.2")
      .to(contactRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
      }, "-=0.2");

    // Burger Icon Animation
    iconTl.current = gsap.timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 5,
        duration: 0.3,
        ease: "power2.inOut",
        // Updated to Iron Red
        backgroundColor: "#FF1F1F" 
      })
      .to(bottomLineRef.current, {
        rotate: -45,
        y: -5,
        duration: 0.3,
        ease: "power2.inOut",
        // Updated to Iron Red
        backgroundColor: "#FF1F1F"
      }, "<");
  }, []);

  // --- SCROLL DETECTION (Auto-Hide Burger) ---
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 50);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { id: "home", label: "PENTAXION" },
    { id: "services", label: "PROTOCOLS" },
    { id: "about", label: "ABOUT US" },
    { id: "tracks", label: "TRACKS" },
    { id: "contact", label: "CONTACT US" }
  ];

  return (
    <>
    {/* =========================================================
          NEW: LOGO SECTION (Added Top Left)
      ========================================================= */}
      <div 
        className={`fixed z-50 top-6 left-6 md:top-10 md:left-10 transition-transform duration-500 ${!showBurger && !isOpen ? "translate-y-[-200%]" : "translate-y-0"}`}
      >
        <a href="#home" className="flex items-center gap-4 group cursor-pointer">
           
           {/* Logo Image Container */}
           <div className="relative w-15 h-15 overflow-hidden rounded-md border border-white/20 group-hover:border-iron-red transition-all duration-300 bg-black/40 backdrop-blur-md z-10">
              <img src="/assets/pentexion.PNG" alt="Pentaverse Logo" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           </div>
           
           {/* Logo Text - NOW HIDDEN BY DEFAULT, REVEALS ON HOVER */}
           <div className="hidden md:flex flex-col leading-none opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
              <span className="font-mono font-bold text-lg text-white tracking-widest group-hover:text-iron-red transition-colors duration-300">PENTAVERSE</span>
              <span className="font-mono text-[9px] text-iron-red tracking-[0.4em] uppercase font-bold">INDIA</span>
           </div>
        </a>
      </div>

      {/* --- NAVIGATION PANEL --- */}
      <nav
        ref={navRef}
        // Updated Border to Red
        className="fixed top-0 right-0 z-40 flex flex-col justify-between w-full md:w-[600px] h-full px-8 md:px-16 py-24 bg-line-dark/90 backdrop-blur-xl border-l border-iron-red/30 shadow-[-50px_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        
        {/* === NEW BACKGROUND LAYERS === */}
        
        {/* 1. Iron Man Image Layer */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url("/assets/ironman.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center top", 
            filter: "grayscale(100%) contrast(1.3) brightness(0.7)",
            opacity: 0.4
          }}
        />

        {/* 2. Red HUD Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-iron-red/30 via-transparent to-line-dark/90 mix-blend-overlay" />

        {/* 3. Existing Grid Texture */}
        <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none z-0" />
        
        
        {/* Decorative Top Label Red */}
        <div className="absolute top-6 right-6 font-mono text-[10px] text-iron-red opacity-50 z-10">
          NAV_SYSTEM_V2.0 // ONLINE
        </div>

        {/* --- LINKS LIST --- */}
        <div className="flex flex-col gap-6 relative z-10">
          {navLinks.map((link, index) => (
            <div key={index} ref={(el) => (linksRef.current[index] = el)} className="group">
              <Link
                className="flex items-center gap-4 cursor-pointer"
                to={link.id}
                smooth
                offset={0}
                duration={1000}
                onClick={toggleMenu}
              >
                {/* Tech Bullet Point Red */}
                <span className="text-iron-red opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <Icon icon="lucide:chevron-right" />
                </span>
                
                {/* Text */}
                <span className="text-4xl md:text-5xl font-black text-transparent text-stroke-white group-hover:text-white group-hover:text-glow transition-all duration-300 uppercase tracking-tighter">
                  {link.label}
                </span>
              </Link>
              {/* Underline Decoration Red */}
              <div className="h-px w-full bg-white/10 mt-4 group-hover:bg-iron-red/50 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* --- CONTACT FOOTER --- */}
        <div ref={contactRef} className="relative z-10 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6">
            
            {/* Email Block */}
            <div className="font-mono">
              <p className="text-xs text-iron-red mb-1">[ SECURE_MAIL ]</p>
              <a href="mailto:indiapentaverse@gmail.com" className="text-lg text-white hover:text-iron-red transition-colors">
                indiapentaverse@gmail.com
              </a>
            </div>

            {/* Socials Block */}
            <div className="font-mono">
              <p className="text-xs text-iron-red mb-2">[ NETWORK_NODES ]</p>
              <div className="flex flex-wrap gap-4">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    // Updated Hover Colors to Red
                    className="text-xs px-3 py-1 border border-white/20 text-gray-400 hover:text-black hover:bg-iron-red hover:border-iron-red transition-all uppercase"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </nav>


      {/* --- ADVANCED BURGER BUTTON --- */}
      <div
        className={`fixed z-50 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 top-6 right-6 md:top-10 md:right-10 mix-blend-difference ${
          !showBurger && !isOpen ? "translate-y-[-200%]" : "translate-y-0"
        }`}
        onClick={toggleMenu}
      >
        {/* The Button Container */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center gap-1.5 group">
          
          {/* Animated Glowing Border (Red on Open/Hover) */}
          <div className={`absolute inset-0 border border-white/30 transition-all duration-300 ${isOpen ? 'rotate-90 scale-75 border-iron-red' : 'group-hover:border-iron-red group-hover:rotate-45'}`} />
          
          {/* The Lines */}
          <span
            ref={topLineRef}
            className="block w-8 h-[2px] bg-white transition-colors duration-300"
          ></span>
          <span
            ref={bottomLineRef}
            className="block w-8 h-[2px] bg-white transition-colors duration-300"
          ></span>
        </div>
        
        {/* Text Label under button */}
        <span className="absolute -bottom-6 font-mono text-[10px] text-white tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          {isOpen ? "CLOSE" : "MENU"}
        </span>
      </div>
    </>
  );
};

export default Navbar;