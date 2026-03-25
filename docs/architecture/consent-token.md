<div class="page-hero-image">
  <img src="/images/consent-flow.png" alt="Consent Flow" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# ConsentToken & Access Control

> "Consent is not a privacy policy. It is a mathematical instruction recorded on the blockchain."

## Overview

The BSP consent system makes biological sovereignty a technical reality. The **ConsentToken** is a cryptographic authorization issued by the `AccessControl` smart contract on Arweave once the holder signs it with their private key.

**No institution can read or write any data in a BEO without a valid ConsentToken.** The blockchain enforces it — no server can bypass it.

---

## How Consent Works

```
User (BEO Holder)
     │  signs authorization with private key
     ▼
AccessControl Smart Contract (Arweave)
     │  mints ConsentToken on-chain
     ▼
Institution (IEO)
     │  presents token with every request
     ▼
AccessControl verifies → grants or rejects
```

---

## ConsentToken Schema

```typescript
interface ConsentToken {
  token_id:    string      // Unique identifier for this consent grant
  beo_id:      string      // The BEO granting consent
  ieo_id:      string      // The IEO receiving permission
  granted_at:  string      // ISO8601
  expires_at:  string | null  // null = permanent until revoked

  scope: {
    intents:    BSPIntent[]   // What actions are permitted
    categories: string[]      // Which BSP categories are accessible (e.g., ["BSP-LA", "BSP-HM"])
    levels:     BioLevel[]    // Which taxonomy levels
    period: {
      from: string | null
      to:   string | null
    } | null
    max_records: number | null
  }

  revocable:    boolean     // Always true
  revoked:      boolean
  revoked_at:   string | null
  owner_signature: string   // Ed25519 signature by the BEO holder
  token_hash:   string      // On-chain verification hash
}
```

---

## Intent Types

| Intent | Description | Typical Duration |
|--------|-------------|-----------------|
| `SUBMIT_RECORD` | Write a BioRecord to the BEO | Single-use or permanent |
| `READ_RECORDS` | Read BioRecords from the BEO | 30–90 days (physicians); permanent (platforms) |
| `ANALYZE_VITALITY` | Request AVA vitality analysis | Permanent (refreshable) |
| `REQUEST_SCORE` | Request SVA score | Annual (insurers with opt-in) |
| `EXPORT_DATA` | Export all data — always available to BEO holder | — |
| `SYNC_PROTOCOL` | Protocol version negotiation | Per session |

---

## Standard Token Types by Relationship

| Relationship | Duration | Scope |
|-------------|----------|-------|
| User → Laboratory (submission) | Single use | `SUBMIT_RECORD` — specific categories only |
| User → Physician (review) | 30–90 days | `READ_RECORDS` — selected categories |
| User → Hospital (treatment) | Duration of treatment | `READ_RECORDS` — all relevant categories |
| User → AVA Platform | Permanent (refreshable) | `ANALYZE_VITALITY` + `REQUEST_SCORE` |
| User → Insurer (opt-in) | Annual — must be renewed | `REQUEST_SCORE` — SVA composite only |

---

## Verifying a Token (Institution SDK)

```python
from bsp_sdk import BSPClient

client = BSPClient(
    ieo_domain  = "yourlaboratory.bsp",
    private_key = YOUR_PRIVATE_KEY,
)

verification = client.verify_consent(
    token_id   = "token-uuid-presented-by-user",
    beo_domain = "patient.bsp",
    intent     = "SUBMIT_RECORD",
    category   = "BSP-HM",
)

if not verification.valid:
    print(verification.reason)
    # TOKEN_NOT_FOUND | TOKEN_REVOKED | TOKEN_EXPIRED
    # INTENT_NOT_AUTHORIZED | CATEGORY_NOT_AUTHORIZED
```

---

## Revocation

Revocation is **instant and on-chain**. The moment a user revokes a token, the `AccessControl` contract marks it as revoked. All subsequent requests from the institution are immediately rejected.

```python
# From the user's app (BEO holder)
result = client.revoke_consent(token_id="token-uuid")
print(result.status)  # REVOKED — immediate effect

# Or revoke everything from one institution at once
client.revoke_all_from_ieo(ieo_domain="fleury.bsp")

# Nuclear option — revoke all active tokens
client.revoke_all_tokens()
```

> **Institutions are not notified automatically.** They discover the revocation when their next request is rejected with `TOKEN_REVOKED`.

---

## AccessControl Contract Functions

| Function | Authorized Caller | Description |
|----------|------------------|-------------|
| `grantConsent()` | BEO holder only | Issues a new ConsentToken |
| `revokeToken()` | BEO holder only | Immediately revokes a token |
| `verifyToken()` | Any IEO | Checks if a token is valid for a given intent + category |
| `listTokens()` | BEO holder only | Full audit log of all tokens ever issued |

> [!IMPORTANT]
> Only the BEO holder can grant or revoke consent. No institution, no other system, and not even the Ambrósio Institute can grant access to a user's data on their behalf.

---

## Error Codes

| Code | Description | Retryable |
|------|-------------|-----------|
| `TOKEN_NOT_FOUND` | Token ID does not exist on-chain | No — user must reissue |
| `TOKEN_REVOKED` | Revoked by the holder | No — never retry |
| `TOKEN_EXPIRED` | `expires_at` has passed | No — user must renew |
| `INTENT_NOT_AUTHORIZED` | Requested intent not in token scope | No |
| `CATEGORY_NOT_AUTHORIZED` | Category not in token scope | No |
| `BEO_LOCKED` | BEO is in LOCKED state | No — holder must unlock |
