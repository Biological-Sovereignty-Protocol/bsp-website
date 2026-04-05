---
title: IEO — Objeto de Entidad Institucional
---

# IEO — Objeto de Entidad Institucional

> Versión 0.2 | Ambrósio Institute

---

## Visión General

El **Institutional Entity Object (IEO)** representa cualquier organización, sistema o profesional que interactúa con datos biológicos en nombre de, o con el consentimiento de, un titular de BEO.

Toda institución en el ecosistema BSP — desde una cadena hospitalaria nacional hasta un fabricante de dispositivos wearables o un médico independiente — está representada como un IEO.

> **Crear un IEO está abierto a cualquier institución.**
> La Certificación BSP es voluntaria — pero desbloquea beneficios significativos dentro del ecosistema.

---

## Schema del Objeto IEO

```typescript
IEO {
  // ─── IDENTIDAD ──────────────────────────────────────────────────
  ieo_id:       string     // Identificador institucional universalmente único
  domain:       string     // Dirección .bsp — ej. "fleury.bsp"
  display_name: string     // Nombre legal completo de la institución
  ieo_type:     IEOType    // LABORATORY | HOSPITAL | WEARABLE | PHYSICIAN |
                           // INSURER | RESEARCH | PLATFORM
  country:      ISO3166    // País de operación principal
  jurisdiction: string     // Jurisdicción regulatoria
  legal_id:     string     // CNPJ (BR) / EIN (US) / VAT (EU) etc.
  public_key:   string     // Clave pública institucional para envíos firmados
  created_at:   ISO8601    // Timestamp de registro del IEO
  version:      semver     // Versión BSP al momento de la creación

  // ─── CERTIFICACIÓN ─────────────────────────────────────────────
  certification: {
    level:        CertLevel    // BASIC | ADVANCED | FULL | RESEARCH
    granted_at:   ISO8601
    expires_at:   ISO8601      // Renovación anual
    categories:   string[]     // Categorías BSP autorizadas (ej. ["BSP-LA", "BSP-HM"])
    intents:      BSPIntent[]  // Intents de intercambio autorizados
    restrictions: string[]     // Prohibiciones explícitas si las hay
    certified_by: string       // Referencia del auditor del Instituto
    audit_ref:    string       // ID de transacción de auditoría en Arweave
  }

  // ─── REGISTRO OPERATIVO ────────────────────────────────────────
  operations: {
    biorecords_submitted: number   // Total de BioRecords enviados hasta la fecha
    last_submission:      ISO8601
    compliance_rate:      float    // Tasa de cumplimiento del schema (0.0–1.0)
    active_consents:      number   // Tokens de consentimiento abiertos actuales
    complaints:           number
    audits:               Audit[]
  }

  // ─── CONTACTOS ──────────────────────────────────────────────────
  contacts: {
    technical_lead:   ContactRef
    compliance_lead:  ContactRef
    api_endpoint:     string     // URL del endpoint BSP API principal
    webhook_url:      string     // Webhook de notificación (opcional)
  }

  // ─── ESTADO ────────────────────────────────────────────────────
  status:             IEOStatus  // ACTIVE | SUSPENDED | REVOKED | PENDING
  suspension_reason:  string | null
  revocation_reason:  string | null
}
```

---

## Tipos de IEO

### LAB — Laboratorio Clínico y de Diagnóstico (`IEOType.LABORATORY`)

Laboratorios clínicos y de diagnóstico — la fuente principal de BioRecords en el ecosistema BSP.

| Propiedad | Regla |
|---|---|
| Niveles autorizados por defecto | L2 Standard |
| Niveles autorizados avanzados | L1 Core, L3 Extended con certificación |
| Puede LEER BEOs | Nunca — el envío es solo escritura |
| Formato de dominio | `nombreinstitucion.bsp` (ej. `fleury.bsp`) |
| Renovación | Auditoría anual de cumplimiento |

### HSP — Hospital y Sistema de Salud (`IEOType.HOSPITAL`)

Hospitales y sistemas de salud. Autorizados en múltiples niveles de taxonomía simultáneamente. Pueden acreditar médicos como sub-IEOs.

| Propiedad | Regla |
|---|---|
| Niveles autorizados por defecto | L1 Core + L2 Standard |
| Niveles autorizados avanzados | L3 Extended, L4 Device con certificación |
| Puede LEER BEOs | Con token de consentimiento activo, con límite de tiempo |
| Sub-IEOs de médicos | Formato `dr.silva@hcor.bsp` |

