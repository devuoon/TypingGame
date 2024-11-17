import { endGame } from "./gameManage.js";

const timerDisplay = document.querySelector("#timerDisplay");

let startTime;
let isCounting = false;
const countdownDuration = 20000; // 5초

// 타이머 업데이트 함수
const updateTimer = (timestamp) => {
  if (!startTime) startTime = timestamp;

  const elapsedTime = timestamp - startTime;
  const remainingTime = Math.max(0, countdownDuration - elapsedTime);

  // 남은 시간을 초 단위로 표시
  const seconds = (remainingTime / 1000).toFixed(0);
  timerDisplay.textContent = `${seconds} 초`;

  // 5초 미만일 때 스타일 추가
  if (seconds <= 5) {
    timerDisplay.style.border = "2px solid #f86361";
    timerDisplay.style.color = "#f86361";
  } else {
    timerDisplay.style.border = "2px solid #d7dbe6";
    timerDisplay.style.color = "#000";
  }

  // 시간이 남아 있으면 requestAnimationFrame 반복 호출
  if (seconds > 0) {
    requestAnimationFrame(updateTimer);
  } else {
    isCounting = false;
    endGame();
  }
};

// 타이머 시작 함수
export const startCountdown = () => {
  if (isCounting) return;
  isCounting = true;
  startTime = null;
  requestAnimationFrame(updateTimer);
};

// 타이머 리셋 함수
export const resetTimer = () => {
  isCounting = false;
  startTime = null;
  //timerDisplay.value = "20 초";
  timerDisplay.style.border = ""; // 리셋 시 테두리 스타일 제거
};
