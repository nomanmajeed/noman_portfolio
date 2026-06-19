"use client";

import type React from "react";
import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { MathUtils } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

type UniformValue = THREE.IUniform<unknown> | unknown;

interface ExtendMaterialConfig {
  header: string;
  vertexHeader?: string;
  fragmentHeader?: string;
  material?: THREE.MeshPhysicalMaterialParameters & { fog?: boolean };
  uniforms?: Record<string, UniformValue>;
  vertex?: Record<string, string>;
  fragment?: Record<string, string>;
}

type ShaderWithDefines = THREE.ShaderLibShader & {
  defines?: Record<string, string | number | boolean>;
};

function extendMaterial<T extends THREE.Material = THREE.Material>(
  BaseMaterial: new (params?: THREE.MaterialParameters) => T,
  cfg: ExtendMaterialConfig
): THREE.ShaderMaterial {
  const physical = THREE.ShaderLib.physical as ShaderWithDefines;
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;
  const baseDefines = physical.defines ?? {};

  const uniforms: Record<string, THREE.IUniform> = THREE.UniformsUtils.clone(baseUniforms);

  const defaults = new BaseMaterial(cfg.material || {}) as T & {
    color?: THREE.Color;
    roughness?: number;
    metalness?: number;
    envMap?: THREE.Texture;
    envMapIntensity?: number;
  };

  if (defaults.color) uniforms.diffuse.value = defaults.color;
  if ("roughness" in defaults) uniforms.roughness.value = defaults.roughness;
  if ("metalness" in defaults) uniforms.metalness.value = defaults.metalness;
  if ("envMap" in defaults) uniforms.envMap.value = defaults.envMap;
  if ("envMapIntensity" in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity;

  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {
    uniforms[key] =
      u !== null && typeof u === "object" && "value" in u
        ? (u as THREE.IUniform<unknown>)
        : ({ value: u } as THREE.IUniform<unknown>);
  });

  let vert = `${cfg.header}\n${cfg.vertexHeader ?? ""}\n${baseVert}`;
  let frag = `${cfg.header}\n${cfg.fragmentHeader ?? ""}\n${baseFrag}`;

  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {
    vert = vert.replace(inc, `${inc}\n${code}`);
  }

  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {
    frag = frag.replace(inc, `${inc}\n${code}`);
  }

  return new THREE.ShaderMaterial({
    defines: { ...baseDefines },
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    lights: true,
    fog: !!cfg.material?.fog,
  });
}

const CanvasWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Canvas dpr={[1, 2]} frameloop="always" className="relative h-full w-full">
    {children}
  </Canvas>
);

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");
  const r = Number.parseInt(clean.substring(0, 2), 16);
  const g = Number.parseInt(clean.substring(2, 4), 16);
  const b = Number.parseInt(clean.substring(4, 6), 16);
  return [r / 255, g / 255, b / 255];
};

const noise = `
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0; vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0); vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0; vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1); vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x); vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z); vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x); vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z); vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0); float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z)); float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z)); float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz)); float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`;

interface BeamsProps {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
}

function createStackedPlanesBufferGeometry(
  n: number,
  width: number,
  height: number,
  spacing: number,
  heightSegments: number
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const numVertices = n * (heightSegments + 1) * 2;
  const numFaces = n * heightSegments * 2;
  const positions = new Float32Array(numVertices * 3);
  const indices = new Uint32Array(numFaces * 3);
  const uvs = new Float32Array(numVertices * 2);
  let vertexOffset = 0;
  let indexOffset = 0;
  let uvOffset = 0;
  const totalWidth = n * width + (n - 1) * spacing;
  const xOffsetBase = -totalWidth / 2;

  for (let i = 0; i < n; i++) {
    const xOffset = xOffsetBase + i * (width + spacing);
    const uvXOffset = Math.random() * 300;
    const uvYOffset = Math.random() * 300;
    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5);
      positions.set([xOffset, y, 0, xOffset + width, y, 0], vertexOffset * 3);
      const uvY = j / heightSegments;
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);
      if (j < heightSegments) {
        const a = vertexOffset;
        const b = vertexOffset + 1;
        const c = vertexOffset + 2;
        const d = vertexOffset + 3;
        indices.set([a, b, c, c, b, d], indexOffset);
        indexOffset += 6;
      }
      vertexOffset += 2;
      uvOffset += 4;
    }
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  return geometry;
}

const MergedPlanes = forwardRef<
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,
  { material: THREE.ShaderMaterial; width: number; count: number; height: number }
>(({ material, width, count, height }, ref) => {
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!);
  useImperativeHandle(ref, () => mesh.current);
  const geometry = useMemo(
    () => createStackedPlanesBufferGeometry(count, width, height, 0, 100),
    [count, width, height]
  );
  useFrame((_, delta) => {
    mesh.current.material.uniforms.time.value += 0.1 * delta;
  });
  return <mesh ref={mesh} geometry={geometry} material={material} />;
});
MergedPlanes.displayName = "MergedPlanes";

const PlaneNoise = forwardRef<
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,
  { material: THREE.ShaderMaterial; width: number; count: number; height: number }
>((props, ref) => (
  <MergedPlanes ref={ref} material={props.material} width={props.width} count={props.count} height={props.height} />
));
PlaneNoise.displayName = "PlaneNoise";

const DirLight: FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const dir = useRef<THREE.DirectionalLight>(null!);
  useEffect(() => {
    if (!dir.current) return;
    const cam = dir.current.shadow.camera as THREE.OrthographicCamera;
    cam.top = 24;
    cam.bottom = -24;
    cam.left = -24;
    cam.right = 24;
    cam.far = 64;
    dir.current.shadow.bias = -0.004;
  }, []);
  return <directionalLight ref={dir} color={color} intensity={1} position={position} />;
};

