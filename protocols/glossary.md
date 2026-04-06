---
title: "Protocol Glossary"
description: "Glossary of terms used in BSP protocol documentation and specifications."
---

# Canonical Glossary

All terms, objects, types, contracts, and repositories in the BSP ecosystem defined precisely in a single reference.

---

## Core Protocol Objects

**BEO — Biological Entity Object**
The sovereign biological identity of a living human in the BSP ecosystem. A permanent object stored on Arweave, identified by a `.bsp` domain (e.g., `andre.bsp`), and controlled exclusively by the holder through a private key. All BioRecords are anchored to the BEO. All ConsentTokens are issued from it. No company, government, or the Ambrósio Institute can access, modify, or delete a BEO without the holder's private key.

**BioRecord**
The atomic unit of biological data. Every measurement — lab result, wearable reading, clinical assessment, genomic marker — is a BioRecord. BioRecords are **immutable** after writing: corrections are new records that supersede the previous, preserving complete history. Each BioRecord contains: the BSP biomarker code, value with standardized unit, reference ranges, submitting institution (cryptographically signed), raw data hash, and timestamps.

**BIP — BSP Improvement Proposal**
The formal mechanism for BSP protocol evolution. Any researcher, physician, lab, developer, or individual can submit a BIP — with scientific justification, at least two peer-reviewed references, and a proposed BSP code.

**.bsp Domain**
Human-readable, permanent biological address (e.g., `andre.bsp`, `fleury.bsp`). Registered in the DomainRegistry smart contract — globally unique. Once registered, belongs to the holder permanently. Institutional domains are transferable on acquisition or merger.

**ConsentToken**
Cryptographic authorization allowing an IEO to interact with a BEO holder's data. Issued on-chain by the AccessControl contract, specifying: who can access (`ieo_id`), who is accessed (`beo_id`), permitted actions (intents), accessible data categories, and duration. Always revocable by the holder — instantly, on-chain.

**IEO — Institutional Entity Object**
The institutional identity of any organization, system, or professional that interacts with biological data. Any institution can create an IEO without prior approval. Types: `LABORATORY`, `HOSPITAL`, `WEARABLE`, `PHYSICIAN`, `INSURER`, `RESEARCH`, `PLATFORM`.

---

## Smart Contracts & Blockchain

**AccessControl**
The most critical BSP contract. Manages all consent grants between BEOs and IEOs. Any system attempting to write a BioRecord or read BEO data must present a valid authorization registered here. Without the holder's signature, the transaction is rejected by the blockchain — no server can bypass it.

**Arweave**
Decentralized storage blockchain. Pay once — data persists for 200+ years, guaranteed by a mathematical endowment model. BSP smart contracts run via SmartWeave on Arweave. If the Ambrósio Institute ceases to exist, BEOs and BioRecords remain accessible forever.

**BEORegistry**
SmartWeave contract on Arweave responsible for creating and indexing BEOs. **Open to anyone** — no approval required. Records: public address, public key hash, domain, and BEO metadata.

**DomainRegistry**
Smart contract controlling the `.bsp` namespace. Guarantees uniqueness: `andre.bsp` can exist only once globally. Manages registrations, transfers, and revocations.

**Governance (contract)**
SmartWeave contract controlling modifications to other BSP contracts. Implements multi-signature model: critical operations require signatures from at least 2 of 3 Institute keyholders. No individual — including the founder — can unilaterally modify protocol rules.

**IEORegistry**
SmartWeave contract managing BSP-Certified institutions. Records which institutions hold certification, at which level, and with which authorized categories. Queried by Ambrosio OS and other apps to verify credentials.

**SmartWeave**
Smart contract framework running on Arweave. Enables programmable logic on Arweave's permanent storage blockchain.

---

## Intelligence Layer

**AVA — Ambrósio Vitality Algorithm**
The Ambrósio Institute's proprietary biological aging algorithm. Not part of the BSP specification — a reference implementation built on top of the open protocol. AVA **never has passive access** to any BEO: it processes data only when the user actively initiates an analysis with explicit session consent. Runs in the private `ava-core` repository.

**SVA — Ambrósio Vitality Score**
The multi-dimensional biological age score produced by AVA:
- Cardiovascular, metabolic, neurological, and immunological biological age
- Aging velocity (relative to chronological baseline)
- Biological reserve (population percentile)

Proprietary — can only be produced by the Institute's `sva-engine`.

---

## Protocol Types & Concepts

**BSP — Biological Sovereignty Protocol**
Open standard defining a universal language for biological data exchange. Defines how data is structured (BioRecord), identified (BEO, IEO, .bsp), exchanged (Exchange Protocol), and governed (BIP process). Does not define what to do with data — intelligence like AVA operates above the protocol.

**BSP-Certification**
Voluntary quality seal granted by the Ambrósio Institute to institutions meeting technical and compliance requirements. Benefits: official directory listing, Ambrosio OS suggestion, verifiable on-chain badge, and AVA data pipeline access.
Levels: `BSP-1` (Basic) → `BSP-2` (Advanced) → `BSP-3` (Full Spectrum) → `BSP-4` (Device)

**BSPIntent**
Typed enum defining what action a system requests in the Exchange Protocol.

| Intent | Description |
|--------|-------------|
| `SUBMIT_RECORD` | Write a BioRecord to the BEO |
| `READ_RECORDS` | Read existing BioRecords |
| `ANALYZE_VITALITY` | Request AVA analysis |
| `REQUEST_SCORE` | Request SVA score |
| `EXPORT_DATA` | Export all data — always available to holder |
| `SYNC_PROTOCOL` | Protocol version negotiation |

**CertLevel**
Enum representing BSP certification levels.
`UNCERTIFIED` → `BASIC` → `ADVANCED` → `FULL` → `DEVICE` → `RESEARCH`

**IEOStatus**
`ACTIVE` | `SUSPENDED` | `REVOKED` | `PENDING`

**Social Recovery**
Mechanism for recovering a BEO private key without a central server. The holder designates 3 trusted guardians. To recover access, at least 2 of 3 must confirm — using Shamir Secret Sharing. Guardians have no access to the BEO data.

---

## Repositories

| Repository | Access | Purpose |
|------------|--------|---------|
| `bsp-spec` | Public | Protocol specification |
| `bsp-sdk-typescript` | Public | TypeScript SDK (`@bsp/sdk`) |
| `bsp-sdk-python` | Public | Python SDK (`bsp-sdk`) |
| `bsp-mcp` | Public | MCP server for AI agents |
| `bsp-docs-repo` | Public | This documentation site |
| `bsp-contracts` | Private | Smart contracts on Arweave |
| `bsp-registry-api` | Private | Certification portal API |
| `ava-core` | Private | AVA algorithm |
| `sva-engine` | Private | SVA scoring engine |
