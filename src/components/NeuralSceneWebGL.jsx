import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseTracking } from "../hooks/useMouseTracking";
import { useScrollState } from "../hooks/useScrollState";

export default function NeuralSceneWebGL() {
  const groupRef = useRef(null);
  const nodesRef = useRef(null);
  const linesRef = useRef(null);
  const mouse = useMouseTracking();
  const scroll = useScrollState();
  
  const nodeCount = 150;
  
  // Generate random positions for nodes
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);
    const color1 = new THREE.Color("#00ffa3");
    const color2 = new THREE.Color("#00d2ff");
    
    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8 - 15; // y (placed lower down the page)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5; // z
      
      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return { positions: pos, colors: col };
  }, []);
  
  // Generate connections (lines) between close nodes
  const linePositions = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const x1 = positions[i * 3], y1 = positions[i * 3 + 1], z1 = positions[i * 3 + 2];
        const x2 = positions[j * 3], y2 = positions[j * 3 + 1], z2 = positions[j * 3 + 2];
        const dist = Math.sqrt((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2);
        
        if (dist < 2.5) {
          lines.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }
    return new Float32Array(lines);
  }, [positions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Parallax effect
    const scrollY = scroll.current.y;
    // We only want the neural network to be visible when scrolled down far enough
    // Actually, we placed it globally, so we'll just move the camera or the group itself.
    // In this basic version, we just let it rotate slightly.
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
    groupRef.current.position.y = scrollY * 0.003;
    
    if (nodesRef.current) {
      nodesRef.current.rotation.x = mouse.current.y * 0.1;
      nodesRef.current.rotation.y = mouse.current.x * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.x = mouse.current.y * 0.1;
      linesRef.current.rotation.y = mouse.current.x * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={nodeCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={nodeCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors={true} transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#00ffa3" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}
