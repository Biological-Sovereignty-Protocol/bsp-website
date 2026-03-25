<div class="page-hero-image">
  <img src="/images/ieo-institution.jpg" alt="IEO Institution" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Objeto de Entidade Institucional (IEO)

> "Toda instituição que toca a biologia humana precisa de uma linguagem para expressá-la."

## O que é um IEO?

O IEO representa qualquer organização, sistema ou profissional que interage com dados biológicos no ecossistema BSP — desde um laboratório clínico até uma plataforma de IA. Qualquer instituição pode criar um IEO sem aprovação. A Certificação BSP é voluntária, mas desbloqueia benefícios significativos.

---

## Tipos de IEO

| Código | Tipo | Função Principal |
|--------|------|-----------------|
| `LAB` | Laboratório | Enviar BioRecords — a principal fonte de dados |
| `HOSP` | Hospital e Sistema de Saúde | Enviar + Ler registros em múltiplos domínios clínicos |
| `WEAR` | Wearable e Dispositivo | Enviar dados contínuos de Nível 4 (Dispositivo) diariamente |
| `PHY` | Médico e Profissional | Ler registros para interpretar o histórico médico do paciente |
| `INS` | Plano de Saúde | Ler apenas o score SVA agregado — nunca dados brutos |
| `RES` | Instituição de Pesquisa | Acesso agregado anonimizado para ciência aberta |
| `PLT` | Plataforma e Sistema de IA | Analisar vitalidade, solicitar scores SVA |

---

## Matriz de Permissões

| Ação | LAB | HOSP | WEAR | PHY | INS | RES |
|------|:---:|:----:|:----:|:---:|:---:|:---:|
| Enviar BioRecords | ✓ | ✓ | ✓ | ✓* | — | — |
| Ler BEO (com token) | — | ✓ | — | ✓ | — | — |
| Dados agregados anonimizados | — | — | — | — | ✓* | ✓ |
| Analisar vitalidade (AVA) | — | — | — | ✓ | — | — |
| Solicitar score SVA | — | — | — | ✓ | ✓* | — |

*PHY: apenas avaliações clínicas (BSP-CL) | INS: apenas SVA composto com opt-in do usuário*

---

## Schema Completo do IEO

```typescript
interface IEO {
  ieo_id:       string    // Identificador institucional universalmente único
  domain:       string    // Endereço .bsp — ex: "fleury.bsp"
  display_name: string    // Nome legal completo
  ieo_type:     IEOType   // LABORATORY | HOSPITAL | WEARABLE | PHYSICIAN | INSURER | RESEARCH | PLATFORM
  country:      string    // Código de país ISO3166
  jurisdiction: string    // Jurisdição regulatória
  legal_id:     string    // CNPJ (BR) / EIN (US) / VAT (EU) etc.
  public_key:   string    // Chave pública Ed25519 institucional
  created_at:   string    // ISO8601
  version:      string    // Versão BSP no momento da criação

  certification: {
    level:      "UNCERTIFIED" | "BASIC" | "ADVANCED" | "FULL" | "DEVICE" | "RESEARCH"
    granted_at: string
    expires_at: string     // Renovação anual
    categories: string[]   // Categorias BSP autorizadas (ex: ["BSP-LA", "BSP-HM"])
    intents:    BSPIntent[]
  }

  operations: {
    biorecords_submitted: number
    last_submission:      string
    compliance_rate:      number  // 0.0–1.0
    active_consents:      number
  }

  status: "ACTIVE" | "SUSPENDED" | "REVOKED" | "PENDING"
}
```

---

## Níveis de Certificação

| Nível | Código | Acesso a Dados | Alvo |
|-------|--------|---------------|------|
| Não Certificado | — | Qualquer categoria com consentimento do usuário | Qualquer instituição começando |
| Básico | BSP-1 | L2 Standard | Laboratórios clínicos, diagnósticos de rotina |
| Avançado | BSP-2 | L1 Core + L2 | Clínicas de longevidade avançada |
| Espectro Completo | BSP-3 | L1 + L2 + L3 Extended | Centros de pesquisa abrangentes |
| Dispositivo | BSP-4 | L4 Device (contínuo) | Fabricantes de wearables |

---

## Processo de Certificação

### Caminho Padrão para Laboratório (BSP-1)

1. **Solicitação** — Enviar em `biologicalsovereigntyprotocol.com/certify`. Necessário: ID de entidade legal, contatos, lista de categorias analíticas.
2. **Revisão de Documentos** — Instituto revisa em 5 dias úteis: legitimidade legal, posição regulatória, correspondência de capacidades.
3. **Auditoria Técnica** — Acesso ao BSP Compliance Test Suite. Deve enviar 100 BioRecords válidos em todas as categorias solicitadas em modo sandbox usando o SDK.
4. **Atualização do IEO** — Após aprovação, o Instituto atualiza o IEO da instituição no Arweave para `BSP-CERTIFIED` com categorias autorizadas e referência de auditoria.
5. **Produção** — Credenciais de produção do SDK emitidas. Selo torna-se ativo e verificável on-chain.
6. **Renovação Anual** — Falha → status muda para `SUSPENDED`.

---

## Restrições Especiais

### IEOs de Wearables
**Nunca** podem receber acesso `READ_RECORDS` — nem mesmo com consentimento explícito do usuário. Dispositivos produzem dados; não os consomem. Essa restrição é permanente e codificada no contrato `IEORegistry`.

### IEOs de Planos de Saúde
Permanentemente proibidos de:
- Usar dados BSP para subscrição de seguros
- Acessar BioRecords brutos (apenas score SVA composto com opt-in anual explícito)
- Armazenar dados BSP brutos

---

## Criar um IEO

```python
from bsp_sdk import IEOBuilder, IEOType

ieo = IEOBuilder(
    domain       = "seulaboratorio.bsp",
    name         = "Nome do Seu Laboratório",
    ieo_type     = IEOType.LABORATORY,
    jurisdiction = "BR",
    legal_id     = "12.345.678/0001-99",
    contact      = "tech@seulaboratorio.com",
    website      = "https://seulaboratorio.com",
).build()

result = ieo.register()

print(result.ieo_id)       # UUID permanente no Arweave
print(result.domain)       # seulaboratorio.bsp
print(result.arweave_tx)   # ID de transação on-chain
print(result.status)       # ACTIVE (UNCERTIFIED por padrão)

# CRÍTICO: Armazenar com segurança — sem recuperação se perdido
# result.private_key  → armazenar em .env como BSP_IEO_PRIVATE_KEY
# result.seed_phrase  → armazenar offline
```

---

## Registro Público e Selo de Certificação

Cada IEO ativo aparece no Registro Público BSP, consultável por qualquer pessoa. A certificação é verificável on-chain — o selo não pode ser falsificado.

```typescript
const registry = new IEORegistry("mainnet")
const status = await registry.verify("fleury.bsp")

console.log(status.isCertified)   // true
console.log(status.certifiedSince) // 2026-03-01
console.log(status.level)          // "ADVANCED"
```

```html
<!-- Selo de certificação incorporável -->
<a href="https://biologicalsovereigntyprotocol.com/registry/fleury.bsp">
  <img src="https://biologicalsovereigntyprotocol.com/badges/BSP-Compliant-Advanced.svg"
       alt="BSP-Certificado Avançado"
       width="200" />
</a>
```
