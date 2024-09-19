import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf'); // Ensure the path is correct

  // Use useFrame to rotate the Earth continuously
  useFrame((state, delta) => {
    // Rotate around the Y-axis (in radians)
    earth.scene.rotation.y += delta * 0.1; // Adjust the speed of rotation here
  });

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
          autoRotate={true} // Set to false to allow manual rotation
        />
        <Earth />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
