import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import ThreeScene from './ThreeScene';

interface Hero3DProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
}

export default function Hero3D({
    title = "Welcome to 3D Landing",
    subtitle = "Create beautiful 3D experiences for the web",
    ctaText = "Get Started",
    ctaLink = "#features"
}: Hero3DProps) {
    return (
        <section className="w-full h-screen relative">
            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Suspense fallback={null}>
                        <Float
                            speed={1.5}
                            rotationIntensity={0.5}
                            floatIntensity={0.5}
                        >
                            <ThreeScene
                                geometry="sphere"
                                size={3}
                                color="#5380f4"
                                rotationSpeed={0.5}
                            />
                        </Float>
                        <Environment preset="city" />
                    </Suspense>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </div>

            {/* Semi-transparent overlay for better text readability on mobile */}
            <div className="absolute inset-0 bg-black bg-opacity-30 z-5 md:bg-opacity-0"></div>

            {/* Hero Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                    {title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl text-white drop-shadow-md">
                    {subtitle}
                </p>
                <a
                    href={ctaLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-lg"
                >
                    {ctaText}
                </a>
            </div>
        </section>
    );
} 