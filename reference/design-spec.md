# Majd portfolio — measured design spec

Source: https://majd-portfolio.framer.website/ captured with Playwright (Chromium) at 1440, 1024, 768, and 390. Raw dumps live in `reference/data/` and screenshots in `reference/screenshots/`.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| Cream | `#FAF7F3` / `rgb(250, 247, 243)` | Page background, nav logo, button labels on black, footer text |
| Ink | `#111111` / `rgb(17, 17, 17)` | Text, nav pill, testimonial cards, footer, form fields |
| Mute | `rgba(17, 17, 17, 0.5)` | Service tags, meta labels |
| Ghost | `rgba(0, 0, 0, 0.1)` | Unscrolled quote words, social icon wells, MAJD wordmark is cream at 10% |
| White | `#FFFFFF` | “Made in Framer” badge |

Grain tile: `/assets/rR6HYXBrMmX4cRpXfXUOvpvpB0.png` painted across the page.

## Type

All visible UI text is **Archivo** (Clash Grotesk and Inter load on the Framer page and are unused by rendered text).

| Style | Desktop ≥1200 | Tablet ≥810 | Mobile | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- | --- |
| Hero H1 | 174px | 120px | 46px | 800 | 0.9 | -0.02em |
| Section H2 | 76px | 62px | 46px | 600 | 1 | -0.02em |
| Page H1 | 72px | 62px | 46px | 700 | 1 | -0.02em |
| Article H2 | 52px | 44px | 34px | 600 | 1.2 | -0.02em |
| Card H3 | 32px | 30px | 28px | 500 | 1.2 | -0.02em |
| ©2026 | 68px | 58px | hidden | 600 | 1 | -0.02em |
| Footer headline | 68px | 58px | 48px | 600 | 1 | -0.02em |
| Quote words | 36px | 36px | 28px | 500 | 1.2 | -0.02em |
| Body | 18px | 18px | 18px | 400 | 1.4 | -0.04em |
| Bio lead | 22px | 22px | 22px | 600 | 1.4 | -0.04em |
| Meta / tags | 16px | 16px | 16px | 400 (roles 300) | 1.4 | -0.04em |
| Pills | 16px | 16px | 16px | 500 | 1.2 | -0.02em |
| Nav wordmark | 22px | 22px | 22px | 600 | 1.4 | -0.04em |
| MAJD | visual size ≈ 29vw, weight 700, cream at 10% opacity |

## Layout

- Desktop content inset **130px**, inner width **1180px**.
- Tablet inset about **92px** for headings (outer frame 62px + 30px).
- Mobile inset **20px**.
- Blog and project detail use a wider inset, **180px**, and a **1080px** column on desktop. Article body max **740px**.
- Breakpoint where Framer switches the “Desktop” row variant to “Mobile”: between 768 and 1024. This clone uses **810px** and **1200px**.

## Navigation

- Black pill, height **60px**, radius **20px**, `top: 30px`.
- Desktop/tablet: width **320px**, horizontally centered.
- Mobile: inset **20px** each side.
- Logo “Majd” links to `/#hero-section`.
- Menu control is a cream **44×36** button, radius **8px**, with three **4px** dots.
- “Use for Free” and “More Templates” are **fixed** bottom-right pills, **160×35**, radius **8px**, gap **8px**, **20px** from the right edge. They are not a top bar.
- Anchors: `#hero-section`, `#bio-section`, `#services`, `#contact`, work `#hero-section`, project `#work-section`, article `#article-section`.

## Hero

- Section height equals the viewport (**900px** at the captured desktop viewport, **844px** at 390).
- H1 is centered. Sparkle `OLDYsHB9RMavvQrkVRNy08ZXYE.png` sits top-left of the wordmark (140px desktop / 60px mobile). Bolt `lIIjRX5gxRdY7UWw5wqIXicPOA.png` sits lower right (198px / 99px).
- Portrait `haSjyjpt7FyCjJUBvXtmzCMSEQg.png` is **200×228** desktop, **220×251** tablet, **180×205** mobile, radius **20px**. Front and back layers share that file; the clone crossfades a darkened back plate into the color portrait while the hero/bio block scrolls. On desktop the portrait is sticky through the 1800px hero+bio stack.
- `©2026` is bottom-left from tablet up. `/CREATING SINCE 2020` is bottom-right on desktop and centered on small screens.

