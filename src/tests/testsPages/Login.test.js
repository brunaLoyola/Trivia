import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import App from "../../App";

const testName = 'input-player-name';
const testEmail = 'input-gravatar-email';
const nameExample = 'Sherly';
const emailExample = 'sherly@trybe.com';

describe('Teste a página de Login', () => {
  it('Verifique se todos os compoentes estão presentes na tela renderizada', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(testName);
    const inputEmail = screen.getByTestId(testEmail);
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const btnSettings = screen.getByRole('button', {  name: /settings/i });

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
  });

  it('Verifique se o btn é habilitado quando os campos de nome e e-mail são validados', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(testName);
    const inputEmail = screen.getByTestId(testEmail);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    expect(btnPlay).toBeDisabled();

    userEvent.type(inputName, nameExample);
    expect(inputName).toHaveValue(nameExample);
    expect(btnPlay).toBeDisabled();

    userEvent.type(inputEmail, emailExample);
    expect(inputEmail).toHaveValue(emailExample);
    expect(btnPlay).not.toBeDisabled();
  });

  it('Verifique se ao clicar no btnPlay é direcionado para a página ("/game")', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(testName);
    const inputEmail = screen.getByTestId(testEmail);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, nameExample);
    expect(inputName).toHaveValue(nameExample);

    userEvent.type(inputEmail, emailExample);
    expect(inputEmail).toHaveValue(emailExample);

    userEvent.click(btnPlay);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
      console.log(history.location.pathname);
    });
  });

  it('Verifique se ao clicar no btnSettings é direcionado para a página ("/settings")', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    await waitFor(() => {
    const btnSettings = screen.getByRole('button', {  name: /settings/i });

    userEvent.click(btnSettings);    
    const { location } = history;
    expect(location.pathname).toBe('/settings');
    }); 
  });
});
