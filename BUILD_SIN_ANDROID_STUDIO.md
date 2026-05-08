# Compilar Iramain Music sin Android Studio

Este proyecto puede compilarse sin instalar Android Studio usando GitHub Actions. No requiere hosting, Firebase, Play Store ni servicios pagos para probarlo como APK local.

## Método recomendado: GitHub Actions

### 1. Crear un repositorio

1. Entrá a GitHub.
2. Creá un repositorio nuevo, por ejemplo `IramainMusic`.
3. Subí todos los archivos de esta carpeta al repositorio.

La carpeta `.github/workflows/build-apk.yml` ya está incluida. Ese archivo le dice a GitHub cómo compilar el APK.

### 2. Ejecutar la compilación

1. Entrá al repositorio en GitHub.
2. Abrí la pestaña **Actions**.
3. Elegí **Build Android APK**.
4. Tocá **Run workflow**.
5. Esperá a que termine en verde.

### 3. Descargar el APK

1. Abrí la ejecución terminada.
2. Bajá hasta **Artifacts**.
3. Descargá `IramainMusic-debug-apk`.
4. Descomprimí el ZIP que descarga GitHub.
5. Dentro estará `app-debug.apk`.

### 4. Instalar en el celular Android

1. Pasá `app-debug.apk` al celular.
2. Tocá el archivo.
3. Android puede pedirte habilitar **Instalar apps desconocidas** para el navegador o gestor de archivos.
4. Instalá la app.
5. Abrí **Iramain Music** y elegí tus MP3 o tu carpeta de música.

## Método local sin Android Studio

También se puede compilar desde terminal, pero necesitás instalar por separado:

- JDK 17.
- Android SDK Command-line Tools.
- Gradle 8.10.2 o compatible.

Variables típicas:

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
```

Instalación de paquetes Android:

```bash
sdkmanager "platforms;android-35" "build-tools;35.0.0" "platform-tools"
sdkmanager --licenses
```

Compilación:

```bash
gradle assembleDebug
```

APK resultante:

```text
app/build/outputs/apk/debug/app-debug.apk
```

## Observación

Compilar Android directamente desde un celular con Termux suele ser problemático porque muchas herramientas del SDK y build-tools están pensadas para computadoras Linux/macOS/Windows. Para este proyecto, si no podés usar Android Studio, GitHub Actions es el camino más limpio.
