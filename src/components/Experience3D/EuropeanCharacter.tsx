import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface EuropeanCharacterProps {
  scrollProgress: number; // 0 to 1 value
}

export const EuropeanCharacter: React.FC<EuropeanCharacterProps> = ({ scrollProgress }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Simulate walking/floating based on time
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    
    // Rotate character slightly based on scroll
    meshRef.current.rotation.y = scrollProgress * Math.PI * 2;
    
    // Move character closer to camera as we scroll down
    meshRef.current.position.z = scrollProgress * 5; 
  });

  return (
    <group>
      {/* Placeholder for the Hyperrealistic European Astronaut */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <capsuleGeometry args={[0.5, 1.5, 4, 16]} />
        <meshStandardMaterial color="#e8dcc4" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
};
