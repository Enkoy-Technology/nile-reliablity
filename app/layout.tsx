import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nile Reliability Solutions | Plant Reliability & Maintenance Experts',
  description: 'Expert plant reliability audits and engineering solutions. Turn maintenance from a cost center into a competitive advantage. Reduce downtime by up to 35% with our comprehensive plant audits.',
  keywords: 'plant reliability, maintenance engineering, industrial audits, preventive maintenance, reliability engineering, plant optimization',
  authors: [{ name: 'Nile Reliability Solutions' }],
  openGraph: {
    title: 'Nile Reliability Solutions | Plant Reliability & Maintenance Experts',
  description: 'Expert plant reliability audits and engineering solutions. Turn maintenance from a cost center into a competitive advantage.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}

