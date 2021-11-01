import React from 'react';
import Header from '../Components/Header';
import Trivia from '../Components/Trivia';
import '../styles/Game.css';

function Game() {
  return (
    <section className="game-page">
      <Header />
      <Trivia />
    </section>
  );
}

export default Game;
