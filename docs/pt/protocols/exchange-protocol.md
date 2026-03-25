<div class="page-hero-image">
  <img src="/images/exchange-protocol.jpg" alt="Exchange Protocol" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Protocolo de Troca

> "O BSP define o formato da conversa. O que cada sistema faz com ela é responsabilidade de cada um."

## Visão Geral

O Protocolo de Troca define como os dados biológicos se movem entre sistemas — o formato de requisições e respostas, o conjunto completo de operações tipadas (intents), o tratamento de erros e o modelo de autenticação dupla.

**O Protocolo de Troca define:**
- Schema de `BSPRequest` e `BSPResponse`
- Tipos de `BSPIntent` e seus parâmetros
- Autenticação via `ConsentToken` + assinatura IEO
- Todos os códigos de erro

**O Protocolo de Troca NÃO define:**
- O que os sistemas fazem com os dados recebidos
- Algoritmos de análise ou pontuação (ex. AVA, SVA)
- Infraestrutura de transporte (HTTP, WebSocket, etc.)

---

## Modelo de Requisição / Resposta

Toda interação é um ciclo `BSPRequest` → `BSPResponse`.

### Schema BSPRequest

```typescript
interface BSPRequest {
  request_id:  string      // UUID v4 — único por requisição (idempotência)
  bsp_version: string      // Versão do protocolo (semver) — ex. "1.0.0"
  timestamp:   string      // ISO8601

  requester: {
    ieo_id:    string      // UUID da instituição
    ieo_domain:string      // ex. "fleury.bsp"
    signature: string      // Assinatura Ed25519 de (request_id + timestamp + beo_id)
  }

  intent:      BSPIntent   // SUBMIT_RECORD | READ_RECORDS | ANALYZE_VITALITY | ...

  target: {
    beo_id:    string      // UUID do BEO alvo
    beo_domain:string      // ex. "andre.bsp"
  }

  auth: {
    consent_token_id: string
  }

  payload:     object      // Específico por intent (ver abaixo)
}
```

### Schema BSPResponse

```typescript
interface BSPResponse {
  request_id:  string                    // Eco do request_id original
  status:      "SUCCESS" | "ERROR" | "PARTIAL" | "PENDING"
  timestamp:   string

  payload:     object | null             // Resposta específica por intent

  error: {
    code:      string                    // Código de erro legível por máquina
    message:   string                    // Descrição legível por humano
    field:     string | null             // Campo específico (erros de validação)
    retryable: boolean
  } | null
}
```

---

## Autenticação Dupla

Toda BSPRequest é autenticada **duas vezes**:

1. **ConsentToken** — Prova da blockchain de que o titular do BEO autorizou este IEO para esta intent e categoria
2. **Assinatura IEO** — Assinatura criptográfica da instituição na requisição — prova que a instituição real enviou, não um impostor

```
AccessControl.verify(consent_token_id, ieo_id, beo_id, intent, category)
  → VÁLIDO: prosseguir  |  → INVÁLIDO: rejeitar com código de erro específico

IEO Signature.verify(request_id + timestamp + beo_id, ieo_public_key)
  → VÁLIDO: prosseguir  |  → INVÁLIDO: rejeitar com IEO_SIGNATURE_INVALID
```

---

## Referência de Intents

### `SUBMIT_RECORD` — Gravar um BioRecord

```javascript
// Payload da requisição
{
  records: [{
    biomarker:    "BSP-HM-001",
    value:        13.8,
    unit:         "g/dL",
    collected_at: "2026-02-26T08:00:00Z",
    ref_range: {
      optimal:    "13.5-17.5",
      functional: "12.0-17.5",
      deficiency: "<12.0",
      toxicity:   null
    }
  }]
}

// Resposta: record_ids (IDs de transação Arweave), enviados ao Arweave permanentemente
```

Envios em lote são suportados — múltiplos BioRecords em uma requisição reduzem os custos de transação no Arweave.

### `READ_RECORDS` — Ler BioRecords

