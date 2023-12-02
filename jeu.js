const button = document.querySelector("#begin");
const score = document.querySelector("#score");
const chrono = document.querySelector("#chrono");

let seconds = 0;
let minutes = 0;

let IntervalGame;
let IntervalTimer;

function resetTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  chrono.innerHTML = "00:00";
}

function updateScore(point) {
  point.addEventListener("click", (e) => {
    let intScore = parseInt(score.innerHTML);
    intScore++;
    console.log(intScore, toString(intScore));
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
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  chrono.innerHTML = "00:00";
}

function createRandomPoint() {
    const point = document.createElement('div');
    point.classList.add('point');
    const container = document.getElementById('container');
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
    }, 3000);
}



button.addEventListener("click", (event) => {
  IntervalGame = setInterval(createRandomPoint, 1000);
  IntervalTimer = setInterval(updateTimer, 1000);
  setTimeout(() => {
    clearInterval(IntervalGame);
    resetTimer();
    score.textContent = 0;
  },60000);
});



