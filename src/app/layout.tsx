import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import GlobalBackground from "@/components/ui/GlobalBackground";

export const metadata: Metadata = {
  title: "Kapil Kumarash V — Full Stack Developer",
  description:
    "Portfolio of Kapil Kumarash V — Flutter, MERN, Next.js developer. SIH 2025 Finalist. Building cross-platform apps and AI-powered platforms.",
  keywords: ["Flutter", "MERN", "Next.js", "Full Stack Developer", "Portfolio"],
  openGraph: {
    title: "Kapil Kumarash V — Full Stack Developer",
    description: "Flutter • MERN • Next.js • AI Integration",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <GlobalBackground />
          <CustomCursor />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
