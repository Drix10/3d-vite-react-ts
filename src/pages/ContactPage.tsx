import React from 'react';
import AdvancedScene from '../components/3d/AdvancedScene';

export default function ContactPage() {
    return (
        <div style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: 'white' }}>
                Contact Us
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>Name</label>
                        <input
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '0.25rem',
                                color: 'white'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>Email</label>
                        <input
                            type="email"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '0.25rem',
                                color: 'white'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>Message</label>
                        <textarea
                            rows={5}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '0.25rem',
                                color: 'white',
                                resize: 'vertical'
                            }}
                        ></textarea>
                    </div>

                    <button
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#6366F1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'all 0.2s'
                        }}
                    >
                        Send Message
                    </button>
                </form>

                <div style={{ height: '400px' }}>
                    <AdvancedScene
                        backgroundColor="transparent"
                        ambientLightIntensity={0.4}
                        directionalLightIntensity={0.6}
                    />
                </div>
            </div>
        </div>
    );
} 