import { wordAPI } from "./api.js";
import { DOM_ELEMENTS } from "./global.js";
import { resetTimer, startCountdown } from "./timerHandler.js";

const {
  wordDisplay,
  userInput,
  correctList,
  incorrectList,
  correctSpan,
  incorrectSpan,
  wordCount,
} = DOM_ELEMENTS;

let words = [];

correctSpan.textContent = "0";
incorrectSpan.textContent = "0";

// 리스트에 단어 추가
const addToList = (list, word) => {
  const listItem = document.createElement("li");
  listItem.textContent = word;
  list.appendChild(listItem);
};

// 랜덤 단어 표시
const displayRandomWord = (words) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  wordDisplay.textContent = words[randomIndex];

  wordCount.textContent = words.length;
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

  words = words.filter((word) => word !== inputWord); // 사용한 단어 제거
  displayRandomWord(words);

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
    words = await wordAPI();
    displayRandomWord(words);
  } catch (error) {
    console.log("error : ", error);
    wordDisplay.textContent = "API 호출 오류";
  }
};
