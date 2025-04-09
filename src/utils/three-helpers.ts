import * as THREE from 'three';

/**
 * Convert degrees to radians
 */
export const degToRad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
};

/**
 * Create a random color
 */
export const randomColor = (): string => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

/**
 * Calculate position on a circle
 */
export const positionOnCircle = (
    radius: number,
    angle: number,
    centerX = 0,
    centerY = 0
): [number, number] => {
    const x = centerX + radius * Math.cos(degToRad(angle));
    const y = centerY + radius * Math.sin(degToRad(angle));
    return [x, y];
};

/**
 * Get a normalized vector from two points
 */
export const getNormalizedVector = (
    fromX: number,
    fromY: number,
    fromZ: number,
    toX: number,
    toY: number,
    toZ: number
): THREE.Vector3 => {
    const direction = new THREE.Vector3(
        toX - fromX,
        toY - fromY,
        toZ - fromZ
    ).normalize();
    return direction;
};

/**
 * Smoothly interpolate between two values
 */
export const lerp = (start: number, end: number, amt: number): number => {
    return (1 - amt) * start + amt * end;
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
};

/**
 * Map a value from one range to another
 */
export const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}; 