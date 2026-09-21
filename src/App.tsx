import { useEffect, useState } from 'react'
import { HomePage } from '@/pages/HomePage'
import { ProjectPage } from '@/pages/ProjectPage'

function currentPath(): string {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

function App() {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const onPop = () => setPath(currentPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const projectMatch = path.match(/^\/projects\/([^/]+)$/)
  if (projectMatch?.[1]) {
    return <ProjectPage projectId={projectMatch[1]} />
  }

  return <HomePage />
}

export default App
