import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
    className?: string;
    backgroundColor?: string;
}

export default function ThreeScene({
    className = '',
    backgroundColor = '#111827'
}: ThreeSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        containerRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(1, 1, 1);
        scene.add(dirLight);

        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            metalness: 0.3,
            roughness: 0.4
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.x = -1.5;
        scene.add(cube);

        const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0xec4899,
            metalness: 0.7,
            roughness: 0.2
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);

        const torusGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 128, 32);
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: 0x34d399,
            metalness: 0.5,
            roughness: 0.3
        });
        const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
        torusKnot.position.x = 1.5;
        scene.add(torusKnot);

        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            sphere.rotation.y += 0.01;

            torusKnot.rotation.x += 0.01;
            torusKnot.rotation.y += 0.01;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            cubeGeometry.dispose();
            cubeMaterial.dispose();
            sphereGeometry.dispose();
            sphereMaterial.dispose();
            torusGeometry.dispose();
            torusMaterial.dispose();
            renderer.dispose();
        };
    }, [backgroundColor]);

    return <div ref={containerRef} className={`three-scene ${className}`} style={{ width: '100%', height: '100%', minHeight: '300px' }} />;
} 