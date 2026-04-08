---
title: "Referência da API"
description: "Referência completa da API REST do BSP Registry — 36 rotas para operações BEO, IEO, consentimento, exchange e consulta."
---

# Referência da API Registry

URL Base: `https://api.biologicalsovereigntyprotocol.com`

A Registry API é um relayer gasless. Verifica assinaturas Ed25519 e retransmite transações ao Arweave, pagando o gas pelos usuários. Não pode forjar ou modificar ações do usuário.

Todas as operações de escrita exigem payload assinado com `nonce` (16+ chars) e `timestamp` (ISO8601, máx 5 min).

---

## Operações BEO

| Rota | Descrição | Auth |
|------|-----------|------|
| `POST /api/relayer/beo` | Criar novo BEO | Ed25519 |
| `POST /api/relayer/beo/lock` | Bloqueio de emergência | Ed25519 |
| `POST /api/relayer/beo/unlock` | Desbloquear | Ed25519 |
| `POST /api/relayer/beo/destroy` | Erasure permanente (LGPD/GDPR) | Ed25519 |
| `POST /api/relayer/beo/rotate-key` | Rotacionar chave Ed25519 | Ed25519 |
| `POST /api/relayer/beo/recovery` | Atualizar config de recovery | Ed25519 |
| `POST /api/relayer/beo/request-recovery` | Iniciar Social Recovery | Público |
| `POST /api/relayer/consent` | Emitir ConsentToken | Ed25519 |

---

## Operações IEO

| Rota | Descrição | Auth |
|------|-----------|------|
| `POST /api/ieo` | Criar novo IEO | Ed25519 |
| `POST /api/ieo/lock` | Bloqueio de emergência | Ed25519 |
| `POST /api/ieo/unlock` | Desbloquear | Ed25519 |
| `POST /api/ieo/destroy` | Erasure permanente | Ed25519 |
| `POST /api/ieo/rotate-key` | Rotacionar chave | Ed25519 |
| `POST /api/ieo/contacts` | Atualizar endpoint/webhook | Ed25519 |
| `POST /api/ieo/recovery` | Atualizar config de recovery | Ed25519 |

---

## Consultas (Leitura)

Sem autenticação — lê estado público do Arweave.

| Rota | Descrição |
|------|-----------|
| `GET /api/beos/:beoId` | BEO por UUID |
| `GET /api/beos/domain/:domain` | BEO por domínio .bsp |
| `GET /api/ieos` | Listar IEOs (filtros: status, ieoType, certLevel) |
| `GET /api/ieos/:ieoId` | IEO por UUID |
| `GET /api/ieos/domain/:domain` | IEO por domínio .bsp |
| `GET /api/ieos/:ieoId/certification` | Verificar certificação |
| `GET /api/consent/:tokenId` | Verificar ConsentToken |
| `GET /api/consent/history/:beo_domain` | Histórico de tokens |

---

## Revogação de Consentimento

| Rota | Descrição | Auth |
|------|-----------|------|
| `DELETE /api/consent/:tokenId` | Revogar um token | Ed25519 |
| `DELETE /api/consent/all` | Revogar TODOS (emergência) | Ed25519 |
| `DELETE /api/consent/ieo/:ieo_domain` | Revogar todos de um IEO | Ed25519 |
| `DELETE /api/consent/intent/:intent` | Revogar por intent | Ed25519 |

---

## Operações Exchange

| Rota | Descrição | Auth |
|------|-----------|------|
| `POST /api/exchange/records` | Submeter BioRecords | ConsentToken + Ed25519 |
| `GET /api/exchange/records` | Ler BioRecords | ConsentToken + Ed25519 |
| `POST /api/exchange/export` | Export soberano (JSON/CSV/FHIR_R4) | ConsentToken + Ed25519 |

---

## Rate Limits

| Grupo | Limite |
|-------|--------|
| Relayer BEO/IEO | 10 req/min |
| Leituras | 60 req/min por IP |
| Escrita de consent | 15 req/min por IP |
| Exchange submit | 10 req/min por IP |
| Exchange read | 30 req/min por IP |
| Export soberano | 5 req/min por IP |

---

→ [Referência CLI](./cli) · [Referência SDK](./sdk-reference) · [Servidor MCP](./mcp)
