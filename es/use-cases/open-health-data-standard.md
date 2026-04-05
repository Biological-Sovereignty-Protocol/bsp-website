---
title: "Estándar Abierto de Datos de Salud para Desarrolladores | BSP"
description: "BSP es un estándar abierto de datos de salud construido para permanencia y soberanía. Compare BSP vs FHIR, HL7 y APIs propietarias para labs, clínicas y plataformas."
---

# Estándar Abierto de Datos de Salud para Desarrolladores, Labs y Plataformas

La interoperabilidad de datos de salud es un problema teóricamente resuelto desde hace décadas. En la práctica, sigue fragmentada. FHIR está ampliamente implementado pero no universalmente adoptado. HL7 v2 está en todas partes. Las APIs propietarias se multiplican. Los pacientes aún no pueden extraer sus propios datos de la mayoría de los sistemas sin burocracia.

BSP es un tipo diferente de estándar. No intenta reemplazar FHIR para flujos de trabajo clínicos. Resuelve un problema diferente: dar a los individuos posesión permanente, portable y legible por máquina de sus datos biológicos — independiente de la participación continua de cualquier institución.

## BSP vs FHIR: Diferentes Funciones, Diferentes Diseños

| | FHIR | BSP |
|---|---|---|
| **Público primario** | Instituciones de salud | Individuos + desarrolladores |
| **Residencia de datos** | Servidores controlados por el proveedor | Controlados por el usuario (Arweave) |
| **Modelo de persistencia** | Dependiente de la institución | Permanencia garantizada por el protocolo |
| **Control de acceso** | Mediado por la institución | Criptográfico, en manos del usuario |
| **Alcance de interoperabilidad** | Integración entre sistemas clínicos | Transinstitucional, transfronterizo, multiplataforma |
| **Modelo de identidad** | Identificadores por institución | Identidad criptográfica única |
| **Estándar abierto** | Sí (HL7) | Sí (BSP) |

BSP y FHIR no están en conflicto. Los labs y clínicas pueden implementar FHIR internamente y exportar a BSP al escribir registros de propiedad del paciente.

## Por Qué Construir sobre BSP

Para **labs y empresas de diagnóstico**, BSP proporciona una ruta de exportación estandarizada para resultados de propiedad del paciente. Escriba resultados en el BEO del paciente una vez — se los llevan para siempre.

Para **desarrolladores de wearables y apps de salud**, la taxonomía de biomarcadores de BSP proporciona un vocabulario canónico para datos biológicos. Estandarice sus exportaciones una vez y sus usuarios pueden combinar sus datos con cualquier otra fuente compatible con BSP.

Para **clínicas de longevidad y plataformas de medicina de precisión**, el esquema estructurado de BSP permite análisis longitudinal entre fuentes de datos que de otro modo requerirían ETL personalizado para cada integración.

Para **instituciones de investigación**, el sistema de tokens de consentimiento de BSP permite que los participantes otorguen acceso con límite de tiempo y alcance limitado a partes específicas de su registro biológico.

## La Taxonomía de Biomarcadores BSP

BSP incluye una taxonomía de cuatro niveles que cubre los tipos de datos biológicos más comunes:

- **Nivel 1 — Core:** 40 biomarcadores que toda plataforma de salud debería capturar
- **Nivel 2 — Standard:** Diagnósticos extendidos, hormonas adicionales, marcadores inflamatorios
- **Nivel 3 — Extended:** Paneles especializados, microbioma, marcadores epigenéticos
- **Nivel 4 — Device:** Datos de monitoreo continuo de wearables (HRV, glucosa, SpO2, etapas del sueño)

[Ver la taxonomía completa](/es/specification/taxonomy/level-1-core)

## Ruta de Implementación

1. **Leer la especificación** — comience con el [esquema BEO](/es/specification/beo) y el [protocolo de intercambio](/es/specification/exchange)
2. **Usar el SDK** — SDKs en TypeScript y Python manejan gestión de claves, firma de registros y escritura en Arweave
3. **Importar datos existentes** — el puente FHIR e importadores CSV cubren los formatos de exportación más comunes
4. **Publicar** — escriba su primer BEO en Arweave mainnet en menos de una hora

---

[Ver Referencia SDK](/es/developers/sdk-reference) | [Leer el Esquema BEO](/es/specification/beo) | [Inicio Rápido](/es/getting-started/quickstart)
