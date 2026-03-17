import type { Metadata } from 'next'
// 1. Importe as novas fontes do Google Fonts
import { Montserrat, Lora, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

// 2. Configure as fontes (mantendo as variáveis originais para não quebrar o CSS)
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-playfair' })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-jetbrains' })

// 3. Atualize os metadados para o seu nome
export const metadata: Metadata = {
  title: 'João Victor | Software Engineer',
  description: 'Portfolio de João Victor - Engenheiro de Software',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        // 4. Use as novas constantes aqui
        className={`${montserrat.variable} ${lora.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        {/* 🌍 PROVIDER GLOBAL DE IDIOMA */}
        <LanguageProvider>
          {children}
        </LanguageProvider>

        <Analytics />
      </body>
    </html>
  )
}