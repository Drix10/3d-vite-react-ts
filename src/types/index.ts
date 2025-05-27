import { ReactNode, CSSProperties } from 'react';

// Base component props interface
export interface ComponentBaseProps {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

// 3D Scene related types
export interface SceneProps extends ComponentBaseProps {
    camera?: {
        position?: [number, number, number];
        fov?: number;
        near?: number;
        far?: number;
    };
    lighting?: {
        ambient?: number;
        directional?: {
            intensity?: number;
            position?: [number, number, number];
        };
    };
    fog?: {
        color?: string;
        near?: number;
        far?: number;
    };
}

// Model loading types
export interface ModelProps extends ComponentBaseProps {
    modelUrl: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
    castShadow?: boolean;
    receiveShadow?: boolean;
    onLoad?: () => void;
    onError?: (error: Error) => void;
}

// Animation types
export interface AnimationConfig {
    duration?: number;
    delay?: number;
    ease?: string;
    repeat?: number;
    yoyo?: boolean;
}

// Theme types
export interface ThemeConfig {
    isDarkMode: boolean;
    toggleTheme: () => void;
    theme: 'light' | 'dark';
}

// Hook return types
export interface Use3DAnimationReturn {
    startAnimation: (config?: AnimationConfig) => void;
    stopAnimation: () => void;
    pauseAnimation: () => void;
    resumeAnimation: () => void;
    isAnimating: boolean;
}

export interface UseScrollAnimationReturn {
    scrollProgress: number;
    isInView: boolean;
    elementRef: React.RefObject<HTMLElement>;
}

export interface Use3DInteractionReturn {
    isHovered: boolean;
    isClicked: boolean;
    setInteractivity: (enabled: boolean) => void;
    handlePointerOver: (event: any) => void;
    handlePointerOut: (event: any) => void;
    handleClick: (event: any) => void;
}

// Utility types
export type Vector3 = [number, number, number];
export type Euler = [number, number, number];
export type Color = string | number;

// Performance types
export interface PerformanceConfig {
    quality: 'low' | 'medium' | 'high';
    adaptiveQuality: boolean;
    maxFPS: number;
    enableStats: boolean;
}

// Error boundary types
export interface ErrorInfo {
    componentStack: string;
} 