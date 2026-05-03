"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalBackground() {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  // Parallax for the background orbs - optimized with fewer keyframes
  const y1 = useTransform(scrollY, [0, 5000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -100]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[var(--bg)] transition-colors duration-500">
      {/* Background grid - static and light */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="var(--accent-gold)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Royal Gold Glow - Merged Styles & GPU Accelerated */}
      <motion.div
        style={{ 
          y: y1,
          background: "radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform"
        }}
        className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        style={{ 
          y: y2,
          background: "radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform"
        }}
        className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full"
        animate={{ 
          scale: [1.05, 1, 1.05],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Rotating Ray System - Simplified and optimized */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] h-[180vw] opacity-[0.03]"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, var(--accent-gold) 15deg, transparent 30deg, var(--accent-gold) 45deg, transparent 60deg)",
          maskImage: "radial-gradient(circle, black 0%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 65%)",
          willChange: "transform"
        }}
      />

      {/* Persistent Gold Dust - Organic "Free Space" Motion */}
      {[...Array(100)].map((_, i) => {
        const startX = (i * 137.5) % 100;
        const driftX = (Math.random() * 20 - 10); // Drift up to 10vw left or right
        
        return (
          <motion.div
            key={i}
            initial={{ 
              x: `${startX}vw`, 
              y: `${Math.random() * 120 - 10}vh`,
              opacity: 0,
              scale: Math.random() * 0.4 + 0.2
            }}
            animate={{ 
              y: ["-10vh", "110vh"],
              x: [`${startX}vw`, `${startX + driftX}vw`],
              opacity: [0, 0.4, 0.4, 0],
              scale: [0.5, 1, 0.8, 0.5]
            }}
            transition={{ 
              duration: 25 + (i % 30) * 5, 
              repeat: Infinity, 
              delay: (i % 50) * -1,
              ease: "linear"
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"
            style={{ 
              boxShadow: "0 0 8px var(--accent-gold)",
              willChange: "transform"
            }}
          />
        );
      })}

      {/* Subtle Horizontal Light Sweeps - Very light */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`sweep-${i}`}
          initial={{ x: "-100%", y: `${25 + i * 40}%`, opacity: 0 }}
          animate={{ x: "200%", opacity: [0, 0.05, 0] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            delay: i * 12,
            ease: "easeInOut" 
          }}
          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-30"
          style={{ willChange: "transform" }}
        />
      ))}
    </div>
  );
}
