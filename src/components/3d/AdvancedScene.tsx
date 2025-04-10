import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { use3DInteraction } from '../../hooks/use3DInteraction';
import { useFloatingAnimation, useRotatingAnimation } from '../../hooks/use3DAnimation';
import { ModelManager } from '../../utils/modelManager';

interface AdvancedSceneProps {
    modelPath?: string;
    backgroundColor?: string;
    ambientLightIntensity?: number;
    directionalLightIntensity?: number;
    cameraPosition?: [number, number, number];
    interactive?: boolean;
}

function Model({
    path,
    position = [0, 0, 0],
    scale = 1,
    interactive = true
}: {
    path: string;
    position?: [number, number, number];
    scale?: number;
    interactive?: boolean;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [model, setModel] = useState<THREE.Group | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const modelManager = ModelManager.getInstance();

        modelManager.loadModel(
            path,
            (progress) => {
                console.log(`Loading: ${progress.toFixed(2)}%`);
            },
            (loadedModel) => {
                setModel(loadedModel);
                setLoading(false);
            },
            (error) => {
                console.error("Failed to load model:", error);
                setLoading(false);
            }
        );

        return () => {
            if (model) {
                modelManager.dispose(model);
            }
        };
    }, [path]);

    useFloatingAnimation(meshRef, 0.1);
    useRotatingAnimation(meshRef, 0.2, 'y');

    const { handlers, isHovered } = use3DInteraction(
        meshRef as React.MutableRefObject<THREE.Mesh | null>,
        0x3b82f6,
        {
            onClick: () => {
                console.log("Model clicked!");
            }
        }
    );

    if (!model) {
        return (
            <mesh ref={meshRef} position={position}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={loading ? "gray" : "red"} />
            </mesh>
        );
    }

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={[scale, scale, scale]}
            {...(interactive ? handlers : {})}
        >
            <primitive object={model} />
        </mesh>
    );
}

function Shapes({ count = 5, radius = 5, interactive = true }) {
    const shapes = [];
    const colors = [0x3b82f6, 0xec4899, 0x8b5cf6, 0x10b981, 0xf59e0b];
    const meshRefs = useRef<THREE.Mesh[]>([]);

    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.5;
        const color = colors[i % colors.length];

        shapes.push(
            <ShapeItem
                key={i}
                position={[x, y, z]}
                color={color}
                index={i}
                ref={(el: THREE.Mesh) => {
                    if (el) meshRefs.current[i] = el;
                }}
                interactive={interactive}
            />
        );
    }

    return <>{shapes}</>;
}

const ShapeItem = React.forwardRef(({
    position,
    color,
    index,
    interactive = true
}: {
    position: [number, number, number];
    color: number;
    index: number;
    interactive?: boolean;
}, ref) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const actualRef = (ref || meshRef) as React.MutableRefObject<THREE.Mesh>;

    const shape = index % 3;
    let geometry;

    if (shape === 0) {
        geometry = <boxGeometry args={[1, 1, 1]} />;
    } else if (shape === 1) {
        geometry = <sphereGeometry args={[0.7, 32, 32]} />;
    } else {
        geometry = <torusKnotGeometry args={[0.5, 0.2, 128, 32]} />;
    }

    useFloatingAnimation(actualRef, 0.2);

    const { handlers, isHovered } = use3DInteraction(
        actualRef as React.MutableRefObject<THREE.Mesh | null>,
        0xffffff
    );

    return (
        <mesh
            ref={actualRef}
            position={position}
            {...(interactive ? handlers : {})}
        >
            {geometry}
            <meshStandardMaterial
                color={new THREE.Color(color)}
                metalness={0.5}
                roughness={0.2}
            />
        </mesh>
    );
});

export default function AdvancedScene({
    modelPath,
    backgroundColor = '#111827',
    ambientLightIntensity = 0.5,
    directionalLightIntensity = 0.8,
    cameraPosition = [0, 2, 10],
    interactive = true
}: AdvancedSceneProps) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: backgroundColor
        }}>
            <Canvas shadows>
                <PerspectiveCamera
                    makeDefault
                    position={cameraPosition}
                    fov={45}
                    near={0.1}
                    far={1000}
                />

                <ambientLight intensity={ambientLightIntensity} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={directionalLightIntensity}
                    castShadow
                />

                <Shapes count={8} radius={6} interactive={interactive} />

                {modelPath && (
                    <Model path={modelPath} position={[0, 0, 0]} scale={1.5} interactive={interactive} />
                )}

                <Environment preset="city" />
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 6}
                />
            </Canvas>
        </div>
    );
} 