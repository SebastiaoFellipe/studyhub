const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

let totalSeconds = 25 * 60;
let intervalId = null;

function updateDisplay() {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  timerEl.textContent = `${minutes}:${seconds}`;
}

function tick() {
  if (totalSeconds > 0) {
    totalSeconds--;
    updateDisplay();
  } else {
    clearInterval(intervalId);
    alert('⏰ Tempo de foco encerrado!');
  }
}

startBtn.addEventListener('click', () => {
  if (!intervalId) {
    intervalId = setInterval(tick, 1000);
  }
});

pauseBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
});

resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  totalSeconds = 25 * 60;
  updateDisplay();
});

updateDisplay();