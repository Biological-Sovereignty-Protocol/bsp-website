---
title: BSP vs FHIR vs HL7 — Health Data Standard Comparison
description: Compare the Biological Sovereignty Protocol (BSP) with FHIR, HL7, OpenEHR, and other health data standards. Understand which protocol gives you true data ownership.
sidebar: false
---

# BSP vs FHIR vs HL7 vs OpenEHR

A practical comparison of open health data standards — what they solve, who controls the data, and where BSP fits in.

## Summary Table

| Feature | BSP | FHIR (R4/R5) | HL7 v2/v3 | OpenEHR |
|---|---|---|---|---|
| **Data ownership** | Patient (cryptographic) | Institution | Institution | Institution |
| **Permanent storage** | Arweave (immutable) | Server-dependent | Server-dependent | Server-dependent |
| **Privacy model** | Consent tokens on-chain | OAuth/SMART | ACL | Role-based |
| **Interoperability** | Open standard | Open standard | Open standard | Open standard |
| **Vendor lock-in** | None | Possible | High | Low |
| **API fees** | None | Possible | High | Low |
| **Longevity** | Permanent (blockchain) | Dependent on vendor | Dependent on vendor | Dependent on vendor |
| **AI/ML ready** | Native (BioRecord) | Partial | Limited | Partial |
| **Developer SDK** | TypeScript + Python | Many | Many | Several |
| **License** | MIT (open) | HL7 IP | HL7 IP | Apache 2.0 |

## What is FHIR?

FHIR (Fast Healthcare Interoperability Resources) is an HL7 standard for exchanging health information electronically. It defines data formats and APIs used by hospitals, insurers, and EHR vendors.

**FHIR is excellent for:** interoperability between healthcare institutions.

**FHIR does not solve:** patient data ownership, permanent storage, or freedom from API gatekeepers.

## What is HL7?

HL7 (Health Level 7) is a set of international standards for transferring clinical and administrative data between software applications. HL7 v2 is still the most widely used messaging format in hospitals.

**HL7 is excellent for:** legacy healthcare system integration.

**HL7 does not solve:** modern data sovereignty, patient consent, or decentralized access control.

## What is OpenEHR?

OpenEHR is an open standard for electronic health records. It uses archetypes and templates to model clinical knowledge independently of any vendor.

**OpenEHR is excellent for:** standardized clinical data models.

**OpenEHR does not solve:** cryptographic ownership, immutable storage, or patient-controlled consent.

## Where BSP fits

BSP is not a replacement for FHIR or HL7 inside hospitals. BSP solves a different problem: **who ultimately owns the data when it leaves the healthcare system**.

BSP sits at the **sovereignty layer** — giving individuals cryptographic ownership of their biological data, regardless of which EHR system generated it.

```
Hospital EHR (FHIR/HL7)
        ↓
  BSP Export (BEO + BioRecord)
        ↓
  Arweave Permanent Storage
        ↓
  Patient-Controlled Access
        ↓
  AI / Research / Longevity Apps
```

## Key BSP concepts not found in other standards

- **BEO (Biological Entity Object)** — the cryptographic identity of a living organism
- **IEO (Institutional Entity Object)** — how institutions interact with biological data
- **ConsentToken** — on-chain consent that cannot be revoked without the patient's signature
- **BioRecord** — standardized time-series biomarker data format
- **Arweave integration** — data stored permanently, independent of any API

## FAQ

**Can BSP work alongside FHIR?**
Yes. BSP exports can be generated from FHIR resources. The two are complementary.

**Is BSP a blockchain protocol?**
BSP uses Arweave for permanent storage and on-chain consent. The protocol itself is a data standard — implementation details are open.

**Who controls BSP?**
BSP is governed by BIPs (Biological Improvement Proposals), modeled after Ethereum's EIP process. No single company controls it.

---

*See also: [What is BSP?](/what-is-bsp) · [Specification Overview](/specification/overview) · [Whitepaper](/whitepaper)*