## Bio

- Section is a full viewport under the hero.
- “Hey!” and the 22px lead sit in a **300px** left column. Two 18px paragraphs and “Get Started” sit in a **360px** right column (desktop). They stack on mobile.
- Get Started goes to `https://framer.link/nnhGcWR` and is paired with a **28×28** arrow chip, radius **8px**.

## Quote

- Sticky viewport inside a **150vh** section (live section height 1350px inside a 900px viewport).
- Words start at `rgba(0,0,0,0.1)` and resolve to `#111` in order as the section scrolls.

## Services

Four rows, min height **120px**, gap **16px**. Titles left, tags right at 50% ink with **4px** dots between them. Tags wrap under the title on mobile. Hover/focus highlights the row. Items are always visible (not a collapsed accordion).

## Projects

- Home shows Damas, Najm, Kavi, Sham in a 2-column grid (1 column under 810px).
- Card image radius **20px**, gap **16px**. Title 32/30/28, subtitle 16px.
- `/work` adds AiWings, Abjad, and Faseelh (`/work/fasselh`). Page title “My Brightest Creations”, 72px.
- Detail pages: title, category / year / live link, summary, cover, body sections at 52px headings, gallery, then two more projects.
- Hover scales the cover image.

## Testimonials

Four cards. Desktop is one row of **283×340** (they sum with 16px gaps to 1180). Tablet is 2×2. Mobile stacks at full width, height 340, radius **20px**. Resting face is the centered logo; hover flips to the quote, avatar (**50px**), name (16/400) and role (16/300).

## Thoughts / blog

- Home desktop: two article cards plus a black caption card (“See how we shape brands with clarity and craft— explore our blog”) and a light “View All” link to `/blog#hero-section`.
- Cards are **460px** tall, radius **20px**, cream type over a bottom gradient.
- `/blog` title “My Brightest Thoughts”. Seven articles in a 3-column grid.
- Article pages: 72px title, dek, date and read time, 740×430 image, sections, sticky newsletter (300×215, radius 18, ink), then three more articles.

## Contact

- “Let’s talk.” plus the help line.
- Social wells **40×40**, radius **8px**, `rgba(0,0,0,0.1)`, linking to X, Instagram, LinkedIn, YouTube.
- Fields are ink, radius **8px**, cream labels. Name and email are **74px** tall, the project field **170px**, gap about **20px**.
- Submit is cream with ink type, height **44px**, radius **8px**.
- The form validates, shows a loading label, then a success message. Submission is local (no network).

## Footer

- Ink background.
- “Scaling Start-ups for Growth.” in cream, about 340px wide, wrapping to three lines.
- `/Quick links` and `/Contact` at 26px/500. Link chips are cream pills, radius 8, height 35, ink type.
- Email `mailto:mejed@templyo.io`, displayed as Mejed@Templyo.io.
- Oversized MAJD wordmark at 10% cream.

## Motion

- Headings and leads: each word starts at opacity `0.001` and `translateY(10px)`, then eases to rest over ~0.7s with a short stagger. Easing used in the clone: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Hero lines fade up on load.
- Quote color is scroll-scrubbed.
- Portrait opacity is scroll-scrubbed on desktop.
- Nav translates away while scrolling down and returns on scroll up.
- Route changes fade and shift 16px over 0.45s.
- Cards scale their images on hover. Testimonials rotate on the Y axis.

## Meta

- Title: Majd
- Description: Software engineer and Framer creator with a strong focus on building modern, scalable, and conversion-driven web experiences.
- `og:image` / `twitter:image` point at the local copy of the Framer share image when `public/assets/og.png` is present. Twitter card is `summary_large_image`.
