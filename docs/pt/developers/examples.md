---
title: Exemplos JSON Canônicos
---

# Exemplos JSON Canônicos

Estes são os payloads de exemplo canônicos para os três objetos BSP principais. Use-os como referência ao construir integrações.

---

## BEO — Objeto de Entidade Biológica

Um BEO completo com três guardiões (2 ativos, 1 pendente) e uma entrada no log de consentimento.

```json
{
  "_comment": "Example BEO — Biological Entity Object (BSP v0.2)",
  "beo_id": "550e8400-e29b-41d4-a716-446655440000",
  "domain": "andre.bsp",
  "created_at": "2026-02-24T14:32:00Z",
  "version": "0.2.0",
  "public_key": "ed25519:4K8Yg2MnPxQ7rZv3wB9sT1uJ5hDcLfN6eA0oE2iK",
  "key_version": 1,
  "arweave_tx": "7xK9mQ3vN8pL2rT5wY1uA4sE6jH0fB",
  "active_recovery": null,
  "locked_at": null,
  "sovereignty": {
    "guardians": [
      {
        "contact": "encrypted:3a7b9c4d2e1f8a5b6c7d8e9f0a1b2c3d",
        "public_key": "ed25519:7xM2PqRsT9nL3kW6vY4uC8bA1eH5jF0",
        "role": "primary",
        "status": "ACTIVE",
        "accepted_at": "2026-02-24T14:35:00Z"
      },
      {
        "contact": "encrypted:1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e",
        "public_key": "ed25519:9pL4mN7qK2vR8tY5uA3sE1bH6jC0fW",
        "role": "secondary",
        "status": "ACTIVE",
        "accepted_at": "2026-02-24T14:38:00Z"
      },
      {
        "contact": "encrypted:9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a",
        "public_key": "ed25519:2sT7nM9qL5kR3vW8uY6bA4eH1jC0pF",
        "role": "tertiary",
        "status": "PENDING",
        "accepted_at": null
      }
    ],
    "recovery_scheme": "2-of-3",
    "seed_phrase_hash": "sha256:4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f",
    "consent_log": [
      {
        "token_id": "tok_fleury_202602",
        "ieo_domain": "fleury.bsp",
        "intents": ["SUBMIT_RECORD"],
        "categories": ["BSP-GL", "BSP-HM", "BSP-HR", "BSP-LV"],
        "granted_at": "2026-02-24T15:00:00Z",
        "expires_at": "2027-02-24T15:00:00Z",
        "revoked": false
      }
    ]
  }
}
```

---

## BioRecord — Objeto de Medição Biológica

Três exemplos de BioRecords: glicose em jejum (Standard), comprimento de telômeros (Core) e HRV de um wearable (Device).

