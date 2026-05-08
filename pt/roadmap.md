---
title: Roadmap do BSP
description: Roadmap de 5 anos (2026–2030) — milestones trimestrais com critérios binários de conclusão, sincronizado com o Whitepaper v3.0 Parte VI.
lang: pt
---

<div class="page-hero-image">
  <img src="/images/roadmap-hero.jpg" alt="Roadmap do BSP" loading="lazy" />
</div>

# Roadmap do BSP

> Este roteiro está sincronizado com [Whitepaper v3.0 — Parte VI](/pt/whitepaper#parte-vi-o-horizonte). Para contexto estratégico completo (estratégia de adoção, modos de falha), veja o whitepaper.

## Nota preliminar — sobre prever o futuro

Roadmaps de protocolos descentralizados são notórios por envelhecer mal. O roadmap original do Filecoin, escrito em 2017, prometia mainnet para 2018 — chegou em 2020. O Ethereum 2.0, especificado em 2018, ainda estava sendo entregue em fragmentos em 2024. Todo whitepaper que se respeita carrega a humildade de saber que o tempo se vinga das previsões.

O que se segue, portanto, **não é predição** — é **aspiração ancorada em hipóteses verificáveis**. Cada milestone é uma aposta. Cada data é provisória. O que importa não é se acertaremos os prazos, mas se as **direções** continuam corretas conforme aprendermos.

O roadmap abaixo cobre 2026–2030. É organizado por **milestones técnicos** (verificáveis on-chain), **milestones de adoção** (verificáveis em métricas públicas) e **milestones institucionais** (verificáveis em publicações e parcerias). Cada milestone tem um critério binário de conclusão.

---

## Ano 1 — 2026 — Fundação Operacional

A meta deste ano é **sair do estado pré-mainnet** e estabelecer a infraestrutura mínima viável. Estamos em ~95% de prontidão técnica em fevereiro de 2026; o trabalho restante é multisig, segurança operacional e os primeiros usuários reais.

| Trimestre | Milestone | Critério de conclusão |
|-----------|-----------|----------------------|
| Q1 2026 | Deployment Aptos mainnet com multisig 2-of-3 ativo (BIP-0001) | Contratos publicados, owner = multisig address, transação on-chain verificável |
| Q1 2026 | Auditoria externa do contrato Move | Relatório público publicado por firma independente (Trail of Bits, Zellic ou OtterSec) |
| Q2 2026 | bsp-id-web em produção | alice.bsp e domínio próprio funcionais, primeiros 1.000 BEOs criados |
| Q2 2026 | Documentação técnica completa | Whitepaper v3 publicado, especificação Move, guias de relayer self-hosted |
| Q3 2026 | SDKs estáveis (TypeScript v3.0, Python v2.1) | Versões publicadas em npm e PyPI, exemplos de integração documentados |
| Q3 2026 | Programa BSP Certified Level 1 lançado | Especificação pública dos critérios, primeiras certificações emitidas |
| Q4 2026 | Parcerias-piloto com 3 laboratórios | LOIs assinados, integrações em ambiente de homologação, primeiros BioRecords reais |
| Q4 2026 | 10.000 BEOs ativos | Métrica on-chain pública, dashboard de transparência |

**Risco principal:** atraso na auditoria. **Mitigação:** contratos de auditoria assinados em Q4 2025, com janelas reservadas.

---

## Ano 2 — 2027 — Validação Científica

Em 2027, o foco muda de infraestrutura para **legitimidade científica**. Sem peer review, o BSP é apenas mais um protocolo cripto promissor. Com peer review, vira referência.

| Trimestre | Milestone | Critério de conclusão |
|-----------|-----------|----------------------|
| Q1 2027 | Submissão peer review do AVA methodology | Manuscript submetido a Nature Aging, Aging Cell ou Cell Metabolism |
| Q2 2027 | Validation studies iniciados | MOUs com UK Biobank e ELSA-Brasil, IRBs aprovados |
| Q2 2027 | 25.000 BEOs ativos | Métrica on-chain |
| Q3 2027 | 5 IEOs certificados Level 2 | Selos públicos, integração em produção |
| Q3 2027 | Apps móveis nativos beta | iOS e Android com gerenciamento local de chaves |
| Q4 2027 | Publicação peer-reviewed AVA | Paper aceito (não apenas submetido) |
| Q4 2027 | 50.000 BEOs ativos | Métrica on-chain |

**Risco principal:** rejeição em peer review. **Mitigação:** paralelizar submissões em múltiplos journals; aceitar que o primeiro round provavelmente exige revisões substanciais.

---

## Ano 3 — 2028 — Expansão

Com validação científica em mãos, 2028 é o ano de **escala horizontal**: mais labs, mais clínicas, mais wearables.

| Trimestre | Milestone | Critério de conclusão |
|-----------|-----------|----------------------|
| Q1 2028 | 50 IEOs certificados | Diretório público |
| Q2 2028 | 100.000 BEOs ativos | Métrica on-chain |
| Q2 2028 | Client-Side Encryption migration completa | Todos os novos BEOs com CSE como default |
| Q3 2028 | Apps móveis em produção (App Store, Play Store) | Aprovação Apple/Google |
| Q4 2028 | Primeira BIP comunitária aceita | BIP submetida por contribuidor externo, aprovada via processo público |
| Q4 2028 | 200.000 BEOs ativos | Métrica on-chain |

**Risco principal:** rejeição na App Store por considerações regulatórias (apps de saúde têm bar maior). **Mitigação:** engajar legal counsel desde 2027.

---

## Ano 4 — 2029 — Maturidade

O quarto ano é onde o protocolo deixa de ser "early stage" e vira **infraestrutura institucional**.

| Trimestre | Milestone | Critério de conclusão |
|-----------|-----------|----------------------|
| Q1 2029 | Audit Council independente operacional | 5+ membros não-Instituto, charter publicado |
| Q2 2029 | 500.000 BEOs ativos | Métrica on-chain |
| Q2 2029 | Decisão sobre token de governança | BIP pública avaliando necessidade; decisão (sim/não) registrada |
| Q3 2029 | Piloto com sistema público de saúde | SUS regional (Brasil) ou NHS digital health (UK) — MOU assinado |
| Q4 2029 | 1M BEOs ativos | Métrica on-chain |

**Risco principal:** burocracia institucional dilata prazos. **Mitigação:** pilotos em jurisdições onde steward tem rede direta (Brasil, Portugal, Estônia).

---

## Ano 5 — 2030 — Ecosistema

O quinto ano é o **teste de descentralização real**: múltiplos relayers operando independentemente, múltiplas implementações de cliente, múltiplas vozes na governança.

| Trimestre | Milestone | Critério de conclusão |
|-----------|-----------|----------------------|
| Q1 2030 | 5+ operadores independentes de relayer | Lista pública verificável, nenhum controlando >40% do tráfego |
| Q2 2030 | AVA validado em 5+ coortes peer-reviewed | Publicações em cohorts diferentes (UK Biobank, ELSA-Brasil, KORA, Rotterdam Study, US NHANES) |
| Q3 2030 | 1.5M BEOs ativos | Métrica on-chain |
| Q4 2030 | Discussão pública sobre abertura do AVA | BIP pública, RFC aberto, decisão registrada |
| Q4 2030 | 2M+ BEOs ativos globalmente | Métrica on-chain |

**Marco simbólico:** se até 2030 não tivermos pelo menos 3 implementações independentes de cliente (web, móvel, CLI) e 5 operadores de relayer, o protocolo falhou no teste de descentralização real e precisa redesenhar incentivos.

---

*O desenvolvimento do protocolo é orientado pela comunidade e sujeito a mudanças através do processo BIP. Para a estratégia de adoção em três frentes (indivíduos, instituições, reguladores) e os modos de falha detalhados com mitigações, veja o [Whitepaper v3.0 — Parte VI](/pt/whitepaper#parte-vi-o-horizonte).*

[Ver BIPs](/pt/bips/) · [Ler o Whitepaper](/pt/whitepaper) · [Contribuir no GitHub](https://github.com/Biological-Sovereignty-Protocol)
