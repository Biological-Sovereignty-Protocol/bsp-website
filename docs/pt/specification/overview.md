---
title: Visão Geral da Especificação
---

<div class="page-hero-image">
  <img src="/images/spec-overview.png" alt="BSP Specification Overview — protocol architecture" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>


# Arquitetura BSP — As Três Camadas

> Versão 0.2 | Ambrósio Institute

---

## Visão Geral

O Protocolo de Soberania Biológica é organizado em três camadas distintas. Cada camada tem uma responsabilidade claramente definida e foi projetada para ser independente — mudanças em uma camada não quebram implementações de outra.

```
┌─────────────────────────────────────────────────────────┐
│                  CAMADA DE INTELIGÊNCIA                  │
│         AVA · SVA · Algoritmos de terceiros             │
│    (acima do protocolo — não definida pelo BSP)         │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│              CAMADA 3 — BSP-Exchange                     │
│           Protocolo de Comunicação                      │
│   Como sistemas solicitam e respondem com dados biológicos │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│              CAMADA 2 — BSP-Data                         │
│           Schema de Dados Biológicos                    │
│   Estrutura de todas as medições biológicas (BioRecord) │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│              CAMADA 1 — BSP-Identity                     │
│           Identidade Biológica                          │
│   O objeto de identidade soberana — BEO                 │
│   Armazenado no Arweave — permanente, descentralizado   │
└─────────────────────────────────────────────────────────┘
```

---

## Camada 1 — BSP-Identity

**O que define:** Quem detém os dados.

Todo indivíduo e toda instituição no ecossistema BSP tem uma identidade permanente e descentralizada:
- **BEO** — Biological Entity Object (indivíduo)
- **IEO** — Institutional Entity Object (laboratório, hospital, plataforma, etc.)

O BEO é o centro de gravidade de todo o protocolo. Cada BioRecord, cada consentimento, cada interação está ancorado a um BEO.

BEOs e IEOs são armazenados na blockchain **Arweave** — permanentes e descentralizados. Nenhuma empresa, governo ou o próprio Ambrósio Institute pode excluir ou alterar uma identidade registrada.

→ Veja [`beo.md`](beo.md) e [`ieo.md`](ieo.md) para especificações completas.

---

## Camada 2 — BSP-Data

**O que define:** O que os dados contêm.

Toda medição biológica — um resultado de exame de sangue, um marcador genômico, uma leitura de wearable, uma avaliação clínica — é representada como um **BioRecord**.

BioRecords são as unidades atômicas de dados biológicos no ecossistema BSP. Eles são:
- **Imutáveis** — uma vez escritos, não podem ser alterados
- **Ancorados** — todo BioRecord pertence a um BEO específico
- **Classificados** — todo BioRecord carrega um código de taxonomia BSP
- **Assinados** — todo BioRecord carrega uma assinatura criptográfica da entidade que o enviou

→ Veja [`biorecord.md`](biorecord.md) para a especificação completa do BioRecord.
→ Veja [Taxonomia de Biomarcadores](taxonomy/level-1-core) para a taxonomia completa de biomarcadores.

---

## Camada 3 — BSP-Exchange

**O que define:** Como os dados se movem.

O Protocolo de Troca BSP define o formato de requisições e respostas entre sistemas:
- Como qualquer sistema envia dados para um BEO
- Como uma plataforma solicita acesso de leitura
- Como um motor de IA consulta um histórico biológico
- Como tokens de consentimento são estruturados e verificados

Todas as operações de troca estão sujeitas ao contrato inteligente **AccessControl** — o consentimento do titular do BEO é exigido para toda transação de dados.

→ Veja [`exchange.md`](exchange.md) para a especificação completa do Protocolo de Troca.

---

## Infraestrutura Descentralizada

Os registros BSP são armazenados no **Arweave** — um protocolo de armazenamento permanente e descentralizado projetado para preservar dados por mais de 200 anos.

Contratos inteligentes gerenciando identidades de BEO, registros de domínio e permissões de acesso são implantados via SmartWeave no Arweave. Isso garante:
- Nenhum ponto único de falha
- Nenhuma empresa (incluindo o Ambrósio Institute) pode alterar as regras unilateralmente
- Dados gravados na infraestrutura BSP existem permanentemente

Os cinco contratos inteligentes na infraestrutura BSP:

| Contrato | Finalidade |
|---|---|
| **BEORegistry** | Cria e gerencia identidades biológicas — aberto a qualquer pessoa |
| **IEORegistry** | Gerencia identidades institucionais e status de certificação |
| **DomainRegistry** | Controla o namespace `.bsp` — garante unicidade |
| **AccessControl** | Gerencia tokens de consentimento — o verdadeiro guardião do protocolo |
| **Governance** | Autorização multi-assinatura para mudanças críticas do protocolo |

→ Veja [`bsp-domain.md`](bsp-domain.md) para o sistema de domínio `.bsp`.
→ Veja [`governance.md`](governance.md) para o modelo de governança.

---

## A Camada de Inteligência (Acima do BSP)

A camada de inteligência **não faz parte da especificação BSP**.

O BSP define como os dados são estruturados e transportados — não quais conclusões tirar deles. Camadas de inteligência como:
- Algoritmo de Vitalidade Ambrósio (AVA)
- Score de Vitalidade Ambrósio (SVA)
- Qualquer motor analítico de terceiros

...operam acima do protocolo, consumindo dados BSP padronizados para produzir insights. Qualquer sistema no mundo pode implementar o BSP. Apenas a Ambrósio detém a AVA.

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
