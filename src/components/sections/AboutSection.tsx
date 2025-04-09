import { motion } from 'framer-motion';
import Section from './Section';
import Spline from '../Spline';

export default function AboutSection() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <Section id="about" title="About This Template">
            <div className="about-grid">
                <motion.div
                    className="about-content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                >
                    <h3 className="about-subtitle">Built for developers and designers</h3>
                    <p className="about-text">
                        This 3D landing page template combines the power of React, Three.js, and Framer Motion to
                        create immersive web experiences without the complexity. It's designed to be easy to customize
                        while providing advanced 3D capabilities.
                    </p>
                    <div className="about-features">
                        <div className="about-feature">
                            <span className="about-feature-icon">🚀</span>
                            <h4 className="about-feature-title">Fast Development</h4>
                            <p className="about-feature-text">Built with Vite for lightning-fast development</p>
                        </div>
                        <div className="about-feature">
                            <span className="about-feature-icon">🎮</span>
                            <h4 className="about-feature-title">Interactive</h4>
                            <p className="about-feature-text">Create interactive 3D experiences that engage users</p>
                        </div>
                        <div className="about-feature">
                            <span className="about-feature-icon">📦</span>
                            <h4 className="about-feature-title">All-in-One</h4>
                            <p className="about-feature-text">Everything you need to build stunning 3D websites</p>
                        </div>
                    </div>
                </motion.div>

                <div className="about-3d">
                    <Spline scene="https://example.spline.design/scene.splinecode" />
                </div>
            </div>
        </Section>
    );
} 