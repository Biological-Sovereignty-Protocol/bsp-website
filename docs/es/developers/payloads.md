# Ejemplos de Payloads JSON

Esta página detalla las estructuras de datos exactas transmitidas a través de la red BSP y almacenadas permanentemente en Arweave. Entender estos payloads es fundamental para depurar y para desarrolladores que escriben integraciones sin dependencias sin usar los SDKs oficiales.

## 1. El BEO (Objeto de Entidad Biológica)
El estado de un BEO tal como lo resuelve el contrato inteligente `BEORegistry`.

```json
{
  "beo_id": "bsp:beo:v1:9f8d...",
  "domain": "andre.bsp",
  "public_key": "ed25519_pub_...a1b2",
  "created_at": "2026-01-10T14:32:00Z",
  "record_count": 47,
  "recovery": {
    "status": "ACTIVE",
    "threshold": 2,
    "guardians": [
      "ed25519_pub_...xyz",
      "ed25519_pub_...abc",
      "ed25519_pub_...123"
    ]
  },
  "status": "ACTIVE"
}
```

## 2. Un BioRecord Estandarizado
Cómo se estructura un resultado médico individual antes de ser cifrado y almacenado.

```json
{
  "record_id": "rec_001_abc123",
  "beo_id": "bsp:beo:v1:9f8d...",
  "biomarker": "BSP-LA-004",
  "value": 4.8,
  "unit": "%",
  "method": "HPLC",
  "collected_at": "2026-02-25T08:15:00Z",
  "source": {
    "ieo_id": "bsp:ieo:fleury:v1:...",
    "domain": "fleury.bsp",
    "signature": "ed25519_sig_...4455"
  },
  "context": {
    "fasting_hours": 12,
    "medication_active": []
  },
  "status": "ACTIVE"
}
```

## 3. Un BioRecord de Wearable
Cómo se resumen los datos continuos de un dispositivo (ej., HRV de un Oura Ring).

```json
{
  "record_id": "rec_wrb_xyz789",
  "beo_id": "bsp:beo:v1:9f8d...",
  "biomarker": "BSP-DV-002",
  "value": 64.2,
  "unit": "ms",
  "method": "PPG_RMSSD",
  "collected_at": "2026-02-26T00:00:00Z",
  "source": {
    "ieo_id": "bsp:ieo:oura:v1:...",
    "domain": "oura.bsp",
    "signature": "ed25519_sig_...9988"
  },
  "context": {
    "aggregation_type": "DAILY_AVERAGE",
    "device_model": "Oura Gen3"
  },
  "status": "ACTIVE"
}
```

## 4. El ConsentToken
El objeto de autorización on-chain generado por el contrato `AccessControl`.

```json
{
  "token_id": "tok_556677...",
  "beo_id": "bsp:beo:v1:9f8d...",
  "ieo_id": "bsp:ieo:dr-carlos:v1...",
  "granted_at": "2026-02-26T10:00:00Z",
  "expires_at": "2026-03-28T10:00:00Z",
  "revoked_at": null,
  "scope": {
    "intents": ["READ_RECORDS"],
    "categories": ["BSP-LA", "BSP-CV"],
    "levels": ["CORE", "STANDARD"],
    "period": {
      "from": "2024-01-01T00:00:00Z",
      "to": null
    },
    "max_records": 500
  },
  "revocable": true,
  "owner_signature": "ed25519_sig_...1122",
  "token_hash": "sha256_...aabb"
}
```

## 5. Solicitud de Red del Protocolo de Intercambio
El payload JSON HTTP enviado por la red durante una llamada `SUBMIT_RECORD`. Nota la doble autenticación: el `consent_token` prueba que el usuario lo permitió, y la `ieo_signature` prueba que el IEO lo envió realmente.

```json
{
  "request_api_version": "0.2",
  "intent": "SUBMIT_RECORD",
  "target_beo": "andre.bsp",
  "auth": {
    "consent_token": "tok_556677...",
    "ieo_domain": "fleury.bsp",
    "ieo_signature": "ed25519_sig_...ddeeff"
  },
  "payload": {
    "encrypted_records": [
      "BASE64_ENCRYPTED_BLOB_1",
      "BASE64_ENCRYPTED_BLOB_2"
    ]
  }
}
```
