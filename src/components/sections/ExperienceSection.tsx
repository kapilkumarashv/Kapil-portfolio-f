"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Briefcase } from "lucide-react";

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="experience" label="// 004" title="WORK" titleAccent="EXPERIENCE">
      <div ref={ref} className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
          style={{ background: "var(--border)" }}
        />

        <div className="space-y-8">
          {portfolioData.internships.map((internship, i) => (
            <motion.div
              key={internship.company}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="relative md:pl-16"
            >
              {/* Timeline dot */}
              <div
                className="absolute left-4 top-6 w-5 h-5 rounded-full border-2 hidden md:flex items-center justify-center"
                style={{
                  background: "var(--bg)",
                  borderColor: "var(--accent-gold)",
                  transform: "translateX(-50%)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--accent-gold)" }}
                />
              </div>

              {/* Card */}
              <motion.div
                whileHover={{
                  borderColor: "var(--accent-gold)",
                  y: -4,
                  boxShadow: "0 20px 60px rgba(201,168,76,0.1)",
                }}
                whileInView={{
                  borderColor: ["var(--border)", "var(--accent-gold)", "var(--border)"],
                  boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 10px 30px rgba(201,168,76,0.05)", "0 0 0px rgba(0,0,0,0)"]
                }}
                viewport={{ once: false, amount: 0.3 }}
                className="p-6 md:p-8 rounded-2xl border transition-all duration-400 group"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ background: "rgba(201,168,76,0.1)" }}
                    >
                      <Briefcase size={18} style={{ color: "var(--accent-gold)" }} />
                    </div>
                    <div>
                      <h3
                        className="font-heading font-bold text-lg"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {internship.role}
                      </h3>
                      <p className="font-display text-2xl tracking-wider gradient-text-gold">
                        {internship.company}
                      </p>
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border self-start"
                    style={{
                      background: "rgba(0,212,255,0.08)",
                      borderColor: "rgba(0,212,255,0.2)",
                      color: "var(--accent-cyan)",
                    }}
                  >
                    Internship
                  </span>
                </div>

                <p
                  className="font-body leading-relaxed mb-5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {internship.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {internship.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-3 py-1 rounded-full border transition-colors duration-300 group-hover:border-amber-500/40"
                      style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
