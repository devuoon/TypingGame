export const wordAPI = () => {
  return fetch("https://random-word-api.herokuapp.com/word?number=50")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`error : ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching API:", error);
    });
};
