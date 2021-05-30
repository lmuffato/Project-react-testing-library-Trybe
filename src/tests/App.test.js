import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import renderWithRouter from './RenderWithRouter';
import App from '../App';

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

describe('Testando o componente <App.js />', () => {
  it('Teste se é renderizada ao carregar a aplicação no caminho de URL "/"', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação contém um link fixo "Home" de navegação.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(linkHome).toBeInTheDocument();
  });

  it('Teste se a aplicação contém um link fixo "About" de navegação.', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    expect(linkAbout).toBeInTheDocument();
  });

  it('Teste se a aplicação contém um link fixo "FavoritePokemons" de navegação.', () => {
    renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial'
     + 'na URL / ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');
    const linkHome = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(linkHome).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial'
    + 'na URL / ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');
    const linkAbout = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(linkAbout).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,'
  + 'na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.',
  () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');
    const linkFavorites = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(linkFavorites).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-não-existe');

    const text = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(text).toBeInTheDocument();
  });
});
