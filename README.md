# Proyecto Académico -- Musical Contest 🎵

Este proyecto es **estrictamente académico**, desarrollado como práctica
para aprender Vue, Pinia, rutas, estados globales y manejo de audio con
Howler.\
No está pensado para uso comercial y **no se permite su copia,
redistribución o uso fuera del ámbito educativo** sin autorización del
autor.

------------------------------------------------------------------------

## 🧠 Objetivo del Proyecto

El proyecto implementa un pequeño juego musical donde el usuario escucha
fragmentos de canciones y debe adivinar la respuesta correcta.\
Incluye: - Gestión de preguntas aleatorias\
- Reproducción de audio con Howler\
- Cálculo de puntuación, tiempos y precisión\
- Ranking persistente\
- Distintas vistas (Home, Play, Ranking)

------------------------------------------------------------------------

## 📁 Estructura del Proyecto

    - src/
      - App.vue
      - main.js
      - assets/
        - css/
          - style.css
        - fonts/
          - StackSansNotch-Medium.ttf
      - components/
        - ButtonComponent.vue
        - IconComponent.vue
        - IconListComponent.vue
        - InfoCard.vue
        - InputComponent.vue
        - OptionComponent.vue
        - RankingCardComponent.vue
        - StatComponent.vue
      - data/
        - questions.json
      - layouts/
        - AppFooter.vue
        - AppHeader.vue
        - AppLayout.vue
      - router/
        - index.js
      - stores/
        - game.js
        - ranking.js
      - views/
        - HomeView.vue
        - PlayView.vue
        - RankingView.vue

------------------------------------------------------------------------

## 🛠️ Tecnologías Utilizadas

-   **Vue 3 + Composition API**
-   **Pinia** para el estado global
-   **Vite** como bundler
-   **Howler.js** para el audio
-   **TailwindCSS** para los estilos

------------------------------------------------------------------------

## 📝 Licencia / Copy

Este proyecto se entrega únicamente con fines educativos.\
Queda **prohibido copiar, distribuir, reutilizar o modificar** su
contenido para actividades no académicas.

Si deseas usar parte del código, deberás solicitar permiso explícito al
autor.

------------------------------------------------------------------------

## 📬 Autor

Proyecto académico desarrollado por un estudiante de **Desarrollo de
Aplicaciones Web**.
