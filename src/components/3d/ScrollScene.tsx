import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useFloatingAnimation } from '../../hooks/use3DAnimation';
import { ModelManager } from '../../utils/modelManager';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSceneProps {
    height?: number | string;
    backgroundColor?: string;
    pin?: boolean;
    modelPath?: string;
}

function Scene({ progress = 0, modelPath }: { progress?: number; modelPath?: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [model, setModel] = useState<THREE.Group | null>(null);

    useEffect(() => {
        if (!modelPath) return;

        const modelManager = ModelManager.getInstance();
        modelManager.loadModel(
            modelPath,
            undefined,
            (loadedModel) => {
                setModel(loadedModel);
            }
        );

        return () => {
            if (model) {
                modelManager.dispose(model);
            }
        };
    }, [modelPath]);

    useFloatingAnimation(meshRef, 0.1);

    useEffect(() => {
        if (!meshRef.current) return;

        meshRef.current.rotation.y = progress * Math.PI * 2;
        meshRef.current.position.y = Math.sin(progress * Math.PI) * 2;
        const scale = 1 + progress;
        meshRef.current.scale.set(scale, scale, scale);
    }, [progress]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <mesh ref={meshRef} scale={[1, 1, 1]}>
                {model ? (
                    <primitive object={model} />
                ) : (
                    <>
                        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                        <meshStandardMaterial color="#6366f1" metalness={0.6} roughness={0.2} />
                    </>
                )}
            </mesh>
            <gridHelper args={[20, 20, "#4338ca", "#6366f1"]} />
            <OrbitControls enableZoom={false} enablePan={false} />
        </>
    );
}

export default function ScrollScene({
    height = '200vh',
    backgroundColor = '#030712',
    pin = true,
    modelPath
}: ScrollSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [cameraPos, setCameraPos] = useState<[number, number, number]>([0, 0, 10]);

    useEffect(() => {
        if (!containerRef.current || !pin) return;

        const sceneElement = document.querySelector('.sticky-scene');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                pin: sceneElement,
                pinSpacing: true,
                markers: false,
                onUpdate: (self) => {
                    const prog = self.progress;
                    setProgress(prog);

                    const cameraPositions: Array<[number, number, number]> = [
                        [0, 0, 10],
                        [5, 2, 8],
                        [0, 4, 5],
                        [-5, 2, 8],
                        [0, 0, 10],
                    ];

                    const segmentCount = cameraPositions.length - 1;
                    const segmentProgress = prog * segmentCount;
                    const segmentIndex = Math.floor(segmentProgress);
                    const segmentWeight = segmentProgress - segmentIndex;

                    const startPos = cameraPositions[segmentIndex] || cameraPositions[0];
                    const endPos = cameraPositions[Math.min(segmentIndex + 1, cameraPositions.length - 1)];

                    const x = startPos[0] + (endPos[0] - startPos[0]) * segmentWeight;
                    const y = startPos[1] + (endPos[1] - startPos[1]) * segmentWeight;
                    const z = startPos[2] + (endPos[2] - startPos[2]) * segmentWeight;

                    setCameraPos([x, y, z]);
                }
            }
        });

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
        };
    }, [pin]);

    return (
        <div
            ref={containerRef}
            className="scroll-container"
            style={{
                height,
                position: 'relative',
                background: backgroundColor,
                overflow: 'hidden'
            }}
        >
            <div
                className="sticky-scene"
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100%'
                }}
            >
                <Canvas
                    camera={{ position: cameraPos, fov: 45 }}
                    shadows
                    gl={{ antialias: true, alpha: false }}
                    dpr={[1, 2]}
                >
                    <Scene progress={progress} modelPath={modelPath} />
                </Canvas>

                <div className="scroll-hint">
                    Scroll to animate
                </div>
            </div>
        </div>
    );
} 