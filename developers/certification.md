# BSP Certification Process

The Biological Sovereignty Protocol (BSP) is inherently open. Any laboratory, wearable device, or application can create a BEO (Biological Entity Object) or submit BioRecords, provided they have the cryptographic consent of the individual. 

However, **BSP Certification** exists to establish a verifiable layer of trust, technical compliance, and data quality. It is a mark of institutional accountability.

---

## Why Get Certified?

While uncertified systems can technically participate in the ecosystem (if a user authorizes them), becoming **BSP-Certified** provides significant advantages for institutions:

1. **Verified Directory Listing:** Certified institutions appear in the official Ambrósio Institute directory. This is where users look first when finding trusted sources for biological data.
2. **Native Ambrosio OS Trust:** When a user uses the official Ambrosio app, certified data sources are trusted by default. Uncertified sources trigger visible "unverified source" warnings before the user signs a ConsentToken.
3. **AVA Data Pipeline Access:** This is the most critical benefit. Only data originating from a BSP-Certified source feeds into the Ambrósio Vitality Algorithm (AVA). Uncertified data remains in the user's BEO but does **not** contribute to their Ambrósio Vitality Score (SVA).
4. **On-Chain Badge:** Status is immutably recorded in the `IEORegistry` smart contract on Arweave, publicly verifiable by any third-party app.
5. **Governance Participation:** Certified institutions gain voting privileges in the BSP Improvement Proposal (BIP) process, directly shaping the future of the standard.

---

## Certification Levels

The certification framework is mapped to the four levels of the [BSP Biomarker Taxonomy](/developers/taxonomy). An institution only needs to be certified at the level of data it actively produces.

### BSP-1: Compliant Basic
* **Target:** Conventional clinical laboratories and hospitals.
* **Requirements:** Capability to process and submit **Level 2 (Standard)** biomarkers (e.g., Hematology, Lipids, Conventional Hormones, General Chemistry). Must accurately implement the BioRecord schema and cryptographic signing via the SDK.

### BSP-2: Compliant Advanced
* **Target:** Advanced longevity clinics and functional medicine laboratories.
* **Requirements:** Capability to process **Level 1 (Core)** and Level 2 biomarkers (e.g., NAD+, GDF-11, epigenetic clocks, hsCRP). Must demonstrate robust ConsentToken management and dynamic request handling.

### BSP-3: Compliant Full-Spectrum
* **Target:** Comprehensive research institutions and ultra-advanced diagnostic centers.
* **Requirements:** Capability across Level 1, 2, and specialized **Level 3 (Extended)** domains (Genomics, Microbiome, Advanced Toxicology). Requires deep integration with the AVA intelligence pipeline.

### BSP-4: Compliant Device
* **Target:** Hardware manufacturers (wearables, continuous glucose monitors, biosensors).
* **Requirements:** Capability to generate **Level 4 (Device)** data (HRV, SpO2, Sleep Architecture). Requires implementing daily data consolidation—devices must not flood the blockchain with raw events, but rather submit daily aggregated BioRecords.

---

## The Certification Workflow

Institutions looking to acquire the BSP-Certified seal interact with the (Private) `bsp-registry-api` backend controlled by the Ambrósio Institute.

### 1. Application Submission
The institution creates an Institutional Entity Object (IEO) natively via the SDK and submits their `ieo_id` along with technical documentation and quality assurance records to the Ambrósio Institute portal.

### 2. Technical Audit
The Institute's engineering team audits the institution's sandbox integration. 
* Do they correctly verify `ConsentTokens` before `SUBMIT_RECORD` intents?
* Are the `BioRecords` correctly mapped to the BSP taxonomy?
* Are reference ranges securely populated?

### 3. Smart Contract Endorsement
Upon approval, the Ambrósio Institute signs a multi-sig transaction on the `IEORegistry` Arweave contract, updating the institution's status to **CERTIFIED** at the appropriate tier (e.g., BSP-2).

### 4. Continuous Compliance
Certification is reviewed annually. Institutions must maintain SLA uptime for their data interfaces and promptly adopt protocol version upgrades to retain their certification badge.

---

*Note: The certification portal is currently managed privately by the Institute. If your organization is ready to test integration, begin by downloading the `bsp-sdk` and testing against local BEOs before requesting a formal audit.*
