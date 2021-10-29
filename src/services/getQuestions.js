const ZERO_PONTO_CINCO = 0.5;

const getQuestions = (results) => [...results.incorrect_answers, results.correct_answer]
  .sort(() => Math.random() - ZERO_PONTO_CINCO);

export default getQuestions;
