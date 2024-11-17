const timerDisplay = document.querySelector("#timerDisplay");

let startTime;
let isCounting = false;
const countdownDuration = 20000; // 30초

// 타이머 업데이트 함수
const updateTimer = (timestamp) => {
  if (!startTime) startTime = timestamp;

  const elapsedTime = timestamp - startTime;
  const remainingTime = Math.max(0, countdownDuration - elapsedTime);

  // 남은 시간을 초 단위로 표시
  const seconds = (remainingTime / 1000).toFixed(0);
  timerDisplay.textContent = `${seconds} 초`;

  // 시간이 남아 있으면 requestAnimationFrame 반복 호출
  if (remainingTime > 0) {
    requestAnimationFrame(updateTimer);
  } else {
    timerDisplay.textContent = "0 초";
    isCounting = false;
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
};
