# Fluxo de Onboarding do Usuário

"No momento em que uma pessoa cria seu BEO, ela atravessa um limiar — de paciente para soberano."

## Filosofia de Design

A maioria dos aplicativos de saúde integra usuários a um produto. O BSP integra usuários a uma identidade biológica para toda a vida. Este processo de 12 minutos é intencionalmente arquitetônico; o usuário deve sentir o peso de configurar uma infraestrutura permanente para seus dados de saúde.

| Aplicativos de Saúde Tradicionais | Onboarding BSP |
|-----------------------------------|----------------|
| Cria uma conta nos servidores deles | Cria uma identidade soberana em infraestrutura permanente |
| Dados do usuário pertencem à plataforma | Usuário detém a chave privada para sua própria biologia |
| Conta pode ser excluída pela empresa | BEO não pode ser excluído por ninguém |
| Recupera via redefinição de e-mail | Recupera via rede de guardiões sociais |
| Dados bloqueados em um aplicativo | Dados são totalmente portáteis (`EXPORT_DATA`) |

## As Quatro Fases do Onboarding

### Fase 01: Identidade (Criando o BEO)
*   **Ação**: O usuário escolhe seu domínio `.bsp` (ex: `andre.bsp`, ou um identificador que preserve a privacidade).
*   **Por baixo dos panos**: Um par de chaves criptográficas é gerado instantaneamente e localmente no enclave seguro do dispositivo. A chave pública é registrada no Arweave. A identidade é criada permanentemente.

### Fase 02: Soberania (Protegendo o BEO)
Um BEO protegido apenas por uma frase-semente é vulnerável se o dispositivo for perdido. Esta fase configura a rede de segurança.
*   **Guardiões**: O usuário seleciona 3 pessoas de confiança. Um limiar de 2 em 3 é estabelecido.
*   **Frase-Semente**: O usuário deve fazer backup da sua frase de recuperação de 24 palavras offline.
*   **Nota de UX**: A configuração dos guardiões é altamente encorajada, mas *opcional* durante o onboarding inicial. Um usuário pode pular isso e adicionar guardiões depois, garantindo que nunca seja bloqueado de entrar no ecossistema.

### Fase 03: Ativação (Primeiros BioRecords)
O protocolo ganha vida com dados. O usuário tem três caminhos para construir sua linha de base:
*   **Caminho A: Importação**. Conectar um laboratório compatível com BSP para importar históricos de exames existentes instantaneamente.
*   **Caminho B: Wearable**. Conectar um Oura Ring, Apple Watch, etc. para começar a sincronizar dados biométricos contínuos.
*   **Caminho C: Entrada Manual**. Digitar manualmente os valores recentes de exames de sangue para gerar os primeiros pontos de dados.

### Fase 04: Protocolo Vivo (Inteligência de Vitalidade)
O usuário autoriza a camada de inteligência (AVA).
*   **Ação**: O usuário concede à AVA direitos de leitura contínuos e revogáveis para processar seus BioRecords.
*   **Resultado**: O usuário recebe seu primeiro **Score de Vitalidade Ambrósio (SVA)** — ex: uma pontuação de 68,4, mostrando uma idade biológica de 41,2 contra uma idade cronológica de 42. É enquadrado como uma oportunidade de melhora, nunca como um veredicto.

## Pós-Onboarding: O BEO Vivo
Um BEO cresce continuamente. Um usuário que começa com 50 resultados laboratoriais e conecta um wearable acumulará milhares de BioRecords no primeiro ano.

A qualquer momento, o usuário pode acionar um `EXPORT_DATA`, recebendo um arquivo JSON completo e descriptografado do seu histórico biológico. Essa exportação demonstra portabilidade e soberania verdadeiras.

### Acionando Novos BioRecords
O aplicativo solicita aos usuários que adicionem dados em momentos de alta intenção:
*   **Automático**: Wearables sincronizam silenciosamente todos os dias; resultados de laboratório chegam automaticamente.
*   **Solicitado**: "Você teve uma consulta médica hoje — adicionar seus resultados?"
*   **Orientado por ação**: Se o SVA cair significativamente, o aplicativo solicita ao usuário que agende um novo painel de sangue para investigar.

## Casos Especiais

*   **Menores de Idade**: BEOs para menores são criados sob um modelo custodial mantido pelo responsável. Aos 18 anos, uma transferência automatizada é iniciada, entregando o controle soberano completo ao adulto sem perder nenhum dado histórico.
*   **Correção de Dados**: Se um laboratório cometer um erro de transcrição, ele envia uma correção. O novo BioRecord marca o anterior como `SUPERSEDED`, preservando a trilha de auditoria imutável enquanto exibe o valor correto.
