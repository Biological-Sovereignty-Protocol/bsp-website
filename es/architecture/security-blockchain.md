# Claves, Blockchain y Acceso

> "Cómo usuarios, laboratorios y sistemas se conectan al ecosistema — descentralizado, sin servidor central, sin intermediario, sin permiso previo."

## Parte 1: Claves Criptográficas — La Fundación

El BSP se construye sobre un principio único: **ninguna autoridad central controla el acceso a tus datos biológicos. Tú sí.** El instrumento de ese control es tu par de claves criptográficas.

### El Par de Claves

| | Clave Pública | Clave Privada |
|--|------------|-------------|
| **Qué es** | Tu dirección en el ecosistema BSP | Tu clave de control |
| **Quién la ve** | Cualquiera — se comparte libremente | Solo tú — nunca sale de tu dispositivo |
| **Usada para** | Los laboratorios cifran BioRecords antes del envío | Firmar autorizaciones, descifrar tus BioRecords |
| **Almacenada en** | BEORegistry en Arweave | Cifrada en tu app (enclave de hardware + biometría) |

### Generación de Claves (Ed25519)

```javascript
// 100% en el dispositivo
const entropy  = crypto.getRandomValues(new Uint8Array(32))
const mnemonic = bip39.entropyToMnemonic(entropy)
const seed     = await bip39.mnemonicToSeed(mnemonic)
const keyPair  = ed25519.fromSeed(seed.slice(0, 32))

const privateKey = keyPair.secretKey  // 64 bytes — permanece en el dispositivo siempre
const publicKey  = keyPair.publicKey  // 32 bytes — registrada en Arweave
```

**¿Por qué Ed25519?** Firmas compactas de 64 bytes, alto rendimiento, resistencia probada en entornos de bajo consumo (móvil).

---

## Parte 2: Recuperación Social — Sin Servidor Central

Perder tu clave privada significa pérdida permanente de acceso sin una copia de seguridad. El BSP resuelve esto con **Recuperación Social** mediante Shamir Secret Sharing.

### Cómo Funciona

```javascript
// La clave se divide en 3 fragmentos — cualquier 2 pueden reconstruirla
const fragments = shamirSplit(recovery_key, threshold=2, shares=3)

// Cada fragmento cifrado con la clave pública del guardián
guardian_1.fragment = encrypt(fragments[0], guardian_1_public_key)
guardian_2.fragment = encrypt(fragments[1], guardian_2_public_key)
guardian_3.fragment = encrypt(fragments[2], guardian_3_public_key)

// Almacenados en Arweave — visibles públicamente, ilegibles sin la clave privada del guardián
```

- **Ningún guardián puede actuar solo** — se requieren 2 de 3
- **El Instituto nunca está en este flujo** en ninguna etapa
- **Fragmentos almacenados en Arweave** — permanentes, cifrados, accesibles solo al guardián

### Flujo de Recuperación

```
1. Usuario abre app en dispositivo nuevo → genera nuevo par de claves localmente
2. Publica transacción RECOVERY_REQUEST en Arweave
3. Dos guardianes descifran su fragmento y publican transacciones GUARDIAN_CONFIRM
4. BEORegistry actualiza el BEO con la nueva clave pública
5. Clave antigua invalidada permanentemente
```

---

## Parte 3: Arweave — Almacenamiento Descentralizado Permanente

| Tipo de Almacenamiento | Riesgo |
|-------------|------|
| Base de datos tradicional | Controlada por una empresa — puede ser cerrada, hackeada o vendida |
| Blockchain estándar | Descentralizada, pero cara para datos grandes |
| **Arweave** | **Descentralizada + diseñada para almacenamiento permanente a gran escala** |

Paga una vez — los datos persisten durante **200+ años**, garantizados por un modelo matemático de dotación.

> Si el Ambrósio Institute cierra en 30 años, tu BEO y BioRecords permanecen accesibles de forma permanente en la red Arweave. Los datos soberanos sobreviven a sus creadores.

### Tipos de Transacción Arweave en BSP

| Tipo de Transacción | Cuándo |
|-----------------|------|
| `BEO_CREATE` | Creación de BEO |
| `BIORECORD_SUBMIT` | BioRecords escritos en el BEO |
| `CONSENT_ISSUE` | Nuevo ConsentToken emitido |
| `CONSENT_REVOKE` | ConsentToken revocado — efecto inmediato |
| `KEY_ROTATION` | Clave pública reemplazada tras recuperación |
| `RECOVERY_REQUEST` | Proceso de recuperación iniciado |
| `BEO_LOCK` | BEO bloqueado temporalmente por el titular |

