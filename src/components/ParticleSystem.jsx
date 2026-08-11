import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseTracking } from "../hooks/useMouseTracking";

export default function ParticleSystem({ count = 10000 }) {
  const pointsRef = useRef(null);
  const mouse = useMouseTracking();
  const materialRef = useRef(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 3 + Math.random() * 10; // spread from radius 3 to 13
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  const originalPositions = useMemo(() => new Float32Array(particlesPosition), [particlesPosition]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.z = time * 0.02;

    const positions = pointsRef.current.geometry.attributes.position.array;
    
    // Very basic mouse interaction simulation 
    // Usually this is done in a shader for performance, doing it in JS for 10k points is slightly heavy but okay if simple.
    // For a cinematic portfolio, a custom shader material is better. Let's do a simple shader material for particles!
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    }
  });

  const shaderUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor: { value: new THREE.Color("#00ffa3") }
  }), []);

  const particleVertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    attribute vec3 originalPosition;
    varying float vDistance;
    
    void main() {
      vec3 pos = position;
      
      // Gentle wavy motion
      pos.x += sin(uTime * 0.5 + pos.y * 0.5) * 0.1;
      pos.y += cos(uTime * 0.5 + pos.x * 0.5) * 0.1;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      // Calculate distance for depth fading
      vDistance = -mvPosition.z;
      
      gl_Position = projectionMatrix * mvPosition;
      gl_PointSize = (10.0 / -mvPosition.z);
    }
  `;

  const particleFragmentShader = `
    uniform vec3 uColor;
    varying float vDistance;
    
    void main() {
      // Circle shape
      vec2 xy = gl_PointCoord.xy - vec2(0.5);
      float ll = length(xy);
      if(ll > 0.5) discard;
      
      // Soft edge
      float alpha = smoothstep(0.5, 0.1, ll);
      
      // Fade out based on distance
      alpha *= smoothstep(15.0, 5.0, vDistance);
      
      gl_FragColor = vec4(uColor, alpha * 0.6);
    }
  `;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-originalPosition"
          count={count}
          array={originalPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={shaderUniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
