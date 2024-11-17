import { endGame } from "./gameManage.js";

const timerDisplay = document.querySelector("#timerDisplay");
let startTime;
let isCounting = false;
const countdownDuration = 20000; // 20초

const updateTimer = (timestamp) => {
  if (!startTime) startTime = timestamp;

  const elapsedTime = timestamp - startTime;
  const remainingTime = Math.max(0, countdownDuration - elapsedTime);

  const seconds = (remainingTime / 1000).toFixed(0);
  timerDisplay.textContent = `${seconds} 초`;

  if (seconds <= 5) {
    timerDisplay.style.border = "2px solid #f86361";
    timerDisplay.style.color = "#f86361";
  } else {
    timerDisplay.style.border = "2px solid #d7dbe6";
    timerDisplay.style.color = "#000";
  }

  if (seconds > 0) {
    requestAnimationFrame(updateTimer);
  } else {
    isCounting = false;
    endGame();
  }
};

export const startCountdown = () => {
  if (isCounting) return;
  isCounting = true;
  startTime = null;
  requestAnimationFrame(updateTimer);
};

export const resetTimer = () => {
  isCounting = false;
  startTime = null;
  timerDisplay.style.border = "";
};
