<!--
  ┌───────────────────────────────────────────────────────────────┐
  │  You found the source. Nice.                                  │
  │  Every animated visual here is a hand-built SVG (SMIL only —  │
  │  GitHub strips scripts, not motion). Each one ships in two    │
  │  skins; <picture> picks yours. The snake regrows nightly.     │
  └───────────────────────────────────────────────────────────────┘
-->

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg">
  <img width="880" alt="Maki Jbelia — Full-Stack Developer. Animated banner cycling through: Full-Stack Developer; Django · Spring Boot · Laravel · React; Docker · Kubernetes · CI/CD" src="assets/hero-light.svg">
</picture>

<br>&nbsp;<br>

<a href="https://www.linkedin.com/in/jbelia-maki-176767242"><img alt="LinkedIn — Maki Jbelia" src="https://img.shields.io/badge/LinkedIn-Jbelia%20Maki-6366F1?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white"></a>
<a href="https://github.com/Maki99-99"><img alt="GitHub — Maki99-99" src="https://img.shields.io/badge/GitHub-Maki99--99-0B1220?style=for-the-badge&amp;logo=github&amp;logoColor=white"></a>

</div>

## About

<table>
  <tr>
    <td width="50%" valign="top">
      <b>🎨 Front end</b><br>
      React — interfaces in TypeScript &amp; JavaScript that stay fast and accessible.
    </td>
    <td width="50%" valign="top">
      <b>⚙️ Back end</b><br>
      Spring Boot, Django &amp; Laravel — APIs in Java, Python &amp; PHP, built to last.
    </td>
  </tr>
  <tr>
    <td valign="top">
      <b>🗄️ Databases</b><br>
      MySQL &amp; PostgreSQL — modeled, indexed and migration-ready.
    </td>
    <td valign="top">
      <b>🚀 DevOps</b><br>
      Docker, Kubernetes &amp; GitHub Actions — from commit to cluster.
    </td>
  </tr>
</table>

> *“I build web applications end-to-end and deploy them with Docker & Kubernetes.”*

