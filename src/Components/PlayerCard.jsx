import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getProfilePic from '../services/getProfilePic';

function PlayerCard(
  { player: { name, gravatarEmail, score, index } },
) {
  return (
    <div>
      <h3 data-testid={ `player-name-${index}` }>{ name }</h3>
      <img alt={ `Imagem de ${name}` } src={ getProfilePic(gravatarEmail) } />
      <p data-testid={ `player-score-${index}` }>{ score }</p>
    </div>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(PlayerCard);