**Propiedad clave**: Arweave nunca edita — acumula. El estado actual de un BEO se determina leyendo todas las transacciones y aplicando las reglas del BEORegistry.

---

## Parte 4: Contratos Inteligentes — Reglas Inmutables

Cinco contratos SmartWeave hacen cumplir el protocolo en Arweave. Una vez desplegados, son inmutables.

| Contrato | Propósito | Quién Puede Llamarlo |
|----------|---------|-------------|
| **BEORegistry** | Crea e indexa BEOs | Cualquiera — abierto |
| **IEORegistry** | Gestiona instituciones BSP-Certificadas | Instituto (certificación); cualquiera (verificar) |
| **DomainRegistry** | Garante de unicidad del namespace `.bsp` | SDK automáticamente |
| **AccessControl** | Gestión de consentimiento — el verdadero guardián | Titulares de BEO (otorgar/revocar); IEOs (verificar) |
| **Governance** | Multi-sig para cambios críticos del protocolo | 2 de 3 titulares de claves del Instituto |

### AccessControl en Código

```javascript
// Cómo AccessControl verifica cada operación
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

## Parte 5: El Modelo de Conectividad BSP (Como MCP)

El Model Context Protocol (MCP) de Anthropic permite que cualquiera construya un servidor MCP sin aprobación de Anthropic. La seguridad proviene del usuario que consiente activamente qué servidores puede acceder el asistente.

**BSP sigue la misma lógica exacta.**

### Cómo se Conecta Cada Actor

**El Usuario:**
```
App genera par de claves localmente → Crea BEO en Arweave →
Recibe dominio .bsp → Para cada institución, firma un ConsentToken
```

**El Laboratorio (certificado o no):**
```
pip install bsp-sdk → El usuario debe autorizar → Enviar BioRecords
(cifrados con la clave pública del usuario) → Escritos en Arweave
```

**AVA (el motor de inteligencia):**
```
Usuario inicia análisis activamente → App descifra BioRecords localmente →
Usuario envía a AVA con consentimiento explícito de sesión → AVA devuelve Puntuación SVA →
Datos brutos no retenidos por el Instituto tras el procesamiento
```

> **La diferencia clave**: En BSP, los datos no se mueven entre instituciones. Las instituciones envían datos *al usuario*. El usuario decide quién los lee.

---

## Parte 6: `bsp-registry-api` — El Relayer y Capa de Certificación

Si bien la blockchain resuelve el problema técnico de la intención inmutable, introduce fricción: **tarifas de gas (pagar en $AR para escribir datos)**. Para garantizar la adopción masiva, no se puede esperar que los pacientes gestionen carteras de criptomonedas.

El `bsp-registry-api` actúa como un **Relayer** cubriendo estos costos de forma segura.

### El Flujo de Relay Sin Gas (Firmas Off-Chain)

Si el Relayer API paga las transacciones, ¿cómo evitamos que actores maliciosos inunden la API o falsifiquen consentimientos BEO? **Firmas Ed25519 Off-Chain**.

1. **Intención del Usuario:** La app móvil del usuario quiere otorgar un consentimiento.
2. **Firma Local:** La app crea un payload JSON describiendo la intención y lo firma determinísticamente usando la **Clave Privada Ed25519** local del usuario.
3. **Verificación del Relayer:** La app envía el payload + firma Base64 al `bsp-registry-api`.
4. **Verificación Zero-Trust:** El Relayer API obtiene la clave pública del usuario del `BEORegistry` de Arweave. Verifica matemáticamente la firma contra el payload.
   - ❌ **Firma Inválida:** La solicitud se rechaza inmediatamente (`401 Unauthorized`). La API no gasta gas.
   - ✅ **Firma Válida:** La API envuelve la intención exacta del usuario en una transacción Arweave, paga el gas usando la cartera del Ambrósio Institute y la envía a SmartWeave.

Esto garantiza **Soberanía Criptográfica Absoluta**. Incluso si el Relayer API fuera comprometido, no puede falsificar consentimientos biológicos porque no posee la clave privada del usuario.

| Lo que pasa por `bsp-registry-api` | Lo que NUNCA pasa |
|----------------------------------------|--------------------------|
| ✓ Solicitudes de certificación y Sellos IEO | ✗ Datos biológicos del usuario (BioRecords) |
| ✓ Fragmentos Shamir cifrados de guardianes | ✗ La Clave Privada real |
| ✓ Payloads de intención firmados (Relayer) | ✗ Transacciones blockchain sin firmar |
