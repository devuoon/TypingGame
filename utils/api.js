// api 호출 함수
export const wordAPI = async () => {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?number=50"
    );
    const data = await response.json();
    return data; // 받아온 데이터를 반환
  } catch (error) {
    console.error("Error fetching API:", error);
  }
};
