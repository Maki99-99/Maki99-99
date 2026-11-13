# CHANGELOG

Profile README for **Maki99-99**. Visuals live in `/assets` (two skins each, served via `<picture>`); every asset reference is relative.

## 2026-11-13 — Project rename: kubernetes-deployments

### Changed
- README: the project formerly referenced as `deploiement` is now `kubernetes-deployments` — the "Currently building" link and `<code>` label, the `###` project heading, and the source-code badge (href, alt text and shield text/URL) all point to `https://github.com/Maki99-99/kubernetes-deployments`.

### Path changes
- `assets/deploiement-arch-dark.svg` → `assets/kubernetes-deployments-arch-dark.svg` and `assets/deploiement-arch-light.svg` → `assets/kubernetes-deployments-arch-light.svg`; the README `<picture>` `srcset`/`src` references were updated to match.
- Both SVGs also had their internal `aria-label`, `<title>` and top-left caption renamed to `kubernetes-deployments`; geometry, palette and animation are untouched.
- The same two SVGs and the `<picture>` schema block were added to the `kubernetes-deployments` repository (`assets/`) so its README shows the same architecture diagram.

## 2026-11-12 — Footer drift

### Added
- `assets/footer-dark.svg` and `assets/footer-light.svg`: 880×120 closing band with a thin indigo→cyan rule and two low-opacity wave layers drifting at 36 s and 44 s (SMIL `animateTransform`). Static fallback is the full finished band; no text added.
- README: footer `<picture>` block appended after the existing sign-off line, with a dark `<source>` and light `<img>` fallback, `width="880"`, and descriptive alt text.

### Fixed
- `assets/divider-dark.svg` and `assets/divider-light.svg`: the base gradient rule was a zero-height `<line>`; Chrome drops gradients on zero-height bounding boxes, which left the static fallback blank. Replaced with a 1.2 px-high rounded `<rect>` using the same gradient and geometry. README unchanged.
- `assets/footer-dark.svg` and `assets/footer-light.svg`: used the same rect technique so the thin rule survives animation-off rendering.

### Verified, no change
- Hero shimmer and blinking cursor, deploiement packet dots and the pulsing status dot were already present at task start; all keep loops ≥ 2 s, static fallbacks and the original palette.
- Stack icons, About table wording, headings and link targets untouched. Stack shimmer skipped — the icon grid is already dense.
- No workflow change; the optional trophy card was skipped (the existing generated stats, top-languages and streak cards already cover the API-derived content).

### Path changes
- None. No image path changed and no existing static image was edited.

## 2026-11-10 — Leaner stats, subtle motion

### Removed
- **Custom stats row** (Public Repos · Total Stars · Followers): `assets/stats-card-*.svg` deleted, generator code removed, not replaced.
- **Last push box** and the `auto-generated … refreshed daily` footer (gone with that card).
- **El Fouladh project section** (heading, pitch, stack badges, workflow diagram) and its two SVGs `elfouladh-flow-*.svg`.
- **External streak image** (`streak-stats.demolab.com`) — the streak card is now generated locally like the others.
- Placeholder project rows / "Next in the lab" remain absent.

### Fixed / changed
- **Streak card is self-hosted**: `scripts/generate-assets.mjs` computes current streak, longest streak and total contributions from the contribution calendar (GraphQL) and writes `assets/streak-{dark,light}.svg`. Every stats card now loads from `/assets`; skillicons.dev and img.shields.io are the only remaining external images.
- **Stack section verified against the exact list**: Front end `react,ts,js` (3 icons) · Back end `spring,django,laravel,java,py,php` (6) · Databases `mysql,postgres` (2) · DevOps & tooling `docker,kubernetes,git,github` (4). Angular and GitHub Actions stay out of the general stack; the deploiement card keeps its "Angular 16" badge because that project really uses it.
- No-token runs keep the last good stats/streak cards instead of overwriting them with placeholders.

### Animated (SMIL only, loops ≥ 2 s, static fallbacks everywhere)
- **Hero**: slow gradient shimmer on the name (8 s), typing taglines with a 2 s blinking cursor. If animation is disabled the first tagline and name still render fully (clip widths default to full text).
- **Section dividers**: thin gradient line with a sweeping highlight (6 s); one SVG pair reused between sections.
- **deploiement diagram**: small glowing dots travel along the arrows (5–9 s, low opacity); they are hidden when animation is off, leaving clean static arrows.
- **Currently building**: pulsing status dot (2 s).
- Stack-icon ticker: intentionally skipped (optional) — the icon grid already shows the stack; no extra motion added.

### Workflow and secrets
- `.github/workflows/update-assets.yml` runs on a daily schedule, on `workflow_dispatch`, and on push to `main` (README/scripts/workflow changes); it commits only when `assets/` changed, with `permissions: contents: write` and no hardcoded secrets.
- **One-time setup:** add a repository secret `PAT_1` (Settings → Secrets and variables → Actions) holding a classic personal access token with the `read:user` scope. The workflow passes it as `GH_STATS_TOKEN` and falls back to `GITHUB_TOKEN` when unset.
- Regenerate locally: `GH_STATS_TOKEN=<pat> node scripts/generate-assets.mjs` (without a token the GitHub-stats/streak cards are left as they are on disk).

### Adding a new project card
1. Copy the `### deploiement` block structure (pitch line, diagram, badge row).
2. Point the "Source code" badge at the repo: `https://img.shields.io/badge/Source%20code-<Label>-6366F1?style=for-the-badge` and add 2–4 stack badges (`for-the-badge`, brand colour).
3. For a diagram, add `myproject-flow-dark.svg` + `myproject-flow-light.svg` to `/assets` using the palette below, then wire them via `<picture>` (dark `<source>`, light fallback `<img>`, always with `width` and meaningful `alt`).
4. Keep width ≤ ~900 px, both themes, loops ≥ 2 s, and a good static fallback.

### Palette and type (all custom SVGs)
- Dark: bg `#0B1220 → #0F1A2E`, border `#23304F`, text `#E6EDF7`, muted `#8CA3C7`, indigo `#818CF8`, cyan `#22D3EE`.
- Light: bg `#FFFFFF → #F3F7FC`, border `#DCE5F0`, text `#0F172A`, muted `#5B6B84`, indigo `#4F46E5`, cyan `#0891B2`.
- Type: Inter/system sans for copy, Cascadia Code/SF Mono/Consolas for labels.

### Third-party services still in use
| Service | Used for | Status |
| :-- | :-- | :-- |
| skillicons.dev | Stack icons (dark/light variants) | up (2026-11-10) |
| img.shields.io | Social, project and stack badges | up (2026-11-10) |
