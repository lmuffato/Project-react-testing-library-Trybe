import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

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

// Meus teste começam aqui

describe('Testa se contém um conjunto fixo de links de navegação.', () => {
  test('O primeiro link deve possuir o texto "Home"', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    expect(homeLink).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto "About"', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    expect(aboutLink).toBeInTheDocument();
  });
  test('O terceiro link deve possuir o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);

    const favoritePokemonLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favoritePokemonLink).toBeInTheDocument();
  });
});
