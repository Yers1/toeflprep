# DESIGN.md

## Color

Background: `#0f172a` (deep slate)  
Surface: `#1e293b` (slate 800)  
Elevated: `#334155` (slate 700)  
Primary accent: `#38bdf8` (sky 400)  
Success: `#34d399` (emerald 400)  
Warning: `#fbbf24` (amber 400)  
Danger: `#f87171` (red 400)  
Text primary: `#f8fafc` (slate 50)  
Text secondary: `#94a3b8` (slate 400)  
Text muted: `#64748b` (slate 500)

Dark mode only. No light theme.

## Typography

- Headings: `Inter`, weights 600–800.
- Body: `Inter`, weight 400–500.
- Mono: `JetBrains Mono` for code/scores/timers.
- Hero H1: `clamp(2.5rem, 6vw, 4.5rem)`.
- Body: `16px / 1.6`.

## Spacing

- Container max-width: `1120px`.
- Section vertical padding: `80px` desktop, `56px` mobile.
- Component gaps: `16px` base, `24px` for feature groups.

## Components

- **Cards**: 1px border `#334155`, radius `16px`, background surface.
- **Buttons**: radius `12px`; primary filled accent; secondary bordered.
- **Inputs**: surface bg, 1px border, radius `12px`, focus ring accent.
- **Timer bar**: sticky top, mono font, amber → red countdown states.
- **Score badge**: circular, mono font, size `64px`.

## Motion

- Page sections fade-in on load.
- Cards lift `translateY(-2px)` on hover.
- Timer pulses softly under 10s.
- Reduced motion: disable all transforms and pulses.

## Layout

- Landing: hero → features → mode preview → scoring explanation → FAQ → CTA.
- App: tabbed modes, each as a focused card with prompt, response area, and feedback panel.
