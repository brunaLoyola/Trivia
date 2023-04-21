import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../componentes/Header';

class Feedback extends Component {
  feedbackCondition = () => {
    const scoreMin = 3;
    const bad = 'Could be better...';
    const god = 'Well Done!';
    if (player.score < scoreMin) {
      return bad;
    }
    return god;
  };

  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{ this.feedbackCondition }</h2>
        <h3>
          Placar Final:
          {' '}
          <span data-testid="feedback-total-score">{ player.score }</span>
        </h3>
        <h3>
          Acertos:
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </h3>
      </div>
    );
  }
}

export default connect()(Feedback);
