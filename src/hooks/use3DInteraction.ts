import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

type InteractionHandlers = {
    onPointerOver?: () => void;
    onPointerOut?: () => void;
    onPointerDown?: () => void;
    onPointerUp?: () => void;
    onClick?: () => void;
};

export function use3DInteraction(
    ref: React.MutableRefObject<THREE.Mesh | null>,
    highlightColor: number = 0x3b82f6,
    customHandlers: InteractionHandlers = {}
) {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const originalColorRef = useRef<THREE.Color | null>(null);
    const originalScaleRef = useRef<THREE.Vector3 | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const material = ref.current.material as THREE.MeshStandardMaterial;

        if (material && material.color) {
            originalColorRef.current = material.color.clone();
        }

        originalScaleRef.current = ref.current.scale.clone();

        if (ref.current) {
            ref.current.userData.isInteractive = true;
        }

        return () => {
            if (ref.current && originalColorRef.current) {
                const material = ref.current.material as THREE.MeshStandardMaterial;
                if (material && material.color) {
                    material.color.copy(originalColorRef.current);
                }
            }
        };
    }, [ref.current]);

    useEffect(() => {
        if (!ref.current || !originalColorRef.current) return;

        const material = ref.current.material as THREE.MeshStandardMaterial;

        if (!material || !material.color) return;

        if (isHovered) {
            gsap.to(material.color, {
                r: new THREE.Color(highlightColor).r,
                g: new THREE.Color(highlightColor).g,
                b: new THREE.Color(highlightColor).b,
                duration: 0.3
            });

            gsap.to(ref.current.scale, {
                x: originalScaleRef.current!.x * 1.05,
                y: originalScaleRef.current!.y * 1.05,
                z: originalScaleRef.current!.z * 1.05,
                duration: 0.3,
                ease: 'back.out(1.5)'
            });
        } else {
            gsap.to(material.color, {
                r: originalColorRef.current.r,
                g: originalColorRef.current.g,
                b: originalColorRef.current.b,
                duration: 0.3
            });

            gsap.to(ref.current.scale, {
                x: originalScaleRef.current!.x,
                y: originalScaleRef.current!.y,
                z: originalScaleRef.current!.z,
                duration: 0.3,
                ease: 'back.out(1.5)'
            });
        }

        if (isActive) {
            gsap.to(ref.current.scale, {
                y: originalScaleRef.current!.y * 0.95,
                duration: 0.1
            });
        }
    }, [isHovered, isActive, highlightColor]);

    // Handlers
    const handlePointerOver = () => {
        setIsHovered(true);
        if (customHandlers.onPointerOver) customHandlers.onPointerOver();
    };

    const handlePointerOut = () => {
        setIsHovered(false);
        setIsActive(false);
        if (customHandlers.onPointerOut) customHandlers.onPointerOut();
    };

    const handlePointerDown = () => {
        setIsActive(true);
        if (customHandlers.onPointerDown) customHandlers.onPointerDown();
    };

    const handlePointerUp = () => {
        if (isActive && isHovered && customHandlers.onClick) {
            customHandlers.onClick();
        }
        setIsActive(false);
        if (customHandlers.onPointerUp) customHandlers.onPointerUp();
    };

    return {
        isHovered,
        isActive,
        handlers: {
            onPointerOver: handlePointerOver,
            onPointerOut: handlePointerOut,
            onPointerDown: handlePointerDown,
            onPointerUp: handlePointerUp
        }
    };
} 