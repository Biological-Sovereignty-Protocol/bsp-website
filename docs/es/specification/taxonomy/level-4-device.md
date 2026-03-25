---
title: Taxonomía — Nivel 4 Device
---

# Taxonomía BSP — Nivel 4: Biomarcadores de Dispositivo

> Versión 0.2 | Ambrósio Institute

Datos biométricos continuos de dispositivos wearables y equipos de monitoreo. Se envían como BioRecords consolidados diarios — resúmenes estadísticos de mediciones continuas.

**Nota:** Los IEOs de wearables envían registros consolidados diarios por biomarcador — no datos brutos segundo a segundo. Esto previene la sobrecarga de infraestructura mientras preserva la utilidad clínica.

---

## Categoría 25 — Dispositivo y Monitoreo Continuo (BSP-DV)

### Cardíaco y Cardiovascular

| Código BSP | Biomarcador | Unidad | Consolidación |
|---|---|---|---|
| `BSP-DV-001` | Variabilidad de Frecuencia Cardíaca (RMSSD) | ms | Media diaria + DE |
| `BSP-DV-002` | Frecuencia Cardíaca en Reposo | bpm | Media diaria + mín |
| `BSP-DV-003` | VFC (SDNN) | ms | Media diaria |
| `BSP-DV-004` | ECG — Clasificación de Ritmo | categórico | Archivo continuo (comprimido) |
| `BSP-DV-005` | Presión Arterial (continua) | mmHg | Media diaria + pico |

### Respiratorio y Oxigenación

| Código BSP | Biomarcador | Unidad | Consolidación |
|---|---|---|---|
| `BSP-DV-006` | SpO2 (oxígeno en sangre) | % | Media diaria + nadir |
| `BSP-DV-007` | Frecuencia Respiratoria | respiraciones/min | Media diaria + nocturna |

### Metabólico

| Código BSP | Biomarcador | Unidad | Consolidación |
|---|---|---|---|
| `BSP-DV-008` | Glucosa Continua (CGM) | mg/dL | Media diaria, DE, TIR, TAR, TBR |
| `BSP-DV-009` | Temperatura de Piel | °C | Media diaria + delta nocturno |
| `BSP-DV-010` | Temperatura Corporal Central | °C | Media diaria |

### Actividad y Movimiento

| Código BSP | Biomarcador | Unidad | Consolidación |
|---|---|---|---|
| `BSP-DV-011` | Pasos Diarios | pasos | Total diario |
| `BSP-DV-012` | Gasto Energético Activo | kcal | Total diario |
| `BSP-DV-013` | VO2 Máx (estimado) | mL/kg/min | Semanal (métrica estable) |
| `BSP-DV-014` | Distribución de Intensidad de Actividad | minutos | Diario (sedentario/leve/moderado/vigoroso) |

### Arquitectura del Sueño

| Código BSP | Biomarcador | Unidad | Consolidación |
|---|---|---|---|
| `BSP-DV-015` | Duración Total del Sueño | minutos | Nocturno |
| `BSP-DV-016` | Sueño REM | minutos | Nocturno |
| `BSP-DV-017` | Sueño Profundo (N3) | minutos | Nocturno |
| `BSP-DV-018` | Eficiencia del Sueño | % | Nocturno |
| `BSP-DV-019` | Latencia del Sueño | minutos | Nocturno |
| `BSP-DV-020` | Índice de Regularidad del Sueño | puntaje | Semanal |

### Recuperación y Preparación

| Código BSP | Biomarcador | Unidad | Consolidación |
|---|---|---|---|
| `BSP-DV-021` | Puntaje de Recuperación | 0–100 | Diario |
| `BSP-DV-022` | Puntaje de Preparación | 0–100 | Diario |
| `BSP-DV-023` | Índice de Nivel de Estrés | 0–100 | Diario |

---

## Requisito del Device SDK

Los IEOs de wearables deben usar el BSP Device SDK oficial para garantizar:
- Formato de consolidación diaria correcto
- Codificación correcta de biomarcadores
- Firma criptográfica de lotes diarios
- Verificación automática de consentimiento antes del envío

```python
# BSP Device SDK — ejemplo de consolidación diaria
from bsp_sdk.device import DeviceRecordBuilder

record = (DeviceRecordBuilder()
    .beo_id("550e8400-...")
    .biomarker("BSP-DV-001")           # HRV RMSSD
    .date("2026-02-24")
    .consolidated({
        "mean": 47.3,
        "sd": 12.1,
        "samples": 1440,
        "method": "overnight-5min-segments"
    })
    .unit("ms")
    .device({ "model": "Oura Ring Gen4", "firmware": "2.8.1" })
    .build())
```

---

*Ambrósio Institute · ambrosioinstitute.org · biologicalsovereigntyprotocol.com*
