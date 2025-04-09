import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createSampleScene } from '../../utils/sampleModelHelper';

interface ModelLoaderProps {
    modelPath: string;
    scale?: number;
    position?: { x: number; y: number; z: number };
    rotation?: { x: number; y: number; z: number };
    backgroundColor?: string;
    autoRotate?: boolean;
    className?: string;
}

export default function ModelLoader({
    modelPath,
    scale = 1,
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
    backgroundColor = '#111827',
    autoRotate = true,
    className = ''
}: ModelLoaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;
        containerRef.current.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = autoRotate;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const useFallback = modelPath.includes('example') || !modelPath.startsWith('/');

        if (useFallback) {
            createSampleScene(scene);
            setLoading(false);
        } else {
            const loader = new GLTFLoader();
            loader.load(
                modelPath,
                (gltf) => {
                    const model = gltf.scene;
                    model.scale.set(scale, scale, scale);
                    model.position.set(position.x, position.y, position.z);
                    model.rotation.set(rotation.x, rotation.y, rotation.z);
                    scene.add(model);
                    setLoading(false);
                },
                (xhr) => {
                    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
                },
                (err) => {
                    console.error('Error loading model:', err);
                    createSampleScene(scene);
                    setError('Using fallback 3D objects');
                    setLoading(false);
                }
            );
        }

        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();

            scene.traverse((object) => {
                if (object.userData.animate) {
                    object.userData.animate(0.01);
                }
            });

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [modelPath, scale, position, rotation, backgroundColor, autoRotate]);

    return (
        <div
            ref={containerRef}
            className={`model-loader ${className}`}
            style={{ width: '100%', height: '100%', position: 'relative', minHeight: '400px' }}
        >
            {loading && (
                <div className="model-loader-overlay">
                    <div className="model-loader-spinner">Loading...</div>
                </div>
            )}
            {error && (
                <div className="model-loader-message">{error}</div>
            )}
        </div>
    );
} 