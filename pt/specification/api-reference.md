---
title: "Referência API"
description: "Referência REST completa da API do Registry BSP — 38 rotas para operações de BEO, IEO, consentimento, exchange e queries."
lang: pt
---

# Referência API do Registry

URL base: `https://api.biologicalsovereigntyprotocol.com`

A Registry API é um relayer gasless. Ela verifica assinaturas Ed25519 e retransmite transações para o Arweave, pagando o gas em nome dos usuários. Não pode forjar nem modificar ações do usuário.

Toda operação de escrita requer payload assinado com `nonce` (16+ caracteres) e `timestamp` (ISO8601, máx 5 min de idade).

---

## Operações de BEO

Todas as rotas em `POST /api/relayer/beo/...`

| Rota | Descrição | Auth |
|-------|-------------|------|
| `POST /api/relayer/beo` | Criar novo BEO | Assinatura Ed25519 |
| `POST /api/relayer/beo/lock` | Travamento de emergência | Assinatura Ed25519 |
| `POST /api/relayer/beo/unlock` | Destravar | Assinatura Ed25519 |
| `POST /api/relayer/beo/destroy` | Apagamento permanente (LGPD/GDPR) | Assinatura Ed25519 |
| `POST /api/relayer/beo/rotate-key` | Rotacionar chave Ed25519 | Assinatura Ed25519 |
| `POST /api/relayer/beo/recovery` | Atualizar configuração de recovery | Assinatura Ed25519 |
| `POST /api/relayer/beo/request-recovery` | Iniciar Social Recovery | Público |
| `POST /api/relayer/beo/revoke-all` | Revogar todos os tokens de um BEO | Assinatura Ed25519 |
| `POST /api/relayer/consent` | Conceder ConsentToken | Assinatura Ed25519 |

### Formato de payload (exemplo: createBEO)

```json
{
  "domain": "andre.bsp",
  "publicKey": "ed25519-hex-64-chars",
  "recovery": null,
  "signature": "base64-ed25519-detached-signature",
  "nonce": "random-16-chars-min",
  "timestamp": "2026-04-07T20:00:00.000Z"
}
```

A `signature` é computada sobre: `JSON.stringify(sortedKeys({ function: "createBEO", domain, publicKey, recovery, nonce, timestamp }))`.

---

## Operações de IEO

Todas as rotas em `POST /api/ieo/...`

| Rota | Descrição | Auth |
|-------|-------------|------|
| `POST /api/ieo` | Criar novo IEO | Assinatura Ed25519 |
| `POST /api/ieo/lock` | Travamento de emergência | Assinatura Ed25519 |
| `POST /api/ieo/unlock` | Destravar | Assinatura Ed25519 |
| `POST /api/ieo/destroy` | Apagamento permanente | Assinatura Ed25519 |
| `POST /api/ieo/rotate-key` | Rotacionar chave Ed25519 | Assinatura Ed25519 |
| `POST /api/ieo/contacts` | Atualizar endpoint API / webhook | Assinatura Ed25519 |
| `POST /api/ieo/recovery` | Atualizar configuração de recovery | Assinatura Ed25519 |
| `POST /api/ieo/approve` | Aprovar proposta de governança (multisig 2-de-3) | X-Institute-Key |
| `POST /api/ieo/certification` | Atualizar nível de certificação do IEO | X-Institute-Key |

---

## Operações de Guardian

Todas as rotas em `/api/guardian/...`

| Rota | Descrição | Auth |
|-------|-------------|------|
| `POST /api/guardian/invite` | Titular do BEO convida guardião | Assinatura Ed25519 |
| `GET /api/guardian/accept/:token` | Renderizar página de aceitação | Público |
| `POST /api/guardian/accept/:token` | Guardião aceita e registra chave pública Ed25519 | Público |
| `GET /api/guardian/confirm-recovery/:token` | Renderizar confirmação de recovery | Público |
| `POST /api/guardian/confirm-recovery/:token` | Guardião confirma recovery (threshold 2-de-3 dispara rotação de chave) | Público |

---

## Operações de Query (somente leitura)

Sem autenticação — lê estado público no Arweave.

| Rota | Descrição |
|-------|-------------|
| `GET /api/beos/:beoId` | Obter BEO por UUID |
| `GET /api/beos/domain/:domain` | Resolver BEO por domínio .bsp |
| `GET /api/ieos` | Listar IEOs (filtros: status, ieoType, certLevel) |
| `GET /api/ieos/:ieoId` | Obter IEO por UUID |
| `GET /api/ieos/domain/:domain` | Resolver IEO por domínio .bsp |
| `GET /api/ieos/:ieoId/certification` | Verificar certificação do IEO |
| `GET /api/consent/:tokenId` | Verificar ConsentToken |
| `GET /api/consent/history/:beo_domain` | Histórico completo de tokens |

---

## Revogação de Consentimento

| Rota | Descrição | Auth |
|-------|-------------|------|
| `DELETE /api/consent/:tokenId` | Revogar um token | Assinatura Ed25519 |
| `DELETE /api/consent/all` | Revogar TODOS os tokens (emergência) | Assinatura Ed25519 |
| `DELETE /api/consent/ieo/:ieo_domain` | Revogar todos de um IEO | Assinatura Ed25519 |
| `DELETE /api/consent/intent/:intent` | Revogar todos por intenção | Assinatura Ed25519 |

---

## Operações de Exchange

| Rota | Descrição | Auth |
|-------|-------------|------|
| `POST /api/exchange/records` | Enviar BioRecords | ConsentToken + Ed25519 |
| `GET /api/exchange/records` | Ler BioRecords | ConsentToken + Ed25519 |
| `POST /api/exchange/export` | Export soberano de dados (JSON/CSV/FHIR_R4) | ConsentToken + Ed25519 |

---

## Limites de Taxa

| Grupo de Rota | Limite |
|-------------|-------|
| Relayer BEO/IEO | 10 req/min |
| Leitura de query | 60 req/min por IP |
| Escritas de consentimento | 15 req/min por IP |
| Submit de exchange | 10 req/min por IP |
| Leitura de exchange | 30 req/min por IP |
| Export soberano | 5 req/min por IP |
| Convite de guardião | 5 req/min |

---

## Health Check

```
GET /health
→ { "status": "ok", "service": "bsp-registry-api", "version": "1.0.0" }
```

---

→ [Referência CLI](/pt/developers/cli) · [Referência SDK](/pt/developers/sdk-reference) · [Servidor MCP](/pt/developers/mcp)
