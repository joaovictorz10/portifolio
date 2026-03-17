"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, FormEvent } from "react"
import { Mail, MapPin, Phone, Github, Linkedin, Send, Loader2 } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"
import emailjs from '@emailjs/browser'

export function ContactSection() {
  const { lang } = useLanguage()
  const t = texts.contact

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Estados do formulário e carregamento
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Disparo do email com as suas chaves reais atualizadas!
      await emailjs.send(
        'service_p9kcjgo',     // Seu Service ID
        'template_xyilnpi',    // <--- Seu NOVO Template ID aqui
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        '___TqJ2bCPC2gsevV'    // Sua Public Key
      )
      
      alert(lang === 'pt' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!')
      setFormData({ name: "", email: "", subject: "", message: "" }) // Limpa os campos
    } catch (error) {
      console.error(error)
      alert(lang === 'pt' ? 'Erro ao enviar a mensagem. Tente novamente.' : 'Error sending message. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "jmarquito@sga.pucminas.br",
      href: "mailto:jmarquito@sga.pucminas.br",
    },
    {
      icon: Phone,
      label: lang === "pt" ? "Telefone" : "Phone",
      value: "+55 (31) 984162503",
      href: "tel:+5581984162503",
    },
    {
      icon: MapPin,
      label: lang === "pt" ? "Localização" : "Location",
      value: lang === "pt" ? "Belo Horizonte, MG - Brasil" : "Belo Horizonte, MG - Brasil",
      href: "#",
    },
  ]

  const socials = [
    { icon: Github, label: "GitHub", value: "github.com/joaovictorz10", href: "#" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/", href: "#" },
  ]

  return (
    <section id="contato" className="relative bg-card py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-6xl md:text-8xl font-black text-card-foreground uppercase leading-none">
            <motion.span whileHover={{ skewX: -5 }}>
              {t.titleLine1[lang]}
            </motion.span>
            <br />
            <motion.span
              className="text-primary"
              whileHover={{ letterSpacing: "0.05em" }}
            >
              {t.titleLine2[lang]}
            </motion.span>
          </h2>

          <motion.div
            className="mt-4 h-[3px] w-24 bg-primary"
            whileHover={{ width: 192 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5"
          >
            <p className="font-serif text-2xl text-card-foreground leading-relaxed mb-8">
              {t.intro[lang]}
            </p>

            <div className="flex flex-col gap-6 mb-8">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-start gap-4"
                >
                  <motion.div
                    className="bg-card-foreground/5 p-3 group-hover:bg-primary transition-colors"
                    whileHover={{ rotate: -8, scale: 1.1 }}
                  >
                    <item.icon
                      size={18}
                      className="text-card-foreground group-hover:text-primary-foreground transition-colors"
                    />
                  </motion.div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50">
                      {item.label}
                    </p>
                    <p className="font-sans text-sm text-card-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="border-t border-card-foreground/10 pt-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 mb-4">
                {t.socialTitle[lang]}
              </p>

              <div className="flex flex-col gap-4">
                {socials.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    className="group flex items-center gap-3 text-card-foreground hover:text-primary transition-colors"
                    whileHover={{ x: 8 }}
                  >
                    <motion.div whileHover={{ rotate: 360 }}>
                      <item.icon size={18} />
                    </motion.div>
                    <span className="font-mono text-xs uppercase tracking-widest">
                      {item.value}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-7"
          >
            <div className="border border-card-foreground/10 p-8 md:p-10">
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-8">
                {t.formTitle[lang]}
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 block mb-2">
                      {t.fields.name[lang]}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t.placeholders.name[lang]}
                      className="w-full bg-transparent border-b-2 border-card-foreground/20 py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors placeholder:text-card-foreground/30"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 block mb-2">
                      {t.fields.email[lang]}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t.placeholders.email[lang]}
                      className="w-full bg-transparent border-b-2 border-card-foreground/20 py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors placeholder:text-card-foreground/30"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 block mb-2">
                    {t.fields.subject[lang]}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t.placeholders.subject[lang]}
                    className="w-full bg-transparent border-b-2 border-card-foreground/20 py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors placeholder:text-card-foreground/30"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 block mb-2">
                    {t.fields.message[lang]}
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t.placeholders.message[lang]}
                    className="w-full bg-transparent border-b-2 border-card-foreground/20 py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors resize-none placeholder:text-card-foreground/30"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-mono text-xs uppercase tracking-widest self-start disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  {isSubmitting ? (lang === 'pt' ? 'Enviando...' : 'Sending...') : t.button[lang]}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}