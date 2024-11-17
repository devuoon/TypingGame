import { wordAPI } from "./api.js";

const wordDisplay = document.querySelector("#wordDisplay");
const wordInput = document.querySelector("#userInput");
const correctList = document.querySelector(".correctList");
const incorrectList = document.querySelector(".incorrectList");
const correctSpan = document.querySelector(".box.correct span");
const incorrectSpan = document.querySelector(".box.incorrect span");
let words = []; // 단어 목록을 저장할 변수

// 단어 표시 함수
const displayRandomWord = (words) => {
  if (!words || words.length === 0) {
    wordDisplay.textContent = "단어를 불러올 수 없습니다.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * words.length);
  wordDisplay.textContent = words[randomIndex];
  // 화면에 표시되는 promptCount를 업데이트
  document.querySelector(".promptCount").textContent = words.length;

  // li 요소의 갯수 출력
  const correctCount = correctList.querySelectorAll("li").length;
  correctSpan.textContent = `(${correctCount})`;

  const incorrectCount = incorrectList.querySelectorAll("li").length;
  incorrectSpan.textContent = `(${incorrectCount})`;
};

// 단어 API 호출 함수
export const fetchWords = async () => {
  try {
    words = await wordAPI(); // words 배열에 단어 목록 저장
    displayRandomWord(words);
  } catch (error) {
    console.error("Error fetching words:", error);
    wordDisplay.textContent = "API 호출 오류";
  }
};

const handleCorrectAnswer = (inputWord) => {
  console.log("정답");
  wordInput.value = ""; // 입력 필드 초기화

  // 정답일 때마다 ul에 li 추가
  const correctItem = document.createElement("li");
  correctItem.textContent = inputWord; // 입력한 단어 추가
  correctList.appendChild(correctItem);

  // 단어 배열에서 정답 단어 제거
  const wordIndex = words.indexOf(inputWord);
  if (wordIndex !== -1) {
    words.splice(wordIndex, 1); // 단어 배열에서 해당 단어 제거
  }

  // 남은 단어가 없으면 게임 종료
  if (words.length <= 0) {
    console.log("게임 종료");
    alert("게임이 종료되었습니다.");
  } else {
    // 남은 단어가 있으면 새로운 단어 표시
    displayRandomWord(words);
  }
};

const handleIncorrectAnswer = (inputWord) => {
  console.log("오답");
  wordInput.value = ""; // 입력 필드 초기화

  // 정답일 때마다 ul에 li 추가
  const incorrectItem = document.createElement("li");
  incorrectItem.textContent = inputWord; // 입력한 단어 추가
  incorrectList.appendChild(incorrectItem);

  displayRandomWord(words);
};

// 입력한 단어와 제시어 비교
export const wordCompare = () => {
  const promptWord = wordDisplay.textContent.trim(); // 최신 제시어
  const inputWord = wordInput.value.trim(); // 입력한 단어

  if (promptWord === inputWord) {
    handleCorrectAnswer(inputWord); // 정답일 때 처리
  } else {
    handleIncorrectAnswer(inputWord); // 오답일 때 처리
  }
};
