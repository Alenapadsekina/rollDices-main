"use strict";
// buttons
let rollDiceBtn = document.querySelector("#roll-dice");
let holdBtn = document.querySelector("#hold");
let newGameBtn = document.querySelector("#new-game");
// points
let score = document.querySelectorAll(".score");
let dices = document.querySelectorAll(".dice");
// settings
let settings = {
  count: 1,
  adjustmentValue: 3,
  goal: 100,
  // players: [prompt("Player 1"), prompt("Player 2")],
};
let selected = "rgba(255, 255, 255, 0.6)";
let unSelected = "rgba(255, 255, 255, 0.2)";
let currentPlayer = document.querySelector(".current-player");
let players = document.querySelectorAll(".player");

function diceView(diceId, numberOnDice) {
  let dots = document.querySelectorAll(".dot" + String(diceId));
  for (let i = 0; i < dots.length; i++) dots[i].style.visibility = "hidden";
  function showDots(array) {
    dices[diceId].visibility = "visible";
    for (let i = 0; i < array.length; i++)
      dots[array[i]].style.visibility = "visible";
  }
  switch (numberOnDice) {
    case 1:
      showDots([6]);
      break;
    case 2:
      showDots([0, 5]);
      break;
    case 3:
      showDots([2, 3, 6]);
      break;
    case 4:
      showDots([0, 2, 3, 5]);
      break;
    case 5:
      showDots([0, 2, 3, 5, 6]);
      break;
    case 6:
      showDots([0, 1, 2, 3, 4, 5]);
      break;
  }
}

let startGame = function () {
  for (let i = 0; i < 2; i++) {
    settings.count = 0;
    score[i].textContent = 0;
    document.querySelectorAll(".current-number")[i].textContent = 0;
    dices[i].value = 0;
    diceView(i, 0);
  }
  btnOff(holdBtn);
};

// random number adjustment
let numberOnDice = function () {
  let initialNumber = Math.trunc(Math.random() * 6 + 1);
  let adjustedNumber = 0;
  if (initialNumber == 1) {
    settings.count % settings.adjustmentValue == 0
      ? (adjustedNumber = Math.trunc(Math.random() * 5 + 2))
      : (adjustedNumber = initialNumber);
    settings.count += 1;
  } else {
    adjustedNumber = initialNumber;
  }
  return adjustedNumber;
};
// disable/enable buttons
let btnOn = function (button) {
  button.disabled = false;
  button.style = selected;
};
let btnOff = function (button) {
  button.disabled = true;
  button.style = unSelected;
};
// start new game
newGameBtn.addEventListener("click", function () {
  startGame();
  let activePlayer = defineActivePlayer();
  activePlayer.style.backgroundColor = selected;
});
// roll the dice
function defineActivePlayer() {
  let turn = currentPlayer.textContent;
  let activePlayer = players[turn];
  return activePlayer;
}
function newActivePlayer() {
  Number(currentPlayer.textContent) !== 0
    ? (currentPlayer.textContent = 0)
    : (currentPlayer.textContent = 1);
  btnOff(holdBtn);
}

rollDiceBtn.addEventListener("click", function () {
  dices[0].style.visibility = "visible";
  dices[1].style.visibility = "visible";
  let activePlayer = defineActivePlayer();
  let number1 = numberOnDice();
  console.log(number1);
  let number2 = numberOnDice();
  console.log(number2);
  diceView(0, number1);
  diceView(1, number2);
  if (number1 !== 1 && number2 !== 1) {
    if (number1 === number2) {
      activePlayer.querySelector(".current-number").textContent =
        Number(activePlayer.querySelector(".current-number").textContent) +
        number1 * 4;
    } else {
      activePlayer.querySelector(".current-number").textContent =
        Number(activePlayer.querySelector(".current-number").textContent) +
        number1 +
        number2;
    }
    holdBtn.disabled = false;
    holdBtn.style = selected;
  } else {
    if (number1 == 1) {
      activePlayer.querySelector(".score").textContent = 0;
    }
    activePlayer.querySelector(".current-number").textContent = 0;

    newActivePlayer();
    activePlayer.style.backgroundColor = unSelected;
    players[currentPlayer.textContent].style.backgroundColor = selected;
  }
});

// hold
function displayWinner(winner) {
  winner.style.backgroundColor = "rgba(0, 255, 250, 0.6)";
  winner.style.color = "rgba(255, 255, 255)";
  btnOff(rollDiceBtn);
  btnOff(holdBtn);
  document.querySelector(".winner").textContent = `${
    winner.querySelector(".name").textContent
  } wins!`;
}

holdBtn.addEventListener("click", function () {
  let activePlayer = defineActivePlayer();
  let currentScore = Number(
    activePlayer.querySelector(".current-number").textContent
  );
  let totalScore = Number(activePlayer.querySelector(".score").textContent);
  activePlayer.querySelector(".score").textContent = totalScore + currentScore;
  activePlayer.querySelector(".current-number").textContent = 0;
  if (
    Number(activePlayer.querySelector(".score").textContent) >= settings.goal
  ) {
    displayWinner(activePlayer);
  } else {
    newActivePlayer();
    activePlayer.style.backgroundColor = unSelected;
    players[currentPlayer.textContent].style.backgroundColor = selected;
  }
});
