"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Trophy, Medal, Award, Code, Zap } from "lucide-react";

const getIcon = (iconStr: string) => {
  switch (iconStr) {
    case "🏆": return <Trophy size={24} className="text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />;
    case "🥇": return <Medal size={24} className="text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />;
    case "🥈": return <Medal size={24} className="text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />;
    case "🥉": return <Medal size={24} className="text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />;
    case "🏅": return <Award size={24} className="text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />;
    case "💻": return <Code size={24} className="text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />;
    case "⚡": return <Zap size={24} className="text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />;
    default: return <Award size={24} className="text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />;
  }
};

export default function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper id="achievements" label="// 005" title="HALL OF" titleAccent="FAME">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioData.achievements.map((ach, i) => (
          <motion.div
            key={ach.title}
            initial={{ 
              opacity: 0, 
              x: i % 2 === 0 ? -20 : 20,
              borderColor: "rgba(255,255,255,0.1)", // Fallback for var(--border)
              boxShadow: "0 0px 0px rgba(0,0,0,0)"
            }}
            whileInView={{ 
              opacity: 1, 
              x: 0, 
            }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ 
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: i * 0.05
            }}
            whileHover={{
              y: -6,
              borderColor: "var(--accent-gold)",
              boxShadow: "0 20px 50px rgba(201,168,76,0.15)",
            }}
            className="relative flex items-center gap-5 p-6 rounded-2xl border overflow-hidden transition-all duration-300 group"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            {/* Border Blink Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0] }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.05 + 0.3, duration: 0.8 }}
              style={{ border: "2px solid var(--accent-gold)" }}
            />
            {/* Background glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(circle at 10% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
            />

            {/* Icon wrapper */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-2xl flex-shrink-0 relative z-10 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
              style={{ 
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.2)" 
              }}
            >
              {getIcon(ach.icon)}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="font-heading font-semibold leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {ach.title}
              </p>
              <span
                className="font-mono text-xs mt-1 inline-block px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(201,168,76,0.15)",
                  color: "var(--accent-gold)",
                }}
              >
                {ach.level}
              </span>
            </div>

            {/* Rank indicator for placement achievements */}
            {(ach.title.includes("1st") || ach.title.includes("Winner")) && (
              <div
                className="absolute top-3 right-3 font-display text-xs tracking-widest px-2 py-0.5 rounded"
                style={{ background: "rgba(201,168,76,0.2)", color: "var(--accent-gold)" }}
              >
                #1
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Coding platforms banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-8 rounded-3xl border relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.02) 100%)",
          borderColor: "rgba(201,168,76,0.3)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { platform: "SkillRack", value: "1200+", sub: "Problems" },
            { platform: "SkillRack", value: "5", sub: "Certificates" },
            { platform: "LeetCode", value: "300+", sub: "Problems" },
            { platform: "LeetCode", value: "1633", sub: "Contest Rating" },
          ].map((item, i) => (
            <div key={i}>
              <p className="font-display text-4xl gradient-text-gold">{item.value}</p>
              <p className="font-mono text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {item.sub}
              </p>
              <p className="font-heading text-xs font-semibold mt-0.5" style={{ color: "var(--text-muted)" }}>
                {item.platform}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
