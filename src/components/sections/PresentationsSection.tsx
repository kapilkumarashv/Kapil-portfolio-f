"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Presentation, Users, Calendar, ArrowRight } from "lucide-react";

export default function PresentationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="presentations" label="// 005" title="PRESENTATIONS &" titleAccent="WORKSHOPS">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioData.presentations.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ 
              y: -8,
              borderColor: "var(--accent-gold)",
              boxShadow: "0 20px 40px rgba(201,168,76,0.1)"
            }}
            className="group relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            {/* Background Accent */}
            <div 
              className="absolute -right-8 -bottom-8 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
              style={{ color: "var(--accent-gold)" }}
            >
              <Presentation size={128} />
            </div>

            <div className="flex items-start gap-5 relative z-10">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}
              >
                {item.toLowerCase().includes("workshop") ? (
                  <Users size={20} style={{ color: "var(--accent-gold)" }} />
                ) : (
                  <Presentation size={20} style={{ color: "var(--accent-gold)" }} />
                )}
              </div>

              <div className="flex-1">
                <h3 
                  className="font-heading font-bold text-lg leading-tight mb-3 transition-colors duration-300 group-hover:text-white"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item}
                </h3>
                
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  <ArrowRight size={12} style={{ color: "var(--accent-gold)" }} />
                  <span>Interactive Session</span>
                </div>
              </div>
            </div>

            {/* Hover Indicator */}
            <div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
