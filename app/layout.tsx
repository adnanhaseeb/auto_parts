import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClientProviders } from '@/src/components/ClientProviders';
import '@/src/index.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auto Parts - Quality Automotive Parts & Accessories',
  description: 'Your trusted source for premium automotive parts and accessories. Contact us at 1234567890 or abc@gmail.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
