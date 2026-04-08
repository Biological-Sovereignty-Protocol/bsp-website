---
title: BSP Integrations — Connect Your App to the Protocol
description: Integrate the Biological Sovereignty Protocol into your health app, EHR, wearable, or research platform. Official SDKs, API guides, and partner tools.
sidebar: false
---

# Integrations

Connect your application to BSP. Whether you're building a health app, integrating an EHR system, or creating a longevity AI platform, BSP provides the tools you need.

## Official SDKs

### TypeScript / JavaScript

```bash
npm install bsp-sdk
```

Full reference: [SDK Reference](/developers/sdk-reference)

### Python

```bash
pip install bsp-sdk
```

### REST API

BSP provides a REST API for systems that cannot use an SDK directly.

```
POST /v1/beo/create
GET  /v1/beo/{id}/biorecords
POST /v1/biorecord/upload
POST /v1/consent/grant
DELETE /v1/consent/{token_id}
```

---

## Integration Patterns

### Pattern 1 — EHR Export

Export patient data from your EHR system to a BSP BioRecord. The patient receives cryptographic ownership.

```typescript
import { BSPClient } from 'bsp-sdk'

const client = new BSPClient({ network: 'mainnet' })

const bioRecord = await client.bioRecord.create({
  beoId: patient.bspId,
  data: fhirBundle,
  sourceType: 'ehr-export',
})

await client.bioRecord.store(bioRecord) // stores on Arweave
```

### Pattern 2 — Wearable Data

Stream continuous biomarker data from wearables and IoT devices into a patient's BEO.

```typescript
const stream = client.bioRecord.stream({
  beoId: user.bspId,
  interval: '1m',
})

wearable.on('data', (reading) => {
  stream.push({
    biomarkerId: 'heart_rate',
    value: reading.hr,
    unit: 'bpm',
    timestamp: Date.now(),
  })
})
```

### Pattern 3 — Research Access Request

Request consent to access anonymized biological data for a research study.

```typescript
const request = await client.consent.request({
  ieoId: 'research_institution.bsp',
  dataFields: ['blood_glucose', 'hba1c'],
  duration: '90d',
  purpose: 'Type 2 Diabetes prevention study',
})

// Patient approves via their BSP wallet — no action needed from your side
```

---

## Ecosystem Integrations

| Platform | Status | Notes |
|---|---|---|
| Apple Health | Planned | BioRecord export adapter |
| Google Fit | Planned | BioRecord export adapter |
| Epic (FHIR R4) | In Progress | FHIR-to-BEO bridge |
| Oura Ring | Community | GitHub: bsp-oura-adapter |
| Garmin | Community | GitHub: bsp-garmin-adapter |
| Withings | Community | GitHub: bsp-withings-adapter |

---

## Certification

Applications that integrate BSP can apply for **BSP Certified** status, which verifies:

- Correct implementation of the consent model
- Proper data format compliance
- Security audit

[Certification Process](/developers/certification)

---

## Getting Help

- [Quickstart Guide](/getting-started/quickstart)
- [SDK Reference](/developers/sdk-reference)
- [JSON Examples](/developers/examples)
- [GitHub Discussions](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/discussions)

---

*See also: [Implementation Guide](/developers/implementation-guide) · [Tutorials](/developers/tutorials)*
