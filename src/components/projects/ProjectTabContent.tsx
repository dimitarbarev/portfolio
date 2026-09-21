interface ProjectTabContentProps {
  content: string
}

export function ProjectTabContent({ content }: ProjectTabContentProps) {
  const blocks = content.split('\n\n')

  return (
    <div className="space-y-4 text-text-secondary leading-relaxed">
      {blocks.map((block) => {
        const lines = block.split('\n')
        const isList = lines.every((line) => line.startsWith('- '))

        if (isList) {
          return (
            <ul key={block} className="space-y-2 pl-1">
              {lines.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-light" />
                  <span>{line.slice(2)}</span>
                </li>
              ))}
            </ul>
          )
        }

        if (lines.length > 1 && lines.some((line) => line.startsWith('- '))) {
          return (
            <div key={block} className="space-y-3">
              {lines.map((line) =>
                line.startsWith('- ') ? (
                  <div key={line} className="flex gap-3 pl-1">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-light" />
                    <span>{line.slice(2)}</span>
                  </div>
                ) : (
                  <p key={line}>{line}</p>
                ),
              )}
            </div>
          )
        }

        return <p key={block}>{block}</p>
      })}
    </div>
  )
}
