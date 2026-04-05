---
title: Protocolo de Intercambio BSP
---

# Protocolo de Intercambio BSP

> Versión 0.2 | Ambrósio Institute

---

## Visión General

El Protocolo de Intercambio BSP define cómo los sistemas solicitan y responden con datos biológicos — la capa de comunicación del protocolo.

Todas las operaciones de intercambio están sujetas al contrato inteligente **AccessControl**. El consentimiento del titular del BEO es requerido para cada transacción de datos que involucre sus datos biológicos.

---

## Principio Central

> Ningún sistema — laboratorio, plataforma, motor de IA, ni el propio Ambrósio Institute — puede acceder a un BEO sin autorización explícita del titular, aplicada por el contrato inteligente AccessControl en Arweave.

El requisito de consentimiento es **matemático**, no institucional. El contrato inteligente rechaza transacciones no autorizadas automáticamente — sin revisión humana, sin servidor backend, sin confianza institucional requerida.

---

## Token de Consentimiento

Antes de cualquier operación de intercambio, el sistema ejecutante debe poseer un **ConsentToken** válido firmado por el titular del BEO.

```typescript
ConsentToken {
  token_id:    string       // Identificador único del token
  beo_id:      string       // El BEO al que este token otorga acceso
  ieo_id:      string       // La institución a la que se otorga este token
  intents:     BSPIntent[]  // Operaciones autorizadas (ej. ["SUBMIT_RECORD"])
  categories:  string[]     // Categorías BSP autorizadas (ej. ["BSP-LA", "BSP-GL"])
  granted_at:  ISO8601      // Cuándo el titular otorgó este token
  expires_at:  ISO8601      // Cuándo expira este token (null = persistente)
  revoked:     boolean      // Si este token ha sido revocado
  signature:   string       // Firma criptográfica del titular
  arweave_tx:  string       // ID de transacción Arweave — el registro on-chain
}
```

### Propiedades del Token

| Propiedad | Descripción |
|---|---|
| **Acotado** | Limitado a intents y categorías de datos específicos |
| **Con límite de tiempo** | Expira en `expires_at` — automáticamente inválido después |
| **Revocable** | El titular puede revocar en cualquier momento, registrado on-chain |
| **Auditable** | Todas las concesiones, usos y revocaciones permanentemente en Arweave |
| **No transferible** | Los tokens están vinculados a un IEO específico — no pueden compartirse |

---

## Operaciones de Intercambio

### SUBMIT_RECORD

Enviar una medición biológica a un BEO.

**Consentimiento requerido:** intent `SUBMIT_RECORD` + categoría autorizada que coincida con el biomarcador

```typescript
// Solicitud
SubmitRecordRequest {
  token:    ConsentToken    // Token de consentimiento válido, no expirado, no revocado
  record:   BioRecord       // El BioRecord a enviar
}

// Respuesta
SubmitRecordResponse {
  success:    boolean
  record_id:  string        // record_id asignado
  arweave_tx: string        // ID de transacción Arweave — registro permanente
  timestamp:  ISO8601
}
```

**Reglas de validación:**
1. El ConsentToken debe ser válido, no expirado, no revocado
2. Los `intents` del token deben incluir `SUBMIT_RECORD`
3. Las `categories` del token deben incluir la `category` del registro
4. El `beo_id` del registro debe coincidir con el `beo_id` del token
5. El registro debe pasar la validación del schema (todos los campos requeridos presentes)
6. El código de biomarcador debe existir en la taxonomía BSP
7. El valor debe estar dentro de un rango fisiológico plausible

---

### READ_RECORDS

Leer BioRecords de un BEO.

**Consentimiento requerido:** intent `READ_RECORDS` + categorías autorizadas

