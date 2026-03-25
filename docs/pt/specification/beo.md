---
title: BEO — Objeto de Entidade Biológica
---

# BEO — Biological Entity Object

> Versão 0.2 | Ambrósio Institute

---

## Visão Geral

O **Biological Entity Object (BEO)** é a unidade central do BSP. Todo dado no ecossistema BSP está ancorado a um BEO.

O BEO é **soberano** — pertence ao indivíduo, não a nenhuma plataforma. É armazenado em infraestrutura descentralizada (Arweave) e identificado por um nome de domínio `.bsp` permanente.

> **A diferença entre um BEO e um prontuário médico tradicional é fundamental:**
> O prontuário pertence ao hospital. O BEO pertence a você.
> O hospital é apenas um contribuidor — não o proprietário.

---

## Schema do Objeto BEO

```typescript
BEO {
  // ─── IDENTIDADE ────────────────────────────────────────────────
  beo_id:      string     // Identificador biológico universalmente único (UUID v4)
  domain:      string     // Endereço legível — ex: "andre.bsp"
  created_at:  ISO8601    // Quando esta entidade foi registrada pela primeira vez
  version:     semver     // Versão BSP deste registro

  // ─── CRIPTOGRAFIA ──────────────────────────────────────────────
  public_key:  string     // Chave pública do titular (RSA-4096 ou Ed25519)
  key_version: number     // Incrementa na rotação de chave (começa em 1)

  // ─── DADOS ─────────────────────────────────────────────────────
  records:     BioRecord[]  // Todas as medições biológicas
  protocols:   Protocol[]   // Protocolos de saúde ativos

  // ─── SOBERANIA ─────────────────────────────────────────────────
  sovereignty: SovereigntyMeta  // Metadados de propriedade, consentimento e recuperação

  // ─── STATUS ────────────────────────────────────────────────────
  active_recovery: object | null  // Metadados da solicitação de recuperação ativa, ou null
  locked_at:       string | null  // Timestamp ISO8601 se o BEO estiver bloqueado, ou null
}

SovereigntyMeta {
  guardians:       Guardian[]   // Rede de recuperação social (3 recomendados)
  recovery_scheme: string       // Limiar "2-of-3"
  seed_phrase_hash: string      // Verificação com hash (frase armazenada offline pelo usuário)
  consent_log:     ConsentEntry[] // Todas as autorizações de acesso — on-chain
}

Guardian {
  contact:     string              // Como entrar em contato com este guardião (criptografado)
  public_key:  string             // Chave pública do guardião para o protocolo de recuperação
  role:        string             // 'primary' | 'secondary' | 'tertiary'
  status:      'PENDING' | 'ACTIVE'  // Se aceitou o papel de guardião
  accepted_at: string | null      // Timestamp ISO8601 de aceitação, ou null se pendente
}
```

---

## Criando um BEO

A criação de BEO é **aberta a qualquer pessoa**. Não é necessária permissão do Ambrósio Institute ou de qualquer autoridade.

```typescript
// Usando o bsp-sdk-typescript
import { BEOClient } from '@bsp/sdk'

const client = new BEOClient()

const beo = await client.create({
  domain: 'andre.bsp',       // Domínio .bsp desejado
  guardians: [               // Opcional na criação — pode adicionar depois
    { contact: 'maria@example.com', public_key: '...' },
    { contact: 'joao@example.com',  public_key: '...' },
  ]
})

console.log(beo.beo_id)   // "550e8400-e29b-41d4-a716-446655440000"
console.log(beo.domain)   // "andre.bsp"
```

```python
# Usando o bsp-sdk-python
from bsp_sdk import BEOClient

client = BEOClient()

beo = client.create(
    domain="andre.bsp",
    guardians=[
        {"contact": "maria@example.com", "public_key": "..."},
    ]
)

print(beo.beo_id)    # "550e8400-e29b-41d4-a716-446655440000"
print(beo.domain)    # "andre.bsp"
```

---

## O Domínio .bsp

Todo BEO é identificado por um domínio `.bsp` legível por humanos — um endereço biológico permanente e soberano.

| Tipo de Domínio | Exemplo | Regras |
|---|---|---|
| Individual | `andre.bsp` | Gratuito, permanente, intransferível, vinculado a um BEO |
| Profissional | `dr.carlos.bsp` | Pago, permanente, intransferível, vinculado ao IEO do profissional |
| Institucional | `fleury.bsp` | Pago, renovação anual, transferível, vinculado ao IEO |
| Pesquisa | `usp.longevity.bsp` | Pago, vinculado à certificação de Parceiro de Pesquisa |

