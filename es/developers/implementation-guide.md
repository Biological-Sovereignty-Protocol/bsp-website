---
title: Guía de Implementación
---

# Guía de Implementación BSP

> Versión 0.2 — Guía práctica para construir sobre el Biological Sovereignty Protocol.

Este documento es para quienes quieren **construir**, no solo leer la especificación. Elige tu perfil abajo y sigue los pasos en orden.

---

## Perfil 1: El Desarrollador de App de Usuario

**Objetivo:** Construir una app donde los usuarios creen su identidad BSP y gestionen sus datos biológicos.

### Paso 1 — Configurar bsp-id-web

Haz un fork de la implementación de referencia o construye tu propia interfaz. La app de referencia está en `bsp-id-web/`.

```bash
git clone https://github.com/Biological-Sovereignty-Protocol/bsp-id-web
cd bsp-id-web
npm install
cp .env.example .env.local
```

### Paso 2 — Configurar la URL del relayer

El relayer es la API off-chain que conecta tu app con los procesos AO en Arweave. Apunta tu app hacia él:

```env
# .env.local
NEXT_PUBLIC_BSP_RELAYER_URL=https://api.yourdomain.com
```

Para desarrollo local, puedes ejecutar el relayer desde `bsp-registry-api/`:

```bash
cd bsp-registry-api
npm install
npm run dev
# Corre en http://localhost:3001
```

### Paso 3 — Implementar el flujo de creación de BEO

La identidad de un usuario comienza con una seed phrase que genera un keypair, que luego crea su Biological Entity Object (BEO).

```typescript
import { BSPClient, generateKeypair } from 'bsp-sdk';

const client = new BSPClient({ relayerUrl: process.env.NEXT_PUBLIC_BSP_RELAYER_URL });

// 1. Generar seed phrase (mostrar esto al usuario — debe guardarlo)
const { mnemonic, keypair } = await generateKeypair();

// 2. Crear el BEO on-chain
const beo = await client.identity.createBEO({
  publicKey: keypair.publicKey,
  metadata: {
    alias: 'user-chosen-alias',  // opcional, no PII
    created: Date.now(),
  }
});

console.log('BEO ID:', beo.id); // guardar esto localmente
```

### Paso 4 — Implementar la interfaz de ConsentToken

Antes de que cualquier institución pueda acceder a los datos del usuario, este debe emitir un ConsentToken. Muéstrale qué está autorizando.

```typescript
// Mostrar la solicitud de consentimiento al usuario
function ConsentDialog({ request }) {
  return (
    <div>
      <h2>Solicitud de Acceso a Datos</h2>
      <p>Institución: {request.ieo.name}</p>
      <p>Alcance: {request.scope.join(', ')}</p>
      <p>Válido hasta: {new Date(request.period.end).toLocaleDateString()}</p>
      <button onClick={() => issueConsent(request)}>Autorizar</button>
      <button onClick={() => denyConsent(request)}>Denegar</button>
    </div>
  );
}

// Emitir el token
async function issueConsent(request) {
  const token = await client.consent.issue({
    beoId: currentUser.beoId,
    ieoId: request.ieo.id,
    scope: request.scope,
    period: request.period,
    keypair: currentUser.keypair,
  });
  return token; // compartir este token con la institución
}
```

### Paso 5 — Implementar exportación y copia de seguridad de clave

Los usuarios deben poder exportar su clave privada. Si la pierden, sus datos son permanentemente inaccesibles.

```typescript
// Exportar copia de seguridad de clave cifrada
const backup = await client.identity.exportKey({
  keypair: currentUser.keypair,
  password: userEnteredPassword, // cifrar con contraseña elegida por el usuario
});

// Ofrecer descarga
const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
downloadFile(blob, `bsp-key-backup-${Date.now()}.json`);
```

Presentar este paso como obligatorio durante el onboarding, no opcional.

---

## Perfil 2: El Desarrollador Institucional (IEO)

**Objetivo:** Gestionas un laboratorio, clínica o plataforma de salud y quieres recibir datos de salud autorizados por BSP de los usuarios.

### Paso 1 — Crear tu IEO

Un Institutional Entity Object (IEO) es la identidad on-chain de tu institución. Créalo una sola vez.

