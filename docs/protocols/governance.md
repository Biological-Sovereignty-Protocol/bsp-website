# Governance & BIP Process

> "A protocol that cannot evolve is dead. A protocol that anyone can change is not a protocol."

## Governance Philosophy

BSP is a public good. Its governance model resolves the fundamental tension between **stability** (systems built on BSP shouldn't break on every update) and **adaptability** (scientific advances must be incorporated).

Three layers evolve at different velocities:

| Layer | Change Frequency | Decision Authority |
|-------|-----------------|-------------------|
| **Protocol Core** (BEO, IEO, Exchange) | Annual or less | 2-of-3 multi-sig + 90-day public comment |
| **Biomarker Taxonomy** (BSP-XX codes) | Quarterly | Scientific Council + Institute ratification |
| **Implementations** (AVA, SDKs, apps) | Continuous | Each implementor independently |

---

## The Ambrósio Institute as Guardian

The Institute is the **guardian** of the standard, not its owner. This distinction matters: a guardian maintains the protocol's integrity for the ecosystem's benefit.

### Scientific Council

| Attribute | Value |
|-----------|-------|
| Composition | 7 members — longevity, cardiology, metabolism, neurology, genomics, immunology, medical laboratory |
| Independence | No financial relationship with the Institute or any BSP ecosystem company during tenure |
| Quorum | 5 of 7 members required for a vote |
| Approval | Simple majority of those present |
| Meetings | Quarterly: January, April, July, October |
| Transparency | Meeting minutes published in `bsp-spec` within 14 days; individual votes recorded |

### Three-Key Multi-Sig

Critical protocol operations require 2-of-3 Institute keyholder signatures:

| Keyholder | Role | Storage |
|-----------|------|---------|
| **A** — Founder | Day-to-day operations, BIP ratification | Hardware wallet offline |
| **B** — Scientific Director | Protocol specification and taxonomy changes | Hardware wallet, restricted access |
| **C** — Legal Custodian | Independent fiduciary — safeguard against unilateral abuse | Held by third party |

### Authorization Levels

| Level | Operations | Executors |
|-------|-----------|----------|
| **Critical** (2-of-3) | Modify core contracts, revoke IEO permanently, change governance structure | Any 2 keyholders |
| **Significant** (1 + Council vote) | Approve BIP, suspend IEO, publish spec version | Any keyholder after Council vote |
| **Routine** (1 keyholder) | IEO certification renewal, documentation, badge issuance | Any authorized keyholder |

---

## BIP Types

| Type | Code | Scope | Comment Period |
|------|------|-------|---------------|
| Taxonomia | BIP-T | Add/modify/remove biomarkers | 30 days |
| Protocol | BIP-P | Changes to BEO, IEO, Exchange Protocol | 90 days |
| Governance | BIP-G | Changes to the BIP process or multi-sig | 120 days |
| Informational | BIP-I | Best practices, recommendations | Simplified |

---

## Complete BIP Schema

```yaml
bip_id:        BIP-0042
type:          T                       # T | P | G | I
title:         "Proposed change title"
status:        DRAFT                   # DRAFT | REVIEW | COUNCIL | ACCEPTED | REJECTED | WITHDRAWN

authors:
  - name:        "Full Name"
    affiliation: "Institution or Independent"
    contact:     "email@example.com"
    conflict:    "None"                # Required: any financial interest

submitted_at:  2026-01-15
review_start:  2026-01-22
council_vote:  2026-04-15
decided_at:    2026-04-22

abstract:      |
  Max 200 words describing what the BIP proposes.

motivation:    |
  Why is this change needed now?

specification: |
  Technical description of the proposed change.

rationale:     |
  Why this approach vs. alternatives considered.

backwards_compatibility: |
  Impact on existing BSP implementations.

evidence:                          # Required for BIP-T and BIP-P
  - citation:    "Author et al. (2024). Title. Journal."
    doi:         "10.xxxx/xxxxxx"
    year:        2024
    n_participants: 15000
    finding:     "What this paper supports in the proposal"
    quality:     RCT | Meta-analysis | Cohort | Case-control | Expert

# For BIP-T: biomarker specification
biomarker_spec:
  proposed_code: BSP-LA-009
  name:          "Scientific Name"
  category:      BSP-LA
  level:         CORE
  unit:          "umol/L"
  method:        "ELISA"
  ref_range:
    optimal:    "40-60"
    functional: "30-70"
    deficiency: "<30"
    toxicity:   ">100"
  cost_tier:    LOW | MEDIUM | HIGH | RESEARCH_ONLY
```

---

## The BIP Lifecycle

```
Day 1: Submission
  → Author opens Pull Request in bsp-spec/bip/
  → Institute assigns BIP number, status: DRAFT

Week 1–2: Technical Review
  → Schema, references, technical coherence validated
  → Status: REVIEW

Days 15–45 (BIP-T): Public Comment
  → BIP open for community input on GitHub
  → Author must respond to all substantial comments
  → Status: COUNCIL

Council Meeting (Quarterly): Vote
  → Full BIP + comment summary + technical opinion presented
  → Each member votes APPROVE / REJECT / ABSTAIN with mandatory justification
  → Votes and justifications published in public minutes

Week 1–2 post-vote: Ratification
  → ACCEPTED: Keyholder B ratifies on-chain → taxonomy updated in bsp-spec
  → REJECTED: Author receives detailed feedback, may resubmit without limit
```

---

## Why Proposals Get Rejected

| Proposal Example | Reason |
|-----------------|--------|
| "Subjective energy level" as biomarker | Not objectively measurable. BSP requires numeric values with standardized units. |
| 40 nutritional biomarkers in one BIP | No individual evidence per marker. Resubmit as separate BIPs. |
| `provider_fee` field in Exchange Protocol | Attempt to insert monetization into the protocol core. BSP cannot extract value from user-institution transactions. |

---

## Protocol Capture Protection

Three structural protections against unilateral Institute control:

1. **Independent Keyholder C** — A third-party fiduciary holds the third key. Blocks unilateral abuse by Keyholders A and B.
2. **Public, Auditable BIPs** — Every proposal, vote, and decision is public and recorded on-chain. Anyone can verify the Institute acts in the ecosystem's interest.
3. **Fork Protection Commitment** — The Institute publicly commits to never legally challenge BSP forks. If the community disagrees, they may fork — with no legal barriers.

---

## How to Submit a BIP

1. Fork [`biological-sovereignty-protocol/bsp-spec`](https://github.com/Biological-Sovereignty-Protocol/bsp-spec)
2. Copy `bip/TEMPLATE.md` to `bip/BIP-DRAFT-your-title.md`
3. Fill in the template — evidence citations are mandatory for BIP-T and BIP-P
4. Submit a Pull Request to the main branch
5. The Institute assigns a BIP number within **3 business days**
