




var comentarios = [];

function agregarComentario(){
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let comentario = document.getElementById("comentario").value;


    let comen = {"nombre":nombre,
        "correo": correo,
        "comentario":comentario
    };

    comentarios.push(comen);
    limpiarCampos();

}


function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("comentario").value = "";

}

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
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
    document.getElementById("winner-message").innerText = "";
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


//Lógica del juego de memoria

let cards = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍋', '🍓', '🍍'];
cards = [...cards, ...cards];
cards.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let score = 0;
let mistakes = 0;
let timeLeft = 60;
let timer;

function openMemoryModal() {
    document.getElementById("memoryModal").style.display = "flex";
    startTimer();
    generateCards();
}

function closeMemoryModal() {
    document.getElementById("memoryModal").style.display = "none";
    clearInterval(timer);
}

function generateCards() {
    const gameBoard = document.getElementById("memory-game");
    gameBoard.innerHTML = "";
    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.symbol = symbol;
        card.onclick = () => flipCard(card);
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (card.innerHTML !== "" || secondCard) return;

    card.innerHTML = card.dataset.symbol;

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        setTimeout(checkMatch, 700);
    }
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        score++;
        document.getElementById("score").innerText = score;
        firstCard.onclick = null;
        secondCard.onclick = null;
    } else {
        mistakes++;
        document.getElementById("mistakes").innerText = mistakes;
        firstCard.innerHTML = "";
        secondCard.innerHTML = "";
    }
    firstCard = null;
    secondCard = null;

    if (mistakes >= 3) {
        alert("Perdiste el juego 😢");
        clearInterval(timer);
    }

    if (score === cards.length / 2) {
        alert("¡Ganaste! 🎉");
        clearInterval(timer);
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Tiempo agotado 😢");
        }
    }, 1000);
}
