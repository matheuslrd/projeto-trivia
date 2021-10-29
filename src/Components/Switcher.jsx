import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feedbacks from '../Pages/Feedbacks';
import Game from '../Pages/Game';
import Login from '../Pages/Login';
import Ranking from '../Pages/Ranking';
import Settings from '../Pages/Settings';

export default function Switcher() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedbacks" component={ Feedbacks } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
