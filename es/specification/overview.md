---
title: Visión General de la Especificación
---

<div class="page-hero-image">
  <img src="/images/spec-overview.jpg" alt="BSP Specification Overview — protocol architecture" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>


# Arquitectura BSP — Las Tres Capas

> Versión 0.2 | Ambrósio Institute

---

## Visión General

El Biological Sovereignty Protocol está organizado en tres capas distintas. Cada capa tiene una responsabilidad claramente definida y está diseñada para ser independiente — los cambios en una capa no rompen las implementaciones de otra.

```
┌─────────────────────────────────────────────────────────┐
│                  CAPA DE INTELIGENCIA                    │
│         AVA · SVA · Algoritmos de terceros              │
│    (por encima del protocolo — no definida por BSP)     │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│              CAPA 3 — BSP-Exchange                       │
│           Protocolo de Comunicación                     │
│   Cómo los sistemas solicitan y responden datos biol.   │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│              CAPA 2 — BSP-Data                           │
│           Schema de Datos Biológicos                    │
│   Estructura de todas las mediciones (BioRecord)        │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│              CAPA 1 — BSP-Identity                       │
│           Identidad Biológica                           │
│   El objeto de identidad soberana — BEO                 │
│   Almacenado en Arweave — permanente, descentralizado   │
└─────────────────────────────────────────────────────────┘
```

---

## Capa 1 — BSP-Identity

**Qué define:** Quién posee los datos.

Cada individuo y cada institución en el ecosistema BSP tiene una identidad permanente y descentralizada:
- **BEO** — Biological Entity Object (individuo)
- **IEO** — Institutional Entity Object (laboratorio, hospital, plataforma, etc.)

El BEO es el centro de gravedad de todo el protocolo. Cada BioRecord, cada consentimiento, cada interacción está anclado a un BEO.

Los BEOs e IEOs se almacenan en la blockchain **Arweave** — permanente y descentralizada. Ninguna empresa, gobierno ni el propio Ambrósio Institute puede eliminar o alterar una identidad registrada.

→ Ver [`beo.md`](beo.md) e [`ieo.md`](ieo.md) para las especificaciones completas.

---

## Capa 2 — BSP-Data

**Qué define:** Qué contienen los datos.

Cada medición biológica — un resultado de análisis de sangre, un marcador genómico, una lectura de wearable, una evaluación clínica — se representa como un **BioRecord**.

Los BioRecords son las unidades atómicas de datos biológicos en el ecosistema BSP. Son:
- **Inmutables** — una vez escritos, no pueden alterarse
- **Anclados** — cada BioRecord pertenece a un BEO específico
- **Clasificados** — cada BioRecord lleva un código de taxonomía BSP
- **Firmados** — cada BioRecord lleva una firma criptográfica de la entidad que lo envió

→ Ver [`biorecord.md`](biorecord.md) para la especificación completa del BioRecord.
→ Ver [Taxonomía de Biomarcadores](taxonomy/level-1-core) para la taxonomía completa.

---

## Capa 3 — BSP-Exchange

**Qué define:** Cómo se mueven los datos.

El Protocolo de Intercambio BSP define el formato de las solicitudes y respuestas entre sistemas:
- Cómo cualquier sistema envía datos a un BEO
- Cómo una plataforma solicita acceso de lectura
- Cómo un motor de IA consulta un historial biológico
- Cómo se estructuran y verifican los tokens de consentimiento

Todas las operaciones de intercambio están sujetas al contrato inteligente **AccessControl** — se requiere el consentimiento del titular del BEO para cada transacción de datos.

→ Ver [`exchange.md`](exchange.md) para la especificación completa del Protocolo de Intercambio.

---

## Infraestructura Descentralizada

Los registros BSP se almacenan en **Arweave** — un protocolo de almacenamiento permanente y descentralizado diseñado para preservar datos durante 200+ años.

Los contratos inteligentes que gestionan las identidades BEO, los registros de dominio y los permisos de acceso se despliegan vía SmartWeave en Arweave. Esto garantiza:
- No hay punto único de fallo
- Ninguna empresa (incluido el Ambrósio Institute) puede alterar las reglas de forma unilateral
- Los datos escritos en la infraestructura BSP existen permanentemente

Los cinco contratos inteligentes en la infraestructura BSP:

| Contrato | Propósito |
|---|---|
| **BEORegistry** | Crea y gestiona identidades biológicas — abierto a cualquiera |
| **IEORegistry** | Gestiona identidades institucionales y estado de certificación |
| **DomainRegistry** | Controla el namespace `.bsp` — garantiza unicidad |
| **AccessControl** | Gestiona tokens de consentimiento — el verdadero guardián del protocolo |
| **Governance** | Autorización multi-firma para cambios críticos del protocolo |

→ Ver [`bsp-domain.md`](bsp-domain.md) para el sistema de dominios `.bsp`.
→ Ver [`governance.md`](governance.md) para el modelo de gobernanza.

---

## La Capa de Inteligencia (Por Encima de BSP)

La capa de inteligencia **no forma parte de la especificación BSP**.

BSP define cómo se estructuran y transportan los datos — no qué conclusiones extraer de ellos. Las capas de inteligencia como:
- Ambrósio Vitality Algorithm (AVA)
- Ambrósio Vitality Score (SVA)
- Cualquier motor analítico de terceros

...operan por encima del protocolo, consumiendo datos BSP estandarizados para producir insights. Cualquier sistema en el mundo puede implementar el BSP. Solo Ambrósio posee AVA.

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
