import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"
import Footer from "@/components/Footer"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"], // Specify weights you want to use
  subsets: ["latin"],
  display: "swap", // Optional: controls font display behavior
})

export const metadata: Metadata = {
  title: "ANDA - Professional Fishing Lures Manufacturer",
  description:
    "ANDA is a leading manufacturer of high-quality fishing lures, dedicated to providing anglers worldwide with innovative and effective fishing solutions.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <LanguageProvider>
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
