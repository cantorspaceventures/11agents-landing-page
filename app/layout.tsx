import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import BackgroundAudio from "@/components/BackgroundAudio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "11agents | Scale Without Humans",
  description: "The Sovereign Startup. Deploy a synthetic C-Suite of 11 specialized AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased bg-[#050505] text-white`}
      >
        <Providers>
          {children}
          <BackgroundAudio />
        </Providers>
      </body>
    </html>
  );
}
