---
title: BEO — Objeto de Entidad Biológica
---

# BEO — Objeto de Entidad Biológica

> Versión 0.2 | Ambrósio Institute

---

## Visión General

El **Biological Entity Object (BEO)** es la unidad central del BSP. Cada dato en el ecosistema BSP está anclado a un BEO.

El BEO es **soberano** — pertenece al individuo, no a ninguna plataforma. Se almacena en infraestructura descentralizada (Arweave) y se identifica por un nombre de dominio `.bsp` permanente.

> **La diferencia entre un BEO y un historial médico tradicional es fundamental:**
> El historial médico pertenece al hospital. El BEO te pertenece a ti.
> El hospital es solo un contribuyente — no el propietario.

---

## Schema del Objeto BEO

```typescript
BEO {
  // ─── IDENTIDAD ──────────────────────────────────────────────────
  beo_id:      string     // Identificador biológico universalmente único (UUID v4)
  domain:      string     // Dirección legible por humanos — ej. "andre.bsp"
  created_at:  ISO8601    // Cuándo se registró por primera vez esta entidad
  version:     semver     // Versión BSP de este registro

  // ─── CRIPTOGRAFÍA ──────────────────────────────────────────────
  public_key:  string     // Clave pública del propietario (RSA-4096 o Ed25519)
  key_version: number     // Se incrementa en rotación de clave (comienza en 1)

  // ─── DATOS ──────────────────────────────────────────────────────
  records:     BioRecord[]  // Todas las mediciones biológicas
  protocols:   Protocol[]   // Protocolos de salud activos

  // ─── SOBERANÍA ───────────────────────────────────────────────────
  sovereignty: SovereigntyMeta  // Metadatos de propiedad, consentimiento y recuperación

  // ─── ESTADO ────────────────────────────────────────────────────
  active_recovery: object | null  // Metadatos de solicitud de recuperación activa, o null
  locked_at:       string | null  // Timestamp ISO8601 si el BEO está bloqueado, o null
}

SovereigntyMeta {
  guardians:       Guardian[]   // Red de recuperación social (3 recomendados)
  recovery_scheme: string       // Umbral "2-of-3"
  seed_phrase_hash: string      // Verificación con hash (frase guardada offline por el usuario)
  consent_log:     ConsentEntry[] // Todas las autorizaciones de acceso — on-chain
}

Guardian {
  contact:     string              // Cómo contactar a este guardián (cifrado)
  public_key:  string             // Clave pública del guardián para el protocolo de recuperación
  role:        string             // 'primary' | 'secondary' | 'tertiary'
  status:      'PENDING' | 'ACTIVE'  // Si ha aceptado el rol de guardián
  accepted_at: string | null      // Timestamp ISO8601 de aceptación, o null si pendiente
}
```

---

## Crear un BEO

La creación de un BEO está **abierta a cualquiera**. No se requiere permiso del Ambrósio Institute ni de ninguna autoridad.

```typescript
// Usando bsp-sdk-typescript
import { BEOClient } from '@bsp/sdk'

const client = new BEOClient()

const beo = await client.create({
  domain: 'andre.bsp',       // Dominio .bsp deseado
  guardians: [               // Opcional en la creación — se pueden agregar después
    { contact: 'maria@example.com', public_key: '...' },
    { contact: 'joao@example.com',  public_key: '...' },
  ]
})

console.log(beo.beo_id)   // "550e8400-e29b-41d4-a716-446655440000"
console.log(beo.domain)   // "andre.bsp"
```

```python
# Usando bsp-sdk-python
from bsp_sdk import BEOClient

client = BEOClient()

beo = client.create(
    domain="andre.bsp",
    guardians=[
        {"contact": "maria@example.com", "public_key": "..."},
    ]
)

print(beo.beo_id)    # "550e8400-e29b-41d4-a716-446655440000"
print(beo.domain)    # "andre.bsp"
```

---

## El Dominio .bsp

Cada BEO se identifica por un dominio `.bsp` legible por humanos — una dirección biológica permanente y soberana.

| Tipo de Dominio | Ejemplo | Reglas |
|---|---|---|
| Individual | `andre.bsp` | Gratuito, permanente, no transferible, vinculado a un BEO |
| Profesional | `dr.carlos.bsp` | De pago, permanente, no transferible, vinculado al IEO del profesional |
| Institucional | `fleury.bsp` | De pago, renovación anual, transferible, vinculado al IEO |
| Investigación | `usp.longevity.bsp` | De pago, vinculado a la certificación de Research Partner |

