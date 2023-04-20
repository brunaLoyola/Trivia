export const fetchTrivia = async () => {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await data.json();
  return token;
};

export const fetchQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = response.json();
  return data;
};
