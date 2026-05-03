"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ExternalLink, X, ChevronRight } from "lucide-react";

const categories = ["All", "Mobile", "Web", "AI/ML", "Desktop"];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<
    (typeof portfolioData.projects)[0] | null
  >(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  return (
    <SectionWrapper id="projects" label="// 003" title="FEATURED" titleAccent="PROJECTS">
      <div ref={ref}>
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              suppressHydrationWarning
              className="px-5 py-2 rounded-full font-mono text-xs tracking-widest uppercase border transition-all duration-300"
              style={{
                background:
                  activeCategory === cat
                    ? "var(--accent-gold)"
                    : "var(--card)",
                borderColor:
                  activeCategory === cat
                    ? "var(--accent-gold)"
                    : "var(--border)",
                color: activeCategory === cat ? "#000" : "var(--text-muted)",
              }}
            >
              {cat}
              <span className="ml-2 opacity-60">
                {cat === "All"
                  ? portfolioData.projects.length
                  : portfolioData.projects.filter((p) => p.category === cat)
                      .length}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9, boxShadow: "inset 0 0 0 0 transparent" }}
                animate={{ opacity: 1, scale: 1 }}
                whileInView={{ 
                  boxShadow: `inset 0 2px 0 0 ${project.color}`,
                  transition: { delay: 0.5, duration: 0.8 }
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="group relative p-6 rounded-2xl border overflow-hidden transition-all duration-400"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }}
                data-cursor
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
                  variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 },
                    view: { opacity: 0.4 }
                  }}
                  initial="initial"
                  whileHover="hover"
                  whileInView="view"
                  viewport={{ once: false, amount: 0.2 }}
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${project.color}15 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        background: `${project.color}15`,
                        color: project.color,
                      }}
                    >
                      {project.category}
                    </span>
                    {project.highlight && (
                      <span
                        className="text-xs font-mono px-2 py-1 rounded"
                        style={{
                          background: "rgba(201,168,76,0.15)",
                          color: "var(--accent-gold)",
                        }}
                      >
                        ★ {project.highlight}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display text-2xl tracking-wide mb-1 group-hover:gradient-text-gold transition-all duration-300"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="font-mono text-xs mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {project.subtitle}
                  </p>
                  <p
                    className="font-body text-sm leading-relaxed mb-5 line-clamp-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.description}
                  </p>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2 py-1 rounded"
                        style={{
                          background: "var(--surface)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View more */}
                  <motion.div
                    className="flex items-center gap-1 text-xs font-mono transition-opacity duration-300"
                    variants={{
                      initial: { opacity: 0 },
                      hover: { opacity: 1 },
                      view: { opacity: 1 }
                    }}
                    initial="initial"
                    whileHover="hover"
                    whileInView="view"
                    viewport={{ once: false, amount: 0.2 }}
                    style={{ color: project.color }}
                  >
                    View Details <ChevronRight size={12} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(20px)" }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full rounded-3xl overflow-hidden border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              {/* Top bar */}
              <div
                className="h-1"
                style={{ background: selectedProject.color }}
              />
              <div className="p-8">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center border transition-colors hover:border-red-400"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  <X size={14} />
                </button>

                <span
                  className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-4"
                  style={{
                    background: `${selectedProject.color}15`,
                    color: selectedProject.color,
                  }}
                >
                  {selectedProject.category}
                </span>

                <h2
                  className="font-display text-4xl tracking-wide mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedProject.title}
                </h2>
                <p
                  className="font-mono text-sm mb-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  {selectedProject.subtitle}
                </p>
                <p
                  className="font-body leading-relaxed mb-8"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {selectedProject.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <p
                      className="font-mono text-xs tracking-widest uppercase mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-sm px-4 py-2 rounded-lg border"
                          style={{
                            background: "var(--surface)",
                            borderColor: "var(--border)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedProject.highlight && (
                    <div
                      className="flex items-center gap-2 p-4 rounded-xl"
                      style={{
                        background: "rgba(201,168,76,0.1)",
                        border: "1px solid rgba(201,168,76,0.3)",
                      }}
                    >
                      <span>🏆</span>
                      <span
                        className="font-heading font-semibold text-sm"
                        style={{ color: "var(--accent-gold)" }}
                      >
                        {selectedProject.highlight}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
