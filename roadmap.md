---
title: BSP Roadmap
description: 5-Year Roadmap (2026–2030) — quarterly milestones with binary completion criteria, synchronized with Whitepaper v3.0 Part VI.
lang: en
---

<div class="page-hero-image">
  <img src="/images/roadmap-hero.jpg" alt="BSP Roadmap" loading="lazy" />
</div>

# BSP Roadmap

> This roadmap is synchronized with [Whitepaper v3.0 — Part VI](/whitepaper#part-vi). For full strategic context including adoption strategy and failure modes, see the whitepaper.

## Preliminary note — on predicting the future

Roadmaps for decentralized protocols are notorious for aging poorly. The original Filecoin roadmap, written in 2017, promised mainnet for 2018 — it arrived in 2020. Ethereum 2.0, specified in 2018, was still being delivered in fragments in 2024. Every self-respecting whitepaper carries the humility of knowing that time takes its revenge on predictions.

What follows, therefore, is **not prediction** — it is **aspiration anchored in verifiable hypotheses**. Every milestone is a bet. Every date is provisional. What matters is not whether we hit the deadlines, but whether the **directions** remain correct as we learn.

The roadmap below covers 2026–2030. It is organized by **technical milestones** (verifiable on-chain), **adoption milestones** (verifiable in public metrics), and **institutional milestones** (verifiable in publications and partnerships). Each milestone has a binary completion criterion.

---

## Year 1 — 2026 — Operational Foundation

The goal this year is to **leave the pre-mainnet state** and establish minimum viable infrastructure. We are at ~95% technical readiness in February 2026; the remaining work is multisig, operational security, and the first real users.

| Quarter | Milestone | Completion criterion |
|---------|-----------|---------------------|
| Q1 2026 | Aptos mainnet deployment with active 2-of-3 multisig (BIP-0001) | Contracts published, owner = multisig address, on-chain transaction verifiable |
| Q1 2026 | External audit of the Move contract | Public report published by an independent firm (Trail of Bits, Zellic, or OtterSec) |
| Q2 2026 | bsp-id-web in production | alice.bsp and own-domain functional, first 1,000 BEOs created |
| Q2 2026 | Complete technical documentation | Whitepaper v3 published, Move specification, self-hosted relayer guides |
| Q3 2026 | Stable SDKs (TypeScript v3.0, Python v2.1) | Versions published on npm and PyPI, integration examples documented |
| Q3 2026 | BSP Certified Level 1 program launched | Public criteria specification, first certifications issued |
| Q4 2026 | Pilot partnerships with 3 laboratories | LOIs signed, integrations in staging environment, first real BioRecords |
| Q4 2026 | 10,000 active BEOs | Public on-chain metric, transparency dashboard |

**Main risk:** delay in audit. **Mitigation:** audit contracts signed in Q4 2025, with reserved windows.

---

## Year 2 — 2027 — Scientific Validation

In 2027, the focus shifts from infrastructure to **scientific legitimacy**. Without peer review, BSP is just another promising crypto protocol. With peer review, it becomes a reference.

| Quarter | Milestone | Completion criterion |
|---------|-----------|---------------------|
| Q1 2027 | Peer review submission of AVA methodology | Manuscript submitted to Nature Aging, Aging Cell, or Cell Metabolism |
| Q2 2027 | Validation studies initiated | MOUs with UK Biobank and ELSA-Brasil, IRBs approved |
| Q2 2027 | 25,000 active BEOs | On-chain metric |
| Q3 2027 | 5 IEOs certified Level 2 | Public seals, integration in production |
| Q3 2027 | Native mobile apps beta | iOS and Android with local key management |
| Q4 2027 | Peer-reviewed AVA publication | Paper accepted (not just submitted) |
| Q4 2027 | 50,000 active BEOs | On-chain metric |

**Main risk:** peer review rejection. **Mitigation:** parallel submissions to multiple journals; accept that the first round will likely require substantial revisions.

---

## Year 3 — 2028 — Expansion

With scientific validation in hand, 2028 is the year of **horizontal scale**: more labs, more clinics, more wearables.

| Quarter | Milestone | Completion criterion |
|---------|-----------|---------------------|
| Q1 2028 | 50 certified IEOs | Public directory |
| Q2 2028 | 100,000 active BEOs | On-chain metric |
| Q2 2028 | Client-Side Encryption migration complete | All new BEOs with CSE as default |
| Q3 2028 | Mobile apps in production (App Store, Play Store) | Apple/Google approval |
| Q4 2028 | First community BIP accepted | BIP submitted by an external contributor, approved via public process |
| Q4 2028 | 200,000 active BEOs | On-chain metric |

**Main risk:** App Store rejection due to regulatory considerations (health apps face a higher bar). **Mitigation:** engage legal counsel from 2027.

---

## Year 4 — 2029 — Maturity

The fourth year is when the protocol stops being "early stage" and becomes **institutional infrastructure**.

| Quarter | Milestone | Completion criterion |
|---------|-----------|---------------------|
| Q1 2029 | Independent Audit Council operational | 5+ non-Institute members, charter published |
| Q2 2029 | 500,000 active BEOs | On-chain metric |
| Q2 2029 | Decision on governance token | Public BIP evaluating necessity; decision (yes/no) recorded |
| Q3 2029 | Pilot with public health system | Regional SUS (Brazil) or NHS digital health (UK) — MOU signed |
| Q4 2029 | 1M active BEOs | On-chain metric |

**Main risk:** institutional bureaucracy stretches deadlines. **Mitigation:** pilots in jurisdictions where the steward has direct networks (Brazil, Portugal, Estonia).

---

## Year 5 — 2030 — Ecosystem

The fifth year is the **real decentralization test**: multiple relayers operating independently, multiple client implementations, multiple voices in governance.

| Quarter | Milestone | Completion criterion |
|---------|-----------|---------------------|
| Q1 2030 | 5+ independent relayer operators | Verifiable public list, none controlling >40% of traffic |
| Q2 2030 | AVA validated in 5+ peer-reviewed cohorts | Publications across different cohorts (UK Biobank, ELSA-Brasil, KORA, Rotterdam Study, US NHANES) |
| Q3 2030 | 1.5M active BEOs | On-chain metric |
| Q4 2030 | Public discussion on opening AVA | Public BIP, open RFC, decision recorded |
| Q4 2030 | 2M+ active BEOs globally | On-chain metric |

**Symbolic mark:** if by 2030 we don't have at least 3 independent client implementations (web, mobile, CLI) and 5 relayer operators, the protocol has failed the real decentralization test and needs to redesign incentives.

---

*Protocol development is community-driven and subject to change through the BIP process. For adoption strategy across the three fronts (individuals, institutions, regulators) and detailed failure modes with mitigations, see [Whitepaper v3.0 — Part VI](/whitepaper#part-vi).*

[View BIPs](/bips/) · [Read the Whitepaper](/whitepaper) · [Contribute on GitHub](https://github.com/Biological-Sovereignty-Protocol)
