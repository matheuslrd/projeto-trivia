import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlayerCard from '../Components/PlayerCard';
import Button from '../Components/Button';

import '../styles/Ranking.css'

function Ranking({ ranking }) {
  function sortRanking(a, b) {
    const ONE = -1;
    if (a.score > b.score) return ONE;
    if (a.score < b.score) return 1;

    return 0;
  }

  return (
    <main className="ranking-page">
      <section className="ranking-container">
        <h2 data-testid="ranking-title">
          Ranking
        </h2>

        <section className="ranking-players">
          {
            ranking.sort(sortRanking).map((player, i) => (
              <PlayerCard key={ i } player={ player } index={ i } />
            ))
          }
        </section>

        <Link to="/">
          <Button
            dataTestId="btn-go-home"
            className="btn-go-home"
          >
            Home
          </Button>
        </Link>
      </section>
    </main>
  );
}

const mapStateToProps = (state) => ({
  ranking: state.game.ranking,
});

Ranking.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Ranking);
