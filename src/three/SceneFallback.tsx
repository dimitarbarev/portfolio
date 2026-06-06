export function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(124, 58, 237, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="h-48 w-48 rounded-full border border-purple/20 animate-pulse" />
          <div className="absolute inset-4 rounded-full border border-blue/15" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple/10 to-blue/10" />
        </div>
      </div>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-purple-light/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
