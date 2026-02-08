# 🪨📄✂️ Piedra, Papel o Tijeras

Juego clásico de **Piedra, Papel o Tijeras** desarrollado con **HTML, CSS (Sass/SCSS) y JavaScript**, enfocado en la lógica del juego, manipulación del DOM, persistencia de datos con `localStorage` y una estructura escalable.

---

## 🎮 Descripción del proyecto

El proyecto simula el juego de Piedra, Papel o Tijeras entre un **usuario** y un **bot**. Cada jugador comienza con **3 vidas** y en cada ronda se pierde una vida según el resultado.

El juego finaliza cuando uno de los jugadores se queda sin vidas, mostrando un mensaje personalizado y guardando estadísticas de la partida.

---

## ✨ Funcionalidades principales

* Selección de jugada del usuario mediante botones
* Jugada aleatoria del bot
* Sistema de vidas visual (❤️)
* Detección de empate, victoria o derrota
* Estadísticas persistentes con `localStorage`
* Carga de reglas del juego desde un archivo JSON
* Mensajes finales personalizados con **SweetAlert2**
* Estilos desarrollados con **Sass (SCSS)**

---

## 🧠 Lógica del juego

Las reglas del juego se definen en un archivo externo `jugadas.json`, lo que permite **escalar o modificar** el juego fácilmente (por ejemplo, agregar nuevas jugadas).

Ejemplo de estructura:

* Piedra vence a Tijera
* Papel vence a Piedra
* Tijera vence a Papel

El bot selecciona una jugada aleatoria y el ganador de cada ronda se determina comparando las reglas cargadas desde el JSON.

---

## 📊 Estadísticas

El juego guarda automáticamente:

* Partidas jugadas
* Partidas ganadas
* Partidas perdidas

Estas estadísticas se almacenan en el navegador utilizando `localStorage` y se cargan cada vez que el usuario vuelve a jugar.

---

## 🗂️ Estructura del proyecto

```
📦 piedra-papel-tijeras
 ┣ 📂 css
 ┃ ┗ style.css
 ┣ 📂 scss
 ┃ ┗ style.scss
 ┣ 📂 js
 ┃ ┗ script.js
 ┣ 📂 data
 ┃ ┗ jugadas.json
 ┣ 📄 index.html
```

---

## 🎨 Estilos (Sass)

Los estilos están desarrollados con **SCSS**, utilizando:

* Variables para colores y tipografía
* Anidación de selectores
* Estructura pensada para escalabilidad

El archivo SCSS se compila a CSS antes de ser cargado por el navegador.

---

## ⚙️ Compilación de Sass

Para compilar los estilos se utiliza **Sass**:

```bash
sass --watch scss:css
```

Esto permite que los cambios en los archivos `.scss` se reflejen automáticamente en el `.css`.

---

## 🚀 Tecnologías utilizadas

* HTML5
* CSS3
* Sass (SCSS)
* JavaScript (ES6)
* SweetAlert2
* LocalStorage

---

## 📌 Objetivo académico

Este proyecto fue desarrollado como práctica para reforzar conceptos de:

* Funciones y scope en JavaScript
* Manipulación del DOM
* Asincronía con `fetch`
* Persistencia de datos en el navegador
* Organización y escalabilidad del código

---

## 👤 Autor

Proyecto realizado por **Miguel Vélez**.

---

💚 *Proyecto con fines educativos.*
