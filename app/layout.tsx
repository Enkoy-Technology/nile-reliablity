import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nile Reliability Solutions | Industrial Reliability & Condition Monitoring',
  description: 'Ethiopia\'s leading provider of condition monitoring and predictive maintenance services. We help industries optimize equipment reliability and prevent unplanned downtime through vibration analysis, thermography, and oil analysis.',
  keywords: 'plant reliability, condition monitoring, vibration analysis, thermography, oil analysis, maintenance engineering, Ethiopia industrial services, predictive maintenance',
  authors: [{ name: 'Nile Reliability Solutions' }],
  openGraph: {
    title: 'Nile Reliability Solutions | Industrial Reliability & Condition Monitoring',
    description: 'Ethiopia\'s leading provider of condition monitoring and predictive maintenance services. Expert plant reliability audits and engineering solutions.',
    url: 'https://nilereliability.com',
    siteName: 'Nile Reliability Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nile Reliability Solutions | Industrial Reliability & Condition Monitoring',
    description: 'Expert plant reliability audits and engineering solutions for industrial excellence.',
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

