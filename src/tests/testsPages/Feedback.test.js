import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import Feedback from '../../pages/Feedback';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { mockFeedback } from '../mocks/Mock';

describe('Teste a página de Feedbacks', () => {
  it('Verifique se todos os elementos estão presentes na tela renderizada', () => {
    renderWithRouterAndRedux(<App />, {}, '/feedback');

    const gravatar = screen.getByRole('img', {  name: /foto do perfil de/i });
    const score = screen.getByTestId('header-score')
    const message = screen.getByRole('heading', {  name: /could be better\.\.\./i });
    const placar = screen.getByRole('heading', {  name: /placar final: 0/i});
    const acertos = screen.getByRole('heading', {  name: /acertos: 0/i});
    const btnRanking = screen.getByRole('button', {  name: /ranking/i});
    const btnPlayAgain = screen.getByRole('button', {  name: /play again/i});

    expect(gravatar).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(placar).toBeInTheDocument();
    expect(acertos).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
  });

  it('Verifique se ao clicar no Botão "Ranking", o jogador é redirecionado para a página ("/rankinkg")', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    const btnRanking = screen.getByRole('button', {  name: /ranking/i});

    expect(btnRanking).toBeInTheDocument();

    userEvent.click(btnRanking);
    const { location } = history;
    expect(location.pathname).toBe('/ranking');
  });

  it('Verifique se ao clicar no Botão "Paly Again", o jogador é redirecionado para a página de início ("/")', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    const btnPlayAgain = screen.getByRole('button', {  name: /play again/i});

    expect(btnPlayAgain).toBeInTheDocument();

    userEvent.click(btnPlayAgain);
    const { location } = history;
    expect(location.pathname).toBe('/');
  });

  it('Verifique se todos os elementos estão presentes na tela renderizada', () => {
    renderWithRouterAndRedux(<App />, mockFeedback, '/feedback');

    const message = screen.getByRole('heading', {  name: /well done!/i });
    
    expect(message).toBeInTheDocument();    
  });  
});
