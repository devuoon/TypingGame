import { wordAPI } from "./api.js";
import { DOM_ELEMENTS } from "./global.js";

const {
  wordDisplay,
  userInput,
  correctList,
  incorrectList,
  correctSpan,
  incorrectSpan,
} = DOM_ELEMENTS;

let words = [];

const fetchWords = async () => {
  try {
    words = await wordAPI(); // 단어 목록을 받아옵니다.
    displayRandomWord(words);
  } catch (error) {
    console.error("Error fetching words:", error);
    wordDisplay.textContent = "API 호출 오류";
  }
};

const displayRandomWord = (words) => {
  if (!words || words.length === 0) {
    wordDisplay.textContent = "단어를 불러올 수 없습니다.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * words.length);
  wordDisplay.textContent = words[randomIndex];

  document.querySelector(".promptCount").textContent = words.length;

  updateCounters();
};

const updateCounters = () => {
  const correctCount = correctList.querySelectorAll("li").length;
  correctSpan.textContent = `(${correctCount})`;

  const incorrectCount = incorrectList.querySelectorAll("li").length;
  incorrectSpan.textContent = `(${incorrectCount})`;
};

const handleCorrectAnswer = (inputWord) => {
  userInput.value = "";
  addToList(correctList, inputWord);
  words = words.filter((word) => word !== inputWord);

  if (words.length === 0) {
    alert("게임이 종료되었습니다.");
  } else {
    displayRandomWord(words);
  }
};

const handleIncorrectAnswer = (inputWord) => {
  userInput.value = "";
  addToList(incorrectList, inputWord);
  displayRandomWord(words);
};

const addToList = (list, word) => {
  const listItem = document.createElement("li");
  listItem.textContent = word;
  list.appendChild(listItem);
};

export const wordCompare = () => {
  const promptWord = wordDisplay.textContent.trim();
  const inputWord = userInput.value.trim();

  if (promptWord === inputWord) {
    handleCorrectAnswer(inputWord);
  } else {
    handleIncorrectAnswer(inputWord);
  }
};

export { fetchWords };
