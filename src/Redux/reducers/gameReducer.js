import {
  ADD_ACTUAL_QUESTIONS,
  ADD_RESULTS_TO_STATE,
  SAVE_RANKING,
  RESET_ACTUAL_QUESTIONS,
} from '../actions';

const INITIAL_STATE = {
  results: [],
  ranking: [],
  actualQuestions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_RESULTS_TO_STATE:
    return { ...state, results: action.payload };
  case SAVE_RANKING:
    return { ...state, ranking: [...state.ranking, action.payload] };
  case ADD_ACTUAL_QUESTIONS:
    return {
      ...state,
      actualQuestions: action.payload,
    };
  case RESET_ACTUAL_QUESTIONS:
    return { ...state, actualQuestions: [], results: [] };
  default:
    return state;
  }
};

export default gameReducer;
