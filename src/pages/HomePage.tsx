import { MainLayout } from '@/layouts/MainLayout'
import {
  HeroSection,
  JourneySection,
  ExperienceSection,
  ProjectLabSection,
  ResearchSection,
  SkillsSection,
  LeadershipSection,
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
      <ResearchSection />
      <SkillsSection />
      <LeadershipSection />
      <AthleticsSection />
      <DigitalDeskSection />
      <ContactSection />
    </MainLayout>
  )
}
