# Iramain Music

Reproductor Android local de archivos MP3/audio, sin publicidad, sin login y sin conexión a internet.

## Qué trae esta versión

- Android nativo en Kotlin.
- Interfaz con Jetpack Compose.
- Reproducción con AndroidX Media3 / ExoPlayer.
- Selector de archivos MP3/audio.
- Selector de carpeta de música.
- Lectura recursiva de carpeta.
- Biblioteca persistente mediante URIs.
- Búsqueda por título/artista.
- Play, pausa, anterior, siguiente.
- Barra de progreso y seek.
- Shuffle.
- Repeat all / repeat one / off.
- Sin permiso de Internet.
- Sin publicidad.

## Requisitos

- Android Studio actualizado.
- JDK 17 o superior. Android Studio ya suele traerlo integrado.
- Un celular Android con modo desarrollador y depuración USB, o un emulador.

## Cómo ejecutarlo

### Opción A: abrir este proyecto directamente

1. Descomprimí el ZIP.
2. Abrí Android Studio.
3. Elegí **Open**.
4. Seleccioná la carpeta `IramainMusic`.
5. Esperá la sincronización de Gradle.
6. Conectá tu celular Android por USB.
7. Activá **Opciones de desarrollador** y **Depuración USB** en el celular.
8. En Android Studio, tocá **Run ▶**.

### Opción B: si Android Studio se queja por Gradle o versiones

1. Creá un proyecto nuevo en Android Studio:
   - Template: **Empty Activity**.
   - Language: **Kotlin**.
   - UI: **Jetpack Compose**.
   - Minimum SDK: Android 8.0 o superior.
2. Cerrá Android Studio.
3. Copiá el contenido de esta carpeta sobre el proyecto nuevo, especialmente:
   - `app/src/main/java/com/iramain/music/MainActivity.kt`
   - `app/src/main/AndroidManifest.xml`
   - `app/build.gradle.kts`
   - `settings.gradle.kts`
   - `build.gradle.kts`
4. Reabrí el proyecto y sincronizá.

## Cómo usar la app

1. Abrí la app.
2. Tocá **Elegir MP3** para seleccionar archivos sueltos.
3. O tocá **Carpeta** para permitir acceso a una carpeta de música.
4. Tocá una canción de la lista.
5. Usá los controles de reproducción.

## Notas importantes

- La app no borra ni modifica tus archivos.
- La app guarda permisos de lectura sobre los archivos/carpetas que elegiste.
- Si movés o borrás los MP3 desde otra app, puede que la biblioteca deba recargarse.
- En Android moderno no conviene pedir acceso total al almacenamiento: por eso se usa el selector oficial de archivos/carpetas.
- Esta versión prioriza reproducción local simple. La reproducción en segundo plano con notificación persistente puede agregarse como siguiente módulo.

## Cómo generar APK

En Android Studio:

1. Menú **Build**.
2. **Build Bundle(s) / APK(s)**.
3. **Build APK(s)**.
4. Cuando termine, Android Studio muestra el enlace **locate** para encontrar el APK.

Para uso personal, podés instalar ese APK en tu teléfono. Para distribuirlo públicamente, conviene firmarlo formalmente y revisar políticas de Android/Play Store.
