"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";
import { Brain, Cpu, Database, Wrench } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";


function SkillTag({ name, index }: { name: string; index: number }) {
  const color = "var(--accent-gold)";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        delay: index * 0.06,
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ 
        scale: 1.08, 
        y: -5,
        boxShadow: "0 10px 25px rgba(212,175,55,0.25)"
      }}
      className="group relative px-4 py-2.5 rounded-xl border font-mono text-sm transition-all duration-500"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--text-secondary)",
      }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "rgba(212,175,55,0.08)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
        style={{ background: "var(--accent-gold)" }}
      />
      <span className="relative z-10 group-hover:text-white transition-colors duration-300">{name}</span>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);

  const categories = [
    { label: "Languages", key: "languages" as const, icon: Brain },
    { label: "Frameworks & Libraries", key: "frameworks" as const, icon: Cpu },
    { label: "Tools", key: "tools" as const, icon: Wrench },
    { label: "Databases & Cloud", key: "databases" as const, icon: Database },
  ];

  return (
    <SectionWrapper id="skills" label="// 002" title="TECHNICAL" titleAccent="SKILLS">
      <div ref={ref} className="space-y-12">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: ci * 0.15, duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)]">
                <cat.icon size={18} style={{ color: "var(--accent-gold)" }} />
              </div>
              <h3
                className="font-heading font-semibold text-xs md:text-sm tracking-[0.2em] uppercase"
                style={{ color: "var(--accent-gold)" }}
              >
                {cat.label}
              </h3>
              <div
                className="flex-1 h-px opacity-30"
                style={{ background: "linear-gradient(90deg, var(--accent-gold), transparent)" }}
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
