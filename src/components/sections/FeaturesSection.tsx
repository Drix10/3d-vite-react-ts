import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ThreeScene from '../3d/ThreeScene';
import Section from '../ui/Section';
import useScrollAnimation from '../../hooks/useScrollAnimation';

interface FeatureProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    geometry?: 'box' | 'sphere' | 'torus';
    color?: string;
}

const Feature = ({ title, description, geometry = 'box', color = '#5380f4' }: FeatureProps) => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={`flex flex-col items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="w-32 h-32 mb-6">
                <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <ThreeScene geometry={geometry} color={color} size={1.5} />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={2}
                    />
                    <Environment preset="sunset" />
                </Canvas>
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-center text-gray-600">{description}</p>
        </div>
    );
};

export default function FeaturesSection() {
    const features: FeatureProps[] = [
        {
            title: 'Interactive 3D Models',
            description: 'Engage your users with interactive 3D models that they can manipulate.',
            geometry: 'sphere',
            color: '#5380f4'
        },
        {
            title: 'Stunning Animations',
            description: 'Create eye-catching animations to bring your website to life.',
            geometry: 'box',
            color: '#f45380'
        },
        {
            title: 'Performance Optimized',
            description: 'Built with performance in mind so your 3D experiences run smoothly.',
            geometry: 'torus',
            color: '#53f480'
        }
    ];

    return (
        <Section id="features" bgColor="bg-gray-50">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Amazing Features</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Create stunning 3D experiences for the web with our powerful tools and components.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {features.map((feature, index) => (
                    <Feature key={index} {...feature} />
                ))}
            </div>
        </Section>
    );
} 