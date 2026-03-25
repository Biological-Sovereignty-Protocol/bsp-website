<div class="page-hero-image">
  <img src="/images/ieo-institution.png" alt="IEO Institution" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Objeto de Entidad Institucional (IEO)

> "Toda institución que toca la biología humana necesita un lenguaje para expresarla."

## ¿Qué es un IEO?

El IEO representa cualquier organización, sistema o profesional que interactúa con datos biológicos en el ecosistema BSP — desde un laboratorio clínico hasta una plataforma de IA. Cualquier institución puede crear un IEO sin aprobación. La Certificación BSP es voluntaria pero desbloquea beneficios significativos.

---

## Tipos de IEO

| Código | Tipo | Rol Principal |
|------|------|-------------|
| `LAB` | Laboratorio | Enviar BioRecords — la fuente de datos principal |
| `HOSP` | Hospital y Sistema de Salud | Enviar + Leer registros en dominios clínicos |
| `WEAR` | Wearable y Dispositivo | Enviar datos continuos de Nivel 4 (Dispositivo) diariamente |
| `PHY` | Médico y Profesional | Leer registros para interpretar el historial médico del paciente |
| `INS` | Aseguradora de Salud | Leer solo la puntuación SVA agregada — nunca datos brutos |
| `RES` | Institución de Investigación | Acceso agregado anonimizado para ciencia abierta |
| `PLT` | Plataforma y Sistema de IA | Analizar vitalidad, solicitar puntuaciones SVA |

---

## Matriz de Permisos

| Acción | LAB | HOSP | WEAR | PHY | INS | RES |
|--------|:---:|:----:|:----:|:---:|:---:|:---:|
| Enviar BioRecords | ✓ | ✓ | ✓ | ✓* | — | — |
| Leer BEO (con token) | — | ✓ | — | ✓ | — | — |
| Datos anónimos agregados | — | — | — | — | ✓* | ✓ |
| Analizar vitalidad (AVA) | — | — | — | ✓ | — | — |
| Solicitar puntuación SVA | — | — | — | ✓ | ✓* | — |

*PHY: solo evaluaciones clínicas (BSP-CL) | INS: solo SVA compuesto con opt-in del usuario*

---

## Schema Completo del IEO

```typescript
interface IEO {
  ieo_id:       string    // Identificador institucional universalmente único
  domain:       string    // Dirección .bsp — ej., "fleury.bsp"
  display_name: string    // Nombre legal completo
  ieo_type:     IEOType   // LABORATORY | HOSPITAL | WEARABLE | PHYSICIAN | INSURER | RESEARCH | PLATFORM
  country:      string    // Código de país ISO3166
  jurisdiction: string    // Jurisdicción regulatoria
  legal_id:     string    // CNPJ (BR) / EIN (US) / VAT (EU) etc.
  public_key:   string    // Clave pública Ed25519 institucional
  created_at:   string    // ISO8601
  version:      string    // Versión BSP al momento de la creación

  certification: {
    level:      "UNCERTIFIED" | "BASIC" | "ADVANCED" | "FULL" | "DEVICE" | "RESEARCH"
    granted_at: string
    expires_at: string     // Renovación anual
    categories: string[]   // Categorías BSP autorizadas (ej., ["BSP-LA", "BSP-HM"])
    intents:    BSPIntent[]
  }

  operations: {
    biorecords_submitted: number
    last_submission:      string
    compliance_rate:      number  // 0.0–1.0
    active_consents:      number
  }

  status: "ACTIVE" | "SUSPENDED" | "REVOKED" | "PENDING"
}
```

---

## Niveles de Certificación

| Nivel | Código | Acceso a Datos | Objetivo |
|-------|------|-------------|--------|
| Sin certificar | — | Cualquier categoría con consentimiento del usuario | Cualquier institución que empieza |
| Básico | BSP-1 | L2 Estándar | Laboratorios clínicos, diagnósticos rutinarios |
| Avanzado | BSP-2 | L1 Core + L2 | Clínicas de longevidad avanzada |
| Espectro Completo | BSP-3 | L1 + L2 + L3 Extended | Centros de investigación integrales |
| Dispositivo | BSP-4 | L4 Device (continuo) | Fabricantes de wearables |

---

## Proceso de Certificación

### Ruta Estándar para Laboratorio (BSP-1)

1. **Solicitud** — Enviar en `biologicalsovereigntyprotocol.com/certify`. Requerido: ID de entidad legal, contactos, lista de categorías analíticas.
2. **Revisión de Documentos** — El Instituto revisa en 5 días hábiles: legitimidad legal, posición regulatoria, coincidencia de capacidades.
3. **Auditoría Técnica** — Acceso al BSP Compliance Test Suite. Debe enviar 100 BioRecords válidos en todas las categorías solicitadas en modo sandbox usando el SDK.
4. **Actualización de IEO** — Al aprobarse, el Instituto actualiza el IEO de la institución en Arweave a `BSP-CERTIFIED` con categorías autorizadas y referencia de auditoría.
5. **Producción** — Credenciales de producción del SDK emitidas. El sello se activa y es verificable on-chain.
6. **Renovación Anual** — Si falla → el estado cambia a `SUSPENDED`.

---

## Restricciones Especiales

### IEOs de Wearables
**Nunca** pueden recibir acceso `READ_RECORDS` — ni siquiera con consentimiento explícito del usuario. Los dispositivos producen datos; no los consumen. Esta restricción es permanente y está codificada en el contrato `IEORegistry`.

### IEOs de Aseguradoras
Permanentemente prohibidas de:
- Usar datos BSP para suscripción de seguros
- Acceder a BioRecords brutos (solo puntuación SVA compuesta con opt-in anual explícito)
- Almacenar datos BSP brutos

---

## Crear un IEO

```python
from bsp_sdk import IEOBuilder, IEOType

ieo = IEOBuilder(
    domain       = "sulaboratorio.bsp",
    name         = "Nombre de Su Laboratorio",
    ieo_type     = IEOType.LABORATORY,
    jurisdiction = "AR",
    legal_id     = "30-12345678-9",
    contact      = "tech@sulaboratorio.com",
    website      = "https://sulaboratorio.com",
).build()

result = ieo.register()

print(result.ieo_id)       # UUID permanente en Arweave
print(result.domain)       # sulaboratorio.bsp
print(result.arweave_tx)   # ID de transacción on-chain
print(result.status)       # ACTIVE (UNCERTIFIED por defecto)

# CRÍTICO: Almacenar de forma segura — sin recuperación si se pierde
# result.private_key  → almacenar en .env como BSP_IEO_PRIVATE_KEY
# result.seed_phrase  → almacenar offline
```

---

## Registro Público y Sello de Certificación

Cada IEO activo aparece en el Registro Público BSP, consultable por cualquiera. La certificación es verificable on-chain — el sello no puede falsificarse.

```typescript
const registry = new IEORegistry("mainnet")
const status = await registry.verify("fleury.bsp")

console.log(status.isCertified)   // true
console.log(status.certifiedSince) // 2026-03-01
console.log(status.level)          // "ADVANCED"
```

```html
<!-- Sello de certificación incrustable -->
<a href="https://biologicalsovereigntyprotocol.com/registry/fleury.bsp">
  <img src="https://biologicalsovereigntyprotocol.com/badges/BSP-Compliant-Advanced.svg"
       alt="BSP-Certificado Avanzado"
       width="200" />
</a>
```
