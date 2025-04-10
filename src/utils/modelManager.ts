import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

type LoadingProgressCallback = (progress: number) => void;
type LoadingCompleteCallback = (model: THREE.Group) => void;
type LoadingErrorCallback = (error: Error) => void;

export class ModelManager {
    private static instance: ModelManager;
    private loader: GLTFLoader;
    private cache: Map<string, THREE.Group> = new Map();
    private loadingPromises: Map<string, Promise<THREE.Group>> = new Map();

    private constructor() {
        this.loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        this.loader.setDRACOLoader(dracoLoader);
    }

 
    public static getInstance(): ModelManager {
        if (!ModelManager.instance) {
            ModelManager.instance = new ModelManager();
        }
        return ModelManager.instance;
    }

    public loadModel(
        url: string,
        onProgress?: LoadingProgressCallback,
        onComplete?: LoadingCompleteCallback,
        onError?: LoadingErrorCallback,
        useCache: boolean = true
    ): Promise<THREE.Group> {
        if (useCache && this.cache.has(url)) {
            const cachedModel = this.cache.get(url)!.clone();
            if (onComplete) onComplete(cachedModel);
            return Promise.resolve(cachedModel);
        }

        if (this.loadingPromises.has(url)) {
            return this.loadingPromises.get(url)!.then(model => {
                const clonedModel = model.clone();
                if (onComplete) onComplete(clonedModel);
                return clonedModel;
            });
        }

        const promise = new Promise<THREE.Group>((resolve, reject) => {
            this.loader.load(
                url,
                (gltf) => {
                    const model = gltf.scene;

                    if (gltf.animations && gltf.animations.length > 0) {
                        model.userData.animations = gltf.animations;
                    }

                    if (useCache) {
                        this.cache.set(url, model.clone());
                    }

                    if (onComplete) onComplete(model);
                    resolve(model);

                    this.loadingPromises.delete(url);
                },
                (progress) => {
                    if (onProgress) {
                        const percentage = (progress.loaded / progress.total) * 100;
                        onProgress(percentage);
                    }
                },
                (errorEvent) => {
                    const error = new Error(
                        typeof errorEvent === 'string'
                            ? errorEvent
                            : `Failed to load model: ${url}`
                    );

                    console.error('Error loading model:', error);
                    if (onError) onError(error);
                    reject(error);

                    this.loadingPromises.delete(url);
                }
            );
        });

        this.loadingPromises.set(url, promise);

        return promise;
    }

    public preloadModels(
        urls: string[],
        onProgress?: (overallProgress: number) => void
    ): Promise<void> {
        const totalModels = urls.length;
        let loadedModels = 0;
        let totalProgress = 0;

        const updateProgress = () => {
            if (onProgress) {
                const overallProgress = totalProgress / totalModels;
                onProgress(overallProgress);
            }
        };

        const promises = urls.map(url =>
            this.loadModel(
                url,
                (progress) => {
                    totalProgress += progress / 100 / totalModels;
                    updateProgress();
                },
                () => {
                    loadedModels++;
                    updateProgress();
                }
            )
        );

        return Promise.all(promises).then(() => { });
    }

    public clearCache(urls?: string[]): void {
        if (urls) {
            urls.forEach(url => this.cache.delete(url));
        } else {
            this.cache.clear();
        }
    }

    public dispose(model?: THREE.Group): void {
        const disposeModel = (model: THREE.Group) => {
            model.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    if (object.geometry) {
                        object.geometry.dispose();
                    }

                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => disposeMaterial(material));
                        } else {
                            disposeMaterial(object.material);
                        }
                    }
                }
            });
        };

        const disposeMaterial = (material: THREE.Material) => {
            material.dispose();

            for (const key in material) {
                const value = (material as any)[key];
                if (value instanceof THREE.Texture) {
                    value.dispose();
                }
            }
        };

        if (model) {
            disposeModel(model);
        } else {
            this.cache.forEach(cachedModel => {
                disposeModel(cachedModel);
            });
            this.clearCache();
        }
    }
} 