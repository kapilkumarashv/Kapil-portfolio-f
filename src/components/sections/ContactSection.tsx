"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Send, Check, AlertCircle, Mail, Phone, Github, Linkedin } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  const inputClasses = (field: string) => `
    w-full px-5 py-4 rounded-xl border font-body text-sm outline-none
    transition-all duration-300
    ${focusedField === field ? "border-amber-400 shadow-[0_0_20px_rgba(201,168,76,0.15)]" : ""}
  `;

  const inputStyle = (field: string) => ({
    background: "var(--card)",
    borderColor: focusedField === field ? "var(--accent-gold)" : "var(--border)",
    color: "var(--text-primary)",
  });

  return (
    <SectionWrapper id="contact" label="// 007" title="GET IN" titleAccent="TOUCH">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="lg:col-span-2 space-y-8"
        >
          <p
            className="font-body text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Ready to build something exceptional? Whether it's a mobile app,
            a web platform, or an AI-powered product — let's talk.
          </p>

          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
              { icon: Phone, label: "Phone", value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
              { icon: Github, label: "GitHub", value: "@kapilkumarashv", href: portfolioData.personal.github },
              { icon: Linkedin, label: "LinkedIn", value: "KAPIL KUMARASH V", href: portfolioData.personal.linkedin },
            ].map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== "Email" && label !== "Phone" ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ x: 8, color: "var(--accent-gold)" }}
                whileInView={{ 
                  x: [0, 8, 0],
                  borderColor: ["var(--border)", "rgba(201,168,76,0.3)", "var(--border)"]
                }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-amber-400/20"
                  style={{ background: "var(--surface)" }}
                >
                  <Icon size={16} style={{ color: "var(--accent-gold)" }} />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </p>
                  <p className="font-heading font-medium text-sm mt-0.5">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="lg:col-span-3"
        >
          <div
            className="p-8 md:p-12 rounded-3xl border-2 relative overflow-hidden group"
            style={{ 
              background: "var(--card)", 
              borderColor: "var(--accent-gold)",
              boxShadow: "0 0 40px rgba(201, 168, 76, 0.25), inset 0 0 20px rgba(201, 168, 76, 0.1)"
            }}
          >
            {/* Shimmer Shine Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-0"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
              }}
              style={{
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)",
                width: "50%",
                skewX: "-20deg",
              }}
            />

            {/* Ambient glow */}
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { name: "name", placeholder: "Your Name *", type: "text" },
                  { name: "email", placeholder: "Your Email *", type: "email" },
                ].map(({ name, placeholder, type }) => (
                  <input
                    key={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField(null)}
                    suppressHydrationWarning
                    className={inputClasses(name)}
                    style={inputStyle(name)}
                  />
                ))}
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject (optional)"
                value={form.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                suppressHydrationWarning
                className={inputClasses("subject")}
                style={inputStyle("subject")}
              />

              <textarea
                name="message"
                placeholder="Your message *"
                rows={6}
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                suppressHydrationWarning
                className={`${inputClasses("message")} resize-none`}
                style={inputStyle("message")}
              />

              {/* Submit button */}
              <motion.button
                whileHover={status === "idle" ? { scale: 1.02, boxShadow: "0 0 40px rgba(201,168,76,0.35)" } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={status !== "idle"}
                suppressHydrationWarning
                className="w-full py-4 rounded-xl font-heading font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden"
                style={{
                  background:
                    status === "success"
                      ? "#16a34a"
                      : status === "error"
                      ? "#dc2626"
                      : "var(--accent-gold)",
                  color: "#000",
                  opacity: status === "sending" ? 0.8 : 1,
                }}
              >
                {/* Sending shimmer */}
                {status === "sending" && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.div key="idle" className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Send size={16} /> Send Message
                    </motion.div>
                  )}
                  {status === "sending" && (
                    <motion.div key="sending" className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                      />
                      Sending...
                    </motion.div>
                  )}
                  {status === "success" && (
                    <motion.div key="success" className="flex items-center gap-3 text-white" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <Check size={16} /> Message Sent!
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div key="error" className="flex items-center gap-3 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <AlertCircle size={16} /> Failed — Try Again
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="text-center font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                Message goes directly to kapilkumarashv@gmail.com
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
