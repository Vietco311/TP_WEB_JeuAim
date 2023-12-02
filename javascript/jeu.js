const button = document.querySelector("#begin");
const score = document.querySelector("#score");
const chrono = document.querySelector("#chrono");
const pseudo = document.querySelector("#connecte");
const container = document.querySelector('#container');
const recordText = document.querySelector("#record");

let seconds = 0;
let minutes = 0;

let IntervalGame;
let IntervalTimer;


function updateScore(point) {
  point.addEventListener("click", (e) => {
    let intScore = parseInt(score.innerHTML);
    intScore++;
    score.innerHTML = intScore;
    point.remove();
  })
}

function updateTimer() {
  seconds++;
  if (seconds >= 60) {
      seconds = 0;
      minutes++;
  }

  const formattedTime = formatTime(minutes) + ":" + formatTime(seconds);
  chrono.innerHTML = formattedTime;
}

function formatTime(time) {
  return (time < 10) ? "0" + time : time;
}

function resetTimer() {
  clearInterval(IntervalTimer);
  seconds = 0;
  minutes = 0;
  chrono.innerHTML = "00:00";
}

function createRandomPoint() {
    const point = document.createElement('div');
    point.classList.add('point');
    const maxTop = container.clientHeight - 200;
    const maxLeft = container.clientWidth - 200;

    const randomTop = Math.floor(Math.random() * maxTop);
    const randomLeft = Math.floor(Math.random() * maxLeft);

    point.style.top = `${randomTop}px`;
    point.style.left = `${randomLeft}px`;
    
    container.appendChild(point);

    updateScore(point);
    setTimeout(() => {
      container.removeChild(point);
    }, 2000);
}



button.addEventListener("click", (event) => {
  IntervalGame = setInterval(createRandomPoint, 750);
  IntervalTimer = setInterval(updateTimer, 1000);
  setTimeout(() => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    const dataToSend = {
      pseudo: pseudo.innerHTML,
      score: score.innerHTML
    };
    clearInterval(IntervalGame);
    resetTimer();
    const recordSplit = recordText.innerHTML.split(":");
    const record = recordSplit[1];
    if(parseInt(score.innerHTML) > record){
      recordSplit[1] = score.innerHTML;
      recordText.innerHTML = recordSplit.join(":");
    }
    score.textContent = 0;   
    // Envoi des données via fetch
    console.log(dataToSend);
    fetch('../php/sendScore.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => {
      // Traitez la réponse du serveur ici si nécessaire
      console.log('Réponse du serveur:', response);
    })
    .catch(error => {
      // Gestion des erreurs
      console.error('Erreur lors de l\'envoi des données:', error);
    });
     
  },12000);
});



