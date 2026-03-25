<div class="page-hero-image">
  <img src="/images/consent-flow.png" alt="Consent Flow" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# ConsentToken y Control de Acceso

> "El consentimiento no es una política de privacidad. Es una instrucción matemática registrada en la blockchain."

## Visión General

El sistema de consentimiento del BSP hace que la soberanía biológica sea una realidad técnica. El **ConsentToken** es una autorización criptográfica emitida por el contrato inteligente `AccessControl` en Arweave una vez que el titular lo firma con su clave privada.

**Ninguna institución puede leer o escribir datos en un BEO sin un ConsentToken válido.** La blockchain lo hace cumplir — ningún servidor puede evitarlo.

---

## Cómo Funciona el Consentimiento

```
Usuario (Titular del BEO)
     │  firma autorización con clave privada
     ▼
Contrato Inteligente AccessControl (Arweave)
     │  acuña ConsentToken on-chain
     ▼
Institución (IEO)
     │  presenta el token con cada solicitud
     ▼
AccessControl verifica → otorga o rechaza
```

---

## Schema del ConsentToken

```typescript
interface ConsentToken {
  token_id:    string      // Identificador único para esta concesión de consentimiento
  beo_id:      string      // El BEO que otorga el consentimiento
  ieo_id:      string      // El IEO que recibe el permiso
  granted_at:  string      // ISO8601
  expires_at:  string | null  // null = permanente hasta revocación

  scope: {
    intents:    BSPIntent[]   // Qué acciones están permitidas
    categories: string[]      // Qué categorías BSP son accesibles (ej., ["BSP-LA", "BSP-HM"])
    levels:     BioLevel[]    // Qué niveles de taxonomía
    period: {
      from: string | null
      to:   string | null
    } | null
    max_records: number | null
  }

  revocable:    boolean     // Siempre true
  revoked:      boolean
  revoked_at:   string | null
  owner_signature: string   // Firma Ed25519 del titular del BEO
  token_hash:   string      // Hash de verificación on-chain
}
```

---

## Tipos de Intent

| Intent | Descripción | Duración Típica |
|--------|-------------|-----------------|
| `SUBMIT_RECORD` | Escribir un BioRecord en el BEO | Uso único o permanente |
| `READ_RECORDS` | Leer BioRecords del BEO | 30–90 días (médicos); permanente (plataformas) |
| `ANALYZE_VITALITY` | Solicitar análisis de vitalidad AVA | Permanente (renovable) |
| `REQUEST_SCORE` | Solicitar puntuación SVA | Anual (aseguradoras con opt-in) |
| `EXPORT_DATA` | Exportar todos los datos — siempre disponible para el titular del BEO | — |
| `SYNC_PROTOCOL` | Negociación de versión del protocolo | Por sesión |

---

## Tipos de Token Estándar por Relación

| Relación | Duración | Alcance |
|-------------|----------|-------|
| Usuario → Laboratorio (envío) | Uso único | `SUBMIT_RECORD` — solo categorías específicas |
| Usuario → Médico (revisión) | 30–90 días | `READ_RECORDS` — categorías seleccionadas |
| Usuario → Hospital (tratamiento) | Duración del tratamiento | `READ_RECORDS` — todas las categorías relevantes |
| Usuario → Plataforma AVA | Permanente (renovable) | `ANALYZE_VITALITY` + `REQUEST_SCORE` |
| Usuario → Aseguradora (opt-in) | Anual — debe renovarse | `REQUEST_SCORE` — solo SVA compuesto |

---

## Verificar un Token (SDK Institucional)

```python
from bsp_sdk import BSPClient

client = BSPClient(
    ieo_domain  = "sulaboratorio.bsp",
    private_key = SU_CLAVE_PRIVADA,
)

verification = client.verify_consent(
    token_id   = "token-uuid-presentado-por-usuario",
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

## Revocación

La revocación es **instantánea y on-chain**. En el momento en que un usuario revoca un token, el contrato `AccessControl` lo marca como revocado. Todas las solicitudes posteriores de la institución son inmediatamente rechazadas.

```python
# Desde la app del usuario (titular del BEO)
result = client.revoke_consent(token_id="token-uuid")
print(result.status)  # REVOKED — efecto inmediato

# O revocar todo de una institución a la vez
client.revoke_all_from_ieo(ieo_domain="fleury.bsp")

# Opción nuclear — revocar todos los tokens activos
client.revoke_all_tokens()
```

> **Las instituciones no son notificadas automáticamente.** Descubren la revocación cuando su siguiente solicitud es rechazada con `TOKEN_REVOKED`.

---

## Funciones del Contrato AccessControl

| Función | Llamador Autorizado | Descripción |
|----------|------------------|-------------|
| `grantConsent()` | Solo titular del BEO | Emite un nuevo ConsentToken |
| `revokeToken()` | Solo titular del BEO | Revoca inmediatamente un token |
| `verifyToken()` | Cualquier IEO | Comprueba si un token es válido para un intent + categoría dados |
| `listTokens()` | Solo titular del BEO | Registro de auditoría completo de todos los tokens emitidos |

> [!IMPORTANT]
> Solo el titular del BEO puede otorgar o revocar el consentimiento. Ninguna institución, ningún otro sistema, y ni siquiera el Ambrósio Institute puede otorgar acceso a los datos de un usuario en su nombre.

---

## Códigos de Error

| Código | Descripción | Reintentable |
|------|-------------|-----------|
| `TOKEN_NOT_FOUND` | El ID del token no existe on-chain | No — el usuario debe reemitirlo |
| `TOKEN_REVOKED` | Revocado por el titular | No — nunca reintentar |
| `TOKEN_EXPIRED` | `expires_at` ha pasado | No — el usuario debe renovar |
| `INTENT_NOT_AUTHORIZED` | Intent solicitado no está en el alcance del token | No |
| `CATEGORY_NOT_AUTHORIZED` | Categoría no está en el alcance del token | No |
| `BEO_LOCKED` | El BEO está en estado LOCKED | No — el titular debe desbloquearlo |
