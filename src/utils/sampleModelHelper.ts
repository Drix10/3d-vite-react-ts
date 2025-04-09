import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

/**
 * Sample model paths for demonstration purposes
 */
export const modelPaths = {
    robot: '/models/robot.glb',
    car: '/models/car.glb',
    character: '/models/character.glb'
};

/**
 * Generates a simple cube model and exports it as a GLTF Blob
 * This is useful when you don't have access to external model files
 */
export function generateSampleCube(): Promise<Blob> {
    // Create a simple cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x5380f4,
        metalness: 0.5,
        roughness: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);

    // Create a scene and add the cube
    const scene = new THREE.Scene();
    scene.add(cube);

    // Add a light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Initialize exporter
    const exporter = new GLTFExporter();

    // Return promise that resolves with the model as a Blob
    return new Promise((resolve, reject) => {
        exporter.parse(
            scene,
            (gltf) => {
                const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
                resolve(blob);
            },
            (error) => {
                console.error('Error exporting GLTF:', error);
                reject(error);
            },
            { binary: false }
        );
    });
}

/**
 * Creates an object URL for a generated model
 * Example usage:
 * const modelUrl = await createSampleModelUrl();
 * <ModelLoader modelPath={modelUrl} />
 */
export async function createSampleModelUrl(): Promise<string> {
    try {
        const modelBlob = await generateSampleCube();
        return URL.createObjectURL(modelBlob);
    } catch (error) {
        console.error('Failed to create sample model URL:', error);
        throw error;
    }
}

/**
 * Cleans up a model URL created by createSampleModelUrl
 */
export function cleanupSampleModelUrl(url: string): void {
    URL.revokeObjectURL(url);
} 