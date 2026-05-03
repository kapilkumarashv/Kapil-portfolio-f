"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    document.documentElement.classList.add("theme-transition");
    setTheme(theme === "dark" ? "light" : "dark");
    setTimeout(
      () => document.documentElement.classList.remove("theme-transition"),
      500
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between"
          style={{
            background: scrolled
              ? "rgba(var(--bg-rgb), 0.85)"
              : "rgba(var(--bg-rgb), 0)",
            backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
            borderRadius: scrolled ? "16px" : "0",
            border: scrolled 
              ? "1px solid rgba(201,168,76,0.3)" 
              : "1px solid transparent",
            boxShadow: scrolled 
              ? "0 4px 30px rgba(0,0,0,0.3)" 
              : "none",
            padding: scrolled ? "12px 24px" : "12px 0",
            transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            suppressHydrationWarning
            className="font-display text-2xl tracking-wider gradient-text-gold"
          >
            KK
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                suppressHydrationWarning
                className="font-heading text-sm font-medium transition-all duration-300 hover:text-accent-gold relative group"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--accent-gold)" }}
                />
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {mounted && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            )}

            <motion.a
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#contact");
              }}
              className="hidden md:flex px-5 py-2 rounded-full font-heading text-sm font-semibold text-black"
              style={{ background: "var(--accent-gold)" }}
            >
              Hire Me
            </motion.a>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              suppressHydrationWarning
              style={{ color: "var(--text-primary)" }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "var(--bg)" }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => handleNav(link.href)}
                className="font-display text-5xl tracking-wide gradient-text-gold"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
