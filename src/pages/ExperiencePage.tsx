import React from 'react';
import AdvancedScene from '../components/3d/AdvancedScene';

export default function ExperiencePage() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <AdvancedScene
                backgroundColor="#111827"
                ambientLightIntensity={0.6}
                directionalLightIntensity={0.8}
                cameraPosition={[0, 2, 10]}
                modelPath="/models/example.glb"
            />
        </div>
    );
} 