---
title: BSP vs FHIR vs HL7 — Comparativo de Padroes de Dados de Saude
description: Compare o Biological Sovereignty Protocol (BSP) com FHIR, HL7, OpenEHR e outros padroes de dados de saude. Entenda qual protocolo oferece propriedade real dos seus dados.
sidebar: false
---

# BSP vs FHIR vs HL7 vs OpenEHR

Um comparativo pratico entre padroes abertos de dados de saude — o que cada um resolve, quem controla os dados e onde o BSP se encaixa.

## Tabela Resumo

| Recurso | BSP | FHIR (R4/R5) | HL7 v2/v3 | OpenEHR |
|---|---|---|---|---|
| **Propriedade dos dados** | Paciente (criptografica) | Instituicao | Instituicao | Instituicao |
| **Armazenamento permanente** | Arweave (imutavel) | Depende do servidor | Depende do servidor | Depende do servidor |
| **Modelo de privacidade** | Consent tokens on-chain | OAuth/SMART | ACL | Baseado em papeis |
| **Interoperabilidade** | Padrao aberto | Padrao aberto | Padrao aberto | Padrao aberto |
| **Vendor lock-in** | Nenhum | Possivel | Alto | Baixo |
| **Taxas de API** | Nenhuma | Possivel | Altas | Baixas |
| **Longevidade** | Permanente (blockchain) | Depende do fornecedor | Depende do fornecedor | Depende do fornecedor |
| **Pronto para IA/ML** | Nativo (BioRecord) | Parcial | Limitado | Parcial |
| **SDK para devs** | TypeScript + Python | Varios | Varios | Alguns |
| **Licenca** | MIT (aberta) | HL7 IP | HL7 IP | Apache 2.0 |

## O que e FHIR?

FHIR (Fast Healthcare Interoperability Resources) e um padrao HL7 para troca eletronica de informacoes de saude. Define formatos de dados e APIs usados por hospitais, seguradoras e fornecedores de prontuarios eletronicos.

**FHIR e excelente para:** interoperabilidade entre instituicoes de saude.

**FHIR nao resolve:** propriedade dos dados pelo paciente, armazenamento permanente ou liberdade de intermediarios de API.

## O que e HL7?

HL7 (Health Level 7) e um conjunto de padroes internacionais para transferencia de dados clinicos e administrativos entre aplicacoes de software. O HL7 v2 ainda e o formato de mensagens mais usado em hospitais.

**HL7 e excelente para:** integracao com sistemas legados de saude.

**HL7 nao resolve:** soberania moderna de dados, consentimento do paciente ou controle de acesso descentralizado.

## O que e OpenEHR?

OpenEHR e um padrao aberto para prontuarios eletronicos de saude. Usa arquetipos e templates para modelar conhecimento clinico de forma independente de qualquer fornecedor.

**OpenEHR e excelente para:** modelos padronizados de dados clinicos.

**OpenEHR nao resolve:** propriedade criptografica, armazenamento imutavel ou consentimento controlado pelo paciente.

## Onde o BSP se encaixa

O BSP nao substitui FHIR ou HL7 dentro dos hospitais. O BSP resolve um problema diferente: **quem e o dono dos dados quando eles saem do sistema de saude**.

O BSP atua na **camada de soberania** — dando aos individuos propriedade criptografica sobre seus dados biologicos, independente de qual sistema de prontuario os gerou.

```
Hospital EHR (FHIR/HL7)
        ↓
  BSP Export (BEO + BioRecord)
        ↓
  Arweave Permanent Storage
        ↓
  Patient-Controlled Access
        ↓
  AI / Research / Longevity Apps
```

## Conceitos do BSP nao encontrados em outros padroes

- **BEO (Biological Entity Object)** — a identidade criptografica de um organismo vivo
- **IEO (Institutional Entity Object)** — como instituicoes interagem com dados biologicos
- **ConsentToken** — consentimento on-chain que nao pode ser revogado sem a assinatura do paciente
- **BioRecord** — formato padronizado de dados de biomarcadores em serie temporal
- **Integracao com Arweave** — dados armazenados permanentemente, independente de qualquer API

## FAQ

**O BSP funciona junto com FHIR?**
Sim. Exportacoes BSP podem ser geradas a partir de recursos FHIR. Os dois sao complementares.

**O BSP e um protocolo blockchain?**
O BSP usa Arweave para armazenamento permanente e consentimento on-chain. O protocolo em si e um padrao de dados — os detalhes de implementacao sao abertos.

**Quem controla o BSP?**
O BSP e governado por BIPs (Biological Improvement Proposals), modelados a partir do processo EIP do Ethereum. Nenhuma empresa controla sozinha.

---

*Veja tambem: [O que e BSP?](/pt/what-is-bsp) · [Visao Geral da Especificacao](/pt/specification/overview) · [Whitepaper](/pt/whitepaper)*
