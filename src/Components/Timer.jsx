import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  constructor() {
    super();

    this.restartTimer = this.restartTimer.bind(this);

    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.updateTimer();
  }

  componentDidUpdate(prevProp, { timer }) {
    const { clickCorrectAnswer, sumScore, endQuestion } = this.props;
    if (clickCorrectAnswer && !prevProp.clickCorrectAnswer) {
      clearInterval(this.intervalIdval);
      sumScore(timer);
    }
    if (!endQuestion && prevProp.endQuestion) {
      this.restartTimer();
    }
  }

  restartTimer() {
    this.setState({ timer: 30 }, this.updateTimer());
  }

  updateTimer() {
    const numberSeconds = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      this.clearTimer(this.intervalId);
    }, numberSeconds);
  }

  clearTimer(interval) {
    const { timer } = this.state;
    const { endQuestion, answerClick } = this.props;

    if (timer === 0 || endQuestion) {
      clearInterval(interval);
      return answerClick();
    }
  }

  render() {
    const { state: { timer }, props: { endQuestion } } = this;
    return (
      <div
        className="container-timer"
        style={ endQuestion
          ? { boxShadow: '0 0 3px 1.5px crimson' } : null }
      >
        { !endQuestion && <span className="animated-border" /> }
        <p className="timer">
          { timer }
        </p>
      </div>
    );
  }
}

Timer.propTypes = {
  answerClick: PropTypes.func.isRequired,
  clickCorrectAnswer: PropTypes.bool.isRequired,
  endQuestion: PropTypes.bool.isRequired,
  sumScore: PropTypes.func.isRequired,
};
