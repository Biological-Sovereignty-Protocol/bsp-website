# Tutoriales y Recetas

Estas guías prácticas conectan la teoría del protocolo con código funcional. Úsalas como punto de partida para tus propias integraciones BSP.

## 1. Integración de Laboratorio (Enviar Datos)
*Escenario: Una clínica quiere convertir automáticamente los resultados diarios de análisis de sangre en BioRecords BSP y enviarlos a los BEOs de los pacientes.*

### Paso 1: Conectarse a la Red
El laboratorio inicializa su identidad institucional usando su clave privada.

```python
from bsp_sdk import BSPClient

lab = BSPClient(
    domain="clinic.bsp",
    private_key=LAB_PRIVATE_KEY
)
```

### Paso 2: Validar el Consentimiento del Paciente
Antes de procesar datos, asegúrate de que el paciente te haya otorgado el derecho de enviar a su BEO.

```python
patient_domain = "andre.bsp"
intent = "SUBMIT_RECORD"

check = lab.access.verify_consent(
    beo_domain=patient_domain,
    intent=intent
)

if not check.valid:
    print(f"Cannot submit. Reason: {check.reason}")
    # ej., TOKEN_REVOKED o TOKEN_EXPIRED
    return
```

### Paso 3: Mapear Datos LIS al Formato BSP
Convierte los datos internos del laboratorio en BioRecords BSP estandarizados.

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

### Paso 4: Cifrar y Transmitir
Envía los registros a Arweave. El SDK maneja automáticamente el cifrado de los datos con la clave pública del paciente.

```python
response = lab.submit_records(
    target_beo=patient_domain,
    records=records,
    consent_token=check.token.token_id
)

print(f"Successfully secured {len(records)} records on-chain.")
```

---

## 2. Integración de Plataforma (Leer Datos)
*Escenario: Una plataforma de longevidad quiere leer el historial cardiovascular de un usuario para renderizar un widget de dashboard personalizado.*

### Paso 1: Solicitar Acceso
La plataforma solicita acceso al usuario. Esto generalmente activa un flujo en la app de wallet BSP del usuario.

```typescript
// La plataforma solicita un token acotando SOLO datos cardiovasculares
const requestUrl = platform.access.createAuthRequestUrl({
    intents: ["READ_RECORDS"],
    categories: ["BSP-CV"], // Enfoque cardiovascular
    durationDays: 30,       // Con límite de tiempo
    purpose: "Render the CV Health Dashboard"
});

// El usuario hace clic, aprueba en su dispositivo, devuelve un AuthToken activo
```

### Paso 2: Obtener y Filtrar Datos
Una vez autorizado, consulta la red para los registros relevantes. El SDK descifrará la respuesta localmente ya que opera en nombre de la sesión de consentimiento explícito del usuario.

```typescript
const cvRecords = await platform.readRecords({
    targetBeo: "andre.bsp",
    consentToken: activeAuthToken,
    filter: {
        categories: ["BSP-CV"],
        period: {
            from: "2024-01-01T00:00:00Z",
            to: null // Hasta hoy
        }
    }
});
```

### Paso 3: Agregar y Renderizar
Itera sobre los registros estandarizados sin preocuparte de qué laboratorio los produjo.

```typescript
// Todos los registros de LDL-P están estandarizados en nmol/L, independientemente del origen.
const ldlpHistory = cvRecords
    .filter(r => r.biomarker === "BSP-CV-001")
    .map(r => ({ date: r.collected_at, value: r.value }));

renderChart(ldlpHistory);
```
