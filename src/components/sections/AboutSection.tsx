"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { MapPin, GraduationCap, Code2, Trophy } from "lucide-react";

const stats = [
  { label: "Projects Built", value: "17+" },
  { label: "Hackathons Won", value: "3+" },
  { label: "LeetCode Rating", value: "1633" },
  { label: "Problems Solved", value: "1500+" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper
      id="about"
      label="// 001"
      title="ABOUT"
      titleAccent="ME"
    >
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Bio text */}
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg leading-relaxed font-body"
            style={{ color: "var(--text-secondary)" }}
          >
            {portfolioData.personal.bio}
          </motion.p>

          {/* Info pills */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: MapPin, text: portfolioData.personal.location },
                { icon: GraduationCap, text: "B.E. ECE — Sri Eshwar, 2027" },
                { icon: Code2, text: "Full Stack Developer" },
                { icon: Trophy, text: "SIH 2025 Finalist" },
              ].map(({ icon: Icon, text }) => (
                <motion.span
                  key={text}
                  whileInView={{ borderColor: ["var(--border)", "var(--accent-gold)", "var(--border)"] }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono border"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Icon size={14} style={{ color: "var(--accent-gold)" }} />
                  {text}
                </motion.span>
              ))}
            </motion.div>

          {/* Education quick view */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-3"
          >
            {portfolioData.education.map((edu, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl border"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div>
                  <p className="font-heading font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                    {edu.institution}
                  </p>
                  <p className="font-mono text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {edu.degree}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold text-sm gradient-text-gold">{edu.score}</p>
                  <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{edu.period}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ scale: 1.04, borderColor: "var(--accent-gold)", boxShadow: "0 10px 40px rgba(212,175,55,0.2)" }}
              className="p-8 rounded-2xl border flex flex-col items-center justify-center text-center card-hover"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <span className="font-display text-5xl md:text-6xl gradient-text-gold">
                {stat.value}
              </span>
              <span className="font-mono text-xs tracking-widest uppercase mt-2" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}

          {/* Published paper card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="col-span-2 p-6 rounded-2xl border relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(0,212,255,0.04) 100%)",
              borderColor: "rgba(201,168,76,0.3)",
            }}
          >
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent-gold)" }}>
              Published Research
            </span>
            <p className="font-heading font-semibold mt-2" style={{ color: "var(--text-primary)" }}>
              {portfolioData.paper.title}
            </p>
            <p className="font-body text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              {portfolioData.paper.description}
            </p>
            <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full" style={{ background: "rgba(201,168,76,0.15)" }}>
              📄
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
