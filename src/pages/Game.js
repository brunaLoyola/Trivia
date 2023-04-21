/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from '../componentes/Header';
import { fetchQuestions } from '../service/fetchTrivia';
import './Game.css';
import { createPlayer } from '../redux/actions/playerActions';

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
      clicou: false,
      colors: 'neutro',
      colorsInco: 'neutro',
      assertions: 0,
      results: [],
      timer: 30,
      difficulty: '',
    };
  }

  componentDidMount() {
    const interval = 1000;
    const timeOut = 30000;
    this.getFetch();
    setInterval(this.timerCounter, interval);
    setTimeout(() => {
      this.setState({
        clicou: true,
      });
    }, timeOut);
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
      results,
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
    const { difficulty } = result;
    this.setState({
      category,
      question,
      correctAnswer,
      incorrectAnswer,
      randomQuestions,
      difficulty,
    });
  };

  handleClick = async ({ target }) => {
    const { value } = target;
    const { dispatch, name, email } = this.props;
    const { correctAnswer, timer, assertions } = this.state;
    const ten = 10;
    const valueDifficulty = this.difficultyNumber();
    console.log(timer);
    const colors = value === correctAnswer ? 'correctAnswer' : 'correctAnswer';
    const colorsInco = value !== correctAnswer ? 'incorrectAnswer' : 'incorrectAnswer';
    const sumAssertions = value === correctAnswer ? 1 : 0;

    if (value === correctAnswer && timer !== 0) {
      const score = ten + (timer * valueDifficulty);
      dispatch(createPlayer(name, assertions, score, email));
    } else {
      const score = 0;
      dispatch(createPlayer(name, assertions, score, email));
    }
    this.setState((prevState) => ({
      colors,
      colorsInco,
      clicou: true,
      assertions: prevState.assertions + sumAssertions,
    }));
  };

  nextButton = () => {
    const { value } = this.state;
    const min = 4;
    const time = 200;
    const { history } = this.props;

    if (value < min) {
      this.setState({ value: value + 1,
        clicou: false,
        colors: 'neutro',
        timer: 30,
        colorsInco: 'neutro' });
      setTimeout(() => this.updateResult(), time);
    } else {
      history.push('/feedback');
    }
  };

  difficultyNumber = () => {
    const max = 3;
    const med = 2;
    const min = 1;
    const { difficulty } = this.state;
    console.log(difficulty);
    if (difficulty === 'hard') {
      return max;
    }
    if (difficulty === 'medium') {
      return med;
    }
    if (difficulty === 'easy') {
      return min;
    }
  };

  updateResult = () => {
    const { results, value } = this.state;
    this.setState({ result: results[value] }, () => this.resultsStates());
  };

  timerCounter = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }
  };

  render() {
    const {
      category, question, incorrectAnswer,
      randomQuestions, correctAnswer, clicou, colors, colorsInco, timer } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="question-category">{category}</h1>
          <h2
            data-testid="question-text"
            dangerouslySetInnerHTML={ { __html: question } }
          />
          {console.log(incorrectAnswer)}
          <div data-testid="answer-options">
            {
              Object.values(randomQuestions).map((elemento, index) => (
                <button
                  onClick={ this.handleClick }
                  disabled={ clicou }
                  value={ elemento }
                  type="button"
                  key={ elemento }
                  data-testid={ elemento === correctAnswer
                    ? 'correct-answer' : `wrong-answer-${index}` }
                  className={ elemento === correctAnswer ? colors : colorsInco }
                >
                  { elemento }
                </button>
              ))
            }
            { clicou
              ? <button data-testid="btn-next" onClick={ this.nextButton }>Next</button>
              : '' }
          </div>
          <div>
            { timer > 0 ? timer : 'Acabou o tempo.' }
          </div>
        </div>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state.userReducer,
});

Game.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