```javascript
// Payload da requisição
{
  filters: {
    categories: ["BSP-LA", "BSP-HM"],
    period: { from: "2025-01-01", to: null },
    limit:  100,
    offset: 0
  }
}

// Resposta: registros paginados com IEO de origem, status, faixas de referência
```

### `ANALYZE_VITALITY` — Solicitar Análise AVA
Disponível apenas para IEOs do tipo PLATFORM integrados com AVA. Retorna a pontuação SVA multidimensional completa (idade biológica por sistema, velocidade de envelhecimento, percentil de reserva).

### `REQUEST_SCORE` — Solicitar Pontuação SVA
Retorna apenas a pontuação composta SVA. Usado principalmente por seguradoras com opt-in. Não aciona uma análise AVA completa.

### `EXPORT_DATA` — Exportar Todos os Dados

> [!IMPORTANT]
> `EXPORT_DATA` **não pode ser bloqueado, restringido ou negado** por nenhum sistema compatível com BSP. Qualquer sistema que recuse viola a especificação BSP.

Retorna todos os BioRecords no formato BSP, totalmente descriptografados, na escolha do usuário: `JSON`, `CSV` ou `FHIR_R4`.

### `SYNC_PROTOCOL` — Negociação de Versão
Usado para negociar compatibilidade de versão BSP entre cliente e servidor no início da sessão.

---

## Referência Completa de Códigos de Erro

| Código | Categoria | Descrição | Recuperável |
|------|----------|-------------|-----------|
| `TOKEN_NOT_FOUND` | Auth | ID do ConsentToken não existe | Não |
| `TOKEN_REVOKED` | Auth | Revogado pelo titular do BEO | Não |
| `TOKEN_EXPIRED` | Auth | `expires_at` passou | Não |
| `INTENT_NOT_AUTHORIZED` | Auth | Intent não está no escopo do token | Não |
| `CATEGORY_NOT_AUTHORIZED` | Auth | Categoria não está no escopo do token | Não |
| `IEO_SIGNATURE_INVALID` | Auth | Verificação de assinatura IEO falhou | Não |
| `IEO_NOT_FOUND` | Auth | Domínio IEO não está no registro | Não |
| `BEO_LOCKED` | Estado | BEO está em estado LOCKED | Não |
| `SCHEMA_VALIDATION_FAILED` | Dados | BioRecord falhou na validação de schema | Corrigir dados |
| `BIOMARKER_CODE_INVALID` | Dados | Código BSP não existe na taxonomia | Corrigir código |
| `UNIT_INVALID` | Dados | Unidade inválida para este biomarcador | Corrigir unidade |
| `DUPLICATE_RECORD` | Dados | Registro idêntico já existe | Não |
| `ARWEAVE_WRITE_FAILED` | Infra | Falha temporária de escrita no Arweave | **Sim** |
| `RATE_LIMIT_EXCEEDED` | Infra | Muitas requisições por minuto | **Sim** |
| `BSP_VERSION_MISMATCH` | Protocolo | Versão do cliente incompatível | Atualizar SDK |

---

## Exemplo com SDK

```python
from bsp_sdk import BSPClient

client = BSPClient(
    ieo_domain  = "seulaboratorio.bsp",
    private_key = SUA_CHAVE_PRIVADA,
)

# Enviar BioRecord
result = client.submit_biorecord(
    beo_domain    = "patient.bsp",
    consent_token = token_id,
    biomarker     = "BSP-HM-001",
    value         = 13.8,
    unit          = "g/dL",
    collected_at  = "2026-02-26T08:00:00Z",
    ref_range     = { "optimal": "13.5-17.5", "functional": "12.0-17.5" }
)
print(result.submission.record_ids)  # IDs permanentes no Arweave

# Ler Registros
records = client.read_records(
    beo_domain    = "patient.bsp",
    consent_token = token_id,
    filters       = {
        "categories": ["BSP-HM"],
        "period": { "from": "2025-01-01" }
    }
)
```