```typescript
import { BSPClient } from 'bsp-sdk';

const client = new BSPClient({ relayerUrl: 'https://api.bsp.protocol' });

const ieo = await client.institutions.createIEO({
  name: 'Acme Clinical Lab',
  type: 'laboratory',   // laboratory | clinic | platform | research
  publicKey: yourInstitutionKeypair.publicKey,
  metadata: {
    jurisdiction: 'AR',
    contact: 'tech@acmelab.com',
  }
});

console.log('IEO ID:', ieo.id); // guardar esto — identifica tu institución
```

### Paso 2 — Solicitar consentimiento a los usuarios

Dirige a los usuarios para que autoricen tu IEO. Puedes hacer un deep-link a bsp-id-web o implementar el flujo de consentimiento en tu propia app.

```typescript
// Generar un enlace de solicitud de consentimiento
const consentUrl = client.consent.buildRequestUrl({
  ieoId: yourIeo.id,
  scope: ['BSP-HM', 'BSP-LF'],  // códigos de categoría de taxonomía de biomarcadores
  period: {
    start: Date.now(),
    end: Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 días
  },
  callbackUrl: 'https://yourapp.com/bsp/callback',
});

// Enviar esta URL al usuario (email, SMS, enlace in-app)
// Lo aprueba en su app de identidad BSP, luego tu callback recibe el ConsentToken
```

### Paso 3 — Verificar el ConsentToken antes de aceptar datos

Nunca aceptes envíos de datos sin verificar el token. Esto no es opcional.

```typescript
async function handleDataSubmission(payload) {
  const { consentToken, biorecords } = payload;

  // Verificar que el token es válido, no expirado y cubre el alcance enviado
  const verification = await client.consent.verify({
    token: consentToken,
    ieoId: yourIeo.id,
    requiredScope: biorecords.map(r => r.biomarkerCode),
  });

  if (!verification.valid) {
    throw new Error(`Consentimiento inválido: ${verification.reason}`);
  }

  // Seguro para proceder
  await storeRecords(biorecords, verification.beoId);
}
```

### Paso 4 — Enviar BioRecords usando ExchangeClient

```typescript
import { ExchangeClient } from 'bsp-sdk';

const exchange = new ExchangeClient({
  ieoId: yourIeo.id,
  keypair: yourInstitutionKeypair,
  relayerUrl: 'https://api.bsp.protocol',
});

const result = await exchange.submitRecords({
  consentToken: verifiedToken,
  records: [
    {
      biomarkerCode: 'BSP-HM-HGB',  // Hemoglobina
      value: 14.2,
      unit: 'g/dL',
      collectedAt: '2024-01-15T09:30:00Z',
      method: 'venous_blood',
    },
    {
      biomarkerCode: 'BSP-HM-HCT',  // Hematocrito
      value: 42.1,
      unit: '%',
      collectedAt: '2024-01-15T09:30:00Z',
      method: 'venous_blood',
    }
  ],
});

console.log('Transaction ID:', result.txId); // transacción Arweave — permanente
```

### Paso 5 — Consultar registros autorizados

```typescript
// Obtener todos los registros que tu IEO está autorizado a leer para un BEO específico
const records = await exchange.queryRecords({
  beoId: patientBeoId,
  scope: ['BSP-HM'],
  dateRange: {
    from: '2024-01-01',
    to: '2024-12-31',
  }
});

records.forEach(record => {
  console.log(`${record.biomarkerCode}: ${record.value} ${record.unit}`);
});
```

---

## Perfil 3: El Integrador de Protocolo

**Objetivo:** Ejecutar tu propia infraestructura BSP — tu propio nodo/relayer para una red privada o despliegue regional.

### Paso 1 — Desplegar los procesos AO

BSP usa cuatro procesos AO en Arweave. Despliégalos en este orden (cada uno depende del anterior).

```bash
cd bsp-spec/contracts  # o obtener del repositorio del registro

# 1. BEORegistry — almacena todas las identidades de entidades biológicas
arweave deploy BEORegistry --wallet ./wallet.json

# 2. IEORegistry — almacena todas las identidades institucionales
arweave deploy IEORegistry --wallet ./wallet.json

# 3. AccessControl — gestiona tokens de consentimiento y permisos de acceso
arweave deploy AccessControl --wallet ./wallet.json \
  --init '{"beoRegistry":"<BEO_TX_ID>","ieoRegistry":"<IEO_TX_ID>"}'

# 4. DomainRegistry — gestiona el namespace .bsp
arweave deploy DomainRegistry --wallet ./wallet.json \
  --init '{"accessControl":"<ACCESS_CONTROL_TX_ID>"}'
```

