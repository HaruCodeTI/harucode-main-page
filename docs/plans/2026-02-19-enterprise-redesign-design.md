# HaruCode Enterprise Redesign — Design Document

**Date:** 2026-02-19
**Approach:** Linear Dark (Approach A)
**Benchmarks:** Linear, Stripe

## Design System

### Colors
- Background: `#09090B`
- Surface: `#111113`
- Border: `rgba(255,255,255,0.06)`, hover `rgba(255,255,255,0.12)`
- Text Primary: `#FAFAFA`
- Text Secondary: `rgba(255,255,255,0.55)`
- Text Muted: `rgba(255,255,255,0.35)`
- Accent: `#8B5CF6` (muted purple)
- Accent Hover: `#7C3AED`
- Accent Glow: `rgba(139,92,246,0.15)`

### Typography
- Font: Inter (replace Poppins)
- H1: 48px / 600 / -0.025em tracking / 1.1 line-height
- H2: 36px / 600 / -0.02em / 1.15
- H3: 20px / 600 / -0.01em
- Body: 16px / 400 / 1.6
- Labels: 13px / 500 / 0.02em / uppercase

### Spacing
- Section: py-24 lg:py-32
- Container: max-w-[1120px]
- Cards: p-6 lg:p-8, rounded-xl (12px)
- No backdrop-blur (except header), no glassmorphism, no floating orbs

### Interactions
- Hover: border brightens + subtle accent glow shadow
- Framer Motion: fade-in-up only, staggered children
- No bouncing, floating, or particle animations

## Page Layouts

### Header
- Fixed, h-16, border-b border-white/[0.06], bg-[#09090B]/80 backdrop-blur-md
- Mobile: hamburger with solid bg panel
- CTA: solid accent, rounded-lg

### Hero
- Centered: bold H1, paragraph, two buttons
- Below: logo bar (grayscale, scroll on mobile)
- Below: 3 metric cards (horizontal, stack on mobile)

### Solutions (2x2 → 1col mobile)
- bg-[#111113] border border-white/[0.06] rounded-xl
- Icon with accent bg at 10%, tags as badges

### Cases (3col → 1col mobile)
- Sector label, title, description, metric badges
- Subtle accent top-border on hover

### Process (3col → vertical timeline on mobile)
- Step numbers in accent font-mono
- Left border timeline on mobile

### Final CTA
- Centered, max-w-2xl, accent border
- Buttons stack on mobile

### Contact Page
- Desktop: form 60% + info 40%
- Mobile: single column, form first
- Inputs: bg-transparent, border-white/[0.06], rounded-lg
- No Google Maps iframe
- Inline success state

### Footer
- 3-column → 1-column on mobile
- border-t border-white/[0.06]

## GHL Integration
- Hook: `useGHL()` in `src/hooks/use-ghl.ts`
- Env vars: `VITE_GHL_API_KEY`, `VITE_GHL_LOCATION_ID`
- Fallback: n8n webhook if GHL vars missing
- Returns: `{ submit, isLoading, isSuccess, error }`

## Files

| Action  | File |
|---------|------|
| Rewrite | src/index.css |
| Rewrite | tailwind.config.ts |
| Rewrite | src/components/Header.tsx |
| Rewrite | src/components/Footer.tsx |
| Rewrite | src/components/landing/HeroSection.tsx |
| Rewrite | src/components/landing/SolutionsSection.tsx |
| Rewrite | src/components/landing/CaseShowcase.tsx |
| Rewrite | src/components/landing/ProcessSection.tsx |
| Rewrite | src/components/landing/FinalCTA.tsx |
| Rewrite | src/pages/Contato.tsx |
| Delete  | src/components/landing/AnimatedBackground.tsx |
| Delete  | src/components/landing/BrandsSection.tsx |
| Create  | src/hooks/use-ghl.ts |
| Create  | .env.example |
| Modify  | src/pages/Home.tsx |
| Modify  | src/components/WhatsAppButton.tsx |

## Content Language
- All UI text: Portuguese (PT-BR)
- Code/comments: English
- Tone: formal, ROI-focused, enterprise
