// Bloom implemented via Three.js native addons — no external postprocessing package required
import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { useReducedMotion } from "../hooks";

export default function LiquidDistortion() {
  const reducedMotion = useReducedMotion();
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;

    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.6,   // strength
      0.4,   // radius
      0.55   // threshold
    );
    composer.addPass(bloom);
    composerRef.current = composer;

    return () => {
      composer.dispose();
      composerRef.current = null;
    };
  }, [gl, scene, camera, size, reducedMotion]);

  useFrame(() => {
    if (composerRef.current) {
      composerRef.current.render();
    }
  }, 1);

  return null;
}
