import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  mouseX?: number
  mouseY?: number
}

export function ParticleField({ count = 800, mouseX = 0, mouseY = 0 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, originalPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const originalPositions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 3 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      originalPositions[i3] = positions[i3]!
      originalPositions[i3 + 1] = positions[i3 + 1]!
      originalPositions[i3 + 2] = positions[i3 + 2]!
    }

    return { positions, originalPositions }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.elapsedTime
    const posAttr = pointsRef.current.geometry.attributes.position
    const posArray = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const ox = originalPositions[i3]!
      const oy = originalPositions[i3 + 1]!
      const oz = originalPositions[i3 + 2]!

      posArray[i3] = ox + Math.sin(time * 0.3 + i * 0.01) * 0.05 + mouseX * 0.3
      posArray[i3 + 1] = oy + Math.cos(time * 0.2 + i * 0.02) * 0.05 + mouseY * 0.3
      posArray[i3 + 2] = oz + Math.sin(time * 0.15 + i * 0.005) * 0.03
    }

    posAttr.needsUpdate = true
    pointsRef.current.rotation.y = time * 0.02
    pointsRef.current.rotation.x = mouseY * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
