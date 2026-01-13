import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

// Data from your reference image
const CONTACT_DATA = [
  {
    title: "PHONE",
    value: "+91 85830 00996",
    link: "tel:+918583000996",
    icon: "lucide:phone",
  },
  {
    title: "EMAIL",
    value: "indiapentaverse@gmail.com",
    link: "mailto:indiapentaverse@gmail.com",
    icon: "lucide:mail",
  },
  {
    title: "WHATSAPP",
    value: "Chat on WhatsApp",
    link: "https://wa.me/918583000996",
    icon: "lucide:message-circle",
  },
  {
    title: "LINKEDIN",
    value: "pentaverse-india",
    link: "https://linkedin.com/in/pentaverse-india",
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
          color="#06C755"
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

    // 2. Grid Animation (Fixed: Uses fromTo to guarantee visibility)
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
          start: "top 85%", // Triggers earlier so space isn't empty
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
          accentColor={"text-line-green"}
          withScrollTrigger={false}
        />
      </div>

      <div className="flex flex-col lg:flex-row flex-grow w-full relative z-10">
        
        {/* --- LEFT: 3D SPHERE --- */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-auto relative flex items-center justify-center">
          {/* Decorative Glow Behind Sphere */}
          <div className="absolute w-[300px] h-[300px] bg-line-green/20 blur-[100px] rounded-full" />
          
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#06C755" />
            <Environment preset="city" />
            <HoloCore />
          </Canvas>
        </div>


        {/* --- RIGHT: 2x2 GRID (Fills the empty space) --- */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 flex flex-col justify-center pb-20 lg:pb-0">
          
          {/* THE GRID */}
          <div id="contact-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
            {CONTACT_DATA.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="contact-card group relative bg-line-gray/80 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden hover:border-line-green transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(6,199,85,0.2)]"
              >
                {/* Browser Window Header Bar */}
                <div className="h-8 bg-black/40 border-b border-white/10 flex items-center px-3 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-line-green/10 flex items-center justify-center text-line-green group-hover:bg-line-green group-hover:text-black transition-colors duration-300">
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

          {/* QR Code Section (Bottom Right) */}
          <div className="mt-12 flex justify-center md:justify-end opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4 bg-black/30 p-4 border border-white/10 rounded-xl">
               <div className="text-right hidden md:block">
                 <p className="font-mono text-[10px] text-line-green">SCAN_FOR_ACCESS</p>
                 <p className="text-xs text-white">ID: #PV_2026</p>
               </div>
               <div className="w-12 h-12 bg-white p-1 rounded-sm">
                 <Icon icon="lucide:qr-code" className="w-full h-full text-black" />
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;