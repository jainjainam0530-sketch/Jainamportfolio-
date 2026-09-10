import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const signalFieldProfile = {
  ringCount: 14,
  maxPixelRatio: 1.5,
  disablesOnCompactViewport: true,
  respectsReducedMotion: true,
  usesPointerDepth: true,
} as const;

type SignalRing = {
  position: [number, number, number];
  rotation: [number, number, number];
  radius: number;
  tube: number;
  opacity: number;
};

const AUDIO_URL = "/manus-storage/signal-field-ambient_04868133.wav";

function SignalTunnel({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const tunnelRef = useRef<Group>(null);
  const pulseRef = useRef<Group>(null);
  const orbitRef = useRef<Group>(null);
  const ringRefs = useRef<Array<Mesh | null>>([]);
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

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = Math.min(1, window.scrollY / scrollRange);

    if (tunnelRef.current) {
      tunnelRef.current.rotation.z = time * 0.14 + scrollProgress * 1.55 + pointer.current.x * 0.2;
      tunnelRef.current.rotation.x = Math.sin(time * 0.38) * 0.17 + scrollProgress * 0.22 - pointer.current.y * 0.12;
      tunnelRef.current.position.z = scrollProgress * 12.6;
      tunnelRef.current.position.x = Math.sin(time * 0.48) * 0.38 + pointer.current.x * 0.42;
      tunnelRef.current.position.y = Math.cos(time * 0.34) * 0.2 - pointer.current.y * 0.28;
    }
    if (pulseRef.current) {
      const scale = 0.82 + Math.sin(time * 1.85) * 0.16;
      pulseRef.current.scale.setScalar(scale);
      pulseRef.current.rotation.x = time * 0.75;
      pulseRef.current.rotation.y = time * 1.05;
      pulseRef.current.position.x = Math.sin(time * 0.78) * 0.34;
      pulseRef.current.position.y = Math.cos(time * 0.92) * 0.28;
    }
    if (orbitRef.current) orbitRef.current.rotation.z = -time * 0.46;
    ringRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const ring = rings[index];
      if (!ring) return;
      mesh.rotation.z = ring.rotation[2] + time * (index % 2 === 0 ? 0.24 : -0.18);
      mesh.rotation.x = ring.rotation[0] + Math.sin(time * 0.68 + index) * 0.12;
      mesh.position.y = ring.position[1] + Math.cos(time * 0.7 + index * 0.6) * 0.18;
      mesh.scale.setScalar(1 + Math.sin(time * 0.85 + index) * 0.055);
    });
    camera.position.x += (pointer.current.x * 0.72 + Math.sin(time * 0.3) * 0.24 - camera.position.x) * 0.032;
    camera.position.y += (-pointer.current.y * 0.54 + Math.cos(time * 0.24) * 0.16 - camera.position.y) * 0.032;
    camera.position.z += (7.7 + Math.sin(time * 0.48) * 0.44 - camera.position.z) * 0.025;
    camera.lookAt(0, 0, -4.7);
  });

  return (
    <group ref={tunnelRef}>
      {rings.map((ring, index) => (
        <mesh key={index} ref={(element) => { ringRefs.current[index] = element; }} position={ring.position} rotation={ring.rotation}>
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
      <group ref={orbitRef} position={[0, 0, -3.1]} rotation={[0.48, 0.18, 0]}>
        <mesh scale={[1.25, .7, 1]}>
          <torusGeometry args={[1.25, 0.012, 6, 96]} />
          <meshBasicMaterial color="#ff4a13" transparent opacity={0.68} />
        </mesh>
        <mesh rotation={[0.8, 0.2, 1.6]} scale={[1.7, .7, 1]}>
          <torusGeometry args={[1.25, 0.009, 6, 96]} />
          <meshBasicMaterial color="#f3f0ea" transparent opacity={0.28} />
        </mesh>
      </group>
    </group>
  );
}

export default function SignalField() {
  const [enabled, setEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 760px)");
    const update = () => setEnabled(!reducedMotion.matches && !compactViewport.matches);
    update();
    reducedMotion.addEventListener("change", update);
    compactViewport.addEventListener("change", update);
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      reducedMotion.removeEventListener("change", update);
      compactViewport.removeEventListener("change", update);
      window.removeEventListener("pointermove", handlePointerMove);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle scroll-linked soundscape modulation
  useEffect(() => {
    if (!filterNodeRef.current || !gainNodeRef.current || !enabled || isMuted) return;

    const handleScroll = () => {
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, window.scrollY / scrollRange);
      
      // Map scroll progress to filter frequency (low-pass)
      // Top: bright, Bottom: deep/muffled
      const freq = 20000 - (scrollProgress * 18000); 
      filterNodeRef.current!.frequency.setTargetAtTime(freq, audioContextRef.current!.currentTime, 0.1);
      
      // Subtle volume modulation based on scroll
      const volume = 0.3 + (Math.sin(scrollProgress * Math.PI) * 0.1);
      gainNodeRef.current!.gain.setTargetAtTime(volume, audioContextRef.current!.currentTime, 0.1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, isMuted]);

  const initAudio = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const response = await fetch(AUDIO_URL);
      const arrayBuffer = await response.arrayBuffer();
      audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      gainNodeRef.current = audioContextRef.current.createGain();
      filterNodeRef.current = audioContextRef.current.createBiquadFilter();
      
      filterNodeRef.current.type = "lowpass";
      filterNodeRef.current.frequency.value = 20000;
      
      gainNodeRef.current.gain.value = 0; // Start silent for fade-in
      
      filterNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
  };

  const startPlayback = () => {
    if (!audioContextRef.current || !audioBufferRef.current) return;
    
    sourceNodeRef.current = audioContextRef.current.createBufferSource();
    sourceNodeRef.current.buffer = audioBufferRef.current;
    sourceNodeRef.current.loop = true;
    sourceNodeRef.current.connect(filterNodeRef.current!);
    sourceNodeRef.current.start(0);
    
    // Fade in
    gainNodeRef.current!.gain.setTargetAtTime(0.4, audioContextRef.current.currentTime, 1.5);
  };

  const stopPlayback = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
  };

  const toggleSound = async () => {
    if (isLoading) return;

    try {
      if (isMuted) {
        setIsLoading(true);
        await initAudio();
        if (audioContextRef.current?.state === "suspended") {
          await audioContextRef.current.resume();
        }
        startPlayback();
        setIsMuted(false);
      } else {
        stopPlayback();
        setIsMuted(true);
      }
    } catch (err) {
      console.error("Soundscape interaction failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!enabled) return <div className="signal-field-fallback" aria-hidden="true" />;

  return (
    <div className="signal-field" aria-hidden="true">
      <Canvas dpr={[1, signalFieldProfile.maxPixelRatio]} gl={{ antialias: false, alpha: true }} camera={{ position: [0, 0, 8], fov: 43, near: 0.1, far: 80 }}>
        <color attach="background" args={["#080808"]} />
        <fog attach="fog" args={["#080808", 9, 38]} />
        <SignalTunnel pointer={pointer} />
      </Canvas>
      
      <div className="absolute bottom-8 right-8 z-50 pointer-events-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSound}
          disabled={isLoading}
          className={`rounded-full bg-black/40 border-porcelain/20 text-porcelain hover:bg-ember/20 hover:border-ember transition-all duration-500 backdrop-blur-md disabled:opacity-50 ${!isMuted ? 'shadow-[0_0_15px_rgba(255,74,19,0.3)] border-ember/40' : ''}`}
          aria-label={isMuted ? "Unmute immersive soundscape" : "Mute immersive soundscape"}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-porcelain/20 border-t-porcelain rounded-full animate-spin" />
          ) : isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-4 h-4" />
              <span className="absolute inset-0 rounded-full animate-ping bg-ember/20 scale-150" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
