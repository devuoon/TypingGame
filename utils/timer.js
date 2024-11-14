// 타이머 함수
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");

let startTime;
let elapsedTime = 0;
let isCounting = false;
const countdownDuration = 30000; // 30초

function updateTimer(timestamp) {
  if (!startTime) startTime = timestamp;

  // 지난 시간 계산
  elapsedTime = timestamp - startTime;
  const remainingTime = Math.max(0, countdownDuration - elapsedTime);

  // 남은 시간을 초 단위로 표시
  const seconds = (remainingTime / 1000).toFixed(2);
  timerDisplay.textContent = seconds;

  // 시간이 남아 있으면 계속해서 requestAnimationFrame 호출
  if (remainingTime > 0) {
    requestAnimationFrame(updateTimer);
  } else {
    // 카운트다운 종료
    timerDisplay.textContent = "0.00";
    isCounting = false;
    alert("Time's up!");
  }
}

function startCountdown() {
  if (isCounting) return; // 이미 카운트다운 중이면 무시
  isCounting = true;
  startTime = null;
  requestAnimationFrame(updateTimer);
}

startButton.addEventListener("click", startCountdown);
