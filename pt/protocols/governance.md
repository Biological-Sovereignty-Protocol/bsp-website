<div class="page-hero-image">
  <img src="/images/governance-bip.jpg" alt="BSP Governance" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Governança e Processo BIP

> "Um protocolo que não pode evoluir está morto. Um protocolo que qualquer um pode mudar não é um protocolo."

## Filosofia de Governança

O BSP é um bem público. Seu modelo de governança resolve a tensão fundamental entre **estabilidade** (sistemas construídos sobre o BSP não devem quebrar a cada atualização) e **adaptabilidade** (avanços científicos devem ser incorporados).

Três camadas evoluem em velocidades diferentes:

| Camada | Frequência de Mudança | Autoridade de Decisão |
|-------|-----------------|-------------------|
| **Core do Protocolo** (BEO, IEO, Exchange) | Anual ou menos | 2-de-3 multi-sig + 90 dias de comentário público |
| **Taxonomia de Biomarcadores** (códigos BSP-XX) | Trimestral | Conselho Científico + ratificação do Instituto |
| **Implementações** (AVA, SDKs, apps) | Contínuo | Cada implementador independentemente |

---

## O Ambrósio Institute como Guardião

O Instituto é o **guardião** do padrão, não seu proprietário. Essa distinção importa: um guardião mantém a integridade do protocolo em benefício do ecossistema.

### Conselho Científico

| Atributo | Valor |
|-----------|-------|
| Composição | 7 membros — longevidade, cardiologia, metabolismo, neurologia, genômica, imunologia, laboratório médico |
| Independência | Sem relacionamento financeiro com o Instituto ou qualquer empresa do ecossistema BSP durante o mandato |
| Quórum | 5 de 7 membros necessários para votação |
| Aprovação | Maioria simples dos presentes |
| Reuniões | Trimestral: janeiro, abril, julho, outubro |
| Transparência | Atas publicadas no `bsp-spec` em até 14 dias; votos individuais registrados |

### Multi-Sig de Três Chaves

Operações críticas do protocolo requerem assinaturas de 2 dos 3 detentores de chaves do Instituto:

| Detentor | Papel | Armazenamento |
|-----------|------|---------|
| **A** — Fundador | Operações do dia a dia, ratificação de BIP | Hardware wallet offline |
| **B** — Diretor Científico | Especificação do protocolo e mudanças de taxonomia | Hardware wallet, acesso restrito |
| **C** — Custodiante Legal | Fiduciário independente — salvaguarda contra abuso unilateral | Detido por terceiro |

### Níveis de Autorização

| Nível | Operações | Executores |
|-------|-----------|----------|
| **Crítico** (2-de-3) | Modificar contratos core, revogar IEO permanentemente, mudar estrutura de governança | Quaisquer 2 detentores |
| **Significativo** (1 + voto do Conselho) | Aprovar BIP, suspender IEO, publicar versão da especificação | Qualquer detentor após voto do Conselho |
| **Rotineiro** (1 detentor) | Renovação de certificação IEO, documentação, emissão de selos | Qualquer detentor autorizado |

---

## Tipos de BIP

| Tipo | Código | Escopo | Período de Comentários |
|------|------|-------|---------------|
| Taxonomia | BIP-T | Adicionar/modificar/remover biomarcadores | 30 dias |
| Protocolo | BIP-P | Mudanças no BEO, IEO, Protocolo de Troca | 90 dias |
| Governança | BIP-G | Mudanças no processo BIP ou multi-sig | 120 dias |
| Informacional | BIP-I | Boas práticas, recomendações | Simplificado |

---

## Schema Completo de BIP

