#!/usr/bin/env node
// Renders the self-hosted profile cards straight from the GitHub API and
// writes them to /assets:
//   - stats-card-*.svg    profile metrics (repos, stars, followers)
//   - github-stats-*.svg  contributions for the last 12 months
//   - top-langs-*.svg     most used languages by code size
// Run by .github/workflows/update-assets.yml. Auth comes from the workflow
// (PAT_1 preferred, GITHUB_TOKEN fallback) — never from the code.

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const USER = process.env.GH_USER || "Maki99-99";
const TOKEN = process.env.GH_STATS_TOKEN || process.env.GITHUB_TOKEN || "";
const API = "https://api.github.com";
const OUT = path.join(process.cwd(), "assets");

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": `${USER}-profile-assets`,
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

const mono = "'Cascadia Code','SF Mono',Menlo,Consolas,monospace";
const sans = "Inter,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const themes = {
  dark: {
    bg0: "#0B1220", bg1: "#0F1A2E", border: "#23304F",
    text: "#E6EDF7", muted: "#8CA3C7",
    track: "#16223B", grad0: "#3E51C9", grad1: "#22D3EE",
  },
  light: {
    bg0: "#FFFFFF", bg1: "#F3F7FC", border: "#DCE5F0",
    text: "#0F172A", muted: "#5B6B84",
    track: "#E9EFF7", grad0: "#6366F1", grad1: "#0891B2",
  },
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function gh(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url} -> ${res.status} ${res.statusText}`);
  return res.json();
}

async function graphql(query, variables) {
  const res = await fetch(`${API}/graphql`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.errors) {
    throw new Error(`GraphQL -> ${res.status}: ${JSON.stringify(json.errors || json).slice(0, 300)}`);
  }
  return json.data;
}

function frame(t, width, height, label, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)}">
  <title>${esc(label)}</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.bg0}"/>
      <stop offset="1" stop-color="${t.bg1}"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${t.grad0}"/>
      <stop offset="1" stop-color="${t.grad1}"/>
    </linearGradient>
  </defs>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="16" fill="url(#bg)" stroke="${t.border}"/>
  ${body}
</svg>
`;
}

function metricRow(t, height, cells) {
  const step = 880 / cells.length;
  let out = `<g stroke="${t.border}" stroke-opacity="0.9">`;
  for (let i = 1; i < cells.length; i++) {
    out += `<line x1="${i * step}" y1="${height * 0.25}" x2="${i * step}" y2="${height * 0.75}"/>`;
  }
  out += "</g>";
  cells.forEach((c, i) => {
    const cx = step * i + step / 2;
    out += `<text x="${cx}" y="${height / 2 - 10}" text-anchor="middle" font-family="${mono}" font-size="9.5" letter-spacing="2" fill="${t.muted}">${esc(c.label)}</text>`;
    out += `<text x="${cx}" y="${height / 2 + 20}" text-anchor="middle" font-family="${sans}" font-size="24" font-weight="800" fill="${t.text}">${esc(c.value)}</text>`;
  });
  return out;
}

function renderTopLangs(t, langs) {
  const width = 880;
  const top = 58;
  const rowH = 34;
  const height = top + langs.length * rowH + 16;
  const barX = 280;
  const barW = 470;
  const barH = 10;
  const max = langs[0].pct || 1;

  let body = `<text x="36" y="32" font-family="${mono}" font-size="10" letter-spacing="2.5" fill="${t.muted}">MOST USED LANGUAGES</text>`;
  body += `<text x="844" y="32" text-anchor="end" font-family="${mono}" font-size="9" letter-spacing="1.5" fill="${t.muted}" opacity="0.85">BY CODE SIZE · OWN REPOS</text>`;
  langs.forEach((l, i) => {
    const cy = top + i * rowH;
    const w = Math.max(barH, Math.round((l.pct / max) * barW));
    body += `<text x="36" y="${cy + 4.5}" font-family="${sans}" font-size="13.5" font-weight="700" fill="${t.text}">${esc(l.name)}</text>`;
    body += `<rect x="${barX}" y="${cy - 5}" width="${barW}" height="${barH}" rx="5" fill="${t.track}"/>`;
    body += `<rect x="${barX}" y="${cy - 5}" width="${w}" height="${barH}" rx="5" fill="url(#bar)"/>`;
    body += `<text x="844" y="${cy + 4}" text-anchor="end" font-family="${mono}" font-size="11" fill="${t.muted}">${l.pct.toFixed(1)}%</text>`;
  });

  const names = langs.map((l) => l.name).join(", ");
  return frame(t, width, height, `Most used languages by code size: ${names}`, body);
}

