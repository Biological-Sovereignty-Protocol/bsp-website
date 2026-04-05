---
title: Sistema de Domínios BSP — .bsp
---

# Sistema de Domínios BSP — .bsp

> Versão 0.2 | Ambrósio Institute

---

## Visão Geral

Todo BEO e IEO no ecossistema BSP é identificado por um domínio `.bsp` legível por humanos — um endereço biológico permanente e soberano registrado na blockchain Arweave via o contrato inteligente DomainRegistry.

O namespace `.bsp` é gerenciado pelo Ambrósio Institute. A atribuição e unicidade de domínios são aplicadas on-chain — não por um servidor central.

---

## Tipos de Domínio

| Tipo | Formato | Exemplo | Custo | Transferível |
|---|---|---|---|---|
| Individual | `nome.bsp` | `andre.bsp` | Gratuito | Nunca |
| Individual (privacidade) | `iniciais-ano.bsp` | `am1985.bsp` | Gratuito | Nunca |
| Individual (anônimo) | `[aleatório].bsp` | `b7k3m.bsp` | Gratuito | Nunca |
| Profissional | `dr.nome.bsp` | `dr.carlos.bsp` | Pago, permanente | Nunca |
| Institucional | `instituicao.bsp` | `fleury.bsp` | Pago, anual | Sim |
| Pesquisa | `org.tema.bsp` | `usp.longevidade.bsp` | Pago | Não |
| Sub-institucional | `nome@instituicao.bsp` | `dr.silva@hcor.bsp` | Incluído na taxa hospitalar | Não |

---

## Regras de Domínio

### Permanência
Domínios individuais são permanentes e intransferíveis. Uma vez que `andre.bsp` é registrado, existe para sempre no Arweave e não pode ser transferido para outra pessoa ou excluído.

### Unicidade
O contrato inteligente DomainRegistry garante que cada domínio `.bsp` só pode existir uma vez. Duas entidades não podem ter o mesmo domínio.

### Insensibilidade a Maiúsculas/Minúsculas
Todos os domínios `.bsp` são armazenados e resolvidos em letras minúsculas. `Andre.bsp` e `andre.bsp` referem-se ao mesmo domínio.

### Namespaces Reservados
Os seguintes prefixos são reservados pelo Ambrósio Institute:
- `bsp.*` — Infraestrutura do protocolo
- `institute.*` — Operações do Instituto
- `registry.*` — Serviços de registro
- `test.*` — Ambientes de teste

---

## Resolução de Domínio

```typescript
// Resolve a .bsp domain to a BEO or IEO
import { DomainResolver } from '@bsp/sdk'

const resolver = new DomainResolver()

// Resolve individual domain
const beo = await resolver.resolve('andre.bsp')
// Returns: { type: 'BEO', beo_id: '550e8400-...', public_key: 'ed25519:...' }

// Resolve institutional domain
const ieo = await resolver.resolve('fleury.bsp')
// Returns: { type: 'IEO', ieo_id: '9f1a2b3c-...', ieo_type: 'LABORATORY', ... }

// Check availability
const available = await resolver.isAvailable('newname.bsp')
// Returns: true | false
```

---

## Protocolo de Recuperação Social

Se um titular de BEO perder sua chave privada, a rede de guardiões permite a recuperação.

### Configuração

```typescript
// At BEO creation or anytime after
const recovery = new RecoveryManager(beoId)

await recovery.addGuardian({
  name: 'Maria',
  contact: 'maria@example.com',   // Encrypted and stored on-chain
  public_key: 'ed25519:...'
})

// Set recovery threshold
await recovery.setThreshold({ required: 2, total: 3 })
```

### Fluxo de Recuperação

1. O titular perde o dispositivo e/ou a chave privada
2. O titular contata 2 dos 3 guardiões
3. Cada guardião envia uma confirmação assinada on-chain
4. Após 2 confirmações: um novo par de chaves pode ser registrado
5. A chave antiga é revogada; a nova chave é associada ao domínio

```typescript
// Guardian submits confirmation
const recovery = new RecoveryManager(beoId)
await recovery.confirmRecovery({
  guardian_key: guardianPrivateKey,
  new_public_key: recoveryPublicKey,  // Holder's new key
  request_id: recoveryRequestId
})
```

### Propriedades de Segurança
- Nenhum guardião individual pode restaurar o acesso sozinho
- Nenhum servidor central está envolvido
- O protocolo de recuperação é executado on-chain
- A solicitação tem prazo limitado (72 horas por padrão)
- Todos os eventos de recuperação são permanentemente auditáveis

---

## Backup da Frase Semente

Como último recurso (todos os guardiões indisponíveis), a frase semente de 24 palavras fornece recuperação de emergência.

A frase semente é gerada na criação do BEO e deve ser anotada e armazenada offline pelo titular. O sistema BSP armazena apenas um hash criptográfico — nunca a frase em si.

> **Aviso:** Se a frase semente for perdida e nenhum guardião estiver disponível, o acesso ao BEO não poderá ser recuperado por ninguém — incluindo o Ambrósio Institute. Guarde-a com segurança.

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
