import { Canvas } from '@react-three/fiber'
import { CoreOrb } from './CoreOrb'
import { ParticleField } from './ParticleField'

interface HeroCanvasProps {
  mouseX: number
  mouseY: number
}

export function HeroCanvas({ mouseX, mouseY }: HeroCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#7c3aed" />
      <pointLight position={[-10, -5, 5]} intensity={0.3} color="#3b82f6" />
      <CoreOrb mouseX={mouseX} mouseY={mouseY} />
      <ParticleField count={600} mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  )
}
