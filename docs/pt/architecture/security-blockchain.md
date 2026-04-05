# Chaves, Blockchain e Acesso

> "Como usuários, laboratórios e sistemas se conectam ao ecossistema — descentralizado, sem servidor central, sem intermediário, sem permissão prévia."

## Parte 1: Chaves Criptográficas — O Fundamento

O BSP é construído sobre um princípio único: **nenhuma autoridade central controla o acesso aos seus dados biológicos. Você controla.** O instrumento desse controle é o seu par de chaves criptográficas.

### O Par de Chaves

| | Chave Pública | Chave Privada |
|--|------------|-------------|
| **O que é** | Seu endereço no ecossistema BSP | Sua chave de controle |
| **Quem a vê** | Qualquer pessoa — compartilhada livremente | Apenas você — nunca sai do seu dispositivo |
| **Usada para** | Laboratórios criptografam BioRecords antes do envio | Assinar autorizações, descriptografar seus BioRecords |
| **Armazenada em** | BEORegistry no Arweave | Criptografada no seu app (enclave de hardware + biometria) |

### Geração de Chaves (Ed25519)

```javascript
// 100% no dispositivo
const entropy  = crypto.getRandomValues(new Uint8Array(32))
const mnemonic = bip39.entropyToMnemonic(entropy)
const seed     = await bip39.mnemonicToSeed(mnemonic)
const keyPair  = ed25519.fromSeed(seed.slice(0, 32))

const privateKey = keyPair.secretKey  // 64 bytes — permanece no dispositivo sempre
const publicKey  = keyPair.publicKey  // 32 bytes — registrada no Arweave
```

**Por que Ed25519?** Assinaturas compactas de 64 bytes, alta performance, resistência comprovada em ambientes de baixo consumo (mobile).

---

## Parte 2: Recuperação Social — Sem Servidor Central

Perder sua chave privada significa perda permanente de acesso sem um backup. O BSP resolve isso com **Recuperação Social** via Shamir Secret Sharing.

### Como Funciona

```javascript
// A chave é dividida em 3 fragmentos — quaisquer 2 podem reconstruí-la
const fragments = shamirSplit(recovery_key, threshold=2, shares=3)

// Cada fragmento criptografado com a chave pública do guardião
guardian_1.fragment = encrypt(fragments[0], guardian_1_public_key)
guardian_2.fragment = encrypt(fragments[1], guardian_2_public_key)
guardian_3.fragment = encrypt(fragments[2], guardian_3_public_key)

// Armazenados no Arweave — visíveis publicamente, ilegíveis sem a chave privada do guardião
```

- **Nenhum guardião pode agir sozinho** — 2 de 3 são necessários
- **O Instituto nunca participa deste fluxo** em nenhuma etapa
- **Fragmentos armazenados no Arweave** — permanentes, criptografados, acessíveis apenas ao guardião

### Fluxo de Recuperação

```
1. Usuário abre o app em novo dispositivo → gera novo par de chaves localmente
2. Publica transação RECOVERY_REQUEST no Arweave
3. Dois guardiões descriptografam seus fragmentos e publicam transações GUARDIAN_CONFIRM
4. BEORegistry atualiza o BEO com a nova chave pública
5. Chave antiga é invalidada permanentemente
```

---

## Parte 3: Arweave — Armazenamento Permanente Descentralizado

| Tipo de Armazenamento | Risco |
|-------------|------|
| Banco de dados tradicional | Controlado por uma empresa — pode ser desligado, hackeado ou vendido |
| Blockchain padrão | Descentralizada, mas cara para grandes volumes de dados |
| **Arweave** | **Descentralizada + projetada para armazenamento permanente em larga escala** |

Pague uma vez — os dados persistem por **200+ anos**, garantidos por um modelo matemático de dotação.

> Se o Ambrósio Institute fechar em 30 anos, seu BEO e BioRecords permanecem acessíveis permanentemente na rede Arweave. Dados soberanos sobrevivem a seus criadores.

### Tipos de Transação Arweave no BSP

| Tipo de Transação | Quando |
|-----------------|------|
| `BEO_CREATE` | Criação de BEO |
| `BIORECORD_SUBMIT` | BioRecords escritos no BEO |
| `CONSENT_ISSUE` | Novo ConsentToken emitido |
| `CONSENT_REVOKE` | ConsentToken revogado — efeito imediato |
| `KEY_ROTATION` | Chave pública substituída após recuperação |
| `RECOVERY_REQUEST` | Processo de recuperação iniciado |
| `BEO_LOCK` | BEO bloqueado temporariamente pelo titular |

**Propriedade chave**: o Arweave nunca edita — acumula. O estado atual de um BEO é determinado pela leitura de todas as transações e aplicação das regras do BEORegistry.

---

## Parte 4: Contratos Inteligentes — Regras Imutáveis

