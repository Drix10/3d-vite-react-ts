import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Converts degrees to radians
 */
export function degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Creates a standard lighting setup for a Three.js scene
 */
export function createStandardLighting(scene: THREE.Scene): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Back light
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-1, 0.5, -1);
    scene.add(backLight);
}

/**
 * Creates a skydome background for a Three.js scene
 */
export function createSkyBackground(scene: THREE.Scene, color1: string = '#1e40af', color2: string = '#3b82f6'): void {
    const vertexShader = `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize(vWorldPosition + offset).y;
      gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
    }
  `;

    const uniforms = {
        topColor: { value: new THREE.Color(color1) },
        bottomColor: { value: new THREE.Color(color2) },
        offset: { value: 10 },
        exponent: { value: 0.6 }
    };

    const skyGeo = new THREE.SphereGeometry(1000, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
}

/**
 * Simplifies loading GLTF/GLB models with common settings
 */
export async function loadModel(
    loader: GLTFLoader,
    path: string,
    options: {
        scale?: number;
        position?: { x: number; y: number; z: number };
        rotation?: { x: number; y: number; z: number };
    } = {}
): Promise<THREE.Group> {
    const { scale = 1, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 } } = options;

    return new Promise((resolve, reject) => {
        loader.load(
            path,
            (gltf: GLTF) => {
                const model = gltf.scene;
                model.scale.set(scale, scale, scale);
                model.position.set(position.x, position.y, position.z);
                model.rotation.set(rotation.x, rotation.y, rotation.z);
                resolve(model);
            },
            undefined,
            (err: unknown) => {
                console.error('Error loading model:', err);
                reject(err);
            }
        );
    });
} 