var gameBoard = document.querySelector('.game-board');
var statusDisplay = document.getElementById('status');
var cardValues = ['V', 'X', 'Y', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
let cards = [...cardValues, ...cardValues];
cards = cards.sort(() => Math.random() - 0.5);
let firstCard = null;
let secondCard = null;
let matchesFound = 0;
function createBoard() {
    cards.forEach((value) => {
        var card = document.createElement('div');
        card.classList.add('card', 'w-24', 'h-32', 'bg-gray-500', 'rounded-lg', 'shadow-lg', 'text-black', 'text-3xl', 'flex', 'items-center', 'justify-center', 'cursor-pointer', 'transform', 'transition-transform', 'duration-300', 'hover:scale-105');
        card.dataset.value = value; card.textContent = '';
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}
function handleCardClick(e) {
    var card = e.target;
    if (card.classList.contains('flip') || card.classList.contains('matched')) { return; }
    card.textContent = card.dataset.value;
    card.classList.add('flip', 'bg-red-200');
    if (!firstCard) { firstCard = card; }
    else if (!secondCard) {
        secondCard = card;
        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.classList.add('matched', 'bg-green-500');
            secondCard.classList.add('matched', 'bg-green-500');
            matchesFound++; resetTurn();
            if (matchesFound === cardValues.length) {
                statusDisplay.textContent = 'Congratulations! You found all matches!';
            }
        }
        else {
            setTimeout(() => {
                firstCard.textContent = '';
                secondCard.textContent = '';
                firstCard.classList.remove('flip', 'bg-orange-400');
                secondCard.classList.remove('flip', 'bg-orange-400');
                resetTurn();
            }, 1000);
        }
    }
}
function resetTurn() { 
    firstCard = null; 
    secondCard = null; 
}
createBoard();