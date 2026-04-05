---
title: Governança e BIPs
---

# Governança BSP — Mudanças no Protocolo e BIPs

> Versão 0.2 | Ambrósio Institute

---

## Visão Geral

A especificação BSP evolui por meio de um processo público de melhorias — **BSP Improvement Proposals (BIPs)**.

Qualquer indivíduo, empresa ou instituição pode propor mudanças no protocolo. O Ambrósio Institute analisa todas as propostas e coordena a discussão da comunidade. Mudanças críticas no protocolo exigem autorização multi-assinatura.

---

## Princípios de Governança

1. **Abertura** — Qualquer pessoa pode propor um BIP. Nenhuma afiliação institucional necessária.
2. **Transparência** — Todas as propostas, discussões e decisões são públicas.
3. **Mudança conservadora** — Mudanças no protocolo têm um critério elevado. Estabilidade é uma funcionalidade.
4. **Compatibilidade retroativa** — Mudanças aceitas não devem quebrar implementações existentes, a menos que a quebra seja claramente necessária e o caminho de migração esteja definido.
5. **Custódia do Instituto** — O Ambrósio Institute é guardião da especificação, não seu proprietário. O protocolo serve ao ecossistema.

---

## Categorias de BIP

| Categoria | Descrição | Exemplos |
|---|---|---|
| **BSP-BIP-TAXONOMY** | Adicionar ou modificar códigos de biomarcadores | Novo biomarcador, correção de unidade |
| **BSP-BIP-SCHEMA** | Mudanças no schema do BEO, IEO ou BioRecord | Novo campo, mudança de tipo de campo |
| **BSP-BIP-EXCHANGE** | Mudanças no Protocolo de Troca | Nova intenção, código de erro |
| **BSP-BIP-GOVERNANCE** | Mudanças no próprio processo de governança | Template de BIP, prazo de revisão |
| **BSP-BIP-INFRA** | Atualizações de contratos inteligentes | Novo contrato, mudança de parâmetro |

---

## Fluxo de Status do BIP

```
DRAFT → REVIEW → ACCEPTED | REJECTED
                    │
                  FINAL (after implementation)
```

| Status | Descrição |
|---|---|
| `DRAFT` | Autor está redigindo — ainda não enviado para revisão |
| `REVIEW` | Enviado — aberto para discussão da comunidade (30 dias) |
| `ACCEPTED` | Aprovado pelo Instituto — agendado para implementação |
| `REJECTED` | Não aceito — com explicação |
| `FINAL` | Implementado e ativo em uma versão BSP lançada |

---

## Enviando um BIP

1. Faça um fork deste repositório
2. Copie `bip/BIP-0000-template.md` para `bip/BIP-XXXX-seu-titulo.md`
3. Preencha o template completamente
4. Abra um Pull Request

O PR abre o período de revisão pública de 30 dias. O Ambrósio Institute agendará uma chamada de revisão para propostas que alcançarem consenso da comunidade.

---

## Mudanças em Parâmetros Críticos

Mudanças nos parâmetros de contratos inteligentes ou no próprio contrato de Governança exigem **autorização multi-assinatura** dos detentores de chaves do Instituto.

Isso previne mudanças unilaterais — inclusive pelo fundador do Instituto. O protocolo está protegido de qualquer ator único.

---

## Índice de BIPs

| BIP | Título | Status |
|---|---|---|
| BIP-0000 | Template de BIP | FINAL |

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
