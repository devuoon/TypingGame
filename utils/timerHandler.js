import { DOM_ELEMENTS, GLOBAL_STATE } from "./global.js";
import { endGame } from "./gameManage.js";

const { timerDisplay } = DOM_ELEMENTS;

// 타이머 업데이트 함수
export const updateTimer = () => {
  // 남은 시간 업데이트
  GLOBAL_STATE.remainTime -= 1000;

  // 남은 시간을 초 단위로 계산
  const seconds = Math.max(0, (GLOBAL_STATE.remainTime / 1000).toFixed(0));
  timerDisplay.textContent = `${seconds} 초`;

  // 스타일 업데이트
  if (seconds <= 5) {
    timerDisplay.classList.add("timer");
  }

  // 시간이 끝나면 종료
  if (GLOBAL_STATE.remainTime <= 0) {
    clearInterval(GLOBAL_STATE.timerId);
    endGame(); // 게임 종료 함수 호출
  }
};

// 타이머 시작 함수
export const startCountdown = () => {
  if (GLOBAL_STATE.isCounting) return;

  GLOBAL_STATE.isCounting = true;
  updateTimer();
  GLOBAL_STATE.timerId = setInterval(updateTimer, 1000);
};

// 타이머 리셋 함수
export const resetTimer = () => {
  GLOBAL_STATE.isCounting = false;
  GLOBAL_STATE.remainTime = 20000;
  clearInterval(GLOBAL_STATE.timerId);
  // 스타일 및 텍스트 초기화
  timerDisplay.style.border = "";
  timerDisplay.style.color = "";
  timerDisplay.textContent = "";
};
