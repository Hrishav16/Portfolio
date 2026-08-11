import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core({ reducedMotion }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.12 + state.pointer.y * 0.25;
    mesh.current.rotation.y = t * 0.18 + state.pointer.x * 0.35;
    mesh.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.035);
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.2} floatIntensity={0.55}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.55, 5]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.9}
          roughness={0.18}
          chromaticAberration={0.06}
          distortion={0.18}
          distortionScale={0.25}
          transmission={1}
          ior={1.45}
          color="#9cecff"
        />
      </mesh>
    </Float>
  );
}

export default function WebGLHero({ reducedMotion }) {
  return (
    <div className="webgl-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        fallback={<div className="webgl-fallback" />}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 3, 4]} intensity={16} color="#8deaff" />
        <pointLight position={[-4, -2, 2]} intensity={10} color="#8d7cff" />
        <Core reducedMotion={reducedMotion} />
        <Sparkles
          count={reducedMotion ? 80 : 260}
          scale={[8, 6, 5]}
          size={1.4}
          speed={reducedMotion ? 0 : 0.22}
          opacity={0.55}
          color="#c7f6ff"
        />
      </Canvas>
    </div>
  );
}