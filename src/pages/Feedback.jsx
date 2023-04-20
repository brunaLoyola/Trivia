import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../componentes/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default connect()(Feedback);
