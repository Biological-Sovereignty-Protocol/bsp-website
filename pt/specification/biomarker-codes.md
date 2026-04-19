---
title: "Códigos de Biomarcadores"
description: "Referência rápida dos códigos da taxonomia de biomarcadores do BSP — formato, namespaces e mapeamento para padrões como LOINC e UCUM."
lang: pt
---

# Referência de Códigos de Biomarcadores do BSP

> Referência rápida para códigos da taxonomia BSP.
> Taxonomia completa: [bsp-spec/spec/taxonomy/](https://github.com/Biological-Sovereignty-Protocol/bsp-spec/tree/main/spec/taxonomy)

---

## Formato do Código

```
BSP-[CATEGORIA]-[NÚMERO]
```

Exemplos: `BSP-GL-001` · `BSP-LA-004` · `BSP-DV-001`

---

## Índice de Categorias

### Nível 1 — Core (Longevidade Avançada)

| Código | Categoria | Biomarcadores-chave |
|---|---|---|
| `BSP-LA` | Longevidade e Envelhecimento | GDF-11, TIMP2, Comprimento de Telômero, NAD+ |
| `BSP-RC` | Regeneração e Celular | HOMA-IR, IGF-1, mTOR, IL-6 |
| `BSP-CV` | Saúde Cardiovascular | ApoB, Homocisteína, Óxido Nítrico, Ômega-3 |
| `BSP-IM` | Imunidade e Inflamação | Vitamina D, Glutationa, hs-CRP, CD38 |
| `BSP-ME` | Metabolismo e Energia | ATP, Função Mitocondrial, Cetonas |
| `BSP-NR` | Saúde Neurológica | BDNF, Cortisol, NfL, GFAP |
| `BSP-DH` | Detoxificação e Hepática | GSH, ALT/AST/GGT, Metais Pesados |
| `BSP-LF` | Linfático e Depuração | Perfil Linfocitário, Índice de Drenagem |
| `BSP-BC` | Relógio Biológico | Idade DNAm, p16, p21, SASP |

### Nível 2 — Standard (Laboratório de Rotina)

| Código | Categoria | Biomarcadores-chave |
|---|---|---|
| `BSP-HM` | Hematologia | Hemograma, RBC, WBC, Plaquetas |
| `BSP-VT` | Vitaminas | Vitamina D, B12, Folato, B6 |
| `BSP-MN` | Minerais e Eletrólitos | Magnésio, Zinco, Ferro, Ferritina |
| `BSP-HR` | Hormônios | TSH, T3/T4, Testosterona, Estradiol |
| `BSP-RN` | Função Renal | Creatinina, BUN, TFG |
| `BSP-LP` | Lipídios Convencionais | Colesterol Total, HDL, LDL, TG |
| `BSP-GL` | Glicemia e Metabólico | Glicose em Jejum, HbA1c, Insulina |
| `BSP-LV` | Função Hepática | ALT, AST, GGT, Albumina |
| `BSP-IF` | Marcadores Inflamatórios | PCR, VHS, Fibrinogênio, Ferritina |

### Nível 3 — Extended (Especializado)

| Código | Categoria | Cobertura |
|---|---|---|
| `BSP-FR` | Fertilidade e Reprodutivo | AMH, Espermograma, Fragmentação de DNA |
| `BSP-GN` | Genômica | APOE, MTHFR, BRCA, CYP450, PRS |
| `BSP-MB` | Microbioma | Diversidade intestinal, razão F/B, SCFA |
| `BSP-TX` | Toxicologia Ambiental | Metais pesados, Glifosato, PFAS |
| `BSP-IM2` | Imunologia Avançada | Senescência de célula T, células NK, Th1/Th2 |
| `BSP-CV2` | Cardiovascular Avançado | LDL-P, LDL Oxidada, escore CAC, PWV |

### Nível 4 — Device (Wearable Contínuo)

| Código | Categoria | Cobertura |
|---|---|---|
| `BSP-DV` | Dispositivo e Contínuo | HRV, SpO2, CGM, Arquitetura do Sono, Atividade |

---

## Códigos Comuns — Referência Rápida

| Código | Biomarcador | Unidade | Nível |
|---|---|---|---|
| `BSP-GL-001` | Glicose em Jejum | mg/dL | STANDARD |
| `BSP-GL-002` | HbA1c | % | STANDARD |
| `BSP-LA-003` | Comprimento de Telômero | kb | CORE |
| `BSP-LA-004` | NAD+ | µmol/L | CORE |
| `BSP-CV-001` | ApoB | mg/dL | CORE |
| `BSP-HR-001` | TSH | µUI/mL | STANDARD |
| `BSP-VT-001` | Vitamina D (25-OH) | ng/mL | STANDARD |
| `BSP-DV-001` | HRV (RMSSD) | ms | DEVICE |
| `BSP-DV-006` | SpO2 | % | DEVICE |
| `BSP-BC-001` | Idade Epigenética (DNAm) | anos | CORE |
