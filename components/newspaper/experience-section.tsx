/*
  Este código implementa a seção "Experiência" do portfólio,
  exibindo uma linha do tempo profissional e uma área de formação
  acadêmica, com forte identidade visual editorial e animações
  usando Framer Motion.

  ======================================================
  🔹 Estrutura de Dados
  ======================================================

  - experiences:
      Lista de experiências profissionais contendo:
        * Período
        * Cargo
        * Empresa
        * Localização
        * Descrição
        * Tecnologias (tags)

  - education:
      Lista de formações acadêmicas e certificações,
      com período, título, instituição e descrição.

  ======================================================
  🔹 ExperienceSection (Componente Principal)
  ======================================================

  - useInView:
      Detecta quando a seção entra na viewport
      e dispara as animações de entrada.

  Estrutura:
    1) Cabeçalho animado ".Experiencia"
    2) Timeline profissional
    3) Seção de Educação

  ======================================================
  🔹 Timeline Profissional
  ======================================================

  - Linha vertical fixa no lado esquerdo (efeito linha do tempo).
  - Cada item é renderizado pelo componente TimelineCard.

  ------------------------------------------------------
  🔹 TimelineCard
  ------------------------------------------------------

  Cada card contém:

  - Animação de entrada (fade + slide).
  - Ponto da timeline:
      * Aumenta de tamanho ao hover.
      * Rotaciona levemente.
  - Borda animada que muda de cor no hover.
  - Selo retro no canto com número da experiência (#01, #02...).
  - Cargo (título principal com leve skew ao hover).
  - Empresa + localização.
  - Badge do período com animação de escala e cor.
  - Descrição que desliza levemente ao hover.
  - Tags de tecnologias:
      * Animação vertical sutil em sequência.
      * Mudam de cor ao passar o mouse.
  - Linha inferior animada que cresce ao hover.

  Objetivo visual:
    Simular uma linha do tempo moderna
    com estética inspirada em layout editorial/jornal.

  ======================================================
  🔹 Seção de Educação
  ======================================================

  - Título ".Educacao" com destaque em cor primária.
  - Divisor ornamental estilo jornal.
  - Cards exibidos em grid responsivo.

  ------------------------------------------------------
  🔹 EducationCard
  ------------------------------------------------------

  Cada card possui:

  - Animação de entrada (fade + slide).
  - Borda tracejada estilo recorte de jornal ao hover.
  - Ano em destaque grande no canto superior direito.
  - Badge de período com inversão de cores ao hover.
  - Título que desliza levemente.
  - Linha divisória animada.
  - Nome da instituição com mudança de cor.
  - Descrição com variação de opacidade.
  - Linha inferior animada.
  - Pequenas marcas gráficas decorativas no canto.

  Objetivo visual:
    Criar aparência de recorte editorial
    com microinterações elegantes.

  ======================================================
  🎯 Objetivo Geral
  ======================================================

  Construir uma seção de experiência profissional
  visualmente rica e interativa, combinando:

    - Linha do tempo moderna
    - Estética editorial/minimalista
    - Microinterações suaves
    - Animações progressivas ao scroll
    - Feedback visual claro em hover

  Tecnologias utilizadas:
    - React
    - Framer Motion
    - Tailwind CSS

  Foco principal:
    Experiência visual premium,
    organização clara de carreira
    e forte identidade de design.
*/
"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

function TimelineCard({ exp, i, isInView }: any) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      className="relative pl-8 md:pl-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute left-0 md:left-8 top-2 -translate-x-[6px] bg-primary"
        animate={{
          width: isHovered ? 16 : 12,
          height: isHovered ? 16 : 12,
          rotate: isHovered ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      />

      <motion.div
        className="border border-border p-6 md:p-8 relative overflow-hidden"
        data-cursor-hover
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-black uppercase leading-none">
              {exp.role}
            </h3>

            <p className="font-mono text-xs uppercase tracking-widest text-primary mt-2">
              {exp.company} - {exp.location}
            </p>
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground whitespace-nowrap bg-muted px-4 py-2">
            {exp.period}
          </span>
        </div>

        <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-4">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag: string) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider border border-border px-3 py-1 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function EducationCard({ edu, i, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
      className="bg-muted p-6 md:p-8 border border-border"
      data-cursor-hover
    >
      <span className="inline-block font-mono text-xs uppercase tracking-widest px-3 py-1 mb-4 border text-primary border-primary">
        {edu.period}
      </span>

      <h4 className="font-serif text-xl font-black uppercase mt-3 mb-1">
        {edu.title}
      </h4>

      <div className="h-px bg-border my-3" />

      <p className="font-mono text-xs uppercase tracking-widest mb-4 text-muted-foreground">
        {edu.institution}
      </p>

      <p className="font-sans text-sm text-foreground/70 leading-relaxed">
        {edu.description}
      </p>
    </motion.div>
  )
}

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { lang } = useLanguage()
  const t = texts.experience

  const experiences = t.experiences[lang]
  const education = t.education[lang]

  return (
    <section id="experiencia" className="relative bg-background py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-6xl md:text-8xl font-black uppercase leading-none">
            {t.titleLine1[lang]}
            <br />
            <span className="text-primary">
              {t.titleLine2[lang]}
            </span>
          </h2>

          <div className="mt-4 h-[3px] w-24 bg-primary" />
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />
          <div className="flex flex-col gap-12">
            {experiences.map((exp: any, i: number) => (
              <TimelineCard key={i} exp={exp} i={i} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24"
        >
          <h3 className="font-serif text-4xl md:text-5xl font-black uppercase leading-none mb-4">
            {t.educationTitle[lang]}
          </h3>

          <div className="flex items-center gap-3 mb-12">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              {t.academicLabel[lang]}
            </span>
            <div className="h-[2px] flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu: any, i: number) => (
              <EducationCard key={i} edu={edu} i={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}