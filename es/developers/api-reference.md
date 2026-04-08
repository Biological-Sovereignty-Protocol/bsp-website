---
title: "Referencia de la API"
description: "Referencia completa de la API REST del BSP Registry — 36 rutas para operaciones BEO, IEO, consentimiento, exchange y consulta."
---

# Referencia de la API Registry

URL Base: `https://api.biologicalsovereigntyprotocol.com`

La Registry API es un relayer gasless. Verifica firmas Ed25519 y retransmite transacciones a Arweave, pagando el gas por los usuarios.

---

## Operaciones BEO

| Ruta | Descripción | Auth |
|------|-------------|------|
| `POST /api/relayer/beo` | Crear nuevo BEO | Ed25519 |
| `POST /api/relayer/beo/lock` | Bloqueo de emergencia | Ed25519 |
| `POST /api/relayer/beo/unlock` | Desbloquear | Ed25519 |
| `POST /api/relayer/beo/destroy` | Erasure permanente (LGPD/GDPR) | Ed25519 |
| `POST /api/relayer/beo/rotate-key` | Rotar clave Ed25519 | Ed25519 |
| `POST /api/relayer/beo/recovery` | Actualizar config de recovery | Ed25519 |
| `POST /api/relayer/beo/request-recovery` | Iniciar Social Recovery | Público |
| `POST /api/relayer/consent` | Emitir ConsentToken | Ed25519 |

## Operaciones IEO

| Ruta | Descripción | Auth |
|------|-------------|------|
| `POST /api/ieo` | Crear nuevo IEO | Ed25519 |
| `POST /api/ieo/lock` | Bloqueo de emergencia | Ed25519 |
| `POST /api/ieo/unlock` | Desbloquear | Ed25519 |
| `POST /api/ieo/destroy` | Erasure permanente | Ed25519 |
| `POST /api/ieo/rotate-key` | Rotar clave | Ed25519 |
| `POST /api/ieo/contacts` | Actualizar endpoint/webhook | Ed25519 |
| `POST /api/ieo/recovery` | Actualizar config de recovery | Ed25519 |

## Consultas (Lectura)

| Ruta | Descripción |
|------|-------------|
| `GET /api/beos/:beoId` | BEO por UUID |
| `GET /api/beos/domain/:domain` | BEO por dominio .bsp |
| `GET /api/ieos` | Listar IEOs |
| `GET /api/ieos/:ieoId` | IEO por UUID |
| `GET /api/ieos/domain/:domain` | IEO por dominio .bsp |
| `GET /api/ieos/:ieoId/certification` | Verificar certificación |
| `GET /api/consent/:tokenId` | Verificar ConsentToken |
| `GET /api/consent/history/:beo_domain` | Historial de tokens |

## Revocación

| Ruta | Descripción | Auth |
|------|-------------|------|
| `DELETE /api/consent/:tokenId` | Revocar un token | Ed25519 |
| `DELETE /api/consent/all` | Revocar TODOS (emergencia) | Ed25519 |
| `DELETE /api/consent/ieo/:ieo_domain` | Revocar todos de un IEO | Ed25519 |
| `DELETE /api/consent/intent/:intent` | Revocar por intent | Ed25519 |

## Exchange

| Ruta | Descripción | Auth |
|------|-------------|------|
| `POST /api/exchange/records` | Enviar BioRecords | ConsentToken + Ed25519 |
| `GET /api/exchange/records` | Leer BioRecords | ConsentToken + Ed25519 |
| `POST /api/exchange/export` | Export soberano (JSON/CSV/FHIR_R4) | ConsentToken + Ed25519 |

---

→ [Referencia CLI](./cli) · [Referencia SDK](./sdk-reference) · [Servidor MCP](./mcp)
