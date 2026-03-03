# Institutional Entity Object (IEO)

> "Every institution that touches human biology needs a language to speak it."

## What is an IEO?

The IEO represents any organization, system, or professional that interacts with biological data in the BSP ecosystem — from a clinical laboratory to an AI platform. Any institution can create an IEO without approval. BSP Certification is voluntary but unlocks meaningful benefits.

---

## IEO Types

| Code | Type | Primary Role |
|------|------|-------------|
| `LAB` | Laboratory | Submit BioRecords — the primary data source |
| `HOSP` | Hospital & Health System | Submit + Read records across clinical domains |
| `WEAR` | Wearable & Device | Submit continuous Level 4 (Device) data daily |
| `PHY` | Physician & Practitioner | Read records to interpret patient medical history |
| `INS` | Health Insurer | Read SVA aggregate score only — never raw data |
| `RES` | Research Institution | Anonymized aggregate access for open science |
| `PLT` | Platform & AI System | Analyze vitality, request SVA scores |

---

## Permission Matrix

| Action | LAB | HOSP | WEAR | PHY | INS | RES |
|--------|:---:|:----:|:----:|:---:|:---:|:---:|
| Submit BioRecords | ✓ | ✓ | ✓ | ✓* | — | — |
| Read BEO (with token) | — | ✓ | — | ✓ | — | — |
| Aggregate anonymized data | — | — | — | — | ✓* | ✓ |
| Analyze vitality (AVA) | — | — | — | ✓ | — | — |
| Request SVA score | — | — | — | ✓ | ✓* | — |

*PHY: clinical assessments only (BSP-CL) | INS: SVA composite only with user opt-in*

---

## Complete IEO Schema

```typescript
interface IEO {
  ieo_id:       string    // Universally unique institutional identifier
  domain:       string    // .bsp address — e.g., "fleury.bsp"
  display_name: string    // Full legal name
  ieo_type:     IEOType   // LABORATORY | HOSPITAL | WEARABLE | PHYSICIAN | INSURER | RESEARCH | PLATFORM
  country:      string    // ISO3166 country code
  jurisdiction: string    // Regulatory jurisdiction
  legal_id:     string    // CNPJ (BR) / EIN (US) / VAT (EU) etc.
  public_key:   string    // Institutional Ed25519 public key
  created_at:   string    // ISO8601
  version:      string    // BSP version at time of creation

  certification: {
    level:      "UNCERTIFIED" | "BASIC" | "ADVANCED" | "FULL" | "DEVICE" | "RESEARCH"
    granted_at: string
    expires_at: string     // Annual renewal
    categories: string[]   // Authorized BSP categories (e.g., ["BSP-LA", "BSP-HM"])
    intents:    BSPIntent[]
  }

  operations: {
    biorecords_submitted: number
    last_submission:      string
    compliance_rate:      number  // 0.0–1.0
    active_consents:      number
  }

  status: "ACTIVE" | "SUSPENDED" | "REVOKED" | "PENDING"
}
```

---

## Certification Levels

| Level | Code | Data Access | Target |
|-------|------|-------------|--------|
| Uncertified | — | Any category with user consent | Any institution getting started |
| Basic | BSP-1 | L2 Standard | Clinical labs, routine diagnostics |
| Advanced | BSP-2 | L1 Core + L2 | Advanced longevity clinics |
| Full Spectrum | BSP-3 | L1 + L2 + L3 Extended | Comprehensive research centers |
| Device | BSP-4 | L4 Device (continuous) | Wearable manufacturers |

---

## Certification Process

### Standard Laboratory Path (BSP-1)

1. **Application** — Submit at `biologicalsovereigntyprotocol.com/certify`. Required: legal entity ID, contacts, list of analytical categories.
2. **Document Review** — Institute reviews within 5 business days: legal legitimacy, regulatory standing, capability match.
3. **Technical Audit** — Access to BSP Compliance Test Suite. Must submit 100 valid BioRecords across all requested categories in sandbox mode using the SDK.
4. **IEO Update** — On approval, Institute updates institution's IEO on Arweave to `BSP-CERTIFIED` with authorized categories and audit reference.
5. **Production** — SDK production credentials issued. Badge becomes active and verifiable on-chain.
6. **Annual Renewal** — Fails → status changes to `SUSPENDED`.

---

## Special Restrictions

### Wearable IEOs
Can **never** be granted `READ_RECORDS` access — not even with explicit user consent. Devices produce data; they do not consume it. This restriction is permanent and encoded in the `IEORegistry` contract.

### Insurer IEOs
Permanently prohibited from:
- Using BSP data for insurance underwriting
- Accessing raw BioRecords (only SVA composite score with explicit annual opt-in)
- Storing raw BSP data

---

## Creating an IEO

```python
from bsp_sdk import IEOBuilder, IEOType

ieo = IEOBuilder(
    domain       = "yourlaboratory.bsp",
    name         = "Your Laboratory Name",
    ieo_type     = IEOType.LABORATORY,
    jurisdiction = "BR",
    legal_id     = "12.345.678/0001-99",
    contact      = "tech@yourlaboratory.com",
    website      = "https://yourlaboratory.com",
).build()

result = ieo.register()

print(result.ieo_id)       # Permanent UUID on Arweave
print(result.domain)       # yourlaboratory.bsp
print(result.arweave_tx)   # On-chain transaction ID
print(result.status)       # ACTIVE (UNCERTIFIED by default)

# CRITICAL: Store securely — no recovery if lost
# result.private_key  → store in .env as BSP_IEO_PRIVATE_KEY
# result.seed_phrase  → store offline
```

---

## Public Registry & Certification Badge

Every active IEO appears in the BSP Public Registry, queryable by anyone. Certification is verifiable on-chain — the badge cannot be spoofed.

```typescript
const registry = new IEORegistry("mainnet")
const status = await registry.verify("fleury.bsp")

console.log(status.isCertified)   // true
console.log(status.certifiedSince) // 2026-03-01
console.log(status.level)          // "ADVANCED"
```

```html
<!-- Embeddable certification badge -->
<a href="https://biologicalsovereigntyprotocol.com/registry/fleury.bsp">
  <img src="https://biologicalsovereigntyprotocol.com/badges/BSP-Compliant-Advanced.svg"
       alt="BSP-Certified Advanced"
       width="200" />
</a>
```
