const requestToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const resolve = await request.json();
  return resolve;
};

export default requestToken;
