import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "../shaders/HeroShaders";
import { useMouseTracking } from "../hooks/useMouseTracking";

export default function MorphingObject({ position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const mouse = useMouseTracking();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#83eaff") },
      uColor2: { value: new THREE.Color("#9c8cff") },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Interpolate mouse smoothly
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouse.current.x, mouse.current.y),
        0.1
      );
    }
    
    if (meshRef.current) {
      // Very slow rotation
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
