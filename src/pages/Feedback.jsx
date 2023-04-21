import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';

class Feedback extends Component {
  feedbackCondition = () => {
    const { assertions } = this.props;
    const scoreMin = 3;
    const bad = 'Could be better...';
    const god = 'Well Done!';
    if (assertions < scoreMin) {
      return bad;
    }
    return god;
  };

  render() {
    const { score, assertions, history } = this.props;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{ this.feedbackCondition() }</h2>
        <h3>
          Placar Final:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </h3>
        <h3>
          Acertos:
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </h3>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
  assertions: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
