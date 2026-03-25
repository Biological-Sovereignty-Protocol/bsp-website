<div class="page-hero-image">
  <img src="/images/exchange-protocol.png" alt="Exchange Protocol" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Exchange Protocol

> "BSP defines the format of the conversation. What each system does with it is their responsibility."

## Overview

The Exchange Protocol defines how biological data moves between systems — the format of requests and responses, the full set of typed operations (intents), error handling, and the double authentication model.

**The Exchange Protocol defines:**
- Schema of `BSPRequest` and `BSPResponse`
- Types of `BSPIntent` and their parameters
- Authentication via `ConsentToken` + IEO signature
- All error codes

**The Exchange Protocol does NOT define:**
- What systems do with received data
- Analysis or scoring algorithms (e.g., AVA, SVA)
- Transport infrastructure (HTTP, WebSocket, etc.)

---

## Request / Response Model

Every interaction is a `BSPRequest` → `BSPResponse` cycle.

### BSPRequest Schema

```typescript
interface BSPRequest {
  request_id:  string      // UUID v4 — unique per request (idempotency)
  bsp_version: string      // Protocol version (semver) — e.g., "1.0.0"
  timestamp:   string      // ISO8601

  requester: {
    ieo_id:    string      // Institution's UUID
    ieo_domain:string      // e.g., "fleury.bsp"
    signature: string      // Ed25519 signature of (request_id + timestamp + beo_id)
  }

  intent:      BSPIntent   // SUBMIT_RECORD | READ_RECORDS | ANALYZE_VITALITY | ...

  target: {
    beo_id:    string      // Target BEO UUID
    beo_domain:string      // e.g., "andre.bsp"
  }

  auth: {
    consent_token_id: string
  }

  payload:     object      // Intent-specific (see below)
}
```

### BSPResponse Schema

```typescript
interface BSPResponse {
  request_id:  string                    // Echo of original request_id
  status:      "SUCCESS" | "ERROR" | "PARTIAL" | "PENDING"
  timestamp:   string

  payload:     object | null             // Intent-specific response

  error: {
    code:      string                    // Machine-readable error code
    message:   string                    // Human-readable description
    field:     string | null             // Specific field (validation errors)
    retryable: boolean
  } | null
}
```

---

## Double Authentication

Every BSPRequest is authenticated **twice**:

1. **ConsentToken** — Proof from the blockchain that the BEO holder authorized this IEO for this intent and category
2. **IEO Signature** — The institution's cryptographic signature on the request — proves the actual institution sent it, not an impostor

```
AccessControl.verify(consent_token_id, ieo_id, beo_id, intent, category)
  → VALID: proceed  |  → INVALID: reject with specific error code

IEO Signature.verify(request_id + timestamp + beo_id, ieo_public_key)
  → VALID: proceed  |  → INVALID: reject with IEO_SIGNATURE_INVALID
```

---

## Intent Reference

### `SUBMIT_RECORD` — Write a BioRecord

```javascript
// Request payload
{
  records: [{
    biomarker:    "BSP-HM-001",
    value:        13.8,
    unit:         "g/dL",
    collected_at: "2026-02-26T08:00:00Z",
    ref_range: {
      optimal:    "13.5-17.5",
      functional: "12.0-17.5",
      deficiency: "<12.0",
      toxicity:   null
    }
  }]
}

// Response: record_ids (Arweave TX IDs), submitted to Arweave permanently
```

Batch submissions are supported — multiple BioRecords in one request lower Arweave transaction costs.

### `READ_RECORDS` — Read BioRecords

```javascript
// Request payload
{
  filters: {
    categories: ["BSP-LA", "BSP-HM"],
    period: { from: "2025-01-01", to: null },
    limit:  100,
    offset: 0
  }
}

// Response: paginated records with source IEO, status, reference ranges
```

### `ANALYZE_VITALITY` — Request AVA Analysis
Available only to PLATFORM IEOs integrated with AVA. Returns the full multi-dimensional SVA score (biological age by system, aging velocity, reserve percentile).

### `REQUEST_SCORE` — Request SVA Score
Returns only the SVA composite score. Used mainly by opt-in insurers. Does not trigger a full AVA analysis.

### `EXPORT_DATA` — Export All Data

> [!IMPORTANT]
> `EXPORT_DATA` **cannot be blocked, restricted, or denied** by any BSP-compliant system. Any system that refuses this violates the BSP specification.

Returns all BioRecords in BSP format, fully decrypted, in the user's choice of `JSON`, `CSV`, or `FHIR_R4`.

### `SYNC_PROTOCOL` — Version Negotiation
Used to negotiate BSP version compatibility between client and server at session start.

---

## Complete Error Code Reference

| Code | Category | Description | Retryable |
|------|----------|-------------|-----------|
| `TOKEN_NOT_FOUND` | Auth | ConsentToken ID does not exist | No |
| `TOKEN_REVOKED` | Auth | Revoked by BEO holder | No |
| `TOKEN_EXPIRED` | Auth | `expires_at` has passed | No |
| `INTENT_NOT_AUTHORIZED` | Auth | Intent not in token scope | No |
| `CATEGORY_NOT_AUTHORIZED` | Auth | Category not in token scope | No |
| `IEO_SIGNATURE_INVALID` | Auth | IEO signature verification failed | No |
| `IEO_NOT_FOUND` | Auth | IEO domain not in registry | No |
| `BEO_LOCKED` | State | BEO is in LOCKED state | No |
| `SCHEMA_VALIDATION_FAILED` | Data | BioRecord failed schema validation | Fix data |
| `BIOMARKER_CODE_INVALID` | Data | BSP code does not exist in taxonomy | Fix code |
| `UNIT_INVALID` | Data | Unit not valid for this biomarker | Fix unit |
| `DUPLICATE_RECORD` | Data | Identical record already exists | No |
| `ARWEAVE_WRITE_FAILED` | Infra | Temporary Arweave write failure | **Yes** |
| `RATE_LIMIT_EXCEEDED` | Infra | Too many requests per minute | **Yes** |
| `BSP_VERSION_MISMATCH` | Protocol | Client version incompatible | Update SDK |

---

## SDK Example

```python
from bsp_sdk import BSPClient

client = BSPClient(
    ieo_domain  = "yourlaboratory.bsp",
    private_key = YOUR_PRIVATE_KEY,
)

# Submit BioRecord
result = client.submit_biorecord(
    beo_domain    = "patient.bsp",
    consent_token = token_id,
    biomarker     = "BSP-HM-001",
    value         = 13.8,
    unit          = "g/dL",
    collected_at  = "2026-02-26T08:00:00Z",
    ref_range     = { "optimal": "13.5-17.5", "functional": "12.0-17.5" }
)
print(result.submission.record_ids)  # Permanent IDs on Arweave

# Read Records
records = client.read_records(
    beo_domain    = "patient.bsp",
    consent_token = token_id,
    filters       = {
        "categories": ["BSP-HM"],
        "period": { "from": "2025-01-01" }
    }
)
```
