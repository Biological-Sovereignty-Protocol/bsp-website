---
title: BioRecord — Objeto de Medição Biológica
---

# BioRecord — Objeto de Medição Biológica

> Versão 0.2 | Ambrósio Institute

---

## Visão Geral

Toda medição biológica no ecossistema BSP é representada como um **BioRecord**.

BioRecords são as unidades atômicas de dados biológicos. Todo resultado de exame de sangue, leitura de wearable, marcador genômico ou avaliação clínica que entra no ecossistema BSP é estruturado como um BioRecord.

---

## Schema do BioRecord

```typescript
BioRecord {
  // ─── IDENTIDADE ────────────────────────────────────────────────
  record_id:    string      // Identificador único deste registro (UUID v4)
  beo_id:       string      // A entidade biológica à qual este registro pertence
  version:      semver      // Versão BSP deste registro

  // ─── TEMPO ─────────────────────────────────────────────────────
  timestamp:    ISO8601     // Quando esta medição foi realizada (não quando foi enviada)
  submitted_at: ISO8601     // Quando este registro foi gravado no Arweave

  // ─── FONTE ─────────────────────────────────────────────────────
  source:       SourceMeta  // Quem produziu esta medição

  // ─── TAXONOMIA ─────────────────────────────────────────────────
  category:     string      // Código de categoria da taxonomia BSP (ex: "BSP-LA")
  biomarker:    string      // Código de biomarcador BSP padronizado (ex: "BSP-LA-004")
  level:        BioLevel    // CORE | STANDARD | EXTENDED | DEVICE

  // ─── MEDIÇÃO ───────────────────────────────────────────────────
  value:        number | string  // O valor medido
  unit:         string           // Unidade padronizada (SI ou definida pelo BSP)
  ref_range:    RangeObject      // Faixas de referência ótimas e funcionais

  // ─── QUALIDADE ─────────────────────────────────────────────────
  confidence:   float       // Confiança da medição de 0.0 a 1.0
  status:       RecordStatus // ACTIVE | SUPERSEDED | PENDING

  // ─── CORREÇÕES ─────────────────────────────────────────────────
  supersedes:   string | null  // record_id do registro corrigido, se aplicável

  // ─── CRIPTOGRAFIA ──────────────────────────────────────────────
  signature:    string      // Assinatura criptográfica da entidade que enviou
}

SourceMeta {
  ieo_id:      string      // Identificador IEO da instituição que enviou
  ieo_domain:  string      // ex: "fleury.bsp"
  method:      string      // Método de medição (ex: "HPLC", "imunoensaio")
  equipment:   string      // Identificador do equipamento (opcional)
  operator:    string      // Referência do operador de laboratório (opcional, anonimizado)
}

RangeObject {
  optimal_low:    number   // Limite inferior da faixa ótima
  optimal_high:   number   // Limite superior da faixa ótima
  functional_low: number   // Limite inferior da faixa funcional (sem risco imediato)
  functional_high: number  // Limite superior da faixa funcional
  critical_low:   number   // Abaixo disso = atenção clínica imediata
  critical_high:  number   // Acima disso = atenção clínica imediata
  unit:           string   // Mesma unidade do registro pai
  population:     string   // População de referência para esta faixa
}
```

---

## Valores de BioLevel

| Nível | Código | Descrição |
|---|---|---|
| Core | `CORE` | Biomarcadores avançados de longevidade e envelhecimento biológico (L1) |
| Standard | `STANDARD` | Biomarcadores laboratoriais de rotina realizados no mundo todo (L2) |
| Extended | `EXTENDED` | Biomarcadores clínicos e de pesquisa especializados (L3) |
| Device | `DEVICE` | Dados biométricos contínuos de dispositivos wearables (L4) |

---

## Valores de RecordStatus

| Status | Descrição |
|---|---|
| `ACTIVE` | Este é o registro atual e válido |
| `SUPERSEDED` | Este registro foi corrigido por um registro mais recente |
| `PENDING` | Enviado, mas aguardando confirmação (ex: sincronização de dispositivo) |

---

## Imutabilidade e Correções

BioRecords são **imutáveis após serem escritos**. Não podem ser alterados ou excluídos após o envio ao Arweave.

