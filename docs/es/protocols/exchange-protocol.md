<div class="page-hero-image">
  <img src="/images/exchange-protocol.png" alt="Exchange Protocol" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Protocolo de Intercambio

"BSP define el formato de la conversación. Lo que cada sistema hace con ella es su responsabilidad."

## Visión General
El Protocolo de Intercambio es la capa de BSP que define cómo se mueven los datos biológicos entre sistemas. Especifica el formato exacto de las solicitudes y respuestas, los tipos de operación disponibles (Intents), la autenticación y el manejo de errores. Cualquier sistema que implemente correctamente el Protocolo de Intercambio puede enviar y recibir datos biológicos en formato BSP — sin aprobación previa, sin intermediarios.

El Protocolo de Intercambio define:
*   Schema de `BSPRequest` y `BSPResponse`.
*   Tipos de `BSPIntent` y sus parámetros.
*   Autenticación mediante `ConsentToken` + firma IEO.

El Protocolo de Intercambio **NO** define:
*   Lo que los sistemas hacen con los datos recibidos.
*   Algoritmos de análisis o puntuación (ej., AVA, SVA).
*   Infraestructura de transporte (HTTP, WebSocket, etc.).

## BSPIntent — Tipos de Operación
Los Intents definen el vocabulario de operaciones. Cada Intent requiere parámetros específicos y respuestas esperadas. El `ConsentToken` debe incluir el Intent solicitado; de lo contrario, el contrato `AccessControl` rechaza la solicitud inmediatamente.

### 1. SUBMIT_RECORD
Usado por laboratorios, wearables y sistemas autorizados para escribir mediciones biológicas en un BEO.
*   **Parámetro Requerido**: `payload` (BioRecord o array de BioRecords).
*   **Consentimiento:** Requiere token con `SUBMIT_RECORD` y la categoría correspondiente.

### 2. READ_RECORDS
Usado por médicos, plataformas y sistemas de análisis para leer datos biológicos de un BEO.
*   **Opciones**: Filtros por `biomarkers`, `categories`, `levels`, `period`, `limit` y `offset`.
*   **Consentimiento:** Requiere token con `READ_RECORDS` en el alcance.

### 3. ANALYZE_VITALITY
Solicita un análisis completo de envejecimiento biológico a un sistema de inteligencia.
*   **Proceso:** Solo los sistemas impulsados por AVA producen puntuaciones SVA. Otros sistemas pueden implementar su propia lógica.

### 4. REQUEST_SCORE
Versión simplificada de `ANALYZE_VITALITY` — devuelve solo la puntuación de vitalidad compuesta, no el análisis detallado. Usada principalmente por aseguradoras con opt-in.

### 5. EXPORT_DATA
El derecho más fundamental del titular del BEO. Devuelve todos los BioRecords en formato BSP estandarizado, descifrados con la clave privada del titular, facilitando la portabilidad total de datos.
> [!IMPORTANT]
> `EXPORT_DATA` no puede ser bloqueado, limitado ni denegado por ningún sistema BSP-compatible. Cualquier sistema que bloquee esto viola la especificación BSP.

### 6. SYNC_PROTOCOL
Sincroniza el protocolo de salud activo de un usuario (intervenciones, suplementos, objetivos) entre sistemas compatibles con BSP.

## Doble Autenticación
El `BSPRequest` exige dos niveles de autenticación:
1.  **ConsentToken**: Prueba que el titular del BEO autorizó al IEO.
2.  **ieo_signature**: Prueba que el IEO solicitante realmente construyó la solicitud. El IEO firma el payload de la solicitud con su clave privada, impidiendo que los ConsentTokens interceptados sean mal utilizados.

## BSPResponse y Errores
Las respuestas siguen estrictamente el schema `BSPResponse` que contiene el `status` (`SUCCESS`, `ERROR`, `PARTIAL`, `PENDING`).

Los errores comunes incluyen:
*   **Autenticación/Autorización**: `TOKEN_NOT_FOUND`, `TOKEN_REVOKED`, `INTENT_NOT_AUTHORIZED`, `CATEGORY_NOT_AUTHORIZED`.
*   **Schema/Datos**: `BIOMARKER_NOT_FOUND`, `INVALID_UNIT`, `SCHEMA_VALIDATION_FAILED`, `DUPLICATE_RECORD`.
*   **Sistema**: `ARWEAVE_WRITE_FAILED`, `INTENT_NOT_SUPPORTED`.
