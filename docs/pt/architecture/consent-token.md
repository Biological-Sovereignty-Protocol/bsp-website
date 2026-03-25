<div class="page-hero-image">
  <img src="/images/consent-flow.jpg" alt="Consent Flow" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# ConsentToken e Controle de Acesso

> "Consentimento não é uma política de privacidade. É uma instrução matemática registrada na blockchain."

## Visão Geral

O sistema de consentimento do BSP torna a soberania biológica uma realidade técnica. O **ConsentToken** é uma autorização criptográfica emitida pelo contrato inteligente `AccessControl` no Arweave após o titular assiná-la com sua chave privada.

**Nenhuma instituição pode ler ou gravar dados em um BEO sem um ConsentToken válido.** A blockchain faz cumprir — nenhum servidor pode contornar isso.

---

## Como o Consentimento Funciona

```
Usuário (Titular do BEO)
     │  assina autorização com chave privada
     ▼
Contrato Inteligente AccessControl (Arweave)
     │  cria ConsentToken on-chain
     ▼
Instituição (IEO)
     │  apresenta o token a cada requisição
     ▼
AccessControl verifica → concede ou rejeita
```

---

## Schema do ConsentToken

```typescript
interface ConsentToken {
  token_id:    string      // Identificador único para esta concessão de consentimento
  beo_id:      string      // O BEO que concede o consentimento
  ieo_id:      string      // O IEO que recebe a permissão
  granted_at:  string      // ISO8601
  expires_at:  string | null  // null = permanente até revogação

  scope: {
    intents:    BSPIntent[]   // Quais ações são permitidas
    categories: string[]      // Quais categorias BSP são acessíveis (ex: ["BSP-LA", "BSP-HM"])
    levels:     BioLevel[]    // Quais níveis da taxonomia
    period: {
      from: string | null
      to:   string | null
    } | null
    max_records: number | null
  }

  revocable:    boolean     // Sempre true
  revoked:      boolean
  revoked_at:   string | null
  owner_signature: string   // Assinatura Ed25519 do titular do BEO
  token_hash:   string      // Hash de verificação on-chain
}
```

---

## Tipos de Intent

| Intent | Descrição | Duração Típica |
|--------|-----------|---------------|
| `SUBMIT_RECORD` | Gravar um BioRecord no BEO | Uso único ou permanente |
| `READ_RECORDS` | Ler BioRecords do BEO | 30–90 dias (médicos); permanente (plataformas) |
| `ANALYZE_VITALITY` | Solicitar análise de vitalidade AVA | Permanente (renovável) |
| `REQUEST_SCORE` | Solicitar score SVA | Anual (planos de saúde com opt-in) |
| `EXPORT_DATA` | Exportar todos os dados — sempre disponível para o titular do BEO | — |
| `SYNC_PROTOCOL` | Negociação de versão do protocolo | Por sessão |

---

## Tipos de Token Padrão por Relacionamento

| Relacionamento | Duração | Escopo |
|----------------|---------|--------|
| Usuário → Laboratório (envio) | Uso único | `SUBMIT_RECORD` — apenas categorias específicas |
| Usuário → Médico (revisão) | 30–90 dias | `READ_RECORDS` — categorias selecionadas |
| Usuário → Hospital (tratamento) | Duração do tratamento | `READ_RECORDS` — todas as categorias relevantes |
| Usuário → Plataforma AVA | Permanente (renovável) | `ANALYZE_VITALITY` + `REQUEST_SCORE` |
| Usuário → Plano de Saúde (opt-in) | Anual — deve ser renovado | `REQUEST_SCORE` — apenas SVA composto |

---

## Verificar um Token (SDK Institucional)

```python
from bsp_sdk import BSPClient

client = BSPClient(
    ieo_domain  = "seulaboratorio.bsp",
    private_key = SUA_CHAVE_PRIVADA,
)

verification = client.verify_consent(
    token_id   = "token-uuid-apresentado-pelo-usuario",
    beo_domain = "patient.bsp",
    intent     = "SUBMIT_RECORD",
    category   = "BSP-HM",
)

if not verification.valid:
    print(verification.reason)
    # TOKEN_NOT_FOUND | TOKEN_REVOKED | TOKEN_EXPIRED
    # INTENT_NOT_AUTHORIZED | CATEGORY_NOT_AUTHORIZED
```

---

## Revogação

A revogação é **instantânea e on-chain**. No momento em que um usuário revoga um token, o contrato `AccessControl` marca como revogado. Todas as requisições subsequentes da instituição são imediatamente rejeitadas.

```python
# Do app do usuário (titular do BEO)
result = client.revoke_consent(token_id="token-uuid")
print(result.status)  # REVOKED — efeito imediato

# Ou revogar tudo de uma instituição de uma vez
client.revoke_all_from_ieo(ieo_domain="fleury.bsp")

# Opção nuclear — revogar todos os tokens ativos
client.revoke_all_tokens()
```

> **Instituições não são notificadas automaticamente.** Elas descobrem a revogação quando sua próxima requisição é rejeitada com `TOKEN_REVOKED`.

---

## Funções do Contrato AccessControl

| Função | Chamador Autorizado | Descrição |
|--------|--------------------|-----------|
| `grantConsent()` | Apenas titular do BEO | Emite um novo ConsentToken |
| `revokeToken()` | Apenas titular do BEO | Revoga imediatamente um token |
| `verifyToken()` | Qualquer IEO | Verifica se um token é válido para um dado intent + categoria |
| `listTokens()` | Apenas titular do BEO | Registro de auditoria completo de todos os tokens emitidos |

> [!IMPORTANT]
> Apenas o titular do BEO pode conceder ou revogar consentimento. Nenhuma instituição, nenhum outro sistema e nem mesmo o Ambrósio Institute pode conceder acesso aos dados de um usuário em seu nome.

---

## Códigos de Erro

| Código | Descrição | Retentável |
|--------|-----------|-----------|
| `TOKEN_NOT_FOUND` | ID do token não existe on-chain | Não — usuário deve reemitir |
| `TOKEN_REVOKED` | Revogado pelo titular | Não — nunca tentar novamente |
| `TOKEN_EXPIRED` | `expires_at` passou | Não — usuário deve renovar |
| `INTENT_NOT_AUTHORIZED` | Intent solicitado não está no escopo do token | Não |
| `CATEGORY_NOT_AUTHORIZED` | Categoria não está no escopo do token | Não |
| `BEO_LOCKED` | BEO está no estado LOCKED | Não — titular deve desbloquear |
