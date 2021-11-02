import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../Components/Header';

import { saveRanking } from '../Redux/actions';

import '../styles/Feedbacks.css';
import Button from '../Components/Button';

class Feedbacks extends Component {
  constructor() {
    super();
    this.saveScore = this.saveScore.bind(this);
  }

  componentDidMount() {
    this.saveScore();
  }

  saveScore() {
    const { name, gravatarEmail, score, dispatchRanking } = this.props;
    const rankingList = localStorage.getItem('ranking')
      ? JSON.parse(localStorage.getItem('ranking'))
      : [];
    localStorage.setItem('ranking', JSON.stringify([...rankingList,
      {
        id: rankingList.length,
        name,
        gravatarEmail,
        score,
      },
    ]));
    dispatchRanking({ name, gravatarEmail, score, id: rankingList.length });
  }

  render() {
    const { score, assertions } = this.props;
    const THREE = 3;
    return (
      <main className="feedback-page">
        <Header />
        <section className="feedback-container">
          <div className="feedback-card">
            <h2 data-testid="feedback-text">Feedbacks</h2>
            <section className="feedback-section">
              { assertions < THREE
                ? <p data-testid="feedback-text">Podia ser melhor...</p>
                : <p data-testid="feedback-text">Mandou bem!</p> }
              <p>
                { `Acertou: ${assertions}` }
              </p>
              <p>
                  { `Pontos: ${score}` }
              </p>
            </section>
            <section className="feedbacks-buttons">
              <Link to="/">
                <Button
                  dataTestId="btn-play-again"
                  className="btn-play-again btns-feedback"
                >
                  Play Again
                </Button>
              </Link>

              <Link to="/ranking">
                <Button
                  dataTestId="btn-ranking"
                  className="btn-ranking btns-feedback"
                >
                  Ranking
                </Button>
              </Link>
            </section>
          </div>
        </section>
      </main>
    );
  }
}

Feedbacks.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  dispatchRanking: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRanking: (player) => dispatch(saveRanking(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedbacks);
