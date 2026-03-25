<div class="page-hero-image">
  <img src="/images/beo-identity.png" alt="BEO Digital Identity" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Objeto de Entidade Biológica (BEO)

> "A identidade biológica soberana de um ser humano. O ponto de ancoragem de toda vida medida."

## O que é um BEO?
O BEO é o alicerce de todo o ecossistema BSP. Ele representa um ser humano vivo — o proprietário soberano de seus dados biológicos. Todos os BioRecords de uma pessoa estão ancorados nele. Todos os ConsentTokens que autorizam acesso são emitidos a partir dele.

Um BEO é **criado pelo próprio indivíduo diretamente no Arweave, sem aprovação de qualquer autoridade.** Uma vez criado, pertence ao titular para sempre.

### BEO vs IEO — Distinção Fundamental

| Característica | BEO | IEO |
|----------------|-----|-----|
| **Representa** | Um ser humano vivo | Uma organização, sistema ou profissional |
| **Criado por** | O próprio indivíduo — sem aprovação necessária | Qualquer instituição — diretamente |
| **Transferível** | Nunca — identidade individual permanente | Sim — em aquisição ou fusão de empresas |
| **Pode ler BEOs** | Apenas seus próprios dados | Nunca sem token de consentimento válido |
| **Pode gravar BioRecords** | Não — indivíduos observam, não registram | Sim — com ConsentToken ativo |
| **Formato do domínio** | `firstname.bsp` | `institutionname.bsp` |

---

## Identidade Criptográfica

O controle do BEO é inteiramente determinado pela posse da chave privada.

| Chave | Tipo | Uso |
|-------|------|-----|
| `private_key` | Ed25519 (64 bytes) | Gerada localmente, nunca transmitida. Assina autorizações, descriptografa BioRecords, assina transações Arweave. |
| `public_key` | Ed25519 (32 bytes) | Registrada publicamente no Arweave. Laboratórios a usam para identificar seu BEO e criptografar dados antes do envio. |
| `seed_phrase` | 24 palavras BIP-39 | Representação mnemônica da chave privada. Guarde offline — é o seu backup. |

### Geração de Chaves

```javascript
// 100% no dispositivo — nada é enviado a nenhum servidor
const entropy  = crypto.getRandomValues(new Uint8Array(32))
const mnemonic = bip39.entropyToMnemonic(entropy)
const seed     = await bip39.mnemonicToSeed(mnemonic)
const keyPair  = ed25519.fromSeed(seed.slice(0, 32))

const privateKey = keyPair.secretKey  // permanece no dispositivo para sempre
const publicKey  = keyPair.publicKey  // registrada no Arweave
```

---

## Recuperação Social

Se você perder seu dispositivo e a frase semente, a Recuperação Social permite que você recupere o acesso usando Guardiões de confiança — sem necessidade de servidor central.

- **Até 3 Guardiões**: pessoas ou plataformas de confiança que você designa
- **Limiar**: 2 de 3 confirmações necessárias (padrão)
- **Mecanismo**: Shamir Secret Sharing — sua chave é dividida em 3 fragmentos criptografados armazenados no Arweave
- **Segurança**: Nenhum guardião pode agir sozinho. O Instituto nunca está envolvido.

### Fluxo de Recuperação

```
1. Usuário abre o app em novo dispositivo → nenhuma chave privada encontrada
2. App gera novo par de chaves localmente
3. Solicitação de recuperação publicada no Arweave (transação RECOVERY_REQUEST)
4. Dois guardiões descriptografam seus fragmentos e publicam transações GUARDIAN_CONFIRM
5. BEORegistry atualiza o BEO com a nova chave pública
6. Acesso restaurado — chave antiga permanentemente invalidada
```

---

## Schema Completo do BEO

```json
{
  "beo_id":     "uuid-v4",
  "domain":     "andre.bsp",
  "public_key": "ed25519_pub_...a1b2",
  "created_at": "2026-01-10T14:32:00Z",
  "version":    "1.0.0",

  "recovery": {
    "enabled":   true,
    "threshold": 2,
    "guardians": [
      {
        "contact":     "maria.bsp",
        "public_key":  "ed25519_pub_...",
        "role":        "primary",
        "status":      "active",
        "accepted_at": "2026-01-10T15:00:00Z"
      }
    ]
  },

  "status":      "ACTIVE",
  "locked_at":   null,
  "key_version": 1
}
```

