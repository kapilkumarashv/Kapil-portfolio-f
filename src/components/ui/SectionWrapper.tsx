"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  title?: string;
  titleAccent?: string;
}

export default function SectionWrapper({
  id,
  children,
  className,
  label,
  title,
  titleAccent,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative pt-32 pb-24 md:pt-40 md:pb-32 px-6", className)}
    >
      <div className="max-w-7xl mx-auto">
        {(label || title) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-16"
          >
            {label && (
              <span
                className="font-mono text-xs tracking-[0.3em] uppercase mb-4 block"
                style={{ color: "var(--accent-gold)" }}
              >
                {label}
              </span>
            )}
            {title && (
              <h2 className="royal-text text-5xl md:text-7xl tracking-wide">
                {title}
                {titleAccent && (
                  <span className="gradient-text-gold"> {titleAccent}</span>
                )}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