```yaml
bip_id:        BIP-0042
type:          T                       # T | P | G | I
title:         "Título da mudança proposta"
status:        DRAFT                   # DRAFT | REVIEW | COUNCIL | ACCEPTED | REJECTED | WITHDRAWN

authors:
  - name:        "Nome Completo"
    affiliation: "Instituição ou Independente"
    contact:     "email@exemplo.com"
    conflict:    "Nenhum"              # Obrigatório: qualquer interesse financeiro

submitted_at:  2026-01-15
review_start:  2026-01-22
council_vote:  2026-04-15
decided_at:    2026-04-22

abstract:      |
  Máx 200 palavras descrevendo o que o BIP propõe.

motivation:    |
  Por que esta mudança é necessária agora?

specification: |
  Descrição técnica da mudança proposta.

rationale:     |
  Por que esta abordagem versus alternativas consideradas.

backwards_compatibility: |
  Impacto nas implementações BSP existentes.

evidence:                          # Obrigatório para BIP-T e BIP-P
  - citation:    "Autor et al. (2024). Título. Revista."
    doi:         "10.xxxx/xxxxxx"
    year:        2024
    n_participants: 15000
    finding:     "O que este artigo apoia na proposta"
    quality:     RCT | Meta-analysis | Cohort | Case-control | Expert

# Para BIP-T: especificação do biomarcador
biomarker_spec:
  proposed_code: BSP-LA-009
  name:          "Nome Científico"
  category:      BSP-LA
  level:         CORE
  unit:          "umol/L"
  method:        "ELISA"
  ref_range:
    optimal:    "40-60"
    functional: "30-70"
    deficiency: "<30"
    toxicity:   ">100"
  cost_tier:    LOW | MEDIUM | HIGH | RESEARCH_ONLY
```

---

## O Ciclo de Vida do BIP

```
Dia 1: Submissão
  → Autor abre Pull Request em bsp-spec/bip/
  → Instituto atribui número de BIP, status: DRAFT

Semana 1–2: Revisão Técnica
  → Schema, referências, coerência técnica validados
  → Status: REVIEW

Dias 15–45 (BIP-T): Comentário Público
  → BIP aberto para contribuições da comunidade no GitHub
  → Autor deve responder a todos os comentários substanciais
  → Status: COUNCIL

Reunião do Conselho (Trimestral): Votação
  → BIP completo + resumo de comentários + opinião técnica apresentados
  → Cada membro vota APROVAR / REJEITAR / ABSTER com justificativa obrigatória
  → Votos e justificativas publicados nas atas públicas

Semana 1–2 pós-votação: Ratificação
  → ACEITO: Detentor B ratifica on-chain → taxonomia atualizada no bsp-spec
  → REJEITADO: Autor recebe feedback detalhado, pode reenviar sem limite
```

---

## Por Que Propostas São Rejeitadas

| Exemplo de Proposta | Motivo |
|-----------------|--------|
| "Nível de energia subjetivo" como biomarcador | Não mensurável objetivamente. BSP requer valores numéricos com unidades padronizadas. |
| 40 biomarcadores nutricionais em um BIP | Sem evidência individual por marcador. Reenviar como BIPs separados. |
| Campo `provider_fee` no Protocolo de Troca | Tentativa de inserir monetização no core do protocolo. O BSP não pode extrair valor das transações usuário-instituição. |

---

## Proteção Contra Captura do Protocolo

Três proteções estruturais contra controle unilateral do Instituto:

1. **Detentor de Chave C Independente** — Um fiduciário terceirizado detém a terceira chave. Bloqueia abuso unilateral pelos Detentores A e B.
2. **BIPs Públicos e Auditáveis** — Cada proposta, voto e decisão é pública e registrada on-chain. Qualquer um pode verificar se o Instituto age no interesse do ecossistema.
3. **Compromisso de Proteção de Fork** — O Instituto se compromete publicamente a nunca contestar legalmente forks do BSP. Se a comunidade discordar, pode fazer um fork — sem barreiras legais.

---

## Como Enviar um BIP

1. Faça um fork de [`biological-sovereignty-protocol/bsp-spec`](https://github.com/Biological-Sovereignty-Protocol/bsp-spec)
2. Copie `bip/TEMPLATE.md` para `bip/BIP-DRAFT-seu-titulo.md`
3. Preencha o template — citações de evidências são obrigatórias para BIP-T e BIP-P
4. Envie um Pull Request para o branch principal
5. O Instituto atribui um número de BIP em até **3 dias úteis**
