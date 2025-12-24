import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nile Reliability Solutions | Industrial Reliability & Condition Monitoring',
  description: 'Ethiopia\'s leading provider of condition monitoring and predictive maintenance services. We help industries optimize equipment reliability and prevent unplanned downtime through vibration analysis, thermography, and oil analysis.',
  keywords: 'plant reliability, condition monitoring, vibration analysis, thermography, oil analysis, maintenance engineering, Ethiopia industrial services, predictive maintenance',
  authors: [{ name: 'Nile Reliability Solutions' }],
  metadataBase: new URL('https://nilereliability.com'),
  openGraph: {
    title: 'Nile Reliability Solutions | Industrial Reliability & Condition Monitoring',
    description: 'Ethiopia\'s leading provider of condition monitoring and predictive maintenance services. Expert plant reliability audits and engineering solutions.',
    url: 'https://nilereliability.com',
    siteName: 'Nile Reliability Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA2MjZ8MHwxfHNlYXJjaHw3fHxpbmR1c3RyaWFsJTIwbWFjaGluZXJ5JTIwY29uZGl0aW9uJTIwbW9uaXRvcmluZ3xlbnwwfHx8fDE3NjY1NTUxODF8MA&ixlib=rb-4.1.0&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Nile Reliability Solutions - Industrial Reliability & Condition Monitoring',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nile Reliability Solutions | Industrial Reliability & Condition Monitoring',
    description: 'Expert plant reliability audits and engineering solutions for industrial excellence.',
    images: ['https://images.unsplash.com/photo-1717386255773-a456c611dc4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA2MjZ8MHwxfHNlYXJjaHw3fHxpbmR1c3RyaWFsJTIwbWFjaGluZXJ5JTIwY29uZGl0aW9uJTIwbW9uaXRvcmluZ3xlbnwwfHx8fDE3NjY1NTUxODF8MA&ixlib=rb-4.1.0&q=80&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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

