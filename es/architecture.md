# Arquitectura del Protocolo

El BSP es un estándar abierto que define cómo se estructuran, almacenan, intercambian y gobiernan los datos biológicos. Opera en tres capas.

## Las Tres Capas

| Capa | Lo que define |
| --- | --- |
| **Capa 1 — Identidad** | Quién posee los datos. Cada individuo y cada institución en el ecosistema BSP tiene una identidad permanente y descentralizada: el Objeto de Entidad Biológica (BEO) o el Objeto de Entidad Institucional (IEO). |
| **Capa 2 — Datos** | Qué contienen los datos. Cada medición biológica se estructura como un BioRecord — una unidad estandarizada e inmutable de información biológica anclada a un BEO específico y clasificada bajo la taxonomía BSP. |
| **Capa 3 — Intercambio** | Cómo se mueven los datos. El Protocolo de Intercambio BSP define el formato de solicitudes y respuestas entre sistemas — cómo cualquier sistema envía datos a un BEO, cómo una plataforma solicita acceso, cómo un motor de IA consulta un historial biológico completo. |

<Architecture3Layer />

## El Objeto de Entidad Biológica (BEO)

El BEO es la identidad biológica soberana de cada individuo en el ecosistema BSP. Es el centro de gravedad de todo el protocolo.

Un BEO no es una cuenta en una plataforma. Es una identidad permanente, almacenada en la blockchain Arweave, controlada exclusivamente por el individuo a través de una clave privada. Cada BEO se identifica por un dominio `.bsp` legible por humanos — una dirección biológica permanente (por ejemplo, `andre.bsp`).

## El BioRecord

Cada medición biológica — un resultado de análisis de sangre, un marcador genómico, una lectura de dispositivo wearable, un informe de imágenes — se representa como un BioRecord.

Cualquier sistema puede intentar enviar un BioRecord a un BEO. Lo que gobierna el acceso es el consentimiento del titular del BEO, codificado en el contrato inteligente `AccessControl` en Arweave. Los BioRecords son inmutables una vez escritos.

## Infraestructura Descentralizada

Los registros BSP se almacenan en Arweave — un protocolo de almacenamiento permanente y descentralizado diseñado para preservar datos durante 200+ años.

Los procesos AO que gestionan las identidades BEO, los registros de dominio `.bsp` y los permisos de acceso corren en la plataforma de computación hiper-paralela de Arweave — garantizando que las reglas del protocolo no puedan ser cambiadas por ningún actor individual.

## El Modelo de Soberanía

La arquitectura técnica del BSP está diseñada para hacer de la soberanía individual el estándar por defecto:
*   **Propiedad permanente**: El individuo posee su BEO y todos los BioRecords dentro de él de por vida.
*   **Consentimiento granular**: Cada solicitud de acceso de terceros requiere el consentimiento explícito del titular del BEO.
*   **Envío abierto**: Cualquier sistema puede enviar BioRecords a un BEO — sujeto al consentimiento del titular.
*   **Portabilidad**: Cualquier dato en un BEO puede exportarse en formato estándar BSP en cualquier momento.
*   **Inmutabilidad**: Los BioRecords no pueden modificarse ni eliminarse una vez escritos.
*   **Control criptográfico**: El acceso está controlado por claves privadas en posesión del individuo.
