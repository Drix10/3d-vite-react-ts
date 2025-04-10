import React, { useState } from 'react';
import ModelLoader from '../components/3d/ModelLoader';

export default function ModelShowcasePage() {
    const sampleModels = [
        {
            name: "Example Model",
            path: "/models/example.glb",
            description: "A sample 3D model to demonstrate the model loader component."
        },
        {
            name: "Geometric Shapes",
            path: "/models/example2.glb",
            description: "A collection of geometric shapes rendered with ThreeJS."
        },
        {
            name: "Sample Objects",
            path: "/models/example3.glb",
            description: "Demo objects with different materials and lighting effects."
        }
    ];

    const [selectedModel, setSelectedModel] = useState(sampleModels[0]);
    const [autoRotate, setAutoRotate] = useState(true);
    const [backgroundColor, setBackgroundColor] = useState('#111827');

    return (
        <div className="section">
            <div className="container">
                <h1>3D Model Showcase</h1>
                <p className="section-description">
                    View interactive 3D models with customizable display options.
                </p>

                <div style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    marginTop: '24px',
                    marginBottom: '24px'
                }}>
                    {sampleModels.map((model, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedModel(model)}
                            className={`model-tab ${selectedModel.path === model.path ? 'model-tab-active' : ''}`}
                        >
                            {model.name}
                        </button>
                    ))}
                </div>

                <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '24px',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                            type="checkbox"
                            checked={autoRotate}
                            onChange={(e) => setAutoRotate(e.target.checked)}
                        />
                        Auto Rotate
                    </label>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label htmlFor="bgColor">Background:</label>
                        <input
                            id="bgColor"
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                        />
                    </div>
                </div>

                <div style={{ height: '500px', marginBottom: '40px' }}>
                    <ModelLoader
                        modelPath={selectedModel.path}
                        backgroundColor={backgroundColor}
                        autoRotate={autoRotate}
                    />
                </div>

                <div className="model-info">
                    <h2>{selectedModel.name}</h2>
                    <p>{selectedModel.description}</p>
                    <div style={{ marginTop: '20px' }}>
                        <h3>Interaction Guide</h3>
                        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                            <p>Drag to rotate the view</p>
                            <p>Scroll to zoom in and out</p>
                            <p>Double-click to reset the view</p>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
} 