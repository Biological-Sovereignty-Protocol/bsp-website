---
title: Guia de Implementação
---

# Guia de Implementação BSP

> Versão 0.2 — Guia prático para construir sobre o Protocolo de Soberania Biológica.

Este documento é para quem quer **construir**, não apenas ler a especificação. Escolha sua persona abaixo e siga os passos em ordem.

---

## Persona 1: O Desenvolvedor de App para Usuário

**Objetivo:** Construir um app onde usuários criam sua identidade BSP e gerenciam seus dados biológicos.

### Passo 1 — Configurar o bsp-id-web

Faça um fork da implementação de referência ou construa sua própria UI. O app de referência fica em `bsp-id-web/`.

```bash
git clone https://github.com/Biological-Sovereignty-Protocol/bsp-id-web
cd bsp-id-web
npm install
cp .env.example .env.local
```

### Passo 2 — Configurar a URL do relayer

O relayer é a API off-chain que conecta seu app aos contratos SmartWeave no Arweave. Aponte seu app para ele:

```env
# .env.local
NEXT_PUBLIC_BSP_RELAYER_URL=https://api.seudominio.com
```

Para desenvolvimento local, você pode rodar o relayer a partir de `bsp-registry-api/`:

```bash
cd bsp-registry-api
npm install
npm run dev
# Roda em http://localhost:3001
```

### Passo 3 — Implementar o fluxo de criação de BEO

A identidade de um usuário começa com uma frase-semente que gera um par de chaves, que então cria seu Objeto de Entidade Biológica (BEO).

```typescript
import { BSPClient, generateKeypair } from '@bsp/sdk';

const client = new BSPClient({ relayerUrl: process.env.NEXT_PUBLIC_BSP_RELAYER_URL });

// 1. Gerar frase-semente (mostre isso ao usuário — ele deve guardá-la)
const { mnemonic, keypair } = await generateKeypair();

// 2. Criar o BEO on-chain
const beo = await client.identity.createBEO({
  publicKey: keypair.publicKey,
  metadata: {
    alias: 'apelido-escolhido-pelo-usuario',  // opcional, não é PII
    created: Date.now(),
  }
});

console.log('BEO ID:', beo.id); // armazene isso localmente
```

### Passo 4 — Implementar UI do ConsentToken

Antes que qualquer instituição possa acessar os dados de um usuário, o usuário deve emitir um ConsentToken. Mostre a ele o que está autorizando.

```typescript
// Exibir a solicitação de consentimento ao usuário
function ConsentDialog({ request }) {
  return (
    <div>
      <h2>Solicitação de Acesso aos Dados</h2>
      <p>Instituição: {request.ieo.name}</p>
      <p>Escopo: {request.scope.join(', ')}</p>
      <p>Válido até: {new Date(request.period.end).toLocaleDateString()}</p>
      <button onClick={() => issueConsent(request)}>Autorizar</button>
      <button onClick={() => denyConsent(request)}>Negar</button>
    </div>
  );
}

// Emitir o token
async function issueConsent(request) {
  const token = await client.consent.issue({
    beoId: currentUser.beoId,
    ieoId: request.ieo.id,
    scope: request.scope,
    period: request.period,
    keypair: currentUser.keypair,
  });
  return token; // compartilhe este token com a instituição
}
```

### Passo 5 — Implementar exportação e backup de chave

Os usuários devem poder exportar sua chave privada. Se a perderem, seus dados ficam inacessíveis permanentemente.

```typescript
// Exportar backup de chave criptografado
const backup = await client.identity.exportKey({
  keypair: currentUser.keypair,
  password: userEnteredPassword, // criptografar com senha escolhida pelo usuário
});

// Oferecer download
const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
downloadFile(blob, `bsp-key-backup-${Date.now()}.json`);
```

Apresente este passo como obrigatório durante o onboarding, não como opcional.

---

## Persona 2: O Desenvolvedor Institucional (IEO)

**Objetivo:** Você gerencia um laboratório, clínica ou plataforma de saúde e quer receber dados de saúde BSP autorizados de usuários.

### Passo 1 — Criar seu IEO

