<div class="page-hero-image">
  <img src="/images/governance-bip.png" alt="BSP Governance" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Gobernanza y Proceso BIP

"Un protocolo que no puede evolucionar está muerto. Un protocolo que cualquiera puede cambiar no es un protocolo."

## Filosofía de Gobernanza
BSP es un bien público. Su modelo de gobernanza resuelve la tensión fundamental entre estabilidad (los sistemas construidos sobre él no deben romperse) y flexibilidad (incorporar avances científicos).

La solución es una separación estricta de capas:
*   **Núcleo del Protocolo**: Cambia raramente. Requiere consenso multi-sig y 90 días de comentario público.
*   **Taxonomía de Biomarcadores**: Evoluciona trimestralmente basándose en BIPs aprobados. Requiere votación del Consejo Científico + ratificación formal.
*   **Implementaciones (AVA, SDKs)**: Evolucionan continuamente sin impactar el protocolo.

## El Ambrósio Institute como Guardián
El Ambrósio Institute es el guardián del estándar BSP — no su propietario.

### El Consejo Científico
*   **Composición**: 7 expertos globales independientes (longevidad, cardiología, metabolismo, etc.).
*   **Independencia**: Obligatoria. Ningún miembro puede tener vínculos financieros con el Instituto.
*   **Quórum**: 5 de 7 necesarios para votar. La mayoría simple decide.
*   **Reuniones**: Trimestrales (Jan, Abr, Jul, Oct) para revisar BIPs pendientes.

### Las Tres Claves — Multi-Sig
Las operaciones críticas en los contratos inteligentes de Arweave requieren al menos 2 de 3 claves autorizadas.
*   **Clave A — Fundador**: Director del Instituto.
*   **Clave B — Director Científico**: Responsable técnico del protocolo.
*   **Clave C — Custodia Legal**: Fiduciario independiente. Actúa como salvaguarda contra el abuso unilateral.

## Propuestas de Mejora BSP (BIPs)
Un BIP es la unidad formal de evolución del protocolo BSP. Cualquier persona en el mundo puede enviar un BIP — investigadores, médicos, desarrolladores — sin pagar tarifas ni requerir membresía.

### Tipos de BIPs
| Tipo | Nombre | Proceso |
|------|------|---------|
| **BIP-T** | Taxonomía | Adición/modificación de biomarcadores. Se vota trimestralmente. |
| **BIP-P** | Protocolo | Modificaciones al núcleo. Requiere 90 días de comentario público. |
| **BIP-G** | Gobernanza | Cambios al modelo de gobernanza en sí. Requiere 120 días de comentario. |
| **BIP-I** | Informacional | Mejores prácticas, guías de documentación. Aprobación simplificada. |

### El Ciclo de Vida del BIP
1.  **Envío (1 día)**: El autor envía un Pull Request a `bsp-spec/bip` usando el template. Estado: `DRAFT`.
2.  **Revisión Técnica (2 semanas)**: El Instituto verifica el schema, las referencias y la completitud. Estado: `REVIEW`.
3.  **Comentario Público (30-120 días)**: Debate abierto en GitHub. Estado: `COUNCIL`.
4.  **Votación del Consejo Científico**: Evaluación trimestral. Evalúa evidencia (requiere al menos 2 artículos revisados por pares).
5.  **Decisión y Ratificación (1-2 semanas)**: Si se aprueba, el Titular de Clave Científica ratifica el cambio on-chain. Se programan las implementaciones en el SDK.

## Procedimientos de Emergencia y Protecciones
¿Qué impide que el Instituto "capture" el protocolo?
1.  **Clave C Independiente**: Impide cambios unilaterales en los contratos.
2.  **Auditabilidad Pública**: Cada BIP, voto y justificación es permanentemente público y on-chain.
3.  **Compromiso de Protección de Fork**: El Instituto se compromete públicamente a nunca impugnar legalmente las implementaciones que se bifurquen del estándar si la comunidad no está de acuerdo con las decisiones del Instituto.
