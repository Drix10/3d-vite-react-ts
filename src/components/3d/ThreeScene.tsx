import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

declare global {
    interface Navigator {
        deviceMemory?: number;
    }
}

interface ThreeSceneProps {
    backgroundColor?: string;
}

export default function ThreeScene({ backgroundColor = '#121212' }: ThreeSceneProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const [isLowPerformance, setIsLowPerformance] = useState(false);

    useEffect(() => {
        const checkPerformance = () => {
            const isMobile = 'ontouchstart' in window && window.innerWidth < 768;

            const hasLowRAM = navigator.deviceMemory !== undefined && navigator.deviceMemory < 4;

            setIsLowPerformance(isMobile || hasLowRAM);
        };

        checkPerformance();

        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: !isLowPerformance });
        renderer.setSize(width, height);
        renderer.setPixelRatio(isLowPerformance ? 1 : window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 10, 5);
        scene.add(directionalLight);

        const geometry = isLowPerformance
            ? new THREE.IcosahedronGeometry(2, 1)  
            : new THREE.IcosahedronGeometry(2, 2); 

        const material = new THREE.MeshStandardMaterial({
            color: 0x3366ff,
            metalness: 0.2,
            roughness: 0.5,
            flatShading: isLowPerformance
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const animate = () => {
            requestAnimationFrame(animate);

            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;

            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!mountRef.current) return;

            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [backgroundColor, isLowPerformance]);

    return <div ref={mountRef} className="three-scene" style={{ width: '100%', height: '100%' }} />;
} 