---
title: "Servidor MCP"
description: "Servidor MCP oficial del BSP — conecte Claude, ChatGPT y cualquier IA compatible con MCP a datos biológicos con consentimiento activo."
---

# Servidor MCP del BSP

Conecte cualquier IA compatible con MCP (Claude, GPT, etc.) a datos biológicos del BSP con enforcement de consentimiento activo.

## Configuración

Agregue al `claude_desktop_config.json` de Claude Desktop:

```json
{
  "mcpServers": {
    "bsp": {
      "command": "npx",
      "args": ["-y", "bsp-mcp"],
      "env": {
        "BSP_BEO_DOMAIN": "sunombre.bsp",
        "BSP_CONSENT_TOKEN_ID": "tok_...",
        "BSP_NETWORK": "mainnet"
      }
    }
  }
}
```

Luego pregunte a Claude: *"¿Qué dicen mis análisis de sangre sobre mi salud cardiovascular?"*

---

## Variables de Entorno

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `BSP_BEO_DOMAIN` | Sí | Su dominio .bsp |
| `BSP_CONSENT_TOKEN_ID` | Para acceso a datos | ConsentToken con intent READ_RECORDS |
| `BSP_NETWORK` | No | mainnet (default), testnet, local |
| `BSP_PRIVATE_KEY` | Para operaciones de escritura | Clave privada Ed25519 (hex) |

---

## Tools — Lectura

- **`bsp_list_categories`** — Lista las 25 categorías de la taxonomía BSP
- **`bsp_resolve_biomarker`** — Consulta un código de biomarcador
- **`bsp_check_consent`** — Verifica configuración de consentimiento
- **`bsp_get_biorecords`** — Lee BioRecords (requiere ConsentToken)
- **`bsp_get_beo_summary`** — Resumen del perfil biológico

## Tools — Escritura (requiere BSP_PRIVATE_KEY)

- **`bsp_lock_beo`** — Bloqueo de emergencia
- **`bsp_unlock_beo`** — Desbloquear BEO
- **`bsp_destroy_beo`** — Erasure permanente (requiere `confirm: true`)
- **`bsp_revoke_all_tokens`** — Revocar todos los tokens

---

→ [Referencia CLI](./cli) · [Referencia SDK](./sdk-reference) · [Referencia API](./api-reference)
