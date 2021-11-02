import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../Components/Input';
import Button from '../Components/Button';
import requestToken from '../services/token';
import Logo from '../trivia.png';
import '../styles/Login.css';
import {
  addPlayerEmailAndName,
  addPlayerToken,
  resetTotalScore,
  resetActualQuestions } from '../Redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.handlePlay = this.handlePlay.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      gravatarEmail: '',
      redirect: false,
    };
  }

  componentDidMount() {
    const { dispatchResetTotalScore, dispatchResetActualQuestions } = this.props;
    dispatchResetTotalScore();
    dispatchResetActualQuestions();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  addTokenLocalStorage(playerToken, { name, gravatarEmail }) {
    localStorage.setItem('token', playerToken);

    const playerScore = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    };

    localStorage.setItem('state', JSON.stringify({ player: playerScore }));
  }

  async handlePlay() {
    const { dispatchPlayerToken, dispatchPlayerNameAndEmail } = this.props;

    const requestObject = await requestToken();
    const playerToken = requestObject.token;

    dispatchPlayerToken(playerToken);

    dispatchPlayerNameAndEmail(this.state);

    this.addTokenLocalStorage(playerToken, this.state);

    this.setState({ redirect: true });
  }

  handleSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, gravatarEmail, redirect } = this.state;
    const disabled = name.length > 0 && gravatarEmail.length > 0;
    return (
      <main className="login-page">
        <div className="login-container">
          <div className="logo-container">
            <img src={ Logo } alt="Trivia" className="trivia-logo" />
          </div>
          <span>Let&apos;s play and have fun!</span>
          <form className="login-form">
            <Input
              type="text"
              className="input-player-name"
              onChange={ this.handleChange }
              textLabel="Nome"
              inputName="name"
              value={ name }
            />
            <Input
              type="email"
              className="input-gravatar-email"
              onChange={ this.handleChange }
              textLabel="Email"
              inputName="gravatarEmail"
              value={ gravatarEmail }
            />
            <div className="buttons-container">
              <Button
                dataTestId="btn-play"
                className="btn-play"
                onClick={ this.handlePlay }            
                disabled={ !disabled }
              >
                Jogar
              </Button>
              <Button
                dataTestId="btn-settings"
                className="btn-settings"
                onClick={ this.handleSettings }
              >
                Configurações
              </Button>
            </div>
          </form>
          { redirect && <Redirect to="/game" /> }
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  dispatchPlayerNameAndEmail: PropTypes.func.isRequired,
  dispatchPlayerToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchResetTotalScore: PropTypes.func.isRequired,
  dispatchResetActualQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => (
  {
    dispatchPlayerToken: (token) => dispatch(addPlayerToken(token)),
    dispatchPlayerNameAndEmail: (emailAndName) => dispatch(
      addPlayerEmailAndName(emailAndName),
    ),
    dispatchResetTotalScore: () => dispatch(resetTotalScore()),
    dispatchResetActualQuestions: () => dispatch(resetActualQuestions()),
  }
);

export default connect(null, mapDispatchToProps)(Login);
