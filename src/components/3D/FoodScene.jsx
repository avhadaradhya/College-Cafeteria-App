import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei';
import { BurgerModel, PizzaModel, CoffeeModel } from './FoodModel';
import { useTheme } from '../../contexts/ThemeContext';

export default function FoodScene() {
  const { darkMode } = useTheme();

  return (
    <div className="h-[400px] w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={darkMode ? 0.3 : 0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={darkMode ? 0.5 : 1} 
          color={darkMode ? "#a1a1aa" : "#ffffff"} 
        />
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, -Math.PI / 6, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 250 }}
          >
            <group position={[0, 0, 0]} scale={1.2}>
              <BurgerModel position={[-2.5, 0, 0]} scale={0.6} />
              <PizzaModel position={[0, -0.5, 0]} scale={0.6} rotation={[0, Math.PI / 4, 0]} />
              <CoffeeModel position={[2.5, -0.5, 0]} scale={0.6} />
            </group>
          </PresentationControls>
          <Environment preset={darkMode ? "night" : "sunset"} />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
    </div>
  );
}
