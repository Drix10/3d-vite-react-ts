import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function createStandardLighting(scene: THREE.Scene): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-1, 0.5, -1);
    scene.add(backLight);
}

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

export function createDemoScene(
    scene: THREE.Scene,
    options: {
        count?: number;
        radius?: number;
        colors?: string[];
        speed?: number;
    } = {}
): () => void {
    const {
        count = 8,
        radius = 3,
        colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'],
        speed = 1,
    } = options;

    const objects: THREE.Mesh[] = [];
    const group = new THREE.Group();
    scene.add(group);

    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.5;

        let geometry: THREE.BufferGeometry = new THREE.BoxGeometry(1, 1, 1);
        switch (i % 4) {
            case 0:
                geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case 1:
                geometry = new THREE.SphereGeometry(0.7, 32, 32);
                break;
            case 2:
                geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 64, 16);
                break;
            case 3:
                geometry = new THREE.IcosahedronGeometry(0.8, 0);
                break;
        }

        const material = new THREE.MeshStandardMaterial({
            color: colors[i % colors.length],
            metalness: 0.5,
            roughness: 0.3,
        });

        const object = new THREE.Mesh(geometry, material);
        object.position.set(x, y, z);
        object.userData.initialPosition = { x, y, z };
        object.userData.speed = 0.5 + Math.random() * 0.5;
        object.userData.phase = Math.random() * Math.PI * 2;
        objects.push(object);
        group.add(object);
    }

    const clock = new THREE.Clock();
    const animate = () => {
        const time = clock.getElapsedTime() * speed;

        objects.forEach((object, index) => {
            const initialPos = object.userData.initialPosition;
            const objectSpeed = object.userData.speed;
            const phase = object.userData.phase;

            object.position.y = initialPos.y + Math.sin(time * objectSpeed + phase) * 0.5;

            object.rotation.x = time * objectSpeed * 0.3;
            object.rotation.y = time * objectSpeed * 0.5;
        });

        group.rotation.y = time * 0.1;

        requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
        cancelAnimationFrame(animationId);
        objects.forEach(object => {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
            } else {
                object.material.dispose();
            }
        });
        scene.remove(group);
    };
} 