import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home redirecionado para /', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/Home/));
    const homeLink = getByText(/Home/);
    expect(homeLink).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About redirecionado para /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/Favorite Pokémons/));
    const favoritePokeLink = getByText(/Favorite Pokémons/);
    expect(favoritePokeLink).toBeInTheDocument();
  });
});

test('Redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/nao-encontrada');
  const notFound = getByText(/Page requested not found/);
  expect(notFound).toBeInTheDocument();
});
