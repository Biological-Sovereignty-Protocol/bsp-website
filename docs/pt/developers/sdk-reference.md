<div class="page-hero-image">
  <img src="/images/developers-sdk.png" alt="BSP SDK" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Referência do SDK

O BSP fornece SDKs oficiais para simplificar a integração. Tanto o `@bsp/sdk` (TypeScript) quanto o `bsp-sdk` (Python) compartilham exatamente os mesmos princípios arquiteturais e nomes de classes.

> [!TIP]
> Os exemplos abaixo usam sintaxe TypeScript, mas o equivalente Python é estruturalmente idêntico, seguindo padrões síncronos ou `async/await` nativos do Python.

## Clientes Principais

### `BSPClient`
O ponto de entrada principal do SDK. Gerencia a conexão com o Arweave, assinatura de transações e gerenciamento de identidade.

```typescript
import { BSPClient } from '@bsp/sdk';

// Inicializar um cliente para uma Instituição (IEO)
const client = new BSPClient({
  domain: "fleury.bsp",
  privateKey: process.env.BSP_PRIVATE_KEY,
  environment: "mainnet" // ou "testnet"
});
```

## Criando Registros

### `BioRecordBuilder`
Usado para construir objetos de dados imutáveis e válidos conforme o schema antes do envio.

```typescript
import { BioRecordBuilder } from '@bsp/sdk';

const builder = new BioRecordBuilder(client);

const record = builder
  .setBiomarker("BSP-LA-001") // hs-CRP
  .setValue(0.42)
  .setUnit("mg/L")
  .setCollectionTime("2026-02-26T08:30:00Z")
  .setSource("fleury.bsp") // assinado automaticamente
  .build();

// A validação acontece automaticamente no .build()
```

## Operações de Rede

### `submitRecords()`
Envia um ou mais BioRecords para um BEO alvo. Requer um `ConsentToken` válido.

```typescript
const response = await client.submitRecords({
  targetBeo: "andre.bsp",
  records: [record1, record2],
  consentToken: "token-uuid-abc123"
});

console.log(response.transactionId); // ID de transação Arweave
console.log(response.status); // "SUCCESS"
```

### `readRecords()`
Busca BioRecords descriptografados de um BEO, com escopo definido pelo consentimento fornecido.

```typescript
const results = await client.readRecords({
  targetBeo: "andre.bsp",
  consentToken: "token-uuid-def456",
  filter: {
    categories: ["BSP-LA", "BSP-CV"],
    period: {
      from: "2025-01-01T00:00:00Z",
      to: "2026-01-01T00:00:00Z"
    }
  }
});

console.log(`Recuperados ${results.records.length} registros.`);
```

## Controle de Acesso

### `issueConsentToken()`
*(Somente Titulares de BEO)*. Emite um novo token autorizando um IEO.

```typescript
const token = await client.access.issueConsentToken({
  ieoDomain: "dr-carlos.bsp",
  scope: {
    intents: ["READ_RECORDS"],
    categories: ["BSP-CV"],
    period: { from: null, to: null } // Todo o histórico
  },
  expiresInDays: 30
});
```

### `verifyToken()`
*(IEOs Alvo)*. Verifica se um token é válido para uma ação específica antes de tentar a transmissão de rede.

```typescript
const check = await client.access.verifyToken({
  beoDomain: "andre.bsp",
  token: "token-uuid",
  intent: "SUBMIT_RECORD"
});

if (!check.valid) {
  throw new Error(`Consentimento inválido: ${check.reason}`); // ex. "TOKEN_EXPIRED"
}
```
