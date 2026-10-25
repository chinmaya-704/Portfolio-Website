# Chinmaya Kumar Sahoo — Developer Portfolio

A high-performance, recruiter-first developer portfolio engineered with **Angular v21**, **strict TypeScript**, and **Tailwind CSS v4**. Built with native framework primitives, strict file separation (`templateUrl`), an ambient GPU-accelerated constellation canvas, and **zero third-party UI runtime dependencies**.

---

## ⚡ Core Philosophy & Architecture

* **Framework Native Power**: Built with **Angular v21** using native Signals, `computed`, modern control flow (`@if`, `@for`, `@switch`), and Reactive Forms.
* **Strict Architecture & Clean Separation**: Dedicated HTML template files (`templateUrl`) for every standalone component.
* **Zero Third-Party UI Bloat**:
  * **0 UI component libraries** (No Material, Bootstrap, PrimeNG, or daisyUI).
  * **0 external animation engines** (No Framer Motion or GSAP — smooth 60fps GPU acceleration via native CSS transitions & Canvas API).
  * **0 external icon packages** (50 custom, tree-shakeable inline SVGs managed by a dedicated `SvgService`).
* **Ambient GPU Mesh Background**: Pure HTML5 Canvas constellation mesh replacing heavy video backgrounds, operating at 60fps with mouse repulsion and tab visibility optimizations.
* **Recruiter Fast-Track UX**: One-click resume access, dual-action email pill with animated clipboard toast, highlighted GitHub/LinkedIn profiles, and categorized project quick-view modals.
* **Obsidian Dark Aesthetic**: Permanent midnight obsidian palette (`#030712` / `#0a1120`), glowing electric cyan/indigo accents, and frosted glassmorphic card containers (`bg-slate-900/60 backdrop-blur-xl`).

---

## 🛠️ Technology Stack

