// wordHandler
import { wordAPI } from "./api.js";

const wordDisplay = document.querySelector("#wordDisplay");

// 랜덤 단어를 가져오는 함수
const randomWord = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  wordDisplay.innerText = arr[randomIndex];
};

// wordAPI 함수는 데이터를 반환한다고 가정
const fetchWords = async () => {
  try {
    const data = await wordAPI(); // API 호출 결과를 받아옴
    randomWord(data); // 받은 데이터를 randomWord 함수로 전달
  } catch (error) {
    console.error("Error fetching words:", error);
  }
};

// 함수 호출
fetchWords();
