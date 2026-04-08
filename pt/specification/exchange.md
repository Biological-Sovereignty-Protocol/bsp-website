---
title: Protocolo de Troca BSP
---

# Protocolo de Troca BSP

> Versão 0.2 | Ambrósio Institute

---

## Visão Geral

O Protocolo de Troca BSP define como sistemas solicitam e respondem com dados biológicos — a camada de comunicação do protocolo.

Todas as operações de troca estão sujeitas ao contrato inteligente **AccessControl**. O consentimento do titular do BEO é exigido para toda transação de dados envolvendo seus dados biológicos.

---

## Princípio Central

> Nenhum sistema — laboratório, plataforma, motor de IA ou o próprio Ambrósio Institute — pode acessar um BEO sem autorização explícita do titular, aplicada pelo contrato inteligente AccessControl no Arweave.

O requisito de consentimento é **matemático**, não institucional. O contrato inteligente rejeita transações não autorizadas automaticamente — sem revisão humana, sem servidor de backend, sem confiança institucional necessária.

---

## Token de Consentimento

Antes de qualquer operação de troca, o sistema executor deve possuir um **ConsentToken** válido assinado pelo titular do BEO.

```typescript
ConsentToken {
  token_id:    string       // Unique token identifier
  beo_id:      string       // The BEO this token grants access to
  ieo_id:      string       // The institution this token is granted to
  intents:     BSPIntent[]  // Authorized operations (e.g. ["SUBMIT_RECORD"])
  categories:  string[]     // Authorized BSP categories (e.g. ["BSP-LA", "BSP-GL"])
  granted_at:  ISO8601      // When the holder granted this token
  expires_at:  ISO8601      // When this token expires (null = persistent)
  revoked:     boolean      // Whether this token has been revoked
  signature:   string       // Holder's cryptographic signature
  arweave_tx:  string       // Arweave transaction ID — the on-chain record
}
```

### Propriedades do Token

| Propriedade | Descrição |
|---|---|
| **Escopo definido** | Limitado a intenções e categorias de dados específicas |
| **Temporário** | Expira em `expires_at` — automaticamente inválido após esse prazo |
| **Revogável** | O titular pode revogar a qualquer momento, registrado on-chain |
| **Auditável** | Todas as concessões, usos e revogações permanentemente no Arweave |
| **Intransferível** | Tokens estão vinculados a um IEO específico — não podem ser compartilhados |

---

## Operações de Troca

### SUBMIT_RECORD

Envia uma medição biológica para um BEO.

**Consentimento necessário:** intenção `SUBMIT_RECORD` + categoria autorizada correspondente ao biomarcador

```typescript
// Request
SubmitRecordRequest {
  token:    ConsentToken    // Valid, non-expired, non-revoked consent token
  record:   BioRecord       // The BioRecord to submit
}

// Response
SubmitRecordResponse {
  success:    boolean
  record_id:  string        // Assigned record_id
  arweave_tx: string        // Arweave transaction ID — permanent record
  timestamp:  ISO8601
}
```

**Regras de validação:**
1. ConsentToken deve ser válido, não expirado e não revogado
2. `intents` do token deve incluir `SUBMIT_RECORD`
3. `categories` do token deve incluir a `category` do registro
4. `beo_id` do registro deve corresponder ao `beo_id` do token
5. O registro deve passar na validação de schema (todos os campos obrigatórios presentes)
6. O código do biomarcador deve existir na taxonomia BSP
7. O valor deve estar dentro de um intervalo fisiológico plausível

---

### READ_RECORDS

Lê BioRecords de um BEO.

**Consentimento necessário:** intenção `READ_RECORDS` + categorias autorizadas

```typescript
// Request
ReadRecordsRequest {
  token:      ConsentToken   // Valid consent token
  beo_id:     string
  filters: {
    categories:  string[]    // Filter by BSP category (optional)
    biomarkers:  string[]    // Filter by specific biomarker codes (optional)
    from:        ISO8601     // Records after this timestamp (optional)
    to:          ISO8601     // Records before this timestamp (optional)
    status:      RecordStatus // ACTIVE | SUPERSEDED | PENDING (default: ACTIVE)
    limit:       number      // Max records to return (default: 100)
    offset:      number      // Pagination offset
  }
}

// Response
ReadRecordsResponse {
  beo_id:   string
  records:  BioRecord[]
  total:    number
  has_more: boolean
}
```

---

### REQUEST_CONSENT

Uma instituição solicita um token de consentimento ao titular do BEO.

Esta operação é iniciada pela instituição, mas deve ser concluída pelo titular do BEO — o token não existe até que o titular assine.

```typescript
// Consent Request (sent to holder)
ConsentRequest {
  request_id:  string
  ieo_id:      string
  ieo_domain:  string       // e.g. "fleury.bsp"
  ieo_name:    string       // e.g. "Fleury Laboratórios"
  intents:     BSPIntent[]  // What access is being requested
  categories:  string[]     // Which data categories
  expires_in:  number       // Requested duration in seconds (null = persistent)
  reason:      string       // Human-readable explanation
}

// Holder response — grant
ConsentGrant {
  request_id: string
  token:      ConsentToken  // Signed by holder's private key
}

// Holder response — deny
ConsentDenial {
  request_id: string
  reason:     string        // Optional
}
```

---

### REVOKE_CONSENT

O titular do BEO revoga um token de consentimento previamente concedido.

```typescript
// Revocation (signed by holder)
ConsentRevocation {
  token_id:   string        // The token being revoked
  beo_id:     string
  reason:     string        // Optional
  revoked_at: ISO8601
  signature:  string        // Holder's signature
  arweave_tx: string        // On-chain record
}
```

Após a revogação, qualquer uso adicional do token é rejeitado pelo contrato inteligente AccessControl.

---

## Códigos de Erro

| Código | Descrição |
|---|---|
| `BSP-E-001` | Token de consentimento inválido ou ausente |
| `BSP-E-002` | Token expirado |
| `BSP-E-003` | Token revogado |
| `BSP-E-004` | Intenção não autorizada pelo token |
| `BSP-E-005` | Categoria não autorizada pelo token |
| `BSP-E-006` | BEO não encontrado |
| `BSP-E-007` | IEO não encontrado ou suspenso |
| `BSP-E-008` | Falha na validação do schema |
| `BSP-E-009` | Código de biomarcador não encontrado na taxonomia |
| `BSP-E-010` | Valor fora do intervalo fisiológico plausível |
| `BSP-E-011` | Falha de escrita no Arweave — tente novamente |
| `BSP-E-012` | Falha na verificação de assinatura |

---

## Uso do SDK

```typescript
// TypeScript — Submit a BioRecord
import { ExchangeClient, ConsentManager } from 'bsp-sdk'

// Check if we have a valid consent token
const consentManager = new ConsentManager({ ieoId: 'my-lab.bsp' })
const token = await consentManager.getToken(beoId)

if (!token || token.isExpired()) {
  // Request new consent from user
  const request = await consentManager.requestConsent(beoId, {
    intents: ['SUBMIT_RECORD'],
    categories: ['BSP-GL', 'BSP-HM'],
    expiresIn: 365 * 24 * 60 * 60  // 1 year
  })
  // User must approve — returns token when approved
  token = await consentManager.waitForApproval(request.request_id)
}

// Submit with valid token
const client = new ExchangeClient()
const result = await client.submit(record, token)
```

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
