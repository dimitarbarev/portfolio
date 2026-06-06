import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import type { Mesh } from 'three'

interface CoreOrbProps {
  mouseX?: number
  mouseY?: number
}

export function CoreOrb({ mouseX = 0, mouseY = 0 }: CoreOrbProps) {
  const meshRef = useRef<Mesh>(null)
  const ringRef = useRef<Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = mouseY * 0.3 + time * 0.1
      meshRef.current.rotation.y = mouseX * 0.3 + time * 0.15
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3 + mouseY * 0.2
      ringRef.current.rotation.z = time * 0.2
    }
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 4]} />
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#3b82f6"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.25}
            speed={2}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
      </mesh>

      {/* Network nodes representing connectivity */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * 3.5
        const z = Math.sin(angle) * 3.5
        return (
          <mesh key={i} position={[x, Math.sin(i * 1.5) * 0.5, z]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
        )
      })}
    </group>
  )
}
