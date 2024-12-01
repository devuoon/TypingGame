import { fetchWords, wordCompare } from "./wordHandler.js";
import { startCountdown, resetTimer } from "./timerHandler.js";
import { DOM_ELEMENTS } from "./global.js";

const {
  loadingSpinner,
  inputBoxWord,
  gameOver,
  incorrectList,
  resetBtn,
  correctList,
  userInput,
  spinnerBg,
  correctSpan,
  incorrectSpan,
} = DOM_ELEMENTS;

// 로딩 스피너 표시/숨기기 함수
const toggleLoadingSpinner = (isLoading) => {
  if (isLoading) {
    loadingSpinner.classList.add("d-block");
    loadingSpinner.classList.remove("d-none");
    spinnerBg.classList.add("d-block");
    spinnerBg.classList.remove("d-none");
  } else {
    loadingSpinner.classList.add("d-none");
    loadingSpinner.classList.remove("d-block");
    spinnerBg.classList.add("d-none");
    spinnerBg.classList.remove("d-block");
  }
};

// 게임 초기화 함수
const initializeGame = async () => {
  try {
    inputBoxWord.classList.add("d-block");
    gameOver.classList.add("d-none");
    gameOver.classList.remove("d-block");
    timerDisplay.classList.remove("timer");

    // 점수 초기화
    correctSpan.textContent = "0";
    incorrectSpan.textContent = "0";

    incorrectList.textContent = "";
    correctList.textContent = "";
    userInput.value = "";
    userInput.disabled = false;

    // 1. 로딩 스피너 표시
    toggleLoadingSpinner(true);

    // 2. 단어 API 호출
    await fetchWords();

    // 3. 로딩 스피너 숨기기
    toggleLoadingSpinner(false);

    // 4. 타이머 리셋 및 시작
    resetTimer();
    startCountdown();
  } catch (error) {
    alert("오류가 발생했습니다.");
    toggleLoadingSpinner(false); // 에러 발생 시 로딩 스피너 숨기기
  }
};

// 게임 종료
export const endGame = () => {
  userInput.value = "";
  inputBoxWord.classList.add("d-none");
  inputBoxWord.classList.remove("d-block");
  gameOver.classList.add("d-block");
  gameOver.classList.remove("d-none");

  userInput.disabled = true;
};

// 게임 리셋
const resetGame = () => {
  const isConfirmed = window.confirm("새 게임을 시작하시겠습니까?");

  if (isConfirmed) {
    initializeGame();
  }
};

resetBtn.addEventListener("click", resetGame);
userInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    wordCompare(); // 단어 비교 함수 호출
  }
});

window.addEventListener("DOMContentLoaded", () => {
  initializeGame();
  userInput.focus(); // 페이지 로드 시 포커스
});
