---
title: "Servidor MCP"
description: "Servidor MCP oficial do BSP — conecte Claude, ChatGPT e qualquer IA compatível com MCP a dados biológicos com consentimento ativo."
---

# Servidor MCP do BSP

Conecte qualquer IA compatível com MCP (Claude, GPT, etc.) a dados biológicos do BSP com enforcement de consentimento ativo.

## Configuração

Adicione ao `claude_desktop_config.json` do Claude Desktop:

```json
{
  "mcpServers": {
    "bsp": {
      "command": "npx",
      "args": ["-y", "@bsp/mcp"],
      "env": {
        "BSP_BEO_DOMAIN": "seunome.bsp",
        "BSP_CONSENT_TOKEN_ID": "tok_...",
        "BSP_NETWORK": "mainnet"
      }
    }
  }
}
```

Depois pergunte ao Claude: *"O que meus exames de sangue dizem sobre minha saúde cardiovascular?"*

---

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `BSP_BEO_DOMAIN` | Sim | Seu domínio .bsp |
| `BSP_CONSENT_TOKEN_ID` | Para acesso a dados | ConsentToken com intent READ_RECORDS |
| `BSP_NETWORK` | Não | mainnet (padrão), testnet, local |
| `BSP_PRIVATE_KEY` | Para operações de escrita | Chave privada Ed25519 (hex) |
| `BSP_REGISTRY_URL` | Não | URL customizada da API |

---

## Tools — Leitura

### `bsp_list_categories`
Lista todas as 25 categorias da taxonomia BSP. Dados públicos.

### `bsp_resolve_biomarker`
Consulta um código de biomarcador BSP (ex: `BSP-GL-001`). Dados públicos.

### `bsp_check_consent`
Verifica configuração de consentimento atual — BEO, token, rede.

### `bsp_get_biorecords`
Lê BioRecords do BEO do usuário. Requer ConsentToken com intent `READ_RECORDS`.

### `bsp_get_beo_summary`
Visão geral estruturada do perfil biológico do usuário.

---

## Tools — Escrita (requer BSP_PRIVATE_KEY)

### `bsp_lock_beo`
Bloqueio de emergência — congela o BEO imediatamente.

### `bsp_unlock_beo`
Desbloqueia um BEO previamente bloqueado.

### `bsp_destroy_beo`
**IRREVERSÍVEL** — Erasure permanente (LGPD/GDPR). Requer `confirm: true`.

### `bsp_revoke_all_tokens`
Emergência — revoga TODOS os ConsentTokens ativos de um BEO.

---

## Segurança

- Tools de leitura requerem ConsentToken válido (configurado via env)
- Tools de escrita requerem a chave privada do titular do BEO
- O servidor MCP assina payloads localmente — chaves nunca saem do processo
- Consentimento é verificado on-chain pelo contrato AccessControl

---

→ [Referência CLI](./cli) · [Referência SDK](./sdk-reference) · [Referência API](./api-reference)
