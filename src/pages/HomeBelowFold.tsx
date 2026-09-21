import { AthleticsSection } from '@/sections/AthleticsSection'
import { ContactSection } from '@/sections/ContactSection'
import { DigitalDeskSection } from '@/sections/DigitalDeskSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { JourneySection } from '@/sections/JourneySection'
import { ProjectLabSection } from '@/sections/ProjectLabSection'
import { SkillsSection } from '@/sections/SkillsSection'

export function HomeBelowFold() {
  return (
    <>
      <JourneySection />
      <ExperienceSection />
      <ProjectLabSection />
      <SkillsSection />
      <AthleticsSection />
      <DigitalDeskSection />
      <ContactSection />
    </>
  )
}
