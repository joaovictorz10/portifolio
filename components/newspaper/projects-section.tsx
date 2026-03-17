"use client"

import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { texts } from "@/i18n/texts"
import { useLanguage } from "@/context/LanguageContext"
import ProjectModal from "@/components/newspaper/ProjectModal"

function ProjectCard({
  project,
  i,
  isInView,
  viewProjectLabel,
  viewCodeLabel,
  onSelect,
}: {
  project: any
  i: number
  isInView: boolean
  viewProjectLabel: string
  viewCodeLabel: string
  onSelect: (project: any) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-4, 4])
  const [isHovered, setIsHovered] = useState(false)
  const [glitchTitle, setGlitchTitle] = useState(project.title)

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const triggerGlitch = () => {
    setIsHovered(true)
    const original = project.title
    const glitchChars = "!@#$%&*?><{}[]"
    let frame = 0
    const totalFrames = 8

    const interval = setInterval(() => {
      frame++
      if (frame >= totalFrames) {
        setGlitchTitle(original)
        clearInterval(interval)
        return
      }

      setGlitchTitle(
        original
          .split("")
          .map((c: string, ci: number) =>
            ci < Math.floor((frame / totalFrames) * original.length)
              ? c
              : c === " "
              ? " "
              : glitchChars[Math.floor(Math.random() * glitchChars.length)]
          )
          .join("")
      )
    }, 40)
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      onMouseMove={handleMouse}
      onMouseEnter={triggerGlitch}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
        setIsHovered(false)
      }}
      onClick={() => onSelect(project)}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative border border-card-foreground/10 bg-card overflow-hidden cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-card-foreground px-6 py-3 relative overflow-hidden">
        <span className="font-mono text-xs uppercase tracking-widest text-card relative z-10">
          {project.id}
        </span>
        <span className="font-mono text-xs text-card/60 relative z-10">
          {project.year}
        </span>

        <motion.div
          className="absolute inset-0 bg-primary"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.35 }}
        />
      </div>

      <div className="p-6 md:p-8">
        <h3 className="font-serif text-3xl md:text-4xl font-black text-card-foreground uppercase leading-none mb-2 relative">
          <span className="relative z-10">{glitchTitle}</span>
          {isHovered && (
            <span className="absolute top-[2px] left-[2px] text-primary/20 z-0">
              {project.title}
            </span>
          )}
        </h3>

        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-6">
          {project.subtitle}
        </p>

        <motion.p
          className="font-sans text-sm text-card-foreground/70 leading-relaxed mb-6"
          animate={{ x: isHovered ? 4 : 0 }}
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider border border-card-foreground/20 px-3 py-1 text-card-foreground/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a
            href={project.link}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-card-foreground hover:text-primary transition-colors"
          >
            <ExternalLink size={14} />
            {viewProjectLabel}
          </a>

          <a
            href={project.github}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-card-foreground hover:text-primary transition-colors"
          >
            <Github size={14} />
            {viewCodeLabel}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectsSection() {
  const { lang } = useLanguage()
  const section = texts.projects
  const projects = section.list[lang]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const [selectedProject, setSelectedProject] = useState<any | null>(null)

  return (
    <section id="projetos" className="relative bg-card py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-6xl md:text-8xl font-black text-card-foreground uppercase leading-none">
            <span>{section.titleLine1[lang]}</span>
            <br />
            <span className="text-primary">
              {section.titleLine2[lang]}
            </span>
          </h2>

          <div className="mt-4 h-[3px] w-24 bg-primary" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project: any, i: number) => (
            <ProjectCard
              key={project.id}
              project={project}
              i={i}
              isInView={isInView}
              viewProjectLabel={section.viewProject[lang]}
              viewCodeLabel={section.viewCode[lang]}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
