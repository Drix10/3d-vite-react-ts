import { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';
import ThreeScene from './3d/ThreeScene';

interface SplineProps {
    scene: string;
    className?: string;
    backgroundColor?: string;
}

export default function Spline({ scene, className = '', backgroundColor = '#111827' }: SplineProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const splineRef = useRef<Application | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        try {
            setLoading(true);
            setError(null);
            const spline = new Application(canvas);
            splineRef.current = spline;
            spline
                .load(scene)
                .then(() => {
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error loading Spline scene:', err);
                    setError('Failed to load 3D scene');
                    setLoading(false);
                });
        } catch (err) {
            console.error('Error initializing Spline:', err);
            setError('Failed to initialize 3D scene');
            setLoading(false);
        }
        const handleResize = () => {
            if (splineRef.current) { }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (splineRef.current) {
                splineRef.current = null;
            }
        };
    }, [scene]);

    return (
        <div className={`spline-container ${className}`} style={{ width: '100%', height: '100%', position: 'relative', minHeight: '300px' }}>
            <canvas
                ref={canvasRef}
                className="spline-canvas"
                style={{ width: '100%', height: '100%', display: error ? 'none' : 'block' }}
            />
            {loading && (
                <div className="spline-loader">
                    <div className="spline-spinner">Loading...</div>
                </div>
            )}
            {error && (
                <div className="spline-fallback">
                    <ThreeScene backgroundColor={backgroundColor} />
                </div>
            )}
        </div>
    );
} 