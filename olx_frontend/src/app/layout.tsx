import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css";

import { ReduxProvider, store } from "@/providers/redux";
import { LoadFromStorage } from "@/utils/LoadFromStorage";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  // title: "Sales",
  description: "An app to sale products",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <ReduxProvider>
      < LoadFromStorage />
        <body className={(inter.className)}>
          <div className="min-h-scree">
            {children}
          </div>
        </body>
      </ReduxProvider>



    </html>
  )
}
