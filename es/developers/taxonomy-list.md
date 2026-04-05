# Taxonomía Completa de Biomarcadores

La Taxonomía BSP es el lenguaje universal para medir el estado biológico. Actualmente contiene más de 210 biomarcadores aprobados divididos en 25 categorías y 4 niveles de acceso.

> [!NOTE]
> Este es un estándar en constante evolución. Se agregan nuevos biomarcadores trimestralmente a través del [Proceso de Gobernanza BIP](/protocols/governance).

## 1. Longevidad Core (BSP-LA)
Los marcadores principales usados por el motor AVA para determinar la Puntuación de Vitalidad Ambrósio (SVA).

| Código | Biomarcador | Unidad | Rango Óptimo Esperado | Método |
|------|-----------|------|------------------------|--------|
| `BSP-LA-001` | PCR de Alta Sensibilidad (hs-CRP) | mg/L | < 0,5 | Inmunoanálisis |
| `BSP-LA-002` | Insulina en Ayunas | µIU/mL | 2,0 - 5,0 | ECLIA |
| `BSP-LA-003` | Homocisteína | µmol/L | 5,0 - 7,0 | HPLC |
| `BSP-LA-004` | HbA1c | % | 4,6 - 5,0 | HPLC |
| `BSP-LA-005` | Testosterona Libre | ng/dL | Dependiente de edad/sexo | LC-MS/MS |
| `BSP-LA-006` | Vitamina D (25-OH) | ng/mL | 50,0 - 80,0 | LC-MS/MS |
| `BSP-LA-007` | Índice Omega-3 | % | > 8,0 | GC-MS |
| `BSP-LA-008` | ApoB | mg/dL | < 60 | Inmunoturbidimetría |
| `BSP-LA-009` | Relación NAD+ / NADH | ratio | > 400 | LC-MS |

## 2. Metabolismo Esencial (BSP-MT)
Marcadores para evaluar la flexibilidad metabólica, la función mitocondrial y los sustratos energéticos.

| Código | Biomarcador | Unidad | Rango Óptimo Esperado | Método |
|------|-----------|------|------------------------|--------|
| `BSP-MT-001` | Glucosa en Ayunas | mg/dL | 75 - 85 | Hexokinasa |
| `BSP-MT-002` | Ácido Úrico | mg/dL | 3,5 - 5,0 | Uricasa |
| `BSP-MT-003` | Lactato Deshidrogenasa (LDH) | U/L | 140 - 200 | UV Cinético |
| `BSP-MT-004` | Ferritina | ng/mL | 50 - 150 | ECLIA |
| `BSP-MT-005` | Triglicéridos | mg/dL | < 70 | Enzimático |

## 3. Dinámica Cardiovascular (BSP-CV)
Lipidología avanzada, función endotelial y salud vascular.

| Código | Biomarcador | Unidad | Rango Óptimo Esperado | Método |
|------|-----------|------|------------------------|--------|
| `BSP-CV-001` | Número de Partículas LDL (LDL-P) | nmol/L | < 1000 | NMR |
| `BSP-CV-002` | Lipoproteína(a) | mg/dL | < 14 | Inmunoturbidimetría |
| `BSP-CV-003` | Fibrinógeno | mg/dL | 200 - 300 | Clauss |
| `BSP-CV-004` | LDL Oxidado | U/L | < 45 | ELISA |

## 4. Dispositivos y Wearables con Seguimiento Continuo (BSP-DV)
Datos recopilados continuamente de hardware consumer y clínico certificado por BSP (Oura, Apple Watch, WHOOP).

| Código | Biomarcador | Unidad | Frecuencia | Método |
|------|-----------|------|-----------|--------|
| `BSP-DV-001` | Frecuencia Cardíaca en Reposo (FCR) | bpm | Prom. Diario | PPG / ECG |
| `BSP-DV-002` | Variabilidad de la Frecuencia Cardíaca (VFC/HRV) | ms (RMSSD) | Prom. Diario | PPG / ECG |
| `BSP-DV-003` | Duración de Sueño de Ondas Lentas | min | Nocturno | Actigrafía + Temp |
| `BSP-DV-004` | Duración de Sueño REM | min | Nocturno | Actigrafía + Temp |
| `BSP-DV-005` | Desviación de Temperatura Corporal Nocturna | °C | Nocturno | Termistor |
| `BSP-DV-006` | Estimación de VO2 Máximo | mL/kg/min | Mensual | Modelo multisensor |

---

*Para la lista JSON completa de los 210+ biomarcadores para integrar en tu aplicación, consulta el repositorio `bsp-spec`.*
