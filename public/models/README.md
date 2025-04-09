# 3D Models Directory

This directory is for storing 3D models that will be used in your landing page.

## Supported Formats

The template supports the following 3D model formats:
- GLTF/GLB (.gltf, .glb)
- OBJ (.obj)
- FBX (.fbx) - with limitations

## Using Models

To use a model in your project:

1. Place your model files in this directory
2. Import and use the `ModelLoader` component:

```tsx
import ModelLoader from '../components/3d/ModelLoader';

// In your Canvas component:
<ModelLoader 
  modelPath="/models/your-model.glb"
  scale={1.5}
  position={[0, 0, 0]}
  rotation={[0, 0, 0]}
  enableOrbitControls={true}
/>
```

## Resources for Free 3D Models

- [Sketchfab](https://sketchfab.com/features/free-3d-models)
- [Google Poly](https://poly.pizza/) (archive)
- [TurboSquid](https://www.turbosquid.com/Search/3D-Models/free)
- [Free3D](https://free3d.com/)

## Optimization Tips

- Use compressed formats like GLB when possible
- Keep polygon count low for better performance
- Use lower resolution textures for web
- Consider using the Draco compression for GLTFs 