import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import MorphingObject from "./MorphingObject";
import ParticleSystem from "./ParticleSystem";
import { useScrollState } from "../hooks/useScrollState";

export default function WebGLHeroScene() {
  const groupRef = useRef(null);
  const scroll = useScrollState();

  useFrame(() => {
    if (!groupRef.current) return;
    
    // Parallax effect on scroll
    // When scroll.y increases, move the scene slightly down and scale it
    const scrollY = scroll.current.y;
    groupRef.current.position.y = scrollY * 0.005;
    groupRef.current.position.z = scrollY * 0.002;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Central Abstract Object */}
      <MorphingObject position={[0, 0, 0]} scale={1.2} />
      
      {/* Background Particles */}
      {/* 10000 particles is good for desktop, will adapt for mobile later */}
      <ParticleSystem count={10000} />
    </group>
  );
}