---

## Schema do BioRecord

Cada medição biológica anexada a um BEO é um BioRecord:

```json
{
  "record_id":    "arweave-tx-id",
  "beo_id":       "uuid-v4",
  "ieo_id":       "uuid-v4",
  "biomarker":    "BSP-LA-004",
  "value":        4.8,
  "unit":         "%",
  "collected_at": "2026-02-26T08:00:00Z",
  "submitted_at": "2026-02-26T09:00:00Z",
  "ref_range": {
    "optimal":    "4.0-6.0",
    "functional": "3.5-6.5",
    "deficiency": "<3.5",
    "toxicity":   null
  },
  "status":     "CURRENT",
  "supersedes": null,
  "data_hash":  "sha256_..."
}
```

> **BioRecords são imutáveis.** Correções são enviadas como novos registros que `substituem` o anterior — o erro permanece no histórico.

---

## Estados do Ciclo de Vida

| Estado | Descrição |
|--------|-----------|
| `ACTIVE` | Operação normal. Todas as operações autorizadas permitidas. |
| `LOCKED` | Bloqueado voluntariamente pelo titular — útil se houver suspeita de comprometimento. Nenhuma instituição lê ou grava. O progresso de recuperação é rastreado em `active_recovery.status`. |

---

## Contratos Inteligentes — Operações do BEO

### BEORegistry

| Função | Quem Pode Chamar | Descrição |
|--------|-----------------|-----------|
| `createBEO()` | Qualquer pessoa | Cria um novo BEO. Aberto — sem aprovação necessária. |
| `getBEO()` | Qualquer pessoa | Retorna dados públicos do BEO. |
| `updateRecovery()` | Apenas titular do BEO | Configurar ou atualizar a configuração de guardiões. |
| `lockBEO()` | Apenas titular do BEO | Bloqueia temporariamente todas as operações. |
| `rotateKey()` | Titular do BEO (recuperação) | Substitui a chave pública após recuperação bem-sucedida. |

### AccessControl

| Função | Quem Pode Chamar | Descrição |
|--------|-----------------|-----------|
| `issueToken()` | Apenas titular do BEO | Emite um novo ConsentToken para um IEO. |
| `revokeToken()` | Apenas titular do BEO | Revoga imediatamente um ConsentToken. |
| `verifyToken()` | Qualquer IEO | Verifica se um token é válido para uma operação específica. |
| `getTokenHistory()` | Apenas titular do BEO | Registro de auditoria completo de todos os tokens emitidos. |

> [!IMPORTANT]
> `issueToken()` e `revokeToken()` são exclusivamente reservados para o titular do BEO. Nenhuma instituição — nem mesmo o Ambrósio Institute — pode conceder ou revogar o acesso aos dados de uma pessoa.

---

## Criar um BEO com o SDK

```python
from bsp_sdk import BEOBuilder, Guardian

beo = BEOBuilder(domain="andre.bsp").build()
result = beo.register()

print(result.beo_id)      # UUID permanente no Arweave
print(result.domain)      # andre.bsp
print(result.seed_phrase) # 24 palavras — guarde offline, nunca digitalmente

# Opcional: configurar Recuperação Social
beo.update_recovery(
    guardians=[
        Guardian(contact="maria.bsp",   role="primary"),
        Guardian(contact="+5511999...", role="secondary"),
        Guardian(contact="carlos.bsp",  role="tertiary"),
    ],
    threshold=2
)
```

## Direitos do Titular (Incondicionais)

- ✓ Sempre recuperar seu BEO usando a frase semente
- ✓ Sempre revogar qualquer ConsentToken, instantaneamente
- ✓ Sempre exportar todos os seus dados (intent `EXPORT_DATA`)
- ✓ Sempre bloquear seu BEO
- ✓ Sempre escolher ou substituir guardiões
