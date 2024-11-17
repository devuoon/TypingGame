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
} = DOM_ELEMENTS;

// 사용자가 입력한 단어와 제시어를 비교하는 이벤트 핸들러
const userInput = document.querySelector("#userInput");

// 게임 초기화 함수
const initializeGame = async () => {
  try {
    inputBoxWord.style.display = "block";
    gameOver.style.display = "none";
    userInput.disabled = false;
    incorrectList.innerHTML = "";
    correctList.innerHTML = "";

    // 1. 로딩 스피너 표시
    loadingSpinner.style.display = "block";

    // 2. 단어 API 호출 및 단어 표시
    await fetchWords(); // 단어 API 호출 완료까지 기다림

    // 3. 로딩 스피너 숨기기
    loadingSpinner.style.display = "none";

    // 4. 타이머 리셋 및 시작
    resetTimer();
    startCountdown();
  } catch (error) {
    console.error("Error initializing game:", error);
    alert("게임 초기화 중 오류가 발생했습니다.");
    loadingSpinner.style.display = "none";
  }
};

// 게임 종료 함수
export const endGame = () => {
  userInput.value = "";
  inputBoxWord.style.display = "none";
  gameOver.style.display = "block";
  userInput.disabled = true;
};

const resetGame = () => {
  const isConfirmed = window.confirm("새 게임을 시작하시겠습니까?");

  if (isConfirmed) {
    initializeGame();
  }
};

// 페이지 로드 시 게임 초기화 실행
window.addEventListener("DOMContentLoaded", initializeGame);
resetBtn.addEventListener("click", resetGame);
userInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    wordCompare(); // 단어 비교 함수 호출
  }
});
