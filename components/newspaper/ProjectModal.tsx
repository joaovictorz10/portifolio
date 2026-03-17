"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { texts } from "@/i18n/texts"
import { useLanguage } from "@/context/LanguageContext"

type Technology = {
  name: string
  description: string
}

type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  detailedDescription: string
  image: string
  tags: string[]
  technologies: Technology[]
  year: string
  link: string
  github: string
}

type Props = {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const { lang } = useLanguage()
  const section = texts.projects

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-card-foreground/10"
          >
            {/* Header bar — mesmo estilo do card */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-card-foreground px-6 py-3">
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs uppercase tracking-widest text-card">
                  {project.id}
                </span>
                <span className="font-mono text-xs text-card/50">
                  {project.year}
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label={section.closeModal[lang]}
                className="text-card/60 hover:text-primary transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Imagem / GIF do projeto */}
            <div className="relative w-full h-56 md:h-72 bg-card-foreground/5 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none"
                }}
              />
              {/* Scanline sutil */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
                }}
              />
            </div>

            {/* Conteúdo */}
            <div className="p-6 md:p-10">
              {/* Título */}
              <h2 className="font-serif text-4xl md:text-5xl font-black text-card-foreground uppercase leading-none mb-2">
                {project.title}
              </h2>

              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-8">
                {project.subtitle}
              </p>

              {/* Descrição detalhada */}
              <p className="font-sans text-sm text-card-foreground/70 leading-relaxed mb-10">
                {project.detailedDescription}
              </p>

              {/* Tecnologias */}
              <div className="mb-10">
                <h3 className="font-mono text-xs uppercase tracking-widest text-card-foreground/40 mb-4">
                  — {section.technologiesLabel[lang]}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="border border-card-foreground/10 p-3 group hover:border-primary transition-colors duration-200"
                    >
                      <span className="block font-mono text-xs uppercase tracking-wider text-card-foreground group-hover:text-primary transition-colors">
                        {tech.name}
                      </span>
                      <span className="block font-sans text-[11px] text-card-foreground/40 mt-1">
                        {tech.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-wider border border-card-foreground/20 px-3 py-1 text-card-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-card-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink size={14} />
                  {section.viewProject[lang]}
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-card-foreground hover:text-primary transition-colors"
                >
                  <Github size={14} />
                  {section.viewCode[lang]}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
