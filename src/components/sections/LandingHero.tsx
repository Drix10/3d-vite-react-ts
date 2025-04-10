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
            className="landing-hero"
            style={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                background: 'linear-gradient(to bottom, #111827, #1f2937)'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}
            >
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

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}
            >
                <div
                    style={{
                        textAlign: 'center',
                        maxWidth: '800px',
                        color: 'white'
                    }}
                >
                    <h1
                        ref={titleRef}
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            opacity: 0,
                            background: 'linear-gradient(to right, #8b5cf6, #6366f1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        {title}
                    </h1>

                    <p
                        ref={descriptionRef}
                        style={{
                            fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                            marginBottom: '2.5rem',
                            opacity: 0,
                            maxWidth: '600px',
                            margin: '0 auto 2.5rem auto'
                        }}
                    >
                        {description}
                    </p>

                    <a
                        ref={ctaRef}
                        href={ctaLink}
                        style={{
                            display: 'inline-block',
                            padding: '1rem 2.5rem',
                            backgroundColor: '#6366f1',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '1.125rem',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            opacity: 0,
                            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.5)'
                        }}
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

            <div className="scroll-indicator">
                <ChevronDown size={24} className="animate-bounce" color="white" />
                <p>Scroll to explore</p>
            </div>
        </section>
    );
} 