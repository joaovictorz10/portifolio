"use client"

import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AboutSection() {
  const { lang } = useLanguage()
  const t = texts[lang].about

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [imgHovered, setImgHovered] = useState(false)

  return (
    <section id="sobre" className="relative bg-card py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-6xl md:text-8xl font-black text-card-foreground uppercase leading-none">
            <motion.span whileHover={{ skewX: -5 }}>
              {t.titleLine1}
            </motion.span>
            <br />
            <motion.span className="text-primary" whileHover={{ letterSpacing: "0.05em" }}>
              {t.titleLine2}
            </motion.span>
          </h2>
          <div className="mt-4 h-[3px] w-24 bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7"
          >
            <div
              className="relative mb-10"
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            >
              <div className="relative overflow-hidden border-2 border-card-foreground/20 max-w-xs">
                <motion.div animate={{ scale: imgHovered ? 1.05 : 1 }}>
                  <Image
                    src="/images/asd.jpeg"
                    alt="Davi Nunes"
                    width={320}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-card-foreground/90 px-4 py-3"
                  initial={{ y: "100%" }}
                  animate={{ y: imgHovered ? "0%" : "100%" }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-card">
                    {t.imageCaption}
                  </p>
                </motion.div>
              </div>

              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-card-foreground/40 mt-2">
                {t.photoCredit}
              </p>
            </div>

            <p className="font-serif text-2xl leading-relaxed mb-8">
              {t.paragraph1}
            </p>
            <p className="text-card-foreground/70 mb-6">
              {t.paragraph2}
            </p>
            <p className="text-card-foreground/70">
              {t.paragraph3}
            </p>

            <div className="mt-8 pt-8 border-t-2 border-card-foreground/10">
              <p className="font-mono text-xs uppercase tracking-widest text-card-foreground/50 mb-2">
                {t.signatureLabel}
              </p>
              <p className="font-serif text-2xl italic">
                Davi Nunes
              </p>
              <p className="font-mono text-xs text-primary uppercase tracking-widest mt-1">
                {t.role}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-5"
          >
            <TiltCard className="bg-card-foreground/5 p-8 border border-card-foreground/10">
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-8">
                {t.personalDataTitle}
              </h3>

              {t.personalData.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex justify-between py-3 ${
                    i !== t.personalData.length - 1
                      ? "border-b border-card-foreground/10"
                      : ""
                  }`}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-card-foreground/50">
                    {item.label}
                  </span>
                  <span className="font-sans text-sm font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </TiltCard>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {t.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-primary text-primary-foreground p-4 text-center"
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                  whileHover={{ scale: 1.08 }}
                >
                  <p className="font-serif text-3xl font-black">
                    {stat.number}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}