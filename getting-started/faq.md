---
title: "FAQ — Frequently Asked Questions"
description: "Common questions about the Biological Sovereignty Protocol, data ownership, and getting started."
---

# Frequently Asked Questions (FAQ)

Welcome to the Biological Sovereignty Protocol (BSP) FAQ. Here, we address the most common questions about the protocol, data sovereignty, identity, and the intelligence engine.

---

## 1. Core Principles

### What is the Biological Sovereignty Protocol (BSP)?
The Biological Sovereignty Protocol is an open, decentralized standard that defines a universal language for the exchange of human health and longevity data. It ensures that biological data—blood tests, wearable metrics, genomic data—belongs permanently to the individual, rather than to hospitals, laboratories, or technology platforms.

### Who owns the BSP?
No one. The BSP is an open protocol, much like HTTP or SMTP. The **Ambrósio Institute** acts as the Guardian of the standard, maintaining the specification and leading the open governance process (BSP Improvement Proposals - BIPs), but it does not own the protocol or the data within it.

### What is the difference between BSP and AVA?
- **BSP (The Protocol):** The open language. It defines how data is structured, exchanged, and secured.
- **AVA (The Intelligence):** The Ambrósio Vitality Algorithm. It is the proprietary intelligence engine built by the Ambrósio Institute that reads BSP data to generate longevity insights and the Ambrósio Vitality Score (SVA).

---

## 2. Biological Identity & Sovereignty

### What is a BEO (Biological Entity Object)?
A BEO is your permanent, sovereign biological identity. It is a cryptographic object anchored on the decentralized Arweave blockchain. All your standardized health data (BioRecords) is attached to your BEO.

### Do I need permission to create a BEO?
No. Anyone can create a BEO using the open BSP SDK or any BSP-compatible application. It is completely free and requires no approval from the Ambrósio Institute or any government authority.

### Where is my data stored?
Your BEO and BioRecords are permanently stored on **Arweave**, a decentralized storage network designed to preserve data for hundreds of years. This ensures your biological history cannot be deleted or lost if a company goes out of business.

### Who can see my data?
Only you, and the institutions you explicitly authorize. All BioRecords are encrypted with your public key before being stored. They can only be decrypted using the private key that resides exclusively on your personal device. The Ambrósio Institute itself cannot access your data without your consent.

---

## 3. Security & Consent

### How is my data secured?
Control of your BEO is determined by a **private key (Ed25519)** stored securely in your device's hardware enclave (e.g., Apple Secure Enclave). The access control rules (ConsentTokens) run as AO processes on Arweave, making them mathematically immune to unauthorized bypass.

### What happens if I lose my phone or my private key?
If you lose your device, you have two ways to recover your BEO:
1. **Seed Phrase:** The 24-word backup phrase you received during creation.
2. **Social Recovery:** If you enabled the Social Recovery system, you can ask your 3 designated "Guardians" (trusted friends, doctors, or platforms) to approve your recovery. It requires a 2-out-of-3 consensus to restore access safely.

### Can I revoke an institution's access?
Yes. You hold the ultimate power. With a single tap in a BSP-compatible app, you can instantly revoke a **ConsentToken**. The smart contract will immediately reject any further read/write attempts from that institution.

---

## 4. Ecosystem & Certification

### Do laboratories need to pay to use BSP?
No. Reading the specification, installing the `bsp-sdk`, and submitting BioRecords (with patient consent) is entirely free and open.

### What is BSP Certification?
While the protocol is open to any laboratory, **BSP Certification (BSP-1 through BSP-4)** is a voluntary quality mark issued by the Ambrósio Institute. Certified institutions undergo technical auditing, receive a verified badge on-chain, and their data is considered trusted enough to directly feed the AVA intelligence engine.

---

## 5. Development & Contributions

### I'm a developer. Where do I start?
Head over to the [Developer Quickstart](/getting-started/quickstart) to install the TypeScript or Python SDK (`bsp-sdk` or `bsp-sdk`). You can start submitting standardized BioRecords to your own BEO in minutes.

### How are new biomarkers added to the protocol?
The BSP biomarker taxonomy is improved through the **BIP (BSP Improvement Proposal)** process. Any researcher or physician in the world can propose the inclusion of a new biological marker by submitting a formal BIP on our public GitHub repository. proposals are reviewed quarterly by the Ambrósio Institute's Scientific Council.
