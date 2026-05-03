"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";

const skillColors: Record<string, string> = {
  Dart: "#00B4D8",
  Flutter: "#02569B",
  Java: "#ED8B00",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  "C++": "#00599C",
  C: "#A8B9CC",
  React: "#61DAFB",
  "React.js": "#61DAFB",
  "Next.js": "#ffffff",
  "MERN Stack": "#47A248",
  Firebase: "#FFCA28",
  MongoDB: "#47A248",
  MySQL: "#4479A1",
  SQL: "#4479A1",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Git: "#F05032",
  GitHub: "#ffffff",
  "VS Code": "#007ACC",
  Canva: "#00C4CC",
  "Eclipse IDE": "#2C2255",
};

function SkillTag({ name, index }: { name: string; index: number }) {
  const color = skillColors[name] || "var(--accent-gold)";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.04,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileInView={{ 
        borderColor: ["var(--border)", "var(--accent-gold)", "var(--border)"],
      }}
      viewport={{ once: false, amount: 0.3 }}
      className="group relative px-4 py-2.5 rounded-xl border font-mono text-sm transition-all duration-300"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--text-secondary)",
      }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `${color}15` }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        style={{ background: color }}
      />
      <span className="relative z-10">{name}</span>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const categories = [
    { label: "Languages", key: "languages" as const, emoji: "🧠" },
    { label: "Frameworks & Libraries", key: "frameworks" as const, emoji: "⚙️" },
    { label: "Tools", key: "tools" as const, emoji: "🛠" },
    { label: "Databases & Cloud", key: "databases" as const, emoji: "🗄" },
  ];

  return (
    <SectionWrapper id="skills" label="// 002" title="TECHNICAL" titleAccent="SKILLS">
      <div ref={ref} className="space-y-12">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: ci * 0.15, duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl">{cat.emoji}</span>
              <h3
                className="font-heading font-semibold text-sm tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                {cat.label}
              </h3>
              <div
                className="flex-1 h-px"
                style={{ background: "var(--border)" }}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills[cat.key].map((skill, si) => (
                <SkillTag key={skill} name={skill} index={si} />
              ))}
            </div>
          </motion.div>
        ))}

      </div>
    </SectionWrapper>
  );
}
