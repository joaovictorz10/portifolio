/*
  Este código define uma seção "Download de Currículo" animada,
  com efeito de parallax baseado no movimento do mouse
  e animações suaves usando Framer Motion.

  ======================================================
  🔹 Estrutura Geral
  ======================================================
  - "use client": executa no lado do cliente (Next.js App Router).
  - useInView: dispara animações quando a seção entra na viewport.
  - useMotionValue + useSpring + useTransform:
      criam um efeito de movimento suave (parallax) no fundo.
  - Ícones (Download, FileText) vêm do lucide-react.

  A seção contém:
    1) Texto de fundo gigante "CV" com movimento dinâmico
    2) Título e descrição
    3) Botões de download
    4) Elemento decorativo inferior estilo editorial

  ======================================================
  🔹 Efeito Parallax no Background
  ======================================================
  - mouseX / mouseY:
      capturam a posição relativa do mouse dentro da seção.

  - smoothX / smoothY:
      aplicam suavização com física (useSpring).

  - bgX / bgY:
      convertem o movimento do mouse em deslocamento
      do texto de fundo (efeito parallax).

  Resultado:
    O texto gigante "CV" se move levemente
    acompanhando o movimento do mouse,
    criando profundidade visual.

  ======================================================
  🔹 Cabeçalho Animado
  ======================================================
  - Título ".Baixar Curriculo":
      * Efeito skew ao hover.
      * Aumento de espaçamento na segunda linha.
  - Linha decorativa central abaixo do título.
  - Entrada com fade + slide quando aparece na tela.

  ======================================================
  🔹 Texto Descritivo
  ======================================================
  - Explica que o usuário pode baixar o currículo em PDF.
  - Animação de fade ao entrar na viewport.

  ======================================================
  🔹 Botões de Ação
  ======================================================

  1) Botão "Download CV - PDF"
     - Escala e leve rotação ao hover.
     - Animação de overlay subindo.
     - Ícone com efeito bounce.
     - whileTap reduz escala (feedback de clique).
     - data-cursor-text ativa texto no cursor customizado.

  2) Botão "Ver Online"
     - Escala e rotação oposta ao primeiro botão.
     - Overlay desliza horizontalmente.
     - Texto muda de cor ao hover.
     - Também integra com o cursor customizado.

  ======================================================
  🔹 Decoração Inferior (Estilo Jornal)
  ======================================================
  - Linhas horizontais decorativas.
  - Informações adicionais:
      * Última atualização
      * Formato do arquivo
  - Entrada com fade progressivo.

  ======================================================
  🎯 Objetivo Geral
  ======================================================
  Criar uma seção elegante e interativa para download
  do currículo, com:

    - Parallax suave
    - Microinterações refinadas
    - Estética editorial/minimalista
    - Feedback visual claro em hover e clique

  Tecnologias utilizadas:
    - React
    - Framer Motion
    - Tailwind CSS
    - Lucide React

  O foco está na experiência visual premium
  e sensação de profundidade com movimento sutil.
*/
"use client"

import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { Download, FileText } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

export function DownloadSection() {
  const { lang } = useLanguage()
  const t = texts.download

  const ref = useRef(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const bgX = useTransform(smoothX, [-0.5, 0.5], [30, -30])
  const bgY = useTransform(smoothY, [-0.5, 0.5], [20, -20])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="download"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative bg-background py-24 md:py-32 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ x: bgX, y: bgY }}
      >
        <span className="font-serif text-[15rem] md:text-[25rem] font-black text-foreground/[0.03] uppercase leading-none">
          CV
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6" ref={ref}>
        <div className="flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl font-black text-foreground uppercase leading-none mb-4">
              <motion.span>
                {t.titleLine1[lang]}
              </motion.span>
              <br />
              <motion.span className="text-primary">
                {t.titleLine2[lang]}
              </motion.span>
            </h2>

            <div className="h-[3px] w-24 bg-primary mx-auto mb-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-xl text-foreground/70 max-w-lg mb-12 leading-relaxed"
          >
            {t.description[lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="/cv.pdf"
              download
              className="group relative flex items-center gap-4 bg-primary text-primary-foreground px-8 py-5 font-mono text-xs uppercase tracking-widest overflow-hidden"
            >
              <Download size={18} />
              <span>{t.downloadButton[lang]}</span>
            </motion.a>

            <motion.a
              href="/cv.pdf"
              target="_blank"
              className="group relative flex items-center gap-4 border-2 border-foreground text-foreground px-8 py-5 font-mono text-xs uppercase tracking-widest overflow-hidden"
            >
              <FileText size={18} />
              <span>{t.viewOnline[lang]}</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 w-full max-w-2xl"
          >
            <div className="flex justify-between mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>{t.lastUpdate[lang]}</span>
              <span>{t.format[lang]}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}