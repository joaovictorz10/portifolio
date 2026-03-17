import { Navigation } from "@/components/newspaper/navigation"
import { HeroSection } from "@/components/newspaper/hero-section"
import { AboutSection } from "@/components/newspaper/about-section"
import { SkillsSection } from "@/components/newspaper/skills-section"
import { ProjectsSection } from "@/components/newspaper/projects-section"
import { ExperienceSection } from "@/components/newspaper/experience-section"
import { ContactSection } from "@/components/newspaper/contact-section"
import { DownloadSection } from "@/components/newspaper/download-section"
import { Footer } from "@/components/newspaper/footer"
import { CustomCursor } from "@/components/newspaper/custom-cursor"
export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <DownloadSection />
      <Footer />
    </main>
  )
}
