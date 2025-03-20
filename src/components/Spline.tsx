'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

export default function SplineScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#2d2e32');

    // Perspective Camera for better depth perception
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.set(0, 0, 1000);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Load Spline Scene with Animations
    const loader = new SplineLoader();
    loader.load('https://prod.spline.design/tuL7yVjc16Ad1lX0/scene.splinecode', (splineScene) => {
      scene.add(splineScene);

      // Handle animations
      if (splineScene.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(splineScene);
        mixerRef.current = mixer;

        splineScene.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play();
        });
      }
    });

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.125;

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      controls.update();

      if (mixerRef.current) {
        mixerRef.current.update(clock.getDelta());
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handling
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
