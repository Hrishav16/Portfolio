import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "../hooks";

export default function LiquidDistortion() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <EffectComposer disableNormalPass>
      <Bloom 
        luminanceThreshold={0.5} 
        mipmapBlur 
        intensity={0.8} 
        levels={8} 
        resolutionScale={1}
      />
      {/* 
        A liquid distortion pass could be added here using a custom ShaderPass.
        For performance, we are prioritizing the cinematic Bloom which handles the "glow".
      */}
    </EffectComposer>
  );
}
