import {
  ADD_PLAYER_EMAIL_AND_NAME,
  ADD_PLAYER_TOKEN,
  ADD_SCORE,
  RESET_TOTAL_SCORE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
  token: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case ADD_PLAYER_EMAIL_AND_NAME:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };
  case RESET_TOTAL_SCORE:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default playerReducer;
