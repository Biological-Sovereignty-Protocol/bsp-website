# Tutoriais e Receitas

Estes guias práticos fazem a ponte entre a teoria do protocolo e o código funcional. Use-os como ponto de partida para suas próprias integrações BSP.

## 1. Integração de Laboratório (Enviar Dados)
*Cenário: Uma clínica quer converter automaticamente resultados diários de exames de sangue em BioRecords BSP e enviá-los para os BEOs dos pacientes.*

### Passo 1: Conectar à Rede
O laboratório inicializa sua identidade institucional usando sua chave privada.

```python
from bsp_sdk import BSPClient

lab = BSPClient(
    domain="clinic.bsp",
    private_key=LAB_PRIVATE_KEY
)
```

### Passo 2: Validar Consentimento do Paciente
Antes de processar dados, certifique-se de que o paciente concedeu permissão para enviar ao seu BEO.

```python
patient_domain = "andre.bsp"
intent = "SUBMIT_RECORD"

check = lab.access.verify_consent(
    beo_domain=patient_domain,
    intent=intent
)

if not check.valid:
    print(f"Não é possível enviar. Motivo: {check.reason}")
    # e.g., TOKEN_REVOKED ou TOKEN_EXPIRED
    return
```

### Passo 3: Mapear Dados do LIS para o Formato BSP
Converter os dados internos do laboratório em BioRecords BSP padronizados.

```python
from bsp_sdk import BioRecordBuilder

records = []
for result in internal_lis_results:
    record = BioRecordBuilder(lab) \
        .set_biomarker(result.bsp_mapping_code) \
        .set_value(result.numeric_value) \
        .set_unit(result.unit) \
        .set_collected_at(result.timestamp) \
        .build()
    records.append(record)
```

### Passo 4: Criptografar e Transmitir
Enviar os registros ao Arweave. O SDK cuida automaticamente da criptografia dos dados com a chave pública do paciente.

```python
response = lab.submit_records(
    target_beo=patient_domain,
    records=records,
    consent_token=check.token.token_id
)

print(f"Registros protegidos com sucesso: {len(records)} registros on-chain.")
```

---

## 2. Integração de Plataforma (Ler Dados)
*Cenário: Uma plataforma de longevidade quer ler o histórico cardiovascular de um usuário para renderizar um widget personalizado no dashboard.*

### Passo 1: Solicitar Acesso
A plataforma solicita acesso ao usuário. Isso geralmente aciona um fluxo no aplicativo de carteira BSP do usuário.

```typescript
// A plataforma solicita um token com escopo APENAS para dados cardiovasculares
const requestUrl = platform.access.createAuthRequestUrl({
    intents: ["READ_RECORDS"],
    categories: ["BSP-CV"], // Foco cardiovascular
    durationDays: 30,       // Limitado no tempo
    purpose: "Renderizar o Dashboard de Saúde CV"
});

// O usuário clica, aprova no seu dispositivo e retorna um AuthToken ativo
```

### Passo 2: Buscar e Filtrar Dados
Uma vez autorizado, consulte a rede pelos registros relevantes. O SDK descriptografará a resposta localmente, pois opera com base na sessão de consentimento explícito do usuário.

```typescript
const cvRecords = await platform.readRecords({
    targetBeo: "andre.bsp",
    consentToken: activeAuthToken,
    filter: {
        categories: ["BSP-CV"],
        period: {
            from: "2024-01-01T00:00:00Z",
            to: null // Até hoje
        }
    }
});
```

### Passo 3: Agregar e Renderizar
Itere sobre os registros padronizados sem se preocupar com qual laboratório os produziu.

```typescript
// Todos os registros de LDL-P são padronizados em nmol/L, independente da fonte.
const ldlpHistory = cvRecords
    .filter(r => r.biomarker === "BSP-CV-001")
    .map(r => ({ date: r.collected_at, value: r.value }));

renderChart(ldlpHistory);
```