→ Ver [`bsp-domain.md`](bsp-domain.md) para la especificación completa del sistema de dominios.

---

## Propiedades del BEO

### Permanencia
Una vez creado, un BEO no puede ser eliminado — ni por el propietario, ni por ninguna institución, ni por el Ambrósio Institute. La identidad biológica existe permanentemente en Arweave.

### Soberanía
El individuo posee la clave privada. Ningún sistema — incluido el Ambrósio Institute — puede acceder a los datos del BEO sin autorización explícita del titular de la clave.

### Portabilidad
Todos los datos dentro de un BEO pueden exportarse en formato estándar BSP en cualquier momento. Sin bloqueo de proveedor.

### Inmutabilidad
Los BioRecords no pueden alterarse una vez escritos. Las correcciones se envían como nuevos BioRecords que superceden a los anteriores — preservando la pista de auditoría completa.

---

## Control de Acceso

Todo el acceso de terceros a un BEO está gobernado por el contrato inteligente **AccessControl** en Arweave.

Cualquier sistema que quiera leer o escribir en un BEO debe:
1. Solicitar autorización al titular del BEO
2. Recibir un token de consentimiento firmado del titular
3. Enviar ese token con cada transacción

Sin un token válido, el contrato inteligente rechaza automáticamente la transacción. El individuo es el guardián — no el Ambrósio Institute.

Los tokens de consentimiento son:
- **Acotados** — limitados a categorías de datos e intents específicos
- **Con límite de tiempo** — expiran automáticamente salvo renovación
- **Revocables** — el titular puede revocar en cualquier momento
- **Auditables** — todas las concesiones y revocaciones se registran permanentemente on-chain

→ Ver [`exchange.md`](exchange.md) para la especificación completa del token de consentimiento.

---

## Recuperación Social

Si un titular de BEO pierde su clave privada, la recuperación es posible a través de la red de guardianes.

**La recuperación requiere:** 2 de 3 guardianes para confirmar la identidad del titular.

Ningún guardián individual puede restaurar el acceso por sí solo. No hay ningún servidor central involucrado. El protocolo de recuperación se ejecuta on-chain.

**Configuración de guardianes:**
1. En la creación del BEO (recomendado), designar 3 personas de confianza
2. Cada guardián acepta el rol y proporciona una clave pública
3. Umbral de recuperación: se requieren 2 de 3 firmas

→ Ver [`bsp-domain.md`](bsp-domain.md) para los detalles del protocolo de recuperación.

---

## BEO vs IEO — Distinciones Clave

| Propiedad | BEO (Individuo) | IEO (Institución) |
|---|---|---|
| Representa | Un ser humano vivo | Una organización, sistema o profesional |
| Creado por | El individuo | Cualquier institución, directamente |
| Transferible | Nunca | Sí — en adquisición o fusión |
| Puede leer BEOs | Solo sus propios datos | Solo con token de consentimiento válido |
| Puede escribir en BEOs | No puede | Sí — con autorización de AccessControl |
| Formato de dominio | `nombre.bsp` | `nombreinstitucion.bsp` |
| Costo | Gratuito — la soberanía es un derecho | De pago — tarifa anual de certificación |

→ Ver [`ieo.md`](ieo.md) para la especificación completa del IEO.

---

## Ejemplo de BEO (JSON)

```json
{
  "beo_id": "550e8400-e29b-41d4-a716-446655440000",
  "domain": "andre.bsp",
  "created_at": "2026-02-24T14:32:00Z",
  "version": "0.2.0",
  "public_key": "ed25519:4K8Yg2...",
  "key_version": 1,
  "active_recovery": null,
  "locked_at": null,
  "sovereignty": {
    "guardians": [
      {
        "contact": "encrypted:3a7b9c...",
        "public_key": "ed25519:7xM2Pq...",
        "role": "primary",
        "status": "ACTIVE",
        "accepted_at": "2026-02-24T14:35:00Z"
      }
    ],
    "recovery_scheme": "2-of-3",
    "consent_log": []
  }
}
```

→ Ejemplo completo: [`../examples/beo-example.json`](../examples/beo-example.json)

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
