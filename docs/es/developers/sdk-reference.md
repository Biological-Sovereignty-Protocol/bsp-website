<div class="page-hero-image">
  <img src="/images/developers-sdk.jpg" alt="BSP SDK" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Referencia del SDK

BSP proporciona SDKs oficiales para simplificar la integración. Tanto `@bsp/sdk` (TypeScript) como `bsp-sdk` (Python) comparten exactamente los mismos principios arquitectónicos y nombres de clases.

> [!TIP]
> Los ejemplos abajo usan sintaxis TypeScript, pero el equivalente en Python es estructuralmente idéntico, siguiendo patrones síncronos o `async/await` nativos de Python.

## Clientes Principales

### `BSPClient`
El punto de entrada principal del SDK. Maneja la conexión con Arweave, la firma de transacciones y la gestión de identidad.

```typescript
import { BSPClient } from '@bsp/sdk';

// Inicializar un cliente para una Institución (IEO)
const client = new BSPClient({
  domain: "fleury.bsp",
  privateKey: process.env.BSP_PRIVATE_KEY,
  environment: "mainnet" // or "testnet"
});
```

## Creación de Registros

### `BioRecordBuilder`
Usado para construir objetos de datos inmutables y válidos según el schema antes del envío.

```typescript
import { BioRecordBuilder } from '@bsp/sdk';

const builder = new BioRecordBuilder(client);

const record = builder
  .setBiomarker("BSP-LA-001") // hs-CRP
  .setValue(0.42)
  .setUnit("mg/L")
  .setCollectionTime("2026-02-26T08:30:00Z")
  .setSource("fleury.bsp") // firmado automáticamente
  .build();

// La validación ocurre automáticamente en .build()
```

## Operaciones de Red

### `submitRecords()`
Envía uno o más BioRecords a un BEO destino. Requiere un `ConsentToken` válido.

```typescript
const response = await client.submitRecords({
  targetBeo: "andre.bsp",
  records: [record1, record2],
  consentToken: "token-uuid-abc123"
});

console.log(response.transactionId); // ID de transacción Arweave
console.log(response.status); // "SUCCESS"
```

### `readRecords()`
Obtiene BioRecords descifrados de un BEO, acotados por el consentimiento proporcionado.

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

console.log(`Retrieved ${results.records.length} records.`);
```

## Control de Acceso

### `issueConsentToken()`
*(Solo Titulares de BEO)*. Emite un nuevo token autorizando a un IEO.

```typescript
const token = await client.access.issueConsentToken({
  ieoDomain: "dr-carlos.bsp",
  scope: {
    intents: ["READ_RECORDS"],
    categories: ["BSP-CV"],
    period: { from: null, to: null } // Todo el historial
  },
  expiresInDays: 30
});
```

### `verifyToken()`
*(IEOs destinatarios)*. Verifica si un token es válido para una acción específica antes de intentar la transmisión por red.

```typescript
const check = await client.access.verifyToken({
  beoDomain: "andre.bsp",
  token: "token-uuid",
  intent: "SUBMIT_RECORD"
});

if (!check.valid) {
  throw new Error(`Consent invalid: ${check.reason}`); // ej., "TOKEN_EXPIRED"
}
```
