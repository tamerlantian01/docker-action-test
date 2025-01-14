# 🚀 GitHub Action: Ejecutar Comandos Basadas en Historias de Usuario
## 📝 Descripción 
Esta GitHub Action permite automatizar la ejecución de comandos basados en datos obtenidos desde la API de Ascendev. Se usa explicitamenete para correr los comandos de las 'stories' almacenadas en la base de datos de Ascendev.

## 📂 Archivos principales
`index.js`: Archivo principal que define la lógica de la acción.

## ⚙️ Configuración

### 1. Instalación
Clona este repositorio o añádelo a tu flujo de trabajo de GitHub como acción personalizada.

### 2. Requisitos previos
- Asegúrate de tener un archivo `.userid` en el directorio raíz que contenga el ID de usuario necesario en el repositorio autogenerado.
- Proporciona el parámetro `base-url` al flujo de trabajo (workflow).

### 3. Entrada requerida

| Nombre      | Descripción                             | Obligatorio |
| ----------- | --------------------------------------- | ----------- |
| `base-url`  | La URL base de la API a consultar       |      Si     |


## 🚀 Uso
Agrega esta acción a tu archivo de flujo de trabajo de GitHub (.github/workflows/your-workflow.yml):

```yaml
name: Ejecutar Acciones Basadas en Historias de Usuario

on:
  push:
    branches:
      - main

jobs:
  ascendev:
    runs-on: ubuntu-20.04
    timeout-minutes: 10
    name: Check pull requests
    
    steps:
      - name: Check out project
        uses: actions/checkout@v3
      
      - name: Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      
      - name: Run custom action
        uses: tamerlantian01/docker-action-test@v2.0.2 # usa el nombre y la tag de la custom action
        with:
          base-url: 'https://ascendev-backend-service.onrender.com/api/v1' # base-url: requerida
```

## 🔍 Detalles Técnicos
### Funcionalidades principales
#### 1. Lectura del ID del usuario:
Lee el ID de usuario desde el archivo .userid.

#### 2. Consulta de API:
Envía una solicitud a la API para obtener la historia de usuario activa.

#### 3. Ejecución de comandos:
Procesa y ejecuta una lista de comandos proporcionados por la API.

### Manejo de errores

- La acción utiliza `core.setFailed` para detener el flujo de trabajo en caso de errores.
- Los mensajes de error proporcionan contexto sobre la falla, como problemas al consultar la API o ejecutar comandos.


## 🧪 Pruebas
Para probar la acción localmente, puedes usar la herramienta act:

```bash
act -j execute-user-story
```

## 🛠 Desarrollo
Instala las dependencias:
```bash
npm install
```
Realiza cambios en `index.js`.
Asegúrate de que el archivo `.userid` esté presente antes de probar.