async function fetchRepos() {
  const repos = [];
  for (let page = 1; page <= 5; page++) {
    const batch = await gh(`${API}/users/${USER}/repos?per_page=100&page=${page}&sort=pushed`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

async function topLanguages(repos) {
  const totals = new Map();
  for (const repo of repos) {
    if (repo.fork) continue;
    try {
      const langs = await gh(`${API}/repos/${USER}/${repo.name}/languages`);
      for (const [name, bytes] of Object.entries(langs)) {
        totals.set(name, (totals.get(name) || 0) + bytes);
      }
    } catch (e) {
      console.warn(`languages skipped for ${repo.name}: ${e.message}`);
    }
  }
  const sum = [...totals.values()].reduce((a, b) => a + b, 0) || 1;
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, bytes]) => ({ name, pct: (bytes / sum) * 100 }));
}

async function githubStats() {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
      }
    }
  }`;
  const data = await graphql(query, { login: USER });
  const c = data.user.contributionsCollection;
  return [
    { label: "COMMITS · 12 MO", value: String(c.totalCommitContributions) },
    { label: "PULL REQUESTS", value: String(c.totalPullRequestContributions) },
    { label: "ISSUES", value: String(c.totalIssueContributions) },
    { label: "PR REVIEWS", value: String(c.totalPullRequestReviewContributions) },
  ];
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const profile = await gh(`${API}/users/${USER}`);
  const repos = await fetchRepos();
  const stars = repos.reduce((a, r) => a + r.stargazers_count, 0);

  const metrics = [
    { label: "PUBLIC REPOS", value: String(profile.public_repos) },
    { label: "TOTAL STARS", value: String(stars) },
    { label: "FOLLOWERS", value: String(profile.followers) },
  ];

  const langs = await topLanguages(repos);
  if (langs.length === 0) throw new Error("No language data found — refusing to write an empty card.");

  let statCells = null;
  if (TOKEN) {
    try {
      statCells = await githubStats();
    } catch (e) {
      console.warn(`GitHub stats unavailable, keeping placeholder: ${e.message}`);
    }
  } else {
    console.log("No token available — writing placeholder GitHub stats (CI fills it).");
  }
  const placeholder = ["COMMITS · 12 MO", "PULL REQUESTS", "ISSUES", "PR REVIEWS"].map(
    (label) => ({ label, value: "—" })
  );

  for (const [name, t] of Object.entries(themes)) {
    const metricsLabel = `Profile metrics: ${metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join(", ")}`;
    await writeFile(
      path.join(OUT, `stats-card-${name}.svg`),
      frame(t, 880, 120, metricsLabel, metricRow(t, 120, metrics))
    );
    await writeFile(path.join(OUT, `top-langs-${name}.svg`), renderTopLangs(t, langs));
    await writeFile(
      path.join(OUT, `github-stats-${name}.svg`),
      frame(
        t,
        880,
        120,
        "GitHub contributions for the last 12 months: commits, pull requests, issues, reviews",
        metricRow(t, 120, statCells ?? placeholder)
      )
    );
  }

  console.log(`Assets written to ${OUT} (star count ${stars}, ${langs.length} languages, token ${TOKEN ? "yes" : "no"})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
