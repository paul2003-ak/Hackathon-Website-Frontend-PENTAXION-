import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

// --- UPDATED DATA ---
// --- UPDATED DATA ---
const CONTACT_DATA = [
  {
    title: "DISCORD", 
    value: "Join the Server",
    link: "https://discord.gg/jh8FenPj2Y", 
    icon: "mdi:discord", 
  },
  {
    title: "INSTAGRAM",
    value: "Follow our Updates",
    link: "https://www.instagram.com/pentaverse_india", // <-- Put your actual Instagram link here!
    icon: "mdi:instagram", // <-- Official Instagram logo
  },
  {
    title: "WHATSAPP",
    value: "Chat on WhatsApp",
    link: "https://chat.whatsapp.com/GZ23lIdarTUG5odT5lxsPo",
    icon: "lucide:message-circle",
  },
  {
    title: "LINKEDIN",
    value: "pentaverse-india",
    link: "https://www.linkedin.com/company/pentaverse-india/posts/?feedView=all",
    icon: "lucide:linkedin",
  },
];

// --- 3D COMPONENT ---
const HoloCore = () => {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.y = t * 0.5;
  });

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={2.4}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#FF1F1F" 
          envMapIntensity={1}
          clearcoat={1}
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={3}
        />
      </mesh>
    </Float>
  );
};

const Contact = () => {
  useGSAP(() => {
    // 1. Header Animation
    gsap.from(".contact-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: "#contact", start: "top 80%" },
    });

    // 2. Grid Animation
    gsap.fromTo(".contact-card", 
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: "#contact-grid",
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section id="contact" className="relative min-h-screen bg-line-dark overflow-hidden flex flex-col pt-16 pb-10">
      
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="contact-header relative z-10 px-6 md:px-10 mb-8">
        <AnimatedHeaderSection
          subTitle={"ESTABLISH CONNECTION"}
          title={"CONTACT US"}
          text={`// SECURE CHANNEL OPEN
Got a question or a project idea? 
We'd love to hear from you.`}
          textColor={"text-white"}
          accentColor={"text-iron-red"}
          withScrollTrigger={false}
        />
      </div>

      <div className="flex flex-col lg:flex-row flex-grow w-full relative z-10">
        
        {/* --- LEFT: 3D SPHERE & QR CODE --- */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
          
          {/* 3D Sphere */}
          <div className="h-[400px] w-full relative flex items-center justify-center">
            {/* Decorative Glow Behind Sphere (Red) */}
            <div className="absolute w-[300px] h-[300px] bg-iron-red/20 blur-[100px] rounded-full" />
            
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF1F1F" />
                <Environment preset="city" />
                <HoloCore />
            </Canvas>
          </div>

          {/* QR Code Section */}
          <div className="mt-4 bg-white/5 border border-iron-red/30 p-4 rounded-xl backdrop-blur-md flex flex-col items-center text-center max-w-xs animate-pulse hover:animate-none transition-all">
               <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Join Bengal Chapter</h4>
               <p className="text-[10px] text-gray-400 font-mono mb-3">Scan for Official Groups</p>
               
               <div className="bg-white p-2 rounded-lg mb-3">
                   <img src="/assets/qr.png" alt="Bengal Chapter QR" className="w-32 h-32 object-contain" />
               </div>
               
               <div className="text-[10px] font-mono text-iron-red flex items-center gap-2">
                   <Icon icon="lucide:scan" /> SCAN_COMPLETE
               </div>
          </div>
        </div>


        {/* --- RIGHT: 2x2 GRID --- */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 flex flex-col justify-center pb-20 lg:pb-0 mt-10 lg:mt-0">
          
          {/* THE GRID */}
          <div id="contact-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
            {CONTACT_DATA.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="contact-card group relative bg-line-gray/80 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden hover:border-iron-red transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,31,31,0.2)]"
              >
                {/* Browser Window Header Bar */}
                <div className="h-8 bg-black/40 border-b border-white/10 flex items-center px-3 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-iron-red/10 flex items-center justify-center text-iron-red group-hover:bg-iron-red group-hover:text-black transition-colors duration-300">
                     <Icon icon={item.icon} width="24" />
                  </div>
                  
                  <div>
                    <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">
                      {item.title}
                    </h3>
                    <p className="font-bold text-white text-sm md:text-base break-words">
                      {item.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;