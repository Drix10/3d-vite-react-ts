import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useRotatingAnimation } from '../../hooks/use3DAnimation';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

function FloatingGeometry() {
  const meshRef = useRef(null);
  useRotatingAnimation(meshRef, 0.2);

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial color="#6366f1" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}

interface LandingHeroProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function LandingHero({
  title = "3D Web Experience",
  description = "Immersive web experiences with React, Three.js, and GSAP",
  ctaText = "Explore",
  ctaLink = "#experience"
}: LandingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const elements = [titleRef.current, descriptionRef.current, ctaRef.current];

    gsap.fromTo(
      elements,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <FloatingGeometry />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
        <div className="text-center text-white max-w-4xl">
          <h1
            ref={titleRef}
            className="text-[clamp(2.5rem,8vw,5rem)] font-bold mb-6 opacity-0 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent"
          >
            {title}
          </h1>

          <p
            ref={descriptionRef}
            className="text-[clamp(1rem,4vw,1.5rem)] mb-10 opacity-0 max-w-2xl mx-auto"
          >
            {description}
          </p>

          <a
            ref={ctaRef}
            href={ctaLink}
            className="inline-block px-10 py-4 bg-indigo-500 text-white text-lg font-bold rounded-lg opacity-0 shadow-lg shadow-indigo-500/50 transition-all duration-300 hover:bg-indigo-600 hover:scale-105"
            onMouseOver={e => {
              gsap.to(e.currentTarget, {
                backgroundColor: '#4f46e5',
                scale: 1.05,
                duration: 0.2
              });
            }}
            onMouseOut={e => {
              gsap.to(e.currentTarget, {
                backgroundColor: '#6366f1',
                scale: 1,
                duration: 0.2
              });
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
        <ChevronDown size={24} className="animate-bounce mx-auto" />
        <p className="mt-2">Scroll to explore</p>
      </div>
    </section>
  );
}
