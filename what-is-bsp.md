---
title: What is BSP?
description: A complete guide to the Biological Sovereignty Protocol — how it works, why it matters, and what it enables.
lang: en
---

<div class="page-hero-image">
  <img src="/images/what-is-bsp-hero.jpg" alt="What is BSP?" loading="lazy" />
</div>

# What is BSP?

The Biological Sovereignty Protocol (BSP) is an open, permissionless protocol that gives individuals full ownership and control over their biological data — from genomics and clinical records to wearable metrics and microbiome profiles.

Built on Arweave for permanent storage and using Ed25519 cryptography for tamper-proof consent, BSP removes institutions as gatekeepers of your most personal data.

## The problem

Your biological data is the most personal information that exists. Yet today:
- Hospitals and labs own your records — you get a copy at best
- Genomics companies sell your DNA data to third parties
- Health apps monetize your biometrics without meaningful consent
- Researchers can't access real data — privacy regulations lock it away
- You have no financial upside when your data trains AI models

## How BSP solves it

BSP creates a three-layer sovereignty stack:

### 1. BEO — Biological Entity Object
Your sovereign biological identity. A cryptographic identity anchored to you — not an institution. Contains your data references, access policies, and consent rules. Only you can sign changes to your BEO.

### 2. IEO — Institution Entity Object
How institutions interact with the protocol. Labs, hospitals, AI companies, and researchers register IEOs to request access to biological data — on your terms.

### 3. ConsentToken
A cryptographically-signed authorization that you grant to an IEO for a specific purpose, duration, and data scope. Revocable at any time. Logged permanently on Arweave.

## What becomes possible

With BSP, individuals can:
- Own and control their complete biological record
- Grant and revoke access to researchers in seconds
- Receive compensation when their data is used commercially
- Port their data between providers without losing history

Researchers and institutions can:
- Access consented, high-quality biological datasets
- Build AI health models on real, verified data
- Comply with privacy regulations by design

## The open standard

BSP is fully open source. No company controls the protocol. Anyone can read the specification, build implementations, propose changes via BIPs, or deploy their own registry.

[Read the Whitepaper](/whitepaper) · [View the Specification](/specification/overview) · [Start Building](/developers/sdk-reference)

## Frequently asked questions

### Who owns my biological data under BSP?
You do. Your BEO is signed with your private key. No institution can modify it without your signature.

### Is BSP live?
BSP v1 is deployed on Arweave mainnet. The Registry API and TypeScript SDK are publicly available.

### Can institutions reject BSP?
They can choose not to use it — but they cannot prevent individuals from using it. BSP is permissionless.

### How is BSP different from GDPR/HIPAA compliance?
Those are legal frameworks. BSP is technical infrastructure. Compliance is enforced by cryptography, not paperwork.

### Who maintains BSP?
The Ambrosio Institute publishes the reference implementation. The protocol is governed by BIPs (BSP Improvement Proposals) — open to anyone.
