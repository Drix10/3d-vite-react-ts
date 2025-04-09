import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ThreeSceneProps {
    color?: string;
    size?: number;
    rotationSpeed?: number;
    geometry?: 'box' | 'sphere' | 'torus';
}

export default function ThreeScene({
    color = '#5454eb',
    size = 2,
    rotationSpeed = 1,
    geometry = 'box'
}: ThreeSceneProps) {
    const meshRef = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * rotationSpeed;
            meshRef.current.rotation.y += delta * rotationSpeed * 0.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            {geometry === 'box' && <boxGeometry args={[size, size, size]} />}
            {geometry === 'sphere' && <sphereGeometry args={[size / 2, 32, 32]} />}
            {geometry === 'torus' && <torusGeometry args={[size / 2, size / 8, 16, 100]} />}
            <meshStandardMaterial color={color} />
        </mesh>
    );
} 