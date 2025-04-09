import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Button from '../ui/Button';
import ThreeScene from '../3d/ThreeScene';
import ModelLoader from '../3d/ModelLoader';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useProgress } from '@react-three/drei';
import { modelPaths } from '../../utils/sampleModelHelper';

// Loading indicator component for 3D models
function LoadingIndicator() {
    const { progress } = useProgress();
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-800 font-medium">Loading: {progress.toFixed(0)}%</p>
            </div>
        </div>
    );
}

export default function ModelDemoSection() {
    const [activeModelIndex, setActiveModelIndex] = useState(0);
    const [activeEnvironment, setActiveEnvironment] = useState('warehouse');
    const [isLoading, setIsLoading] = useState(true);
    const [geometry, setGeometry] = useState<'box' | 'sphere' | 'torus'>('box');

    // Define available models
    const models = [
        { name: 'Robot', path: modelPaths.robot },
        { name: 'Car', path: modelPaths.car },
        { name: 'Character', path: modelPaths.character }
    ];

    // Define environment options
    const environments = [
        { name: 'Warehouse', value: 'warehouse' },
        { name: 'Forest', value: 'forest' },
        { name: 'City', value: 'city' },
        { name: 'Studio', value: 'studio' }
    ];

    // Handle model selection
    const handleModelSelect = useCallback((index: number) => {
        setIsLoading(true);
        setActiveModelIndex(index);
    }, []);

    // Handle loading complete
    const handleLoadingComplete = useCallback(() => {
        setIsLoading(false);
    }, []);

    // Reset loading state when component mounts
    useEffect(() => {
        setIsLoading(true);
    }, []);

    return (
        <Section id="model-demo" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Interactive 3D Model Showcase
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Explore different 3D models and environments with our interactive viewer
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        className="lg:col-span-2 relative bg-gray-100 rounded-xl overflow-hidden"
                        style={{ height: '500px' }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {isLoading && <LoadingIndicator />}

                        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                            <ambientLight intensity={0.5} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                            {activeModelIndex === 3 ? (
                                <ThreeScene geometry={geometry} />
                            ) : (
                                <ModelLoader
                                    modelPath={models[activeModelIndex].path}
                                    onLoadingComplete={handleLoadingComplete}
                                />
                            )}

                            <OrbitControls enableZoom={true} enablePan={true} />
                            <Environment preset={activeEnvironment as any} />
                        </Canvas>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-lg"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-bold mb-4">Model Controls</h3>

                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-500 mb-2">SELECT MODEL</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {models.map((model, index) => (
                                    <Button
                                        key={index}
                                        variant={activeModelIndex === index ? 'primary' : 'outline'}
                                        size="sm"
                                        onClick={() => handleModelSelect(index)}
                                        className="w-full"
                                    >
                                        {model.name}
                                    </Button>
                                ))}
                                <Button
                                    variant={activeModelIndex === 3 ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => {
                                        setActiveModelIndex(3);
                                        setIsLoading(false);
                                    }}
                                    className="w-full"
                                >
                                    Basic Shapes
                                </Button>
                            </div>
                        </div>

                        {activeModelIndex === 3 && (
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-500 mb-2">SHAPE TYPE</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    <Button
                                        variant={geometry === 'box' ? 'primary' : 'outline'}
                                        size="sm"
                                        onClick={() => setGeometry('box')}
                                    >
                                        Cube
                                    </Button>
                                    <Button
                                        variant={geometry === 'sphere' ? 'primary' : 'outline'}
                                        size="sm"
                                        onClick={() => setGeometry('sphere')}
                                    >
                                        Sphere
                                    </Button>
                                    <Button
                                        variant={geometry === 'torus' ? 'primary' : 'outline'}
                                        size="sm"
                                        onClick={() => setGeometry('torus')}
                                    >
                                        Torus
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-500 mb-2">ENVIRONMENT</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {environments.map((env, index) => (
                                    <Button
                                        key={index}
                                        variant={activeEnvironment === env.value ? 'primary' : 'outline'}
                                        size="sm"
                                        onClick={() => setActiveEnvironment(env.value)}
                                    >
                                        {env.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-sm text-gray-600 mb-4">
                                Interact with the 3D model using your mouse:
                            </p>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>• <strong>Left-click + drag</strong>: Rotate the model</li>
                                <li>• <strong>Scroll</strong>: Zoom in/out</li>
                                <li>• <strong>Right-click + drag</strong>: Pan the camera</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
} 