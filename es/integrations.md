---
title: Integraciones BSP — Conecta Tu App al Protocolo
description: Integra el Biological Sovereignty Protocol en tu app de salud, historia clínica electrónica, wearable o plataforma de investigación. SDKs oficiales, guías de API y herramientas de socios.
sidebar: false
---

# Integraciones

Conecta tu aplicación al BSP. Ya sea que estés construyendo una app de salud, integrando un sistema de historia clínica electrónica o creando una plataforma de IA para longevidad, BSP proporciona las herramientas que necesitas.

## SDKs Oficiales

### TypeScript / JavaScript

```bash
npm install bsp-sdk
```

Referencia completa: [Referencia del SDK](/es/developers/sdk-reference)

### Python

```bash
pip install bsp-sdk
```

### REST API

BSP proporciona una REST API para sistemas que no pueden usar un SDK directamente.

```
POST /api/relayer/beo
GET  /api/exchange/records
POST /api/exchange/records
POST /api/relayer/consent
DELETE /api/consent/:tokenId
```

---

## Patrones de Integración

### Patrón 1 — Exportación de Historia Clínica Electrónica

Exporta datos del paciente desde tu sistema de historia clínica electrónica a un BioRecord BSP. El paciente recibe propiedad criptográfica de los datos.

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

### Patrón 2 — Datos de Wearables

Transmite datos continuos de biomarcadores desde wearables y dispositivos IoT al BEO del paciente.

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

### Patrón 3 — Solicitud de Acceso para Investigación

Solicita consentimiento para acceder a datos biológicos anonimizados para un estudio de investigación.

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

## Integraciones del Ecosistema

| Plataforma | Estado | Notas |
|---|---|---|
| Apple Health | Planificado | Adaptador de exportación BioRecord |
| Google Fit | Planificado | Adaptador de exportación BioRecord |
| Epic (FHIR R4) | En progreso | Bridge FHIR-a-BEO |
| Oura Ring | Comunidad | GitHub: bsp-oura-adapter |
| Garmin | Comunidad | GitHub: bsp-garmin-adapter |
| Withings | Comunidad | GitHub: bsp-withings-adapter |

---

## Certificación

Las aplicaciones que integran BSP pueden solicitar el estado **BSP Certified**, que verifica:

- Implementación correcta del modelo de consentimiento
- Cumplimiento adecuado del formato de datos
- Auditoría de seguridad

[Proceso de Certificación](/es/developers/certification)

---

## Obtener Ayuda

- [Guía de Inicio Rápido](/es/getting-started/quickstart)
- [Referencia del SDK](/es/developers/sdk-reference)
- [Ejemplos JSON](/es/developers/examples)
- [GitHub Discussions](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/discussions)

---

*Ver también: [Guía de Implementación](/es/developers/implementation-guide) · [Tutoriales](/es/developers/tutorials)*
