import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

// Color map for liquid and glass highlights
const FRAGRANCE_THEMES = {
  'rouge-noir': {
    liquid: '#6A0D18',
    liquidRoughness: 0.1,
    glassTint: '#ffffff',
    glow: '#8E1616',
    capColor: '#E6C280'
  },
  'golden-hour': {
    liquid: '#D48B28',
    liquidRoughness: 0.15,
    glassTint: '#FFF8E7',
    glow: '#F39C12',
    capColor: '#F5D77F'
  },
  'rose-eternelle': {
    liquid: '#D97D88',
    liquidRoughness: 0.1,
    glassTint: '#FFF0F5',
    glow: '#E06D83',
    capColor: '#E8C5C8'
  },
  'ombre-royale': {
    liquid: '#2B1B17',
    liquidRoughness: 0.2,
    glassTint: '#F0E6D2',
    glow: '#4A2E1B',
    capColor: '#C5A059'
  }
}

function FlaconModel({ fragranceId, _engravingText }) {
  const bottleRef = useRef()
  const theme = FRAGRANCE_THEMES[fragranceId] || FRAGRANCE_THEMES['rouge-noir']

  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.35
    }
  })

  return (
    <group ref={bottleRef} position={[0, -0.2, 0]}>
      {/* Heavy Baccarat Crystal Base & Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2.2, 0.85]} />
        <meshPhysicalMaterial
          color={theme.glassTint}
          transmission={0.92}
          opacity={1}
          transparent
          roughness={0.05}
          ior={1.52}
          thickness={0.6}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Internal Perfume Liquid Core */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[1.3, 1.7, 0.65]} />
        <meshPhysicalMaterial
          color={theme.liquid}
          transmission={0.45}
          opacity={0.88}
          transparent
          roughness={theme.liquidRoughness}
          ior={1.38}
          attenuationColor={new THREE.Color(theme.glow)}
          attenuationDistance={0.8}
        />
      </mesh>

      {/* Internal Dip Tube (Atomizer stem) */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.8, 16]} />
        <meshStandardMaterial color="#ffffff" opacity={0.5} transparent roughness={0.1} />
      </mesh>

      {/* Heavy Gold Neck & Collar */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.3, 0.36, 0.32, 32]} />
        <meshStandardMaterial
          color={theme.capColor}
          metalness={0.95}
          roughness={0.18}
        />
      </mesh>

      {/* Geometric Faceted Heavy Gold & Crystal Stopper Cap */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.75, 8]} />
        <meshStandardMaterial
          color={theme.capColor}
          metalness={0.92}
          roughness={0.25}
        />
      </mesh>

      {/* Black Silk Bow / Cord Accent around neck */}
      <mesh position={[0, 1.15, 0]}>
        <torusGeometry args={[0.34, 0.04, 16, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Front Gold Embossed Label Plate */}
      <mesh position={[0, 0, 0.44]}>
        <planeGeometry args={[1.1, 1.3]} />
        <meshStandardMaterial
          color="#0c0709"
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      {/* Label Gold Border */}
      <mesh position={[0, 0, 0.442]}>
        <ringGeometry args={[0.5, 0.52, 4]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function ThreeBottleViewer({ fragranceId = 'rouge-noir', engravingText = '' }) {
  return (
    <div className="three-bottle-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Crisp rendering on high-DPI retina screens without performance bottleneck
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 4]} intensity={2.4} color="#FFF5EA" />
        <directionalLight position={[-4, 3, -3]} intensity={1.8} color="#D4AF37" />
        <pointLight position={[0, 2, 2]} intensity={1.5} color="#FFE4B5" />
        <spotLight
          position={[0, 5, 2]}
          angle={0.6}
          penumbra={0.8}
          intensity={3}
          color="#FFFFFF"
        />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <FlaconModel fragranceId={fragranceId} engravingText={engravingText} />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.7}
          autoRotate={false}
          dampingFactor={0.05}
        />
      </Canvas>

      <div className="three-bottle-hint">
        <span>✦ Drag to rotate 360° flacon in 3D</span>
      </div>
    </div>
  )
}
