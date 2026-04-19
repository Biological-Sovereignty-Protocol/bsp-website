---
title: "Referencia API"
description: "Referencia REST completa de la API del Registry BSP — 38 rutas para operaciones de BEO, IEO, consentimiento, exchange y queries."
lang: es
---

# Referencia API del Registry

URL base: `https://api.biologicalsovereigntyprotocol.com`

La Registry API es un relayer gasless. Verifica firmas Ed25519 y retransmite transacciones a Arweave, pagando el gas en nombre de los usuarios. No puede falsificar ni modificar acciones del usuario.

Toda operación de escritura requiere payload firmado con `nonce` (16+ caracteres) y `timestamp` (ISO8601, máx 5 min de antigüedad).

---

## Operaciones de BEO

Todas las rutas en `POST /api/relayer/beo/...`

| Ruta | Descripción | Auth |
|-------|-------------|------|
| `POST /api/relayer/beo` | Crear nuevo BEO | Firma Ed25519 |
| `POST /api/relayer/beo/lock` | Bloqueo de emergencia | Firma Ed25519 |
| `POST /api/relayer/beo/unlock` | Desbloquear | Firma Ed25519 |
| `POST /api/relayer/beo/destroy` | Borrado permanente (LGPD/GDPR) | Firma Ed25519 |
| `POST /api/relayer/beo/rotate-key` | Rotar llave Ed25519 | Firma Ed25519 |
| `POST /api/relayer/beo/recovery` | Actualizar configuración de recovery | Firma Ed25519 |
| `POST /api/relayer/beo/request-recovery` | Iniciar Social Recovery | Público |
| `POST /api/relayer/beo/revoke-all` | Revocar todos los tokens de un BEO | Firma Ed25519 |
| `POST /api/relayer/consent` | Otorgar ConsentToken | Firma Ed25519 |

### Formato de payload (ejemplo: createBEO)

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

La `signature` se computa sobre: `JSON.stringify(sortedKeys({ function: "createBEO", domain, publicKey, recovery, nonce, timestamp }))`.

---

## Operaciones de IEO

Todas las rutas en `POST /api/ieo/...`

| Ruta | Descripción | Auth |
|-------|-------------|------|
| `POST /api/ieo` | Crear nuevo IEO | Firma Ed25519 |
| `POST /api/ieo/lock` | Bloqueo de emergencia | Firma Ed25519 |
| `POST /api/ieo/unlock` | Desbloquear | Firma Ed25519 |
| `POST /api/ieo/destroy` | Borrado permanente | Firma Ed25519 |
| `POST /api/ieo/rotate-key` | Rotar llave Ed25519 | Firma Ed25519 |
| `POST /api/ieo/contacts` | Actualizar endpoint API / webhook | Firma Ed25519 |
| `POST /api/ieo/recovery` | Actualizar configuración de recovery | Firma Ed25519 |
| `POST /api/ieo/approve` | Aprobar propuesta de gobernanza (multisig 2-de-3) | X-Institute-Key |
| `POST /api/ieo/certification` | Actualizar nivel de certificación del IEO | X-Institute-Key |

---

## Operaciones de Guardian

Todas las rutas en `/api/guardian/...`

| Ruta | Descripción | Auth |
|-------|-------------|------|
| `POST /api/guardian/invite` | Titular del BEO invita a un guardián | Firma Ed25519 |
| `GET /api/guardian/accept/:token` | Renderizar página de aceptación | Público |
| `POST /api/guardian/accept/:token` | Guardián acepta y registra llave pública Ed25519 | Público |
| `GET /api/guardian/confirm-recovery/:token` | Renderizar confirmación de recovery | Público |
| `POST /api/guardian/confirm-recovery/:token` | Guardián confirma recovery (threshold 2-de-3 dispara rotación) | Público |

---

## Operaciones de Query (solo lectura)

Sin autenticación — lee estado público en Arweave.

| Ruta | Descripción |
|-------|-------------|
| `GET /api/beos/:beoId` | Obtener BEO por UUID |
| `GET /api/beos/domain/:domain` | Resolver BEO por dominio .bsp |
| `GET /api/ieos` | Listar IEOs (filtros: status, ieoType, certLevel) |
| `GET /api/ieos/:ieoId` | Obtener IEO por UUID |
| `GET /api/ieos/domain/:domain` | Resolver IEO por dominio .bsp |
| `GET /api/ieos/:ieoId/certification` | Verificar certificación del IEO |
| `GET /api/consent/:tokenId` | Verificar ConsentToken |
| `GET /api/consent/history/:beo_domain` | Historial completo de tokens |

---

## Revocación de Consentimiento

| Ruta | Descripción | Auth |
|-------|-------------|------|
| `DELETE /api/consent/:tokenId` | Revocar un token | Firma Ed25519 |
| `DELETE /api/consent/all` | Revocar TODOS los tokens (emergencia) | Firma Ed25519 |
| `DELETE /api/consent/ieo/:ieo_domain` | Revocar todos de un IEO | Firma Ed25519 |
| `DELETE /api/consent/intent/:intent` | Revocar todos por intención | Firma Ed25519 |

---

## Operaciones de Exchange

| Ruta | Descripción | Auth |
|-------|-------------|------|
| `POST /api/exchange/records` | Enviar BioRecords | ConsentToken + Ed25519 |
| `GET /api/exchange/records` | Leer BioRecords | ConsentToken + Ed25519 |
| `POST /api/exchange/export` | Export soberano de datos (JSON/CSV/FHIR_R4) | ConsentToken + Ed25519 |

---

## Límites de Tasa

| Grupo de Ruta | Límite |
|-------------|-------|
| Relayer BEO/IEO | 10 req/min |
| Lectura de query | 60 req/min por IP |
| Escrituras de consentimiento | 15 req/min por IP |
| Submit de exchange | 10 req/min por IP |
| Lectura de exchange | 30 req/min por IP |
| Export soberano | 5 req/min por IP |
| Invitación de guardián | 5 req/min |

---

## Health Check

```
GET /health
→ { "status": "ok", "service": "bsp-registry-api", "version": "1.0.0" }
```

---

→ [Referencia CLI](/es/developers/cli) · [Referencia SDK](/es/developers/sdk-reference) · [Servidor MCP](/es/developers/mcp)
