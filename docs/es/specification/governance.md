---
title: Gobernanza y BIPs
---

# Gobernanza BSP — Cambios de Protocolo y BIPs

> Versión 0.2 | Ambrósio Institute

---

## Visión General

La especificación BSP evoluciona a través de un proceso público de mejora — las **Propuestas de Mejora BSP (BIPs)**.

Cualquier individuo, empresa o institución puede proponer cambios al protocolo. El Ambrósio Institute revisa todas las propuestas y coordina la discusión de la comunidad. Los cambios críticos del protocolo requieren autorización multi-firma.

---

## Principios de Gobernanza

1. **Apertura** — Cualquiera puede proponer un BIP. No se requiere afiliación institucional.
2. **Transparencia** — Todas las propuestas, discusiones y decisiones son públicas.
3. **Cambio conservador** — Los cambios de protocolo tienen un estándar alto. La estabilidad es una característica.
4. **Compatibilidad con versiones anteriores** — Los cambios aceptados no deben romper implementaciones existentes, salvo que la ruptura sea claramente necesaria y se defina la ruta de migración.
5. **Custodia del Instituto** — El Ambrósio Institute es el guardián de la especificación, no su propietario. El protocolo sirve al ecosistema.

---

## Categorías de BIP

| Categoría | Descripción | Ejemplos |
|---|---|---|
| **BSP-BIP-TAXONOMY** | Agregar o modificar códigos de biomarcadores | Nuevo biomarcador, corrección de unidad |
| **BSP-BIP-SCHEMA** | Cambios al schema de BEO, IEO o BioRecord | Nuevo campo, cambio de tipo de campo |
| **BSP-BIP-EXCHANGE** | Cambios al Protocolo de Intercambio | Nuevo intent, código de error |
| **BSP-BIP-GOVERNANCE** | Cambios al proceso de gobernanza en sí | Template BIP, línea de tiempo de revisión |
| **BSP-BIP-INFRA** | Actualizaciones de contratos inteligentes | Nuevo contrato, cambio de parámetro |

---

## Flujo de Estado del BIP

```
DRAFT → REVIEW → ACCEPTED | REJECTED
                    │
                  FINAL (tras implementación)
```

| Estado | Descripción |
|---|---|
| `DRAFT` | El autor está redactando — aún no enviado para revisión |
| `REVIEW` | Enviado — abierto para discusión de la comunidad (30 días) |
| `ACCEPTED` | Aprobado por el Instituto — programado para implementación |
| `REJECTED` | No aceptado — con explicación |
| `FINAL` | Implementado y activo en una versión BSP publicada |

---

## Enviar un BIP

1. Haz un fork de este repositorio
2. Copia `bip/BIP-0000-template.md` a `bip/BIP-XXXX-tu-titulo.md`
3. Completa el template en su totalidad
4. Abre un Pull Request

El PR abre el período de revisión pública de 30 días. El Ambrósio Institute programará una llamada de revisión para las propuestas que alcancen consenso comunitario.

---

## Cambios de Parámetros Críticos

Los cambios en los parámetros de los contratos inteligentes o en el propio contrato Governance requieren **autorización multi-firma** de los titulares de claves del Instituto.

Esto previene cambios unilaterales — incluyendo los del fundador del Instituto. El protocolo está protegido contra cualquier actor único.

---

## Índice de BIPs

| BIP | Título | Estado |
|---|---|---|
| BIP-0000 | Template de BIP | FINAL |

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
