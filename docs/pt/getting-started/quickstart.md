<div class="page-hero-image">
  <img src="/images/quickstart-hero.jpg" alt="BSP Developer Quickstart — SDK integration" style="width:100%;border-radius:16px;margin-bottom:2rem;box-shadow:0 8px 32px rgba(0,118,255,0.12);" />
</div>

# Início Rápido para Desenvolvedores BSP
*Do zero à primeira integração funcional em 30 minutos*

## O que você vai construir neste guia:
1. Criar um IEO para sua organização no Arweave (permanente, verificável)
2. Verificar ConsentTokens emitidos por usuários
3. Enviar BioRecords para um BEO autorizado (Laboratório/Wearable) ou Ler BioRecords de um BEO autorizado (Clínica/Plataforma)
4. Tratar erros corretamente

## Pré-requisitos
* Python 3.9+ ou Node.js 18+ instalado
* Conta Arweave com tokens AR
* ID legal da sua organização (CNPJ, EIN, etc.)

---

## Parte 1: Instalação e Configuração

### Passo 1: Instalar o bsp-sdk
O `bsp-sdk` abstrai toda a complexidade do protocolo: criptografia, comunicação com o Arweave, verificação de tokens e construção de BioRecords.

**Python**
```bash
pip install bsp-sdk
```

**TypeScript / Node.js**
```bash
npm install @bsp/sdk
```

### Passo 2: Configurar Variáveis de Ambiente
```env
# .env (nunca faça commit deste arquivo)
BSP_IEO_PRIVATE_KEY=your_private_key_here
BSP_NETWORK=testnet
BSP_REGISTRY_URL=https://api.biologicalsovereigntyprotocol.com
BSP_IEO_DOMAIN=yourlab.bsp
```

---

## Parte 2: Criar seu IEO

O IEO é a identidade permanente da sua organização no ecossistema BSP.

```python
from bsp_sdk import IEOBuilder, IEOType

ieo = IEOBuilder(
    domain      = "yourlab.bsp",
    name        = "Example Laboratory Ltd",
    ieo_type    = IEOType.LABORATORY,
    jurisdiction = "BR",
    legal_id    = "12.345.678/0001-99",
    contact     = "contact@ambrosioinstitute.org",
    website     = "https://yourlab.com",
).build()

result = ieo.register()
print(result.ieo_id)      # UUID permanente no Arweave
```

> **Atenção:** O IEO é permanente e público. Uma vez criado, fica registrado no Arweave para sempre. A chave privada gerada é a única forma de assinar operações.

---

## Parte 3A: Trilha Laboratório — Enviar BioRecords 🔬

### Passo 4A: Receber e Verificar um ConsentToken
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

### Passo 5A: Enviar um BioRecord
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

## Parte 3B: Trilha Clínica/Plataforma — Ler BioRecords 🩺

### Passo 4B: Ler dados de um BEO autorizado

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

## Parte 3C: Trilha Wearable/Dispositivo — Dados Contínuos ⌚

Wearables enviam dados `BSP-DV` em consolidações diárias.

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

## Próximos Passos
- **Testnet para Mainnet**: Quando sua integração funcionar em testnet, migre para mainnet.
- **Obter Certificação BSP**: A certificação voluntária adiciona você ao diretório oficial.
- **Integrar bsp-mcp para Agentes de IA**: O servidor MCP oficial para conectar agentes de IA aos BEOs dos usuários.
- **Propor um BIP**: Sugira novos biomarcadores para a taxonomia.
