"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

const INDIGO = "#6366f1";
const INDIGO_LIGHT = "#818cf8";
const PURPLE = "#a855f7";

function OrbitingDot({
  radius,
  speed,
  offset,
  color,
  size = 0.12,
}: {
  radius: number;
  speed: number;
  offset: number;
  color: string;
  size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius - 0.45;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.5) * 0.4;
  });

  return (
    <Sphere ref={ref} args={[size, 16, 16]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </Sphere>
  );
}

function HeroScene() {
  const blobRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (blobRef.current) {
      blobRef.current.rotation.y = t * 0.15;
      blobRef.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.08;
      wireRef.current.rotation.x = t * 0.05;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[-0.55, 0, 0]}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 4, 6]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-2, 2, 4]} intensity={0.7} color={INDIGO} />
      <pointLight position={[2, -1, 2]} intensity={0.45} color={PURPLE} />

      <mesh ref={blobRef} scale={1.3}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#4338ca"
          roughness={0.2}
          metalness={0.8}
          distort={0.32}
          speed={1.6}
          envMapIntensity={1}
        />
      </mesh>

      <Icosahedron ref={wireRef} args={[2.05, 1]}>
        <meshBasicMaterial color={INDIGO_LIGHT} wireframe transparent opacity={0.22} />
      </Icosahedron>

      <OrbitingDot radius={2.35} speed={0.7} offset={0} color={INDIGO} />
      <OrbitingDot radius={2.55} speed={0.5} offset={2.1} color={PURPLE} size={0.09} />
      <OrbitingDot radius={2.15} speed={0.85} offset={4.2} color={INDIGO_LIGHT} size={0.08} />
    </group>
  );
}

export function HeroVisual() {
  return (
    <div className="relative h-full min-h-[300px] w-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[35%] top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute left-[25%] top-[30%] h-28 w-28 rounded-full bg-purple-500/10 blur-2xl" />
      </div>

      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        className="relative z-[1] h-full w-full"
        gl={{ alpha: true, antialias: true }}
      >
        <HeroScene />
      </Canvas>

      <div
        className="pointer-events-none absolute left-[10%] top-[30%] z-[2] h-px w-[50%] rotate-[22deg] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[35%] left-[5%] z-[2] h-px w-[45%] rotate-[-15deg] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
        aria-hidden
      />
    </div>
  );
}
