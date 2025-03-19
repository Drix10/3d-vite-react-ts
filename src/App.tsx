import React from 'react';
import { Canvas } from '@react-three/fiber';
import ThreeScene from './components/ThreeScene';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p>Start prompting (or editing) with Coslynx.com :)</p>
      <div className="w-[400px] h-[400px]">
        <Canvas
          camera={{ position: [0, 0, 5] }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <ThreeScene />
        </Canvas>
      </div>
    </div>
  );
}

export default App;