import { useState } from 'react';
import Layout from './components/layout/Layout';
import Example from './components/Example';
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
      </div>
    </Layout>
  );
}

export default App;