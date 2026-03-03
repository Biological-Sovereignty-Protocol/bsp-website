# Biological Entity Object (BEO)

> "The sovereign biological identity of a human being. The anchor point for all measured life."

## What is a BEO?
The BEO is the foundation of the entire BSP ecosystem. It represents a living human being — the sovereign owner of their biological data. All of a person's BioRecords are anchored to it. All ConsentTokens that authorize access are issued from it.

A BEO is **created by the individual directly on Arweave, without approval from any authority.** Once created, it belongs to the holder forever.

### BEO vs IEO — Fundamental Distinction

| Feature | BEO | IEO |
|---------|-----|-----|
| **Represents** | A living human being | An organization, system, or professional |
| **Created by** | The individual — no approval required | Any institution — directly |
| **Transferable** | Never — permanent individual identity | Yes — on company acquisition or merger |
| **Can read BEOs** | Own data only | Never without valid consent token |
| **Can write BioRecords** | Cannot — individuals observe, not record | Yes — with active ConsentToken |
| **Domain format** | `firstname.bsp` | `institutionname.bsp` |

---

## Cryptographic Identity

BEO control is entirely determined by the possession of the private key.

| Key | Type | Usage |
|-----|------|-------|
| `private_key` | Ed25519 (64 bytes) | Generated locally, never transmitted. Signs authorizations, decrypts BioRecords, signs Arweave transactions. |
| `public_key` | Ed25519 (32 bytes) | Registered publicly on Arweave. Labs use this to identify your BEO and encrypt data before submission. |
| `seed_phrase` | 24 BIP-39 words | Mnemonic representation of the private key. Store this offline — it is your backup. |

### Key Generation

```javascript
// 100% on-device — nothing is sent to any server
const entropy  = crypto.getRandomValues(new Uint8Array(32))
const mnemonic = bip39.entropyToMnemonic(entropy)
const seed     = await bip39.mnemonicToSeed(mnemonic)
const keyPair  = ed25519.fromSeed(seed.slice(0, 32))

const privateKey = keyPair.secretKey  // stays on device forever
const publicKey  = keyPair.publicKey  // registered on Arweave
```

---

## Social Recovery

If you lose your device and seed phrase, Social Recovery lets you regain access using trusted Guardians — no central server needed.

- **Up to 3 Guardians**: trusted people or platforms you designate
- **Threshold**: 2-of-3 confirmations required (default)
- **Mechanism**: Shamir Secret Sharing — your key is split into 3 encrypted fragments stored on Arweave
- **Security**: No single guardian can act alone. The Institute is never involved.

### Recovery Flow

```
1. User opens app on new device → no private key found
2. App generates new key pair locally
3. Recovery request posted to Arweave (RECOVERY_REQUEST transaction)
4. Two guardians decrypt their fragments and post GUARDIAN_CONFIRM transactions
5. BEORegistry updates the BEO with the new public key
6. Access restored — old key permanently invalidated
```

---

## Complete BEO Schema

```json
{
  "beo_id":     "uuid-v4",
  "domain":     "andre.bsp",
  "public_key": "ed25519_pub_...a1b2",
  "created_at": "2026-01-10T14:32:00Z",
  "version":    "1.0.0",

  "recovery": {
    "enabled":   true,
    "threshold": 2,
    "guardians": [
      {
        "name":     "Maria",
        "contact":  "maria.bsp",
        "fragment": "arweave://encrypted-fragment-1",
        "accepted": true,
        "added_at": "2026-01-10T15:00:00Z"
      }
    ]
  },

  "status":      "ACTIVE",
  "locked_at":   null,
  "lock_reason": null
}
```

---

## BioRecord Schema

Every biological measurement attached to a BEO is a BioRecord:

```json
{
  "record_id":    "arweave-tx-id",
  "beo_id":       "uuid-v4",
  "ieo_id":       "uuid-v4",
  "biomarker":    "BSP-LA-004",
  "value":        4.8,
  "unit":         "%",
  "collected_at": "2026-02-26T08:00:00Z",
  "submitted_at": "2026-02-26T09:00:00Z",
  "ref_range": {
    "optimal":    "4.0-6.0",
    "functional": "3.5-6.5",
    "deficiency": "<3.5",
    "toxicity":   null
  },
  "status":     "CURRENT",
  "supersedes": null,
  "data_hash":  "sha256_..."
}
```

> **BioRecords are immutable.** Corrections are submitted as new records that `supersede` the previous — the error stays in the history.

---

## Lifecycle States

| State | Description |
|-------|-------------|
| `ACTIVE` | Normal operation. All authorized operations permitted. |
| `LOCKED` | Holder voluntarily locked — useful if compromise suspected. No institution reads or writes. |
| `RECOVERY_PENDING` | Recovery in progress. No data operations permitted during the 72-hour recovery window. |

---

## Smart Contracts — BEO Operations

### BEORegistry

| Function | Who Can Call | Description |
|----------|-------------|-------------|
| `createBEO()` | Anyone | Creates a new BEO. Open — no approval required. |
| `getBEO()` | Anyone | Returns public BEO data. |
| `updateRecovery()` | BEO holder only | Configure or update guardian setup. |
| `lockBEO()` | BEO holder only | Temporarily locks all operations. |
| `rotatePrimaryKey()` | BEO holder (recovery) | Replaces public key after successful recovery. |

### AccessControl

| Function | Who Can Call | Description |
|----------|-------------|-------------|
| `issueToken()` | BEO holder only | Issues a new ConsentToken to an IEO. |
| `revokeToken()` | BEO holder only | Immediately revokes a ConsentToken. |
| `verifyToken()` | Any IEO | Checks if a token is valid for a specific operation. |
| `getTokenHistory()` | BEO holder only | Full audit log of all tokens ever issued. |

> [!IMPORTANT]
> `issueToken()` and `revokeToken()` are exclusively reserved for the BEO holder. No institution — not even the Ambrósio Institute — can grant or revoke access to a person's data.

---

## Creating a BEO with the SDK

```python
from bsp_sdk import BEOBuilder, Guardian

beo = BEOBuilder(domain="andre.bsp").build()
result = beo.register()

print(result.beo_id)      # Permanent UUID on Arweave
print(result.domain)      # andre.bsp
print(result.seed_phrase) # 24 words — store this offline, never digitally

# Optional: configure Social Recovery
beo.update_recovery(
    guardians=[
        Guardian(name="Maria",  contact="maria.bsp",   role="primary"),
        Guardian(name="João",   contact="+5511999...", role="secondary"),
        Guardian(name="Carlos", contact="carlos.bsp",  role="tertiary"),
    ],
    threshold=2
)
```

## Holder Rights (Unconditional)

- ✓ Always recover your BEO using seed phrase
- ✓ Always revoke any ConsentToken, instantly
- ✓ Always export all your data (`SOVEREIGN_EXPORT` intent)
- ✓ Always lock your BEO
- ✓ Always choose or replace guardians