| Domain | Technology / Pattern |
| :--- | :--- |
| **Framework** | [Angular v21](https://angular.dev/) (Standalone Components, Signals, Reactive Forms) |
| **Language** | [TypeScript ~5.9](https://www.typescriptlang.org/) (`strict: true`) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss` |
| **Icons Engine** | Standalone `<app-icon>` rendering pure inline SVGs from `src/assets/*.svg` |
| **Modals** | Accessible native HTML5 `<dialog>` API with backdrop blur and Escape key trap |
| **Animations** | Native CSS GPU transforms & HTML5 Canvas API (`requestAnimationFrame`) |
| **Form Handling** | Angular Reactive Forms + Browser `fetch()` API (FormSubmit AJAX endpoint) |
| **Deployment** | [Vercel](https://vercel.com/) with SPA edge rewrites (`vercel.json`) |

---

## 🧭 Portfolio Structure & Features

```
Portfolio Website/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── about/              # Narrative bio, 3 engineering pillars & 3 bottom badges
│   │   │   ├── background-mesh/    # HTML5 GPU-accelerated constellation canvas
│   │   │   ├── contact/            # Reactive contact form & direct email channel
│   │   │   ├── experience/         # Demarcated Dual-Track Career Timeline
│   │   │   ├── footer/             # Minimalist obsidian footer & social channels
│   │   │   ├── hero/               # Signals typewriter, avatar, and fast-track actions
│   │   │   ├── icon/               # Standalone inline SVG renderer
│   │   │   ├── navbar/             # Sticky glassmorphic navbar with ScrollSpy
│   │   │   ├── projects/           # Filterable project showcase & native <dialog> modal
│   │   │   ├── skills/             # Categorized matrix with authentic brand icons
│   │   │   └── stats-bar/          # Recruiter quick-metrics counter bar
│   │   ├── models/
│   │   │   └── portfolio.models.ts # TypeScript interfaces & contracts
│   │   └── services/
│   │       ├── contact.service.ts  # AJAX submission service
│   │       ├── experience.service.ts # Demarcated experience state (Work vs Leadership)
│   │       ├── project.service.ts  # Filterable project catalog & modal state
│   │       ├── scroll.service.ts   # IntersectionObserver ScrollSpy & smooth navigation
│   │       ├── svg-catalog.ts      # Pre-compiled SVG dictionary for 0ms inline rendering
│   │       ├── svg.service.ts      # SVG cache, fetch fallback & sanitization
│   │       └── typewriter.service.ts # Pure Signals-driven typing animation
│   ├── assets/                     # 50 standalone original .svg vector files
│   ├── styles.css                  # Tailwind CSS v4 theme variables & custom scrollbar
│   └── index.html                  # SEO OpenGraph tags, JetBrains Mono & Plus Jakarta fonts
├── angular.json                    # Angular CLI configuration (assets mappings)
├── package.json                    # Dependencies & build scripts
└── vercel.json                     # Vercel SPA rewrite configuration
```

---

## 🚀 Key Sections

### 1. Hero & Fast-Track Actions
* Recruiter action bar: Download Resume, copy email address to clipboard with toast notification, and direct GitHub/LinkedIn buttons.
* Pure Signals typewriter cycling through engineering roles.
* Portrait avatar with animated cyan/indigo gradient rings.

### 2. About Me & Engineering Pillars
* Executive narrative detailing full-stack web and backend architecture experience.
* **3 Engineering Pillars**: *Scalable Full-Stack Engineering*, *Robust APIs & Data Systems*, and *Leadership & Collaboration*.
* **3 Bottom Info Badges**: *Professional Role* (Associate Software Engineer), *Location* (Hyderabad, India), and *Education* (IIIT Bhubaneswar).

### 3. Skills Matrix
* Categorized grid: **Frontend**, **Backend**, **Databases**, and **Tools & Workflow**.
* Every technology features its **authentic, original brand SVG logo** (Angular, React, Node.js, NestJS, .NET, PostgreSQL, MongoDB, Git, etc.).
* Standardized proficiency tiers: **Beginner**, **Intermediate**, and **Advanced**.

### 4. Demarcated Experience & Leadership
* **Track 1: Professional Experience**: Software engineering contributions (*PalTech – Associate Software Engineer*).
* **Demarcation Divider**: Distinct visual separator highlighting campus governance and community milestones.
* **Track 2: Leadership & Campus Governance**: Orchestrating a 30+ member team for *Advaïta* (IIIT Bhubaneswar's official cultural fest), managing *Paracosm Society*, and mentoring district finalist teams in state-sponsored hackathons (*Odiapreneur*).
* Interactive 3-way segmented filter tab with real-time counter pills.

### 5. Projects Showcase & Architecture Quick-View
* Filterable category tabs (*All, Full-Stack, Frontend, AI/ML, Mini*).
* Interactive cards displaying tech stacks, quantifiable impact metrics, GitHub repository links, and live preview buttons.
* Native HTML5 `<dialog>` modal with backdrop blur for deep architecture overviews.

### 6. Contact Form
* Typed Angular Reactive Forms with client-side validation.
* Async AJAX submission via FormSubmit with instantaneous feedback alerts.
* Direct email action card.

---

## 💻 Local Development

### Prerequisites
* **Node.js**: v18.19.1+ or v20+ / v22+
* **npm**: v10+

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/chinmaya-704/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local dev server**:
   ```bash
   npm start
   # or
   npx ng serve
   ```
   Open `http://localhost:4200/` in your browser. The app will hot-reload on changes.

4. **Production Build**:
   ```bash
   npm run build
   ```
   Compiled output is stored in `dist/portfolio/browser/` (sub-100 kB initial transfer size).

---

## 🌐 Deploy to Vercel

This repository is pre-configured for **Vercel** with continuous deployment from GitHub:

1. Import the repository on [Vercel](https://vercel.com/new).
2. Set the **Output Directory** to:
   ```
   dist/portfolio/browser
   ```
3. The included [`vercel.json`](vercel.json) automatically handles Single Page Application routing to prevent 404s on page refresh or deep linking.

---

## 👤 Author

**Chinmaya Kumar Sahoo**  
*Associate Software Engineer | Full-Stack & Systems*  
📍 Hyderabad, India  
* GitHub: [@chinmaya-704](https://github.com/chinmaya-704)  
* LinkedIn: [chinmaya-kumar-sahoo](https://www.linkedin.com/in/chinmaya-kumar-sahoo-b47385254/)  
* Email: [cksahoo704@gmail.com](mailto:cksahoo704@gmail.com)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
