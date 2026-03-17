/*
  Este código define o componente Footer (rodapé) do portfólio,
  com animações sutis usando Framer Motion e ícones do Lucide React.

  ======================================================
  🔹 Estrutura Geral
  ======================================================

  - "use client": indica que o componente roda no lado do cliente.
  - motion (Framer Motion): adiciona microinterações animadas.
  - Ícones (Github, Linkedin, Mail): importados do lucide-react.

  O rodapé contém:
    1) Identidade/Nome
    2) Links sociais
    3) Copyright
    4) Barra decorativa inferior estilo editorial

  ======================================================
  🔹 Identidade (Nome + Cargo)
  ======================================================

  - Nome "Matheus Malta." com ponto em cor primária.
  - Animações:
      * Move levemente para a direita ao hover.
      * Aplica leve skew (inclinação horizontal) no texto.
  - Subtítulo "Software Engineer" em estilo mono,
    com visual discreto e espaçamento ampliado.

  Objetivo:
    Reforçar identidade pessoal com elegância e movimento sutil.

  ======================================================
  🔹 Links Sociais
  ======================================================

  - Lista dinâmica com:
      * GitHub
      * LinkedIn
      * Email

  - Cada ícone:
      * Aumenta de tamanho ao hover.
      * Rotaciona levemente.
      * Sobe alguns pixels.
      * Reduz escala ao clicar (feedback tátil).
      * Muda de cor para a cor primária.
      * Usa data-cursor-hover para integrar com cursor customizado.

  Objetivo:
    Criar microinterações divertidas e responsivas.

  ======================================================
  🔹 Copyright
  ======================================================

  - Texto em estilo mono e discreto:
      © 2026 Matheus Malta. Todos os direitos reservados.

  - Posicionado ao lado em telas maiores
    e empilhado em telas menores (layout responsivo).

  ======================================================
  🔹 Barra Inferior Estilo Jornal
  ======================================================

  - Duas linhas horizontais finas decorativas.
  - Texto central:
      "Desenvolvido com Next.js, Tailwind CSS & Framer Motion"

  - Visual inspirado em rodapés editoriais/jornalísticos.

  ======================================================
  🎯 Objetivo Geral
  ======================================================

  Criar um rodapé minimalista, elegante e interativo,
  mantendo a identidade visual do portfólio:

    - Microinterações suaves
    - Estética editorial
    - Layout responsivo
    - Feedback visual claro

  Tecnologias utilizadas:
    - React
    - Framer Motion
    - Tailwind CSS
    - Lucide React
*/
"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

export function Footer() {
  const { lang } = useLanguage()
  const t = texts.footer

  return (
    <footer className="bg-card border-t border-card-foreground/10 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Nome */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              className="font-serif text-2xl font-black text-card-foreground"
              whileHover={{ skewX: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t.name[lang]}
              <span className="text-primary">.</span>
            </motion.span>

            <p className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 mt-1">
              {t.role[lang]}
            </p>
          </motion.div>

          {/* Ícones */}
          <div className="flex items-center gap-6">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "mailto:matheus@malta.dev", label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-card-foreground/50 hover:text-primary transition-colors"
                aria-label={social.label}
                whileHover={{ scale: 1.3, rotate: -12, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                data-cursor-hover
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Direitos */}
          <p className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/30">
            &copy; 2026 {t.name[lang]}. {t.rights[lang]}
          </p>

        </div>

        {/* Barra inferior */}
        <div className="mt-8 pt-6 border-t border-card-foreground/10">
          <div className="flex flex-col gap-1">
            <div className="h-[2px] bg-card-foreground/10" />
            <div className="h-px bg-card-foreground/10" />
          </div>

          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-card-foreground/20 text-center mt-4">
            {t.developedWith[lang]}
          </p>
        </div>

      </div>
    </footer>
  )
}