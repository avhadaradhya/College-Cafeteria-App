import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import { useTheme } from '../../contexts/ThemeContext';

// This component renders a 3D food model
// We're using a placeholder sphere since we don't have actual GLTF models
export default function FoodModel({ position, scale = 1, color = '#f97316', floatIntensity = 1 }) {
  const { darkMode } = useTheme();
  const meshRef = useRef();
  
  // Rotate the model
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.2} 
      floatIntensity={floatIntensity}
      position={position}
    >
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3} 
          metalness={0.2}
          emissive={darkMode ? color : '#000000'}
          emissiveIntensity={darkMode ? 0.2 : 0}
        />
      </mesh>
    </Float>
  );
}

// Fallback component if GLTF models are available
export function BurgerModel(props) {
  // In a real implementation, you would load an actual GLTF model
  // const { scene } = useGLTF('/models/burger.gltf');
  // return <primitive object={scene} {...props} />;
  
  return (
    <group {...props}>
      {/* Base bun */}
      <mesh position={[0, -0.5, 0]} scale={[1.2, 0.3, 1.2]}>
        <cylinderGeometry args={[1, 1.1, 1, 32]} />
        <meshStandardMaterial color="#e6b17e" roughness={0.6} />
      </mesh>
      
      {/* Patty */}
      <mesh position={[0, 0, 0]} scale={[1, 0.3, 1]}>
        <cylinderGeometry args={[0.9, 0.9, 1, 32]} />
        <meshStandardMaterial color="#5c3a21" roughness={0.7} />
      </mesh>
      
      {/* Cheese */}
      <mesh position={[0, 0.3, 0]} scale={[1.1, 0.1, 1.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffc72b" roughness={0.4} />
      </mesh>
      
      {/* Top bun */}
      <mesh position={[0, 0.7, 0]} scale={[1.2, 0.5, 1.2]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e6b17e" roughness={0.6} />
      </mesh>
    </group>
  );
}

export function PizzaModel(props) {
  return (
    <group {...props}>
      {/* Pizza base */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshStandardMaterial color="#e2c49f" roughness={0.6} />
      </mesh>
      
      {/* Sauce */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.05, 32]} />
        <meshStandardMaterial color="#b71c1c" roughness={0.5} />
      </mesh>
      
      {/* Cheese */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.05, 32]} />
        <meshStandardMaterial color="#ffd54f" roughness={0.4} />
      </mesh>
      
      {/* Pepperoni pieces */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.7 + Math.random() * 0.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const scale = 0.2 + Math.random() * 0.1;
        
        return (
          <mesh key={i} position={[x, 0.1, z]} rotation={[-Math.PI / 2, 0, 0]} scale={[scale, scale, 0.05]}>
            <cylinderGeometry args={[1, 1, 1, 16]} />
            <meshStandardMaterial color="#8f0000" roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

export function CoffeeModel(props) {
  return (
    <group {...props}>
      {/* Cup */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.5, 1.5, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      
      {/* Coffee */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.65, 0.45, 0.2, 32]} />
        <meshStandardMaterial color="#3e2723" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[0.9, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
    </group>
  );
}