→ Veja [`bsp-domain.md`](bsp-domain.md) para a especificação completa do sistema de domínio.

---

## Propriedades do BEO

### Permanência
Uma vez criado, um BEO não pode ser excluído — pelo titular, por nenhuma instituição ou pelo Ambrósio Institute. A identidade biológica existe permanentemente no Arweave.

### Soberania
O indivíduo detém a chave privada. Nenhum sistema — incluindo o Ambrósio Institute — pode acessar os dados do BEO sem autorização explícita do titular da chave.

### Portabilidade
Todos os dados dentro de um BEO podem ser exportados no formato padrão BSP a qualquer momento. Sem lock-in.

### Imutabilidade
BioRecords não podem ser alterados uma vez escritos. Correções são enviadas como novos BioRecords que substituem os registros anteriores — preservando a trilha de auditoria completa.

---

## Controle de Acesso

Todo acesso de terceiros a um BEO é regido pelo contrato inteligente **AccessControl** no Arweave.

Qualquer sistema que queira ler ou gravar em um BEO deve:
1. Solicitar autorização ao titular do BEO
2. Receber um token de consentimento assinado do titular
3. Enviar esse token com cada transação

Sem um token válido, o contrato inteligente rejeita automaticamente a transação. O indivíduo é o guardião — não o Ambrósio Institute.

Tokens de consentimento são:
- **Escopo definido** — limitados a categorias de dados e intenções específicas
- **Temporários** — expiram automaticamente a menos que renovados
- **Revogáveis** — o titular pode revogar a qualquer momento
- **Auditáveis** — todas as concessões e revogações são registradas permanentemente on-chain

→ Veja [`exchange.md`](exchange.md) para a especificação completa do token de consentimento.

---

## Recuperação Social

Se um titular de BEO perder sua chave privada, a recuperação é possível por meio da rede de guardiões.

**A recuperação exige:** 2 de 3 guardiões confirmem a identidade do titular.

Nenhum guardião individual pode restaurar o acesso sozinho. Nenhum servidor central está envolvido. O protocolo de recuperação é executado on-chain.

**Configuração de guardiões:**
1. Na criação do BEO (recomendado), designar 3 pessoas de confiança
2. Cada guardião aceita o papel e fornece uma chave pública
3. Limiar de recuperação: 2 de 3 assinaturas necessárias

→ Veja [`bsp-domain.md`](bsp-domain.md) para detalhes do protocolo de recuperação.

---

## BEO vs IEO — Distinções Principais

| Propriedade | BEO (Individual) | IEO (Instituição) |
|---|---|---|
| Representa | Um ser humano vivo | Uma organização, sistema ou profissional |
| Criado por | O próprio indivíduo | Qualquer instituição, diretamente |
| Transferível | Nunca | Sim — em aquisição ou fusão |
| Pode ler BEOs | Apenas seus próprios dados | Apenas com token de consentimento válido |
| Pode gravar em BEOs | Não pode | Sim — com autorização do AccessControl |
| Formato do domínio | `firstname.bsp` | `institutionname.bsp` |
| Custo | Gratuito — soberania é um direito | Pago — taxa anual de certificação |

→ Veja [`ieo.md`](ieo.md) para a especificação completa do IEO.

---

## Exemplo de BEO (JSON)

```json
{
  "beo_id": "550e8400-e29b-41d4-a716-446655440000",
  "domain": "andre.bsp",
  "created_at": "2026-02-24T14:32:00Z",
  "version": "0.2.0",
  "public_key": "ed25519:4K8Yg2...",
  "key_version": 1,
  "active_recovery": null,
  "locked_at": null,
  "sovereignty": {
    "guardians": [
      {
        "contact": "encrypted:3a7b9c...",
        "public_key": "ed25519:7xM2Pq...",
        "role": "primary",
        "status": "ACTIVE",
        "accepted_at": "2026-02-24T14:35:00Z"
      }
    ],
    "recovery_scheme": "2-of-3",
    "consent_log": []
  }
}
```

→ Exemplo completo: [`../examples/beo-example.json`](../examples/beo-example.json)

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