const Beams: FC<BeamsProps> = ({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = "#ffffff",
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 0,
}) => {
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!);

  const beamMaterial = useMemo(
    () =>
      extendMaterial(THREE.MeshStandardMaterial, {
        header: `
  varying vec3 vEye; varying float vNoise; varying vec2 vUv; varying vec3 vPosition;
  uniform float time; uniform float uSpeed; uniform float uNoiseIntensity; uniform float uScale;
  ${noise}`,
        vertexHeader: `
  float getPos(vec3 pos) {
    vec3 noisePos = vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
    return cnoise(noisePos);
  }
  vec3 getCurrentPos(vec3 pos) { vec3 newpos = pos; newpos.z += getPos(pos); return newpos; }
  vec3 getNormal(vec3 pos) {
    vec3 curpos = getCurrentPos(pos);
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
    vec3 tangentX = normalize(nextposX - curpos);
    vec3 tangentZ = normalize(nextposZ - curpos);
    return normalize(cross(tangentZ, tangentX));
  }`,
        vertex: {
          "#include <begin_vertex>": `transformed.z += getPos(transformed.xyz);`,
          "#include <beginnormal_vertex>": `objectNormal = getNormal(position.xyz);`,
        },
        fragment: {
          "#include <dithering_fragment>": `
    float randomNoise = noise(gl_FragCoord.xy);
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;`,
        },
        material: { fog: true },
        uniforms: {
          diffuse: new THREE.Color(...hexToNormalizedRGB("#000000")),
          time: { value: 0 },
          roughness: 0.3,
          metalness: 0.3,
          uSpeed: { value: speed },
          envMapIntensity: 10,
          uNoiseIntensity: noiseIntensity,
          uScale: scale,
        },
      }),
    [speed, noiseIntensity, scale]
  );

  return (
    <CanvasWrapper>
      <group rotation={[0, 0, MathUtils.degToRad(rotation)]}>
        <PlaneNoise ref={meshRef} material={beamMaterial} count={beamNumber} width={beamWidth} height={beamHeight} />
        <DirLight color={lightColor} position={[0, 3, 10]} />
      </group>
      <ambientLight intensity={1} />
      <color attach="background" args={["#000000"]} />
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />
    </CanvasWrapper>
  );
};

interface HeroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "lg";
  children: React.ReactNode;
}

const HeroButton = ({
  variant = "default",
  size = "sm",
  className = "",
  children,
  ...props
}: HeroButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-white text-black hover:bg-gray-100",
    outline: "border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30",
    ghost: "text-white/90 hover:text-white hover:bg-white/10",
  };
  const sizes = {
    sm: "h-9 px-4 py-2 text-sm",
    lg: "px-7 py-3 text-base",
  };

  return (
    <button
      type="button"
      className={`group relative overflow-hidden rounded-full ${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <div className="absolute inset-0 -top-2 -bottom-2 skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
    </button>
  );
};

export interface EtherealBeamsHeroProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  bio?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: Array<{ value: string; label: string }>;
  avatarUrl?: string;
  avatarAlt?: string;
}

const defaultStats = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects" },
  { value: "5+", label: "Happy Clients" },
];

export function EtherealBeamsHero({
  badge = "Available for freelance work",
  title = "Hi, I'm Noman",
  titleHighlight = "Frontend Developer & Designer",
  subtitle = "Frontend web developer based in Pakistan",
  bio = "I build modern, performant web applications with React, Next.js, and TypeScript.",
  primaryCta = { label: "View My Work", href: "#contact" },
  secondaryCta = { label: "Download CV", href: "#" },
  stats = defaultStats,
  avatarUrl,
  avatarAlt = "Profile photo",
}: EtherealBeamsHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div id="home" className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {mounted ? (
          <Beams
            beamWidth={2.5}
            beamHeight={18}
            beamNumber={15}
            lightColor="#ffffff"
            speed={2.5}
            noiseIntensity={2}
            scale={0.15}
            rotation={43}
          />
        ) : (
          <div className="h-full w-full bg-black" />
        )}
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-black/40" />

      <div className="relative z-10 flex min-h-screen items-center px-6 pb-20 pt-28 md:px-10 md:pb-28 lg:px-24">
        <div className="mx-auto w-full max-w-3xl text-center">
          {avatarUrl && (
            <div className="relative mx-auto mb-6 h-[110px] w-[110px] md:h-[120px] md:w-[120px]">
              <Image
                src={avatarUrl}
                alt={avatarAlt}
                width={120}
                height={120}
                className="relative z-[2] h-full w-full rounded-full border-[3px] border-white/20 object-cover shadow-2xl"
                priority
              />
              <div className="absolute -inset-1.5 animate-spin rounded-full border-2 border-dashed border-white/20 [animation-duration:20s]" />
            </div>
          )}

          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90 backdrop-blur-xl">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-indigo-300" />
            {badge}
          </div>

          <h1 className="mb-2 font-[family-name:var(--font-playfair)] text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {title}
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-white bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </h1>

          {subtitle && (
            <p className="mb-3 text-sm capitalize text-white/60 md:text-base">{subtitle}</p>
          )}

          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            {bio}
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <HeroButton
              size="lg"
              className="font-medium shadow-2xl shadow-white/10"
              onClick={() => {
                window.location.href = primaryCta.href;
              }}
            >
              {primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </HeroButton>
            <HeroButton
              variant="outline"
              size="lg"
              className="font-medium"
              onClick={() => {
                window.location.href = secondaryCta.href;
              }}
            >
              {secondaryCta.label}
            </HeroButton>
          </div>

          <div className="mx-auto grid max-w-md grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-bold text-white md:text-xl">{stat.value}</div>
                <div className="text-xs text-white/50 md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EtherealBeamsHero;
