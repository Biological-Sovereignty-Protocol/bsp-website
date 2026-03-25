<div class="page-hero-image">
  <img src="/images/arch-overview.png" alt="BSP Architecture Overview" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# El Flujo del Ecosistema

"Desde el primer acceso hasta la Puntuación de Vitalidad — el recorrido completo del desarrollador y el usuario a través de los repositorios BSP."

Este documento explica paso a paso cómo opera el ecosistema BSP en la práctica. Los dos protagonistas son el **Desarrollador** (quien construye sobre el protocolo) y el **Usuario** (quien vive bajo su protección). Ambos caminos se intersectan en el **BEO** (Objeto de Entidad Biológica).

<EcosystemFlowMcp />

## Parte 1: El Recorrido del Desarrollador
Cómo un laboratorio, app o plataforma entra al ecosistema BSP:

1.  **Entender el Protocolo (`bsp-spec`)**: Un desarrollador accede a la especificación pública del BSP. Aprende qué es un BEO y cómo funciona el Protocolo de Intercambio. No se requiere registro ni aprobación.
2.  **Instalar el SDK (`bsp-sdk`)**: Ya sea construyendo en Python o TypeScript, el desarrollador instala el SDK (ej., `pip install bsp-sdk`). Puede comenzar inmediatamente a estructurar datos en BioRecords válidos y soberanos.
3.  **Solicitar Autorización**: El laboratorio quiere enviar datos. Usa el SDK para solicitar autorización al usuario. El usuario firma un ConsentToken on-chain. Sin esto, la blockchain Arweave rechaza automáticamente la transacción.
4.  **Conectar Agentes de IA (`bsp-mcp`)**: Una plataforma de salud quiere que su IA lea el BEO. Instalan `bsp-mcp` (el servidor oficial Model Context Protocol para BSP), permitiendo a IAs como Claude consultar datos biológicos — estrictamente bajo el consentimiento del usuario.

## Parte 2: El Recorrido del Usuario
Desde la perspectiva de una persona que vive dentro del ecosistema:

1.  **Creación de Identidad (`bsp-contracts`)**: La primera vez que usas una app BSP, se crea tu BEO. Las claves se generan localmente. La dirección (ej., `andre.bsp`) te pertenece para siempre.
2.  **Llegada de Datos (`bsp-sdk` + Arweave)**: Te haces un análisis de sangre. El laboratorio formatea los datos como BioRecords y los envía. Porque autorizaste al laboratorio, los datos se cifran con tu clave y se almacenan permanentemente en Arweave.
3.  **Análisis de Vitalidad (`ava-core`)**: Abres tu app y solicitas activamente un análisis. La app descifra los BioRecords localmente y los envía al motor de inteligencia AVA (con consentimiento de sesión). AVA procesa los datos.
4.  **El Producto Final (`sva-engine`)**: Recibes tu Índice de Vitalidad Ambrósio (SVA) — una puntuación de edad biológica multidimensional que muestra dónde estás ganando y dónde necesitas actuar.
5.  **Asistente de IA (`bsp-mcp`)**: Le preguntas a tu asistente de IA de salud sobre tus resultados. A través de la conexión MCP, la IA lee tus datos soberanos y proporciona insights médicos profundamente contextualizados.

## Dónde se Cruzan los Caminos: Los Roles de los Repositorios

| Repositorio | Quién lo usa | Propósito |
|------------|-------------|---------|
| `bsp-spec` | Devs, Labs, Auditores | La ley pública del protocolo. |
| `bsp-sdk` | Devs de App y Backend | Las herramientas del constructor (Python/TypeScript). |
| `bsp-mcp` | Plataformas de IA | Conecta agentes de IA al protocolo con consentimiento. |
| `bsp-contracts` | Ambrósio Institute | Contratos inteligentes en Arweave (las identidades viven aquí). |
| `ava-core` | Ambrósio Institute | Inteligencia propietaria (procesa BioRecords). |
| `sva-engine` | Ambrósio Institute | Produce la Puntuación de Vitalidad para el usuario. |

## ¿Por qué está diseñado así?

*   **¿Por qué el protocolo es abierto?** Porque un estándar cerrado es solo un producto. Si BSP requiriera aprobación para crear un BEO, el Instituto sería un cuello de botella.
*   **¿Por qué el consentimiento reemplaza la certificación como guardián?** Porque una firma on-chain es matemáticamente verificable; no requiere confiar en una institución. La certificación es un distintivo de confianza, no la llave de la puerta.
*   **¿Por qué la inteligencia (AVA) es cerrada?** La ventaja competitiva del Instituto no es el protocolo mismo, sino la inteligencia aplicada a los datos estandarizados que fluyen a través de él.
*   **¿Por qué AVA nunca tiene acceso pasivo?** Porque la verdadera soberanía significa que ningún sistema analiza tus datos a menos que tú se lo pidas.
