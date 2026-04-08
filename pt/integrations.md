---
title: Integrações BSP — Conecte Seu App ao Protocolo
description: Integre o Biological Sovereignty Protocol ao seu app de saúde, prontuário eletrônico, wearable ou plataforma de pesquisa. SDKs oficiais, guias de API e ferramentas de parceiros.
sidebar: false
---

# Integrações

Conecte sua aplicação ao BSP. Seja para construir um app de saúde, integrar um sistema de prontuário eletrônico ou criar uma plataforma de IA para longevidade, o BSP fornece as ferramentas necessárias.

## SDKs Oficiais

### TypeScript / JavaScript

```bash
npm install bsp-sdk
```

Referência completa: [Referência do SDK](/pt/developers/sdk-reference)

### Python

```bash
pip install bsp-sdk
```

### REST API

O BSP fornece uma REST API para sistemas que não podem usar um SDK diretamente.

```
POST /v1/beo/create
GET  /v1/beo/{id}/biorecords
POST /v1/biorecord/upload
POST /v1/consent/grant
DELETE /v1/consent/{token_id}
```

---

## Padrões de Integração

### Padrão 1 — Exportação de Prontuário Eletrônico

Exporte dados do paciente do seu sistema de prontuário eletrônico para um BioRecord BSP. O paciente recebe propriedade criptográfica dos dados.

```typescript
import { BSPClient } from 'bsp-sdk'

const client = new BSPClient({ network: 'mainnet' })

const bioRecord = await client.bioRecord.create({
  beoId: patient.bspId,
  data: fhirBundle,
  sourceType: 'ehr-export',
})

await client.bioRecord.store(bioRecord) // stores on Arweave
```

### Padrão 2 — Dados de Wearables

Transmita dados contínuos de biomarcadores de wearables e dispositivos IoT para o BEO do paciente.

```typescript
const stream = client.bioRecord.stream({
  beoId: user.bspId,
  interval: '1m',
})

wearable.on('data', (reading) => {
  stream.push({
    biomarkerId: 'heart_rate',
    value: reading.hr,
    unit: 'bpm',
    timestamp: Date.now(),
  })
})
```

### Padrão 3 — Solicitação de Acesso para Pesquisa

Solicite consentimento para acessar dados biológicos anonimizados para um estudo de pesquisa.

```typescript
const request = await client.consent.request({
  ieoId: 'research_institution.bsp',
  dataFields: ['blood_glucose', 'hba1c'],
  duration: '90d',
  purpose: 'Type 2 Diabetes prevention study',
})

// Patient approves via their BSP wallet — no action needed from your side
```

---

## Integrações do Ecossistema

| Plataforma | Status | Observações |
|---|---|---|
| Apple Health | Planejado | Adaptador de exportação BioRecord |
| Google Fit | Planejado | Adaptador de exportação BioRecord |
| Epic (FHIR R4) | Em andamento | Bridge FHIR-para-BEO |
| Oura Ring | Comunidade | GitHub: bsp-oura-adapter |
| Garmin | Comunidade | GitHub: bsp-garmin-adapter |
| Withings | Comunidade | GitHub: bsp-withings-adapter |

---

## Certificação

Aplicações que integram o BSP podem solicitar o status **BSP Certified**, que verifica:

- Implementação correta do modelo de consentimento
- Conformidade adequada com o formato de dados
- Auditoria de segurança

[Processo de Certificação](/pt/developers/certification)

---

## Precisa de Ajuda?

- [Guia de Início Rápido](/pt/getting-started/quickstart)
- [Referência do SDK](/pt/developers/sdk-reference)
- [Exemplos JSON](/pt/developers/examples)
- [GitHub Discussions](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/discussions)

---

*Veja também: [Guia de Implementação](/pt/developers/implementation-guide) · [Tutoriais](/pt/developers/tutorials)*
