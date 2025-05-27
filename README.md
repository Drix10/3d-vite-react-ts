# 🚀 Vite React TypeScript 3D Template

A modern, production-ready template for building immersive 3D web experiences using React, Three.js, and TypeScript.

## ✨ Features

- **⚡ Vite** - Lightning fast build tool and dev server
- **⚛️ React 18** - Latest React with concurrent features
- **🔷 TypeScript** - Full type safety and IntelliSense
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🎭 Three.js** - 3D graphics library with React Three Fiber
- **🎬 GSAP** - Professional-grade animations
- **🎯 Framer Motion** - Smooth React animations
- **📱 Responsive Design** - Mobile-first approach
- **🎪 Interactive 3D Scenes** - Scroll-based animations and interactions
- **🔧 ESLint + TypeScript ESLint** - Code quality and consistency
- **🎨 Modern UI Components** - Pre-built sections and layouts

## 🏗️ Project Structure

```
src/
├── components/
│   ├── 3d/              # Three.js components
│   │   ├── AdvancedScene.tsx
│   │   ├── ModelLoader.tsx
│   │   ├── ScrollScene.tsx
│   │   └── ThreeScene.tsx
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MinimalLayout.tsx
│   ├── sections/        # Page sections
│   │   └── LandingHero.tsx
│   └── ui/              # Reusable UI components
├── context/             # React contexts
│   └── ThemeContext.tsx
├── hooks/               # Custom React hooks
│   ├── use3DAnimation.ts
│   ├── use3DInteraction.ts
│   ├── useScrollAnimation.ts
│   ├── useScrollToHash.ts
│   └── useToggle.ts
├── pages/               # Page components
├── styles/              # Global styles
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── modelManager.ts
│   └── three-helpers.ts
└── App.tsx              # Main application component
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or download this template**
   ```bash
   git clone <your-repo-url>
   cd vite-react-ts-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Adding 3D Models

1. Place your `.glb` or `.gltf` files in the `public/models/` directory
2. Update the `modelPath` prop in your 3D components
3. See `public/models/README.md` for model optimization tips

### Styling

- **Tailwind CSS**: Utility classes for rapid styling
- **Custom CSS**: Add global styles in `src/index.css`
- **Component Styles**: Use Tailwind classes or CSS modules

### 3D Scenes

- **ScrollScene**: Scroll-triggered 3D animations
- **AdvancedScene**: Interactive 3D scene with hover effects
- **ThreeScene**: Basic Three.js scene setup
- **ModelLoader**: Dynamic 3D model loading with carousel

## 🔧 Configuration

### Vite Configuration

The `vite.config.ts` includes optimizations for Three.js and related libraries.

### TypeScript Configuration

- `tsconfig.json` - Main TypeScript config
- `tsconfig.app.json` - App-specific config
- `tsconfig.node.json` - Node.js config for build tools

### Tailwind Configuration

Customize your design system in `tailwind.config.js`.

## 📱 Responsive Design

The template is built mobile-first with responsive breakpoints:

- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+
- `2xl`: 1536px+

## 🎯 Performance Optimization

- **Code Splitting**: Dynamic imports for 3D components
- **Asset Optimization**: Compressed textures and models
- **Bundle Analysis**: Use `npm run build` to analyze bundle size
- **Lazy Loading**: Suspense boundaries for 3D scenes

## 🔍 Troubleshooting

### Common Issues

1. **3D Models not loading**: Check file paths and formats
2. **Performance issues**: Reduce polygon count and texture sizes
3. **Build errors**: Run `npm run type-check` to identify TypeScript issues

### Browser Compatibility

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## 📚 Learning Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) - 3D graphics library
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React renderer for Three.js
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

**Happy coding! 🎉**
