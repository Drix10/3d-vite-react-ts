import React from 'react';

export default function ModelShowcasePage() {
    return (
        <div className="section">
            <div className="container">
                <h1>3D Model Showcase</h1>
                <p className="section-description">
                    This page would normally display a carousel of 3D models.
                </p>

                <div style={{
                    height: '400px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#111827',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    marginTop: '40px'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Model Carousel Component</h2>
                        <p>The ModelCarousel component has been removed from this template.</p>
                    </div>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'left' }}>
                    <h2>About This Page</h2>
                    <p>
                        This page is a placeholder for a 3D model showcase. You can implement your own 3D model viewer here.
                    </p>
                </div>
            </div>
        </div>
    );
} 