import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

export const signalFieldProfile = {
  ringCount: 14,
  maxPixelRatio: 1.5,
  disablesOnCompactViewport: true,
  respectsReducedMotion: true,
} as const;

type SignalRing = {
  position: [number, number, number];
  rotation: [number, number, number];
  radius: number;
  tube: number;
  opacity: number;
};

function SignalTunnel() {
  const tunnelRef = useRef<Group>(null);
  const pulseRef = useRef<Group>(null);
  const rings = useMemo<SignalRing[]>(
    () =>
      Array.from({ length: signalFieldProfile.ringCount }, (_, index) => {
        const depth = 4 - index * 2.45;
        const radius = 1.5 + index * 0.28;
        return {
          position: [Math.sin(index * 1.7) * 0.26, Math.cos(index * 1.15) * 0.18, depth],
          rotation: [index * 0.25, index * 0.4, index * 0.17],
          radius,
          tube: 0.018 + (index % 3) * 0.004,
          opacity: Math.max(0.15, 0.5 - index * 0.022),
        };
      }),
    [],
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = Math.min(1, window.scrollY / scrollRange);

    if (tunnelRef.current) {
      tunnelRef.current.rotation.z = time * 0.026 + scrollProgress * 1.05;
      tunnelRef.current.rotation.x = Math.sin(time * 0.13) * 0.09 + scrollProgress * 0.13;
      tunnelRef.current.position.z = scrollProgress * 10.8;
      tunnelRef.current.position.x = Math.sin(time * 0.1) * 0.16;
    }
    if (pulseRef.current) {
      const scale = 0.76 + Math.sin(time * 1.15) * 0.08;
      pulseRef.current.scale.setScalar(scale);
      pulseRef.current.rotation.x = time * 0.22;
      pulseRef.current.rotation.y = time * 0.34;
    }
  });

  return (
    <group ref={tunnelRef}>
      {rings.map((ring, index) => (
        <mesh key={index} position={ring.position} rotation={ring.rotation}>
          <torusGeometry args={[ring.radius, ring.tube, 6, 72]} />
          <meshBasicMaterial color={index % 4 === 0 ? "#ff4a13" : "#efeae1"} transparent opacity={ring.opacity} />
        </mesh>
      ))}
      <group ref={pulseRef} position={[0, 0, -2.6]}>
        <mesh rotation={[0.55, 0.2, 0]}>
          <icosahedronGeometry args={[0.56, 1]} />
          <meshBasicMaterial color="#ff4a13" wireframe transparent opacity={0.78} />
        </mesh>
        <mesh scale={1.72} rotation={[0.2, 0.4, 0]}>
          <icosahedronGeometry args={[0.56, 1]} />
          <meshBasicMaterial color="#f3f0ea" wireframe transparent opacity={0.18} />
        </mesh>
      </group>
    </group>
  );
}

export default function SignalField() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 760px)");
    const update = () => setEnabled(!reducedMotion.matches && !compactViewport.matches);
    update();
    reducedMotion.addEventListener("change", update);
    compactViewport.addEventListener("change", update);
    return () => {
      reducedMotion.removeEventListener("change", update);
      compactViewport.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return <div className="signal-field-fallback" aria-hidden="true" />;

  return (
    <div className="signal-field" aria-hidden="true">
      <Canvas dpr={[1, signalFieldProfile.maxPixelRatio]} gl={{ antialias: false, alpha: true }} camera={{ position: [0, 0, 8], fov: 43, near: 0.1, far: 80 }}>
        <color attach="background" args={["#080808"]} />
        <fog attach="fog" args={["#080808", 9, 38]} />
        <SignalTunnel />
      </Canvas>
    </div>
  );
}
