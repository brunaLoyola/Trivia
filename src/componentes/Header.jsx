import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const hash = md5(email).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header>
        <img
          src={ gravatarUrl }
          alt={ `Foto do perfil de ${name}` }
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{name}</h1>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.userReducer,
  score: state.player.score,
});
console.log(mapStateToProps);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
