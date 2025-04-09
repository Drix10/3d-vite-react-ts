import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import ThreeScene from '../3d/ThreeScene';
import Section from '../ui/Section';
import useScrollAnimation from '../../hooks/useScrollAnimation';

export default function AboutSection() {
    const [contentRef, isContentVisible] = useScrollAnimation<HTMLDivElement>({
        threshold: 0.2,
    });

    const [canvasRef, isCanvasVisible] = useScrollAnimation<HTMLDivElement>({
        threshold: 0.2,
    });

    return (
        <Section id="about" bgColor="bg-blue-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div
                    ref={contentRef}
                    className={`transition-all duration-1000 ${isContentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">About Our Platform</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        We're passionate about creating immersive 3D experiences for the web. Our platform enables you to build stunning landing pages with three-dimensional elements that engage your users like never before.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Using the latest web technologies like React Three Fiber and TailwindCSS, we provide a powerful yet easy-to-use template for building your next project.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mt-6">
                        <li>High-performance 3D rendering</li>
                        <li>Responsive design for all devices</li>
                        <li>Customizable components and themes</li>
                        <li>Built with modern web standards</li>
                    </ul>
                </div>

                <div
                    ref={canvasRef}
                    className={`h-[400px] transition-all duration-1000 ${isCanvasVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                >
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <Float
                            speed={1.5}
                            rotationIntensity={0.5}
                            floatIntensity={0.5}
                        >
                            <ThreeScene
                                geometry="torus"
                                size={1.5}
                                color="#3b82f6"
                                rotationSpeed={0.5}
                            />
                        </Float>
                        <Environment preset="sunset" />
                    </Canvas>
                </div>
            </div>
        </Section>
    );
} 