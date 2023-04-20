/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from '../componentes/Header';
import { fetchQuestions } from '../service/fetchTrivia';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      value: 0,
      category: '',
      question: '',
      correctAnswer: '',
      incorrectAnswer: '',
      randomQuestions: '',
    };
  }

  componentDidMount() {
    this.getFetch();
  }

  removeCode = async (keyName) => {
    const { history } = this.props;
    localStorage.removeItem(keyName);
    history.push('/');
  };

  getFetch = async () => {
    const getToken = localStorage.getItem('token');
    const fetch = await fetchQuestions(getToken);
    const { results } = fetch;
    const { value } = this.state;
    const errorToken = 3;
    const code = fetch.response_code;
    if (code === errorToken) {
      this.removeCode(getToken);
    }

    this.setState({
      result: results[value],
    }, () => this.resultsStates());
  };

  resultsStates = () => {
    const { result } = this.state;
    const { category, question } = result;
    const correctAnswer = result.correct_answer;
    const incorrectAnswer = result.incorrect_answers;
    const arrayQuestions = [...incorrectAnswer, correctAnswer];
    const randomQuestions = _.shuffle(arrayQuestions);
    this.setState({
      category,
      question,
      correctAnswer,
      incorrectAnswer,
      randomQuestions,
    });
  };

  render() {
    const {
      category, question, correctAnswer, incorrectAnswer, randomQuestions } = this.state;
    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="question-category">{category}</h1>
          <h2
            data-testid="question-text"
          >
            {' '}
            {question}

          </h2>
          {console.log(incorrectAnswer)}
          <div data-testid="answer-options">
            {
              Object.values(randomQuestions).map((elemento, index) => (
                <button
                  type="button"
                  key={ elemento }
                  data-testid={ elemento === correctAnswer
                    ? 'correct-answer' : `wrong-answer-${index}` }
                >
                  { elemento }
                </button>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect()(Game);
