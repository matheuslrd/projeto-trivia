import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Header.css';
import getProfilePic from '../services/getProfilePic';

const triviaImg = 'https://github.com/tryber/sd-014-b-project-trivia-react-redux/blob/master/src/trivia.png?raw=true';

function Header({ name, gravatarEmail, score }) {
  return (
    <header className="game-header">
      <img
        className="gravatar-img"
        src={ getProfilePic(gravatarEmail) }
        alt="player profile pic"
        data-testid="header-profile-picture"
      />
      <img className="trivia-img-header" src={ triviaImg } alt="trivia" />
      <div className="player-infos">
        <span className="text-content" data-testid="header-player-name">
          { name === '' ? 'Gustavo Sant\'Anna' : name }
        </span>
        <p className="text-content">
          Score:
          <span data-testid="header-score">{ score }</span>
        </p>
      </div>
    </header>
  );
}

Header.propTypes = PropTypes.shape({
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.string,
}).isRequired;

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name, gravatarEmail, score,
});

export default connect(mapStateToProps)(Header);
