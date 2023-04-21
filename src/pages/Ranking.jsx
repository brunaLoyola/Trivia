import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { rankingReducer } from '../redux/reducers/rankingReducer';

class Ranking extends Component {
  componentDidMount() {
    const ranking = localStorage.getItem('ranking');
    if (ranking) {
      rankingReducer(JSON.parse(ranking));
    }
  }

  render() {
    const { history, ranking } = this.props;
    console.log(ranking);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {ranking?.map((player, index) => (
            <li key={ index }>
              <img
                data-testid={ `player-picture-${index}` }
                src={ `https://www.gravatar.com/avatar/${md5(player.email).toString()}` }
                alt="Player profile"
              />
              <div data-testid={ `player-name-${index}` }>{player.name}</div>
              <div data-testid={ `player-score-${index}` }>
                {player.score}
                {' '}
                pontos
              </div>
            </li>
          ))}
        </ul>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Ir para a tela de Login
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  ranking: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.ranking,
});

export default connect(mapStateToProps)(Ranking);
