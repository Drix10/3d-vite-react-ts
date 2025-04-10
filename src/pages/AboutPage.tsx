import React from 'react';
import AdvancedScene from '../components/3d/AdvancedScene';

export default function AboutPage() {
    return (
        <div style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: 'white' }}>
                About Us
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <p style={{ fontSize: '1.125rem', color: 'white' }}>
                    We specialize in creating immersive 3D experiences for the web using modern technologies
                    like Three.js, React Three Fiber, and GSAP animations.
                </p>

                <div style={{ height: '400px', marginTop: '2rem' }}>
                    <AdvancedScene
                        backgroundColor="transparent"
                        ambientLightIntensity={0.4}
                        directionalLightIntensity={0.6}
                        interactive={true}
                    />
                </div>
            </div>
        </div>
    );
} 