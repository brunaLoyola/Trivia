import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from '../redux/actions/indexActions';
import { fetchTrivia } from '../service/fetchTrivia';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationBtn);
  };

  validationBtn = () => {
    const { name, email } = this.state;
    const minCharName = 0;
    const nome = name.length > minCharName;
    const eMail = email.includes('@') && email.includes('.com');

    if (nome && eMail) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleClick = async () => {
    const { name, email } = this.state;
    const { dispatch, history } = this.props;
    const token = await fetchTrivia();
    dispatch(createUser({ name, email }));
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { name, email, disabled } = this.state;
    return (
      <form>
        <label>
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ disabled }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