**🔭 Currently building** — [`deploiement`](https://github.com/Maki99-99/deploiement), a full-stack user-management app running on Kubernetes.

## Stack

<div align="center">

<table>
  <tr>
    <td align="right"><b>Front end</b></td>
    <td>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=react,ts,js&amp;theme=dark">
        <img alt="Front-end skills: React, TypeScript, JavaScript" src="https://skillicons.dev/icons?i=react,ts,js&amp;theme=light">
      </picture>
    </td>
  </tr>
  <tr>
    <td align="right"><b>Back end</b></td>
    <td>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=spring,django,laravel,java,py,php&amp;theme=dark">
        <img alt="Back-end skills: Spring Boot, Django, Laravel, Java, Python, PHP" src="https://skillicons.dev/icons?i=spring,django,laravel,java,py,php&amp;theme=light">
      </picture>
    </td>
  </tr>
  <tr>
    <td align="right"><b>Databases</b></td>
    <td>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=mysql,postgres&amp;theme=dark">
        <img alt="Databases: MySQL, PostgreSQL" src="https://skillicons.dev/icons?i=mysql,postgres&amp;theme=light">
      </picture>
    </td>
  </tr>
  <tr>
    <td align="right"><b>DevOps &amp; tooling</b></td>
    <td>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=docker,kubernetes,git,github&amp;theme=dark">
        <img alt="DevOps and tooling: Docker, Kubernetes, Git, GitHub" src="https://skillicons.dev/icons?i=docker,kubernetes,git,github&amp;theme=light">
      </picture>
    </td>
  </tr>
</table>

</div>

## Projects

### deploiement

**Full-stack user management — containerized and deployed on Kubernetes.**  
Angular 16 talks to a Spring Boot 3 API backed by MySQL 8. Everything ships as Docker images and runs on Kubernetes Deployments and Services, configured through a ConfigMap and a Secret, exposed through an NGINX Ingress.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/deploiement-arch-dark.svg">
    <img width="880" alt="Architecture diagram: a browser and Docker images feed a Kubernetes cluster; NGINX Ingress routes angular.tp.local to Angular and api.tp.local to Spring Boot, which queries MySQL over JDBC" src="assets/deploiement-arch-light.svg">
  </picture>
</p>

<p align="center">
  <a href="https://github.com/Maki99-99/deploiement"><img alt="deploiement — source code" src="https://img.shields.io/badge/Source%20code-deploiement-6366F1?style=for-the-badge"></a>
  <img alt="Angular 16" src="https://img.shields.io/badge/Angular-16-DD0031?style=for-the-badge&amp;logo=angular&amp;logoColor=white">
  <img alt="Spring Boot 3" src="https://img.shields.io/badge/Spring%20Boot-3-6DB33F?style=for-the-badge&amp;logo=springboot&amp;logoColor=white">
  <img alt="MySQL 8" src="https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&amp;logo=mysql&amp;logoColor=white">
  <img alt="Deployed on Kubernetes" src="https://img.shields.io/badge/Kubernetes-deployed-326CE5?style=for-the-badge&amp;logo=kubernetes&amp;logoColor=white">
</p>

### El Fouladh — Attendance Management

**Attendance, leave & mission management for a steel plant — paper forms replaced by a bilingual Django web app.**  
Workers file leave and mission requests or justify past absences; the HR manager approves or rejects each dossier with a reason; a ZKTeco punch clock feeds the attendance engine; reports export to PDF.

<p align="center">
  <a href="https://github.com/Maki99-99/django-attendance-management"><img alt="El Fouladh — source code" src="https://img.shields.io/badge/Source%20code-El%20Fouladh-6366F1?style=for-the-badge"></a>
  <img alt="Django 5" src="https://img.shields.io/badge/Django-5-092E20?style=for-the-badge&amp;logo=django&amp;logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-database-4169E1?style=for-the-badge&amp;logo=postgresql&amp;logoColor=white">
  <img alt="Vanilla JavaScript front end" src="https://img.shields.io/badge/JavaScript-vanilla%20JS-F7DF1E?style=for-the-badge&amp;logo=javascript&amp;logoColor=black">
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/elfouladh-flow-dark.svg">
    <img width="560" alt="Request workflow: a worker files a leave, mission or justification request with its signed document; it is stored as « En attente » pending an explicit HR decision; the HR manager previews the document and approves or rejects with a reason; every calendar day is recomputed live from presences, validated requests and justifications; the worker sees the outcome and any refusal reason in « Mes demandes » and exports PDFs." src="assets/elfouladh-flow-light.svg">
  </picture>
</p>

## GitHub stats

<!-- github-stats, top-langs and stats-card are generated by scripts/generate-assets.mjs in .github/workflows/update-assets.yml — do not hand-edit the /assets copies. -->

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/github-stats-dark.svg">
    <img width="880" alt="GitHub contributions for the last 12 months: commits, pull requests, issues and pull request reviews" src="assets/github-stats-light.svg">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/top-langs-dark.svg">
    <img width="880" alt="Most used languages by code size: Python 28%, HTML 24%, CSS 17%, JavaScript 16%, Java 13%" src="assets/top-langs-light.svg">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com/?user=Maki99-99&amp;background=0B1220&amp;border=23304F&amp;stroke=23304F&amp;ring=818CF8&amp;fire=22D3EE&amp;currStreakNum=E6EDF7&amp;sideNums=E6EDF7&amp;currStreakLabel=818CF8&amp;sideLabels=8CA3C7&amp;dates=64748B">
    <img width="660" alt="GitHub contribution streak" src="https://streak-stats.demolab.com/?user=Maki99-99&amp;background=FFFFFF&amp;border=DCE5F0&amp;stroke=DCE5F0&amp;ring=4F46E5&amp;fire=0891B2&amp;currStreakNum=0F172A&amp;sideNums=0F172A&amp;currStreakLabel=4F46E5&amp;sideLabels=5B6B84&amp;dates=94A3B8">
  </picture>
</p>

### Contribution snake

<!-- Regenerated by .github/workflows/update-assets.yml — see CHANGELOG.md before editing. -->

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/snake-dark.svg">
    <img width="880" alt="Animated snake eating GitHub contributions" src="assets/snake-light.svg">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/stats-card-dark.svg">
    <img width="880" alt="Profile metrics: public repos, total stars, followers" src="assets/stats-card-light.svg">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/divider-dark.svg">
    <img width="880" alt="Animated divider" src="assets/divider-light.svg">
  </picture>
</p>

<p align="center"><sub>Building full-stack apps, one deploy at a time · Génie Logiciel</sub></p>
