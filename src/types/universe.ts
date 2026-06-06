export type UniverseSceneId =
  | 'engineer'
  | 'researcher'
  | 'athlete'
  | 'speaker'
  | 'explorer'
  | 'realMe'

export type CharacterVariant = UniverseSceneId

export interface UniverseSceneMeta {
  id: UniverseSceneId
  index: number
  label: string
  shortLabel: string
  mood: string
  description: string
  accentColor: string
  /** Bundled hero image URL */
  image: string
}

export interface UniverseRotationState {
  activeIndex: number
  targetAngle: number
  isDragging: boolean
  isPaused: boolean
}
