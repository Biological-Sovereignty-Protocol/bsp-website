---
title: BioRecord — Objeto de Medición Biológica
---

# BioRecord — Objeto de Medición Biológica

> Versión 0.2 | Ambrósio Institute

---

## Visión General

Cada medición biológica en el ecosistema BSP se representa como un **BioRecord**.

Los BioRecords son las unidades atómicas de datos biológicos. Cada resultado de análisis de sangre, lectura de wearable, marcador genómico o evaluación clínica que entra al ecosistema BSP se estructura como un BioRecord.

---

## Schema del BioRecord

```typescript
BioRecord {
  // ─── IDENTIDAD ──────────────────────────────────────────────────
  record_id:    string      // Identificador único de este registro (UUID v4)
  beo_id:       string      // La entidad biológica a la que pertenece este registro
  version:      semver      // Versión BSP de este registro

  // ─── TIEMPO ────────────────────────────────────────────────────
  timestamp:    ISO8601     // Cuándo se tomó esta medición (no cuando se envió)
  submitted_at: ISO8601     // Cuándo se escribió este registro en Arweave

  // ─── FUENTE ────────────────────────────────────────────────────
  source:       SourceMeta  // Quién produjo esta medición

  // ─── TAXONOMÍA ──────────────────────────────────────────────────
  category:     string      // Código de categoría de taxonomía BSP (ej. "BSP-LA")
  biomarker:    string      // Código de biomarcador BSP estandarizado (ej. "BSP-LA-004")
  level:        BioLevel    // CORE | STANDARD | EXTENDED | DEVICE

  // ─── MEDICIÓN ───────────────────────────────────────────────────
  value:        number | string  // El valor medido
  unit:         string           // Unidad estandarizada (SI o definida por BSP)
  ref_range:    RangeObject      // Rangos de referencia óptimos y funcionales

  // ─── CALIDAD ───────────────────────────────────────────────────
  confidence:   float       // Confianza de medición de 0.0 a 1.0
  status:       RecordStatus // ACTIVE | SUPERSEDED | PENDING

  // ─── CORRECCIONES ───────────────────────────────────────────────
  supersedes:   string | null  // record_id del registro corregido, si aplica

  // ─── CRIPTOGRAFÍA ──────────────────────────────────────────────
  signature:    string      // Firma criptográfica de la entidad que lo envió
}

SourceMeta {
  ieo_id:      string      // Identificador IEO de la institución que lo envió
  ieo_domain:  string      // ej. "fleury.bsp"
  method:      string      // Método de medición (ej. "HPLC", "immunoassay")
  equipment:   string      // Identificador del equipo (opcional)
  operator:    string      // Referencia del operador de laboratorio (opcional, anonimizado)
}

RangeObject {
  optimal_low:    number   // Límite inferior del rango óptimo
  optimal_high:   number   // Límite superior del rango óptimo
  functional_low: number   // Límite inferior del rango funcional (sin riesgo inmediato)
  functional_high: number  // Límite superior del rango funcional
  critical_low:   number   // Por debajo de esto = atención clínica inmediata
  critical_high:  number   // Por encima de esto = atención clínica inmediata
  unit:           string   // Igual que la unidad del registro padre
  population:     string   // Población de referencia para este rango
}
```

---

## Valores de BioLevel

| Nivel | Código | Descripción |
|---|---|---|
| Core | `CORE` | Biomarcadores avanzados de longevidad y envejecimiento biológico (L1) |
| Standard | `STANDARD` | Biomarcadores de laboratorio rutinarios realizados en todo el mundo (L2) |
| Extended | `EXTENDED` | Biomarcadores clínicos y de investigación especializados (L3) |
| Device | `DEVICE` | Datos biométricos continuos de dispositivos wearables (L4) |

---

## Valores de RecordStatus

| Estado | Descripción |
|---|---|
| `ACTIVE` | Este es el registro válido actual |
| `SUPERSEDED` | Este registro ha sido corregido por un registro más reciente |
| `PENDING` | Enviado pero esperando confirmación (ej. sincronización de dispositivo) |

