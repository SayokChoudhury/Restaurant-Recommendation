import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Lumina AI - Restaurant Recommendations",
  description: "AI engine curates the perfect dining spot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${plusJakartaSans.className} min-h-screen flex flex-col overflow-x-hidden relative font-body-md`}>
        <header className="hidden md:flex justify-between items-center px-margin-desktop h-20 w-full fixed top-0 z-50 backdrop-blur-xl bg-surface/10 shadow-[0px_10px_40px_rgba(168,85,247,0.15)]">
          <div className="font-display-lg text-display-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">LUMINA</div>
        </header>
        {children}
      </body>
    </html>
  );
}
