
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
  document.querySelector('.player1').classList.remove('user');
          document.querySelector('.player2').classList.remove('user');
}

// mise à jour du scoreTemp 
function updateScore(user, randomNumber) {
  // si le dé = 1, on remet à zero
  if (randomNumber === 1) {
    scoreTemp = 0;
    randomNumber = 0;
    displayNumber.innerHTML = "<span class='text-danger fs-2'>PERDU <br>ET<br> PASSE SON TOUR<span>";
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
    displayNumber.innerHTML = "<i class='bi customDice bi-dice-"+ randomNumber +"'></i>";
   
    // si dé = 1, on change de joueur
    if (randomNumber === 1) {
      // nextUser(user);
      switch (user) {
        case 1:
          user = 2;
          document.querySelector('.player2').classList.add('user');
          document.querySelector('.player1').classList.remove('user');
          break;
        case 2:
          user = 1;
          document.querySelector('.player1').classList.add('user');
          document.querySelector('.player2').classList.remove('user');
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
        document.querySelector('.player2').classList.add('user');
        document.querySelector('.player1').classList.remove('user');
        if (Total1 >= 100) {
          displayNumber.innerHTML = "<span class='text-success fs-2'>JOUEUR <br><span class='numberUser'>1</span><br> GAGNE<span>";
          document.querySelector('.player1').classList.add('user', 'user-win');
          document.querySelector('.player2').classList.remove('user');  
          startGame = false;
        }
        scoreTotal1.innerText = Total1;
        break;
      case 2:
        user = 1;
        Total2 += scoreTemp;
        document.querySelector('.player1').classList.add('user');
          document.querySelector('.player2').classList.remove('user');
        if (Total2 >= 100) {
          displayNumber.innerHTML = "<span class='text-success fs-2'>JOUEUR <br><span class='numberUser'>2</span><br> GAGNE<span>"; 
          document.querySelector('.player2').classList.add('user', 'user-win');
        document.querySelector('.player1').classList.remove('user');  
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
  info.innerText = "";
  // true = démarre une partie, false = partie terminée
  startGame = true;
  // on démarre avec le joueur 1
  document.querySelector('.player1').classList.add('user');
  document.querySelector('.player1').classList.remove('user-win'); 
  document.querySelector('.player2').classList.remove('user-win'); 
})


