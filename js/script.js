// Vidas iniciales
let vidaUsuario = 3;
let vidaBot = 3;
let estadisticas = {
    partidas: 0,
    ganadas: 0,
    perdidas: 0,
}

// Opciones disponibles
const opciones = ["piedra", "papel", "tijera"];

// Elementos DOM
const vidas = document.querySelector("#vidas");
const resultado = document.querySelector("#resultado");
const botones = document.querySelectorAll(".opcion");
const jugadaUsuarioTexto = document.querySelector("#jugada-usuario");
const jugadaBotTexto = document.querySelector("#jugada-bot")
const botonReset = document.querySelector("#reset");
const statsTexto = document.querySelector("#stats");

function mostrarEstadisticas() {
    statsTexto.textContent = `📊 Partidas: ${estadisticas.partidas} | 🏆 Ganadas: ${estadisticas.ganadas} | 💀 Perdidas: ${estadisticas.perdidas}`;
}


// Estadisticas globales //
function cargarEstadisticas() {
    const datosGuardados = localStorage.getItem("estadisticasJuego");
    
    if(datosGuardados) {
        estadisticas = JSON.parse(datosGuardados);
    }
}

// Guardar estadisticas locales //
function guardarEstadisticas() {
    localStorage.setItem(
        "estadisticasJuego",
        JSON.stringify(estadisticas)
    );
}

//Juagada del bot
function opcionBot() {
    const numero = Math.floor(Math.random() * opciones.length);
    return opciones[numero];
}

// Determinar el ganador de la ronda
function ganadorRonda (jugadaUsuario, jugadaBot) {
    
    // Ronda empatada
    if ( jugadaUsuario === jugadaBot) {
        resultado.textContent = `🔁 Empate: ambos eligieron ${jugadaUsuario}`;
        return; 
    }

    // Condiciones de victoria del usuario
    if (
        (jugadaUsuario === "piedra" && jugadaBot === "tijera") ||
        (jugadaUsuario === "papel" && jugadaBot === "piedra") ||
        (jugadaUsuario === "tijera" && jugadaBot === "papel")
    ) {
        vidaBot--;
        resultado.textContent = `✨ ¡Ganaste la ronda! El bot eligió ${jugadaBot}`;
    } else {
        vidaUsuario--;
        resultado.textContent = `❌ Perdiste la ronda.  El bot eligió ${jugadaBot}`;
    }

    actualizarVidas();
    verificarFinJuego();
}

// Muestra de estado de vida
function actualizarVidas() {
    vidas.textContent = `❤️ Usuario: ${vidaUsuario} | 🤖 Bot: ${vidaBot}`;
}

// Verificacion de fin del juego
function verificarFinJuego() {
    if (vidaUsuario === 0) {
        resultado.textContent = "💀 Has perdido. El bot ganó la partida.";
        estadisticas.partidas++;
        estadisticas.perdidas++;
        guardarEstadisticas();
        mostrarEstadisticas();
        desactivarBotones();

    } else if (vidaBot === 0) {
        resultado.textContent = "🏆 ¡Ganaste! Dejaste al bot sin vidas.";
        estadisticas.partidas++;
        estadisticas.ganadas++;
        guardarEstadisticas();
        mostrarEstadisticas();
        desactivarBotones();
    }
}

// Desactivar botones al finalizar
function desactivarBotones() {
    botones.forEach(boton => boton.disabled = true);
}

// Reinicio de juego //
function resetJuego() {
    vidaUsuario = 3;
    vidaBot = 3;

    actualizarVidas();

    resultado.textContent = "Selecciona tu jugada";
    jugadaUsuarioTexto.textContent = "—";
    jugadaBotTexto.textContent = "—";

    activarBotones();
}

// Habilitar botones//
function activarBotones() {
    botones.forEach(boton => {
        boton.disabled = false});
}

// Inicio del juego
function iniciarJuego() {
    cargarEstadisticas();
    mostrarEstadisticas();
    vidaUsuario = 3;
    vidaBot = 3;
    actualizarVidas();
    resultado.textContent = "Selecciona tu jugada"

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            if (vidaUsuario === 0 || vidaBot === 0)
                return;
            const jugadaUsuario = boton.dataset.opcion;
            const jugadaBot = opcionBot();

                jugadaUsuarioTexto.textContent = jugadaUsuario;
                jugadaBotTexto.textContent =jugadaBot
            ganadorRonda(jugadaUsuario, jugadaBot);
        })
    })
}


// Iniciar el simulador
iniciarJuego()
botonReset.addEventListener("click", resetJuego);