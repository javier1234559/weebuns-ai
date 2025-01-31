import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import '@/shared/styles/globals.css'
import MainProviders from '@/shared/provider/MainLayout'

const noto_sans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Weebuns AI Learning English',
  description: 'Weebuns AI Learning English',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${noto_sans.className} `}>
        <MainProviders >
          {children}
        </MainProviders>
      </body>
    </html>
  )
}
