> ⚠️ **Nota importante:**
> 
> Este proyecto **no incluye la carpeta `node_modules`** dentro del repositorio, ya que estos archivos son generados automáticamente al instalar las dependencias.
> 
> La carpeta `node_modules` puede ocupar cientos de megabytes y no se recomienda subirla al control de versiones (como GitHub), ya que:
> 
> - Su contenido se reconstruye fácilmente ejecutando `npm install`.
> - Puede generar conflictos entre entornos o sistemas operativos diferentes.
> - Está incluida en el archivo `.gitignore` por buenas prácticas.
> 
> Por lo tanto, **antes de ejecutar el proyecto**, asegúrate de instalar todas las dependencias con el siguiente comando:
> 
> ```bash
> npm install
> ```
> 
> Este comando descargará automáticamente todos los módulos necesarios definidos en el archivo `package.json` y generará la carpeta `node_modules` localmente.
> 
> Una vez finalizada la instalación, podrás ejecutar el proyecto normalmente con:
> 
> ```bash
> ionic serve
> ```
> 
> Si experimentas errores relacionados con dependencias o versiones, puedes intentar:
> 
> ```bash
> rm -rf node_modules package-lock.json
> npm install --legacy-peer-deps
> ```
> 
> Esto fuerza una instalación limpia y asegura que las dependencias sean compatibles con tu entorno.
