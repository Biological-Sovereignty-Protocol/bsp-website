---
title: "Open Health Data Standard for Developers | BSP"
description: "BSP is an open health data standard built for permanence and sovereignty. Compare BSP vs FHIR, HL7, and proprietary APIs for labs, clinics, and health platforms."
---

# Open Health Data Standard for Developers, Labs, and Platforms

Health data interoperability has been a solved problem in theory for decades. In practice, it remains fragmented. FHIR is widely implemented but not universally adopted. HL7 v2 is everywhere and going nowhere. Proprietary APIs multiply. Patients still can't get their own data out of most systems without jumping through hoops.

BSP is a different kind of standard. It doesn't try to replace FHIR for clinical workflows. It solves a different problem: giving individuals permanent, portable, machine-readable ownership of their biological data — independent of any institution's continued participation.

## BSP vs FHIR: Different Jobs, Different Designs

| | FHIR | BSP |
|---|---|---|
| **Primary audience** | Healthcare institutions | Individuals + developers |
| **Data residency** | Provider-controlled servers | User-controlled (Arweave) |
| **Persistence model** | Institution-dependent | Protocol-guaranteed permanent |
| **Access control** | Institution-mediated | Cryptographic, user-held |
| **Interoperability scope** | Clinical system integration | Cross-institution, cross-border, cross-platform |
| **Identity model** | Patient identifiers per institution | Single cryptographic identity |
| **Open standard** | Yes (HL7) | Yes (BSP) |

BSP and FHIR are not in conflict. Labs and clinics can implement FHIR internally and export to BSP when writing patient-owned records. BSP includes a FHIR bridge in its reference implementation specifically for this use case.

## Why Build on BSP

For **labs and diagnostics companies**, BSP provides a standardized export path for patient-owned results. Write results to a patient's BEO once — they take it with them forever. No more portal maintenance, no more "we don't retain records past 7 years," no more support tickets about accessing old data.

For **wearable and health app developers**, BSP's biomarker taxonomy gives you a canonical vocabulary for biological data. Standardize your exports once, and your users can combine your data with any other BSP-compatible source.

For **longevity clinics and precision medicine platforms**, BSP's structured schema enables longitudinal analysis across data sources that would otherwise require custom ETL for every integration. Your AI models get clean, typed, cryptographically verified input.

For **research institutions**, BSP's consent token system allows participants to grant time-bounded, scope-limited access to specific portions of their biological record — without re-consenting for every study or maintaining a separate research data warehouse.

## The BSP Biomarker Taxonomy

BSP ships with a four-level biomarker taxonomy covering the most common biological data types:

- **Level 1 — Core:** 40 biomarkers that every health platform should capture (lipids, CBC, metabolic panel, key hormones)
- **Level 2 — Standard:** Extended diagnostics, additional hormones, inflammatory markers
- **Level 3 — Extended:** Specialty panels, microbiome, epigenetic markers
- **Level 4 — Device:** Continuous monitoring data from wearables (HRV, glucose, SpO2, sleep stages)

Each biomarker has a canonical code, unit, reference range, and data type. Implementing BSP means your data is automatically interoperable with every other BSP-compatible tool.

[Browse the full taxonomy](/specification/taxonomy/level-1-core)

## Implementation Path

BSP is designed to be incrementally adoptable:

1. **Read the specification** — start with the [BEO schema](/specification/beo) and [exchange protocol](/specification/exchange)
2. **Use the SDK** — TypeScript and Python SDKs handle key management, record signing, and Arweave writes out of the box
3. **Import existing data** — the FHIR bridge and CSV importers cover the most common export formats
4. **Go live** — write your first BEO to Arweave mainnet in under an hour

---

[View SDK Reference](/developers/sdk-reference) | [Read the BEO Schema](/specification/beo) | [Quickstart](/getting-started/quickstart)
