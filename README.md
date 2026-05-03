# Kapil Kumarash V — Portfolio

A cinematic, premium portfolio built with **Next.js 15**, **Framer Motion**, **GSAP**, and **Tailwind CSS**. Dark/light theme, scroll-triggered animations, interactive project cards, and a working contact form.

---

## ⚡ Quick Start

### 1. Prerequisites
```bash
node --version   # 18.17+ required
npm --version    # 9+
```

### 2. Create the project
```bash
# Clone or copy this folder into your machine
cd portfolio

# Install all dependencies
npm install
```

### 3. Set up environment variables
```bash
cp .env.local.example .env.local
```
Edit `.env.local`:
```env
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_16_char_app_password
```
> **Gmail App Password**: Google Account → Security → 2-Step Verification → App Passwords → generate one for "Mail"

### 4. Run locally
```bash
npm run dev
# Opens at http://localhost:3000
```

### 5. Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
portfolio/
├── .env.local.example          # Environment variable template
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind + custom fonts/colors/animations
├── tsconfig.json
├── postcss.config.js
└── src/
    ├── app/
    │   ├── globals.css         # Global styles, CSS variables, custom cursor
    │   ├── layout.tsx          # Root layout with ThemeProvider
    │   ├── page.tsx            # Main page — assembles all sections
    │   └── api/
    │       └── contact/
    │           └── route.ts    # POST /api/contact → sends email via Nodemailer
    ├── components/
    │   ├── sections/
    │   │   ├── HeroSection.tsx         # Cinematic hero with char-by-char animation
    │   │   ├── AboutSection.tsx        # Bio, education, stats
    │   │   ├── SkillsSection.tsx       # Skill tags with hover color accents
    │   │   ├── ProjectsSection.tsx     # Filter tabs + expandable modal cards
    │   │   ├── ExperienceSection.tsx   # Timeline internships + workshops
    │   │   ├── AchievementsSection.tsx # Hackathon wins, coding stats
    │   │   ├── CertificationsSection.tsx
    │   │   └── ContactSection.tsx      # Form with send animation
    │   └── ui/
    │       ├── Navbar.tsx      # Sticky nav, theme toggle, mobile menu
    │       ├── ThemeProvider.tsx
    │       ├── CustomCursor.tsx # Dual-layer magnetic cursor
    │       ├── SectionWrapper.tsx
    │       └── Footer.tsx
    └── lib/
        ├── data.ts             # All resume data (edit this!)
        └── utils.ts            # cn() utility
```

---

## 🎨 Design System

| Token | Dark | Light |
|-------|------|-------|
| Background | `#050507` | `#f5f5f0` |
| Surface | `#0d0d12` | `#ebebE5` |
| Card | `#111118` | `#ffffff` |
| Accent Gold | `#c9a84c` | `#c9a84c` |
| Accent Cyan | `#00d4ff` | `#0099bb` |

**Fonts** (Google Fonts, auto-loaded):
- Display: `Bebas Neue` — section titles, hero name
- Heading: `Space Grotesk` — UI labels, card titles
- Body: `DM Sans` — paragraphs, descriptions
- Mono: `JetBrains Mono` — badges, tags, code

---

## ✨ Features

- **Cinematic Hero** — character-by-character name reveal, parallax orbs, scroll-fade
- **Custom Magnetic Cursor** — dual-layer dot+ring, expands on hover
- **Theme Toggle** — animated dark↔light switch with `next-themes`
- **Project Modal** — click any card to open full-detail overlay
- **Category Filter** — filter projects by Mobile / Web / AI/ML / Desktop
- **Timeline Experience** — vertical timeline with animated entries
- **Working Contact Form** — sends real email to `kapilkumarashv@gmail.com` via Nodemailer
- **Noise Texture Overlay** — subtle grain for premium feel
- **Scroll Animations** — every section uses `useInView` + Framer Motion

---

## 🚀 Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
# Follow prompts, add env vars in Vercel dashboard
```

### Add environment variables in Vercel
Dashboard → Project → Settings → Environment Variables:
- `GMAIL_USER` = your Gmail address
- `GMAIL_PASS` = your 16-char app password

---

## 🛠 Customization

All personal content is centralized in `src/lib/data.ts`. Edit the `portfolioData` object to update:
- Personal info (name, email, github, linkedin)
- Projects (add/remove entries in the array)
- Skills, certifications, achievements

No need to touch component files for content changes!