```json
[
  {
    "_comment": "Example BioRecord — Fasting Glucose (BSP v0.2)",
    "record_id": "7b3f9a12-4c8e-4d21-b6f0-1a9e8c7d5b2a",
    "beo_id": "550e8400-e29b-41d4-a716-446655440000",
    "version": "0.2.0",
    "timestamp": "2026-02-24T08:30:00Z",
    "submitted_at": "2026-02-24T09:15:00Z",
    "arweave_tx": "8yL0nR4vM9pK3sT6wU2bA5eE7jH1fC",
    "source": {
      "ieo_id": "9f1a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
      "ieo_domain": "fleury.bsp",
      "method": "colorimetric-enzymatic",
      "equipment": "Roche Cobas 8000",
      "operator": "op-anonymized-447"
    },
    "category": "BSP-GL",
    "biomarker": "BSP-GL-001",
    "level": "STANDARD",
    "value": 94,
    "unit": "mg/dL",
    "ref_range": {
      "optimal_low": 70,
      "optimal_high": 90,
      "functional_low": 60,
      "functional_high": 100,
      "critical_low": 40,
      "critical_high": 180,
      "unit": "mg/dL",
      "population": "adult-general"
    },
    "confidence": 0.99,
    "status": "ACTIVE",
    "supersedes": null,
    "signature": "ed25519:9xK2LmPqRsT7nL3kW6vY4uC8bA1eH5jF0mN7qK"
  },
  {
    "_comment": "Example BioRecord — Telomere Length (BSP v0.2)",
    "record_id": "2c9e8b34-5d7f-4a12-c8e1-2b4f6a8d0c3e",
    "beo_id": "550e8400-e29b-41d4-a716-446655440000",
    "version": "0.2.0",
    "timestamp": "2026-02-24T08:30:00Z",
    "submitted_at": "2026-02-24T09:20:00Z",
    "arweave_tx": "3zM1oS5vN0qL4tU7wV3cB6fF8kI2gD",
    "source": {
      "ieo_id": "9f1a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
      "ieo_domain": "fleury.bsp",
      "method": "qPCR-telomere-length",
      "equipment": "QuantStudio 7",
      "operator": "op-anonymized-312"
    },
    "category": "BSP-LA",
    "biomarker": "BSP-LA-003",
    "level": "CORE",
    "value": 7.4,
    "unit": "kb",
    "ref_range": {
      "optimal_low": 7.5,
      "optimal_high": 10.0,
      "functional_low": 6.0,
      "functional_high": 12.0,
      "critical_low": 4.0,
      "critical_high": null,
      "unit": "kb",
      "population": "adult-40-50"
    },
    "confidence": 0.92,
    "status": "ACTIVE",
    "supersedes": null,
    "signature": "ed25519:1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT"
  },
  {
    "_comment": "Example BioRecord — HRV from Oura Ring (BSP v0.2, Device Level)",
    "record_id": "4d8c7e56-6f9a-4b23-d9f2-3c5e7b9d1e4f",
    "beo_id": "550e8400-e29b-41d4-a716-446655440000",
    "version": "0.2.0",
    "timestamp": "2026-02-24T00:00:00Z",
    "submitted_at": "2026-02-24T07:00:00Z",
    "arweave_tx": "5aP2pT6wO1mK4sU8vW0dC7gG9lJ3hE",
    "source": {
      "ieo_id": "a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6",
      "ieo_domain": "ouraring.bsp",
      "method": "photoplethysmography-overnight",
      "equipment": "Oura Ring Gen4",
      "firmware": "2.8.1"
    },
    "category": "BSP-DV",
    "biomarker": "BSP-DV-001",
    "level": "DEVICE",
    "value": {
      "mean": 47.3,
      "sd": 12.1,
      "samples": 1440,
      "consolidation": "overnight-5min-segments"
    },
    "unit": "ms",
    "ref_range": {
      "optimal_low": 50,
      "optimal_high": 100,
      "functional_low": 30,
      "functional_high": null,
      "critical_low": 15,
      "critical_high": null,
      "unit": "ms",
      "population": "adult-general"
    },
    "confidence": 0.95,
    "status": "ACTIVE",
    "supersedes": null,
    "signature": "ed25519:2bC3dE4fG5hI6jK7lM8nO9pQ0rS1tU"
  }
]
```

---

## ConsentToken

Um médico recebendo acesso de leitura por 90 dias para dados cardiovasculares e de longevidade.

```json
{
  "_comment": "Example ConsentToken — BSP v1.0. Issued by the BEO holder authorizing a physician to read cardiovascular and longevity lab data for 90 days.",
  "token_id": "tok_9a3f8c20-b1d4-4e7a-9c2f-5e8b1d3a7f0e",
  "beo_id": "550e8400-e29b-41d4-a716-446655440000",
  "beo_domain": "andre.bsp",
  "ieo_id": "c2d4e6f8-a0b2-4c6e-8f0a-2b4d6e8f0a2b",
  "ieo_domain": "dr-carlos.bsp",
  "ieo_name": "Dr. Carlos Mendes — Medicina Funcional",
  "granted_at": "2026-02-26T10:00:00Z",
  "expires_at": "2026-05-27T10:00:00Z",
  "revoked": false,
  "revoked_at": null,
  "scope": {
    "intents": ["READ_RECORDS"],
    "categories": ["BSP-LA", "BSP-CV", "BSP-IM"],
    "levels": ["CORE", "STANDARD"],
    "period": {
      "from": "2024-01-01T00:00:00Z",
      "to": null
    },
    "max_records": 500
  },
  "revocable": true,
  "owner_signature": "ed25519:5kL9mN1pQ3rS7tU2vW6xY0zA4bC8dE",
  "token_hash": "sha256:a7f3b2c8d4e9f0a1b6c2d7e3f8a0b5c1",
  "arweave_tx": "6bQ3rT7vO2mL5sU9wV4cD8hH0kJ4iF",
  "version": "1.0.0"
}
```

---

*Arquivos fonte: [bsp-spec/examples](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/tree/main/examples)*
