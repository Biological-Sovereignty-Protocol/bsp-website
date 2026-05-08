---
title: Hoja de Ruta de BSP
description: Hoja de ruta a 5 años (2026–2030) — hitos trimestrales con criterios binarios de conclusión, sincronizada con el Whitepaper v3.0 Parte VI.
lang: es
---

<div class="page-hero-image">
  <img src="/images/roadmap-hero.jpg" alt="Hoja de Ruta de BSP" loading="lazy" />
</div>

# Hoja de Ruta de BSP

> Esta hoja de ruta está sincronizada con el [Whitepaper v3.0 — Parte VI](/es/whitepaper#parte-vi-el-horizonte). Para el contexto estratégico completo (estrategia de adopción, modos de falla), consulte el whitepaper.

## Nota preliminar — sobre predecir el futuro

Las hojas de ruta de protocolos descentralizados son notorias por envejecer mal. La hoja de ruta original de Filecoin, escrita en 2017, prometía mainnet para 2018 y llegó en 2020. Ethereum 2.0, especificado en 2018, todavía estaba siendo entregado en fragmentos en 2024. Todo whitepaper que se respete carga la humildad de saber que el tiempo se venga de las predicciones.

Lo que sigue, por lo tanto, **no es predicción**, es **aspiración anclada en hipótesis verificables**. Cada hito es una apuesta. Cada fecha es provisional. Lo que importa no es si acertaremos los plazos, sino si las **direcciones** siguen siendo correctas a medida que aprendamos.

La hoja de ruta a continuación cubre 2026–2030. Está organizada por **hitos técnicos** (verificables on-chain), **hitos de adopción** (verificables en métricas públicas) e **hitos institucionales** (verificables en publicaciones y alianzas). Cada hito tiene un criterio binario de conclusión.

---

## Año 1 — 2026 — Fundación Operacional

La meta de este año es **salir del estado pre-mainnet** y establecer la infraestructura mínima viable. Estamos en ~95% de preparación técnica en febrero de 2026; el trabajo restante es multisig, seguridad operacional y los primeros usuarios reales.

| Trimestre | Hito | Criterio de conclusión |
|-----------|------|----------------------|
| Q1 2026 | Deployment Aptos mainnet con multisig 2-of-3 activo (BIP-0001) | Contratos publicados, owner = multisig address, transacción on-chain verificable |
| Q1 2026 | Auditoría externa del contrato Move | Reporte público publicado por firma independiente (Trail of Bits, Zellic u OtterSec) |
| Q2 2026 | bsp-id-web en producción | alice.bsp y dominio propio funcionales, primeros 1.000 BEOs creados |
| Q2 2026 | Documentación técnica completa | Whitepaper v3 publicado, especificación Move, guías de relayer self-hosted |
| Q3 2026 | SDKs estables (TypeScript v3.0, Python v2.1) | Versiones publicadas en npm y PyPI, ejemplos de integración documentados |
| Q3 2026 | Programa BSP Certified Level 1 lanzado | Especificación pública de los criterios, primeras certificaciones emitidas |
| Q4 2026 | Alianzas piloto con 3 laboratorios | LOIs firmados, integraciones en ambiente de homologación, primeros BioRecords reales |
| Q4 2026 | 10.000 BEOs activos | Métrica on-chain pública, dashboard de transparencia |

**Riesgo principal:** retraso en la auditoría. **Mitigación:** contratos de auditoría firmados en Q4 2025, con ventanas reservadas.

---

## Año 2 — 2027 — Validación Científica

En 2027, el foco cambia de infraestructura a **legitimidad científica**. Sin peer review, el BSP es solo un protocolo cripto prometedor más. Con peer review, se vuelve referencia.

| Trimestre | Hito | Criterio de conclusión |
|-----------|------|----------------------|
| Q1 2027 | Sumisión peer review de la metodología AVA | Manuscript sometido a Nature Aging, Aging Cell o Cell Metabolism |
| Q2 2027 | Validation studies iniciados | MOUs con UK Biobank y ELSA-Brasil, IRBs aprobados |
| Q2 2027 | 25.000 BEOs activos | Métrica on-chain |
| Q3 2027 | 5 IEOs certificados Level 2 | Sellos públicos, integración en producción |
| Q3 2027 | Apps móviles nativos beta | iOS y Android con gestión local de llaves |
| Q4 2027 | Publicación peer-reviewed AVA | Paper aceptado (no solo sometido) |
| Q4 2027 | 50.000 BEOs activos | Métrica on-chain |

**Riesgo principal:** rechazo en peer review. **Mitigación:** paralelizar sumisiones en múltiples journals; aceptar que la primera ronda probablemente exija revisiones sustanciales.

---

## Año 3 — 2028 — Expansión

Con validación científica en mano, 2028 es el año de **escala horizontal**: más labs, más clínicas, más wearables.

| Trimestre | Hito | Criterio de conclusión |
|-----------|------|----------------------|
| Q1 2028 | 50 IEOs certificados | Directorio público |
| Q2 2028 | 100.000 BEOs activos | Métrica on-chain |
| Q2 2028 | Migración Client-Side Encryption completa | Todos los nuevos BEOs con CSE como default |
| Q3 2028 | Apps móviles en producción (App Store, Play Store) | Aprobación Apple/Google |
| Q4 2028 | Primera BIP comunitaria aceptada | BIP sometida por contribuidor externo, aprobada vía proceso público |
| Q4 2028 | 200.000 BEOs activos | Métrica on-chain |

**Riesgo principal:** rechazo en la App Store por consideraciones regulatorias (las apps de salud tienen una vara más alta). **Mitigación:** involucrar legal counsel desde 2027.

---

## Año 4 — 2029 — Madurez

El cuarto año es donde el protocolo deja de ser "early stage" y se convierte en **infraestructura institucional**.

| Trimestre | Hito | Criterio de conclusión |
|-----------|------|----------------------|
| Q1 2029 | Audit Council independiente operacional | 5+ miembros no-Instituto, charter publicado |
| Q2 2029 | 500.000 BEOs activos | Métrica on-chain |
| Q2 2029 | Decisión sobre token de gobernanza | BIP pública evaluando necesidad; decisión (sí/no) registrada |
| Q3 2029 | Piloto con sistema público de salud | SUS regional (Brasil) o NHS digital health (UK) — MOU firmado |
| Q4 2029 | 1M BEOs activos | Métrica on-chain |

**Riesgo principal:** la burocracia institucional dilata los plazos. **Mitigación:** pilotos en jurisdicciones donde el steward tenga red directa (Brasil, Portugal, Estonia).

---

## Año 5 — 2030 — Ecosistema

El quinto año es la **prueba de descentralización real**: múltiples relayers operando independientemente, múltiples implementaciones de cliente, múltiples voces en la gobernanza.

| Trimestre | Hito | Criterio de conclusión |
|-----------|------|----------------------|
| Q1 2030 | 5+ operadores independientes de relayer | Lista pública verificable, ninguno controlando >40% del tráfico |
| Q2 2030 | AVA validado en 5+ cohortes peer-reviewed | Publicaciones en cohortes diferentes (UK Biobank, ELSA-Brasil, KORA, Rotterdam Study, US NHANES) |
| Q3 2030 | 1.5M BEOs activos | Métrica on-chain |
| Q4 2030 | Discusión pública sobre apertura del AVA | BIP pública, RFC abierto, decisión registrada |
| Q4 2030 | 2M+ BEOs activos globalmente | Métrica on-chain |

**Marca simbólica:** si para 2030 no tenemos al menos 3 implementaciones independientes de cliente (web, móvil, CLI) y 5 operadores de relayer, el protocolo falló en la prueba de descentralización real y necesita rediseñar incentivos.

---

*El desarrollo del protocolo es impulsado por la comunidad y sujeto a cambios a través del proceso BIP. Para la estrategia de adopción en tres frentes (individuos, instituciones, reguladores) y los modos de falla detallados con mitigaciones, vea el [Whitepaper v3.0 — Parte VI](/es/whitepaper#parte-vi-el-horizonte).*

[Ver BIPs](/es/bips/) · [Leer el Whitepaper](/es/whitepaper) · [Contribuir en GitHub](https://github.com/Biological-Sovereignty-Protocol)
