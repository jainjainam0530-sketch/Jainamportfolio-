import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

export const signalAudioProfile = {
  visualizerBars: 5,
  topFrequency: 18000,
  bottomFrequency: 2400,
  topResonance: 0.8,
  bottomResonance: 5,
  topVolume: 0.44,
  bottomVolume: 0.54,
} as const;

export function getScrollAudioState(progress: number) {
  const normalized = Math.min(1, Math.max(0, progress));
  const eased = normalized * normalized * (3 - 2 * normalized);

  return {
    frequency: Math.round(signalAudioProfile.topFrequency + (signalAudioProfile.bottomFrequency - signalAudioProfile.topFrequency) * eased),
    resonance: Number((signalAudioProfile.topResonance + (signalAudioProfile.bottomResonance - signalAudioProfile.topResonance) * eased).toFixed(2)),
    volume: Number((signalAudioProfile.topVolume + (signalAudioProfile.bottomVolume - signalAudioProfile.topVolume) * eased).toFixed(3)),
  };
}

type SignalRing = {
  position: [number, number, number];
  rotation: [number, number, number];
  radius: number;
  tube: number;
  opacity: number;
};

const AUDIO_URL = "/manus-storage/signal-field-melodic-ambient_504aac68.wav";
const VISUALIZER_BANDS: Array<[number, number]> = [
  [1, 4],
  [4, 8],
  [8, 15],
  [15, 27],
  [27, 46],
];
const IDLE_AUDIO_LEVELS = [0.16, 0.24, 0.2, 0.28, 0.18];

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
  const [audioLevels, setAudioLevels] = useState(IDLE_AUDIO_LEVELS);
  const [audioScrollProgress, setAudioScrollProgress] = useState(0);
  const pointer = useRef({ x: 0, y: 0 });
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const frequencyDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

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
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch {
          // The source may already have stopped during teardown.
        }
      }
      if (audioContextRef.current) void audioContextRef.current.close();
    };
  }, []);

  // Handle scroll-linked soundscape modulation and keep the visual readout in sync.
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollRange));
      setAudioScrollProgress(Math.round(scrollProgress * 100));

      if (!audioContextRef.current || !filterNodeRef.current || !gainNodeRef.current || isMuted) return;
      const state = getScrollAudioState(scrollProgress);
      const currentTime = audioContextRef.current.currentTime;
      filterNodeRef.current.frequency.setTargetAtTime(state.frequency, currentTime, 0.14);
      filterNodeRef.current.Q.setTargetAtTime(state.resonance, currentTime, 0.14);
      gainNodeRef.current.gain.setTargetAtTime(state.volume, currentTime, 0.22);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, isMuted]);

  // Read the actual output signal at a gentle cadence so the visualizer follows the melody without re-rendering every frame.
  useEffect(() => {
    if (!enabled || isMuted || isLoading || !analyserNodeRef.current) {
      setAudioLevels(IDLE_AUDIO_LEVELS);
      return;
    }

    let animationFrame = 0;
    let lastUpdate = 0;
    const animateVisualizer = (timestamp: number) => {
      if (timestamp - lastUpdate >= 64 && analyserNodeRef.current && frequencyDataRef.current) {
        analyserNodeRef.current.getByteFrequencyData(frequencyDataRef.current);
        const nextLevels = VISUALIZER_BANDS.map(([start, end]) => {
          let total = 0;
          for (let index = start; index < end; index += 1) total += frequencyDataRef.current?.[index] ?? 0;
          const average = total / Math.max(1, end - start);
          return Math.min(1, Math.max(0.12, average / 118));
        });
        setAudioLevels(nextLevels);
        lastUpdate = timestamp;
      }
      animationFrame = window.requestAnimationFrame(animateVisualizer);
    };

    animationFrame = window.requestAnimationFrame(animateVisualizer);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [enabled, isMuted, isLoading]);

  const initAudio = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

      const response = await fetch(AUDIO_URL);
      if (!response.ok) throw new Error(`Unable to load soundscape (${response.status})`);
      const arrayBuffer = await response.arrayBuffer();
      audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);

      gainNodeRef.current = audioContextRef.current.createGain();
      filterNodeRef.current = audioContextRef.current.createBiquadFilter();
      analyserNodeRef.current = audioContextRef.current.createAnalyser();
      frequencyDataRef.current = new Uint8Array(new ArrayBuffer(analyserNodeRef.current.frequencyBinCount));

      filterNodeRef.current.type = "lowpass";
      filterNodeRef.current.frequency.value = signalAudioProfile.topFrequency;
      filterNodeRef.current.Q.value = signalAudioProfile.topResonance;
      gainNodeRef.current.gain.value = 0;
      analyserNodeRef.current.fftSize = 128;
      analyserNodeRef.current.smoothingTimeConstant = 0.78;

      filterNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(analyserNodeRef.current);
      analyserNodeRef.current.connect(audioContextRef.current.destination);
    }
  };

  const startPlayback = () => {
    if (!audioContextRef.current || !audioBufferRef.current || !filterNodeRef.current || !gainNodeRef.current) return;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.loop = true;
    source.connect(filterNodeRef.current);
    source.start(0);
    sourceNodeRef.current = source;

    const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollRange));
    const state = getScrollAudioState(scrollProgress);
    const currentTime = audioContextRef.current.currentTime;
    filterNodeRef.current.frequency.setValueAtTime(state.frequency, currentTime);
    filterNodeRef.current.Q.setValueAtTime(state.resonance, currentTime);
    gainNodeRef.current.gain.cancelScheduledValues(currentTime);
    gainNodeRef.current.gain.setValueAtTime(0, currentTime);
    gainNodeRef.current.gain.setTargetAtTime(state.volume, currentTime, 0.9);
  };

  const stopPlayback = () => {
    const source = sourceNodeRef.current;
    const context = audioContextRef.current;
    if (!source) return;

    if (context && gainNodeRef.current) {
      const currentTime = context.currentTime;
      gainNodeRef.current.gain.cancelScheduledValues(currentTime);
      gainNodeRef.current.gain.setTargetAtTime(0, currentTime, 0.08);
      try {
        source.stop(currentTime + 0.2);
      } catch {
        // The source may already be scheduled to stop.
      }
    } else {
      try {
        source.stop();
      } catch {
        // The source may already have stopped.
      }
    }
    source.disconnect();
    sourceNodeRef.current = null;
  };

  const toggleSound = async () => {
    if (isLoading) return;

    try {
      if (isMuted) {
        setIsLoading(true);
        await initAudio();
        if (audioContextRef.current?.state === "suspended") await audioContextRef.current.resume();
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
    <div className="signal-field">
      <div className="signal-field-canvas" aria-hidden="true">
        <Canvas dpr={[1, signalFieldProfile.maxPixelRatio]} gl={{ antialias: false, alpha: true }} camera={{ position: [0, 0, 8], fov: 43, near: 0.1, far: 80 }}>
          <color attach="background" args={["#080808"]} />
          <fog attach="fog" args={["#080808", 9, 38]} />
          <SignalTunnel pointer={pointer} />
        </Canvas>
      </div>

      {createPortal(<div className={`signal-audio-control ${!isMuted ? "is-active" : ""}`} aria-label="Immersive soundscape controls">
        <div className="signal-audio-readout">
          <div className="signal-audio-visualizer" aria-hidden="true">
            {audioLevels.map((level, index) => <span key={index} style={{ height: `${Math.round(level * 100)}%` }} />)}
          </div>
          <div className="signal-audio-meta">
            <span className="signal-audio-status" aria-live="polite">{isLoading ? "Loading signal" : isMuted ? "Sound off" : "Signal active"}</span>
            <span className="signal-audio-detail">{isMuted ? "Muted by default" : `Scroll ${String(audioScrollProgress).padStart(2, "0")}%`}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSound}
          disabled={isLoading}
          className={`rounded-full bg-black/40 border-porcelain/20 text-porcelain hover:bg-ember/20 hover:border-ember transition-all duration-500 backdrop-blur-md disabled:opacity-50 ${!isMuted ? 'shadow-[0_0_15px_rgba(255,74,19,0.3)] border-ember/40' : ''}`}
          aria-label={isMuted ? "Unmute immersive soundscape" : "Mute immersive soundscape"}
          aria-busy={isLoading}
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
      </div>, document.body)}
    </div>
  );
}
