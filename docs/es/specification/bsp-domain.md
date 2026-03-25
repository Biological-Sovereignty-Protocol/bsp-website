---
title: Sistema de Dominios BSP — .bsp
---

# Sistema de Dominios BSP — .bsp

> Versión 0.2 | Ambrósio Institute

---

## Visión General

Cada BEO e IEO en el ecosistema BSP se identifica por un dominio `.bsp` legible por humanos — una dirección biológica permanente y soberana registrada en la blockchain Arweave a través del contrato inteligente DomainRegistry.

El namespace `.bsp` está gestionado por el Ambrósio Institute. La asignación de dominios y la unicidad se aplican on-chain — no mediante un servidor central.

---

## Tipos de Dominio

| Tipo | Formato | Ejemplo | Costo | Transferible |
|---|---|---|---|---|
| Individual | `nombre.bsp` | `andre.bsp` | Gratuito | Nunca |
| Individual (privacidad) | `iniciales-año.bsp` | `am1985.bsp` | Gratuito | Nunca |
| Individual (anónimo) | `[aleatorio].bsp` | `b7k3m.bsp` | Gratuito | Nunca |
| Profesional | `dr.nombre.bsp` | `dr.carlos.bsp` | De pago, permanente | Nunca |
| Institucional | `institucion.bsp` | `fleury.bsp` | De pago, anual | Sí |
| Investigación | `org.tema.bsp` | `usp.longevity.bsp` | De pago | No |
| Sub-institucional | `nombre@institucion.bsp` | `dr.silva@hcor.bsp` | Bajo tarifa hospitalaria | No |

---

## Reglas de Dominio

### Permanencia
Los dominios individuales son permanentes y no transferibles. Una vez que `andre.bsp` es reclamado, existe para siempre en Arweave y no puede ser transferido a otra persona ni eliminado.

### Unicidad
El contrato inteligente DomainRegistry garantiza que cada dominio `.bsp` solo puede existir una vez. No pueden existir dos entidades con el mismo dominio.

### Insensibilidad a Mayúsculas
Todos los dominios `.bsp` se almacenan y resuelven en minúsculas. `Andre.bsp` y `andre.bsp` hacen referencia al mismo dominio.

### Namespaces Reservados
Los siguientes prefijos están reservados por el Ambrósio Institute:
- `bsp.*` — Infraestructura del protocolo
- `institute.*` — Operaciones del Instituto
- `registry.*` — Servicios de registro
- `test.*` — Entornos de prueba

---

## Resolución de Dominio

```typescript
// Resolver un dominio .bsp a un BEO o IEO
import { DomainResolver } from '@bsp/sdk'

const resolver = new DomainResolver()

// Resolver dominio individual
const beo = await resolver.resolve('andre.bsp')
// Devuelve: { type: 'BEO', beo_id: '550e8400-...', public_key: 'ed25519:...' }

// Resolver dominio institucional
const ieo = await resolver.resolve('fleury.bsp')
// Devuelve: { type: 'IEO', ieo_id: '9f1a2b3c-...', ieo_type: 'LABORATORY', ... }

// Verificar disponibilidad
const available = await resolver.isAvailable('newname.bsp')
// Devuelve: true | false
```

---

## Protocolo de Recuperación Social

Si un titular de BEO pierde su clave privada, la red de guardianes permite la recuperación.

### Configuración

```typescript
// En la creación del BEO o en cualquier momento posterior
const recovery = new RecoveryManager(beoId)

await recovery.addGuardian({
  name: 'Maria',
  contact: 'maria@example.com',   // Cifrado y almacenado on-chain
  public_key: 'ed25519:...'
})

// Establecer umbral de recuperación
await recovery.setThreshold({ required: 2, total: 3 })
```

### Flujo de Recuperación

1. El titular pierde su dispositivo y/o clave privada
2. El titular contacta a 2 de 3 guardianes
3. Cada guardián envía una confirmación firmada on-chain
4. Después de 2 confirmaciones: se puede registrar un nuevo par de claves
5. La clave antigua queda revocada; la nueva clave se asocia al dominio

```typescript
// Guardián envía confirmación
const recovery = new RecoveryManager(beoId)
await recovery.confirmRecovery({
  guardian_key: guardianPrivateKey,
  new_public_key: recoveryPublicKey,  // Nueva clave del titular
  request_id: recoveryRequestId
})
```

### Propiedades de Seguridad
- Ningún guardián individual puede restaurar el acceso por sí solo
- No hay ningún servidor central involucrado
- El protocolo de recuperación se ejecuta on-chain
- La solicitud tiene un tiempo límite (72 horas por defecto)
- Todos los eventos de recuperación son permanentemente auditables

---

## Copia de Seguridad de la Seed Phrase

Como último recurso (todos los guardianes no disponibles), la seed phrase de 24 palabras proporciona recuperación de emergencia.

La seed phrase se genera en la creación del BEO y el titular debe escribirla y guardarla offline. El sistema BSP almacena solo un hash criptográfico — nunca la frase en sí misma.

> **Advertencia:** Si la seed phrase se pierde y no hay guardianes disponibles, nadie — incluido el Ambrósio Institute — puede recuperar el acceso al BEO. Guárdala de forma segura.

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
