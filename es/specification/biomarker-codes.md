---
title: "Códigos de Biomarcadores"
description: "Referencia rápida de los códigos de la taxonomía de biomarcadores de BSP — formato, namespaces y mapeo a estándares como LOINC y UCUM."
lang: es
---

# Referencia de Códigos de Biomarcadores BSP

> Referencia rápida de códigos de la taxonomía BSP.
> Taxonomía completa: [bsp-spec/spec/taxonomy/](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/tree/main/spec/taxonomy)

---

## Formato del Código

```
BSP-[CATEGORÍA]-[NÚMERO]
```

Ejemplos: `BSP-GL-001` · `BSP-LA-004` · `BSP-DV-001`

---

## Índice de Categorías

### Nivel 1 — Core (Longevidad Avanzada)

| Código | Categoría | Biomarcadores clave |
|---|---|---|
| `BSP-LA` | Longevidad y Envejecimiento | GDF-11, TIMP2, Longitud de Telómero, NAD+ |
| `BSP-RC` | Regeneración y Celular | HOMA-IR, IGF-1, mTOR, IL-6 |
| `BSP-CV` | Salud Cardiovascular | ApoB, Homocisteína, Óxido Nítrico, Omega-3 |
| `BSP-IM` | Inmunidad e Inflamación | Vitamina D, Glutatión, hs-CRP, CD38 |
| `BSP-ME` | Metabolismo y Energía | ATP, Función Mitocondrial, Cetonas |
| `BSP-NR` | Salud Neurológica | BDNF, Cortisol, NfL, GFAP |
| `BSP-DH` | Detoxificación y Hepática | GSH, ALT/AST/GGT, Metales Pesados |
| `BSP-LF` | Linfático y Depuración | Perfil Linfocitario, Índice de Drenaje |
| `BSP-BC` | Reloj Biológico | Edad DNAm, p16, p21, SASP |

### Nivel 2 — Standard (Laboratorio de Rutina)

| Código | Categoría | Biomarcadores clave |
|---|---|---|
| `BSP-HM` | Hematología | Hemograma, RBC, WBC, Plaquetas |
| `BSP-VT` | Vitaminas | Vitamina D, B12, Folato, B6 |
| `BSP-MN` | Minerales y Electrolitos | Magnesio, Zinc, Hierro, Ferritina |
| `BSP-HR` | Hormonas | TSH, T3/T4, Testosterona, Estradiol |
| `BSP-RN` | Función Renal | Creatinina, BUN, TFG |
| `BSP-LP` | Lípidos Convencionales | Colesterol Total, HDL, LDL, TG |
| `BSP-GL` | Glicemia y Metabólico | Glucosa en Ayunas, HbA1c, Insulina |
| `BSP-LV` | Función Hepática | ALT, AST, GGT, Albúmina |
| `BSP-IF` | Marcadores Inflamatorios | PCR, VSG, Fibrinógeno, Ferritina |

### Nivel 3 — Extended (Especializado)

| Código | Categoría | Cobertura |
|---|---|---|
| `BSP-FR` | Fertilidad y Reproductivo | AMH, Espermograma, Fragmentación de ADN |
| `BSP-GN` | Genómica | APOE, MTHFR, BRCA, CYP450, PRS |
| `BSP-MB` | Microbioma | Diversidad intestinal, razón F/B, SCFA |
| `BSP-TX` | Toxicología Ambiental | Metales pesados, Glifosato, PFAS |
| `BSP-IM2` | Inmunología Avanzada | Senescencia de célula T, células NK, Th1/Th2 |
| `BSP-CV2` | Cardiovascular Avanzado | LDL-P, LDL Oxidada, puntuación CAC, PWV |

### Nivel 4 — Device (Wearable Continuo)

| Código | Categoría | Cobertura |
|---|---|---|
| `BSP-DV` | Dispositivo y Continuo | HRV, SpO2, CGM, Arquitectura del Sueño, Actividad |

---

## Códigos Comunes — Referencia Rápida

| Código | Biomarcador | Unidad | Nivel |
|---|---|---|---|
| `BSP-GL-001` | Glucosa en Ayunas | mg/dL | STANDARD |
| `BSP-GL-002` | HbA1c | % | STANDARD |
| `BSP-LA-003` | Longitud de Telómero | kb | CORE |
| `BSP-LA-004` | NAD+ | µmol/L | CORE |
| `BSP-CV-001` | ApoB | mg/dL | CORE |
| `BSP-HR-001` | TSH | µUI/mL | STANDARD |
| `BSP-VT-001` | Vitamina D (25-OH) | ng/mL | STANDARD |
| `BSP-DV-001` | HRV (RMSSD) | ms | DEVICE |
| `BSP-DV-006` | SpO2 | % | DEVICE |
| `BSP-BC-001` | Edad Epigenética (DNAm) | años | CORE |
