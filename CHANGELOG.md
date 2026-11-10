# Changelog — profile README redesign

## What changed (2026-11-10)

- **New animated hero banner** (`assets/hero-dark.svg` / `hero-light.svg`): hand-built SMIL animation — no JavaScript — with a name lockup, capsule frame, drifting waves, pulsing sparkles and a terminal-style typing effect that cycles through `Full-Stack Developer` → `Django · Spring Boot · Laravel · React` → `Docker · Kubernetes · CI/CD`.
- **About section turned into cards** (4 punchy capability cards + philosophy quote + "currently building" line).
- **Skill wall grouped by category** (Front end / Back end / Databases / DevOps) using skillicons.dev, one icon strip per category.
- **Featured project card** for `deploiement` with a custom animated architecture SVG (`assets/deploiement-arch-*.svg`): Browser + Docker feed a Kubernetes cluster; animated packets travel Browser → NGINX Ingress → Angular / Spring Boot → MySQL, and a "deploy" packet flows from Docker into the cluster.
- **Placeholders** for two upcoming projects ("Next in the lab" table).
- **Live stats**: GitHub stats card, top languages and streak (github-readme-stats / streak-stats) **plus** a repo-generated trophy strip and a GitHub-Actions-generated 12-month contribution heatmap — all with dark/light variants.
- **Auto-updating visuals** via `.github/workflows/update-assets.yml` (daily at 03:17 UTC + manual dispatch + on relevant pushes): regenerates the contribution snake (`platane/snk`), a "repos / stars / followers / last push" card, a trophy strip, and a contribution-activity heatmap using the GitHub GraphQL API (`scripts/generate-assets.mjs`), then commits the results to `/assets` using the default `GITHUB_TOKEN` (no hardcoded secrets, `permissions: contents: write` only).
- **Animated divider + footer**, profile-views counter, social badges, and an HTML-comment easter egg.
- **Every image** has meaningful alt text, is ≤ 880 px wide, and is wrapped in a `<picture>` block with a `(prefers-color-scheme: dark)` source and a light fallback.

## Adding or replacing a project

1. Open `README.md` and find **Featured project** (flagship) or the **Next in the lab** table (placeholders).
2. For a new featured project, copy the existing `### deploiement` block: pitch paragraph → diagram → badge row.
3. Optional diagram: create an SVG (max 880 px wide, use the palette below) in two variants, commit them to `assets/`, then reference them with the same `<picture>` pattern:
   ```html
   <picture>
     <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Maki99-99/Maki99-99/main/assets/<name>-dark.svg">
     <img width="880" alt="Meaningful description" src="https://raw.githubusercontent.com/Maki99-99/Maki99-99/main/assets/<name>-light.svg">
   </picture>
   ```
4. Replace a placeholder row in the table with: `| **[repo](url)** | One-line pitch. | Tech · stack |`.

## Previewing locally

- **VS Code / any Markdown preview**: open `README.md` — local file links resolve, remote images need internet. Toggle your OS/browser dark mode to check both `<picture>` variants.
- **GitHub-like rendering**: `pip install grip` then `grip README.md` → http://localhost:6419 (renders through GitHub's markdown API; dark/light depends on browser `prefers-color-scheme`).
- **On GitHub**: the repo page and the profile page render the same file. On the profile page, relative `assets/...` paths would resolve against `github.com/<user>/` and 404 — that is why this README uses absolute `raw.githubusercontent.com/.../main/assets/...` URLs. Files themselves live in `/assets` and are versioned normally.

## Automation notes

- **Do not hand-edit** `assets/snake-*.svg`, `assets/stats-card-*.svg`, `assets/trophies-*.svg` and `assets/activity-*.svg` — the workflow overwrites them. Snake, trophies and stats card ship pre-seeded; the activity heatmap ships as a styled placeholder until the first workflow run.
- Trigger a refresh manually: **Actions → Update profile assets → Run workflow**. Locally: `node scripts/generate-assets.mjs` (set `GITHUB_TOKEN` to also regenerate the activity heatmap; the GraphQL API rejects anonymous calls).
- The workflow is idempotent: it exits without committing when nothing changed.

## Third-party services used (and fallbacks)

Availability was audited on 2026-11-10. The public activity-graph and trophy instances answered **HTTP 402 for every user**, so they were replaced with self-generated SVGs (same slots, same palette). Swap the `<picture>` sources back if those services ever recover and you prefer them.

| Service | Used for | Audit | If it goes down |
| --- | --- | --- | --- |
| skillicons.dev | tech stack icons | 200 | swap the `<picture>` srcs for shields.io badges |
| github-readme-stats | stats + top languages | 503 (public instance rate-limited; usually recovers) | self-host the fork on Vercel, or remove the two cards (the custom stats card below still covers repos/stars/activity) |
| streak-stats.demolab.com | streak card | 200 | self-host or remove |
| shields.io / komarev.com | social + views badges | 200 | brief badge outages; the text links above remain usable |
| ~~github-readme-activity-graph~~ | *replaced* by `assets/activity-*.svg` (GraphQL heatmap) | 402 | regenerated by this repo's workflow |
| ~~github-profile-trophy~~ | *replaced* by `assets/trophies-*.svg` | 402 | regenerated by this repo's workflow |

All custom visuals (hero, architecture, divider, snake, stats card) are repo-hosted, so the core of the page never depends on a third party. Every `<img>` has alt text, so the page degrades gracefully.

## Palette and type

- **Dark**: background `#0B1220 → #101C36`, border `#23304F`, text `#E6EDF7`, muted `#8CA3C7`, indigo `#818CF8`, cyan `#22D3EE`.
- **Light**: background `#FFFFFF → #F3F7FC`, border `#DCE5F0`, text `#0F172A`, muted `#5B6B84`, indigo `#4F46E5`, cyan `#0891B2`.
- **Type**: Inter/system sans for display text; Cascadia Code/SF Mono/monospace for labels and terminal lines. Every custom SVG uses the same two stacks.
