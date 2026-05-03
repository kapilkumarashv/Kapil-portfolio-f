"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Presentation, Mic2, Star } from "lucide-react";

export default function PresentationsSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper id="presentations" label="// 006" title="PRESENTATIONS &" titleAccent="WORKSHOPS">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioData.presentations.map((p, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: i % 2 === 0 ? -20 : 20,
              borderColor: "rgba(255,255,255,0.1)", // Fallback for var(--border)
              boxShadow: "0 0px 0px rgba(0,0,0,0)"
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ 
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: i * 0.05
            }}
            whileHover={{
              y: -12,
              rotateY: i % 2 === 0 ? 2 : -2,
              scale: 1.02,
              borderColor: "var(--accent-gold)",
              boxShadow: "0 25px 60px rgba(201,168,76,0.2)",
            }}
            className="group relative flex items-start gap-6 p-8 rounded-3xl border overflow-hidden transition-all duration-300 cursor-default"
            style={{ 
              background: "var(--card)", 
              borderColor: "var(--border)",
              perspective: "1000px"
            }}
          >
            {/* Border Blink Effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none z-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0] }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.05 + 0.3, duration: 0.8 }}
              style={{ border: "2px solid var(--accent-gold)" }}
            />
            {/* Golden Scan Effect */}
            <motion.div 
              className="absolute inset-0 z-0 pointer-events-none"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "200%", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ 
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
                width: "50%",
                transform: "skewX(-30deg)"
              }}
            />

            {/* Glowing Corner */}
            <div 
              className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none rounded-full"
              style={{ background: "radial-gradient(circle, var(--accent-gold), transparent 70%)", filter: "blur(20px)" }}
            />

            {/* Numbering */}
            <div className="absolute top-4 right-6 font-mono text-[40px] font-black opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none italic">
              0{i + 1}
            </div>

            {/* Icon wrapper with animated border */}
            <div className="relative flex-shrink-0">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-4px] rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity"
                style={{ border: "1px dashed var(--accent-gold)" }}
              />
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                style={{ 
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.2)" 
                }}
              >
                {i % 2 === 0 ? (
                  <Presentation size={24} className="text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
                ) : (
                  <Mic2 size={24} className="text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
                )}
              </div>
            </div>

            <div className="flex-1 space-y-3 relative z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: "var(--accent-gold)" }}>
                  Achievement
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-[rgba(201,168,76,0.4)] to-transparent" />
              </div>
              
              <h3 
                className="font-heading text-lg md:text-xl font-medium leading-relaxed tracking-wide group-hover:text-white transition-colors duration-300"
                style={{ color: "var(--text-primary)" }}
              >
                {p}
              </h3>

              <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <Star size={14} className="text-[var(--accent-gold)] fill-[var(--accent-gold)] opacity-50" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Verified spotlight</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative summary line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-12 h-px w-full origin-left opacity-20"
        style={{ background: "linear-gradient(to right, transparent, var(--accent-gold), transparent)" }}
      />
    </SectionWrapper>
  );
}
