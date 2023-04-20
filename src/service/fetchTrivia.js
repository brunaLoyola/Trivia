export const fetchTrivia = async () => {
  const data = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await data.json();
  return token;
};
