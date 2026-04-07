---
title: "Referencia CLI"
description: "Referencia completa de la interfaz de línea de comandos del BSP — gestione identidades biológicas, consentimiento y datos de salud desde la terminal."
---

# Referencia CLI

Instale globalmente o ejecute via npx:

```bash
npm install -g @bsp/cli
# o
npx @bsp/cli --help
```

## Configuración

Config almacenada en `~/.bsp/config.json`.

```bash
bsp config set network testnet
bsp config set registry https://api.biologicalsovereigntyprotocol.com
bsp config set private-key <hex>
bsp config show
```

| Clave | Default | Descripción |
|-------|---------|-------------|
| `registry` | `https://api.biologicalsovereigntyprotocol.com` | URL de la API |
| `network` | `testnet` | mainnet, testnet, local |
| `private-key` | — | Clave privada Ed25519 (hex) |
| `ieo-domain` | — | Dominio IEO (comandos institucionales) |

---

## Comandos BEO

### `bsp create <dominio>`
Crea un nuevo BEO. Genera par de claves Ed25519 localmente.

```bash
bsp create andre.bsp
# Retorna: BEO ID, clave privada, seed phrase
# ⚠️ Guarde la clave y seed de forma segura — se muestran una sola vez
```

### `bsp resolve <dominio>`
Consulta un BEO por su dominio .bsp.

### `bsp lock <beoId>` / `bsp unlock <beoId>`
Bloqueo/desbloqueo de emergencia.

### `bsp rotate-key <beoId>`
Genera nuevas claves Ed25519 y rota la clave del BEO on-chain.

### `bsp destroy <beoId> --confirm`
**IRREVERSIBLE** — Destruye permanentemente el BEO. LGPD Art. 18 / GDPR Art. 17.

---

## Comandos de Consentimiento

### `bsp consent grant <beoId> <ieoId>`
Emite un ConsentToken a una institución.

```bash
bsp consent grant <beoId> <ieoId> \
  --intents SUBMIT_RECORD,READ_RECORDS \
  --categories BSP-LA,BSP-CV \
  --days 365
```

### `bsp consent revoke <tokenId> <beoId>`
Revoca un ConsentToken.

### `bsp consent revoke-all <beoId> --confirm`
Emergencia — revoca TODOS los tokens activos.

### `bsp consent verify <tokenId>` / `bsp consent list <dominio>`
Verificar o listar tokens.

---

## Comandos IEO

### `bsp ieo create <dominio>`
```bash
bsp ieo create fleury.bsp --type LAB --name "Fleury Laboratórios"
```

### `bsp ieo get <ieoId>` / `bsp ieo list`
Consulta IEOs.

### `bsp ieo lock` / `bsp ieo unlock` / `bsp ieo destroy --confirm`
Operaciones de emergencia y destrucción.

---

## Comandos Exchange

### `bsp records submit <beoId> --token <tok> --file registros.json`
### `bsp records read <beoId> --token <tok> --json`
### `bsp export <beoId> --token <tok> --format FHIR_R4`

Formatos: `JSON`, `CSV`, `FHIR_R4`

---

→ [GitHub](https://github.com/Biological-Sovereignty-Protocol/bsp-cli) · [Referencia SDK](./sdk-reference) · [Servidor MCP](./mcp)
