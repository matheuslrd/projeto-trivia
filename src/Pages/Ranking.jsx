import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayerCard from '../Components/PlayerCard';

function Ranking({ ranking }) {
  function sortRanking(a, b) {
    const ONE = -1;
    if (a.score > b.score) return ONE;
    if (a.score < b.score) return 1;

    return 0;
  }

  return (
    <section>
      <h2 data-testid="ranking-title">Ranking</h2>
      <Link to="/">
        <button type="button" data-testid="btn-go-home">Home</button>
      </Link>
      <section>
        {ranking.sort(sortRanking).map((player, i) => (
          <PlayerCard key={ i } player={ player } index={ i } />
        ))}
      </section>
    </section>
  );
}

const mapStateToProps = (state) => ({
  ranking: state.game.ranking,
});

Ranking.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Ranking);
