import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { EuropeanCharacter } from './EuropeanCharacter';
import * as THREE from 'three';

interface SceneProps {
  scrollProgress: number; // passed from framer-motion useScroll in Hero
}

// Camera controller to animate camera based on scroll
const CameraController: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  useFrame((state) => {
    // Start camera far away (Europe) and move closer to character (Peru)
    const startZ = 15;
    const endZ = 8;
    const currentZ = startZ - (startZ - endZ) * scrollProgress;
    
    // Smooth camera movement
    state.camera.position.lerp(new THREE.Vector3(0, 2, currentZ), 0.1);
    state.camera.lookAt(0, 1, 0);
  });
  return null;
};

export const InterdimensionalScene: React.FC<SceneProps> = ({ scrollProgress }) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 15]} fov={50} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight 
          position={[-10, 20, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={2} 
          castShadow 
        />
        
        {/* HDRI Environment for hyper-realistic lighting */}
        <Environment preset="forest" background blur={scrollProgress} />
        
        {/* Interdimensional Stars / Dust */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* The character */}
        <EuropeanCharacter scrollProgress={scrollProgress} />

        {/* The Camera Controller */}
        <CameraController scrollProgress={scrollProgress} />
        
        {/* Placeholder terrain (Peru) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[100, 100, 32, 32]} />
          <meshStandardMaterial 
            color="#3d2e1f" 
            roughness={0.8}
            wireframe={scrollProgress < 0.5} // Simulates dimension shift from wireframe to solid
          />
        </mesh>
      </Canvas>
    </div>
  );
};
