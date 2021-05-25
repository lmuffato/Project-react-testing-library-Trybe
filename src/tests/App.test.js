import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

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

describe('Teste  de redenrização da página principal da Pokédex /', () => {
  test('Verifica se redenrizou o App', () => {
    const { getByText } = renderWithRouter(<App />);
    const text = getByText('Pokédex');
    expect(text).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const link1 = getByText('Home');
    expect(link1).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    const { getByText } = renderWithRouter(<App />);
    const link1 = getByText('About');
    expect(link1).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const link1 = getByText('Favorite Pokémons');
    expect(link1).toBeInTheDocument();
  });
});
