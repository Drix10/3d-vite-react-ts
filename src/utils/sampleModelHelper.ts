import * as THREE from 'three';

/**
 * Creates a sample cube with basic material
 */
export function createSampleCube(
    size: number = 1,
    color: string = '#3b82f6',
    position: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.3,
        roughness: 0.4
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position.x, position.y, position.z);
    return cube;
}

/**
 * Creates a sample sphere with basic material
 */
export function createSampleSphere(
    radius: number = 0.5,
    color: string = '#ec4899',
    position: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.7,
        roughness: 0.2
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(position.x, position.y, position.z);
    return sphere;
}

/**
 * Creates a torus knot with normal material for demonstration
 */
export function createTorusKnot(
    radius: number = 0.5,
    tube: number = 0.2,
    position: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
): THREE.Mesh {
    const geometry = new THREE.TorusKnotGeometry(radius, tube, 128, 32);
    const material = new THREE.MeshStandardMaterial({
        color: '#34d399',
        metalness: 0.5,
        roughness: 0.3
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.position.set(position.x, position.y, position.z);
    return torusKnot;
}

/**
 * Creates a sample scene with multiple objects
 */
export function createSampleScene(scene: THREE.Scene): void {
    const cube = createSampleCube(1, '#3b82f6', { x: -1.5, y: 0, z: 0 });
    const sphere = createSampleSphere(0.7, '#ec4899', { x: 0, y: 0, z: 0 });
    const torusKnot = createTorusKnot(0.5, 0.2, { x: 1.5, y: 0, z: 0 });
    scene.add(cube);
    scene.add(sphere);
    scene.add(torusKnot);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);

    cube.userData.animate = (delta: number) => {
        cube.rotation.x += delta * 0.5;
        cube.rotation.y += delta * 0.3;
    };
    sphere.userData.animate = (delta: number) => {
        sphere.rotation.y += delta * 0.2;
    };
    torusKnot.userData.animate = (delta: number) => {
        torusKnot.rotation.x += delta * 0.3;
        torusKnot.rotation.y += delta * 0.5;
    };
} 