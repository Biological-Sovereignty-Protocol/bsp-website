---
title: IEO — Objeto de Entidade Institucional
---

# IEO — Objeto de Entidade Institucional

> Versão 0.2 | Ambrósio Institute

---

## Visão Geral

O **Institutional Entity Object (IEO)** representa qualquer organização, sistema ou profissional que interage com dados biológicos em nome de, ou com o consentimento de, um titular de BEO.

Toda instituição no ecossistema BSP — desde uma grande rede hospitalar até um fabricante de dispositivos wearables ou um médico independente — é representada como um IEO.

> **Criar um IEO é aberto a qualquer instituição.**
> A Certificação BSP é voluntária — mas desbloqueia benefícios significativos dentro do ecossistema.

---

## Schema do Objeto IEO

```typescript
IEO {
  // ─── IDENTIDADE ────────────────────────────────────────────────
  ieo_id:       string     // Identificador institucional universalmente único
  domain:       string     // Endereço .bsp — ex: "fleury.bsp"
  display_name: string     // Nome legal completo da instituição
  ieo_type:     IEOType    // LABORATORY | HOSPITAL | WEARABLE | PHYSICIAN |
                           // INSURER | RESEARCH | PLATFORM
  country:      ISO3166    // País de operação principal
  jurisdiction: string     // Jurisdição regulatória
  legal_id:     string     // CNPJ (BR) / EIN (US) / VAT (EU) etc.
  public_key:   string     // Chave pública institucional para envios assinados
  created_at:   ISO8601    // Timestamp de registro do IEO
  version:      semver     // Versão BSP no momento da criação

  // ─── CERTIFICAÇÃO ──────────────────────────────────────────────
  certification: {
    level:        CertLevel    // BASIC | ADVANCED | FULL | RESEARCH
    granted_at:   ISO8601
    expires_at:   ISO8601      // Renovação anual
    categories:   string[]     // Categorias BSP autorizadas (ex: ["BSP-LA", "BSP-HM"])
    intents:      BSPIntent[]  // Intenções de troca autorizadas
    restrictions: string[]     // Proibições explícitas, se houver
    certified_by: string       // Referência do auditor do Instituto
    audit_ref:    string       // ID da transação de auditoria no Arweave
  }

  // ─── REGISTRO OPERACIONAL ──────────────────────────────────────
  operations: {
    biorecords_submitted: number   // Total de BioRecords enviados até o momento
    last_submission:      ISO8601
    compliance_rate:      float    // Taxa de conformidade do schema (0.0–1.0)
    active_consents:      number   // Tokens de consentimento atualmente abertos
    complaints:           number
    audits:               Audit[]
  }

  // ─── CONTATOS ──────────────────────────────────────────────────
  contacts: {
    technical_lead:   ContactRef
    compliance_lead:  ContactRef
    api_endpoint:     string     // URL do endpoint BSP principal
    webhook_url:      string     // Webhook de notificação (opcional)
  }

  // ─── STATUS ────────────────────────────────────────────────────
  status:             IEOStatus  // ACTIVE | SUSPENDED | REVOKED | PENDING
  suspension_reason:  string | null
  revocation_reason:  string | null
}
```

---

## Tipos de IEO

### LAB — Laboratório Clínico e de Diagnóstico (`IEOType.LABORATORY`)

Laboratórios clínicos e de diagnóstico — a principal fonte de BioRecords no ecossistema BSP.

| Propriedade | Regra |
|---|---|
| Níveis autorizados padrão | L2 Standard |
| Níveis avançados autorizados | L1 Core, L3 Extended na certificação |
| Pode LER BEOs | Nunca — o envio é somente de escrita |
| Formato do domínio | `institutionname.bsp` (ex: `fleury.bsp`) |
| Renovação | Auditoria anual de conformidade |

### HSP — Hospital e Sistema de Saúde (`IEOType.HOSPITAL`)

Hospitais e sistemas de saúde. Autorizados em múltiplos níveis da taxonomia simultaneamente. Podem credenciar médicos como sub-IEOs.

| Propriedade | Regra |
|---|---|
| Níveis autorizados padrão | L1 Core + L2 Standard |
| Níveis avançados autorizados | L3 Extended, L4 Device na certificação |
| Pode LER BEOs | Com token de consentimento ativo, com prazo limitado |
| Sub-IEOs de médicos | Formato `dr.silva@hcor.bsp` |

### WRB — Wearable e Dispositivo (`IEOType.WEARABLE`)