### WRB — Wearable y Dispositivo (`IEOType.WEARABLE`)

Empresas de hardware y software que producen dispositivos wearables y sistemas de monitoreo continuo.

| Propiedad | Regla |
|---|---|
| Niveles autorizados | L4 Device (BSP-DV) **exclusivamente** |
| Frecuencia de envío | Registros consolidados diarios por usuario |
| Puede LEER BEOs | **Nunca** — restricción permanente, no puede ser anulada por el consentimiento del usuario |
| Requisito del SDK | Debe usar el BSP Device SDK oficial |

> **Crítico:** Los IEOs de wearables son el único tipo de IEO que nunca puede recibir acceso READ_RECORDS bajo ninguna circunstancia.

### PHY — Médico y Profesional de Salud (`IEOType.PHYSICIAN`)

Médicos y profesionales de salud con licencia. Únicos en que READ_RECORDS es su función principal.

| Propiedad | Regla |
|---|---|
| Función principal | READ_RECORDS con token de consentimiento |
| Derechos de envío | Solo evaluaciones clínicas (BSP-CL) |
| Modelo de consentimiento | Tokens con límite de tiempo y alcance |
| Verificación de credenciales | Número de licencia médica requerido al registrarse |

### INS — Aseguradora de Salud (`IEOType.INSURER`)

Compañías de seguros de salud. Operan bajo el modelo de acceso más restrictivo.

| Propiedad | Regla |
|---|---|
| Acceso de lectura | Solo datos anónimos agregados |
| Acceso individual | Solo con consentimiento explícito continuo, nunca automático |
| **PROHIBIDO** | No pueden usar datos BSP para suscripción, denegación de cobertura ni cálculo de primas basado en riesgo biológico individual |

> Esta restricción está codificada en el contrato IEO y se aplica a nivel de contrato inteligente.

### RES — Institución de Investigación (`IEOType.RESEARCH`)

Universidades, centros de investigación y organizaciones de ensayos clínicos.

| Propiedad | Regla |
|---|---|
| Acceso a datos | Agregados anónimos con opt-in explícito |
| Identificación individual | Estructuralmente imposible — referencias BEO eliminadas |
| Restricción comercial | No pueden comercializar el acceso a datos BSP brutos |

### PLT — Plataforma Digital de Salud y Sistema de IA (`IEOType.PLATFORM`)

Plataformas digitales de salud, servicios de telemedicina y sistemas de IA. Esta es la categoría para las implementaciones AVA/SVA.

| Propiedad | Regla |
|---|---|
| Función principal | Intents ANALYZE_VITALITY y REQUEST_SCORE |
| Acceso de lectura | Con consentimiento persistente del usuario — renovable |
| Acceso de escritura | No puede — las plataformas interpretan, no miden |

---

## Niveles de Certificación

| Nivel | Requisitos | Qué desbloquea |
|---|---|---|
| **BSP-Compliant Basic** | Solo biomarcadores L2 Standard | Listado en directorio, sello básico |
| **BSP-Compliant Advanced** | L1 Core + L2 Standard | Feed de datos AVA, sello avanzado |
| **BSP-Compliant Full-Spectrum** | Todos los niveles | Integración completa al ecosistema |
| **BSP Research Partner** | IEO de investigación con contribución BIP | Acceso a datos de investigación anónimos |

**La certificación es voluntaria.** Cualquier institución puede participar en el ecosistema BSP sin certificación — pero las instituciones certificadas:
- Aparecen en el directorio oficial
- Muestran un sello verificable on-chain
- Sus datos se incorporan al análisis de AVA
- Son recomendadas por el Ambrosio OS

Las instituciones no certificadas pueden operar, pero la app Ambrósio muestra un aviso de "fuente no verificada".

---

## Intents de Intercambio

Cada tipo de IEO está autorizado para intents de intercambio específicos:

| Intent | Descripción | Tipos de IEO Autorizados |
|---|---|---|
| `SUBMIT_RECORD` | Enviar mediciones biológicas a un BEO | LAB, HSP, WRB, PHY |
| `READ_RECORDS` | Leer BioRecords de un BEO | PHY, PLT, INS (solo agregados) |
| `REQUEST_CERTIFICATION` | Solicitar certificación BSP | Todos los tipos |
| `ANALYZE_VITALITY` | Enviar BioRecords para análisis AVA | PLT |
| `REQUEST_SCORE` | Solicitar generación de puntuación SVA | PLT |
| `SUBMIT_BIP` | Enviar una Propuesta de Mejora BSP | Todos los tipos |

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
