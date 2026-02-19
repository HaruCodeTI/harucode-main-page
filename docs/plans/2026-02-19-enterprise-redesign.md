# HaruCode Enterprise Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the HaruCode website from a startup-purple glassmorphism aesthetic to an enterprise-grade Linear Dark design, with GHL API integration for lead capture.

**Architecture:** Full component rewrite of all landing sections and contact page. New design system tokens in Tailwind/CSS. Custom `useGHL` hook with n8n fallback. All content in PT-BR, code in English. Mobile-first responsive design.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Framer Motion, TypeScript, GoHighLevel V2 API

**Design Reference:** See `docs/plans/2026-02-19-enterprise-redesign-design.md`

---

### Task 1: Design System Foundation — Tailwind Config + CSS Variables

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/index.css`
- Modify: `index.html` (add Inter font)

**Step 1: Update `index.html` to load Inter font**

Replace the existing `<head>` font preconnects/links. Add Inter from Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Remove any existing Poppins font link from `index.html` if present (the current one is in `index.css` via `@import`).

**Step 2: Rewrite `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1120px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "rgba(255,255,255,0.06)",
        input: "rgba(255,255,255,0.06)",
        ring: "#8B5CF6",
        background: "#09090B",
        foreground: "#FAFAFA",
        primary: {
          DEFAULT: "#8B5CF6",
          foreground: "#FAFAFA",
        },
        secondary: {
          DEFAULT: "#111113",
          foreground: "#FAFAFA",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FAFAFA",
        },
        muted: {
          DEFAULT: "#111113",
          foreground: "rgba(255,255,255,0.55)",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          foreground: "#FAFAFA",
        },
        popover: {
          DEFAULT: "#111113",
          foreground: "#FAFAFA",
        },
        card: {
          DEFAULT: "#111113",
          foreground: "#FAFAFA",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

**Step 3: Rewrite `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  /* Enterprise typography scale */
  h1 {
    @apply text-4xl font-semibold tracking-tight leading-[1.1] sm:text-5xl;
    letter-spacing: -0.025em;
  }

  h2 {
    @apply text-3xl font-semibold tracking-tight leading-[1.15] sm:text-4xl;
    letter-spacing: -0.02em;
  }

  h3 {
    @apply text-xl font-semibold;
    letter-spacing: -0.01em;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-transparent px-6 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/[0.12] hover:text-white;
  }

  .section-label {
    @apply text-[13px] font-medium uppercase tracking-[0.04em] text-white/35;
  }

  .card-surface {
    @apply rounded-xl border border-white/[0.06] bg-card p-6 transition-all hover:border-white/[0.12] lg:p-8;
  }

  .card-surface-glow:hover {
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.08);
  }
}
```

**Step 4: Verify dev server compiles**

Run: `cd /Users/arthurbueno/HaruCode/apps/harucode-main-page && npm run dev`

Expected: Vite compiles without errors. Page loads with new dark background and Inter font.

**Step 5: Commit**

```bash
git add tailwind.config.ts src/index.css index.html
git commit -m "feat: new enterprise design system — Inter font, Linear Dark palette"
```

---

### Task 2: Rewrite Header Component

**Files:**
- Rewrite: `src/components/Header.tsx`

**Step 1: Rewrite Header**

```tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { config } from '../lib/config';

type MenuItem =
  | { label: string; path: string; match?: string }
  | { label: string; href: string };

const menuItems: MenuItem[] = [
  { label: 'Início', href: '#hero' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Casos', href: '#cases' },
  { label: 'Contato', path: '/contato', match: '/contato' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const resolveHref = (item: MenuItem) => {
    if ('path' in item) return item.path;
    return location.pathname === '/' ? item.href : `/${item.href}`;
  };

  const isActive = (item: MenuItem) => {
    if ('path' in item) return location.pathname === (item.match ?? item.path);
    return false;
  };

  const renderLink = (item: MenuItem, mobile = false) => {
    const active = isActive(item);
    const classes = `text-[13px] font-medium transition-colors ${
      active ? 'text-white' : 'text-white/55 hover:text-white'
    } ${mobile ? 'py-2' : ''}`;

    if ('path' in item) {
      return (
        <Link key={item.label} to={item.path} className={classes} onClick={() => setOpen(false)}>
          {item.label}
        </Link>
      );
    }

    return (
      <a key={item.label} href={resolveHref(item)} className={classes} onClick={() => setOpen(false)}>
        {item.label}
      </a>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#09090B]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/10.svg" alt="HaruCode" className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {menuItems.map((item) => renderLink(item))}
          <a
            href={config.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-[13px]"
          >
            Falar com especialista
          </a>
        </nav>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-white/70 lg:hidden"
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#09090B] px-6 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => renderLink(item, true))}
            <a
              href={config.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-3 justify-center text-[13px]"
              onClick={() => setOpen(false)}
            >
              Falar com especialista
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
```

**Step 2: Verify in browser** — header should be thin, dark, minimal.

**Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: enterprise Header — thin, minimal, Linear Dark style"
```

---

### Task 3: Rewrite Hero Section

**Files:**
- Rewrite: `src/components/landing/HeroSection.tsx`

**Step 1: Rewrite HeroSection**

```tsx
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '@/lib/config';

const metrics = [
  { value: '+60', label: 'Projetos entregues' },
  { value: '30 dias', label: 'Tempo médio de entrega' },
  { value: '97%', label: 'Satisfação dos clientes' },
];

const logos = [
  'Vercel', 'Loom', 'Cash App', 'Loops', 'Zapier', 'Ramp', 'Raycast',
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Subtle top gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]" />

      <div className="relative mx-auto flex max-w-[1120px] flex-col items-center px-6 pb-20 pt-32 text-center lg:pt-40">
        <motion.p
          className="section-label mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Engenharia de software para operações complexas
        </motion.p>

        <motion.h1
          className="mx-auto max-w-3xl text-balance"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Tecnologia que protege margens e acelera crescimento.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Diagnóstico profundo, arquitetura modular e entregas guiadas por dados.
          Cada projeto nasce para criar operações mais rentáveis.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <a href={config.whatsapp.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Começar uma conversa
            <ArrowRight size={16} />
          </a>
          <a href="#expertise" className="btn-secondary">
            Conhecer nossa abordagem
          </a>
        </motion.div>

        {/* Logo bar */}
        <motion.div
          className="mt-20 flex w-full flex-col items-center gap-6 border-t border-white/[0.06] pt-10"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="text-[13px] font-medium text-white/25">
            Tecnologias e parceiros que impulsionam nossos projetos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((name) => (
              <span key={name} className="text-sm font-medium text-white/20">
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {metrics.map((item) => (
            <motion.div
              key={item.label}
              className="card-surface text-center"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <p className="mt-1.5 text-sm text-white/45">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
```

**Step 2: Verify** — centered hero with clean typography, no glassmorphism.

**Step 3: Commit**

```bash
git add src/components/landing/HeroSection.tsx
git commit -m "feat: minimal enterprise Hero — centered, clean, Linear Dark"
```

---

### Task 4: Rewrite Solutions Section

**Files:**
- Rewrite: `src/components/landing/SolutionsSection.tsx`

**Step 1: Rewrite SolutionsSection**

```tsx
import { BrainCircuit, Code2, Layers3, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface Solution {
  icon: ReactNode;
  title: string;
  description: string;
  tags: string[];
}

const solutions: Solution[] = [
  {
    icon: <Workflow size={20} />,
    title: 'Automação Operacional',
    description: 'Mapeamos processos críticos e conectamos sistemas para eliminar gargalos e retrabalho.',
    tags: ['Integrações', 'RPA', 'Governança'],
  },
  {
    icon: <Code2 size={20} />,
    title: 'Produtos Digitais Escaláveis',
    description: 'Aplicações web com arquitetura modular, prontas para crescer com o negócio e integrar times.',
    tags: ['Design System', 'Micro Serviços', 'Analytics'],
  },
  {
    icon: <BrainCircuit size={20} />,
    title: 'IA Aplicada a Resultados',
    description: 'Modelos preditivos para leads, estoques e operações financeiras com monitoramento contínuo.',
    tags: ['Machine Learning', 'Data Ops', 'Dashboards'],
  },
  {
    icon: <Layers3 size={20} />,
    title: 'Sites & Portais Institucionais',
    description: 'Experiências digitais com gestão de conteúdo, performance e integrações nativas a marketing e CRM.',
    tags: ['CMS', 'SEO', 'Automação de leads'],
  },
];

const SolutionsSection = () => {
  return (
    <section id="expertise" className="relative px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          className="max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Expertise transversal</p>
          <h2>Tecnologia como escudo estratégico para o seu crescimento.</h2>
          <p className="text-base text-white/55">
            Selecionamos a squad ideal para cada fase — discovery, arquitetura, implementação e operação
            assistida. Conectamos pessoas, dados e finanças com precisão.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {solutions.map((s) => (
            <motion.article
              key={s.title}
              className="card-surface card-surface-glow"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {s.icon}
              </div>
              <h3 className="mt-5">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{s.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="rounded-md border border-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/35">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
```

**Step 2: Verify** — 2x2 grid on desktop, single column on mobile.

**Step 3: Commit**

```bash
git add src/components/landing/SolutionsSection.tsx
git commit -m "feat: enterprise Solutions section — flat cards, no glassmorphism"
```

---

### Task 5: Rewrite Case Showcase

**Files:**
- Rewrite: `src/components/landing/CaseShowcase.tsx`

**Step 1: Rewrite CaseShowcase**

```tsx
import { motion } from 'framer-motion';

const cases = [
  {
    sector: 'Indústria alimentícia',
    title: 'ERP conectado à operação e ao time financeiro',
    description: 'Sincronizamos estoque, fiscal e produção com automações que evitam rupturas e retrabalho manual.',
    metrics: [
      { label: 'Redução de perdas', value: '28%' },
      { label: 'ROI em', value: '4 meses' },
      { label: 'Times envolvidos', value: '5 áreas' },
    ],
  },
  {
    sector: 'Serviços B2B',
    title: 'Portal institucional que qualifica leads',
    description: 'Site com CMS e integrações de CRM, medindo jornada ponta a ponta e acelerando o follow-up comercial.',
    metrics: [
      { label: 'Aumento de leads', value: '2.4x' },
      { label: 'Novos fluxos', value: '5' },
      { label: 'Automação de emails', value: 'Sim' },
    ],
  },
  {
    sector: 'Varejo digital',
    title: 'Robô de integrações entre ERP e plataformas',
    description: 'Cadastro de produtos, conciliação de pedidos e atualização fiscal em múltiplos canais, automatizados.',
    metrics: [
      { label: 'Integrações ativas', value: '9 APIs' },
      { label: 'Tempo poupado', value: '60h/sem' },
      { label: 'Erro manual', value: '-85%' },
    ],
  },
];

const CaseShowcase = () => {
  return (
    <section id="cases" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          className="max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Impacto real</p>
          <h2>Casos que combinam tecnologia e dados para gerar novas margens.</h2>
          <p className="text-base text-white/55">
            Da discovery ao suporte contínuo, criamos produtos com governança e observabilidade desde o primeiro dia.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {cases.map((item) => (
            <motion.article
              key={item.title}
              className="card-surface card-surface-glow flex flex-col justify-between"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <div>
                <p className="section-label">{item.sector}</p>
                <h3 className="mt-3">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                {item.metrics.map((m) => (
                  <span key={m.label} className="rounded-md border border-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/40">
                    {m.label}: <span className="text-white/70">{m.value}</span>
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseShowcase;
```

**Step 2: Verify** — 3-col on desktop, 2-col tablet, 1-col mobile. Metric badges with separator line.

**Step 3: Commit**

```bash
git add src/components/landing/CaseShowcase.tsx
git commit -m "feat: enterprise Cases section — clean metric badges"
```

---

### Task 6: Rewrite Process Section

**Files:**
- Rewrite: `src/components/landing/ProcessSection.tsx`

**Step 1: Rewrite ProcessSection**

```tsx
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Imersão & Blueprint',
    body: 'Entrevistas, mapas de processos e arquitetura alvo. Em dias, entregamos plano com quick wins e fases.',
  },
  {
    number: '02',
    title: 'Entrega Modular',
    body: 'Sprints com metas claras, integrações contínuas e demos semanais. Ajustamos rota com dados reais.',
  },
  {
    number: '03',
    title: 'Operação Assistida',
    body: 'Monitoramento, evolução guiada por métricas e squad dedicada nas primeiras semanas pós-lançamento.',
  },
];

const ProcessSection = () => {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          className="max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Nosso processo</p>
          <h2>Um fluxo desenhado para reduzir risco e acelerar valor.</h2>
          <p className="text-base text-white/55">
            Combinamos disciplina de produto, engenharia e operações. Você acompanha tudo com transparência.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="card-surface"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <span className="font-mono text-sm font-semibold text-primary">{step.number}</span>
              <h3 className="mt-3">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{step.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile timeline connector — visible only on small screens */}
        <div className="mt-6 flex justify-center lg:hidden">
          <div className="h-px w-20 bg-white/[0.06]" />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
```

**Step 2: Verify** — 3-col desktop, stacked mobile. Mono step numbers in accent.

**Step 3: Commit**

```bash
git add src/components/landing/ProcessSection.tsx
git commit -m "feat: enterprise Process section — numbered steps, mono accent"
```

---

### Task 7: Rewrite Final CTA

**Files:**
- Rewrite: `src/components/landing/FinalCTA.tsx`

**Step 1: Rewrite FinalCTA**

```tsx
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '@/lib/config';

const FinalCTA = () => {
  return (
    <section className="px-6 pb-24 lg:pb-32">
      <motion.div
        className="mx-auto max-w-2xl rounded-xl border border-white/[0.06] bg-card p-8 text-center lg:p-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Próximo passo</p>
        <h2 className="mt-4">Vamos desenhar seu plano de transformação.</h2>
        <p className="mx-auto mt-4 max-w-md text-base text-white/55">
          Conte seus desafios. Em 24h úteis entregamos diagnóstico, roadmap, squad sugerido e estimativa de investimento.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={config.whatsapp.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Conversar agora
            <ArrowRight size={16} />
          </a>
          <a href="/contato" className="btn-secondary">
            Enviar briefing completo
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
```

**Step 2: Commit**

```bash
git add src/components/landing/FinalCTA.tsx
git commit -m "feat: enterprise Final CTA — centered card, clean"
```

---

### Task 8: Create GHL Hook

**Files:**
- Create: `src/hooks/use-ghl.ts`
- Create: `.env.example`

**Step 1: Create `.env.example`**

```
# GoHighLevel V2 API credentials
VITE_GHL_API_KEY=
VITE_GHL_LOCATION_ID=
```

**Step 2: Create `src/hooks/use-ghl.ts`**

```ts
import { useState } from 'react';

interface ContactPayload {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  assunto: string;
  mensagem: string;
}

interface UseGHLReturn {
  submit: (data: ContactPayload) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  reset: () => void;
}

const GHL_API_KEY = import.meta.env.VITE_GHL_API_KEY;
const GHL_LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID;
const N8N_WEBHOOK = 'https://n8n.harucode.com.br/webhook/97675544-b4af-4bd4-adbd-b219e765b194';

function formatPhoneForAPI(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `+55${digits}`;
}

async function submitToGHL(data: ContactPayload): Promise<void> {
  const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    },
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      firstName: data.nome.split(' ')[0],
      lastName: data.nome.split(' ').slice(1).join(' ') || '',
      email: data.email,
      phone: formatPhoneForAPI(data.telefone),
      companyName: data.empresa || undefined,
      tags: [data.assunto || 'site-contato'],
      source: 'website',
      customFields: [
        { key: 'mensagem', field_value: data.mensagem },
        { key: 'assunto', field_value: data.assunto },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GHL API error: ${response.status} — ${body}`);
  }
}

async function submitToN8N(data: ContactPayload): Promise<void> {
  const response = await fetch(N8N_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      telefone: `55${data.telefone.replace(/\D/g, '')}`,
    }),
  });

  if (!response.ok) {
    throw new Error('Webhook error');
  }
}

export function useGHL(): UseGHLReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useGHLAPI = Boolean(GHL_API_KEY && GHL_LOCATION_ID);

  const submit = async (data: ContactPayload) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      if (useGHLAPI) {
        await submitToGHL(data);
      } else {
        await submitToN8N(data);
      }
      setIsSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao enviar mensagem.';
      setError(message);

      // If GHL fails, try n8n as fallback
      if (useGHLAPI) {
        try {
          await submitToN8N(data);
          setIsSuccess(true);
          setError(null);
        } catch {
          setError('Não foi possível enviar sua mensagem. Tente novamente.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  };

  return { submit, isLoading, isSuccess, error, reset };
}
```

**Step 3: Commit**

```bash
git add src/hooks/use-ghl.ts .env.example
git commit -m "feat: useGHL hook — GHL V2 API with n8n fallback"
```

---

### Task 9: Rewrite Contact Page

**Files:**
- Rewrite: `src/pages/Contato.tsx`

**Step 1: Rewrite Contato**

```tsx
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { config } from '../lib/config';
import { useGHL } from '../hooks/use-ghl';

function formatPhoneInput(value: string): string {
  const n = value.replace(/\D/g, '');
  if (n.length <= 2) return n;
  if (n.length <= 3) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 7) return `(${n.slice(0, 2)}) ${n.slice(2, 3)} ${n.slice(3)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 3)} ${n.slice(3, 7)}-${n.slice(7, 11)}`;
}

const inputClasses = (hasError: boolean) =>
  `w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30 ${
    hasError ? 'border-red-500/60' : 'border-white/[0.06]'
  }`;

const Contato = () => {
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', empresa: '', assunto: '', mensagem: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { submit, isLoading, isSuccess, error: apiError, reset } = useGHL();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = 'Nome é obrigatório';
    if (!form.email.trim()) e.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
    const digits = form.telefone.replace(/\D/g, '');
    if (!digits) e.telefone = 'Telefone é obrigatório';
    else if (digits.length < 10 || digits.length > 11) e.telefone = 'Telefone inválido';
    if (!form.mensagem.trim()) e.mensagem = 'Mensagem é obrigatória';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const v = name === 'telefone' ? formatPhoneInput(value) : value;
    setForm((prev) => ({ ...prev, [name]: v }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await submit(form);
    if (!apiError) setForm({ nome: '', email: '', telefone: '', empresa: '', assunto: '', mensagem: '' });
  };

  const handleReset = () => {
    reset();
    setForm({ nome: '', email: '', telefone: '', empresa: '', assunto: '', mensagem: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative px-6 pb-10 pt-28 text-center lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_-10%,rgba(139,92,246,0.1),transparent)]" />
        <div className="relative mx-auto max-w-2xl">
          <p className="section-label mb-4">Fale com especialistas</p>
          <h1>Conecte seu negócio a um time que entrega tecnologia sob medida.</h1>
          <p className="mt-4 text-base text-white/55">
            Conte sua dor em poucos minutos. Voltamos com diagnóstico, roadmap prático e investimento estimado em até 24h úteis.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="px-6 pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-[1120px] gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="card-surface">
            {isSuccess ? (
              <motion.div
                className="flex flex-col items-center py-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle className="h-7 w-7 text-emerald-400" />
                </div>
                <h3 className="mt-5">Mensagem enviada</h3>
                <p className="mt-2 max-w-sm text-sm text-white/50">
                  Obrigado pelo contato. Nossa equipe retornará em até 24h úteis com um diagnóstico inicial.
                </p>
                <button onClick={handleReset} className="btn-secondary mt-6 text-[13px]">
                  Enviar nova mensagem
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="section-label">Formulário</p>
                  <h3 className="mt-2">Conte sobre seu projeto</h3>
                  <p className="mt-1 text-sm text-white/45">
                    Precisamos de alguns detalhes para direcionar o time correto.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="nome" className="mb-1.5 block text-[13px] font-medium text-white/45">Nome completo *</label>
                      <input id="nome" name="nome" value={form.nome} onChange={handleChange} placeholder="Como devemos te chamar?" className={inputClasses(!!errors.nome)} />
                      {errors.nome && <p className="mt-1 text-[12px] text-red-400">{errors.nome}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-white/45">Email *</label>
                      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="nome@empresa.com" className={inputClasses(!!errors.email)} />
                      {errors.email && <p className="mt-1 text-[12px] text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="telefone" className="mb-1.5 block text-[13px] font-medium text-white/45">Telefone *</label>
                      <input id="telefone" name="telefone" type="tel" value={form.telefone} onChange={handleChange} placeholder="(67) 99999-9999" className={inputClasses(!!errors.telefone)} />
                      {errors.telefone && <p className="mt-1 text-[12px] text-red-400">{errors.telefone}</p>}
                    </div>
                    <div>
                      <label htmlFor="empresa" className="mb-1.5 block text-[13px] font-medium text-white/45">Empresa</label>
                      <input id="empresa" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Onde você atua?" className={inputClasses(false)} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="assunto" className="mb-1.5 block text-[13px] font-medium text-white/45">Assunto</label>
                    <select id="assunto" name="assunto" value={form.assunto} onChange={handleChange} className={`${inputClasses(false)} appearance-none`}>
                      <option value="">Selecione um assunto</option>
                      <option value="automacao">Automação de Processos</option>
                      <option value="desenvolvimento">Desenvolvimento Web</option>
                      <option value="ia">Consultoria em IA</option>
                      <option value="consultoria">Consultoria Geral</option>
                      <option value="suporte">Suporte</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="mb-1.5 block text-[13px] font-medium text-white/45">Mensagem *</label>
                    <textarea id="mensagem" name="mensagem" rows={5} value={form.mensagem} onChange={handleChange} placeholder="O que você quer construir ou otimizar?" className={`${inputClasses(!!errors.mensagem)} resize-none`} />
                    {errors.mensagem && <p className="mt-1 text-[12px] text-red-400">{errors.mensagem}</p>}
                  </div>

                  {apiError && (
                    <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                      {apiError}
                    </p>
                  )}

                  <button type="submit" disabled={isLoading} className={`btn-primary w-full ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Enviar mensagem
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="card-surface space-y-5">
              <div>
                <p className="section-label">Acesso direto</p>
                <h3 className="mt-2">Contato imediato</h3>
                <p className="mt-1 text-sm text-white/45">
                  Estamos prontos para iniciar um diagnóstico com nosso time.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                {[
                  { icon: <MapPin size={16} />, label: 'Endereço', value: 'Rua Geraldo A. Ramos, 90\nCampo Grande, MS' },
                  { icon: <Phone size={16} />, label: 'WhatsApp', value: config.whatsapp.formatted, sub: 'Segunda a sexta · 9h às 19h' },
                  { icon: <Mail size={16} />, label: 'Email', value: config.company.email, sub: 'Retorno em até 24h úteis' },
                  { icon: <Clock size={16} />, label: 'Disponibilidade', value: 'Sábado 9h–13h · Domingo off' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-[12px] font-medium uppercase tracking-wide text-white/30">{item.label}</p>
                      <p className="whitespace-pre-line text-white/65">{item.value}</p>
                      {item.sub && <p className="text-[12px] text-white/30">{item.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface border-primary/20">
              <p className="text-sm font-medium text-white">Precisa agilizar?</p>
              <p className="mt-1.5 text-sm text-white/45">
                Nosso time responde em minutos via WhatsApp.
              </p>
              <a
                href={config.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 w-full justify-center text-[13px]"
              >
                Conversar via WhatsApp
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contato;
```

**Step 2: Verify** — 2-column on desktop, stacked on mobile. Inline success state. No Google Maps.

**Step 3: Commit**

```bash
git add src/pages/Contato.tsx
git commit -m "feat: enterprise Contact page with GHL hook, inline success state"
```

---

### Task 10: Rewrite Footer + WhatsApp Button

**Files:**
- Rewrite: `src/components/Footer.tsx`
- Rewrite: `src/components/WhatsAppButton.tsx`

**Step 1: Rewrite Footer**

```tsx
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { config } from '../lib/config';

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1120px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src="/10.svg" alt="HaruCode" className="h-7 w-auto" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/40">HaruCode</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              Construímos produtos, integrações e IA que entregam previsibilidade para operações complexas.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://instagram.com/harucode.ti', icon: <Instagram size={15} /> },
                { href: 'https://linkedin.com/company/haru-code', icon: <Linkedin size={15} /> },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-white/35 transition-colors hover:border-white/[0.12] hover:text-white/70"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-white/30">Mapa</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-white/45">
              <Link to="/" className="transition-colors hover:text-white/80">Início</Link>
              <a href="/#expertise" className="transition-colors hover:text-white/80">Expertise</a>
              <a href="/#cases" className="transition-colors hover:text-white/80">Casos</a>
              <Link to="/contato" className="transition-colors hover:text-white/80">Contato</Link>
            </nav>
          </div>

          <div className="space-y-3 text-sm text-white/45">
            <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-white/30">Contato</p>
            {[
              { icon: <MapPin size={14} />, text: 'Campo Grande · MS · Brasil' },
              { icon: <Phone size={14} />, text: config.whatsapp.formatted },
              { icon: <Mail size={14} />, text: config.company.email },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5">
                <span className="text-primary/70">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-[13px] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} HaruCode. Tecnologia que protege ativos.</p>
          <a href={config.whatsapp.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/50">
            Falar com especialista
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

**Step 2: Rewrite WhatsAppButton**

```tsx
import { MessageCircle } from 'lucide-react';
import { config } from '../lib/config';

const WhatsAppButton = () => {
  return (
    <a
      href={config.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={20} />
    </a>
  );
};

export default WhatsAppButton;
```

**Step 3: Commit**

```bash
git add src/components/Footer.tsx src/components/WhatsAppButton.tsx
git commit -m "feat: enterprise Footer + WhatsApp button — minimal, clean"
```

---

### Task 11: Update Home Page + Cleanup

**Files:**
- Modify: `src/pages/Home.tsx`
- Delete: `src/components/landing/AnimatedBackground.tsx`
- Delete: `src/components/landing/BrandsSection.tsx`

**Step 1: Rewrite Home.tsx**

```tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HeroSection from '@/components/landing/HeroSection';
import SolutionsSection from '@/components/landing/SolutionsSection';
import CaseShowcase from '@/components/landing/CaseShowcase';
import ProcessSection from '@/components/landing/ProcessSection';
import FinalCTA from '@/components/landing/FinalCTA';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <SolutionsSection />
        <CaseShowcase />
        <ProcessSection />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
```

**Step 2: Delete dead files**

```bash
rm src/components/landing/AnimatedBackground.tsx
rm src/components/landing/BrandsSection.tsx
```

**Step 3: Commit**

```bash
git add src/pages/Home.tsx
git add -u src/components/landing/AnimatedBackground.tsx src/components/landing/BrandsSection.tsx
git commit -m "feat: update Home layout, remove AnimatedBackground + BrandsSection"
```

---

### Task 12: Full Visual Verification with Playwright

**Step 1: Start dev server**

```bash
cd /Users/arthurbueno/HaruCode/apps/harucode-main-page && npm run dev &
```

**Step 2: Use Playwright MCP to navigate to `http://localhost:8080/` and take full-page screenshot**

Verify:
- Near-black background (#09090B)
- Inter font rendering
- Minimal hero with centered text
- Logo bar below hero
- 2x2 solution cards
- 3-col cases
- Process steps
- Final CTA card
- Clean footer

**Step 3: Navigate to `http://localhost:8080/contato` and verify:**
- Form renders cleanly
- 2-col layout on desktop
- Input fields have subtle borders
- No Google Maps

**Step 4: Test mobile by resizing browser to 375x812 (iPhone viewport)**

Verify all sections stack properly.

**Step 5: Final commit if any adjustments needed**

```bash
git add -A
git commit -m "fix: visual polish from Playwright verification"
```
