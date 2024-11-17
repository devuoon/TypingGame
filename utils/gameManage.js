import { fetchWords } from "./wordHandler.js";
import { startCountdown, resetTimer } from "./timerHandler.js";

const loadingSpinner = document.querySelector("#loadingSpinner");

// 게임 초기화 함수
const initializeGame = async () => {
  try {
    // 1. 로딩 스피너 표시
    loadingSpinner.style.display = "block";

    // 2. 단어 API 호출 및 단어 표시
    await fetchWords();

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

// 페이지 로드 시 게임 초기화 실행$(function() {
window.addEventListener("DOMContentLoaded", initializeGame);
