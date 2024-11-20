import { endGame } from "./gameManage.js";

const timerDisplay = document.querySelector("#timerDisplay");

let startTime;
let isCounting = false;
const limitTime = 20000; // 20초

// 타이머 업데이트 함수
export const updateTimer = (timestamp) => {
  if (!startTime) startTime = timestamp;

  const elapsedTime = timestamp - startTime;
  const remainTime = Math.max(0, limitTime - elapsedTime);
  const seconds = (remainTime / 1000).toFixed(0);

  timerDisplay.textContent = `${seconds} 초`;

  // 스타일 업데이트
  if (seconds <= 5) {
    timerDisplay.style.border = "2px solid #f86361";
    timerDisplay.style.color = "#f86361";
  }

  // 남은 시간이 0초보다 크면 계속 업데이트
  if (remainTime > 0) {
    requestAnimationFrame(updateTimer);
  } else {
    endGame(); // 타이머 종료 시 게임 종료
  }
};

// 타이머 시작 함수
export const startCountdown = () => {
  if (isCounting) return;
  isCounting = true;
  startTime = null;
  requestAnimationFrame(updateTimer); // 타이머 시작
};

// 타이머 리셋 함수
export const resetTimer = () => {
  isCounting = false;
  startTime = null;
  timerDisplay.style.border = "";
  timerDisplay.style.color = ""; // 리셋 시 스타일 초기화
};
