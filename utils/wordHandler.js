import { wordAPI } from "./api.js";
import { DOM_ELEMENTS, GLOBAL_STATE } from "./global.js";
import { resetTimer, startCountdown } from "./timerHandler.js";
import { endGame } from "./gameManage.js";

const {
  wordDisplay,
  userInput,
  correctList,
  incorrectList,
  correctSpan,
  incorrectSpan,
  wordCount,
} = DOM_ELEMENTS;

correctSpan.textContent = "0";
incorrectSpan.textContent = "0";

// 리스트에 단어 추가
const addToList = (list, word) => {
  const listItem = document.createElement("li");
  listItem.textContent = word;
  list.appendChild(listItem);
};

// 랜덤 단어 표시
const displayRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * GLOBAL_STATE.words.length);
  wordDisplay.textContent = GLOBAL_STATE.words[randomIndex];
  wordCount.textContent = GLOBAL_STATE.words.length;
};

// 정답 처리 함수
const handleCorrectAnswer = (inputWord) => {
  // 타이머 초기화 및 재시작
  resetTimer();
  startCountdown();
  userInput.value = "";
  addToList(correctList, inputWord);

  const correctCount = correctList.querySelectorAll("li").length;
  correctSpan.textContent = `${correctCount}`;

  GLOBAL_STATE.words = GLOBAL_STATE.words.filter((word) => word !== inputWord); // 사용한 단어 제거
  displayRandomWord();

  if (GLOBAL_STATE.words.length === 0) {
    endGame();
  }
};

// 오답 처리 함수
const handleIncorrectAnswer = (inputWord) => {
  userInput.value = "";
  addToList(incorrectList, inputWord);

  const incorrectCount = incorrectList.querySelectorAll("li").length;
  incorrectSpan.textContent = `${incorrectCount}`;
};

// 단어 비교
export const wordCompare = () => {
  const promptWord = wordDisplay.textContent.trim();
  const inputWord = userInput.value.trim();

  if (promptWord === inputWord) {
    handleCorrectAnswer(inputWord);
  } else {
    handleIncorrectAnswer(inputWord);
  }
};

// 단어 API 호출
export const fetchWords = async () => {
  try {
    GLOBAL_STATE.words = await wordAPI();
    displayRandomWord();
  } catch (error) {
    console.log("error : ", error);
    wordDisplay.textContent = "API 호출 오류";
  }
};