Um Objeto de Entidade Institucional (IEO) é a identidade on-chain da sua instituição. Crie-o uma única vez.

```typescript
import { BSPClient } from '@bsp/sdk';

const client = new BSPClient({ relayerUrl: 'https://api.bsp.protocol' });

const ieo = await client.institutions.createIEO({
  name: 'Laboratório Clínico Exemplo',
  type: 'laboratory',   // laboratory | clinic | platform | research
  publicKey: yourInstitutionKeypair.publicKey,
  metadata: {
    jurisdiction: 'BR',
    contact: 'tech@laboratorioexemplo.com',
  }
});

console.log('IEO ID:', ieo.id); // armazene isso — identifica sua instituição
```

### Passo 2 — Solicitar consentimento dos usuários

Direcione os usuários para autorizar seu IEO. Você pode criar um deep link para o bsp-id-web ou implementar o fluxo de consentimento em seu próprio app.

```typescript
// Gerar um link de solicitação de consentimento
const consentUrl = client.consent.buildRequestUrl({
  ieoId: yourIeo.id,
  scope: ['BSP-HM', 'BSP-LF'],  // códigos de categoria da taxonomia de biomarcadores
  period: {
    start: Date.now(),
    end: Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 dias
  },
  callbackUrl: 'https://seuapp.com/bsp/callback',
});

// Envie esta URL ao usuário (email, SMS, link no app)
// Ele aprova no seu app de identidade BSP e seu callback recebe o ConsentToken
```

### Passo 3 — Verificar ConsentToken antes de aceitar dados

Nunca aceite envios de dados sem verificar o token. Isso não é opcional.

```typescript
async function handleDataSubmission(payload) {
  const { consentToken, biorecords } = payload;

  // Verificar se o token é válido, não expirado e cobre o escopo enviado
  const verification = await client.consent.verify({
    token: consentToken,
    ieoId: yourIeo.id,
    requiredScope: biorecords.map(r => r.biomarkerCode),
  });

  if (!verification.valid) {
    throw new Error(`Consentimento inválido: ${verification.reason}`);
  }

  // Seguro para prosseguir
  await storeRecords(biorecords, verification.beoId);
}
```

### Passo 4 — Enviar BioRecords usando ExchangeClient

```typescript
import { ExchangeClient } from '@bsp/sdk';

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
      biomarkerCode: 'BSP-HM-HCT',  // Hematócrito
      value: 42.1,
      unit: '%',
      collectedAt: '2024-01-15T09:30:00Z',
      method: 'venous_blood',
    }
  ],
});

console.log('ID da Transação:', result.txId); // Transação Arweave — permanente
```

### Passo 5 — Consultar registros autorizados

```typescript
// Buscar todos os registros que seu IEO está autorizado a ler para um BEO específico
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

## Persona 3: O Integrador de Protocolo

**Objetivo:** Rodar sua própria infraestrutura BSP — seu próprio nó/relayer para uma rede privada ou implantação regional.

### Passo 1 — Implantar os contratos SmartWeave

O BSP usa quatro contratos SmartWeave no Arweave. Implante-os nesta ordem (cada um depende do anterior).

```bash
cd bsp-spec/contracts  # ou obtenha do repositório de registro

# 1. BEORegistry — armazena todas as identidades de entidades biológicas
arweave deploy BEORegistry --wallet ./wallet.json

# 2. IEORegistry — armazena todas as identidades institucionais
arweave deploy IEORegistry --wallet ./wallet.json

# 3. AccessControl — gerencia tokens de consentimento e permissões de acesso
arweave deploy AccessControl --wallet ./wallet.json \
  --init '{"beoRegistry":"<BEO_TX_ID>","ieoRegistry":"<IEO_TX_ID>"}'

# 4. DomainRegistry — gerencia o namespace .bsp
arweave deploy DomainRegistry --wallet ./wallet.json \
  --init '{"accessControl":"<ACCESS_CONTROL_TX_ID>"}'
