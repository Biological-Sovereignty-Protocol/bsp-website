# Flujo de Onboarding del Usuario

"El momento en que una persona crea su BEO, cruza un umbral — de paciente a soberano."

## Filosofía de Diseño

La mayoría de las apps de salud integran usuarios en un producto. BSP integra usuarios en una identidad biológica de por vida. Este proceso de 12 minutos es intencionalmente arquitectónico; el usuario debe sentir el peso de configurar una infraestructura permanente para sus datos de salud.

| Apps de Salud Tradicionales | Onboarding BSP |
|-------------------------|----------------|
| Crea una cuenta en sus servidores | Crea una identidad soberana en infraestructura permanente |
| Los datos del usuario pertenecen a la plataforma | El usuario posee la clave privada de su propia biología |
| La cuenta puede ser eliminada por la empresa | El BEO no puede ser eliminado por nadie |
| Se recupera mediante restablecimiento por email | Se recupera mediante la red de guardianes sociales |
| Datos bloqueados en una app | Los datos son completamente portables (`EXPORT_DATA`) |

## Las Cuatro Fases del Onboarding

### Fase 01: Identidad (Creación del BEO)
*   **Acción**: El usuario elige su dominio `.bsp` (ej., `andre.bsp`, o un identificador que preserve la privacidad).
*   **Bajo el capó**: Un par de claves criptográficas se genera instantáneamente y de forma local en el enclave seguro del dispositivo. La clave pública se registra en Arweave. La identidad se crea permanentemente.

### Fase 02: Soberanía (Proteger el BEO)
Un BEO protegido solo por una seed phrase es vulnerable si se pierde el dispositivo. Esta fase configura la red de seguridad.
*   **Guardianes**: El usuario selecciona 3 personas de confianza. Se establece un umbral de 2 de 3.
*   **Seed Phrase**: El usuario debe hacer una copia de seguridad offline de su frase de recuperación de 24 palabras.
*   **Nota UX**: La configuración de guardianes es muy recomendable pero *opcional* durante el onboarding inicial. Un usuario puede omitirla y agregar guardianes después, asegurando que nunca quede bloqueado para entrar al ecosistema.

### Fase 03: Activación (Primeros BioRecords)
El protocolo cobra vida con datos. El usuario tiene tres caminos para construir su línea base:
*   **Camino A: Importar**. Conectar un laboratorio BSP-Compliant para importar historiales de exámenes existentes al instante.
*   **Camino B: Wearable**. Conectar un Oura Ring, Apple Watch, etc. para comenzar a sincronizar datos biométricos continuos.
*   **Camino C: Entrada Manual**. Escribir manualmente valores recientes de análisis de sangre para generar los primeros puntos de datos.

### Fase 04: Protocolo Vivo (Inteligencia de Vitalidad)
El usuario autoriza la capa de inteligencia (AVA).
*   **Acción**: El usuario otorga a AVA derechos de lectura continuos y revocables para procesar sus BioRecords.
*   **Resultado**: El usuario recibe su primera **Puntuación de Vitalidad Ambrósio (SVA)** — ej., una puntuación de 68,4, mostrando una edad biológica de 41,2 frente a una edad cronológica de 42. Se presenta como una oportunidad de mejora, nunca como un veredicto.

## Post-Onboarding: El BEO Vivo
Un BEO crece continuamente. Un usuario que comienza con 50 resultados de laboratorio y conecta un wearable acumulará miles de BioRecords en su primer año.

En cualquier momento, el usuario puede activar un `EXPORT_DATA`, recibiendo un archivo JSON completo y descifrado de su historial biológico. Esta exportación demuestra la verdadera portabilidad y soberanía.

### Activación de Nuevos BioRecords
La app invita a los usuarios a agregar datos en momentos de alta intención:
*   **Automático**: Los wearables sincronizan silenciosamente a diario; los resultados de laboratorio llegan automáticamente.
*   **Sugerido**: "Tuviste una cita médica hoy — ¿agregar tus resultados?"
*   **Orientado a la acción**: Si el SVA cae significativamente, la app invita al usuario a programar un nuevo panel de sangre para investigar.

## Casos Especiales

*   **Menores**: Los BEOs para menores se crean bajo un modelo de custodia en manos del padre o madre. A los 18 años, se inicia una transferencia automatizada que entrega el control soberano completo al adulto sin perder ningún dato histórico.
*   **Corrección de Datos**: Si un laboratorio comete un error de transcripción, envía una corrección. El nuevo BioRecord marca el anterior como `SUPERSEDED`, preservando la pista de auditoría inmutable mientras muestra el valor correcto.
