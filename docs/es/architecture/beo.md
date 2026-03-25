<div class="page-hero-image">
  <img src="/images/beo-identity.png" alt="BEO Digital Identity" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Objeto de Entidad Biológica (BEO)

> "La identidad biológica soberana de un ser humano. El punto de anclaje de toda la vida medida."

## ¿Qué es un BEO?
El BEO es la base de todo el ecosistema BSP. Representa a un ser humano vivo — el propietario soberano de sus datos biológicos. Todos los BioRecords de una persona están anclados a él. Todos los ConsentTokens que autorizan el acceso se emiten desde él.

Un BEO es **creado por el individuo directamente en Arweave, sin aprobación de ninguna autoridad.** Una vez creado, pertenece al titular para siempre.

### BEO vs IEO — Distinción Fundamental

| Característica | BEO | IEO |
|---------|-----|-----|
| **Representa** | Un ser humano vivo | Una organización, sistema o profesional |
| **Creado por** | El individuo — sin aprobación necesaria | Cualquier institución — directamente |
| **Transferible** | Nunca — identidad individual permanente | Sí — en adquisición o fusión empresarial |
| **Puede leer BEOs** | Solo sus propios datos | Nunca sin un ConsentToken válido |
| **Puede escribir BioRecords** | No puede — los individuos observan, no registran | Sí — con ConsentToken activo |
| **Formato de dominio** | `nombre.bsp` | `institucion.bsp` |

---

## Identidad Criptográfica

El control del BEO está determinado enteramente por la posesión de la clave privada.

| Clave | Tipo | Uso |
|-----|------|-------|
| `private_key` | Ed25519 (64 bytes) | Generada localmente, nunca transmitida. Firma autorizaciones, descifra BioRecords, firma transacciones Arweave. |
| `public_key` | Ed25519 (32 bytes) | Registrada públicamente en Arweave. Los laboratorios la usan para identificar tu BEO y cifrar datos antes del envío. |
| `seed_phrase` | 24 palabras BIP-39 | Representación mnemónica de la clave privada. Guárdala offline — es tu copia de seguridad. |

### Generación de Claves

```javascript
// 100% en el dispositivo — nada se envía a ningún servidor
const entropy  = crypto.getRandomValues(new Uint8Array(32))
const mnemonic = bip39.entropyToMnemonic(entropy)
const seed     = await bip39.mnemonicToSeed(mnemonic)
const keyPair  = ed25519.fromSeed(seed.slice(0, 32))

const privateKey = keyPair.secretKey  // permanece en el dispositivo para siempre
const publicKey  = keyPair.publicKey  // registrada en Arweave
```

---

## Recuperación Social

Si pierdes tu dispositivo y tu frase semilla, la Recuperación Social te permite recuperar el acceso usando Guardianes de confianza — sin necesidad de servidor central.

- **Hasta 3 Guardianes**: personas o plataformas de confianza que designas
- **Umbral**: 2 de 3 confirmaciones requeridas (por defecto)
- **Mecanismo**: Shamir Secret Sharing — tu clave se divide en 3 fragmentos cifrados almacenados en Arweave
- **Seguridad**: Ningún guardián puede actuar solo. El Instituto nunca está involucrado.

### Flujo de Recuperación

```
1. Usuario abre app en dispositivo nuevo → no se encuentra clave privada
2. App genera nuevo par de claves localmente
3. Solicitud de recuperación publicada en Arweave (transacción RECOVERY_REQUEST)
4. Dos guardianes descifran sus fragmentos y publican transacciones GUARDIAN_CONFIRM
5. BEORegistry actualiza el BEO con la nueva clave pública
6. Acceso restaurado — clave antigua invalidada permanentemente
```

---

## Schema Completo del BEO

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
        "contact":     "maria.bsp",
        "public_key":  "ed25519_pub_...",
        "role":        "primary",
        "status":      "active",
        "accepted_at": "2026-01-10T15:00:00Z"
      }
    ]
  },

  "status":      "ACTIVE",
  "locked_at":   null,
  "key_version": 1
}
```

---

## Schema del BioRecord

Cada medición biológica adjuntada a un BEO es un BioRecord:

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

> **Los BioRecords son inmutables.** Las correcciones se envían como nuevos registros que `superseden` al anterior — el error permanece en el historial.

---

## Estados del Ciclo de Vida

| Estado | Descripción |
|-------|-------------|
| `ACTIVE` | Operación normal. Todas las operaciones autorizadas permitidas. |
| `LOCKED` | Bloqueado voluntariamente por el titular — útil si se sospecha compromiso. Ninguna institución lee o escribe. El progreso de recuperación se rastrea en `active_recovery.status`. |

---

## Contratos Inteligentes — Operaciones BEO

### BEORegistry

| Función | Quién puede llamar | Descripción |
|----------|-------------|-------------|
| `createBEO()` | Cualquiera | Crea un nuevo BEO. Abierto — sin aprobación necesaria. |
| `getBEO()` | Cualquiera | Devuelve datos públicos del BEO. |
| `updateRecovery()` | Solo titular del BEO | Configurar o actualizar la configuración de guardianes. |
| `lockBEO()` | Solo titular del BEO | Bloquea temporalmente todas las operaciones. |
| `rotateKey()` | Titular del BEO (recuperación) | Reemplaza la clave pública tras recuperación exitosa. |

### AccessControl

| Función | Quién puede llamar | Descripción |
|----------|-------------|-------------|
| `issueToken()` | Solo titular del BEO | Emite un nuevo ConsentToken a un IEO. |
| `revokeToken()` | Solo titular del BEO | Revoca inmediatamente un ConsentToken. |
| `verifyToken()` | Cualquier IEO | Comprueba si un token es válido para una operación específica. |
| `getTokenHistory()` | Solo titular del BEO | Registro de auditoría completo de todos los tokens emitidos. |

> [!IMPORTANT]
> `issueToken()` y `revokeToken()` están reservados exclusivamente para el titular del BEO. Ninguna institución — ni siquiera el Ambrósio Institute — puede otorgar o revocar el acceso a los datos de una persona.

---

## Crear un BEO con el SDK

```python
from bsp_sdk import BEOBuilder, Guardian

beo = BEOBuilder(domain="andre.bsp").build()
result = beo.register()

print(result.beo_id)      # UUID permanente en Arweave
print(result.domain)      # andre.bsp
print(result.seed_phrase) # 24 palabras — guárdalas offline, nunca digitalmente

# Opcional: configurar Recuperación Social
beo.update_recovery(
    guardians=[
        Guardian(contact="maria.bsp",   role="primary"),
        Guardian(contact="+5511999...", role="secondary"),
        Guardian(contact="carlos.bsp",  role="tertiary"),
    ],
    threshold=2
)
```

## Derechos del Titular (Incondicionales)

- ✓ Siempre recuperar tu BEO usando la frase semilla
- ✓ Siempre revocar cualquier ConsentToken, instantáneamente
- ✓ Siempre exportar todos tus datos (intent `EXPORT_DATA`)
- ✓ Siempre bloquear tu BEO
- ✓ Siempre elegir o reemplazar guardianes
