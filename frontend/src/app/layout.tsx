import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/shared/Navbar"
import AuthProvider from "@/providers/AuthProvider"
import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider"

const inter = Inter({ subsets: ["latin"] })

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={poppins.className}>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}
