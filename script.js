"use strict";
let score = document.querySelectorAll(".score");
//let scorePlayer2 = document.querySelector(".score.right");
let currentNumber = document.querySelectorAll(".current-number");
//let currentNumber2 = document.querySelector(".current.right .current-number");
let dice = document.querySelector("#dice");
let rollDiceBtn = document.querySelector("#roll-dice");
let holdBtn = document.querySelector("#hold");
let newGameBtn = document.querySelector("#new-game");
//
//TEST
let testScore = document.querySelector(".test-score");
let testCurrent = document.querySelector(".test-current");
//
//
// TEST FUNCTIONS

function diceView(x) {
  dice.style.visibility = "hidden";
  let dots = document.querySelectorAll(".dot");
  for(let i=0; i<dots.length; i++) dots[i].style.visibility = "hidden";
  function showDots(array){
    dice.style.visibility = "visible";
    for(let i=0; i<array.length; i++) dots[array[i]].style.visibility = "visible";
  };
  switch (x) {
    case 1:   
      showDots([6]);
      break;
    case 2:
      showDots([0,5]);
      break;
    case 3:
      showDots([2,3,6]);
      break;
    case 4:
      showDots([0,2,3,5]);
      break;
    case 5:
      showDots([0,2,3,5,6]);
      break;
    case 6:
      showDots([0,1,2,3,4,5]);
      break;
  }
}

document.querySelector("#test").addEventListener("click", function () {
  let number = Math.trunc(Math.random() * 6 + 1);
  console.log(number);
  diceView(number);
});

let test = function () {
  score[0].textContent = 23;
  score[1].textContent = 4;
  currentNumber[0].textContent = 5;
  currentNumber[1].textContent = 6;
};

document.querySelector("#test-data").addEventListener("click", test);

//
//
//
// THE GAME
//
//
//
let startGame = function () {
  score[0].textContent = 0;
  score[1].textContent = 0;
  currentNumber[0].textContent = 0;
  currentNumber[1].textContent = 0;
  dice.value = 0;
  testScore.textContent = 0;
  testCurrent.textContent = 0;
};
startGame();

// start new game
newGameBtn.addEventListener("click", function(){
  startGame();
  let players = document.querySelectorAll(".player");
  let activePlayer = players[0];
  activePlayer.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
  rollTheDice(activePlayer); 
  holdScore(activePlayer);

});
// roll the dice
let rollTheDice = function(player){
rollDiceBtn.addEventListener("click", function () {
  let number = Math.trunc(Math.random() * 6 + 1);
  console.log(number);
  diceView(number);
  if (number != 1) {
    player.querySelector(".current-number").textContent = Number(player.querySelector(".current-number").textContent) + number;
  } else {
    player.querySelector(".current-number").textContent = 0;
  }
});
}

// hold
let holdScore = function(player){
holdBtn.addEventListener("click", function () {
  let currentScore = Number(player.querySelector(".current-number").textContent);
  let totalScore = Number(player.querySelector(".score").textContent);
  player.querySelector(".score").textContent = totalScore + currentScore;
  player.querySelector(".current-number").textContent = 0;

});
}
