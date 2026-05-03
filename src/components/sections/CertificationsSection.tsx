"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Award } from "lucide-react";

export default function CertificationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="certifications" label="// 007" title="CERTIFI" titleAccent="CATIONS">
      <div ref={ref}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioData.certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              whileHover={{
                y: -4,
                borderColor: "rgba(201,168,76,0.5)",
              }}
              whileInView={{
                borderColor: ["var(--border)", "rgba(201,168,76,0.4)", "var(--border)"],
                scale: [1, 1.02, 1]
              }}
              viewport={{ once: false, amount: 0.8 }}
              className="group p-5 rounded-xl border flex items-start gap-4 transition-all duration-300"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(201,168,76,0.1)" }}
              >
                <Award size={16} style={{ color: "var(--accent-gold)" }} />
              </div>
              <div className="min-w-0">
                <p
                  className="font-heading font-semibold text-sm leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {cert.name}
                </p>
                <p
                  className="font-mono text-xs mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
