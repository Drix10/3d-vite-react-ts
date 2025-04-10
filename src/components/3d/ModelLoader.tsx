import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            const isMobileDevice = 'ontouchstart' in window && window.innerWidth < 768;
            setIsMobile(isMobileDevice);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

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
        const renderer = new THREE.WebGLRenderer({
            antialias: !isMobile,
            powerPreference: 'high-performance'
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.shadowMap.enabled = !isMobile;
        containerRef.current.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 1;
        controls.enablePan = false;
        controls.minDistance = 2;
        controls.maxDistance = 10;

        const ambientLight = new THREE.AmbientLight(0xffffff, isMobile ? 0.7 : 0.5);
        scene.add(ambientLight);
        if (!isMobile) {
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            directionalLight.castShadow = true;
            scene.add(directionalLight);

            const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
            backLight.position.set(-1, 0.5, -1);
            scene.add(backLight);
        } else {
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);
        }

        const loadingManager = new THREE.LoadingManager();
        const gltfLoader = new GLTFLoader(loadingManager);
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        gltfLoader.setDRACOLoader(dracoLoader);

        const useFallback = modelPath.includes('example') || !modelPath.startsWith('/');

        if (useFallback) {
            createSampleScene(scene);
            setLoading(false);
        } else {
            try {
                gltfLoader.load(
                    modelPath,
                    (gltf) => {
                        const model = gltf.scene;
                        model.scale.set(scale, scale, scale);
                        model.position.set(position.x, position.y, position.z);
                        model.rotation.set(rotation.x, rotation.y, rotation.z);
                        if (isMobile) {
                            model.traverse((node) => {
                                if (node instanceof THREE.Mesh) {
                                    if (node.material) {
                                        if (Array.isArray(node.material)) {
                                            node.material.forEach(mat => {
                                                mat.roughness = 0.7;
                                                mat.metalness = 0.3;
                                                mat.normalScale = new THREE.Vector2(0.5, 0.5);
                                            });
                                        } else {
                                            node.material.roughness = 0.7;
                                            node.material.metalness = 0.3;
                                            node.material.normalScale = new THREE.Vector2(0.5, 0.5);
                                        }
                                    }
                                }
                            });
                        }
                        scene.add(model);
                        setLoading(false);
                    },
                    (progress) => {
                        console.log((progress.loaded / progress.total) * 100 + '% loaded');
                    },
                    (err) => {
                        console.error('Error loading model:', err);
                        createSampleScene(scene);
                        setError('Using fallback 3D objects');
                        setLoading(false);
                    }
                );
            } catch (err) {
                console.error('Error initializing model loader:', err);
                setError('Failed to initialize 3D model loader');
                setLoading(false);
            }
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
            window.removeEventListener('resize', checkIfMobile);
            if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            dracoLoader.dispose();
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();

                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else if (object.material) {
                        object.material.dispose();
                    }
                }
            });
        };
    }, [modelPath, scale, position, rotation, backgroundColor, autoRotate, isMobile]);

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