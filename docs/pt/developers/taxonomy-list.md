# Taxonomia Completa de Biomarcadores

A Taxonomia BSP é a linguagem universal para medir o estado biológico. Atualmente contém mais de 210 biomarcadores aprovados divididos em 25 categorias e 4 níveis de acesso.

> [!NOTE]
> Este é um padrão vivo. Novos biomarcadores são adicionados trimestralmente por meio do [Processo de Governança BIP](/protocols/governance).

## 1. Longevidade Core (BSP-LA)
Os marcadores primários utilizados pelo motor AVA para determinar o Índice de Vitalidade Ambrósio (SVA).

| Código | Biomarcador | Unidade | Faixa Ótima Esperada | Método |
|------|-----------|------|------------------------|--------|
| `BSP-LA-001` | PCR de Alta Sensibilidade (hs-CRP) | mg/L | < 0,5 | Imunoensaio |
| `BSP-LA-002` | Insulina em Jejum | µIU/mL | 2,0 - 5,0 | ECLIA |
| `BSP-LA-003` | Homocisteína | µmol/L | 5,0 - 7,0 | HPLC |
| `BSP-LA-004` | HbA1c | % | 4,6 - 5,0 | HPLC |
| `BSP-LA-005` | Testosterona Livre | ng/dL | Dependente de idade/sexo | LC-MS/MS |
| `BSP-LA-006` | Vitamina D (25-OH) | ng/mL | 50,0 - 80,0 | LC-MS/MS |
| `BSP-LA-007` | Índice Ômega-3 | % | > 8,0 | GC-MS |
| `BSP-LA-008` | ApoB | mg/dL | < 60 | Imunoturbidimetria |
| `BSP-LA-009` | Razão NAD+ / NADH | razão | > 400 | LC-MS |

## 2. Metabolismo Essencial (BSP-MT)
Marcadores para avaliar flexibilidade metabólica, função mitocondrial e substratos energéticos.

| Código | Biomarcador | Unidade | Faixa Ótima Esperada | Método |
|------|-----------|------|------------------------|--------|
| `BSP-MT-001` | Glicose em Jejum | mg/dL | 75 - 85 | Hexoquinase |
| `BSP-MT-002` | Ácido Úrico | mg/dL | 3,5 - 5,0 | Uricase |
| `BSP-MT-003` | Desidrogenase Lática (LDH) | U/L | 140 - 200 | UV Cinético |
| `BSP-MT-004` | Ferritina | ng/mL | 50 - 150 | ECLIA |
| `BSP-MT-005` | Triglicerídeos | mg/dL | < 70 | Enzimático |

## 3. Dinâmica Cardiovascular (BSP-CV)
Lipidologia avançada, função endotelial e saúde vascular.

| Código | Biomarcador | Unidade | Faixa Ótima Esperada | Método |
|------|-----------|------|------------------------|--------|
| `BSP-CV-001` | Número de Partículas LDL (LDL-P) | nmol/L | < 1000 | NMR |
| `BSP-CV-002` | Lipoproteína(a) | mg/dL | < 14 | Imunoturbidimetria |
| `BSP-CV-003` | Fibrinogênio | mg/dL | 200 - 300 | Clauss |
| `BSP-CV-004` | LDL Oxidado | U/L | < 45 | ELISA |

## 4. Dispositivos e Wearables com Rastreamento Contínuo (BSP-DV)
Dados coletados continuamente por hardware clínico e de consumo certificado BSP (Oura, Apple Watch, WHOOP).

| Código | Biomarcador | Unidade | Frequência | Método |
|------|-----------|------|-----------|--------|
| `BSP-DV-001` | Frequência Cardíaca em Repouso (FCR) | bpm | Média Diária | PPG / ECG |
| `BSP-DV-002` | Variabilidade da Frequência Cardíaca (VFC) | ms (RMSSD) | Média Diária | PPG / ECG |
| `BSP-DV-003` | Duração do Sono de Ondas Lentas | min | Noturno | Actigrafia + Temp |
| `BSP-DV-004` | Duração do Sono REM | min | Noturno | Actigrafia + Temp |
| `BSP-DV-005` | Desvio da Temperatura Corporal Noturna | °C | Noturno | Termistor |
| `BSP-DV-006` | Estimativa de VO2 Máx | mL/kg/min | Mensal | Modelo multisensor |

---

*Para a lista JSON completa com mais de 210 biomarcadores para integrar em sua aplicação, consulte o repositório `bsp-spec`.*
