//Lógica para la sección testimonioss
var comentarios = [];
var calificacionSeleccionada = 0;

document.querySelectorAll(".estrella").forEach(estrella => {
    estrella.addEventListener("click", function() {
        calificacionSeleccionada = this.getAttribute("data-valor");
        document.querySelectorAll(".estrella").forEach(e => e.classList.remove("seleccionada"));
        for (let i = 0; i < calificacionSeleccionada; i++) {
            document.querySelectorAll(".estrella")[i].classList.add("seleccionada");
        }
    });
});

function agregarComentario() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let comentario = document.getElementById("comentario").value;

    if (!nombre || !correo || !comentario || calificacionSeleccionada == 0) {
        alert("Por favor, completa todos los campos y selecciona una calificación.");
        return;
    }

    let contenedor = document.getElementById("contenedor-comentarios");

    let nuevoComentario = document.createElement("div");
    nuevoComentario.classList.add("testimonio");
    nuevoComentario.innerHTML = `
        <p class="nombre">${nombre}</p>
        <p class="comentario">${comentario}</p>
        <p class="calificacion">Calificación: ${"★".repeat(calificacionSeleccionada)}</p>
    `;

    contenedor.appendChild(nuevoComentario);
    limpiarCampos();
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("comentario").value = "";
    calificacionSeleccionada = 0;
    document.querySelectorAll(".estrella").forEach(e => e.classList.remove("seleccionada"));
}

//Lógica para el manejo de FAQ
const questions = document.querySelectorAll(".faq-question");
const answerContainer = document.querySelector(".faq-answer-container");
const answerText = document.querySelector(".faq-answer-text");

const answers = [
    "Sí, todos los juegos en nuestra página son completamente gratuitos y puedes jugarlos sin restricciones.",
    "No, nuestros juegos se ejecutan directamente en tu navegador sin necesidad de descargas ni instalaciones.",
    "Sí, la mayoría de nuestros juegos están optimizados para dispositivos móviles, por lo que puedes jugar desde tu teléfono o tablet.",
    "Intenta actualizar la página o limpiar la cacra la siguiente temporada. ¡Estate hé de tu navegador. Si el problema persiste, contáctanos.",
    "Sólo necesitas un navegador actualizado como Google Chrome, Firefox o Edge. No se requiere un equipo potente.",
    "Esperamos estar incorporando nuevos juegos paatento!",
    "Claro que sí!. Puedes enviar una sugerencia a cualquier miembro de equipo o hacernos saber en la sección de reseñas."

];

let activeIndex = null;

questions.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (activeIndex === index) {
            // Si ya está activo, se oculta
            answerContainer.classList.remove("active");
            button.querySelector(".icon").textContent = "▶";
            activeIndex = null;
        } else {
            // Mostrar la nueva respuesta
            answerText.textContent = answers[index];
            answerContainer.classList.add("active");
            answerContainer.style.marginTop = "10px"; // Agrega margen superior para que no esté pegado
            questions.forEach(q => q.querySelector(".icon").textContent = "▶");
            button.querySelector(".icon").textContent = "◀";
            activeIndex = index;
        }
    });
});



//Lógica de navegación con desplazamiento
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('show');
}
function scrollToSection(id) {
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
}

//Lógica del juego tres en raya

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;

function openModal() {
    document.getElementById("modal-tic-tac").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal-tic-tac").style.display = "none";
    resetGame();
}

function makeMove(index) {
    if (board[index] === "" && !checkWinner()) {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerText = currentPlayer;
        
        if (checkWinner()) {
            document.getElementById("winner-message").innerText = `${currentPlayer} ha ganado!`;
            if (currentPlayer === "X") scoreX++;
            else scoreO++;
            updateScores();
        } else if (board.every(cell => cell !== "")) {
            document.getElementById("winner-message").innerText = "¡Empate!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    console.log("Reiniciando juego"); // Para depuración

    // Restablecer el estado lógico del tablero
    board = ["", "", "", "", "", "", "", "", ""];

    // Limpiar las celdas en el DOM y resetear atributos
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";  // Asegura que el contenido se borre
        cell.removeAttribute("data-value"); // Elimina cualquier atributo extra
    });

    // Restablecer el mensaje del ganador
    document.getElementById("winner-message").textContent = "";

    // Reiniciar el turno al jugador "X"
    currentPlayer = "X";
}



function updateScores() {
    document.getElementById("scoreX").innerText = scoreX;
    document.getElementById("scoreO").innerText = scoreO;
}



//Lógica del juego de plataforma
function openGameModal() {
    document.getElementById("gameModal").style.display = "flex";
}

function closeGameModal() {
    document.getElementById("gameModal").style.display = "none";
    resetGame();
}

function playGame(playerChoice) {
    const choices = ["Piedra", "Papel", "Tijera"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = "¡Empate!";
    } else if (
        (playerChoice === "Piedra" && computerChoice === "Tijera") ||
        (playerChoice === "Papel" && computerChoice === "Piedra") ||
        (playerChoice === "Tijera" && computerChoice === "Papel")
    ) {
        result = "¡Ganaste!";
    } else {
        result = "¡Perdiste!";
        document.getElementById("retry-btn").style.display = "block";
    }

    document.getElementById("result-t").innerHTML = `Elegiste: ${playerChoice} <br> La computadora eligió: ${computerChoice} <br> ${result}`;
}

function resetGame() {
    document.getElementById("result-t").innerHTML = "";
    document.getElementById("retry-btn").style.display = "none";
}

