import { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import { ArrowRight, Leaf } from "lucide-react";

// Optional markers rendered on the globe (lat, lon in degrees)
const MARKERS = [
  { label: "Protect forests", lat: 0, lon: -60, color: "#10b981" },       // Amazon
  { label: "Clean oceans", lat: -10, lon: 120, color: "#06b6d4" },        // Indonesia seas
  { label: "Reduce emissions", lat: 40, lon: 90, color: "#8b5cf6" },      // Central Asia
];

// Convert lat/lon to 3D Cartesian on a sphere
function latLonToXYZ(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

function Starfield() {
  const tex = useTexture("/assets/earth/starfield.jpg");
  return (
    <mesh>
      <sphereGeometry args={[200, 64, 64]} />
      <meshBasicMaterial map={tex} side={3 /* BackSide */} />
    </mesh>
  );
}

function Atmosphere({ radius = 1 }) {
  // Simple soft glow using a large, back-sided, translucent sphere
  return (
    <mesh scale={1.06}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshPhongMaterial
        color="#60a5fa"
        opacity={0.15}
        transparent
        side={1 /* BackSide */}
      />
    </mesh>
  );
}

function Clouds({ radius = 1 }) {
  const cloudsTex = useTexture("/assets/earth/clouds.png");
  const ref = useRef();
  useFrame((_s, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02; // subtle drift
  });
  return (
    <mesh ref={ref} scale={1.02}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshPhongMaterial
        map={cloudsTex}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </mesh>
  );
}

function Earth({ radius = 1, autoRotate = true }) {
  const ref = useRef();
  const [dayMap, normalMap, specularMap] = useTexture([
    "/assets/earth/daymap.jpg",
    "/assets/earth/normal.jpg",
    "/assets/earth/specular.jpg",
  ]);

  useFrame((_state, delta) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += delta * 0.05; // slow rotation
    }
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[radius, 96, 96]} />
        <meshPhongMaterial
          map={dayMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={15}
        />
      </mesh>

      {/* add clouds + atmosphere */}
      <Clouds radius={radius} />
      <Atmosphere radius={radius} />
    </group>
  );
}

function Marker({ lat, lon, radius = 1.01, label, color = "#10b981" }) {
  const pos = useMemo(() => latLonToXYZ(lat, lon, radius), [lat, lon, radius]);
  const [hover, setHover] = useState(false);

  return (
    <group position={pos}>
      <mesh
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>

      {hover && (
        <Html distanceFactor={10} position={[0, 0.03, 0]}>
          <div className="rounded-lg border border-slate-200 bg-white/95 px-3 py-1.5 shadow-lg text-xs font-semibold text-slate-800 whitespace-nowrap">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

function GlobeScene() {
  const [dragging, setDragging] = useState(false);

  return (
    <>
      {/* Lighting for realism */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]} intensity={1.4} />
      <pointLight position={[-4, -2, -3]} intensity={0.6} />

      {/* Big star background */}
      <Starfield />

      {/* Planet */}
      <Earth radius={1} autoRotate={!dragging} />

      {/* Markers */}
      {MARKERS.map((m) => (
        <Marker key={m.label} {...m} />
      ))}

      {/* Controls */}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.45}
        onStart={() => setDragging(true)}
        onEnd={() => setDragging(false)}
      />
    </>
  );
}

export default function InteractiveEarthReal() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-32">
        {/* Left Content (kept from your original, lightly polished) */}
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Leaf className="h-4 w-4" />
            Carbon Transparency
          </div>

          <h1 className="text-5xl font-black leading-tight text-slate-900 md:text-6xl">
            Real impact needs
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              transparency
            </span>
          </h1>

          <p className="text-lg leading-relaxed text-slate-600 md:text-xl">
            In a transparent ecosystem, the simple act of calculating your carbon footprint and making
            contributions to mitigate it generates a positive ripple effect – not just locally, but on a
            global scale.
          </p>

          <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            Start here
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="space-y-1">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent">
                2.5M+
              </div>
              <div className="text-sm text-slate-600">Trees Protected</div>
            </div>
            <div className="space-y-1">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-3xl font-bold text-transparent">
                150K
              </div>
              <div className="text-sm text-slate-600">Contributors</div>
            </div>
            <div className="space-y-1">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-3xl font-bold text-transparent">
                85%
              </div>
              <div className="text-sm text-slate-600">Impact Rate</div>
            </div>
          </div>
        </div>

        {/* Right: High-fidelity 3D Globe */}
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-2xl">
            {/* soft outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/30 blur-3xl" />

            <Canvas
              camera={{ position: [0, 0, 2.2], fov: 45 }}
              gl={{ antialias: true }}
            >
              <Suspense
                fallback={
                  <Html center>
                    <div className="rounded-lg border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow">
                      Loading Earth…
                    </div>
                  </Html>
                }
              >
                <GlobeScene />
              </Suspense>
            </Canvas>

            {/* Interaction hint */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 animate-float rounded-full border border-slate-200 bg-white/95 px-6 py-3 text-sm font-semibold text-slate-700 shadow-2xl">
              Drag to rotate • Zoom disabled
            </div>
          </div>
        </div>
      </div>

      {/* local animations */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        @keyframes float { 0%,100% { transform: translate(-50%, 0) } 50% { transform: translate(-50%, -8px) } }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
