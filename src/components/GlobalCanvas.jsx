import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import WebGLHeroScene from "./WebGLHeroScene";
import NeuralSceneWebGL from "./NeuralSceneWebGL";
import LiquidDistortion from "./LiquidDistortion";

export default function GlobalCanvas() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -5,
        pointerEvents: "none",
      }}
      camera={{ position: [0, 0, 10], fov: 45 }}
      dpr={[1, 2]}
      gl={{ 
        powerPreference: "high-performance",
        alpha: true,
        antialias: false
      }}
    >
      <Suspense fallback={null}>
        <WebGLHeroScene />
        <NeuralSceneWebGL />
        <LiquidDistortion />
      </Suspense>
    </Canvas>
  );
}
