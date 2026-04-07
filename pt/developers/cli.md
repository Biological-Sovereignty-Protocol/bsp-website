---
title: "Referência CLI"
description: "Referência completa da interface de linha de comando do BSP — gerencie identidades biológicas, consentimento e dados de saúde pelo terminal."
---

# Referência CLI

Instale globalmente ou execute via npx:

```bash
npm install -g @bsp/cli
# ou
npx @bsp/cli --help
```

## Configuração

Config armazenada em `~/.bsp/config.json`.

```bash
bsp config set network testnet
bsp config set registry https://api.biologicalsovereigntyprotocol.com
bsp config set private-key <hex>
bsp config show
```

| Chave | Padrão | Descrição |
|-------|--------|-----------|
| `registry` | `https://api.biologicalsovereigntyprotocol.com` | URL da API |
| `network` | `testnet` | mainnet, testnet, local |
| `private-key` | — | Chave privada Ed25519 (hex) |
| `ieo-domain` | — | Domínio IEO (comandos institucionais) |

---

## Comandos BEO

### `bsp create <dominio>`
Cria um novo BEO (Biological Entity Object). Gera par de chaves Ed25519 localmente.

```bash
bsp create andre.bsp
# Retorna: BEO ID, chave privada, seed phrase
# ⚠️ Guarde a chave e seed com segurança — exibidos uma única vez
```

### `bsp resolve <dominio>`
Consulta um BEO pelo domínio .bsp.

### `bsp lock <beoId>`
Bloqueio de emergência — congela o BEO. Nenhuma operação permitida enquanto bloqueado.

### `bsp unlock <beoId>`
Desbloqueia um BEO previamente bloqueado.

### `bsp rotate-key <beoId>`
Gera novo par de chaves Ed25519 e rotaciona a chave do BEO on-chain.

### `bsp destroy <beoId> --confirm`
**IRREVERSÍVEL** — Destrói permanentemente o BEO. LGPD Art. 18 / GDPR Art. 17.

Nulifica chave pública, revoga todos os ConsentTokens, libera domínio, apaga config de recovery.

---

## Comandos de Consentimento

### `bsp consent grant <beoId> <ieoId>`
Emite um ConsentToken para uma instituição.

```bash
bsp consent grant <beoId> <ieoId> \
  --intents SUBMIT_RECORD,READ_RECORDS \
  --categories BSP-LA,BSP-CV \
  --days 365
```

| Flag | Obrigatória | Descrição |
|------|-------------|-----------|
| `--intents` | Sim | Intents separados por vírgula |
| `--categories` | Não | Categorias BSP separadas por vírgula |
| `--days` | Não | Expiração em dias (padrão: permanente) |

### `bsp consent revoke <tokenId> <beoId>`
Revoga um ConsentToken.

### `bsp consent revoke-all <beoId> --confirm`
Emergência — revoga TODOS os tokens ativos de um BEO.

### `bsp consent verify <tokenId>`
Verifica se um ConsentToken é válido.

### `bsp consent list <dominio>`
Lista todos os tokens de consentimento de um BEO.

---

## Comandos IEO

### `bsp ieo create <dominio>`
Registra uma nova Institutional Entity Object.

```bash
bsp ieo create fleury.bsp --type LAB --name "Laboratório Fleury"
```

### `bsp ieo get <ieoId>` / `bsp ieo list`
Consulta IEOs por ID ou lista com filtros.

### `bsp ieo lock <ieoId>` / `bsp ieo unlock <ieoId>`
Bloqueio/desbloqueio de emergência.

### `bsp ieo destroy <ieoId> --confirm`
**IRREVERSÍVEL** — Destrói permanentemente um IEO.

---

## Comandos de Exchange

### `bsp records submit <beoId>`
Submete BioRecords a um BEO.

```bash
bsp records submit <beoId> --token <tokenId> --file registros.json
```

### `bsp records read <beoId>`
Lê BioRecords de um BEO.

### `bsp export <beoId>`
Exporta todos os dados biológicos (portabilidade soberana — LGPD Art. 18 / GDPR Art. 20).

```bash
bsp export <beoId> --token <tokenId> --format FHIR_R4 > meus-dados.json
```

Formatos: `JSON`, `CSV`, `FHIR_R4`

---

## Segurança

- Chaves privadas nunca saem da sua máquina
- Toda assinatura acontece localmente via `@bsp/sdk`
- A API recebe apenas payloads assinados
- Operações destrutivas exigem `--confirm`

---

→ [GitHub](https://github.com/Biological-Sovereignty-Protocol/bsp-cli) · [Referência SDK](./sdk-reference) · [Servidor MCP](./mcp)
