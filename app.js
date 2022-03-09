
let startGame = true;
let scoreTemp = 0;
let Total1 = 0;
let Total2 = 0;
let user = 1;
const scoreTemp1 = document.getElementById("score-temp1")
const scoreTemp2 = document.getElementById("score-temp2")
const info = document.getElementById("info")
const scoreTotal1 = document.getElementById("score-total1")
const scoreTotal2 = document.getElementById("score-total2")
const displayNumber = document.getElementById("randomNumber")

// Reset du dispay, scoretemp et total
function reset() {
  scoreTotal1.innerText = 0;
  scoreTotal2.innerText = 0;
  scoreTemp1.innerText = 0;
  scoreTemp2.innerText = 0;
  displayNumber.innerText = "";
  scoreTemp = 0;
  Total1 = 0;
  Total2 = 0;
  info.innerText = "";
}

// mise à jour du scoreTemp 
function updateScore(user, randomNumber) {
  // si le dé = 1, on remet à zero
  if (randomNumber === 1) {
    scoreTemp = 0;
    randomNumber = 0;
    info.innerText = "PERDU et passe son tour";
    scoreTemp1.innerText = 0;
    scoreTemp2.innerText = 0;
  }
  // si dé != 1, MAJ du scoreTemp et MAJ du display du joueur 
  else {
    scoreTemp += randomNumber;
    if (user === 1) {
      scoreTemp1.innerText = scoreTemp;
    }
    else {
      scoreTemp2.innerText = scoreTemp;
    }
  }
}

// lancement partie
const startButton = document.getElementById("btn-play")
startButton.addEventListener('click', function () {
  if (startGame === true) {
    // on masque le texte d'info 
    info.innerText = "";
    // tirage du dé
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    // affichage du tirage
    displayNumber.innerText = randomNumber;
    // si dé = 1, on change de joueur
    if (randomNumber === 1) {
      // nextUser(user);
      switch (user) {
        case 1:
          user = 2;
          break;
        case 2:
          user = 1;
          break;
      }
    }
    // mise à jour des scores et display
    updateScore(user, randomNumber);
  }
})

// passer la main 
const passButton = document.getElementById("btn-pass")
passButton.addEventListener('click', function () {
  if (startGame === true) {
    // on change de joueur et MAJ du total avec test si >= 100
    switch (user) {
      case 1:
        user = 2;
        Total1 += scoreTemp;
        if (Total1 >= 10) {
          info.innerText = "JOUEUR 1 GAGNÉ";
          startGame = false;
        }
        scoreTotal1.innerText = Total1;
        break;
      case 2:
        user = 1;
        Total2 += scoreTemp;
        if (Total2 >= 10) {
          info.innerText = "JOUEUR 2 GAGNÉ";
          startGame = false;
        }
        scoreTotal2.innerText = Total2;
        break;
    }
    scoreTemp = 0;
    scoreTemp1.innerText = 0;
    scoreTemp2.innerText = 0;
  }
})

const newGame = document.getElementById("btn-newGame")
newGame.addEventListener('click', function () {
  // on remet tous les scores à zero
  reset();
  info.innerText = "Lancer les dés";
  // true = démarre une partie, false = partie terminée
  startGame = true;
})


