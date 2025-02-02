import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@/shared/styles/globals.css'
import MainProviders from '@/shared/provider/MainLayout'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

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
      <body className={`${roboto.className}`}>
        <MainProviders>
          {children}
        </MainProviders>
      </body>
    </html>
  )
}
