import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import requestTrivia from '../services/trivia';
import { addResultsToState, addScore, addActualQuestions } from '../Redux/actions';
import getQuestions from '../services/getQuestions';
import Button from './Button';
import Timer from './Timer';
import encodeUtf8 from '../services/encodeTrivia';

class Trivia extends Component {
  constructor() {
    super();

    this.getTriviaGame = this.getTriviaGame.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.sumScore = this.sumScore.bind(this);
    this.createAnswerButtons = this.createAnswerButtons.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.sendScoreToLocalStorage = this.sendScoreToLocalStorage.bind(this);
    this.renderGame = this.renderGame.bind(this);

    this.state = {
      actualQuestion: 0,
      endQuestion: false,
      clickCorrectAnswer: false,
      assertions: 0,
      endGame: false,
    };
  }

  componentDidMount() {
    this.getTriviaGame();
  }

  async getTriviaGame() {
    const { token, dispatchResultsToState } = this.props;
    const response = await requestTrivia(token);
    dispatchResultsToState([...response.results]);
  }

  goToNextQuestion() {
    const { results } = this.props;
    this.setState(({ actualQuestion }) => {
      if (actualQuestion < results.length - 1) {
        return {
          actualQuestion: actualQuestion + 1,
          endQuestion: false,
          clickCorrectAnswer: false,
        };
      }
      return { endGame: true };
    }, () => this.updateQuestions());
  }

  updateQuestions() {
    const { actualQuestion } = this.state;
    const { results, dispatchActualQuestions } = this.props;
    const questionsList = getQuestions(results[actualQuestion]);
    dispatchActualQuestions(questionsList);
  }

  handleAnswerClick() {
    this.setState({ endQuestion: true });
    console.log('handleAnswerClick');
  }

  handleCorrectAnswer() {
    this.setState({ clickCorrectAnswer: true, endQuestion: true });
    console.log('handleCorrectAnswer');
  }

  sendScoreToLocalStorage(score) {
    const { props: { name, gravatarEmail }, state: { assertions } } = this;
    const playerScore = {
      name,
      assertions: assertions + 1,
      score,
      gravatarEmail,
    };

    localStorage.setItem('state', JSON.stringify({ player: playerScore }));

    this.setState((prevSt) => ({ assertions: prevSt.assertions + 1 }));
  }

  disabledButtonsForTimer(timer) {
    if (timer === 0) return this.handleAnswerClick();
  }

  sumScore(timer) {
    const { results, score, dispatchScore } = this.props;
    const { actualQuestion } = this.state;
    const { difficulty } = results[actualQuestion];
    let scoreSum = score;
    const TEN = 10;
    const HARD_NUM = 3;

    if (difficulty === 'hard') {
      scoreSum += TEN + (timer * HARD_NUM);
    }

    if (difficulty === 'medium') {
      scoreSum += TEN + (timer * 2);
    }

    if (difficulty === 'easy') {
      scoreSum += TEN + timer;
    }

    this.sendScoreToLocalStorage(scoreSum);
    dispatchScore(scoreSum);
  }

  createAnswerButtons() {
    const { actualQuestion, endQuestion } = this.state;
    const { results, dispatchActualQuestions, actualQuestions } = this.props;
    const questionsList = getQuestions(results[actualQuestion]);

    if (actualQuestions.length === 0) dispatchActualQuestions(questionsList);

    return (actualQuestions.length === 0 ? questionsList : actualQuestions).map(
      (question, index) => (
        question !== results[actualQuestion].correct_answer
          ? (
            <Button
              key={ index }
              className="question-btn wrong-answer"
              dataTestId={ `wrong-answer-${index}` }
              onClick={ this.handleAnswerClick }
              disabled={ endQuestion }
            >
              { encodeUtf8(question) }
            </Button>)
          : (
            <Button
              key={ index }
              className="question-btn correct-answer"
              dataTestId="correct-answer"
              onClick={ this.handleCorrectAnswer }
              disabled={ endQuestion }
            >
              { encodeUtf8(question) }
            </Button>
          )),
    );
  }

  renderGame() {
    const { actualQuestion, clickCorrectAnswer,
      endQuestion } = this.state;
    const { results } = this.props;

    return (
      <>
        <Timer
          clickCorrectAnswer={ clickCorrectAnswer }
          sumScore={ this.sumScore }
          endQuestion={ endQuestion }
          answerClick={ this.handleAnswerClick }
        />
        <span className="text-content" data-testid="question-category">
          { encodeUtf8(results[actualQuestion].category) }
        </span>
        <p className="text-content" data-testid="question-text">
          { encodeUtf8(results[actualQuestion].question) }
        </p>
        { this.createAnswerButtons() }
        { endQuestion && (
          <Button
            dataTestId="btn-next"
            className="btn-next"
            onClick={ this.goToNextQuestion }
          >
            { actualQuestion > results.length - 2
              ? 'Results'
              : 'Next Question' }  
          </Button>) }
      </>
    );
  }

  render() {
    const { endGame } = this.state;
    const { results } = this.props;
    return (
      <main className="board-container">
        <section className="game-board">
          { endGame && <Redirect to="/feedbacks" /> }
          { results.length < 1
            ? <div className="loading">Carregando...</div>
            : this.renderGame() }
        </section>
      </main>
    );
  }
}

Trivia.propTypes = {
  dispatchResultsToState: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    difficulty: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
  })).isRequired,
  dispatchScore: PropTypes.func.isRequired,
  dispatchActualQuestions: PropTypes.func.isRequired,
  actualQuestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.player.token,
  score: state.player.score,
  results: state.game.results,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  actualQuestions: state.game.actualQuestions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResultsToState: (results) => dispatch(addResultsToState(results)),
  dispatchScore: (score) => dispatch(addScore(score)),
  dispatchActualQuestions: (actualQuestions) => dispatch(
    addActualQuestions(actualQuestions),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
