import { useRef, Suspense, useEffect } from 'react';
import { useGLTF, OrbitControls, Environment, PresentationControls } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';

interface ModelLoaderProps extends GroupProps {
    modelPath: string;
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    enableOrbitControls?: boolean;
    enablePresentationControls?: boolean;
    environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';
    onLoadingComplete?: () => void;
}

function Model({ modelPath, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], ...props }: ModelLoaderProps) {
    const { scene } = useGLTF(modelPath);
    const groupRef = useRef<Group>(null);

    return (
        <group ref={groupRef} {...props}>
            <primitive
                object={scene}
                scale={scale}
                position={position}
                rotation={rotation}
            />
        </group>
    );
}

export default function ModelLoader({
    modelPath,
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    enableOrbitControls = true,
    enablePresentationControls = false,
    environmentPreset = 'city',
    onLoadingComplete,
    ...props
}: ModelLoaderProps) {

    useEffect(() => {
        if (onLoadingComplete) {
            onLoadingComplete();
        }
    }, [onLoadingComplete]);

    const ModelWithControls = () => (
        <>
            {enablePresentationControls ? (
                <PresentationControls
                    global
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                    config={{ mass: 2, tension: 400 }}
                    snap={{ mass: 4, tension: 300 }}
                >
                    <Model
                        modelPath={modelPath}
                        scale={scale}
                        position={position}
                        rotation={rotation}
                        {...props}
                    />
                </PresentationControls>
            ) : (
                <Model
                    modelPath={modelPath}
                    scale={scale}
                    position={position}
                    rotation={rotation}
                    {...props}
                />
            )}

            {enableOrbitControls && !enablePresentationControls && (
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                />
            )}
        </>
    );

    return (
        <Suspense fallback={null}>
            <ModelWithControls />
            <Environment preset={environmentPreset} />
        </Suspense>
    );
} 