# CHANGELOG

Profile README for **Maki99-99**. Visuals live in `/assets` (two skins each, served via `<picture>`), everything image path is relative to the repo root.

## 2026-11-10 — Self-hosted stats, cleanup, El Fouladh

### Removed
- **github-readme-stats cards** (stats + top languages) — the broken images. Replaced by SVGs generated inside GitHub Actions (see below). No external stats server is used anymore.
- **Trophies strip** (the custom Public Repos / Total Stars / Followers / Languages row).
- **Last-push column** and the `auto-generated … refreshed daily` footer from the bottom metrics card (now 3 columns: repos, stars, followers).
- **Custom activity heatmap** — the contribution snake is now the single contribution visual (streak card kept).
- **"Next in the lab"** placeholder rows — section deleted until a real project exists.
- **Profile views counter** (komarev hit counter).
- Duplicate badge clutter: exactly one LinkedIn and one GitHub badge (top of the page); project "Source code" badges carry no GitHub logo.
- Stack icons: Angular (front end) and GitHub Actions (DevOps), per the stack update.

### Fixed
- Stats and top-languages cards are now **generated from the GitHub API by `scripts/generate-assets.mjs`** and committed to `/assets`, referenced with relative paths — no third-party stats service to go down.
- Stack rows rebuilt as a tight 2-column table (right-aligned labels, one icon strip per row, same 48px icon size) for consistent spacing.
- Numbers on the generated cards come straight from the API in the same workflow — commits/PRs/issues/reviews are a 12-month `contributionsCollection`; languages are summed per-repo byte counts (own, non-fork repos, top 5).
- All `/assets` references are relative (`assets/…svg`), so paths are verified against the repo itself.

### Added
- **El Fouladh — Attendance Management** project card + a 5-step workflow diagram (`assets/elfouladh-flow-{dark,light}.svg`, portrait for mobile). The flow is taken from the app's code: request or justification → « En attente » → HR approve/reject with reason → live day-status recompute → status visible in « Mes demandes ».

### Workflow and secrets
- `.github/workflows/update-assets.yml` runs on a daily schedule, on `workflow_dispatch`, and on push to `main` (README/scripts/workflow changes); it commits only when `assets/` actually changed, with `permissions: contents: write` and no hardcoded secrets.
- **One-time setup:** add a repository secret `PAT_1` (Settings → Secrets and variables → Actions) holding a *classic* personal access token with the `read:user` scope. The workflow passes it to the script as `GH_STATS_TOKEN` and falls back to `GITHUB_TOKEN` when the secret is absent.
- To regenerate locally: `GH_STATS_TOKEN=<pat> node scripts/generate-assets.mjs` (without a token the GitHub-stats card stays a placeholder; the workflow fills it).

### Adding a new project card
1. Copy the `### El Fouladh — Attendance Management` block in `README.md` (pitch line, optional diagram, badge row).
2. Point the "Source code" badge at the repo: `https://img.shields.io/badge/Source%20code-<Label>-6366F1?style=for-the-badge` and add 2–4 stack badges (`for-the-badge`, brand colour).
3. For a diagram, add `myproject-flow-dark.svg` + `myproject-flow-light.svg` to `/assets` using the palette below, then wire them via `<picture>` (dark `<source>`, light fallback `<img>`, always with `width` and meaningful `alt`).
4. Keep width ≤ ~900px, both themes, and update the static alt text if the flow changes.

### Palette and type (all custom SVGs)
- Dark: bg `#0B1220 → #0F1A2E`, border `#23304F`, text `#E6EDF7`, muted `#8CA3C7`, indigo `#818CF8`, cyan `#22D3EE`.
- Light: bg `#FFFFFF → #F3F7FC`, border `#DCE5F0`, text `#0F172A`, muted `#5B6B84`, indigo `#4F46E5`, cyan `#0891B2`.
- Type: Inter/system sans for copy, Cascadia Code/SF Mono/Consolas for labels.

### Third-party services still in use
| Service | Used for | Status |
| :-- | :-- | :-- |
| skillicons.dev | Stack icons (dark/light variants) | up (2026-11-10) |
| img.shields.io | Social, project and stack badges | up (2026-11-10) |
| streak-stats.demolab.com | Contribution streak card | up (2026-11-10) |

If one of these ever fails, replace it the same way the stats cards were replaced: generate a themed SVG in the workflow and reference it from `/assets`.
