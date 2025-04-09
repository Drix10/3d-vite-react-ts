# 3D Landing Page Template

A modern React template for building immersive 3D landing pages using Three.js, React Three Fiber, and TailwindCSS.

## Features

- 🚀 Vite for lightning-fast development
- ⚛️ React with TypeScript
- 🎨 TailwindCSS for styling
- 📦 Three.js and React Three Fiber for 3D rendering
- 🔄 Custom hooks for animations and scroll effects
- 📱 Responsive design out of the box
- 🎭 Spline integration for easy 3D scene creation

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/3d-landing-template.git
cd 3d-landing-template
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
/
├── public/            # Static assets
│   └── models/        # 3D model files (GLB, GLTF, etc.)
├── src/
│   ├── components/
│   │   ├── 3d/        # 3D-specific components
│   │   ├── layout/    # Layout components (Header, Footer, etc.)
│   │   ├── sections/  # Page sections (Hero, Features, etc.)
│   │   └── ui/        # UI components (Button, Section, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
└── ... (config files)
```

## Customization

### Changing Colors

Edit the `tailwind.config.js` file to customize the color palette.

### Adding 3D Models

1. Place your 3D model files in the `public/models/` directory
2. Use the `ModelLoader` component to load and display your models

```jsx
import ModelLoader from './components/3d/ModelLoader';

// Inside your component
<Canvas>
  <ModelLoader 
    modelPath="/models/your-model.glb" 
    scale={1.5} 
  />
</Canvas>
```

### Creating New Sections

Create new section components in the `src/components/sections/` directory and add them to your `App.tsx` file.

## Deployment

Build your production-ready site:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory, ready to be deployed to your hosting provider of choice.

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Drei](https://github.com/pmndrs/drei)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) 