---

## Inmutabilidad y Correcciones

Los BioRecords son **inmutables una vez escritos**. No pueden alterarse ni eliminarse después de su envío a Arweave.

Cuando es necesaria una corrección (ej. un error de transcripción del laboratorio), el valor corregido se envía como un **nuevo BioRecord** que supercede al original:

```typescript
// Registro corregido
{
  record_id:    "new-uuid-...",
  beo_id:       "550e8400-...",
  status:       "ACTIVE",
  supersedes:   "original-uuid-...",   // Referencia al registro incorrecto
  biomarker:    "BSP-GL-001",
  value:        94,
  // ...
}

// Registro original (actualizado automáticamente on-chain)
{
  record_id:    "original-uuid-...",
  status:       "SUPERSEDED",          // Estado actualizado a SUPERSEDED
  // ... datos originales preservados
}
```

La pista de auditoría completa — incluido el valor incorrecto original — se preserva permanentemente en Arweave.

---

## Enviar un BioRecord

Cualquier sistema puede enviar un BioRecord a un BEO — sujeto al consentimiento del titular a través de AccessControl.

```typescript
// SDK TypeScript
import { BioRecordBuilder, ExchangeClient } from '@bsp/sdk'

const record = new BioRecordBuilder()
  .beoId('550e8400-e29b-41d4-a716-446655440000')
  .biomarker('BSP-GL-001')           // Glucosa en ayunas
  .value(94)
  .unit('mg/dL')
  .timestamp('2026-02-24T08:30:00Z')
  .refRange({
    optimal_low: 70,
    optimal_high: 90,
    functional_low: 60,
    functional_high: 100,
    critical_low: 40,
    critical_high: 180,
    unit: 'mg/dL',
    population: 'adult-general'
  })
  .confidence(0.99)
  .build()

const client = new ExchangeClient({ ieoId: 'my-lab.bsp' })
const result = await client.submit(record)
```

```python
# SDK Python
from bsp_sdk import BioRecordBuilder, ExchangeClient

record = (BioRecordBuilder()
    .beo_id("550e8400-e29b-41d4-a716-446655440000")
    .biomarker("BSP-GL-001")
    .value(94)
    .unit("mg/dL")
    .timestamp("2026-02-24T08:30:00Z")
    .confidence(0.99)
    .build())

client = ExchangeClient(ieo_id="my-lab.bsp")
result = client.submit(record)
```

---

## Códigos de Biomarcadores

Cada biomarcador en la taxonomía BSP tiene un código estandarizado con el formato:

```
BSP-[CATEGORÍA]-[NÚMERO]
```

Ejemplos:
- `BSP-LA-004` — NAD+ (categoría Longevidad y Envejecimiento, marcador #004)
- `BSP-GL-001` — Glucosa en Ayunas (categoría Glucemia y Metabolismo, marcador #001)
- `BSP-DV-001` — Variabilidad de Frecuencia Cardíaca (categoría Dispositivo, marcador #001)

→ Ver [Taxonomía de Biomarcadores](taxonomy/level-1-core) para la referencia completa de biomarcadores.

---

## Ejemplo de BioRecord (JSON)

```json
{
  "record_id": "7b3f9a12-4c8e-4d21-b6f0-1a9e8c7d5b2a",
  "beo_id": "550e8400-e29b-41d4-a716-446655440000",
  "version": "0.2.0",
  "timestamp": "2026-02-24T08:30:00Z",
  "submitted_at": "2026-02-24T09:15:00Z",
  "source": {
    "ieo_id": "9f1a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
    "ieo_domain": "fleury.bsp",
    "method": "colorimetric-enzymatic",
    "equipment": "Roche Cobas 8000"
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
  "signature": "ed25519:9xK2Lm..."
}
```

→ Ejemplo completo: [`../examples/biorecord-example.json`](../examples/biorecord-example.json)

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
