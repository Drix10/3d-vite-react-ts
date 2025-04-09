import { useState } from 'react';
import { motion } from 'framer-motion';
import ModelLoader from '../3d/ModelLoader';
import Section from './Section';

interface Model {
    id: string;
    name: string;
    description: string;
    path: string;
    options: {
        scale: number;
        position: { x: number; y: number; z: number };
        rotation: { x: number; y: number; z: number };
        backgroundColor: string;
        autoRotate: boolean;
    };
}

export default function ModelDemoSection() {
    const [activeModel, setActiveModel] = useState<string>('model1');

    // Example models (replace with your actual models)
    const models: Record<string, Model> = {
        model1: {
            id: 'model1',
            name: 'Geometric Shape',
            description: 'A simple geometric shape with colorful materials.',
            path: '/models/geometric.glb',
            options: {
                scale: 1.5,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                backgroundColor: '#111827',
                autoRotate: true
            }
        },
        model2: {
            id: 'model2',
            name: 'Animated Character',
            description: 'An animated character with textures and rigging.',
            path: '/models/character.glb',
            options: {
                scale: 1.2,
                position: { x: 0, y: -1, z: 0 },
                rotation: { x: 0, y: Math.PI, z: 0 },
                backgroundColor: '#1E293B',
                autoRotate: true
            }
        },
        model3: {
            id: 'model3',
            name: 'Product Showcase',
            description: 'A detailed product model perfect for showcasing designs.',
            path: '/models/product.glb',
            options: {
                scale: 2,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                backgroundColor: '#0F172A',
                autoRotate: true
            }
        }
    };

    const activeModelData = models[activeModel];

    return (
        <Section id="models" title="3D Model Showcase">
            <div className="model-demo">
                <div className="model-tabs">
                    {Object.values(models).map((model) => (
                        <button
                            key={model.id}
                            className={`model-tab ${activeModel === model.id ? 'model-tab-active' : ''}`}
                            onClick={() => setActiveModel(model.id)}
                        >
                            {model.name}
                        </button>
                    ))}
                </div>

                <div className="model-content">
                    <div className="model-info">
                        <motion.h3
                            key={`title-${activeModel}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="model-title"
                        >
                            {activeModelData.name}
                        </motion.h3>

                        <motion.p
                            key={`desc-${activeModel}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="model-description"
                        >
                            {activeModelData.description}
                        </motion.p>
                    </div>

                    <div className="model-viewer">
                        <ModelLoader
                            key={activeModel}
                            modelPath={activeModelData.path}
                            scale={activeModelData.options.scale}
                            position={activeModelData.options.position}
                            rotation={activeModelData.options.rotation}
                            backgroundColor={activeModelData.options.backgroundColor}
                            autoRotate={activeModelData.options.autoRotate}
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
} 