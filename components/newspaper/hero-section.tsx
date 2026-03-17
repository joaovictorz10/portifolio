/*
======================================================
HERO SECTION - DOCUMENTAÇÃO DO COMPONENTE
======================================================

Descrição:
Esta seção representa a capa principal (Hero) do portfólio.
Ela ocupa a altura total da tela e aplica efeitos avançados
de animação, parallax 3D e microinterações com Framer Motion.

------------------------------------------------------
FUNCIONALIDADES PRINCIPAIS
------------------------------------------------------

1) Parallax baseado no mouse
- Captura posição do cursor relativa ao container.
- useMotionValue armazena posição X/Y.
- useSpring suaviza o movimento.
- useTransform converte valores em deslocamento e rotação.
- Cria efeito de profundidade (camadas independentes).

2) Rotação 3D sutil
- rotateX e rotateY variam levemente conforme o mouse.
- transformPerspective cria sensação real de profundidade.

3) Efeito Scramble (texto embaralhado)
- Texto original: "Transformando ideias em codigo".
- Durante ~30 frames, caracteres aleatórios aparecem.
- Progressivamente o texto real é revelado.
- Implementado com useEffect + setInterval.
- Gera efeito estilo glitch/hacker elegante.

4) Grain Overlay (textura)
- SVG noise embutido em base64.
- Opacidade extremamente baixa.
- Simula textura de papel/jornal.
- Animação contínua para efeito orgânico.

5) Elementos Visuais
- Letras decorativas "M" gigantes com baixa opacidade.
- Headline principal com tipografia serif forte.
- Hover com tracking, skew e scale.
- Informações secundárias com underline animado.
- Linha editorial dupla decorativa.
- Indicador animado de scroll.

------------------------------------------------------
ESTRUTURA VISUAL
------------------------------------------------------

Topo:
Linha editorial com "Portfolio & Resume".

Centro:
Nome principal com parallax em camadas.
Subtítulo e informações profissionais.

Base:
Linha decorativa estilo jornal.
Informações de edição (Vol. I - Ed. 2026).
Indicador animado de scroll.

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

Criar uma primeira impressão impactante com:

- Profundidade visual
- Movimento fluido
- Microinterações refinadas
- Identidade editorial moderna
- Experiência premium

======================================================
*/
"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

export function HeroSection() {
  const { lang } = useLanguage()
  const t = texts.hero

  const containerRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const layer1X = useTransform(smoothX, [-0.5, 0.5], [20, -20])
  const layer1Y = useTransform(smoothY, [-0.5, 0.5], [15, -15])
  const layer2X = useTransform(smoothX, [-0.5, 0.5], [-15, 15])
  const layer2Y = useTransform(smoothY, [-0.5, 0.5], [-10, 10])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3])

  const [scrambledSubtitle, setScrambledSubtitle] = useState(t.subtitle[lang])
  const originalText = t.subtitle[lang]
  const chars =
    "!@#$%^&*()_+-={}[]|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  useEffect(() => {
    let frame = 0
    const totalFrames = 30
    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const revealed = Math.floor(progress * originalText.length)

      const result = originalText
        .split("")
        .map((char, i) => {
          if (i < revealed) return char
          if (char === " ") return " "
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")

      setScrambledSubtitle(result)

      if (frame >= totalFrames) clearInterval(interval)
    }, 40)

    return () => clearInterval(interval)
  }, [originalText])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-32 w-full">
        <motion.div
          className="flex flex-col gap-8"
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
        >
          {/* Top line */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t.topLine[lang]}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Main headline */}
          <div className="flex flex-col items-center text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
              {t.role[lang]}
            </p>

            <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black leading-[0.85] tracking-tight text-foreground uppercase">
              {t.firstName[lang]}
              <br />
              <span className="text-primary">{t.lastName[lang]}</span>
            </h1>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t.info[lang].map((text: string, i: number) => (
                <span key={text}>
                  {i > 0 && <span className="hidden sm:inline mr-6">|</span>}
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="mt-8 flex flex-col gap-1">
            <div className="h-[3px] bg-foreground" />
            <div className="h-px bg-foreground" />
          </div>

          {/* Edition info */}
          <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>{t.edition[lang]}</span>
            <span className="hidden sm:block">{`"${scrambledSubtitle}"`}</span>
            <span className="hidden sm:block">{t.price[lang]}</span>
          </div>

          {/* Scroll */}
          <div className="flex justify-center mt-12">
            <a
              href="#sobre"
              className="flex flex-col items-center gap-2 group"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                {t.scroll[lang]}
              </span>
              <div className="w-px h-8 bg-primary group-hover:h-12 transition-all duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}