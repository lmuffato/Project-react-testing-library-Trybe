import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        { component }
      </Router>,
    ),
    history,
  });
};

describe('1. Teste o componente <App.js />', () => {
  it('Testa se a aplicação é redirecionada para a página inicial /home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    userEvent.click(home);

    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  it('Testa se a aplicação é redirecionada para a página /About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText('About');
    expect(about).toBeInTheDocument();
    userEvent.click(about);

    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  it('Testa se a aplicação é redirecionada para a página /Favorite Pokemons', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorite = getByText(/favorite/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });

  it('Testa se a aplicação é redirecionada para a página /Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');
    const noMatch = getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
