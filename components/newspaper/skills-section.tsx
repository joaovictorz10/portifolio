/*
======================================================
SKILLS SECTION - DOCUMENTAÇÃO DO COMPONENTE
======================================================

Descrição:
Componente de seção de habilidades e tecnologias do portfólio,
com cards de categorias, barras de proficiência animadas e tags
interativas usando Framer Motion. Inclui microinterações e efeitos
retro/hover.

------------------------------------------------------
FUNCIONALIDADES PRINCIPAIS
------------------------------------------------------

1) Grid de Habilidades
- Exibe categorias de habilidades (Frontend, Backend, Ferramentas)
- Cada card exibe:
  * Título da categoria
  * Skills com nome e nível (%)
  * Barra de progresso animada
- Interações:
  * Efeito parallax 3D baseado no mouse
  * Registro retro/quadros de impressão nas bordas ao hover
  * Habilidades animam (deslocamento, cor, escala e rotação) ao hover

2) Barra de Habilidade (SkillBar)
- Animação do preenchimento da barra baseado no nível da skill
- Brilho animado sobre a barra ao hover
- Nomes e níveis animam levemente com escala e rotação

3) Tags de Tecnologias (TechTag)
- Lista de tecnologias/ferramentas com microinterações
- Efeito hover:
  * Escala e rotação leve
  * Mudança de cor de fundo e borda
  * Retro ink stamp animado
- Sequência de entrada animada com delay incremental

4) Layout e Estrutura
- Section com id="habilidades" e padding top/bottom
- Header estilizado com efeito tipográfico e underline animado
- Grid responsivo adaptável (1 coluna mobile, 3 colunas desktop)
- Uso de useRef e useInView para animações só quando visíveis

------------------------------------------------------
TECNOLOGIAS UTILIZADAS
------------------------------------------------------

- React
- Next.js (Client Component)
- Framer Motion
- Tailwind CSS

------------------------------------------------------
OBJETIVO DO DESIGN
------------------------------------------------------

- Destacar habilidades de forma visual e interativa
- Engajar usuário com microinterações e efeitos retro
- Layout limpo, moderno e responsivo
- Experiência imersiva com parallax, hover e animações suaves

======================================================
*/
"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

function SkillBar({ skill, catIndex, skillIndex, isInView }: any) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="flex justify-between mb-2">
        <motion.span
          className="font-mono text-xs uppercase tracking-widest text-foreground"
          animate={{ x: isHovered ? 4 : 0 }}
        >
          {skill.name}
        </motion.span>

        <motion.span
          className="font-serif text-lg font-black text-primary"
          animate={{ scale: isHovered ? 1.2 : 1 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      <div className="h-2 bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{
            duration: 1,
            delay: catIndex * 0.15 + skillIndex * 0.1 + 0.3,
          }}
          className="h-full bg-primary"
        />
      </div>
    </div>
  )
}

function SkillCard({ category, catIndex, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: catIndex * 0.15 }}
      className="border border-border p-8"
    >
      <h3 className="font-serif text-2xl font-black uppercase mb-2">
        {category.title}
      </h3>

      <div className="h-[2px] w-12 bg-primary mb-8" />

      <div className="flex flex-col gap-6">
        {category.skills.map((skill: any, skillIndex: number) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            catIndex={catIndex}
            skillIndex={skillIndex}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  )
}

function TechTag({ tag, index, isInView }: any) {
  const [isHovered, setIsHovered] = useState(false)

  const rotation = useCallback(() => {
    const rotations = [2, -3, 1.5, -2, 3, -1, 2.5, -2.5, 1, -1.5]
    return rotations[index % rotations.length]
  }, [index])

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: 0.6 + index * 0.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="font-mono text-xs uppercase tracking-wider border px-4 py-2 inline-block"
      style={{
        backgroundColor: isHovered ? "#c8102e" : "transparent",
        borderColor: isHovered ? "#c8102e" : "#3a3a3a",
        transform: isHovered
          ? `scale(1.15) rotate(${rotation()}deg)`
          : "scale(1) rotate(0deg)",
        transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {tag}
    </motion.span>
  )
}

export function SkillsSection() {
  const { lang } = useLanguage()
  const section = texts.skills
  const categories = section.categories[lang]
  const techTags = section.techTags

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="habilidades" className="bg-background py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h2 className="font-serif text-6xl md:text-8xl font-black uppercase leading-none">
            <span>{section.titleLine1[lang]}</span>
            <br />
            <span className="text-primary">
              {section.titleLine2[lang]}
            </span>
          </h2>

          <div className="mt-4 h-[3px] w-24 bg-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {categories.map((category: any, catIndex: number) => (
            <SkillCard
              key={category.title}
              category={category}
              catIndex={catIndex}
              isInView={isInView}
            />
          ))}
        </div>

        <div className="border-t-2 border-b-2 border-foreground py-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-center mb-6">
            {section.techTitle[lang]}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {techTags.map((tag: string, i: number) => (
              <TechTag key={tag} tag={tag} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}