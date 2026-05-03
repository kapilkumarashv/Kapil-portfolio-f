"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative py-20 px-6 border-t-4"
      style={{ 
        borderColor: "var(--accent-gold)", 
        background: "var(--surface)",
        boxShadow: "0 -15px 50px rgba(201, 168, 76, 0.2)"
      }}
    >
      {/* Footer Shine Line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)", opacity: 0.3 }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Name */}
          <div>
            <span className="font-display text-3xl tracking-wider gradient-text-gold">
              {portfolioData.personal.name}
            </span>
            <p className="font-mono text-xs mt-1 tracking-widest" style={{ color: "var(--text-muted)" }}>
              {portfolioData.personal.tagline}
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            {[
              { icon: Github, href: portfolioData.personal.github },
              { icon: Linkedin, href: portfolioData.personal.linkedin },
              { icon: Mail, href: `mailto:${portfolioData.personal.email}` },
            ].map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, color: "var(--accent-gold)" }}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  background: "var(--card)",
                }}
              >
                <Icon size={16} />
              </motion.a>
            ))}

            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              suppressHydrationWarning
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "var(--accent-gold)", color: "#000" }}
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>

        <div
          className="mt-8 pt-8 border-t text-center font-mono text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Kapil Kumarash V. Built with Next.js,
            Framer Motion & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
