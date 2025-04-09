import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene';

interface Hero3DProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
}

export default function Hero3D({ title, subtitle, ctaText, ctaLink }: Hero3DProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.2
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
        <section className="hero-3d" ref={heroRef}>
            <div className="hero-3d-content">
                <motion.div
                    className="hero-3d-text"
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.h1 variants={itemVariants}>{title}</motion.h1>
                    <motion.p variants={itemVariants} className="hero-3d-subtitle">{subtitle}</motion.p>
                    <motion.div variants={itemVariants}>
                        <a href={ctaLink} className="hero-3d-button">
                            {ctaText}
                        </a>
                    </motion.div>
                </motion.div>
            </div>
            <div className="hero-3d-canvas">
                <ThreeScene />
            </div>
        </section>
    );
} 