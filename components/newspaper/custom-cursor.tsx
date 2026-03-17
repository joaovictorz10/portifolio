/*
  Este código implementa um cursor customizado animado para o portifolio,
  substituindo completamente o cursor padrão do navegador (em dispositivos
  com ponteiro fino, ou seja, não touch).

  Ele utiliza Framer Motion para criar animações suaves,
  efeitos de mola (spring), rotação e transições dinâmicas.

  ======================================================
  🔹 Estados Controlados
  ======================================================
  - isHovering: indica se o cursor está sobre um elemento interativo.
  - isClicking: indica se o mouse está pressionado.
  - cursorText: texto exibido abaixo do cursor (via data-cursor-text).
  - visible: controla se o cursor deve aparecer (não aparece em touch).
  - trail: armazena pequenos pontos para criar o efeito de rastro.

  ======================================================
  🔹 Movimento com Física (Spring)
  ======================================================
  - cursorX / cursorY:
      Controlam a posição exata do ponto interno (segue o mouse com precisão).

  - ringX / ringY:
      Controlam o anel externo, que segue o mouse com leve atraso
      (efeito de suavização).

  - useSpring:
      Cria movimento mais natural com física (stiffness + damping).

  ======================================================
  🔹 useEffect (Eventos Globais)
  ======================================================
  Ao montar o componente:

  - Detecta se o dispositivo é touch → se for, não ativa.
  - Adiciona eventos globais:
      * mousemove → atualiza posição e rotação
      * mousedown → ativa estado de clique
      * mouseup → remove estado de clique
      * mouseover → detecta elementos interativos
      * mouseout → remove estado de hover

  Elementos considerados interativos:
      a, button, input, textarea, role="button"
      ou qualquer elemento com [data-cursor-hover]

  Se o elemento tiver data-cursor-text,
  o texto é exibido abaixo do cursor.

  ======================================================
  🔹 Efeitos Visuais
  ======================================================

  1) Remove cursor padrão:
     Aplica cursor: none via CSS global (apenas para pointer: fine).

  ------------------------------------------------------

  2) Ink Trail (rastro ao hover):
     - Pequenos pontos vermelhos aparecem ao mover o mouse
       enquanto está sobre elemento interativo.
     - Fade out + redução de escala.
     - Limitado aos últimos 5 pontos.

  ------------------------------------------------------

  3) Outer Ring (anel externo tipo crosshair):
     - Segue o mouse com leve atraso.
     - Muda de tamanho ao hover.
     - Encolhe ao clicar.
     - Rotaciona 45° ao hover.
     - Possui linhas centrais (mira).
     - Mostra "brackets" nos cantos quando em hover.
     - Exibe texto animado abaixo (cursorText).

  ------------------------------------------------------

  4) Inner Dot (ponto central):
     - Segue o mouse com precisão total.
     - Muda de tamanho ao hover e clique.
     - Alterna cor entre claro e vermelho.
     - Usa mixBlendMode: difference para contraste automático.

  ======================================================
  🎯 Objetivo Geral
  ======================================================
  Criar uma experiência visual imersiva e sofisticada,
  transformando o cursor em um elemento de identidade visual
  do portfólio.

  O componente adiciona:
    - Microinterações
    - Feedback visual claro
    - Efeito cinematográfico/editorial
    - Sensação de fluidez com física realista

  Tecnologias usadas:
    - React (estado e efeitos)
    - Framer Motion (animações e springs)
    - CSS mix-blend-mode
*/
"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [visible, setVisible] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

  const cursorX = useSpring(0, { stiffness: 800, damping: 35 })
  const cursorY = useSpring(0, { stiffness: 800, damping: 35 })

  const ringX = useSpring(0, { stiffness: 200, damping: 25 })
  const ringY = useSpring(0, { stiffness: 200, damping: 25 })

  const rotate = useMotionValue(0)
  const ringRotate = useTransform(rotate, [0, 360], [0, 360])

  let trailId = 0

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window
    if (isTouchDevice) return

    setVisible(true)

    let rotation = 0

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)

      rotation += 0.8
      rotate.set(rotation % 360)

      if (isHovering) {
        setTrail((prev) => {
          const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }]
          return newTrail.slice(-5)
        })
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest(
        "a, button, [data-cursor-hover], input, textarea, [role='button']"
      )
      if (interactive) {
        setIsHovering(true)
        const text = interactive.getAttribute("data-cursor-text") || ""
        setCursorText(text)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest(
        "a, button, [data-cursor-hover], input, textarea, [role='button']"
      )
      if (interactive) {
        setIsHovering(false)
        setCursorText("")
        setTrail([])
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [cursorX, cursorY, ringX, ringY, rotate, isHovering])

  if (!visible) return null

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Ink trail on hover */}
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            className="pointer-events-none fixed top-0 left-0 z-[9997]"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              left: point.x - 3,
              top: point.y - 3,
              width: 6,
              height: 6,
              backgroundColor: "#c8102e",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer crosshair ring - follows with lag */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovering ? 56 : isClicking ? 20 : 36,
            height: isHovering ? 56 : isClicking ? 20 : 36,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Crosshair lines */}
          <motion.div
            className="absolute bg-[#f5f0e8]"
            animate={{
              width: isHovering ? 56 : 36,
              height: 1,
              opacity: isClicking ? 0.4 : 0.8,
            }}
          />
          <motion.div
            className="absolute bg-[#f5f0e8]"
            animate={{
              width: 1,
              height: isHovering ? 56 : 36,
              opacity: isClicking ? 0.4 : 0.8,
            }}
          />

          {/* Corner brackets */}
          {!isClicking && (
            <>
              {/* Top-left */}
              <motion.div
                className="absolute"
                animate={{
                  top: isHovering ? -2 : 0,
                  left: isHovering ? -2 : 0,
                }}
              >
                <div className="w-2 h-[1px] bg-[#f5f0e8]" />
                <div className="w-[1px] h-2 bg-[#f5f0e8]" />
              </motion.div>
              {/* Top-right */}
              <motion.div
                className="absolute"
                animate={{
                  top: isHovering ? -2 : 0,
                  right: isHovering ? -2 : 0,
                }}
              >
                <div className="w-2 h-[1px] bg-[#f5f0e8] ml-auto" />
                <div className="w-[1px] h-2 bg-[#f5f0e8] ml-auto" />
              </motion.div>
              {/* Bottom-left */}
              <motion.div
                className="absolute flex flex-col justify-end"
                animate={{
                  bottom: isHovering ? -2 : 0,
                  left: isHovering ? -2 : 0,
                }}
              >
                <div className="w-[1px] h-2 bg-[#f5f0e8]" />
                <div className="w-2 h-[1px] bg-[#f5f0e8]" />
              </motion.div>
              {/* Bottom-right */}
              <motion.div
                className="absolute flex flex-col justify-end items-end"
                animate={{
                  bottom: isHovering ? -2 : 0,
                  right: isHovering ? -2 : 0,
                }}
              >
                <div className="w-[1px] h-2 bg-[#f5f0e8] ml-auto" />
                <div className="w-2 h-[1px] bg-[#f5f0e8]" />
              </motion.div>
            </>
          )}

          {/* Cursor text label */}
          <AnimatePresence>
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute -bottom-6 font-mono text-[7px] uppercase tracking-[0.2em] text-[#f5f0e8] whitespace-nowrap"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Inner dot - precise position */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovering ? 6 : isClicking ? 10 : 4,
            height: isHovering ? 6 : isClicking ? 10 : 4,
            backgroundColor: isHovering ? "#c8102e" : "#f5f0e8",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          style={{ mixBlendMode: "difference" }}
        />
      </motion.div>
    </>
  )
}