Quando uma correção é necessária (ex: erro de transcrição em laboratório), o valor corrigido é enviado como um **novo BioRecord** que substitui o original:

```typescript
// Registro corrigido
{
  record_id:    "new-uuid-...",
  beo_id:       "550e8400-...",
  status:       "ACTIVE",
  supersedes:   "original-uuid-...",   // Referência ao registro incorreto
  biomarker:    "BSP-GL-001",
  value:        94,
  // ...
}

// Registro original (atualizado automaticamente on-chain)
{
  record_id:    "original-uuid-...",
  status:       "SUPERSEDED",          // Status atualizado para SUPERSEDED
  // ... dados originais preservados
}
```

A trilha de auditoria completa — incluindo o valor original incorreto — é preservada permanentemente no Arweave.

---

## Enviando um BioRecord

Qualquer sistema pode enviar um BioRecord para um BEO — sujeito ao consentimento do titular via AccessControl.

```typescript
// SDK TypeScript
import { BioRecordBuilder, ExchangeClient } from 'bsp-sdk'

const record = new BioRecordBuilder()
  .beoId('550e8400-e29b-41d4-a716-446655440000')
  .biomarker('BSP-GL-001')           // Glicose em jejum
  .value(94)
  .unit('mg/dL')
  .timestamp('2026-02-24T08:30:00Z')
  .refRange({
    optimal_low: 70,
    optimal_high: 90,
    functional_low: 60,
    functional_high: 100,
    critical_low: 40,
    critical_high: 180,
    unit: 'mg/dL',
    population: 'adult-general'
  })
  .confidence(0.99)
  .build()

const client = new ExchangeClient({ ieoId: 'my-lab.bsp' })
const result = await client.submit(record)
```

```python
# SDK Python
from bsp_sdk import BioRecordBuilder, ExchangeClient

record = (BioRecordBuilder()
    .beo_id("550e8400-e29b-41d4-a716-446655440000")
    .biomarker("BSP-GL-001")
    .value(94)
    .unit("mg/dL")
    .timestamp("2026-02-24T08:30:00Z")
    .confidence(0.99)
    .build())

client = ExchangeClient(ieo_id="my-lab.bsp")
result = client.submit(record)
```

---

## Códigos de Biomarcadores

Todo biomarcador na taxonomia BSP tem um código padronizado no formato:

```
BSP-[CATEGORY]-[NUMBER]
```

Exemplos:
- `BSP-LA-004` — NAD+ (categoria Longevidade e Envelhecimento, marcador #004)
- `BSP-GL-001` — Glicose em Jejum (categoria Glicemia e Metabólico, marcador #001)
- `BSP-DV-001` — Variabilidade da Frequência Cardíaca (categoria Device, marcador #001)

→ Veja [Taxonomia de Biomarcadores](taxonomy/level-1-core) para a referência completa de biomarcadores.

---

## Exemplo de BioRecord (JSON)

```json
{
  "record_id": "7b3f9a12-4c8e-4d21-b6f0-1a9e8c7d5b2a",
  "beo_id": "550e8400-e29b-41d4-a716-446655440000",
  "version": "0.2.0",
  "timestamp": "2026-02-24T08:30:00Z",
  "submitted_at": "2026-02-24T09:15:00Z",
  "source": {
    "ieo_id": "9f1a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
    "ieo_domain": "fleury.bsp",
    "method": "colorimetric-enzymatic",
    "equipment": "Roche Cobas 8000"
  },
  "category": "BSP-GL",
  "biomarker": "BSP-GL-001",
  "level": "STANDARD",
  "value": 94,
  "unit": "mg/dL",
  "ref_range": {
    "optimal_low": 70,
    "optimal_high": 90,
    "functional_low": 60,
    "functional_high": 100,
    "critical_low": 40,
    "critical_high": 180,
    "unit": "mg/dL",
    "population": "adult-general"
  },
  "confidence": 0.99,
  "status": "ACTIVE",
  "supersedes": null,
  "signature": "ed25519:9xK2Lm..."
}
```

→ Exemplo completo: [`../examples/biorecord-example.json`](../examples/biorecord-example.json)

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
