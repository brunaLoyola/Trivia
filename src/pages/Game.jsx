import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../componentes/Header';

class Game extends Component {
  render() {
    return (
      <Header />
    );
  }
}

export default connect()(Game);
