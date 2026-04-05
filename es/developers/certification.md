# Proceso de Certificación BSP

El Protocolo de Soberanía Biológica (BSP) es inherentemente abierto. Cualquier laboratorio, dispositivo wearable o aplicación puede crear un BEO (Biological Entity Object) o enviar BioRecords, siempre que tengan el consentimiento criptográfico del individuo.

Sin embargo, la **Certificación BSP** existe para establecer una capa verificable de confianza, cumplimiento técnico y calidad de datos. Es una marca de responsabilidad institucional.

---

## ¿Por qué Certificarse?

Aunque los sistemas no certificados pueden técnicamente participar en el ecosistema (si un usuario los autoriza), convertirse en **Certificado-BSP** proporciona ventajas significativas para las instituciones:

1. **Listado en Directorio Verificado:** Las instituciones certificadas aparecen en el directorio oficial del Ambrósio Institute. Aquí es donde los usuarios buscan primero al encontrar fuentes confiables de datos biológicos.
2. **Confianza Nativa en Ambrosio OS:** Cuando un usuario utiliza la aplicación oficial Ambrosio, las fuentes de datos certificadas son confiables por defecto. Las fuentes no certificadas activan advertencias visibles de "fuente no verificada" antes de que el usuario firme un ConsentToken.
3. **Acceso al Pipeline de Datos AVA:** Este es el beneficio más crítico. Solo los datos que provienen de una fuente Certificada-BSP alimentan el Algoritmo de Vitalidad Ambrósio (AVA). Los datos no certificados permanecen en el BEO del usuario, pero **no** contribuyen a su Score de Vitalidad Ambrósio (SVA).
4. **Insignia On-Chain:** El estado se registra inmutablemente en el contrato inteligente `IEORegistry` en Arweave, verificable públicamente por cualquier aplicación de terceros.
5. **Participación en la Gobernanza:** Las instituciones certificadas obtienen privilegios de voto en el proceso de Propuestas de Mejora BSP (BIP), dando forma directamente al futuro del estándar.

---

## Niveles de Certificación

El marco de certificación está mapeado a los cuatro niveles de la [Taxonomía de Biomarcadores BSP](/es/developers/taxonomy). Una institución solo necesita estar certificada en el nivel de datos que produce activamente.

### BSP-1: Básico en Cumplimiento
* **Objetivo:** Laboratorios clínicos convencionales y hospitales.
* **Requisitos:** Capacidad para procesar y enviar biomarcadores de **Nivel 2 (Standard)** (ej: Hematología, Lípidos, Hormonas Convencionales, Química General). Debe implementar con precisión el esquema BioRecord y la firma criptográfica a través del SDK.

### BSP-2: Avanzado en Cumplimiento
* **Objetivo:** Clínicas avanzadas de longevidad y laboratorios de medicina funcional.
* **Requisitos:** Capacidad para procesar biomarcadores de **Nivel 1 (Core)** y Nivel 2 (ej: NAD+, GDF-11, relojes epigenéticos, PCR-as). Debe demostrar una gestión robusta de ConsentTokens y manejo dinámico de solicitudes.

### BSP-3: Espectro Completo en Cumplimiento
* **Objetivo:** Instituciones integrales de investigación y centros de diagnóstico ultra-avanzados.
* **Requisitos:** Capacidad a través de los Niveles 1, 2 y dominios especializados de **Nivel 3 (Extended)** (Genómica, Microbioma, Toxicología Avanzada). Requiere una profunda integración con el pipeline de inteligencia de AVA.

### BSP-4: Dispositivo en Cumplimiento
* **Objetivo:** Fabricantes de hardware (wearables, monitores continuos de glucosa, biosensores).
* **Requisitos:** Capacidad para generar datos de **Nivel 4 (Device)** (VFC, SpO2, Arquitectura del Sueño). Requiere la implementación de agregación diaria de datos: los dispositivos no deben inundar la blockchain con eventos en bruto, sino enviar BioRecords agregados diariamente.

---

## El Flujo de Trabajo de Certificación

Las instituciones que buscan adquirir el sello Certificado-BSP interactúan con el backend `bsp-registry-api` (Privado) controlado por el Ambrósio Institute.

### 1. Envío de la Solicitud
La institución crea un Institutional Entity Object (IEO) nativamente a través del SDK y envía su `ieo_id` junto con la documentación técnica y registros de garantía de calidad al portal del Ambrósio Institute.

### 2. Auditoría Técnica
El equipo de ingeniería del Instituto audita la integración de entorno de pruebas (sandbox) de la institución.
* ¿Verifican correctamente los `ConsentTokens` antes de los intentos de `SUBMIT_RECORD`?
* ¿Están los `BioRecords` mapeados correctamente en la taxonomía BSP?
* ¿Se rellenan de forma segura los rangos de referencia?

### 3. Aprobación en Contrato Inteligente
Tras la aprobación, el Ambrósio Institute firma una transacción multi-sig en el contrato `IEORegistry` de Arweave, actualizando el estado de la institución a **CERTIFIED** en el nivel correspondiente (ej: BSP-2).

### 4. Cumplimiento Continuo
La certificación se revisa anualmente. Las instituciones deben mantener el tiempo de actividad de los Acuerdos de Nivel de Servicio (SLA) para sus interfaces de datos y adoptar rápidamente las actualizaciones de versión del protocolo para conservar su insignia de certificación.

---

*Nota: El portal de certificación está actualmente administrado de forma privada por el Instituto. Si su organización está lista para probar la integración, comience descargando el `bsp-sdk` y probando frente a BEOs locales antes de solicitar una auditoría formal.*
