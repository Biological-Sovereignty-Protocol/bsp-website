<div class="page-hero-image">
  <img src="/images/quickstart-hero.png" alt="BSP Developer Quickstart — SDK integration" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# BSP Developer Quickstart
*De cero a tu primera integración funcional en 30 minutos*

## Lo que construirás en esta guía:
1. Crear un IEO para tu organización en Arweave (permanente, verificable)
2. Verificar ConsentTokens emitidos por usuarios
3. Enviar BioRecords a un BEO autorizado (Laboratorio/Wearable) o Leer BioRecords de un BEO autorizado (Clínica/Plataforma)
4. Manejar errores correctamente

## Prerrequisitos
* Python 3.9+ o Node.js 18+ instalado
* Cuenta de Arweave con tokens AR
* ID legal de tu organización (CNPJ, EIN, etc.)

---

## Parte 1: Instalación y Configuración

### Paso 1: Instalar el bsp-sdk
El `bsp-sdk` abstrae toda la complejidad del protocolo: criptografía, comunicación con Arweave, verificación de tokens y construcción de BioRecords.

**Python**
```bash
pip install bsp-sdk
```

**TypeScript / Node.js**
```bash
npm install @bsp/sdk
```

### Paso 2: Configurar Variables de Entorno
```env
# .env (nunca subir este archivo al repositorio)
BSP_IEO_PRIVATE_KEY=your_private_key_here
BSP_NETWORK=testnet
BSP_REGISTRY_URL=https://api.biologicalsovereigntyprotocol.com
BSP_IEO_DOMAIN=yourlab.bsp
```

---

## Parte 2: Crear tu IEO

El IEO es la identidad permanente de tu organización en el ecosistema BSP.

```python
from bsp_sdk import IEOBuilder, IEOType

ieo = IEOBuilder(
    domain      = "yourlab.bsp",
    name        = "Laboratorio Ejemplo S.A.",
    ieo_type    = IEOType.LABORATORY,
    jurisdiction = "AR",
    legal_id    = "30-12345678-9",
    contact     = "contacto@tulaboratorio.com",
    website     = "https://yourlab.com",
).build()

result = ieo.register()
print(result.ieo_id)      # UUID permanente en Arweave
```

> **Nota:** El IEO es permanente y público. Una vez creado, queda registrado en Arweave para siempre. La clave privada generada es la única forma de firmar operaciones.

---

## Parte 3A: Ruta Laboratorio — Enviar BioRecords

### Paso 4A: Recibir y Verificar un ConsentToken
```python
from bsp_sdk import BSPClient, BSPIntent
import os

client = BSPClient(
    ieo_domain  = os.getenv("BSP_IEO_DOMAIN"),
    private_key = os.getenv("BSP_IEO_PRIVATE_KEY"),
)

token_id = "token-uuid-abc123"
beo_domain = "patient.bsp"

verification = client.verify_consent(
    token_id   = token_id,
    beo_domain = beo_domain,
    intent     = BSPIntent.SUBMIT_RECORD,
    category   = "BSP-HM",
)

if verification.valid:
    print("Token válido")
```

### Paso 5A: Enviar un BioRecord
```python
result = client.submit_biorecord(
    beo_domain   = "patient.bsp",
    consent_token = token_id,
    biomarker    = "BSP-HM-001",
    value        = 13.8,
    unit         = "g/dL",
    collected_at = "2026-02-26T08:00:00Z",
    ref_range    = {
        "optimal":    "13.5-17.5",
        "functional": "12.0-17.5",
        "deficiency": "<12.0"
    }
)
```

---

## Parte 3B: Ruta Clínica/Plataforma — Leer BioRecords

### Paso 4B: Leer datos de un BEO autorizado

```python
response = client.read_records(
    beo_domain    = "patient.bsp",
    consent_token = "token-uuid-xyz",
    filters = {
        "categories": ["BSP-CV", "BSP-GL", "BSP-LP"],
        "period": {
            "from": "2025-02-26T00:00:00Z",
            "to":   None
        },
        "limit": 100
    }
)

for record in response.records:
    print(f"{record.biomarker}: {record.value} {record.unit}")
```

---

## Parte 3C: Ruta Wearable/Dispositivo — Datos Continuos

Los wearables envían datos `BSP-DV` en consolidaciones diarias.

```python
daily_records = [
    BioRecord(
        biomarker    = "BSP-DV-001",
        value        = 52.3,
        unit         = "ms",
        collected_at = f"{today}T23:59:00Z",
        ref_range    = { "optimal": ">60", "functional": ">40", "deficiency": "<40" },
    )
]

result = client.submit_biorecords(
    beo_domain    = "user.bsp",
    consent_token = "token-wearable-permanent",
    records       = daily_records,
    collected_at  = f"{today}T23:59:00Z",
)
```

## Próximos Pasos
- **De testnet a mainnet**: Una vez que tu integración funcione en testnet, migra a mainnet.
- **Obtener Certificación BSP**: La certificación voluntaria te agrega al directorio oficial.
- **Integrar bsp-mcp para Agentes de IA**: El servidor MCP oficial para conectar agentes de IA a los BEOs de los usuarios.
- **Proponer un BIP**: Sugiere nuevos biomarcadores para la taxonomía.
