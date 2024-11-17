import { wordAPI } from "./api.js";

const wordDisplay = document.querySelector("#wordDisplay");

// 단어 표시 함수
const displayRandomWord = (words) => {
  if (!words || words.length === 0) {
    wordDisplay.textContent = "단어를 불러올 수 없습니다.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * words.length);
  wordDisplay.textContent = words[randomIndex];
};

// 단어 API 호출 함수
export const fetchWords = async () => {
  try {
    const words = await wordAPI();
    displayRandomWord(words);
  } catch (error) {
    console.error("Error fetching words:", error);
    wordDisplay.textContent = "API 호출 오류";
  }
};