```

Salve os quatro IDs de transação. São permanentes e identificam sua implantação.

### Passo 2 — Configurar o bsp-registry-api (o relayer)

O relayer é a API HTTP com a qual seus apps se comunicam. Ele lida com batching, cache e tradução de chamadas REST em interações SmartWeave.

```bash
git clone https://github.com/Biological-Sovereignty-Protocol/bsp-registry-api
cd bsp-registry-api
npm install
```

Configure-o para apontar para seus contratos:

```env
# .env
ARWEAVE_HOST=arweave.net
ARWEAVE_PORT=443
ARWEAVE_PROTOCOL=https
ARWEAVE_WALLET_PATH=./wallet.json

BSP_BEO_REGISTRY_TX=<SEU_BEO_TX_ID>
BSP_IEO_REGISTRY_TX=<SEU_IEO_TX_ID>
BSP_ACCESS_CONTROL_TX=<SEU_ACCESS_CONTROL_TX_ID>
BSP_DOMAIN_REGISTRY_TX=<SEU_DOMAIN_REGISTRY_TX_ID>

PORT=3001
```

Inicie o relayer:

```bash
npm run build
npm start
# ou com PM2: pm2 start ecosystem.config.js
```

### Passo 3 — Configurar callers autorizados

Restrinja quais origens e chaves de API podem escrever no seu relayer.

```env
# .env — adicione estas linhas
ALLOWED_ORIGINS=https://seuapp.com,https://seupainelAdmin.com
API_KEYS=key_abc123,key_def456   # gere chaves aleatórias fortes
RATE_LIMIT_WRITES=100            # requisições de escrita por minuto por chave
RATE_LIMIT_READS=1000            # requisições de leitura por minuto por chave
```

Para produção, coloque o relayer atrás de um proxy reverso (nginx, Caddy) com TLS.

### Passo 4 — Apontar o bsp-id-web para seu relayer

Qualquer app compatível com BSP pode apontar para seu relayer configurando a URL do relayer:

```env
# No bsp-id-web ou em qualquer consumidor do SDK
NEXT_PUBLIC_BSP_RELAYER_URL=https://relayer.seudominio.com
```

Apps e SDKs são independentes do relayer. O mesmo código `@bsp/sdk` funciona contra qualquer relayer compatível.

---

## Armadilhas Comuns

### 1. Perder a chave privada

O par de chaves do usuário é a única credencial de acesso. Não há redefinição de senha, e-mail de recuperação ou ticket de suporte que possa restaurá-la. Torne o backup da chave um requisito obrigatório durante o onboarding, não uma sugestão.

### 2. Pular a verificação do ConsentToken

Se sua instituição aceita dados sem verificar o token, você não tem prova de consentimento. Isso é um risco de conformidade e uma violação do protocolo BSP. Sempre chame `client.consent.verify()` antes de processar envios.

### 3. Usar metadados mutáveis para identidade

Registros BEO e IEO no Arweave são permanentes. Não armazene PII (nome, data de nascimento, e-mail) no objeto on-chain. Armazene apenas a chave pública e um alias estável. Mantenha metadados sensíveis em seu próprio banco de dados, vinculado pelo ID do BEO.

### 4. Implantar contratos na ordem errada

O Registro de Consentimento precisa dos IDs de transação dos registros BEO e IEO no momento da implantação. O Índice de BioRecord precisa do TX ID do Registro de Consentimento. Implante em sequência: BEO → IEO → Consentimento → Índice.

### 5. Escopo excessivo em ConsentTokens

Solicite apenas os códigos de taxonomia de biomarcadores que você realmente precisa. Os usuários veem o escopo durante o diálogo de consentimento. Solicitar `BSP.*` (todos os dados) fará os usuários recusarem. Solicite o escopo mínimo para seu caso de uso.

### 6. Não lidar com a latência do Arweave

Transações Arweave não são instantâneas. Após enviar um registro, o `txId` é retornado imediatamente, mas o registro pode levar de 10 a 20 minutos para ser totalmente confirmado. Projete sua UX para mostrar um estado "pendente" em vez de assumir disponibilidade imediata.

---

*Perguntas ou correções? Abra uma issue ou PR. Este guia acompanha a especificação na versão 0.2.*
