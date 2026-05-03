"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -120]);
  const y2 = useTransform(scrollY, [0, 600], [0, -60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const charVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.8 + i * 0.05,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  };

  const name = portfolioData.personal.name;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-20 flex flex-col items-center justify-center overflow-hidden scanlines"
      style={{ background: "transparent" }}
    >
      {/* Glow orbs - specific to hero focus */}
      <motion.div
        style={{ 
          y: y2,
          background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)"
        }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Profile Image & Badge Container */}
        <div className="flex flex-col items-center mb-8 mt-12">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative group mb-8"
          >
            {/* Animated Glow Rings */}
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)",
                filter: "blur(20px)",
                margin: "-10px"
              }}
            />
            
            <motion.div
              animate={{ 
                rotate: 360 
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4px] rounded-full"
              style={{
                padding: "2px",
                background: "conic-gradient(from 0deg, transparent, var(--accent-gold), transparent, var(--accent-gold), transparent)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

          <motion.div 
            whileInView={{ 
              scale: [1, 1.05, 1],
              boxShadow: ["0 0 20px rgba(201,168,76,0.2)", "0 0 40px rgba(201,168,76,0.5)", "0 0 20px rgba(201,168,76,0.2)"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[var(--accent-gold)] z-10"
          >
            <img 
              src="/assets/Kapil-Kumarash-v-Portfolio-image.jpeg" 
              alt={portfolioData.personal.name}
              className="w-full h-full object-cover grayscale-[10%] md:grayscale-[40%] md:group-hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

            {/* Floating Particles/Glows */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
              style={{ background: "var(--accent-gold)", filter: "blur(4px)" }}
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-widest border"
            style={{
              background: "rgba(201,168,76,0.08)",
              borderColor: "rgba(201,168,76,0.3)",
              color: "var(--accent-gold)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--accent-gold)" }}
            />
            AVAILABLE FOR OPPORTUNITIES
          </motion.div>
        </div>

        {/* Name — character by character */}
        <div className="overflow-hidden mb-4">
          <h1 className="font-display text-[clamp(48px,10vw,130px)] leading-none tracking-wider">
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{
                  color:
                    char === " "
                      ? "transparent"
                      : i < name.indexOf(" ")
                      ? "var(--text-primary)"
                      : "var(--accent-gold)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6"
        >
          <span className="font-heading text-xl md:text-3xl font-light tracking-[0.2em] uppercase gradient-text-cyan">
            {portfolioData.personal.role}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="font-mono text-sm md:text-base tracking-widest mb-12"
          style={{ color: "var(--text-muted)" }}
        >
          {portfolioData.personal.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(201,168,76,0.4)" }}
            whileTap={{ scale: 0.97 }}
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-full font-heading font-semibold text-sm tracking-wide transition-all duration-300"
            style={{ 
              backgroundColor: "var(--accent-gold)",
              color: "#000000"
            }}
          >
            VIEW MY WORK
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-full font-heading font-semibold text-sm tracking-wide border"
            style={{
              color: "var(--text-primary)",
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            GET IN TOUCH
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: Github, href: portfolioData.personal.github, label: "GitHub" },
            { icon: Linkedin, href: portfolioData.personal.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${portfolioData.personal.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, color: "var(--accent-gold)" }}
              className="flex flex-col items-center gap-1 transition-colors duration-300"
              style={{ color: "var(--text-muted)" }}
            >
              <Icon size={20} />
              <span className="font-mono text-[10px] tracking-widest">{label}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent-gold), transparent)" }}
      />
    </section>
  );
}
