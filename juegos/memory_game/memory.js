document.addEventListener("DOMContentLoaded", () => {
    const symbols = ['logoY', 'logoA', 'logoF', 'logoR', 'logoP','logoV', 'logoZ', 'logoD', 'logoM','logoN',];
    let cards = [...symbols, ...symbols];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;
    const totalPairs = symbols.length;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
        cards = shuffle(cards);
        matchedPairs = 0;
        const board = document.getElementById('gameBoard');
        const restartButton = document.getElementById('restartGame');
        board.innerHTML = ''; // Limpiar tablero
        restartButton.style.display = 'none'; // Ocultar botón de reinicio

        cards.forEach((symbol) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;

            const frontFace = document.createElement('div');
            frontFace.classList.add('card-front');

            const backFace = document.createElement('div');
            backFace.classList.add('card-back');
            backFace.style.backgroundImage = `url('imagenes/${symbol}.png')`;
            backFace.style.backgroundSize = "cover";

            card.appendChild(frontFace);
            card.appendChild(backFace);
            card.addEventListener('click', flipCard);
            board.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;
        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkMatch();
    }

    function checkMatch() {
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            matchedPairs++;
            checkWin();
            resetBoard();
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
    }

    function checkWin() {
        if (matchedPairs === totalPairs) {
            document.getElementById('restartGame').style.display = 'block';
        }
    }

    function resetBoard() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    createBoard();
});
