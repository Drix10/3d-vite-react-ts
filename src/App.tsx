import { useState } from 'react';
import Layout from './components/layout/Layout';
import Example from './components/Example';
import ThreeScene from './components/3d/ThreeScene';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout title="React TypeScript Template">
      <div className="app-container">
        <h1>React + TypeScript + Vite Template</h1>
        <p>A lightweight starter template</p>

        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <Example />

        <div style={{ width: '100%', height: '400px', marginTop: '2rem' }}>
          <ThreeScene backgroundColor="#121212" />
        </div>
      </div>
    </Layout>
  );
}

export default App;