Empresas de hardware e software que produzem dispositivos wearables e sistemas de monitoramento contínuo.

| Propriedade | Regra |
|---|---|
| Níveis autorizados | L4 Device (BSP-DV) **exclusivamente** |
| Frequência de envio | Registros consolidados diários por usuário |
| Pode LER BEOs | **Nunca** — restrição permanente, não pode ser substituída pelo consentimento do usuário |
| Requisito de SDK | Deve usar o SDK oficial BSP Device |

> **Crítico:** IEOs Wearable são o único tipo de IEO que nunca pode receber acesso READ_RECORDS sob nenhuma circunstância.

### PHY — Médico e Profissional de Saúde (`IEOType.PHYSICIAN`)

Médicos licenciados e profissionais de saúde. Únicos no sentido de que READ_RECORDS é sua função principal.

| Propriedade | Regra |
|---|---|
| Função principal | READ_RECORDS com token de consentimento |
| Direitos de envio | Apenas avaliações clínicas (BSP-CL) |
| Modelo de consentimento | Tokens somente com prazo e escopo limitados |
| Verificação de credencial | Número de registro médico exigido no cadastro |

### INS — Plano de Saúde (`IEOType.INSURER`)

Empresas de seguro saúde. Operam sob o modelo de acesso mais restritivo.

| Propriedade | Regra |
|---|---|
| Acesso de leitura | Apenas dados agregados anonimizados |
| Acesso individual | Apenas com consentimento contínuo e explícito, nunca automático |
| **PROIBIDO** | Não pode usar dados BSP para subscrição, negação de cobertura ou cálculo de prêmio baseado em risco biológico individual |

> Esta restrição está codificada no contrato IEO e aplicada no nível do contrato inteligente.

### RES — Instituição de Pesquisa (`IEOType.RESEARCH`)

Universidades, centros de pesquisa e organizações de ensaios clínicos.

| Propriedade | Regra |
|---|---|
| Acesso a dados | Agregado anonimizado com opt-in explícito |
| Identificação individual | Estruturalmente impossível — referências ao BEO removidas |
| Restrição comercial | Não pode comercializar acesso a dados BSP brutos |

### PLT — Plataforma de Saúde Digital e Sistema de IA (`IEOType.PLATFORM`)

Plataformas de saúde digital, serviços de telemedicina e sistemas de IA. Esta é a categoria para implementações AVA/SVA.

| Propriedade | Regra |
|---|---|
| Função principal | Intenções ANALYZE_VITALITY e REQUEST_SCORE |
| Acesso de leitura | Com consentimento persistente do usuário — renovável |
| Acesso de escrita | Não pode — plataformas interpretam, não medem |

---

## Níveis de Certificação

| Nível | Requisitos | O que desbloqueia |
|---|---|---|
| **BSP-Compliant Basic** | Apenas biomarcadores L2 Standard | Listagem no diretório, distintivo básico |
| **BSP-Compliant Advanced** | L1 Core + L2 Standard | Feed de dados AVA, distintivo avançado |
| **BSP-Compliant Full-Spectrum** | Todos os níveis | Integração completa ao ecossistema |
| **BSP Research Partner** | IEO de pesquisa com contribuição BIP | Acesso a dados de pesquisa anonimizados |

**A certificação é voluntária.** Qualquer instituição pode participar do ecossistema BSP sem certificação — mas instituições certificadas:
- Aparecem no diretório oficial
- Exibem um distintivo verificável on-chain
- Têm seus dados alimentando a análise da AVA
- São recomendadas pelo Ambrosio OS

Instituições não certificadas podem operar, mas o aplicativo Ambrósio exibe um aviso de "fonte não verificada".

---

## Intenções de Troca

Cada tipo de IEO é autorizado para intenções de troca específicas:

| Intenção | Descrição | Tipos de IEO Autorizados |
|---|---|---|
| `SUBMIT_RECORD` | Enviar medições biológicas para um BEO | LAB, HSP, WRB, PHY |
| `READ_RECORDS` | Ler BioRecords de um BEO | PHY, PLT, INS (apenas agregado) |
| `REQUEST_CERTIFICATION` | Solicitar certificação BSP | Todos os tipos |
| `ANALYZE_VITALITY` | Enviar BioRecords para análise AVA | PLT |
| `REQUEST_SCORE` | Solicitar geração de SVA score | PLT |
| `SUBMIT_BIP` | Enviar uma Proposta de Melhoria BSP | Todos os tipos |

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
