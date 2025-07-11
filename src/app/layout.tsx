import type { Metadata } from "next";
import { Roboto, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import MainProviders from "@/provider/MainLayout";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Weebuns AI Learning English",
  description: "Weebuns AI Learning English",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${spaceGrotesk.variable}`}>
        <MainProviders>{children}</MainProviders>
      </body>
    </html>
  );
}
