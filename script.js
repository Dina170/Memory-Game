// start game
document.querySelector(".control-button span").onclick = function () {
  let yourName = prompt("what's your name");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector(".control-button").remove();
};

let duration = 700;

let boardContainer = document.querySelector(".board-container");
// select board and create array of cards
let board = document.querySelector(".board");
let cards = Array.from(board.children);

let orderRange = Array.from(Array(cards.length).keys());
// or
// let orderRange = [...Array(cards.length).keys()];

let win = document.querySelector(".win");

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
cards.forEach((card, index) => {
  card.style.order = orderRange[index];

  card.addEventListener("click", function () {
    flipCard(card);
  });
});

function shuffle(array) {
  // start with last element
  let current = array.length,
    temp,
    random; // to perform swapping

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function flipCard(selectedCard) {
  selectedCard.classList.add("flipped");

  // Collect All Flipped Cards
  let allFlippedCards = cards.filter((flippedCard) =>
    flippedCard.classList.contains("flipped")
  );

  if (allFlippedCards.length === 2) {
    stopClicking();

    checkIfCardsMatched(allFlippedCards[0], allFlippedCards[1]);
  }

  // console.log(document.querySelectorAll(".has-match"));

  if (document.querySelectorAll(".has-match").length === 16) {
    console.log("win");
    win.style.zIndex = 999;
    setTimeout(() => {
      location.reload();
    }, 1500);
  }
}

function stopClicking() {
  boardContainer.classList.add("no-clicking");

  setTimeout(() => {
    boardContainer.classList.remove("no-clicking");
  }, duration);
}

function checkIfCardsMatched(firstCard, secondCard) {
  let triesElement = document.querySelector(".tries span");

  //console.log(firstCard.);
  if (firstCard.textContent === secondCard.textContent) {
    console.log("matches");
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    firstCard.classList.add("has-match");
    secondCard.classList.add("has-match");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    console.log("not matching");
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
    }, duration);
  }
}
