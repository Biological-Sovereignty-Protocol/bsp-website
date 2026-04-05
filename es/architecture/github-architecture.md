# Arquitectura GitHub

> "El protocolo pertenece al mundo. La inteligencia pertenece a Ambrósio. La soberanía pertenece al individuo."

La infraestructura GitHub de BSP está dividida en dos organizaciones. Esta separación refleja la filosofía central del proyecto.

---

## Dos Organizaciones, un Ecosistema

| | Pública | Privada |
|--|--------|---------|
| **Organización** | `biological-sovereignty-protocol` | `ambrosio-institute` |
| **Repositorios** | 5 — todos públicos | 4 — todos privados |
| **Licencia** | CC BY 4.0 | IP Propietaria |
| **Acceso** | Cualquiera — clonar, bifurcar, contribuir | Solo el Instituto |
| **Propósito** | El estándar abierto | Operaciones + inteligencia propietaria |

---

## Organización Pública: `biological-sovereignty-protocol`

Todo lo que aquí se encuentra define el estándar abierto. Cualquier desarrollador, laboratorio, investigador o plataforma de IA puede usarlo sin permiso, sin pago, sin dependencia de un proveedor.

### `bsp-spec` — Especificación del Protocolo
La definición canónica del estándar. Si la especificación no lo define, no es BSP.

```
bsp-spec/
├── spec/
│   ├── overview.md         # Arquitectura de tres capas
│   ├── beo.md              # Objeto de Entidad Biológica
│   ├── ieo.md              # Objeto de Entidad Institucional
│   ├── exchange.md         # Protocolo de Intercambio
│   └── taxonomy/           # Taxonomía completa de biomarcadores
├── bip/                    # Propuestas de Mejora BSP
│   └── BIP-0000-template.md
├── examples/               # Ejemplos de BioRecords en JSON
└── LICENSE                 # CC BY 4.0
```

### `bsp-sdk-typescript` — SDK TypeScript
Publicado en npm como `@bsp/sdk`. Para plataformas web, apps móviles y servicios backend.

```bash
npm install @bsp/sdk
```

### `bsp-sdk-python` — SDK Python
Publicado en PyPI como `bsp-sdk`. Para laboratorios, bioinformáticos y pipelines de investigación.

```bash
pip install bsp-sdk
```

### `bsp-mcp` — Servidor MCP para Agentes de IA
Conecta cualquier IA compatible con MCP (Claude, GPT, etc.) al protocolo BSP con consentimiento activo del usuario.

```bash
npm install @bsp/mcp
```

**Herramientas disponibles:**
- `bsp_get_biorecords` — Leer BioRecords con consentimiento activo
- `bsp_get_beo_summary` — Obtener resumen del perfil biológico
- `bsp_resolve_biomarker` — Consultar códigos de biomarcadores BSP
- `bsp_list_categories` — Listar categorías de la taxonomía
- `bsp_check_consent` — Verificar estado actual del consentimiento

### `bsp-docs-repo` — Documentación Pública
Este sitio web. Alimenta `biologicalsovereigntyprotocol.com`. El punto de entrada para cualquiera que quiera entender o integrar BSP.

---

## Organización Privada: `ambrosio-institute`

Estos repositorios contienen la infraestructura operativa y la inteligencia propietaria del Instituto.

### `bsp-contracts` — Contratos Inteligentes en Arweave

| Contrato | Propósito | Abierto a? |
|----------|---------|---------|
| `BEORegistry` | Crear e indexar BEOs | Cualquiera |
| `IEORegistry` | Gestionar instituciones certificadas | Instituto (escritura); Cualquiera (verificar) |
| `DomainRegistry` | Unicidad del namespace `.bsp` | Automático vía SDK |
| `AccessControl` | Gestión de consentimiento — el verdadero guardián | Titulares de BEO (otorgar/revocar); IEOs (verificar) |
| `Governance` | Multi-sig para cambios críticos del protocolo | 2 de 3 titulares de claves del Instituto |

Los contratos son **inmutables tras el despliegue**. Su especificación es pública en `bsp-spec`.

### `bsp-registry-api` — Portal de Certificación
La capa de flujo humano para la Certificación BSP voluntaria.

| Lo que pasa por aquí | Lo que NUNCA pasa |
|--------------------|--------------------------|
| ✓ Solicitudes de certificación | ✗ Datos biológicos del usuario |
| ✓ Documentación institucional | ✗ BioRecords |
| ✓ Estado de aprobación y sellos | ✗ Claves privadas |
| ✓ Envíos de BIP | ✗ Transacciones blockchain |

### `ava-core` — Algoritmo AVA (Propietario)
El Algoritmo de Vitalidad Ambrósio. Procesa BioRecords **solo** cuando un usuario inicia activamente un análisis — nunca tiene acceso pasivo. El activo intelectual central del Instituto.

### `sva-engine` — Motor de Puntuación SVA (Propietario)
Convierte el análisis de AVA en la Puntuación de Vitalidad Ambrósio multidimensional (SVA). El producto final que el usuario experimenta en Ambrosio OS.

---

## Secuencia de Construcción

```
1. bsp-spec           ← Fundación: el estándar que todo implementa
2. bsp-contracts      ← Infraestructura on-chain (inmutable tras el despliegue)
3. bsp-registry-api   ← Portal de certificación (flujo humano)
4. bsp-sdk-typescript ← Primer SDK (mayor cobertura de integración)
5. bsp-mcp            ← Conectividad de IA (construido sobre el SDK TypeScript)
6. bsp-sdk-python     ← SDK de laboratorio (sigue la misma especificación)
7. ava-core           ← Inteligencia (entrenada sobre datos estandarizados BSP)
8. sva-engine         ← Puntuación (output: la Puntuación SVA)
9. bsp-docs-repo      ← Documentación (evoluciona con el ecosistema)
```

---

## Costos GitHub

| Organización | Costo |
|-------------|------|
| `biological-sovereignty-protocol` (5 públicos) | Gratis — repos públicos siempre gratuitos |
| `ambrosio-institute` (4 privados, ≤3 colaboradores) | Gratis — plan GitHub Free |
| `ambrosio-institute` (4 privados, crecimiento del equipo) | $4/usuario/mes (GitHub Team) |