Guarda los cuatro IDs de transacción. Son permanentes e identifican tu despliegue.

### Paso 2 — Configurar bsp-registry-api (el relayer)

El relayer es la API HTTP con la que hablan tus apps. Maneja batching, caché y traduce llamadas REST a mensajes AO.

```bash
git clone https://github.com/Biological-Sovereignty-Protocol/bsp-registry-api
cd bsp-registry-api
npm install
```

Configúralo para apuntar a tus contratos:

```env
# .env
ARWEAVE_HOST=arweave.net
ARWEAVE_PORT=443
ARWEAVE_PROTOCOL=https
ARWEAVE_WALLET_PATH=./wallet.json

BSP_BEO_REGISTRY_TX=<TU_BEO_TX_ID>
BSP_IEO_REGISTRY_TX=<TU_IEO_TX_ID>
BSP_ACCESS_CONTROL_TX=<TU_ACCESS_CONTROL_TX_ID>
BSP_DOMAIN_REGISTRY_TX=<TU_DOMAIN_REGISTRY_TX_ID>

PORT=3001
```

Iniciar el relayer:

```bash
npm run build
npm start
# o con PM2: pm2 start ecosystem.config.js
```

### Paso 3 — Configurar callers autorizados

Restringe qué orígenes y API keys pueden escribir en tu relayer.

```env
# .env — agregar esto
ALLOWED_ORIGINS=https://tuapp.com,https://tupaneladmin.com
API_KEYS=key_abc123,key_def456   # generar claves aleatorias fuertes
RATE_LIMIT_WRITES=100            # solicitudes de escritura por minuto por clave
RATE_LIMIT_READS=1000            # solicitudes de lectura por minuto por clave
```

Para producción, coloca el relayer detrás de un reverse proxy (nginx, Caddy) con TLS.

### Paso 4 — Apuntar bsp-id-web a tu relayer

Cualquier app compatible con BSP puede apuntar a tu relayer configurando la URL del relayer:

```env
# En bsp-id-web o cualquier consumidor del SDK
NEXT_PUBLIC_BSP_RELAYER_URL=https://relayer.tudominio.com
```

Las apps y SDKs son agnósticos al relayer. El mismo código `bsp-sdk` funciona contra cualquier relayer compatible.

---

## Errores Comunes

### 1. Perder la clave privada

El keypair del usuario es la única credencial de acceso. No hay restablecimiento de contraseña, ni email de recuperación, ni ticket de soporte que pueda restaurarlo. Haz que la copia de seguridad de la clave sea un requisito obligatorio durante el onboarding, no una sugerencia.

### 2. Omitir la verificación del ConsentToken

Si tu institución acepta datos sin verificar el token, no tienes prueba de consentimiento. Esto es un riesgo de cumplimiento y una violación del protocolo BSP. Siempre llama a `client.consent.verify()` antes de procesar envíos.

### 3. Usar metadatos mutables para la identidad

Los registros de BEO e IEO en Arweave son permanentes. No almacenes PII (nombre, fecha de nacimiento, email) en el objeto on-chain. Almacena solo la clave pública y un alias estable. Guarda los metadatos sensibles en tu propia base de datos, vinculados por BEO ID.

### 4. Desplegar contratos en orden incorrecto

El Consent Registry necesita los IDs de transacción del registro BEO e IEO en el momento del despliegue. El BioRecord Index necesita el TX ID del Consent Registry. Despliega en secuencia: BEO → IEO → Consent → Index.

### 5. Exceso de alcance en los ConsentTokens

Solicita solo los códigos de taxonomía de biomarcadores que realmente necesitas. Los usuarios ven el alcance durante el diálogo de consentimiento. Solicitar `BSP.*` (todos los datos) hará que los usuarios rechacen. Solicita el alcance mínimo para tu caso de uso.

### 6. No manejar la latencia de Arweave

Las transacciones de Arweave no son instantáneas. Después de enviar un registro, el `txId` se devuelve inmediatamente pero el registro puede tardar 10-20 minutos en confirmarse completamente. Diseña tu UX para mostrar un estado "pendiente" en lugar de asumir disponibilidad inmediata.

---

*¿Preguntas o correcciones? Abre un issue o PR. Esta guía sigue la especificación en la versión 0.2.*
