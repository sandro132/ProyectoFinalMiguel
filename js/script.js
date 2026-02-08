let jugadas = [];

// Vidas iniciales
const VIDAS_INICIALES = 3;
let vidaUsuario = VIDAS_INICIALES;
let vidaBot = VIDAS_INICIALES;
let estadisticas = {
    partidas: 0,
    ganadas: 0,
    perdidas: 0,
}

// Elementos DOM
const vidas = document.querySelector("#vidas");
const resultado = document.querySelector("#resultado");
const botones = document.querySelectorAll(".opcion");
const jugadaUsuarioTexto = document.querySelector("#jugada-usuario");
const jugadaBotTexto = document.querySelector("#jugada-bot")
const botonReset = document.querySelector("#reset");
const statsTexto = document.querySelector("#stats");

const mensaje = {
    victoria: [
        "🌿 Dominaste la arena. El bot cayó.",
        "🍀 Jugada perfecta. El bot se quedó sin vidas.",
        "⚔️ Victoria total. La estrategia fue impecable."
    ],
    derrota: [
        "🪦 La arena fue cruel esta vez...",
        "🌑 El bot se impuso. Intenta otra estrategia.",
        "⚠️ Derrota. La suerte no estuvo de tu lado."
    ]
};

function mensajeAleatorio(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}

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

// Carga del json //
async function cargarJugadas() {
    try {
        const response = await fetch("data/jugadas.json");
        const data = await response.json();
        jugadas = data.opciones;
    } catch (error) {
        console.error("Error cargando jugadas", error);
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
    const numero = Math.floor(Math.random() * jugadas.length);
    return jugadas[numero].nombre.toLowerCase();
}

// Determinar el ganador de la ronda
function ganadorRonda (jugadaUsuario, jugadaBot) {
    
    // Ronda empatada
    if ( jugadaUsuario === jugadaBot) {
        resultado.textContent = `🔁 Empate: ambos eligieron ${jugadaUsuario}`;
        return; 
    }

    const jugada = jugadas.find(j => j.nombre === jugadaUsuario);

    if (!jugada) {
        console.error("Jugada no encontrada", jugadaUsuario);
        return;
    }

    const ganaUsuario = jugada.vence === jugadaBot;

    if (ganaUsuario) {
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
    vidas.innerHTML = 
    `❤️ Usuario: ${"❤️".repeat(vidaUsuario)} 
    <br>
    
    🤖 Bot: ${"❤️".repeat(vidaBot)}
    `;
}

// Verificacion de fin del juego
function verificarFinJuego() {
    if (vidaUsuario === 0) {
        Swal.fire({
            title:"💀 Fin del juego",
            text: mensajeAleatorio(mensaje.derrota),
            icon: "error",
            confirmButtonText: "Reintentar",
            customClass: {
                popup: "swal-verde",
                confirmButton: "swal-boton-verde"
            }
        });
        
        estadisticas.partidas++;
        estadisticas.perdidas++;
        guardarEstadisticas();
        mostrarEstadisticas();
        desactivarBotones();
        
    } else if (vidaBot === 0) {
        Swal.fire({
            title:"🏆 Fin del juego",
            text: mensajeAleatorio(mensaje.victoria),
            icon: "success",
            confirmButtonText: "Jugar de nuevo",
            customClass: {
                popup: "swal-verde",
                confirmButton: "swal-boton-verde"
            }
        });

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
async function iniciarJuego() {
    await cargarJugadas();
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
            const jugadaUsuario = boton.dataset.opcion.toLowerCase();
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