```typescript
// Solicitud
ReadRecordsRequest {
  token:      ConsentToken   // Token de consentimiento válido
  beo_id:     string
  filters: {
    categories:  string[]    // Filtrar por categoría BSP (opcional)
    biomarkers:  string[]    // Filtrar por códigos de biomarcadores específicos (opcional)
    from:        ISO8601     // Registros después de este timestamp (opcional)
    to:          ISO8601     // Registros antes de este timestamp (opcional)
    status:      RecordStatus // ACTIVE | SUPERSEDED | PENDING (por defecto: ACTIVE)
    limit:       number      // Máximo de registros a devolver (por defecto: 100)
    offset:      number      // Desplazamiento de paginación
  }
}

// Respuesta
ReadRecordsResponse {
  beo_id:   string
  records:  BioRecord[]
  total:    number
  has_more: boolean
}
```

---

### REQUEST_CONSENT

Una institución solicita un token de consentimiento a un titular de BEO.

Esta operación la inicia la institución pero debe completarla el titular del BEO — el token no existe hasta que el titular lo firma.

```typescript
// Solicitud de Consentimiento (enviada al titular)
ConsentRequest {
  request_id:  string
  ieo_id:      string
  ieo_domain:  string       // ej. "fleury.bsp"
  ieo_name:    string       // ej. "Fleury Laboratórios"
  intents:     BSPIntent[]  // Qué acceso se está solicitando
  categories:  string[]     // Qué categorías de datos
  expires_in:  number       // Duración solicitada en segundos (null = persistente)
  reason:      string       // Explicación legible por humanos
}

// Respuesta del titular — conceder
ConsentGrant {
  request_id: string
  token:      ConsentToken  // Firmado por la clave privada del titular
}

// Respuesta del titular — denegar
ConsentDenial {
  request_id: string
  reason:     string        // Opcional
}
```

---

### REVOKE_CONSENT

El titular del BEO revoca un token de consentimiento previamente otorgado.

```typescript
// Revocación (firmada por el titular)
ConsentRevocation {
  token_id:   string        // El token que se está revocando
  beo_id:     string
  reason:     string        // Opcional
  revoked_at: ISO8601
  signature:  string        // Firma del titular
  arweave_tx: string        // Registro on-chain
}
```

Después de la revocación, cualquier uso posterior del token es rechazado por el contrato inteligente AccessControl.

---

## Códigos de Error

| Código | Descripción |
|---|---|
| `BSP-E-001` | Token de consentimiento inválido o ausente |
| `BSP-E-002` | Token expirado |
| `BSP-E-003` | Token revocado |
| `BSP-E-004` | Intent no autorizado por el token |
| `BSP-E-005` | Categoría no autorizada por el token |
| `BSP-E-006` | BEO no encontrado |
| `BSP-E-007` | IEO no encontrado o suspendido |
| `BSP-E-008` | Fallo de validación del schema |
| `BSP-E-009` | Código de biomarcador no encontrado en la taxonomía |
| `BSP-E-010` | Valor fuera del rango fisiológico plausible |
| `BSP-E-011` | Fallo de escritura en Arweave — reintentar |
| `BSP-E-012` | Fallo de verificación de firma |

---

## Uso del SDK

```typescript
// TypeScript — Enviar un BioRecord
import { ExchangeClient, ConsentManager } from '@bsp/sdk'

// Verificar si tenemos un token de consentimiento válido
const consentManager = new ConsentManager({ ieoId: 'my-lab.bsp' })
const token = await consentManager.getToken(beoId)

if (!token || token.isExpired()) {
  // Solicitar nuevo consentimiento al usuario
  const request = await consentManager.requestConsent(beoId, {
    intents: ['SUBMIT_RECORD'],
    categories: ['BSP-GL', 'BSP-HM'],
    expiresIn: 365 * 24 * 60 * 60  // 1 año
  })
  // El usuario debe aprobar — devuelve el token cuando es aprobado
  token = await consentManager.waitForApproval(request.request_id)
}

// Enviar con token válido
const client = new ExchangeClient()
const result = await client.submit(record, token)
```

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