Cinco contratos SmartWeave aplicam o protocolo no Arweave. Uma vez implantados, são imutáveis.

| Contrato | Propósito | Quem Pode Chamar |
|----------|---------|-------------|
| **BEORegistry** | Cria e indexa BEOs | Qualquer pessoa — aberto |
| **IEORegistry** | Gerencia instituições Certificadas-BSP | Instituto (certificação); qualquer pessoa (verificar) |
| **DomainRegistry** | Garantidor de unicidade do namespace `.bsp` | SDK automaticamente |
| **AccessControl** | Gerenciamento de consentimento — o verdadeiro guardião | Titulares de BEO (conceder/revogar); IEOs (verificar) |
| **Governance** | Multi-sig para mudanças críticas do protocolo | 2 de 3 detentores de chaves do Instituto |

### AccessControl em Código

```javascript
// Como o AccessControl verifica cada operação
function verifyToken(beo_id, ieo_id, consent_token_id, intent, category) {
    const token = getToken(consent_token_id)

    if (token.beo_id !== beo_id)     throw "TOKEN_BEO_MISMATCH"
    if (token.ieo_id !== ieo_id)     throw "TOKEN_IEO_MISMATCH"
    if (token.revoked)               throw "TOKEN_REVOKED"
    if (token.expires_at < now())    throw "TOKEN_EXPIRED"
    if (!token.scope.intents.includes(intent))     throw "INTENT_NOT_AUTHORIZED"
    if (!token.scope.categories.includes(category)) throw "CATEGORY_NOT_AUTHORIZED"

    return { authorized: true }
}
```

---

## Parte 5: O Modelo de Conectividade BSP (Como MCP)

O Model Context Protocol (MCP) da Anthropic permite que qualquer pessoa construa um servidor MCP sem aprovação da Anthropic. A segurança vem do usuário que consente ativamente quais servidores o assistente pode acessar.

**O BSP segue exatamente a mesma lógica.**

### Como Cada Ator se Conecta

**O Usuário:**
```
App gera par de chaves localmente → Cria BEO no Arweave →
Recebe domínio .bsp → Para cada instituição, assina um ConsentToken
```

**O Laboratório (certificado ou não):**
```
pip install bsp-sdk → Usuário deve autorizar → Enviar BioRecords
(criptografados com a chave pública do usuário) → Escritos no Arweave
```

**AVA (o motor de inteligência):**
```
Usuário inicia análise ativamente → App descriptografa BioRecords localmente →
Usuário envia à AVA com consentimento explícito de sessão → AVA retorna Score SVA →
Dados brutos não retidos pelo Instituto após o processamento
```

> **A diferença chave**: No BSP, os dados não se movem entre instituições. As instituições enviam dados *ao usuário*. O usuário decide quem os lê.

---

## Parte 6: `bsp-registry-api` — O Relayer e Camada de Certificação

Embora a blockchain resolva o problema técnico da intenção imutável, ela introduz fricção: **taxas de gas (pagar em $AR para escrever dados)**. Para garantir adoção em massa, não se pode esperar que pacientes gerenciem carteiras de criptomoedas.

O `bsp-registry-api` atua como um **Relayer** cobrindo esses custos de forma segura.

### O Fluxo de Relay Sem Gas (Assinaturas Off-Chain)

Se o Relayer API paga pelas transações, como evitamos que agentes maliciosos inundem a API ou forjem consentimentos BEO? **Assinaturas Ed25519 Off-Chain**.

1. **Intenção do Usuário:** O app mobile do usuário deseja conceder um consentimento.
2. **Assinatura Local:** O app cria um payload JSON descrevendo a intenção (ex: `grantConsent` para o Laboratório X) e o assina deterministicamente usando a **Chave Privada Ed25519** local do usuário.
3. **Verificação do Relayer:** O app envia o payload + assinatura Base64 ao `bsp-registry-api`.
4. **Verificação Zero-Trust:** O Relayer API obtém a chave pública do usuário do `BEORegistry` do Arweave. Verifica matematicamente a assinatura contra o payload.
   - **Assinatura Inválida:** A requisição é rejeitada imediatamente (`401 Unauthorized`). A API não gasta gas.
   - **Assinatura Válida:** A API envolve a intenção exata do usuário em uma transação Arweave, paga o gas usando a carteira do Ambrósio Institute e a submete ao SmartWeave.

Isso garante **Soberania Criptográfica Absoluta**. Mesmo que o Relayer API fosse comprometido, ele não pode forjar consentimentos biológicos porque não possui a chave privada do usuário.

| O que passa pelo `bsp-registry-api` | O que NUNCA passa |
|----------------------------------------|--------------------------|
| Solicitações de certificação e Selos IEO | Dados biológicos do usuário (BioRecords) |
| Fragmentos Shamir criptografados de guardiões | A Chave Privada real |
| Payloads de intenção assinados (Relayer) | Transações blockchain não assinadas |
