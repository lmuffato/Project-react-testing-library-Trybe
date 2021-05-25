import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

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
  it.skip('Testa se a aplicação é redirecionada para a página inicial /home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    userEvent.click(home);

    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  it.skip('Testa se a aplicação é redirecionada para a página /About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText('About');
    expect(about).toBeInTheDocument();
    userEvent.click(about);

    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  it.skip('Testa se a aplicação é redirecionada para a página /Favorite Pokemons', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorite = getByText(/favorite/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });

  it.skip('Testa se a aplicação é redirecionada para a página /Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');
    const noMatch = getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
