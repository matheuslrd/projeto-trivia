export const ADD_LOGIN_AND_EMAIL = 'ADD_LOGIN_AND_EMAIL';
export const ADD_PLAYER_TOKEN = 'ADD_PLAYER_TOKEN';
export const ADD_PLAYER_EMAIL_AND_NAME = 'ADD_PLAYER_EMAIL_AND_NAME';
export const ADD_RESULTS_TO_STATE = 'ADD_RESULTS_TO_STATE';
export const ADD_SCORE = 'ADD_SCORE';
export const SAVE_RANKING = 'SAVE_RANKING';
export const RESET_TOTAL_SCORE = 'RESET_TOTAL_SCORE';
export const ADD_ACTUAL_QUESTIONS = 'ADD_ACTUAL_QUESTIONS';
export const RESET_ACTUAL_QUESTIONS = 'RESET_ACTUAL_QUESTIONS';

export const addLoginAndEmail = (payload) => ({
  type: ADD_LOGIN_AND_EMAIL,
  payload,
});

export const addPlayerToken = (payload) => ({
  type: ADD_PLAYER_TOKEN,
  payload,
});

export const addPlayerEmailAndName = (payload) => ({
  type: ADD_PLAYER_EMAIL_AND_NAME,
  ...payload,
});

export const addResultsToState = (payload) => ({
  type: ADD_RESULTS_TO_STATE,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const saveRanking = (payload) => ({
  type: SAVE_RANKING,
  payload,
});

export const resetTotalScore = () => ({
  type: RESET_TOTAL_SCORE,
});

export const addActualQuestions = (payload) => ({
  type: ADD_ACTUAL_QUESTIONS,
  payload,
});

export const resetActualQuestions = () => ({
  type: RESET_ACTUAL_QUESTIONS,
});
