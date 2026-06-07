import { MainLayout } from '@/layouts/MainLayout'
import {
  HeroSection,
  JourneySection,
  ExperienceSection,
  ProjectLabSection,
  SkillsSection,
  AthleticsSection,
  DigitalDeskSection,
  ContactSection,
} from '@/sections'

export function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <JourneySection />
      <ExperienceSection />
      <ProjectLabSection />
      <SkillsSection />
      <AthleticsSection />
      <DigitalDeskSection />
      <ContactSection />
    </MainLayout>
  )
}
