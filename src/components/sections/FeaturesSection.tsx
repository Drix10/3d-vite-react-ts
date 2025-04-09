import { useState } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from '../3d/ThreeScene';
import Section from './Section';

interface Feature {
    title: string;
    description: string;
    icon: string;
}

export default function FeaturesSection() {
    const [activeFeature, setActiveFeature] = useState<number | null>(null);

    const features: Feature[] = [
        {
            title: 'Interactive 3D Models',
            description: 'Import and display interactive 3D models with full control over lighting, materials and animations.',
            icon: '🔮'
        },
        {
            title: 'Spline Integration',
            description: 'Seamlessly integrate with Spline.design for easy 3D scene creation and management.',
            icon: '🎨'
        },
        {
            title: 'Animation System',
            description: 'Create smooth animations and transitions with Framer Motion and Three.js.',
            icon: '✨'
        },
        {
            title: 'Responsive Design',
            description: 'All 3D elements and UI components automatically adapt to different screen sizes.',
            icon: '📱'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <Section id="features" title="Features">
            <div className="features-grid">
                <motion.div
                    className="features-list"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`feature-card ${activeFeature === index ? 'feature-active' : ''}`}
                            variants={itemVariants}
                            onMouseEnter={() => setActiveFeature(index)}
                            onMouseLeave={() => setActiveFeature(null)}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="features-3d">
                    <ThreeScene backgroundColor="#111827" />
                </div>
            </div>
        </Section>
    );
} 