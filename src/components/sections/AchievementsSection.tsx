"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="achievements" label="// 006" title="HALL OF" titleAccent="FAME">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioData.achievements.map((ach, i) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{
              y: -6,
              borderColor: "var(--accent-gold)",
              boxShadow: "0 20px 50px rgba(201,168,76,0.15)",
            }}
            whileInView={{
              borderColor: ["var(--border)", "var(--accent-gold)", "var(--border)"],
            }}
            viewport={{ once: false, amount: 0.8 }}
            className="relative flex items-center gap-5 p-6 rounded-2xl border overflow-hidden transition-all duration-400 group"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(circle at 10% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
            />

            {/* Icon */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-2xl text-2xl flex-shrink-0"
              style={{ background: "var(--surface)" }}
            >
              {ach.icon}
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
                  background:
                    ach.level === "National"
                      ? "rgba(201,168,76,0.15)"
                      : "rgba(0,212,255,0.1)",
                  color:
                    ach.level === "National"
                      ? "var(--accent-gold)"
                      : "var(--accent-cyan)",
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
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="mt-8 p-8 rounded-3xl border relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(0,212,255,0.05) 100%)",
          borderColor: "rgba(201,168,76,0.25)",
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
