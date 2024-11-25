// DOM 요소
export const DOM_ELEMENTS = {
  timerDisplay: document.querySelector("#timerDisplay"),
  userInput: document.querySelector("#userInput"),
  inputBoxWord: document.querySelector(".word"),
  gameOver: document.querySelector(".gameOver"),
  correctList: document.querySelector(".correctList"),
  incorrectList: document.querySelector(".incorrectList"),
  loadingSpinner: document.querySelector("#loadingSpinner div"),
  spinnerBg: document.querySelector(".spinner-bg"),
  resetBtn: document.querySelector("#resetButton"),
  wordDisplay: document.querySelector("#wordDisplay"),
  correctSpan: document.querySelector(".box.correct span"),
  incorrectSpan: document.querySelector(".box.incorrect span"),
  wordCount: document.querySelector(".promptCount"),
};

// 전역 상태 변수
export const GLOBAL_STATE = {
  remainTime: 20000,
  timerId: null,     // 타이머 ID 
  isCounting: false, // 타이머 작동 여부
};